import type { Action } from "svelte/action";
import type { Importance, NormNote } from "./types";
import { setActiveAnleitung } from "./store.svelte";

// The instruction an input contributes to the contextual Anleitung panel.
export interface AnleitungInstruction {
	title: string;
	description: string;
	importance?: Importance;
	norm?: NormNote;
	// Validation message for the field, shown prominently in the panel when set.
	error?: string;
}

interface AnleitungOptions extends AnleitungInstruction {
	// Optional custom sink, called with the instruction when the input is focused or
	// hovered. Omit it to use the shared store that <Anleitung /> reads by default.
	// Never called with null — the panel keeps showing until another input takes over.
	onFocus?: (instruction: AnleitungInstruction) => void;
}

// Hover is delayed so the panel doesn't switch while the pointer just passes over fields.
const HOVER_DELAY = 400;

function toInstruction(options: AnleitungOptions): AnleitungInstruction {
	return {
		title: options.title,
		description: options.description,
		importance: options.importance,
		norm: options.norm,
		error: options.error
	};
}

// use:anleitung — attach to a form input to sync the contextual Anleitung with it.
// Focusing shows its instruction immediately; hovering shows it after a short delay.
// The guidance stays visible until another input activates (no clear on blur/leave).
export const anleitung: Action<HTMLElement, AnleitungOptions> = (node, options) => {
	let current = options;
	let hoverTimer: ReturnType<typeof setTimeout> | undefined;
	// True while this field owns the panel, so live prop changes (e.g. a validation
	// error appearing) refresh the panel without waiting for a re-focus.
	let active = false;

	function emit(instruction: AnleitungInstruction) {
		if (current.onFocus) {
			current.onFocus(instruction);
			return;
		}
		setActiveAnleitung(instruction);
	}

	function show() {
		clearTimeout(hoverTimer);
		active = true;
		emit(toInstruction(current));
	}

	function onFocusOut() {
		active = false;
	}

	function onPointerEnter() {
		hoverTimer = setTimeout(show, HOVER_DELAY);
	}

	// Cancel a pending hover only — keep whatever is currently shown.
	function onPointerLeave() {
		clearTimeout(hoverTimer);
	}

	node.addEventListener("focusin", show);
	node.addEventListener("focusout", onFocusOut);
	node.addEventListener("mouseenter", onPointerEnter);
	node.addEventListener("mouseleave", onPointerLeave);

	return {
		update(next) {
			current = next;
			// Keep the panel in sync while the field stays active (live error updates).
			if (active) emit(toInstruction(current));
		},
		destroy() {
			clearTimeout(hoverTimer);
			node.removeEventListener("focusin", show);
			node.removeEventListener("focusout", onFocusOut);
			node.removeEventListener("mouseenter", onPointerEnter);
			node.removeEventListener("mouseleave", onPointerLeave);
		}
	};
};

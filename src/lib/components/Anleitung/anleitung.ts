import type { Action } from "svelte/action";
import type { Importance, NormNote } from "./types";
import { getAnleitungAnker, setActiveAnleitung } from "./store.svelte";

// The instruction an input contributes to the contextual Anleitung display.
export interface AnleitungInstruction {
	title: string;
	description: string;
	importance?: Importance;
	norm?: NormNote;
	// Validation message for the field, shown prominently when set.
	error?: string;
}

interface AnleitungOptions extends AnleitungInstruction {
	// Optional custom sink: the host renders the guidance itself. With a sink set,
	// no question mark is injected and the shared store stays untouched — the
	// action is inert until the host wires the sink up to its own display.
	onFocus?: (instruction: AnleitungInstruction) => void;
}

// Question mark chip, injected next to the field label. Gray at rest, primary
// on hover — matches the @ibc/ui palette.
const FRAGE_KNOPF_KLASSEN =
	"ml-1.5 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center " +
	"rounded-full bg-neutral-200 align-text-bottom text-[10px] leading-none font-bold " +
	"text-neutral-600 transition-colors hover:bg-primary-600 hover:text-white";

function toInstruction(options: AnleitungOptions): AnleitungInstruction {
	return {
		title: options.title,
		description: options.description,
		importance: options.importance,
		norm: options.norm,
		error: options.error
	};
}

// Best insertion point for the question mark: an explicit marker wins, then the
// field label, then a heading-like <p> (sub headings), else the wrapper itself.
function frageZiel(node: HTMLElement): HTMLElement {
	const marker = node.querySelector<HTMLElement>("[data-anleitung-anker]");
	if (marker) return marker;
	const label = node.querySelector<HTMLElement>("label");
	if (label) return label;
	const absatz = node.querySelector<HTMLElement>("p");
	if (absatz) return absatz;
	return node;
}

// use:anleitung — attach to a form-field wrapper to give it contextual guidance.
// The action injects a small "?" button next to the label; ONLY clicking it opens
// the guidance (AnleitungZeile below the field's row), clicking again closes it
// (Jens 2026-08-04 — no more opening on focus or hover).
export const anleitung: Action<HTMLElement, AnleitungOptions> = (node, options) => {
	let current = options;

	// Host-sink mode: no trigger, no store — see AnleitungOptions.onFocus.
	if (current.onFocus) {
		return {
			update(next) {
				current = next;
			}
		};
	}

	function umschalten(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (getAnleitungAnker() === node) {
			setActiveAnleitung(null);
			return;
		}
		setActiveAnleitung(toInstruction(current), node);
	}

	const knopf = document.createElement("button");
	knopf.type = "button";
	knopf.textContent = "?";
	knopf.className = FRAGE_KNOPF_KLASSEN;
	knopf.setAttribute("aria-label", `Hinweis: ${current.title}`);
	knopf.dataset.anleitungFrage = "";
	knopf.addEventListener("click", umschalten);
	frageZiel(node).appendChild(knopf);

	return {
		update(next) {
			current = next;
			knopf.setAttribute("aria-label", `Hinweis: ${current.title}`);
			// Keep an open bubble in sync while this field owns it (live error updates).
			if (getAnleitungAnker() === node) setActiveAnleitung(toInstruction(current), node);
		},
		destroy() {
			if (getAnleitungAnker() === node) setActiveAnleitung(null);
			knopf.remove();
		}
	};
};

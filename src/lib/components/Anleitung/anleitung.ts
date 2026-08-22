import type { Action } from "svelte/action";
import type { Snippet } from "svelte";
import type { Importance, NormNote } from "./types";
import { getAnleitungAnker, setActiveAnleitung } from "./store.svelte";

// The instruction an input contributes to the contextual Anleitung display.
export interface AnleitungInstruction {
	title: string;
	description?: string;
	// Rich body as a snippet — takes the place of `description` when set
	// (FieldLabel passes its markup children through here).
	inhalt?: Snippet;
	importance?: Importance;
	norm?: NormNote;
	// Validation message for the field, shown prominently when set.
	error?: string;
	// Prominent call-to-action rendered as a primary button (e.g. the link to the
	// Bedarfsausweis form when the Verbrauchsausweis is not admissible).
	link?: { href: string; label: string };
}

interface AnleitungOptions extends AnleitungInstruction {
	// Optional custom sink: the host renders the guidance itself. With a sink set,
	// no question mark is injected and the shared store stays untouched — the
	// action is inert until the host wires the sink up to its own display.
	onFocus?: (instruction: AnleitungInstruction) => void;
}

// Question mark chip, injected next to the field label — IDENTICAL optics to
// the FieldLabel help button (same classes, same phosphor QuestionIcon bold).
const FRAGE_KNOPF_KLASSEN =
	"ml-1.5 inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center " +
	"rounded-full bg-neutral-200 align-text-bottom text-neutral-600 transition-colors " +
	"hover:bg-primary-100 hover:text-primary-700";

// phosphor QuestionIcon, weight "bold", 14px — the exact icon FieldLabel renders.
const FRAGE_ICON_SVG =
	'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">' +
	'<path d="M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z"/></svg>';

function toInstruction(options: AnleitungOptions): AnleitungInstruction {
	return {
		title: options.title,
		description: options.description,
		importance: options.importance,
		norm: options.norm,
		error: options.error,
		link: options.link
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
	knopf.innerHTML = FRAGE_ICON_SVG;
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

import type { AnleitungInstruction } from "./anleitung";

// Shared sink for the question-mark trigger (use:anleitung): the clicked field
// publishes its guidance plus the field wrapper as anchor. AnleitungZeile places
// itself below the anchor's grid row and points its arrow at the question mark;
// the Anleitung side panel only reads the instruction.
const store = $state<{ active: AnleitungInstruction | null; anker: HTMLElement | null }>({
	active: null,
	anker: null
});

export function setActiveAnleitung(
	instruction: AnleitungInstruction | null,
	anker: HTMLElement | null = null
) {
	store.active = instruction;
	if (instruction === null) {
		store.anker = null;
		return;
	}
	store.anker = anker;
}

export function getActiveAnleitung(): AnleitungInstruction | null {
	return store.active;
}

export function getAnleitungAnker(): HTMLElement | null {
	return store.anker;
}

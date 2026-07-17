import type { AnleitungInstruction } from "./anleitung";

// Shared sink for use:anleitung when a field supplies no explicit onFocus.
// Inputs push their guidance here on focus/hover; the Anleitung panel reads it
// so a field only needs `use:anleitung={{ ... }}` and the panel just `<Anleitung />`.
const store = $state<{ active: AnleitungInstruction | null }>({ active: null });

export function setActiveAnleitung(instruction: AnleitungInstruction | null) {
	store.active = instruction;
}

export function getActiveAnleitung(): AnleitungInstruction | null {
	return store.active;
}

<script lang="ts">
	import WorkflowNav, { type WorkflowStepStatus } from "./WorkflowNav.svelte";

	// Blue "current/total" circle next to a step heading. Clicking it drops down
	// the full step list (WorkflowNav) — the narrow-screen replacement for the
	// permanent workflow column.
	interface Props {
		// Heading above the unfolded list, e.g. "Workflow" or "Abschluss".
		label: string;
		steps: string[];
		active: number;
		status: WorkflowStepStatus[];
		onSelect: (index: number) => void;
	}

	const { label, steps, active, status, onSelect }: Props = $props();

	let open = $state(false);

	function selectStep(index: number) {
		open = false;
		onSelect(index);
	}

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === "Escape") open = false;
	}
</script>

<svelte:window onkeydown={closeOnEscape} />

<div class="relative">
	<button
		type="button"
		onclick={() => (open = !open)}
		aria-expanded={open}
		aria-label="Schritt {active + 1} von {steps.length} — Schrittübersicht öffnen"
		class="flex h-[30px] min-w-[30px] cursor-pointer items-center justify-center rounded-full bg-primary-600 px-1.5 text-[12px] font-bold whitespace-nowrap text-white transition-colors hover:bg-primary-700"
	>
		{active + 1}/{steps.length}
	</button>
	{#if open}
		<!-- Invisible backdrop closes the menu on any click outside of it. -->
		<button
			type="button"
			class="fixed inset-0 z-40 h-full w-full cursor-default"
			aria-label="Schrittübersicht schließen"
			onclick={() => (open = false)}
		></button>
		<div
			class="absolute top-full right-0 z-50 mt-2 max-h-[70vh] w-72 max-w-[80vw] overflow-y-auto rounded-xl bg-neutral-50 p-3 shadow-xl"
		>
			<WorkflowNav {label} {steps} {active} {status} onSelect={selectStep} />
		</div>
	{/if}
</div>

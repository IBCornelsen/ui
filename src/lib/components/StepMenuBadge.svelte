<script lang="ts">
	import WorkflowNav, { type WorkflowStepStatus } from "./WorkflowNav.svelte";

	// Blue "current/total" circle in the middle of the mobile step bar, between the
	// two arrow circles and in their size. Clicking it unfolds the full step list
	// (WorkflowNav) upwards — the narrow-screen replacement for the permanent
	// workflow column.
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
		class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-600 text-[13px] font-bold whitespace-nowrap text-white shadow-lg transition-colors hover:bg-primary-700"
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
		<!-- Opens upwards: the badge sits at the bottom edge of the viewport. -->
		<div
			class="absolute bottom-full left-1/2 z-50 mb-3 max-h-[70vh] w-72 max-w-[85vw] -translate-x-1/2 overflow-y-auto rounded-xl bg-neutral-50 p-3 shadow-xl"
		>
			<WorkflowNav {label} {steps} {active} {status} onSelect={selectStep} />
		</div>
	{/if}
</div>

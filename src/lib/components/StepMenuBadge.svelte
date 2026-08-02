<script lang="ts">
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import type { WorkflowStepStatus } from "./WorkflowNav.svelte";

	// Compact replacement for the workflow column on small screens: a blue
	// "current/total" circle next to the step heading. Clicking it unfolds the
	// full step list (WorkflowNav row styling) and jumps to a step on selection.
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
		if (index === active) return;
		onSelect(index);
	}

	const ROW =
		"flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer last:rounded-b-xl last:border-b-0";
	const CIRCLE =
		"flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[12px]";
</script>

<div class="relative">
	<button
		type="button"
		aria-label="Schrittübersicht öffnen"
		aria-expanded={open}
		onclick={() => (open = !open)}
		class="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold whitespace-nowrap text-white transition-colors hover:bg-primary-700"
	>
		{active + 1}/{steps.length}
	</button>

	{#if open}
		<!-- Invisible backdrop closes the menu on any click outside of it. -->
		<button
			type="button"
			aria-label="Schrittübersicht schließen"
			onclick={() => (open = false)}
			class="fixed inset-0 z-140 h-full w-full cursor-default"
		></button>

		<div
			class="absolute top-full right-0 z-150 mt-2 w-72 max-w-[85vw] rounded-xl border border-neutral-200 bg-white shadow-xl"
		>
			<div
				class="border-b border-neutral-100 px-4 py-2.5 text-xs font-bold tracking-widest text-neutral-700 uppercase"
			>
				{label}&nbsp;Schritt {active + 1}/{steps.length}
			</div>
			{#each steps as step, index (step)}
				<button
					type="button"
					onclick={() => selectStep(index)}
					class="{ROW} {index === active
						? 'bg-primary-50 font-semibold text-primary-700'
						: 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'}"
				>
					{#if status[index] === "complete"}
						<!-- Schritt vollständig → Haken im CI-Blau -->
						<span class="{CIRCLE} bg-primary-600">
							<CheckIcon size={14} weight="bold" class="text-white" />
						</span>
					{:else if status[index] === "blocked"}
						<!-- Abschluss-Prüfung an Pflichtangaben gescheitert → orange -->
						<span class="{CIRCLE} bg-secondary-500 font-bold text-white">{index + 1}</span>
					{:else if index === active}
						<span class="{CIRCLE} bg-primary-600 font-bold text-white">{index + 1}</span>
					{:else}
						<span
							class="{CIRCLE} border border-neutral-300 bg-white font-semibold text-neutral-500"
						>
							{index + 1}
						</span>
					{/if}
					<span class="min-w-0 flex-1">{step}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

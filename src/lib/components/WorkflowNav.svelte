<script lang="ts">
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";

	// Workflow-Stepper der Bestellstrecken (Optik der cad-NavColumn): Karte mit
	// einer Zeile je Schritt; Kreis zeigt Haken (vollständig), orange Nummer
	// (Pflichtangaben offen nach Abschluss-Prüfung) oder Nummer.
	export type WorkflowStepStatus = "complete" | "blocked" | "open";

	interface Props {
		// Überschrift vor „Schritt x/y", z. B. "Workflow" oder "Abschluss".
		label: string;
		steps: string[];
		active: number;
		status: WorkflowStepStatus[];
		onSelect: (index: number) => void;
	}

	const { label, steps, active, status, onSelect }: Props = $props();

	const ROW =
		"flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3 [@media(max-height:920px)]:py-2 text-left text-sm font-medium transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl last:border-b-0";
	const CIRCLE =
		"flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[12px]";
</script>

<div class="mb-2 px-1 text-sm font-bold tracking-widest text-neutral-700 uppercase">
	{label}&nbsp;Schritt {active + 1}/{steps.length}
</div>
<nav class="rounded-xl border border-neutral-200 bg-white shadow-md">
	{#each steps as step, index (step)}
		<button
			data-cy={`tab-${index}`}
			onclick={() => onSelect(index)}
			class="{ROW} {index === active
				? 'bg-primary-50 text-primary-700 font-semibold'
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
				<span class="{CIRCLE} border border-neutral-300 bg-white font-semibold text-neutral-500">
					{index + 1}
				</span>
			{/if}
			<span class="min-w-0 flex-1">{step}</span>
		</button>
	{/each}
</nav>

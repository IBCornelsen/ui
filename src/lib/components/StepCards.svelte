<script lang="ts">
	import Card from "./Card.svelte";
	import StepBadge from "./StepBadge.svelte";

	// Numbered process steps as a card row. The badge shares its line with the
	// heading, so the text below keeps the full card width — stacking the badge
	// on its own line would cost height on a phone and width on a desktop.
	export type Step = {
		title: string;
		text: string;
	};

	interface Props {
		steps: Step[];
		/** Columns from the `lg` breakpoint upwards; below it the cards stack. */
		columns?: 2 | 3 | 4;
		class?: string;
	}

	let { steps, columns = 4, class: className = "" }: Props = $props();

	const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
		2: "sm:grid-cols-2",
		3: "sm:grid-cols-2 lg:grid-cols-3",
		4: "sm:grid-cols-2 lg:grid-cols-4"
	};
</script>

<div class="grid grid-cols-1 gap-4 {COLUMN_CLASSES[columns]} {className}">
	{#each steps as step, index (step.title)}
		<Card size="sm">
			<div class="mb-2 flex items-center gap-2.5">
				<StepBadge step={index + 1} />
				<div class="h5">{step.title}</div>
			</div>
			<p class="m-0 body-md">{step.text}</p>
		</Card>
	{/each}
</div>

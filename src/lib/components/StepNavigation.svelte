<script lang="ts">
	import type { Snippet } from "svelte";
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
	import Button from "./Button.svelte";
	import StepBadge from "./StepBadge.svelte";

	// Step navigation below the sections of a form step: one way back, one way
	// forward, the next step's number in a blue circle. On the last step the
	// caller's closing action (order, save, host action) takes the forward slot.
	// From lg upward only — below lg the fixed MobileStepBar carries both the step
	// change and the closing action; the spacer keeps content clear of it.
	interface Props {
		steps: string[];
		active: number;
		onGoto: (index: number) => void;
		abschlussAktion: Snippet;
	}

	const { steps, active, onGoto, abschlussAktion }: Props = $props();

	const istLetzterSchritt = $derived(active >= steps.length - 1);
</script>

<div
	class="mt-8 flex flex-col gap-3 border-t border-neutral-100 pt-5 max-lg:hidden sm:flex-row sm:items-center"
>
	{#if active > 0}
		<Button variant="outline" class="w-full sm:w-auto" onclick={() => onGoto(active - 1)}>
			<CaretLeftIcon size={16} weight="bold" />
			Zurück
		</Button>
	{/if}

	<div class="w-full sm:ml-auto sm:w-auto">
		{#if istLetzterSchritt}
			{@render abschlussAktion()}
		{:else}
			<Button variant="outline" class="w-full sm:w-auto" onclick={() => onGoto(active + 1)}>
				zu
				<StepBadge step={active + 2} size="sm" />
				{steps[active + 1]}
				<CaretRightIcon size={16} weight="bold" />
			</Button>
		{/if}
	</div>
</div>
<!-- Freiraum für die feste Schritt-Leiste: im letzten Schritt trägt sie zusätzlich
     die Abschluss-Aktion und ist entsprechend höher. -->
<div
	class="lg:hidden"
	class:h-20={!istLetzterSchritt}
	class:h-36={istLetzterSchritt}
	aria-hidden="true"
></div>

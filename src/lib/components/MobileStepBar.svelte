<script lang="ts">
	import type { Snippet } from "svelte";
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Fixed step bar at the bottom edge, below lg only: back circle in the left
	// corner, the step menu badge in the middle, forward circle in the right
	// corner. On the last step the closing action (order, save, host action) sits
	// as a full-width button directly above the circles and stays reachable from
	// any scroll position.
	//
	// The bar is position:fixed and cannot push content — pages keep a spacer at
	// the end of their scroll area: SPACER_CLASS / SPACER_CLASS_MIT_AKTION below.
	interface Props {
		onPrev: () => void;
		onNext: () => void;
		prevDisabled?: boolean;
		nextDisabled?: boolean;
		// Step menu badge (StepMenuBadge) — apps wire their own jump logic.
		menu?: Snippet;
		// Closing action of the last step; the surrounding bar gets a backdrop.
		abschlussAktion?: Snippet;
		// Set false on the intermediate steps, where there is nothing to close yet.
		abschlussSichtbar?: boolean;
		// Measured height of the fixed bar in px (0 while hidden from lg upward).
		// Bind it to lift floating content above the bar, e.g. the GewerkeBar.
		barHeight?: number;
	}

	let {
		onPrev,
		onNext,
		prevDisabled = false,
		nextDisabled = false,
		menu,
		abschlussAktion,
		abschlussSichtbar = true,
		barHeight = $bindable(0)
	}: Props = $props();

	// z-40 keeps the bar below modals and overlays (cad modal z-120, oea overlays z-130+).
	const CIRCLE =
		"flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-600 " +
		"text-white shadow-lg transition-colors hover:bg-primary-700 disabled:cursor-default " +
		"disabled:opacity-40 disabled:hover:bg-primary-600";
</script>

<div
	class="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-2 px-4 pb-4 lg:hidden"
	bind:clientHeight={barHeight}
>
	{#if abschlussAktion && abschlussSichtbar}
		<!-- Weißer Grund: der Knopf steht über dem scrollenden Inhalt. -->
		<div class="rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur-sm">
			{@render abschlussAktion()}
		</div>
	{/if}
	<div class="flex items-center justify-between">
		<button
			type="button"
			class={CIRCLE}
			onclick={onPrev}
			disabled={prevDisabled}
			aria-label="Vorheriger Schritt"
		>
			<CaretLeftIcon size={22} weight="bold" />
		</button>
		{@render menu?.()}
		<button
			type="button"
			class={CIRCLE}
			onclick={onNext}
			disabled={nextDisabled}
			aria-label="Nächster Schritt"
		>
			<CaretRightIcon size={22} weight="bold" />
		</button>
	</div>
</div>

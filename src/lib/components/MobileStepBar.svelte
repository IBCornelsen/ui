<script lang="ts">
	import type { Snippet } from "svelte";
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Fixed step bar at the bottom edge, below lg only: back circle in the left
	// corner, the step menu badge in the middle, forward circle in the right
	// corner — nothing else. The closing actions (order, save, help) live in the
	// right slide-in card; on the last step the forward circle opens that card,
	// which the host wires through `onNext` (Jens 2026-08-03: the action block in
	// the bar covered half the screen on the last step).
	//
	// The bar is position:fixed and cannot push content — pages keep a spacer at
	// the end of their scroll area fed by `barHeight`.
	interface Props {
		onPrev: () => void;
		onNext: () => void;
		prevDisabled?: boolean;
		nextDisabled?: boolean;
		// Step menu badge (StepMenuBadge) — apps wire their own jump logic.
		menu?: Snippet;
		// Accessible name of the forward circle. On the last step the hosts pass
		// something like "Abschluss öffnen", since it opens the card instead.
		nextLabel?: string;
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
		nextLabel = "Nächster Schritt",
		barHeight = $bindable(0)
	}: Props = $props();

	// z-40 keeps the bar below modals and overlays (cad modal z-120, oea overlays z-130+).
	const CIRCLE =
		"flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-600 " +
		"text-white shadow-lg transition-colors hover:bg-primary-700 disabled:cursor-default " +
		"disabled:opacity-40 disabled:hover:bg-primary-600";
</script>

<div
	class="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-2 px-3 pb-0 lg:hidden"
	bind:clientHeight={barHeight}
>
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
			aria-label={nextLabel}
		>
			<CaretRightIcon size={22} weight="bold" />
		</button>
	</div>
</div>

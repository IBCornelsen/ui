<script lang="ts">
	import type { Snippet } from "svelte";
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Fixed step bar at the bottom edge, on EVERY breakpoint (Jens 2026-08-04:
	// same navigation in all layouts): back circle in the left corner, the step
	// menu badge in the middle, forward circle in the right corner — nothing else.
	// The closing actions (order, save, help) live in the right slide-in card; on
	// the last step the forward circle opens that card, which the host wires
	// through `onNext`. Where that card is already docked open (from xl up) the
	// host disables the circle instead — there is nothing left to open.
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
		// Measured height of the fixed bar in px. Bind it to lift floating content
		// above the bar (e.g. the GewerkeBar) and to size the end-of-page spacer.
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

<!-- Bottom padding = safe area: without it the iPhone home indicator overlays the
     circles (hosts need viewport-fit=cover); on devices without an inset it stays
     flush at pb-0. The measured barHeight includes the inset automatically.
     max-w matches the app shells so the circles sit at the content edges instead
     of the far corners of a wide monitor.
     pointer-events: the bar spans the full width but is mostly empty — only the
     controls may catch clicks, the gaps must pass them through to the content. -->
<div
	class="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[1920px] flex-col gap-2 px-3 pb-[env(safe-area-inset-bottom)] lg:px-4 lg:pb-4"
	bind:clientHeight={barHeight}
>
	<div class="flex items-center justify-between">
		<button
			type="button"
			class="pointer-events-auto {CIRCLE}"
			onclick={onPrev}
			disabled={prevDisabled}
			aria-label="Vorheriger Schritt"
		>
			<CaretLeftIcon size={22} weight="bold" />
		</button>
		<div class="pointer-events-auto">
			{@render menu?.()}
		</div>
		<button
			type="button"
			class="pointer-events-auto {CIRCLE}"
			onclick={onNext}
			disabled={nextDisabled}
			aria-label={nextLabel}
		>
			<CaretRightIcon size={22} weight="bold" />
		</button>
	</div>
</div>

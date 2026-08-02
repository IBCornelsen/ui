<script lang="ts">
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Floating circular prev/next buttons for small screens (below lg): step
	// navigation stays reachable from any scroll position while the workflow
	// column and the inline step buttons are hidden.
	interface Props {
		onPrev: () => void;
		onNext: () => void;
		prevDisabled?: boolean;
		nextDisabled?: boolean;
	}

	const { onPrev, onNext, prevDisabled = false, nextDisabled = false }: Props = $props();

	const CIRCLE =
		"flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-colors enabled:cursor-pointer enabled:hover:bg-primary-700 disabled:bg-neutral-300";
</script>

<div class="fixed right-4 bottom-4 z-130 flex gap-3 lg:hidden">
	<button
		type="button"
		aria-label="Vorheriger Schritt"
		onclick={onPrev}
		disabled={prevDisabled}
		class={CIRCLE}
	>
		<CaretLeftIcon size={22} weight="bold" />
	</button>
	<button
		type="button"
		aria-label="Nächster Schritt"
		onclick={onNext}
		disabled={nextDisabled}
		class={CIRCLE}
	>
		<CaretRightIcon size={22} weight="bold" />
	</button>
</div>

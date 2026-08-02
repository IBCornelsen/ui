<script lang="ts">
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Always-visible prev/next step buttons for narrow screens: two blue circles
	// floating in the lower corners of the viewport. Hidden from lg upward, where
	// the step column and the labeled step buttons take over.
	interface Props {
		onPrev: () => void;
		onNext: () => void;
		prevDisabled?: boolean;
		nextDisabled?: boolean;
	}

	const { onPrev, onNext, prevDisabled = false, nextDisabled = false }: Props = $props();

	// z-40 keeps the circles below modals and overlays (cad modal z-120, oea overlays z-130+).
	const CIRCLE =
		"fixed bottom-4 z-40 flex h-12 w-12 cursor-pointer items-center justify-center " +
		"rounded-full bg-primary-600 text-white shadow-lg transition-colors hover:bg-primary-700 " +
		"disabled:cursor-default disabled:opacity-40 disabled:hover:bg-primary-600 lg:hidden";
</script>

<button
	type="button"
	class="{CIRCLE} left-4"
	onclick={onPrev}
	disabled={prevDisabled}
	aria-label="Vorheriger Schritt"
>
	<CaretLeftIcon size={22} weight="bold" />
</button>
<button
	type="button"
	class="{CIRCLE} right-4"
	onclick={onNext}
	disabled={nextDisabled}
	aria-label="Nächster Schritt"
>
	<CaretRightIcon size={22} weight="bold" />
</button>

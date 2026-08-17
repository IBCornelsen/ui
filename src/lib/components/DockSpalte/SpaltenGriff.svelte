<script lang="ts">
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Handle of a dock column: bold primary button so it is not overlooked; sits
	// one handle height above the vertical center (Jens 2026-08-17). Positioning
	// (absolute/fixed, rounding, z-index) comes from the caller via
	// `positionClass` — DockSpalte uses it internally, overlays use it directly.
	let {
		direction,
		label,
		onclick,
		positionClass = ""
	} = $props<{
		direction: "left" | "right";
		label: string;
		onclick: () => void;
		positionClass?: string;
	}>();
</script>

<button
	type="button"
	{onclick}
	aria-label={label}
	class="flex h-20 w-8 -translate-y-[150%] cursor-pointer items-center justify-center border border-primary-700 bg-primary-600 text-white shadow-lg transition-colors hover:bg-primary-700 {positionClass}"
>
	{#if direction === "left"}
		<CaretLeftIcon size={16} weight="bold" />
	{:else}
		<CaretRightIcon size={16} weight="bold" />
	{/if}
</button>

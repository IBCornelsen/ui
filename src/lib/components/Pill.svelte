<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	// Selectable chip for single-choice question groups (radio semantics).
	// `assumption` marks a value that was prefilled from a guess ("Weiß ich nicht")
	// and still awaits user confirmation — amber instead of the primary color.
	interface Props extends HTMLButtonAttributes {
		active?: boolean;
		assumption?: boolean;
		children: Snippet;
	}

	let {
		active = false,
		assumption = false,
		type = "button",
		class: className = "",
		children,
		...rest
	}: Props = $props();

	const base =
		"px-2.5 py-1.5 rounded-lg border text-[11px] cursor-pointer transition-colors inline-flex items-center gap-1.5";
	const activeClasses = "border-primary-600 bg-primary-600 text-white font-semibold";
	const inactiveClasses =
		"border-neutral-300 bg-white text-neutral-700 hover:border-primary-600 hover:text-primary-700";
	const assumptionClasses = "border-[#d9c47a] bg-[#fdf9ec] text-[#8a6d1a] font-semibold";

	const stateClasses = $derived(
		assumption ? assumptionClasses : active ? activeClasses : inactiveClasses
	);
</script>

<button {type} class="{base} {stateClasses} {className}" {...rest}>
	{@render children()}
</button>

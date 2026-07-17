<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";

	interface Props extends Omit<HTMLSelectAttributes, "value"> {
		value?: unknown;
		invalid?: boolean;
		element?: HTMLSelectElement;
		children: Snippet;
	}

	let {
		value = $bindable(),
		invalid = false,
		element = $bindable(),
		class: className = "",
		children,
		...rest
	}: Props = $props();

	// appearance-none + pr-10: eigenes Caret statt nativer Pfeil, damit die Höhe der
	// des Inputs entspricht (native selects ignorieren padding-block teilweise).
	const base =
		"w-full cursor-pointer appearance-none rounded-md border py-2 pr-10 pl-3 text-sm leading-normal text-neutral-800 transition-colors focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-500";
	const ok = "border-neutral-300 bg-white focus:border-primary-600 focus:ring-primary-600/15";
	const error = "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-500/20";
</script>

<div class="relative w-full">
	<select
		bind:value
		bind:this={element}
		class={[base, !invalid && ok, invalid && error, className]}
		{...rest}
	>
		{@render children()}
	</select>

	<CaretDownIcon
		size={16}
		weight="bold"
		class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-600"
	/>
</div>

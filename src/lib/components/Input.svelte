<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "value"> {
		value?: unknown;
		// invalid: roter Rahmen für leere/ungültige Pflichtfelder (wie in den Formularen).
		invalid?: boolean;
		element?: HTMLInputElement;
		// Optionales Icon links im Feld (z. B. Suche, E-Mail).
		icon?: Snippet;
	}

	let {
		value = $bindable(),
		invalid = false,
		element = $bindable(),
		class: className = "",
		icon,
		...rest
	}: Props = $props();

	const base =
		"w-full rounded-md border px-3 py-2 text-sm leading-normal text-neutral-800 transition-colors focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-500";
	const ok = "border-neutral-300 bg-white focus:border-primary-600 focus:ring-primary-600/15";
	const error = "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-500/20";
</script>

{#if icon}
	<div class="relative w-full">
		<span
			class="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center text-neutral-400"
		>
			{@render icon()}
		</span>
		<input
			bind:value
			bind:this={element}
			class={[base, "pl-9", !invalid && ok, invalid && error, className]}
			{...rest}
		/>
	</div>
{:else}
	<input
		bind:value
		bind:this={element}
		class={[base, !invalid && ok, invalid && error, className]}
		{...rest}
	/>
{/if}

<style>
	/* Spinner-Pfeile bei Zahlenfeldern entfernen. */
	input[type="number"] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>

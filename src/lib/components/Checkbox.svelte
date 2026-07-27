<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	// Styled checkbox (shared form standard). With children it renders a
	// clickable label row; without children it is just the box.
	// checked erlaubt null/undefined: viele Datensatz-Felder sind boolean | null,
	// und gebundene Werte dürfen initial undefined sein (kein Fallback-Wert —
	// sonst verbietet Svelte `bind:checked={undefined}`).
	interface Props extends Omit<HTMLInputAttributes, "type" | "checked"> {
		checked?: boolean | null;
		element?: HTMLInputElement;
		children?: Snippet;
		// Extra classes for the label row (only used when children are given).
		labelClass?: string;
	}

	let {
		checked = $bindable(),
		element = $bindable(),
		class: className = "",
		labelClass = "",
		children,
		...rest
	}: Props = $props();

	// h-5!/w-5! mit important: globale App-Stylesheets setzen Inputs sonst auf
	// volle Breite und die Box überdeckt Nachbar-Elemente.
	const box =
		"checked:border-primary-600 checked:bg-primary-600 h-5! w-5! shrink-0 cursor-pointer appearance-none rounded-sm border border-neutral-300 bg-white transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40";
</script>

{#if children}
	<label class={["flex cursor-pointer items-start gap-2 text-sm text-neutral-700", labelClass]}>
		<input type="checkbox" bind:checked bind:this={element} class={[box, className]} {...rest} />
		<span class="flex-1">{@render children()}</span>
	</label>
{:else}
	<input type="checkbox" bind:checked bind:this={element} class={[box, className]} {...rest} />
{/if}

<style>
	input:checked {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 5l2.5 2.5L8 3' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
		background-size: 100% 100%;
	}
</style>

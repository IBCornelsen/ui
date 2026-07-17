<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLTextareaAttributes, "value"> {
		value?: unknown;
		invalid?: boolean;
		element?: HTMLTextAreaElement;
	}

	let {
		value = $bindable(),
		invalid = false,
		element = $bindable(),
		class: className = "",
		...rest
	}: Props = $props();

	const base =
		"w-full rounded-md border px-3 py-2 text-sm leading-normal text-neutral-800 transition-colors focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-500";
	const ok = "border-neutral-300 bg-white focus:border-primary-600 focus:ring-primary-600/15";
	const error = "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-500/20";
</script>

<textarea
	bind:value
	bind:this={element}
	class={[base, !invalid && ok, invalid && error, className]}
	{...rest}
></textarea>

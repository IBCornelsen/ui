<script lang="ts">
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";

	// Step number in a filled circle — same visual language as the circles in
	// WorkflowNav. Used in front of step headings and inside the step navigation
	// buttons of the order forms. With `status` the circle carries the completion
	// state instead of the number, in the same colours the Accordion section
	// headers use: check in CI blue, cross in CI orange.
	interface Props {
		step: number;
		size?: "sm" | "md";
		status?: "complete" | "fehlt" | null;
	}

	const { step, size = "md", status = null }: Props = $props();

	const SIZE_CLASSES = {
		sm: "h-[22px] w-[22px] text-[11px]",
		md: "h-[26px] w-[26px] text-[13px]"
	};

	const ICON_SIZES = {
		sm: 12,
		md: 14
	};
</script>

<span
	class="inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white {SIZE_CLASSES[
		size
	]}"
	class:bg-primary-600={status !== "fehlt"}
	class:bg-secondary-500={status === "fehlt"}
	aria-hidden="true"
>
	{#if status === "complete"}
		<CheckIcon size={ICON_SIZES[size]} weight="bold" />
	{:else if status === "fehlt"}
		<XIcon size={ICON_SIZES[size]} weight="bold" />
	{:else}
		{step}
	{/if}
</span>

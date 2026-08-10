<script lang="ts">
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";

	// Completion marker of the section and step headings: check in a CI blue
	// circle when everything is filled in, cross in a CI orange one when
	// something is missing. Sits to the RIGHT of the heading it belongs to.
	interface Props {
		status: "complete" | "fehlt";
		size?: "sm" | "md";
	}

	const { status, size = "sm" }: Props = $props();

	const SIZE_CLASSES = {
		sm: "h-4.5 w-4.5",
		md: "h-5.5 w-5.5"
	};

	const ICON_SIZES = {
		sm: 11,
		md: 14
	};
</script>

<span
	class="flex shrink-0 items-center justify-center rounded-full {SIZE_CLASSES[size]}"
	class:bg-primary-600={status === "complete"}
	class:bg-secondary-500={status === "fehlt"}
	aria-hidden="true"
>
	{#if status === "complete"}
		<CheckIcon size={ICON_SIZES[size]} weight="bold" class="text-white" />
	{:else}
		<XIcon size={ICON_SIZES[size]} weight="bold" class="text-white" />
	{/if}
</span>

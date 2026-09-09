<script lang="ts">
	// Building attribute as a rounded chip: used for the property profile in the
	// building list and on the building detail page. The optional label names the
	// value where the value alone would be ambiguous (living vs. usable area).
	interface Props {
		value: string;
		label?: string;
		title?: string;
	}

	const { value, label, title }: Props = $props();
</script>

<span
	class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-700"
	{title}
>
	{#if label}
		<span class="font-normal text-neutral-500">{label}</span>
	{/if}
	<span>{value}</span>
</span>

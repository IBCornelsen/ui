<script lang="ts">
	// Building attribute as a rounded chip: same wording and weight everywhere,
	// used by the building list and the building detail page.
	interface Props {
		value: string;
		title?: string;
	}

	const { value, title }: Props = $props();
</script>

<span
	class="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-700"
	{title}
>
	{value}
</span>

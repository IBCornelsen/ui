<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import FilePdfIcon from "phosphor-svelte/lib/FilePdfIcon";

	// PDF-Vorschau-Zeile der Bestellstrecken-Karten: PDF-Kachel links, Label rechts.
	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	const { children, ...rest }: Props = $props();
</script>

<button
	type="button"
	class="flex w-full cursor-pointer items-center gap-3 rounded-md border border-neutral-200 bg-white px-3 py-2 text-left text-sm font-medium text-neutral-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 disabled:cursor-default disabled:opacity-50"
	{...rest}
>
	<span
		class="flex h-10 w-8 shrink-0 items-center justify-center rounded-xs border border-neutral-200 bg-neutral-50"
	>
		<FilePdfIcon size={20} class="text-error-600" />
	</span>
	{@render children()}
</button>

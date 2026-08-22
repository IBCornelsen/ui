<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import FilePdfIcon from "phosphor-svelte/lib/FilePdfIcon";

	// PDF-Vorschau-Zeile der Bestellstrecken-Karten: PDF-Kachel links, Label rechts.
	// size="lg" für Dokument-Boxen, in denen das Symbol die Zeile trägt.
	interface Props extends HTMLButtonAttributes {
		children: Snippet;
		size?: "md" | "lg";
	}

	const { children, size = "md", ...rest }: Props = $props();

	const GROESSEN = {
		md: { knopf: "gap-3 px-3 py-2 text-sm", kachel: "h-10 w-8", symbol: 20 },
		lg: { knopf: "gap-4 px-4 py-3 text-base", kachel: "h-14 w-11", symbol: 30 }
	};
	const groesse = $derived(GROESSEN[size]);
</script>

<button
	type="button"
	class="flex w-full cursor-pointer items-center rounded-md border border-neutral-200 bg-white text-left font-medium text-neutral-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 disabled:cursor-default disabled:opacity-50 {groesse.knopf}"
	{...rest}
>
	<span
		class="flex shrink-0 items-center justify-center rounded-xs border border-neutral-200 bg-neutral-50 {groesse.kachel}"
	>
		<FilePdfIcon size={groesse.symbol} class="text-error-600" />
	</span>
	{@render children()}
</button>

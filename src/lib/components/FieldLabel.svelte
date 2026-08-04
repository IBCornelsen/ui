<script lang="ts">
	import type { Snippet } from "svelte";
	import QuestionIcon from "phosphor-svelte/lib/QuestionIcon";
	import { getAnleitungAnker, setActiveAnleitung } from "./Anleitung/store.svelte";

	interface Props {
		title: string;
		children?: Snippet;
		required?: boolean;
	}

	let { title, children, required = false }: Props = $props();

	// Klick aufs Fragezeichen füllt den geteilten Anleitung-Store; die Anzeige
	// übernimmt die AnleitungZeile des umgebenden Rasters — volle Breite unter der
	// Feldzeile statt einer Sprechblase (Jens 2026-08-04). Erneuter Klick schließt.
	let wurzelEl = $state<HTMLElement>();

	function umschalten() {
		if (!wurzelEl) return;
		if (getAnleitungAnker() === wurzelEl) {
			setActiveAnleitung(null);
			return;
		}
		setActiveAnleitung({ title, inhalt: children }, wurzelEl);
	}
</script>

<!-- Hilfe-Symbol steht direkt hinter dem Text, nicht am Spaltenrand: in engen
     Rastern riss `justify-between` eine Lücke auf und schob das Symbol bei langen
     Labels in die Nachbarspalte. `items-start` hält es bei zweizeiligen Labels
     auf der ersten Zeile. -->
<div bind:this={wurzelEl} class="flex items-start gap-1.5">
	<label class="text-sm leading-snug font-semibold text-neutral-700">
		{title}{#if required}<span class="ml-0.5 text-secondary-600">*</span>{/if}
	</label>

	{#if children}
		<button
			type="button"
			data-anleitung-frage
			class="mt-px flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-700"
			onclick={umschalten}
			aria-label="Hinweis: {title}"
		>
			<QuestionIcon size={14} weight="bold" />
		</button>
	{/if}
</div>

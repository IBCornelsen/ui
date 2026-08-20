<script lang="ts">
	import type { Snippet } from "svelte";
	import FieldLabel from "./FieldLabel.svelte";

	// Label-über-Feld-Wrapper (Formular-Standard): Label + optionaler Fehler/Hinweis.
	// Die Label-Zeile kommt aus FieldLabel — EINE Optik für alle Strecken; über den
	// optionalen `hilfe`-Snippet erscheint dort das „?" mit AnleitungZeile-Anbindung.
	interface Props {
		label?: string;
		for?: string;
		error?: string;
		hint?: string;
		required?: boolean;
		hilfe?: Snippet;
		children: Snippet;
	}

	let { label, for: forId, error, hint, required = false, hilfe, children }: Props = $props();
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<FieldLabel title={label} {required} for={forId} children={hilfe} />
	{/if}

	{@render children()}

	{#if error}
		<span class="text-xs text-error-600">{error}</span>
	{:else if hint}
		<span class="text-xs text-neutral-600">{hint}</span>
	{/if}
</div>

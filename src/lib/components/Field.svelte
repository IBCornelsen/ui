<script lang="ts">
	import type { Snippet } from "svelte";

	// Label-über-Feld-Wrapper (Formular-Standard): Label + optionaler Fehler/Hinweis.
	interface Props {
		label?: string;
		for?: string;
		error?: string;
		hint?: string;
		required?: boolean;
		children: Snippet;
	}

	let { label, for: forId, error, hint, required = false, children }: Props = $props();
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<label class="text-xs font-medium text-neutral-700" for={forId}>
			{label}{#if required}<span class="text-secondary-600"> *</span>{/if}
		</label>
	{/if}

	{@render children()}

	{#if error}
		<span class="text-xs text-error-600">{error}</span>
	{:else if hint}
		<span class="text-xs text-neutral-600">{hint}</span>
	{/if}
</div>

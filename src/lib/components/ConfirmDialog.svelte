<script lang="ts">
	import type { Snippet } from "svelte";

	// Kompakter Bestätigungsdialog (Titel + Hinweistext + Abbrechen/Bestätigen).
	// Projektweit einheitliche Optik für "Aktion mit Folgen"-Rückfragen; für
	// Aktions-Listen oder eigene Inhalte stattdessen Modal verwenden.
	let {
		offen = $bindable(false),
		title,
		message,
		confirmLabel = "Bestätigen",
		cancelLabel = "Abbrechen",
		onConfirm,
		onCancel,
		children
	}: {
		offen?: boolean;
		title: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		onConfirm: () => void;
		onCancel?: () => void;
		children?: Snippet;
	} = $props();

	function abbrechen() {
		offen = false;
		onCancel?.();
	}

	function bestaetigen() {
		offen = false;
		onConfirm();
	}

	function onKeydown(event: KeyboardEvent) {
		if (!offen) return;
		if (event.key === "Escape") abbrechen();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if offen}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="fixed inset-0 z-200 flex items-center justify-center bg-black/35" onclick={abbrechen}>
		<div
			class="w-80 rounded-md bg-white p-5 text-[13px] shadow-xl"
			onclick={(event) => event.stopPropagation()}
			role="alertdialog"
			aria-label={title}
		>
			<p class="mb-2 text-sm font-semibold text-neutral-800">{title}</p>
			<div class="mb-4 leading-snug text-neutral-600">
				{#if children}
					{@render children()}
				{:else if message}
					{message}
				{/if}
			</div>
			<div class="flex justify-end gap-2">
				<button
					onclick={abbrechen}
					class="cursor-pointer rounded border border-neutral-300 bg-neutral-100 px-4 py-1.5 text-xs text-neutral-700 transition-colors hover:bg-neutral-200"
				>
					{cancelLabel}
				</button>
				<button
					onclick={bestaetigen}
					class="cursor-pointer rounded border-none bg-primary-600 px-4 py-1.5 text-xs text-white transition-colors hover:bg-primary-700"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}

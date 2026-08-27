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
		ton = "primaer",
		onConfirm,
		onCancel,
		children
	}: {
		offen?: boolean;
		title: string;
		message?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		// "destruktiv" turns the confirm button red — for actions that discard
		// data or end a process (cancel an order, delete).
		ton?: "primaer" | "destruktiv";
		onConfirm: () => void;
		onCancel?: () => void;
		children?: Snippet;
	} = $props();

	const BESTAETIGEN_FARBE = {
		primaer: "bg-primary-600 hover:bg-primary-700",
		destruktiv: "bg-error-600 hover:bg-error-700"
	};
	const bestaetigenFarbe = $derived(BESTAETIGEN_FARBE[ton]);

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
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-200 flex items-center justify-center bg-black/35"
		role="presentation"
		onclick={abbrechen}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="w-80 rounded-md bg-white p-5 text-[13px] shadow-xl outline-none"
			onclick={(event) => event.stopPropagation()}
			role="alertdialog"
			aria-label={title}
			tabindex="-1"
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
					class="cursor-pointer rounded border-none px-4 py-1.5 text-xs text-white transition-colors {bestaetigenFarbe}"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import Button from "./Button.svelte";

	// Single-question confirmation. Modal.svelte covers stacked async action lists;
	// this is the "are you sure?" case: one message, confirm, cancel.
	// Closing by backdrop, Escape or the cancel button all run onCancel.
	interface Props {
		offen?: boolean;
		title: string;
		message: string;
		confirmLabel: string;
		cancelLabel?: string;
		onConfirm: () => void;
		onCancel?: () => void;
	}

	let {
		offen = $bindable(false),
		title,
		message,
		confirmLabel,
		cancelLabel = "Abbrechen",
		onConfirm,
		onCancel
	}: Props = $props();

	function abbrechen() {
		offen = false;
		onCancel?.();
	}

	function bestaetigen() {
		offen = false;
		onConfirm();
	}

	function onBackdropClick(event: MouseEvent) {
		if (event.target !== event.currentTarget) return;
		abbrechen();
	}

	function onKeydown(event: KeyboardEvent) {
		if (!offen) return;
		if (event.key !== "Escape") return;
		abbrechen();
	}

	// Body scroll lock while open, mirroring Modal.svelte.
	$effect(() => {
		if (!offen) return;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if offen}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
		onclick={onBackdropClick}
	>
		<div
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="confirmDialogTitel"
			aria-describedby="confirmDialogText"
			class="w-full max-w-md overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-2xl"
		>
			<div class="border-b border-neutral-200 px-5 py-3">
				<span id="confirmDialogTitel" class="text-base font-bold text-neutral-800">{title}</span>
			</div>

			<p id="confirmDialogText" class="px-5 py-5 text-sm leading-relaxed text-neutral-600">
				{message}
			</p>

			<div class="flex justify-end gap-2 border-t border-neutral-200 px-5 pt-4 pb-5">
				<Button variant="neutral" onclick={abbrechen}>{cancelLabel}</Button>
				<Button variant="primary" onclick={bestaetigen}>{confirmLabel}</Button>
			</div>
		</div>
	</div>
{/if}

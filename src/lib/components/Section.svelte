<script lang="ts">
	import type { Snippet } from "svelte";
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";

	// Aufklappbarer Formular-Abschnitt (Akkordeon) mit Buchstaben-Badge + Validierungsstatus.
	interface Props {
		bereich: string;
		title: string;
		id?: string;
		open?: boolean;
		isValid?: boolean | null;
		showErrors?: boolean;
		// Unvollständigkeit als Warnung statt Fehler anzeigen; Schließen bleibt erlaubt.
		optional?: boolean;
		onRequestOpen?: () => void;
		children?: Snippet;
	}

	let {
		bereich,
		title,
		id,
		open = $bindable(true),
		isValid = null,
		showErrors = false,
		optional = false,
		onRequestOpen,
		children
	}: Props = $props();

	function toggle() {
		if (open) {
			// Pflichtabschnitte mit leeren Feldern nicht manuell schließen.
			if (isValid !== false || optional) open = false;
			return;
		}
		if (onRequestOpen) {
			onRequestOpen();
			return;
		}
		open = true;
	}
</script>

<!-- Optik identisch mit Accordion.svelte (Bestellstrecken-Referenz):
     primary-50-Box ohne Rahmen. Bei Änderungen beide Komponenten angleichen. -->
<div {id} class="scroll-mt-4 rounded-xl bg-primary-50" class:overflow-hidden={!open}>
	<button
		type="button"
		class="flex w-full items-center gap-2 rounded-t-xl px-2 py-3 text-left transition-colors hover:bg-white/40 sm:gap-3 sm:px-4"
		onclick={toggle}
	>
		<span
			class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-600 font-mono text-[12px] font-bold text-white"
		>
			{bereich}
		</span>
		<span class="flex-1 text-sm font-semibold text-neutral-800">{title}</span>

		<!-- Status wie im Accordion (Verbrauchsausweis-Referenz): Haken im CI-blauen
		     Kreis bzw. X im CI-orangen Kreis — keine nackten Dreiecke/Häkchen. -->
		{#if isValid === true && showErrors}
			<span
				class="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary-600"
			>
				<CheckIcon size={11} weight="bold" class="text-white" />
			</span>
		{:else if isValid === false && showErrors}
			<span
				class="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-secondary-500"
			>
				<XIcon size={11} weight="bold" class="text-white" />
			</span>
		{/if}

		<CaretDownIcon
			size={16}
			weight="bold"
			class={`shrink-0 text-neutral-600 transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
		/>
	</button>

	<div
		class="transition-all duration-200"
		class:max-h-0={!open}
		class:overflow-hidden={!open}
		class:max-h-[3000px]={open}
		class:overflow-visible={open}
	>
		<div class="border-t border-white">
			<div class="p-2 sm:p-4">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>

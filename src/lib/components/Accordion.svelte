<script lang="ts">
	import type { Snippet } from "svelte";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";

	// Abschnitts-Accordion der Bestellstrecken (cad-Optik): primary-50-Box mit
	// Badge, Titel, Vollständigkeits-Kreis (Haken/X) und Caret. Der Körper bleibt
	// GEMOUNTET und wird zugeklappt nur versteckt — Abschnittskomponenten dürfen
	// Mount-Seiteneffekte haben (siehe Formular-Strecken).
	interface Props {
		badge: string;
		title: string;
		open?: boolean;
		complete: boolean;
		id?: string;
		// Ohne Callback togglet der Kopf selbst; mit Callback steuert der Aufrufer
		// `open` (z. B. um beim Öffnen weitere Zustände zu setzen).
		onHeaderClick?: () => void;
		children: Snippet;
	}

	let { badge, title, open = $bindable(true), complete, id, onHeaderClick, children }: Props = $props();

	function handleHeaderClick() {
		if (onHeaderClick) {
			onHeaderClick();
			return;
		}
		open = !open;
	}
</script>

<div {id} class="scroll-mt-4 overflow-clip rounded-xl bg-primary-50">
	<button
		type="button"
		onclick={handleHeaderClick}
		class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/40"
	>
		<span
			class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-600 font-mono text-[12px] font-bold text-white"
		>
			{badge}
		</span>
		<span class="flex-1 text-sm font-semibold text-neutral-800">{title}</span>
		{#if complete}
			<!-- Abschnitt vollständig → Haken im CI-blauen Kreis -->
			<span class="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary-600">
				<CheckIcon size={11} weight="bold" class="text-white" />
			</span>
		{:else}
			<!-- Pflichtangaben offen → X im CI-orangen Kreis -->
			<span class="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-secondary-500">
				<XIcon size={11} weight="bold" class="text-white" />
			</span>
		{/if}
		<CaretDownIcon
			size={16}
			weight="bold"
			class="shrink-0 text-neutral-500 transition-transform duration-200 {open ? '-rotate-180' : ''}"
		/>
	</button>
	<div data-cy="section-body" class="border-t border-white p-4" class:hidden={!open}>
		{@render children()}
	</div>
</div>

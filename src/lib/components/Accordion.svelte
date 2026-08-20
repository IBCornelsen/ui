<script lang="ts">
	import type { Snippet } from "svelte";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
	import StatusKreis from "./StatusKreis.svelte";

	// DIE Abschnitts-Hülle aller Strecken (die frühere Section.svelte ist damit
	// abgelöst): primary-50-Box mit Badge, Titel, Vollständigkeits-Kreis (Haken/X)
	// und Caret. Der Körper bleibt GEMOUNTET und wird zugeklappt nur versteckt —
	// Abschnittskomponenten dürfen Mount-Seiteneffekte haben (Formular-Strecken).
	interface Props {
		badge: string;
		title: string;
		// Kurzfassung für schmale Bildschirme — die Langfassung läuft dort über
		// drei Zeilen. Ohne Angabe steht überall der Langtitel.
		titleKurz?: string;
		open?: boolean;
		complete: boolean;
		id?: string;
		// Ohne Callback togglet der Kopf selbst; mit Callback steuert der Aufrufer
		// `open` (z. B. um beim Öffnen weitere Zustände zu setzen).
		onHeaderClick?: () => void;
		children: Snippet;
	}

	let {
		badge,
		title,
		titleKurz,
		open = $bindable(true),
		complete,
		id,
		onHeaderClick,
		children
	}: Props = $props();

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
		class="flex w-full items-center gap-2 px-2 py-3 text-left transition-colors hover:bg-white/40 sm:gap-3 sm:px-4"
	>
		<span
			class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-600 font-mono text-[12px] font-bold text-white"
		>
			{badge}
		</span>
		<span class="flex-1 text-sm font-semibold text-neutral-800">
			{#if titleKurz}
				<span class="sm:hidden">{titleKurz}</span>
				<span class="max-sm:hidden">{title}</span>
			{:else}
				{title}
			{/if}
		</span>
		<StatusKreis status={complete ? "complete" : "fehlt"} />
		<CaretDownIcon
			size={16}
			weight="bold"
			class="shrink-0 text-neutral-500 transition-transform duration-200 {open
				? '-rotate-180'
				: ''}"
		/>
	</button>
	<!-- p-3 unter sm: auf 390px-Bildschirmen liegen bereits drei Rahmen um den
	     Körper, jeder Pixel Innenabstand fehlt den Feldern. -->
	<div data-cy="section-body" class="border-t border-white p-2 sm:p-4" class:hidden={!open}>
		{@render children()}
	</div>
</div>

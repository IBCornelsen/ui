<script lang="ts">
	// Uniform photo upload used across the whole product: order flow, cad sections
	// and dashboard. Every upload picks its category from the same list, and the
	// explanatory text lives behind the "?" chip (AnleitungZeile) — never as
	// inline prose next to the field.
	import PlusIcon from "phosphor-svelte/lib/PlusIcon";
	import TrashIcon from "phosphor-svelte/lib/TrashIcon";
	import { anleitung, type AnleitungInstruction } from "../Anleitung/anleitung";
	import AnleitungZeile from "../Anleitung/AnleitungZeile.svelte";
	import { addNotification } from "../Notifications/store.svelte";
	import { FOTO_KATEGORIEN, fotoKategorieLabel, type FotoKategorie } from "./fotoKategorien";
	import type { FotoUploadBild } from "./types";

	interface Props {
		titel?: string;
		bilder?: FotoUploadBild[];
		kategorien?: FotoKategorie[];
		// Category the list opens with — the section's own one in the order flow.
		vorauswahl?: string;
		max?: number;
		min?: number;
		// Count that min/max refer to. Defaults to every shown photo. The order
		// flow passes the count of its own category only, because a section block
		// also keeps foreign categories uploaded from it visible.
		bewerteteAnzahl?: number;
		// Name of the hidden file input (form semantics + e2e selectors).
		name?: string;
		laeuft?: boolean;
		hochladenErlaubt?: boolean;
		loeschenErlaubt?: boolean;
		// Guidance behind the "?" chip next to the title.
		hinweis?: AnleitungInstruction;
		spalten?: string;
		onHochladen: (dateien: File[], kategorie: string) => void | Promise<void>;
		onLoeschen?: (id: string) => void | Promise<void>;
	}

	let {
		titel = "Fotos",
		bilder = [],
		kategorien = FOTO_KATEGORIEN,
		vorauswahl,
		max = Infinity,
		min = 0,
		bewerteteAnzahl,
		name = "",
		laeuft = false,
		hochladenErlaubt = true,
		loeschenErlaubt = true,
		hinweis,
		spalten = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
		onHochladen,
		onLoeschen
	}: Props = $props();

	let zielKategorie = $state<string | undefined>(undefined);

	function gewerteteAnzahl(): number {
		if (bewerteteAnzahl === undefined) return bilder.length;
		return bewerteteAnzahl;
	}

	const anzahl = $derived(gewerteteAnzahl());
	const freiePlaetze = $derived(max - anzahl);
	const maximalErreicht = $derived(anzahl >= max);
	const fehlend = $derived(Math.max(0, min - anzahl));
	// Bei genau einem erlaubten Foto bleibt die Kachel als "Foto ersetzen"
	// stehen — der Aufrufer tauscht das Bestandsbild beim Upload aus.
	const ersetzenAngeboten = $derived(max === 1 && anzahl >= 1);

	function fotoWort(wert: number): string {
		if (wert === 1) return "Foto";
		return "Fotos";
	}

	// Kein Zwischenschritt vor der Dateiauswahl (Jens 2026-08-10): der Klick auf
	// eine "+"-Kachel legt das Bauteil fest UND öffnet den Dateidialog.
	function fotoWaehlen(kategorie: string) {
		zielKategorie = kategorie;
		dateiAuswahlOeffnen();
	}

	// iOS Safari verschluckt bei WIEDERVERWENDETEN file-Inputs gern das
	// change-Ereignis der zweiten Auswahl — deshalb pro Auswahl ein frisches
	// Input im DOM (Klicks auf losgelöste Inputs ignorieren manche Browser).
	// Das feste benannte Input bleibt für direkte Zuweisungen (Tests) bestehen.
	let wegwerfFeld: HTMLInputElement | undefined;

	function dateiAuswahlOeffnen() {
		// Vorgaenger erst JETZT aufraeumen: iOS feuert beim Fotowaehlen teils ein
		// fruehes cancel, bevor das (langsame) change kommt — wer auf cancel
		// entfernt, verliert die Auswahl.
		wegwerfFeld?.remove();
		const feld = document.createElement("input");
		feld.type = "file";
		feld.accept = "image/*";
		feld.multiple = max !== 1;
		feld.style.display = "none";
		feld.onchange = () => {
			const dateien = Array.from(feld.files || []);
			if (wegwerfFeld === feld) wegwerfFeld = undefined;
			feld.remove();
			dateienVerarbeiten(dateien);
		};
		wegwerfFeld = feld;
		document.body.appendChild(feld);
		feld.click();
	}

	// Eine "+"-Kachel je Ziel: im Formular genau eine (das Bauteil des Abschnitts
	// steht fest), in Sammelblöcken ohne Vorauswahl eine beschriftete je Bauteil —
	// so steht das Ziel auf dem Knopf, statt danach gefragt zu werden.
	const uploadZiele = $derived.by(() => {
		if (vorauswahl) {
			const treffer = kategorien.find((kategorie) => kategorie.wert === vorauswahl);
			if (treffer) return [treffer];
		}
		return kategorien;
	});

	// Without a pick from the list (files dropped straight onto the input) the
	// preselected category wins, then the first one of the list.
	function gewaehlteKategorie(): string | undefined {
		if (zielKategorie) return zielKategorie;
		if (vorauswahl) return vorauswahl;
		return kategorien[0]?.wert;
	}

	function dateienUebernehmen(event: Event) {
		const feld = event.target as HTMLInputElement;
		const gewaehlt = Array.from(feld.files || []);
		feld.value = "";
		dateienVerarbeiten(gewaehlt);
	}

	function dateienVerarbeiten(gewaehlt: File[]) {
		const kategorie = gewaehlteKategorie();
		zielKategorie = undefined;
		if (!kategorie) return;
		const dateien = begrenzteAuswahl(gewaehlt, kategorie);
		if (!dateien.length) return;
		void onHochladen(dateien, kategorie);
	}

	// max zählt nur die bewertete Kategorie des Blocks — Uploads einer fremden
	// Kategorie werden nicht gekappt. Überzählige Dateien fallen nie still weg.
	function begrenzteAuswahl(dateien: File[], kategorie: string): File[] {
		if (vorauswahl && kategorie !== vorauswahl) return dateien;
		// Ersetzen: genau ein Foto durchlassen, auch wenn der Platz belegt ist.
		if (max === 1) return dateien.slice(0, 1);
		if (dateien.length <= freiePlaetze) return dateien;
		const behalten = Math.max(0, freiePlaetze);
		addNotification({
			message: `Maximal ${max} ${fotoWort(max)} möglich.`,
			subtext: `${dateien.length - behalten} ${fotoWort(dateien.length - behalten)} nicht hochgeladen.`,
			type: "warning",
			timeout: 5000,
			dismissible: true
		});
		return dateien.slice(0, behalten);
	}
</script>

{#snippet kopfzeile()}
	<p data-anleitung-anker class="text-sm font-semibold text-neutral-900">
		{titel}
	</p>
	<span class="text-xs font-semibold text-neutral-500">
		{#if fehlend > 0}
			Noch {fehlend}
			{fotoWort(fehlend)} erforderlich
		{:else if max !== Infinity}
			{anzahl}/{max} Fotos
		{:else}
			{anzahl}
			{fotoWort(anzahl)}
		{/if}
	</span>
{/snippet}

<div class="grid grid-cols-1 gap-3">
	{#if hinweis}
		<div
			use:anleitung={hinweis}
			class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"
		>
			{@render kopfzeile()}
		</div>
	{:else}
		<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
			{@render kopfzeile()}
		</div>
	{/if}

	<input
		type="file"
		{name}
		class="hidden"
		accept="image/*"
		multiple={max !== 1}
		onchange={dateienUebernehmen}
	/>

	<div class="grid gap-2 {spalten}">
		{#each bilder as bild (bild.id)}
			<div
				class="group relative aspect-4/3 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
			>
				{#if bild.ladend}
					<div class="flex h-full w-full items-center justify-center">
						<div
							class="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600"
						></div>
					</div>
				{:else}
					<a
						href={bild.url}
						target="_blank"
						rel="noreferrer"
						class="block h-full w-full"
						title="Foto in voller Größe öffnen"
					>
						<img
							src={bild.url}
							alt={fotoKategorieLabel(bild.kategorie)}
							loading="lazy"
							class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
						/>
						<span
							class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-1.5 pt-4 pb-1 text-[11px] font-semibold text-white"
						>
							{fotoKategorieLabel(bild.kategorie)}
						</span>
					</a>
					{#if loeschenErlaubt && onLoeschen}
						<button
							type="button"
							title="Foto löschen"
							aria-label="Foto löschen"
							onclick={() => onLoeschen(bild.id)}
							class="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-error-600 pointer-coarse:opacity-100"
						>
							<TrashIcon size={14} weight="bold" />
						</button>
					{/if}
				{/if}
			</div>
		{/each}

		{#if hochladenErlaubt && (!maximalErreicht || ersetzenAngeboten)}
			{#each uploadZiele as ziel (ziel.wert)}
				<button
					type="button"
					onclick={() => fotoWaehlen(ziel.wert)}
					disabled={laeuft}
					class="flex aspect-4/3 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-1.5 text-neutral-500 transition-colors hover:border-primary-400 hover:text-primary-600 disabled:opacity-60"
				>
					<PlusIcon size={20} weight="bold" />
					<span class="text-center text-xs leading-tight font-semibold">
						{#if laeuft}
							Lädt hoch…
						{:else if ersetzenAngeboten}
							Foto ersetzen
						{:else if uploadZiele.length === 1}
							Foto hinzufügen
						{:else}
							{ziel.label}
						{/if}
					</span>
				</button>
			{/each}
		{/if}
	</div>

	<AnleitungZeile />
</div>

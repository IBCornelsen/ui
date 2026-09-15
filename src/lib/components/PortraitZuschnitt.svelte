<script lang="ts">
	import Modal from "./Modal.svelte";
	import {
		ZOOM_MAX,
		ZOOM_MIN,
		ansichtBegrenzen,
		ausschnittAusAnsicht,
		skalierung,
		startansicht,
		zoomUmMitte,
		type Ansicht,
		type Ausschnitt,
		type Bildmasse
	} from "./portraitAusschnitt";

	// Porträt vor dem Upload zuschneiden: Das Bild wird hinter einem runden
	// Sichtfenster verschoben und gezoomt, bis das Gesicht den Kreis füllt.
	// Zurück kommt nur der Ausschnitt in Bildpixeln — das Zeichnen übernimmt
	// die aufrufende Anwendung.
	interface Props {
		bildUrl: string;
		fenster?: number;
		onUebernehmen: (ausschnitt: Ausschnitt) => void;
		onAbbrechen: () => void;
	}

	const { bildUrl, fenster = 288, onUebernehmen, onAbbrechen }: Props = $props();

	let bild = $state<Bildmasse | null>(null);
	let ansicht = $state<Ansicht>({ zoom: ZOOM_MIN, x: 0, y: 0 });
	let ziehen = $state<{
		startX: number;
		startY: number;
		ansichtX: number;
		ansichtY: number;
	} | null>(null);

	function bildGeladen(event: Event) {
		const element = event.currentTarget as HTMLImageElement;
		bild = { breite: element.naturalWidth, hoehe: element.naturalHeight };
		ansicht = startansicht(bild, fenster);
	}

	const bildStil = $derived.by(() => {
		if (!bild) return "";
		const faktor = skalierung(bild, fenster, ansicht.zoom);
		return `width:${bild.breite * faktor}px;height:${bild.hoehe * faktor}px;transform:translate(${ansicht.x}px,${ansicht.y}px)`;
	});

	function zeigerGedrueckt(event: PointerEvent) {
		if (!bild) return;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		ziehen = {
			startX: event.clientX,
			startY: event.clientY,
			ansichtX: ansicht.x,
			ansichtY: ansicht.y
		};
	}

	function zeigerBewegt(event: PointerEvent) {
		if (!bild || !ziehen) return;
		ansicht = ansichtBegrenzen(
			{
				zoom: ansicht.zoom,
				x: ziehen.ansichtX + event.clientX - ziehen.startX,
				y: ziehen.ansichtY + event.clientY - ziehen.startY
			},
			bild,
			fenster
		);
	}

	function zeigerLosgelassen() {
		ziehen = null;
	}

	function zoomGeaendert(event: Event) {
		if (!bild) return;
		const wert = Number((event.currentTarget as HTMLInputElement).value);
		ansicht = zoomUmMitte(ansicht, wert, bild, fenster);
	}

	function mausrad(event: WheelEvent) {
		if (!bild) return;
		event.preventDefault();
		let schritt = 0.1;
		if (event.deltaY > 0) schritt = -0.1;
		ansicht = zoomUmMitte(ansicht, ansicht.zoom + schritt, bild, fenster);
	}

	function uebernehmen(): boolean {
		if (!bild) return false;
		onUebernehmen(ausschnittAusAnsicht(ansicht, bild, fenster));
		return true;
	}
</script>

<Modal
	hidden={false}
	title="Porträt zuschneiden"
	size="sm"
	onClose={onAbbrechen}
	options={[
		{ title: "Abbrechen", variant: "ghost", action: () => (onAbbrechen(), true) },
		{ title: "Übernehmen", variant: "primary", action: uebernehmen }
	]}
>
	<p class="mb-3 text-sm text-neutral-600">
		Verschieben Sie das Bild und zoomen Sie, bis Ihr Gesicht den Kreis ausfüllt.
	</p>
	<div class="flex flex-col items-center gap-3">
		<div
			class="relative touch-none overflow-hidden rounded-sm bg-neutral-900 select-none"
			style="width:{fenster}px;height:{fenster}px;cursor:grab"
			role="presentation"
			onpointerdown={zeigerGedrueckt}
			onpointermove={zeigerBewegt}
			onpointerup={zeigerLosgelassen}
			onpointercancel={zeigerLosgelassen}
			onwheel={mausrad}
		>
			<img
				src={bildUrl}
				alt=""
				draggable="false"
				decoding="async"
				class="absolute top-0 left-0 max-w-none origin-top-left"
				style={bildStil}
				onload={bildGeladen}
			/>
			<!-- Runde Maske: alles außerhalb des Kreises abgedunkelt. -->
			<div
				class="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]"
			></div>
		</div>
		<label class="flex w-full items-center gap-3 text-sm text-neutral-700">
			<span class="shrink-0">Zoom</span>
			<input
				type="range"
				min={ZOOM_MIN}
				max={ZOOM_MAX}
				step="0.01"
				value={ansicht.zoom}
				disabled={!bild}
				oninput={zoomGeaendert}
				class="w-full accent-primary-600"
			/>
		</label>
	</div>
</Modal>

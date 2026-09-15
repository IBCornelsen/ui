// Geometrie des Porträt-Zuschnitts: Das Bild liegt hinter einem quadratischen
// Sichtfenster, das der Kreis der Mitgliederkreise ausfüllt. Der Nutzer zoomt
// und verschiebt; das Sichtfenster muss immer vollständig mit Bild bedeckt sein.

export type Bildmasse = { breite: number; hoehe: number };

// Sicht auf das Bild: Zoomfaktor über der Grundskalierung (1 = das Bild füllt
// das Fenster gerade so) und Verschiebung der Bild-Ecke in Fensterpixeln.
export type Ansicht = { zoom: number; x: number; y: number };

// Ausschnitt in Bildpixeln — quadratisch, weil das Ziel ein Kreis ist.
export type Ausschnitt = { x: number; y: number; kante: number };

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 4;

// Grundskalierung: die kürzere Bildseite füllt das Fenster.
export function grundskalierung(bild: Bildmasse, fenster: number): number {
	const kuerzereSeite = Math.min(bild.breite, bild.hoehe);
	if (kuerzereSeite <= 0) return 1;
	return fenster / kuerzereSeite;
}

export function skalierung(bild: Bildmasse, fenster: number, zoom: number): number {
	return grundskalierung(bild, fenster) * zoom;
}

// Liefert nie -0: Ein Grenzwert von 0 soll auch als 0 vergleichbar sein.
function begrenzt(wert: number, minimum: number, maximum: number): number {
	if (wert < minimum) return minimum;
	if (wert > maximum) return maximum;
	if (wert === 0) return 0;
	return wert;
}

// Hält Zoom und Verschiebung so, dass das Fenster nie über den Bildrand blickt.
export function ansichtBegrenzen(ansicht: Ansicht, bild: Bildmasse, fenster: number): Ansicht {
	const zoom = begrenzt(ansicht.zoom, ZOOM_MIN, ZOOM_MAX);
	const faktor = skalierung(bild, fenster, zoom);
	const bildBreite = bild.breite * faktor;
	const bildHoehe = bild.hoehe * faktor;
	return {
		zoom,
		x: begrenzt(ansicht.x, fenster - bildBreite, 0),
		y: begrenzt(ansicht.y, fenster - bildHoehe, 0)
	};
}

// Mittige Startansicht ohne Zoom.
export function startansicht(bild: Bildmasse, fenster: number): Ansicht {
	const faktor = skalierung(bild, fenster, ZOOM_MIN);
	return ansichtBegrenzen(
		{
			zoom: ZOOM_MIN,
			x: (fenster - bild.breite * faktor) / 2,
			y: (fenster - bild.hoehe * faktor) / 2
		},
		bild,
		fenster
	);
}

// Zoomt um den Fenstermittelpunkt, damit das Gesicht beim Zoomen stehen bleibt.
export function zoomUmMitte(
	ansicht: Ansicht,
	neuerZoom: number,
	bild: Bildmasse,
	fenster: number
): Ansicht {
	const alt = skalierung(bild, fenster, ansicht.zoom);
	const neu = skalierung(bild, fenster, begrenzt(neuerZoom, ZOOM_MIN, ZOOM_MAX));
	const mitte = fenster / 2;
	const verhaeltnis = neu / alt;
	return ansichtBegrenzen(
		{
			zoom: begrenzt(neuerZoom, ZOOM_MIN, ZOOM_MAX),
			x: mitte - (mitte - ansicht.x) * verhaeltnis,
			y: mitte - (mitte - ansicht.y) * verhaeltnis
		},
		bild,
		fenster
	);
}

// Der Ausschnitt in Bildpixeln, den das Fenster gerade zeigt.
export function ausschnittAusAnsicht(
	ansicht: Ansicht,
	bild: Bildmasse,
	fenster: number
): Ausschnitt {
	const faktor = skalierung(bild, fenster, ansicht.zoom);
	const kante = Math.min(fenster / faktor, bild.breite, bild.hoehe);
	return {
		x: begrenzt(-ansicht.x / faktor, 0, bild.breite - kante),
		y: begrenzt(-ansicht.y / faktor, 0, bild.hoehe - kante),
		kante
	};
}

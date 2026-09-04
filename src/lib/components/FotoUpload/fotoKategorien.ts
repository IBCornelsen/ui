// Single source for the photo categories used by every upload in the product:
// order flow (Verbrauchs-/Bedarfsausweis), cad sections and dashboard.
// The values are the `media.kategorie` values stored in the database — old
// orders carry `Gebaeude` for the exterior view, which keeps that label.

export interface FotoKategorie {
	wert: string;
	label: string;
}

export const FOTO_KATEGORIEN: FotoKategorie[] = [
	{ wert: "Gebaeude", label: "Gebäude außen" },
	{ wert: "GebaeudeInnen", label: "Gebäude innen" },
	{ wert: "Fassade", label: "Fassade" },
	{ wert: "Heizung", label: "Heizung" },
	{ wert: "Fenster", label: "Fenster" },
	{ wert: "Daemmung", label: "Dämmung" },
	{ wert: "AnlagenTechnik", label: "Anlagentechnik" },
	{ wert: "Sonstiges", label: "Sonstige" }
];

const LABEL_JE_WERT = new Map(FOTO_KATEGORIEN.map((eintrag) => [eintrag.wert, eintrag.label]));

// Photos of old orders may carry no category at all — they show up as "Sonstige".
export function fotoKategorieLabel(wert: string | null | undefined): string {
	if (!wert) return "Sonstige";
	const label = LABEL_JE_WERT.get(wert);
	if (label) return label;
	return wert;
}

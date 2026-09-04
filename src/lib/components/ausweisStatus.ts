import type { StatusPilleTon } from "./StatusPille.svelte";

// Kanonisches Status-Vokabular des Ausweis-Lebenszyklus. Einzige Stelle, an der
// ein Status auf Farbe und Anzeigelabel abgebildet wird — Apps rendern nur noch
// das Ergebnis von statusPilleFuer().
// Angefragt/Angeboten/Abgelehnt: Angebotsanfrage der Gewerbe-Nachweise vor der Bestellung.
export type AusweisStatus =
	| "Gültig"
	| "In Prüfung"
	| "Entwurf"
	| "Abgelaufen"
	| "Storniert"
	| "Angefragt"
	| "Angeboten"
	| "Abgelehnt";
export type StatusPilleWert = { ton: StatusPilleTon; label: string };

export const OHNE_STATUS: StatusPilleWert = { ton: "neutral", label: "Ohne Status" };

const STATUS_PILLE: Record<AusweisStatus, StatusPilleWert> = {
	Entwurf: { ton: "error", label: "Gespeichert" },
	"In Prüfung": { ton: "secondary", label: "In Prüfung" },
	Gültig: { ton: "primary", label: "Ausgestellt" },
	Abgelaufen: { ton: "neutral", label: "Abgelaufen" },
	Storniert: { ton: "neutral", label: "Storniert" },
	Angefragt: { ton: "warning", label: "Angebot angefragt" },
	Angeboten: { ton: "secondary", label: "Angebot erhalten" },
	Abgelehnt: { ton: "neutral", label: "Angebot abgelehnt" }
};

export function statusPilleFuer(status: string | undefined): StatusPilleWert {
	if (!status) return OHNE_STATUS;
	if (!(status in STATUS_PILLE)) return OHNE_STATUS;
	return STATUS_PILLE[status as AusweisStatus];
}

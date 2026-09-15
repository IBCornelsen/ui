export interface FotoUploadBild {
	id: string;
	url?: string;
	// Verkleinerte Fassung für die Kachel; die Vollansicht öffnet `url`.
	vorschauUrl?: string;
	kategorie?: string | null;
	// Placeholder while the file is still being uploaded.
	ladend?: boolean;
}

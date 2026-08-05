export interface FotoUploadBild {
	id: string;
	url?: string;
	kategorie?: string | null;
	// Placeholder while the file is still being uploaded.
	ladend?: boolean;
}

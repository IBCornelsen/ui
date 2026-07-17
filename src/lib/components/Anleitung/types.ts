// Shared types for the contextual Anleitung (input help) panel and its cards.
// Domain-free: inputs supply their guidance via use:anleitung, the panel renders it.

export type Importance = "required" | "recommended" | "optional";

export interface NormNote {
	// Norm reference, e.g. "DIN V 18599-2, 6.2".
	ref: string;
	// Short paraphrased quote from the norm.
	quote: string;
}

// User-facing German labels for each importance level.
export const IMPORTANCE_LABEL: Record<Importance, string> = {
	required: "Pflicht",
	recommended: "empfohlen",
	optional: "optional"
};

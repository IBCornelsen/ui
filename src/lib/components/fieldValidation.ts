// Formular-Validierung für Input/Select: Pflichtfeld plus optionaler Prüffunktion.
// Die Komponenten halten damit nur noch den `touched`-Zustand selbst.

// Return true when valid, or false / an error message when invalid.
export type FieldValidator = (value: unknown) => boolean | string;

export interface FieldValidationResult {
	ok: boolean;
	message: string;
}

interface Options {
	required: boolean;
	validator?: FieldValidator;
	emptyMessage: string;
}

function isEmpty(value: unknown): boolean {
	return value === null || value === undefined || value === "";
}

export function validateFieldValue(value: unknown, options: Options): FieldValidationResult {
	if (options.required && isEmpty(value)) return { ok: false, message: options.emptyMessage };
	if (!options.validator) return { ok: true, message: "" };

	const result = options.validator(value);
	if (result === true) return { ok: true, message: "" };
	if (typeof result === "string") return { ok: false, message: result };
	return { ok: false, message: "" };
}

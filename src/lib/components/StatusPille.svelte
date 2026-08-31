<script lang="ts" module>
	// Bearbeitungsstand als Pille (Jens 2026-08-11): Farbe trägt die Bedeutung —
	// error = gespeichert/neu, secondary = bestellt/in Prüfung, primary =
	// ausgestellt, neutral = abgelaufen/ohne Status. KEINE Fortschrittsbalken
	// oder Punkteketten für den Bearbeitungsstand.
	export type StatusPilleTon =
		| "primary"
		| "secondary"
		| "error"
		| "warning"
		| "success"
		| "neutral";

	// Fläche der Pille selbst.
	export const STATUS_PILLE_FLAECHE: Record<StatusPilleTon, string> = {
		primary: "bg-primary-50 text-primary-700 ring-primary-100",
		secondary: "bg-secondary-50 text-secondary-800 ring-secondary-100",
		error: "bg-error-50 text-error-700 ring-error-100",
		warning: "bg-warning-50 text-warning-700 ring-warning-100",
		success: "bg-success-50 text-success-700 ring-success-100",
		neutral: "bg-neutral-100 text-neutral-600 ring-neutral-200"
	};

	// Passende Randfarbe (z. B. für die Infobox, die unter der Pille hängt).
	export const STATUS_PILLE_RAND: Record<StatusPilleTon, string> = {
		primary: "border-primary-500",
		secondary: "border-secondary-500",
		error: "border-error-500",
		warning: "border-warning-500",
		success: "border-success-500",
		neutral: "border-neutral-300"
	};

	// Passende Punktfarbe (Ampelpunkt einer Prüf- oder Filterzeile).
	export const STATUS_PILLE_PUNKT: Record<StatusPilleTon, string> = {
		primary: "bg-primary-600",
		secondary: "bg-secondary-500",
		error: "bg-error-500",
		warning: "bg-warning-500",
		success: "bg-success-500",
		neutral: "bg-neutral-300"
	};
</script>

<script lang="ts">
	interface Props {
		ton: StatusPilleTon;
		label: string;
	}

	const { ton, label }: Props = $props();
</script>

<span class="rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 {STATUS_PILLE_FLAECHE[ton]}">
	{label}
</span>

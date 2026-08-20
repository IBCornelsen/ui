<script lang="ts" module>
	// Bearbeitungsstand als Pille (Jens 2026-08-11): Farbe trägt die Bedeutung —
	// error = gespeichert/neu, warning = bestellt/in Prüfung, success =
	// ausgestellt, neutral = abgelaufen/ohne Status. KEINE Fortschrittsbalken
	// oder Punkteketten für den Bearbeitungsstand.
	export type StatusPilleTon = "error" | "warning" | "success" | "neutral";

	// Passende Randfarbe (z. B. für die Karte, an der die Pille hängt).
	export const STATUS_PILLE_RAND: Record<StatusPilleTon, string> = {
		error: "border-error-500",
		warning: "border-warning-500",
		success: "border-success-500",
		neutral: "border-neutral-300"
	};
</script>

<script lang="ts">
	interface Props {
		ton: StatusPilleTon;
		label: string;
	}

	const { ton, label }: Props = $props();

	const TON_KLASSEN: Record<StatusPilleTon, string> = {
		error: "bg-error-50 text-error-700 ring-error-100",
		warning: "bg-warning-50 text-warning-700 ring-warning-100",
		success: "bg-success-50 text-success-700 ring-success-100",
		neutral: "bg-neutral-100 text-neutral-600 ring-neutral-200"
	};
</script>

<span class="rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 {TON_KLASSEN[ton]}">
	{label}
</span>

<script lang="ts">
	// Ladebalken für laufende Vorgänge (Upload, Berechnung): schmale Spur,
	// gefüllter Anteil, weiche Breitenänderung. Die Breite gibt der Aufrufer über
	// den umgebenden Container vor.
	// NICHT für Bearbeitungsstand/Status verwenden — der wird als Statuspunkt in
	// error/warning/success-500 dargestellt, nie als Balken (Jens 2026-08-11).
	interface Props {
		// 0–100; Werte außerhalb werden gekappt.
		wert: number;
		// Sichtbare Beschriftung über dem Balken (rechts steht dann der Prozentwert).
		label?: string;
		farbe?: "primary" | "success" | "error";
		// Für unbestimmte Ladevorgänge, deren Balken nur grob mitwächst.
		pulsiert?: boolean;
	}

	const { wert, label, farbe = "primary", pulsiert = false }: Props = $props();

	const anteil = $derived(Math.min(100, Math.max(0, Math.round(wert))));
</script>

{#if label}
	<div class="mb-1.5 flex items-baseline justify-between gap-3">
		<span class="text-sm font-semibold text-neutral-700">{label}</span>
		<span class="text-sm text-neutral-500">{anteil} %</span>
	</div>
{/if}

<div
	class="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
	role="progressbar"
	aria-valuenow={anteil}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-label={label || "Fortschritt"}
>
	<div
		class="h-full rounded-full transition-[width] duration-500 ease-out"
		class:bg-primary-600={farbe === "primary"}
		class:bg-success-500={farbe === "success"}
		class:bg-error-500={farbe === "error"}
		class:animate-pulse={pulsiert}
		style:width="{anteil}%"
	></div>
</div>

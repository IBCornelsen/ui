<script lang="ts">
	import type { EnergyScaleClass } from "./EnergyScale/types";

	// Effizienzskala in der Optik der Bedarfsausweis-Strecke (cad EffizienzSkala):
	// Farbband der Effizienzklassen, Endenergie-Pfeil oben, Primärenergie-Pfeil
	// unten, Effizienzklassen-Kachel rechts. Die Klassengrenzen (Bandbreiten je
	// Klasse) liefert der Aufrufer — Wohnen und Gewerbe nutzen andere Bänder.
	interface Props {
		classes: EnergyScaleClass[];
		endenergie: number | null;
		primaerenergie: number | null;
	}

	const { classes, endenergie, primaerenergie }: Props = $props();

	const scaleMax = $derived(classes.reduce((sum, klass) => sum + klass.size, 0));
	const segments = $derived(
		classes.map((klass) => ({
			label: klass.label,
			color: klass.color,
			widthPct: scaleMax > 0 ? (klass.size / scaleMax) * 100 : 0
		}))
	);

	function toPct(value: number): number {
		if (scaleMax <= 0) return 0;
		return (Math.min(scaleMax, Math.max(0, value)) / scaleMax) * 100;
	}

	// Effizienzklasse aus der Endenergie: erste Klasse, deren obere Grenze den
	// Wert einschließt; oberhalb der Skala gilt die letzte Klasse (H).
	const klasse = $derived.by(() => {
		if (endenergie === null || !isFinite(endenergie)) return null;
		let obereGrenze = 0;
		for (const klass of classes) {
			obereGrenze += klass.size;
			if (endenergie < obereGrenze) return klass;
		}
		if (classes.length === 0) return null;
		return classes[classes.length - 1];
	});

	const END_COLOR = "#1f3a8a"; // Endenergie-Pfeil (oben)
	const PRIM_COLOR = "#1a1a1a"; // Primärenergie-Pfeil (unten)
</script>

<!-- Kompakte, horizontale Effizienzskala (Farbband A+ … H, zwei Pfeile) -->
<div
	class="flex items-center gap-3.5 rounded-lg border border-[#dfe2ee] bg-white/95 px-3 py-2 shadow-[0_3px_14px_rgba(0,0,0,.12)] backdrop-blur-sm"
>
	<div class="min-w-0 flex-1">
		<!-- Endenergie-Pfeil (oben, zeigt nach unten) -->
		<div class="relative h-[8px]">
			{#if endenergie !== null && isFinite(endenergie)}
				<div class="absolute -translate-x-1/2" style:left="{toPct(endenergie)}%" title="Endenergie">
					<div
						class="h-0 w-0 border-t-[7px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent"
						style:border-top-color={END_COLOR}
					></div>
				</div>
			{/if}
		</div>

		<!-- Farbband A+ … H -->
		<div class="flex h-[26px] w-full overflow-hidden rounded-[3px]">
			{#each segments as segment (segment.label)}
				<div
					class="flex items-center justify-center text-[8.5px] leading-none font-bold text-white/95"
					style:width="{segment.widthPct}%"
					style:background-color={segment.color}
				>
					{segment.label}
				</div>
			{/each}
		</div>

		<!-- Primärenergie-Pfeil (unten, zeigt nach oben) -->
		<div class="relative h-[8px]">
			{#if primaerenergie !== null && isFinite(primaerenergie)}
				<div
					class="absolute -translate-x-1/2"
					style:left="{toPct(primaerenergie)}%"
					title="Primärenergie"
				>
					<div
						class="h-0 w-0 border-r-[5px] border-b-[7px] border-l-[5px] border-r-transparent border-l-transparent"
						style:border-bottom-color={PRIM_COLOR}
					></div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Effizienzklasse rechts neben der Skala (Rechteck, gleiche Höhe wie das Band) -->
	<span
		class="flex h-[26px] w-[34px] shrink-0 items-center justify-center rounded-[3px] text-[15px] font-bold text-white"
		style:background-color={klasse?.color ?? "#9aa0b4"}
		title="Energieeffizienzklasse"
	>
		{klasse?.label ?? "–"}
	</span>
</div>

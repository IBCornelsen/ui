<script lang="ts">
	// Parametric surface-heating/-cooling band in the icon-library language:
	// screed strip with alternating supply/return pipe cross-sections, plus the
	// radiated-heat wave pairs of the fbh/deckenheizung icons. Fixed 96-tiles
	// cannot span room-wide bands, so this piece takes its length as a prop.
	// Drawn 1:1 in the parent coordinate system (no scaling); x/y address the
	// band itself — the wave zone extends outside of it.
	let {
		x = 0,
		y = 0,
		breite,
		hoehe = 18,
		// Cooling variant: contour, dots and waves in the cooling color instead of VL/RL.
		kuehl = false,
		// Radiation side: floor heating radiates up, ceiling systems radiate down.
		wellen = undefined,
		fuellung = "#fff",
		titel = "Flächenheizung",
		class: klasse = ""
	}: {
		x?: number;
		y?: number;
		breite: number;
		hoehe?: number;
		kuehl?: boolean;
		wellen?: "oben" | "unten";
		fuellung?: string;
		titel?: string;
		class?: string;
	} = $props();

	const PUNKT_RAND = 14.5;
	const PUNKT_ABSTAND = 15;
	const punkte = $derived.by(() => {
		const anzahl = Math.max(2, Math.floor((breite - 2 * PUNKT_RAND) / PUNKT_ABSTAND) + 1);
		// Center the dot row inside the band.
		const start = (breite - (anzahl - 1) * PUNKT_ABSTAND) / 2;
		return Array.from({ length: anzahl }, (_, i) => start + i * PUNKT_ABSTAND);
	});

	// Wave zone above/below the band (shape and height of the icon originals).
	const WELLEN_HOEHE = 23;
	const wellenX = $derived.by(() => {
		if (!wellen) return [];
		const anzahl = Math.max(3, Math.round(breite / 70));
		return Array.from({ length: anzahl }, (_, i) => ((i + 1) * breite) / (anzahl + 1));
	});
	const svgY = $derived(wellen === "oben" ? y - WELLEN_HOEHE : y);
	const svgHoehe = $derived(hoehe + (wellen ? WELLEN_HOEHE : 0));
	const bandY = $derived(wellen === "oben" ? WELLEN_HOEHE : 0);

	function wellePfad(wx: number): string {
		const wy = wellen === "oben" ? 0 : hoehe + 2;
		return `M${wx} ${wy} C${wx + 3} ${wy + 3.5} ${wx + 3} ${wy + 7} ${wx} ${wy + 10.5} ` +
			`C${wx - 3} ${wy + 14} ${wx - 3} ${wy + 17.5} ${wx} ${wy + 21}`;
	}
</script>

<svg
	{x}
	y={svgY}
	width={breite}
	height={svgHoehe}
	viewBox="0 0 {breite} {svgHoehe}"
	fill="none"
	stroke-width="2.25"
	stroke-linecap="round"
	role="img"
	aria-label={titel}
	class="technikBand {klasse}"
	class:kuehl
>
	<g transform="translate(0 {bandY})">
		<rect
			x="1.5"
			y="1.5"
			width={breite - 3}
			height={hoehe - 3}
			rx="3"
			fill={fuellung}
			stroke={kuehl ? "var(--cool)" : "currentColor"}
		/>
		{#each punkte as px, i (px)}
			<circle
				cx={px}
				cy={hoehe / 2}
				r="2.6"
				stroke="none"
				fill={kuehl ? "var(--cool)" : i % 2 === 0 ? "var(--vl)" : "var(--rl)"}
			/>
		{/each}
		{#each wellenX as wx (wx)}
			<path d={wellePfad(wx)} stroke={kuehl ? "var(--cool)" : "var(--fire)"} stroke-width="2" />
		{/each}
	</g>
</svg>

<style>
	.technikBand {
		--vl: #d63a2a;
		--rl: #2563cc;
		--cool: #2299b8;
		--fire: #d9622b;
	}
</style>

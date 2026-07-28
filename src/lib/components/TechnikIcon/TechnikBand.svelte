<script lang="ts">
	// Parametric surface-heating/-cooling band in the icon-library language:
	// screed strip with alternating supply/return pipe cross-sections. Fixed 96-tiles
	// cannot span room-wide bands, so this piece takes its length as a prop.
	// Drawn 1:1 in the parent coordinate system (no scaling).
	let {
		x = undefined,
		y = undefined,
		breite,
		hoehe = 18,
		// Cooling variant: contour and dots in the cooling color instead of VL/RL.
		kuehl = false,
		fuellung = "#fff",
		titel = "Flächenheizung",
		class: klasse = ""
	}: {
		x?: number;
		y?: number;
		breite: number;
		hoehe?: number;
		kuehl?: boolean;
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
</script>

<svg
	{x}
	{y}
	width={breite}
	height={hoehe}
	viewBox="0 0 {breite} {hoehe}"
	fill="none"
	stroke-width="2.25"
	stroke-linecap="round"
	role="img"
	aria-label={titel}
	class="technikBand {klasse}"
	class:kuehl
>
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
</svg>

<style>
	.technikBand {
		--vl: #d63a2a;
		--rl: #2563cc;
		--cool: #2299b8;
	}
</style>

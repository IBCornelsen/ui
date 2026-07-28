<script lang="ts">
	// Simplified HVAC device drawings of the Technik icon library (v6, user-approved).
	// One icon = one 96×96 tile, stroke in `currentColor`, accent colors via CSS variables.
	//
	// Two habitats:
	//  · input pills / tooltips (plain HTML — just `name` + `size`),
	//  · schematic views (nested inside a larger SVG — additionally `x`/`y`, usually
	//    `stutzen={false}` because real pipes attach there).
	import { iconKorpus, TECHNIK_ICON_LABEL, type TechnikIconName } from "./technikIkonen.js";

	let {
		name,
		size = 96,
		x = undefined,
		y = undefined,
		// Supply/return stubs as attachment points (schematics attach real pipes instead).
		stutzen = true,
		// Ground line of floor-standing devices / outdoor units.
		boden = true,
		// Opaque backdrop behind the body so pipes don't shine through in schematics.
		flaeche = undefined,
		// Decorative sun of the solar/PV drawings (schematics bring their own sky).
		mitSonne = true,
		// Mirror the drawing (right roof slope in schematics).
		spiegeln = false,
		// Second (solar) coil in storage tanks, exiting at the left housing edge.
		solarSchlange = false,
		titel = undefined,
		class: klasse = ""
	}: {
		name: TechnikIconName;
		size?: number;
		x?: number;
		y?: number;
		stutzen?: boolean;
		boden?: boolean;
		flaeche?: string;
		mitSonne?: boolean;
		spiegeln?: boolean;
		solarSchlange?: boolean;
		titel?: string;
		class?: string;
	} = $props();

	// Per-instance gradient ids — multiple icons in one document must not collide.
	const uid = $props.id();
	const wt = $derived(`url(#${uid}-wt)`);
	const wtV = $derived(`url(#${uid}-wtv)`);
	const korpus = $derived(iconKorpus(name));

	// Canonical flame (spike + bright core) — gas/wood orange, oil brown.
	const FLAMME =
		"M48 40.5 C46.6 42.6 44.6 44.6 44.6 47.9 A3.4 3.4 0 0 0 51.4 47.9 " +
		"C51.4 46 50.5 44.6 49.3 42.9 C49.2 44.5 48.4 45.3 47.9 45.4 C48.7 43.5 48.5 41.9 48 40.5 Z";
	const OFENFLAMME =
		"M48 31 C45 36 40.5 40.5 40.5 48.5 A7.5 7.5 0 0 0 55.5 48.5 " +
		"C55.5 44 53.5 40.8 51 37 C50.8 40.8 49 42.6 47.9 43 C49.8 38.6 49.4 34.6 48 31 Z";
	const OFENKERN =
		"M48 44.5 C46.2 46.8 45 48.4 45 50.2 A3 3 0 0 0 51 50.2 C51 48.4 49.8 46.8 48 44.5 Z";
</script>

{#snippet flamme(dx: number, dy: number, farbe: string)}
	<g transform="translate({dx},{dy})"><path d={FLAMME} fill={farbe} stroke="none" /></g>
{/snippet}

{#snippet ofenflamme(dx: number, dy: number)}
	<g transform="translate({dx},{dy})">
		<path d={OFENFLAMME} fill="var(--fire)" stroke="none" />
		<path d={OFENKERN} fill="var(--kern)" stroke="none" />
	</g>
{/snippet}

{#snippet ventilator(cx: number, cy: number, r: number, speichen: boolean, nabeR: number)}
	{@const s = r * 0.246}
	{@const l = r * 0.308}
	<g stroke="var(--air)">
		<circle {cx} {cy} {r} />
		{#if speichen}
			<line x1={cx + s} y1={cy - s} x2={cx + s + l} y2={cy - s - l} />
			<line x1={cx + s} y1={cy + s} x2={cx + s + l} y2={cy + s + l} />
			<line x1={cx - s} y1={cy + s} x2={cx - s - l} y2={cy + s + l} />
			<line x1={cx - s} y1={cy - s} x2={cx - s - l} y2={cy - s - l} />
		{/if}
	</g>
	{#if nabeR > 0}<circle {cx} {cy} r={nabeR} fill="var(--air)" stroke="none" />{/if}
{/snippet}

{#snippet sonne(cx: number, cy: number)}
	<g stroke="var(--fire)" stroke-width="2">
		<circle {cx} {cy} r="4.5" />
		<line x1={cx} y1={cy - 7.5} x2={cx} y2={cy - 10.5} />
		<line x1={cx + 7.5} y1={cy} x2={cx + 10.5} y2={cy} />
		<line x1={cx + 5.3} y1={cy - 5.3} x2={cx + 7.4} y2={cy - 7.4} />
		<line x1={cx - 5.3} y1={cy - 5.3} x2={cx - 7.4} y2={cy - 7.4} />
	</g>
{/snippet}

<!-- Heat-exchanger meander: 4 tight runs with 180° bends, gradient return-blue → supply-red -->
{#snippet waermetauscher(px: number, py: number, tiefe: number)}
	<path
		d="M{px} {py} V{py + tiefe} A2.5 2.5 0 0 0 {px + 5} {py + tiefe} V{py + 2.5}
		   A2.5 2.5 0 0 1 {px + 10} {py + 2.5} V{py + tiefe} A2.5 2.5 0 0 0 {px + 15} {py + tiefe} V{py}"
		stroke={wt}
	/>
{/snippet}

<!-- Dot row = pipe cross-sections of surface heating, alternating supply/return -->
{#snippet rohrpunkte(startX: number, startY: number, dx: number, dy: number, anzahl: number)}
	{#each Array.from({ length: anzahl }, (_, i) => i) as i (i)}
		<circle
			cx={startX + dx * i}
			cy={startY + dy * i}
			r="2.2"
			fill={i % 2 === 0 ? "var(--vl)" : "var(--rl)"}
			stroke="none"
		/>
	{/each}
{/snippet}

<svg
	{x}
	{y}
	width={size}
	height={size}
	viewBox="0 0 96 96"
	fill="none"
	stroke="currentColor"
	stroke-width="2.25"
	stroke-linecap="round"
	stroke-linejoin="round"
	role="img"
	aria-label={titel ?? TECHNIK_ICON_LABEL[name]}
	class="technikIcon {klasse}"
>
	<defs>
		<linearGradient id="{uid}-wt" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="var(--rl)" />
			<stop offset="1" stop-color="var(--vl)" />
		</linearGradient>
		<linearGradient id="{uid}-wtv" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="var(--vl)" />
			<stop offset="1" stop-color="var(--rl)" />
		</linearGradient>
	</defs>

	<g transform={spiegeln ? "translate(96 0) scale(-1 1)" : undefined}>
	{#if flaeche}
		<rect
			x={korpus.x}
			y={korpus.y}
			width={korpus.w}
			height={korpus.h}
			rx={korpus.r ?? 6}
			fill={flaeche}
			stroke="none"
		/>
	{/if}

	<!-- ── Heat pumps ── -->
	{#if name === 'wp-luft-aussen'}
		<rect x="8" y="28" width="70" height="44" rx="6" />
		{@render waermetauscher(17.5, 41.5, 14.5)}
		{@render ventilator(56, 50, 13, true, 2.4)}
		{#if stutzen}
			<line x1="78" y1="38" x2="89" y2="38" stroke="var(--vl)" />
			<line x1="78" y1="46" x2="89" y2="46" stroke="var(--rl)" />
		{/if}
		{#if boden}<line x1="8" y1="80" x2="86" y2="80" />{/if}
	{:else if name === 'wp-luft-innen'}
		<rect x="32" y="14" width="32" height="62" rx="5" />
		<line x1="40" y1="14" x2="40" y2="7" /><line x1="56" y1="14" x2="56" y2="7" />
		{@render ventilator(48, 32, 10, true, 2)}
		{@render waermetauscher(40.5, 58, 11.5)}
		{#if stutzen}
			<line x1="64" y1="48" x2="76" y2="48" stroke="var(--vl)" />
			<line x1="64" y1="56" x2="76" y2="56" stroke="var(--rl)" />
		{/if}
	{:else if name === 'wp-sole'}
		<rect x="32" y="10" width="32" height="48" rx="5" />
		{@render waermetauscher(40.5, 34, 13.5)}
		{#if stutzen}
			<line x1="64" y1="20" x2="76" y2="20" stroke="var(--vl)" />
			<line x1="64" y1="28" x2="76" y2="28" stroke="var(--rl)" />
		{/if}
		{#if boden}
			<line x1="14" y1="66" x2="82" y2="66" />
			<path d="M42 58 v22 a6 6 0 0 0 12 0 v-22" stroke="var(--earth)" />
		{/if}
	{:else if name === 'wp-ww'}
		<rect x="34" y="26" width="28" height="54" rx="11" />
		{@render ventilator(48, 16, 8, true, 0)}
		{@render waermetauscher(40.5, 50, 11.5)}
		{#if stutzen}
			<line x1="62" y1="38" x2="74" y2="38" stroke="var(--vl)" />
			<line x1="62" y1="46" x2="74" y2="46" stroke="var(--rl)" />
		{/if}

	<!-- ── Gas and oil ── -->
	{:else if name === 'gas-wand'}
		<rect x="30" y="12" width="36" height="52" rx="6" />
		<line x1="38" y1="20" x2="58" y2="20" />
		<rect x="41" y="34" width="14" height="16" rx="3" />
		{@render flamme(0, -4, 'var(--fire)')}
		{#if stutzen}
			<line x1="41" y1="64" x2="41" y2="74" stroke="var(--vl)" />
			<line x1="55" y1="64" x2="55" y2="74" stroke="var(--rl)" />
		{/if}
	{:else if name === 'gas-boden'}
		<rect x="30" y="16" width="36" height="62" rx="6" />
		<line x1="38" y1="24" x2="58" y2="24" />
		<rect x="41" y="38" width="14" height="16" rx="3" />
		{@render flamme(0, 0, 'var(--fire)')}
		{#if stutzen}
			<line x1="66" y1="32" x2="78" y2="32" stroke="var(--vl)" />
			<line x1="66" y1="40" x2="78" y2="40" stroke="var(--rl)" />
		{/if}
	{:else if name === 'gas-gross'}
		<rect x="14" y="30" width="60" height="48" rx="6" />
		<line x1="60" y1="30" x2="60" y2="19" />
		<rect x="37" y="44" width="14" height="16" rx="3" />
		{@render flamme(-4, 6, 'var(--fire)')}
		{#if stutzen}
			<line x1="74" y1="40" x2="86" y2="40" stroke="var(--vl)" />
			<line x1="74" y1="50" x2="86" y2="50" stroke="var(--rl)" />
		{/if}
	{:else if name === 'oel-boden'}
		<rect x="24" y="26" width="44" height="52" rx="10" />
		<line x1="38" y1="34" x2="54" y2="34" />
		<rect x="39" y="42" width="14" height="16" rx="3" />
		{@render flamme(-2, 4, 'var(--oil)')}
		{#if stutzen}
			<line x1="68" y1="36" x2="80" y2="36" stroke="var(--vl)" />
			<line x1="68" y1="44" x2="80" y2="44" stroke="var(--rl)" />
		{/if}

	<!-- ── Wood and biomass ── -->
	{:else if name === 'holz-kamin'}
		<rect x="30" y="20" width="36" height="52" rx="4" />
		<rect x="36" y="28" width="24" height="32" rx="3" />
		{@render ofenflamme(0, 0)}
		<g stroke="var(--fire)" stroke-width="2">
			<path d="M22 40 C19 43.5 19 47 22 50.5 C25 54 25 57.5 22 61" />
			<path d="M15 43 C12.5 46 12.5 48.5 15 51.5 C17.5 54.5 17.5 57 15 60" />
			<path d="M74 40 C77 43.5 77 47 74 50.5 C71 54 71 57.5 74 61" />
			<path d="M81 43 C83.5 46 83.5 48.5 81 51.5 C78.5 54.5 78.5 57 81 60" />
		</g>
		{#if boden}
			<line x1="35" y1="72" x2="35" y2="78" /><line x1="61" y1="72" x2="61" y2="78" />
			<line x1="26" y1="80" x2="70" y2="80" />
		{/if}
	{:else if name === 'holz-wasser'}
		<rect x="28" y="20" width="36" height="52" rx="4" />
		<rect x="34" y="28" width="24" height="32" rx="3" />
		{@render ofenflamme(-2, 0)}
		<g stroke="var(--fire)" stroke-width="2">
			<path d="M20 40 C17 43.5 17 47 20 50.5 C23 54 23 57.5 20 61" />
			<path d="M13 43 C10.5 46 10.5 48.5 13 51.5 C15.5 54.5 15.5 57 13 60" />
		</g>
		{#if stutzen}
			<line x1="64" y1="32" x2="76" y2="32" stroke="var(--vl)" />
			<line x1="64" y1="40" x2="76" y2="40" stroke="var(--rl)" />
		{/if}
		{#if boden}
			<line x1="33" y1="72" x2="33" y2="78" /><line x1="59" y1="72" x2="59" y2="78" />
			<line x1="24" y1="80" x2="68" y2="80" />
		{/if}
	{:else if name === 'pellet'}
		<rect x="22" y="24" width="34" height="54" rx="5" />
		<line x1="30" y1="32" x2="48" y2="32" />
		<rect x="32" y="42" width="14" height="16" rx="3" />
		{@render flamme(-9, 4, 'var(--fire)')}
		<rect x="60" y="36" width="16" height="42" rx="3" />
		<path d="M60 46 L76 38" />
		<circle cx="68" cy="56" r="2.2" fill="var(--earth)" stroke="none" />
		<circle cx="64" cy="64" r="2.2" fill="var(--earth)" stroke="none" />
		<circle cx="71" cy="68" r="2.2" fill="var(--earth)" stroke="none" />
		{#if stutzen}
			<line x1="10" y1="34" x2="22" y2="34" stroke="var(--vl)" />
			<line x1="10" y1="42" x2="22" y2="42" stroke="var(--rl)" />
		{/if}

	<!-- ── Electric ── -->
	{:else if name === 'elektro-kessel'}
		<rect x="32" y="14" width="32" height="48" rx="6" />
		<line x1="40" y1="23" x2="56" y2="23" />
		<path d="M50 30 L41 44 L47 44 L44 55 L55 41 L49 41 L53 30 Z" fill="var(--elec)" stroke="none" />
		{#if stutzen}
			<line x1="41" y1="62" x2="41" y2="72" stroke="var(--vl)" />
			<line x1="55" y1="62" x2="55" y2="72" stroke="var(--rl)" />
		{/if}
	{:else if name === 'elektro-dle'}
		<rect x="34" y="12" width="28" height="44" rx="6" />
		<path d="M49 18 L42 29 L47 29 L44 38 L53 27 L48 27 L51 18 Z" fill="var(--elec)" stroke="none" />
		<path
			d="M48 40 C45.2 44 43.5 46.5 43.5 49 A4.5 4.5 0 0 0 52.5 49 C52.5 46.5 51 44 48 40 Z"
			fill="var(--water)"
			stroke="none"
		/>
		{#if stutzen}
			<line x1="42" y1="56" x2="42" y2="66" stroke="var(--vl)" />
			<line x1="54" y1="56" x2="54" y2="66" stroke="var(--rl)" />
		{/if}
	{:else if name === 'klima-split'}
		<rect x="18" y="14" width="60" height="18" rx="7" />
		<line x1="26" y1="26" x2="70" y2="26" />
		<g stroke="var(--vl)" stroke-width="2">
			<path d="M27 36 C25.5 41 26.5 45 25 50" />
			<path d="M21.6 46.6 L25 50.8 L29.4 47.6" />
		</g>
		<g stroke="var(--cool)" stroke-width="2">
			<path d="M38 36 C36.5 41 37.5 45 36 50" />
			<path d="M32.6 46.6 L36 50.8 L40.4 47.6" />
		</g>
		<line x1="63" y1="32" x2="56" y2="48" stroke-dasharray="1.5 5" />
		<rect x="46" y="48" width="34" height="26" rx="5" />
		{@render ventilator(63, 61, 9, true, 2)}
		{#if boden}<line x1="40" y1="78" x2="86" y2="78" />{/if}

	<!-- ── CHP and hybrid ── -->
	{:else if name === 'bhkw'}
		<rect x="16" y="30" width="56" height="46" rx="6" />
		<line x1="62" y1="30" x2="62" y2="20" />
		<path d="M34 38 L26 51 L32 51 L29 62 L40 48 L34 48 L38 38 Z" fill="var(--elec)" stroke="none" />
		<rect x="48" y="42" width="14" height="16" rx="3" />
		{@render flamme(7, 4, 'var(--fire)')}
		{#if stutzen}
			<line x1="72" y1="40" x2="84" y2="40" stroke="var(--vl)" />
			<line x1="72" y1="50" x2="84" y2="50" stroke="var(--rl)" />
		{/if}
	{:else if name === 'hybrid'}
		<rect x="12" y="16" width="32" height="44" rx="5" />
		<rect x="23" y="26" width="12" height="14" rx="3" />
		{@render flamme(-19, -11, 'var(--fire)')}
		{#if stutzen}
			<line x1="19" y1="60" x2="19" y2="70" stroke="var(--vl)" />
			<line x1="35" y1="60" x2="35" y2="70" stroke="var(--rl)" />
		{/if}
		<line x1="44" y1="50" x2="52" y2="50" stroke-dasharray="1.5 5" />
		<rect x="52" y="36" width="32" height="28" rx="5" />
		{@render ventilator(68, 50, 9, true, 2)}
		{#if boden}<line x1="46" y1="68" x2="90" y2="68" />{/if}
	{:else if name === 'fernwaerme'}
		<rect x="34" y="28" width="34" height="42" rx="5" />
		<line x1="12" y1="38" x2="34" y2="38" stroke="var(--vl)" />
		<path d="M28 34 L34 38 L28 42" stroke="var(--vl)" />
		<line x1="34" y1="58" x2="12" y2="58" stroke="var(--rl)" />
		<path d="M18 54 L12 58 L18 62" stroke="var(--rl)" />
		{@render waermetauscher(43.5, 40, 13.5)}
		{#if stutzen}
			<line x1="68" y1="38" x2="80" y2="38" stroke="var(--vl)" />
			<line x1="68" y1="46" x2="80" y2="46" stroke="var(--rl)" />
		{/if}

	<!-- ── Heat emission ── -->
	{:else if name === 'heizkoerper'}
		<rect x="20" y="28" width="56" height="36" rx="4" />
		{#each [28, 36, 44, 52, 60, 68] as lx (lx)}
			<line x1={lx} y1="34" x2={lx} y2="58" />
		{/each}
		{#if stutzen}
			<line x1="26" y1="64" x2="26" y2="74" stroke="var(--vl)" />
			<line x1="70" y1="64" x2="70" y2="74" stroke="var(--rl)" />
		{/if}
	{:else if name === 'fbh'}
		<rect x="16" y="50" width="68" height="16" rx="2" />
		{@render rohrpunkte(23, 58, 9, 0, 7)}
		<g stroke="var(--fire)" stroke-width="2">
			<path d="M33 26 C36 29.5 36 33 33 36.5 C30 40 30 43.5 33 47" />
			<path d="M48 26 C51 29.5 51 33 48 36.5 C45 40 45 43.5 48 47" />
			<path d="M63 26 C66 29.5 66 33 63 36.5 C60 40 60 43.5 63 47" />
		</g>
		{#if stutzen}
			<line x1="8" y1="54" x2="16" y2="54" stroke="var(--vl)" />
			<line x1="8" y1="62" x2="16" y2="62" stroke="var(--rl)" />
		{/if}
	{:else if name === 'wandheizung'}
		<rect x="28" y="12" width="16" height="68" rx="2" />
		{@render rohrpunkte(36, 20, 0, 9, 7)}
		<g stroke="var(--fire)" stroke-width="2">
			<path d="M52 26 C55.5 23 59 23 62.5 26 C66 29 69.5 29 73 26" />
			<path d="M52 46 C55.5 43 59 43 62.5 46 C66 49 69.5 49 73 46" />
			<path d="M52 66 C55.5 63 59 63 62.5 66 C66 69 69.5 69 73 66" />
		</g>
		{#if stutzen}
			<line x1="32" y1="80" x2="32" y2="88" stroke="var(--vl)" />
			<line x1="40" y1="80" x2="40" y2="88" stroke="var(--rl)" />
		{/if}
	{:else if name === 'deckenheizung'}
		<rect x="16" y="12" width="64" height="14" rx="2" />
		{@render rohrpunkte(24, 19, 9, 0, 6)}
		<g stroke="var(--fire)" stroke-width="2">
			<path d="M33 34 C36 37.5 36 41 33 44.5 C30 48 30 51.5 33 55" />
			<path d="M48 34 C51 37.5 51 41 48 44.5 C45 48 45 51.5 48 55" />
			<path d="M63 34 C66 37.5 66 41 63 44.5 C60 48 60 51.5 63 55" />
		</g>
		{#if stutzen}
			<line x1="80" y1="16" x2="88" y2="16" stroke="var(--vl)" />
			<line x1="80" y1="22" x2="88" y2="22" stroke="var(--rl)" />
		{/if}

	<!-- ── Storage ── -->
	{:else if name === 'puffer'}
		<rect x="34" y="14" width="28" height="66" rx="12" />
		{#if stutzen}
			<line x1="62" y1="26" x2="74" y2="26" stroke="var(--vl)" />
			<line x1="62" y1="68" x2="74" y2="68" stroke="var(--rl)" />
		{/if}
	{:else if name === 'ww-speicher'}
		<rect x="34" y="14" width="28" height="66" rx="12" />
		<path
			d="M48 24.5 C45.8 27.5 44.5 29.3 44.5 31.2 A3.5 3.5 0 0 0 51.5 31.2 C51.5 29.3 50.2 27.5 48 24.5 Z"
			fill="var(--water)"
			stroke="none"
		/>
		<path
			d="M74 42 H43 A2.5 2.5 0 0 0 43 47 H55 A2.5 2.5 0 0 1 55 52 H43 A2.5 2.5 0 0 0 43 57 H74"
			stroke={wtV}
		/>
		{#if solarSchlange}
			<path
				d="M22 58 H53 A2.5 2.5 0 0 1 53 63 H41 A2.5 2.5 0 0 0 41 68 H53 A2.5 2.5 0 0 1 53 73 H22"
				stroke={wtV}
			/>
		{/if}
	{:else if name === 'kombi'}
		<rect x="34" y="12" width="28" height="68" rx="12" />
		<rect x="40" y="20" width="16" height="22" rx="7" stroke-dasharray="3 3" />
		<path
			d="M48 25 C46.2 27.4 45.2 28.9 45.2 30.5 A2.8 2.8 0 0 0 50.8 30.5 C50.8 28.9 49.8 27.4 48 25 Z"
			fill="var(--water)"
			stroke="none"
		/>
		<path
			d="M74 52 H43 A2.5 2.5 0 0 0 43 57 H55 A2.5 2.5 0 0 1 55 62 H43 A2.5 2.5 0 0 0 43 67 H74"
			stroke={wtV}
		/>
		{#if solarSchlange}
			<path d="M22 65 H51 A2 2 0 0 1 51 69 H41 A2 2 0 0 0 41 73 H22" stroke={wtV} />
		{/if}

	<!-- ── Solar and photovoltaics ── -->
	{:else if name === 'solar-flach'}
		<rect x="20" y="26" width="50" height="50" rx="3" />
		{#each [28, 34.8, 41.6, 48.4, 55.2, 62] as lx (lx)}
			<line x1={lx} y1="32" x2={lx} y2="70" />
		{/each}
		{#if mitSonne}{@render sonne(80, 16)}{/if}
		{#if stutzen}
			<line x1="70" y1="34" x2="82" y2="34" stroke="var(--vl)" />
			<line x1="70" y1="64" x2="82" y2="64" stroke="var(--rl)" />
		{/if}
	{:else if name === 'solar-roehren'}
		<rect x="22" y="18" width="50" height="10" rx="3" />
		{#each [26, 36, 46, 56, 66] as rx (rx)}
			<rect x={rx} y="34" width="6" height="42" rx="3" />
		{/each}
		{#if mitSonne}{@render sonne(14, 14)}{/if}
		{#if stutzen}
			<line x1="72" y1="20.5" x2="84" y2="20.5" stroke="var(--vl)" />
			<line x1="72" y1="25.5" x2="84" y2="25.5" stroke="var(--rl)" />
		{/if}
	{:else if name === 'pv-modul'}
		<rect x="22" y="22" width="52" height="52" rx="3" />
		<line x1="39.3" y1="22" x2="39.3" y2="74" /><line x1="56.6" y1="22" x2="56.6" y2="74" />
		<line x1="22" y1="39.3" x2="74" y2="39.3" /><line x1="22" y1="56.6" x2="74" y2="56.6" />
		<path d="M50 36 L41 50 L47 50 L44 61 L55 47 L49 47 L53 36 Z" fill="var(--elec)" stroke="none" />
		{#if mitSonne}{@render sonne(84, 14)}{/if}
	{:else if name === 'batterie'}
		<rect x="30" y="24" width="36" height="48" rx="6" />
		<path d="M50 30 L43 41 L48 41 L45 50 L54 39 L49 39 L52 30 Z" fill="var(--elec)" stroke="none" />
		<line x1="37" y1="56" x2="59" y2="56" stroke="var(--elec)" />
		<line x1="37" y1="62" x2="59" y2="62" stroke="var(--elec)" />
		<line x1="37" y1="68" x2="59" y2="68" stroke="var(--elec)" />
	{:else if name === 'solar-dach'}
		<!-- Roof pitch 21.3° = the house cross-section of the schematic view -->
		{#if boden}<line x1="4" y1="70" x2="92" y2="35.7" />{/if}
		<g transform="rotate(-21.3 48 52.8)">
			<rect x="16" y="42.8" width="64" height="10" rx="2" />
			{#each [26, 36, 46, 56, 66] as lx (lx)}
				<line x1={lx} y1="42.8" x2={lx} y2="52.8" />
			{/each}
		</g>
		{#if mitSonne}{@render sonne(16, 16)}{/if}
		{#if stutzen}
			<line x1="58" y1="51" x2="58" y2="61" stroke="var(--vl)" />
			<line x1="66" y1="48" x2="66" y2="58" stroke="var(--rl)" />
		{/if}
	{:else if name === 'pv-dach'}
		{#if boden}<line x1="4" y1="70" x2="92" y2="35.7" />{/if}
		<g transform="rotate(-21.3 48 52.8)">
			<rect x="16" y="42.8" width="64" height="10" rx="2" />
			<line x1="16" y1="47.8" x2="80" y2="47.8" />
			{#each [32, 48, 64] as lx (lx)}
				<line x1={lx} y1="42.8" x2={lx} y2="52.8" />
			{/each}
		</g>
		{#if mitSonne}
			<!-- Sun and lightning are illustration context — schematics show their own -->
			{@render sonne(16, 16)}
			<path d="M60 56 L53 67 L58 67 L55 76 L64 65 L59 65 L62 56 Z" fill="var(--elec)" stroke="none" />
		{/if}

	<!-- ── Ventilation ── -->
	{:else if name === 'lueftung-zentral'}
		<rect x="26" y="26" width="44" height="44" rx="6" />
		<g stroke="var(--air)">
			<line x1="34" y1="34" x2="62" y2="62" />
			<line x1="62" y1="34" x2="34" y2="62" />
		</g>
		<line x1="34" y1="26" x2="34" y2="16" /><line x1="62" y1="26" x2="62" y2="16" />
		<line x1="34" y1="70" x2="34" y2="80" /><line x1="62" y1="70" x2="62" y2="80" />
	{:else if name === 'lueftung-dezentral'}
		<rect x="42" y="10" width="12" height="22" />
		<rect x="42" y="64" width="12" height="22" />
		<rect x="26" y="40" width="44" height="16" rx="3" />
		{@render ventilator(58, 48, 6.5, false, 1.8)}
		<g stroke="var(--vl)" stroke-width="2">
			<line x1="28" y1="34" x2="38" y2="34" />
			<path d="M35 31 L38 34 L35 37" />
		</g>
		<g stroke="var(--cool)" stroke-width="2">
			<line x1="38" y1="62" x2="28" y2="62" />
			<path d="M31 59 L28 62 L31 65" />
		</g>
	{:else if name === 'abluft'}
		<rect x="20" y="40" width="56" height="16" rx="3" />
		{@render ventilator(40, 48, 6.5, false, 1.8)}
		<g stroke="var(--air)" stroke-width="2">
			<line x1="58" y1="48" x2="70" y2="48" />
			<path d="M67 44.5 L70.5 48 L67 51.5" />
		</g>

	<!-- ── Cooling ── -->
	{:else if name === 'kaelteerzeuger'}
		<rect x="22" y="28" width="52" height="46" rx="6" />
		<g stroke="var(--cool)">
			<line x1="48" y1="38" x2="48" y2="64" />
			<line x1="36.7" y1="44.5" x2="59.3" y2="57.5" />
			<line x1="36.7" y1="57.5" x2="59.3" y2="44.5" />
		</g>
		{#if stutzen}
			<line x1="74" y1="38" x2="86" y2="38" stroke="var(--cool)" />
			<line x1="74" y1="46" x2="86" y2="46" stroke="var(--cool)" />
		{/if}
		{#if boden}<line x1="14" y1="80" x2="82" y2="80" />{/if}
	{:else if name === 'umluftkuehler'}
		<rect x="16" y="34" width="64" height="30" rx="5" />
		{@render ventilator(34, 49, 10, true, 2)}
		<g stroke="var(--cool)" stroke-width="2">
			<line x1="60" y1="40" x2="60" y2="58" />
			<line x1="52" y1="44.5" x2="68" y2="53.5" />
			<line x1="52" y1="53.5" x2="68" y2="44.5" />
		</g>
		{#if stutzen}
			<line x1="80" y1="42" x2="90" y2="42" stroke="var(--cool)" />
			<line x1="80" y1="52" x2="90" y2="52" stroke="var(--cool)" />
		{/if}

	<!-- ── Fittings and controls ── -->
	{:else if name === 'pumpe'}
		<line x1="14" y1="48" x2="37" y2="48" />
		<line x1="59" y1="48" x2="82" y2="48" />
		<circle cx="48" cy="48" r="11" />
		<path d="M43 42 L57 48 L43 54 Z" />
	{:else if name === 'mischer'}
		<line x1="14" y1="48" x2="33" y2="48" />
		<line x1="63" y1="48" x2="82" y2="48" />
		<line x1="48" y1="63" x2="48" y2="80" />
		<path d="M33 41.5 L48 48 L33 54.5 Z" />
		<path d="M63 41.5 L48 48 L63 54.5 Z" />
		<path d="M41.5 63 L48 48 L54.5 63 Z" />
	{:else if name === 'regelung'}
		<rect x="30" y="26" width="36" height="44" rx="6" />
		<rect x="36" y="32" width="24" height="14" rx="2" />
		<circle cx="48" cy="58" r="5.5" />
		<line x1="48" y1="55" x2="48" y2="58" />
	{:else if name === 'fws'}
		<rect x="30" y="16" width="36" height="48" rx="6" />
		{@render waermetauscher(40.5, 30, 11.5)}
		<path
			d="M48 50 C45.8 53 44.5 54.8 44.5 56.7 A3.5 3.5 0 0 0 51.5 56.7 C51.5 54.8 50.2 53 48 50 Z"
			fill="var(--water)"
			stroke="none"
		/>
		{#if stutzen}
			<line x1="37" y1="64" x2="37" y2="74" stroke="var(--vl)" />
			<line x1="59" y1="64" x2="59" y2="74" stroke="var(--rl)" />
		{/if}
	{:else if name === 'zapfstelle'}
		<path d="M22 34 H52 A10 10 0 0 1 62 44 V52" />
		<line x1="40" y1="26" x2="40" y2="34" />
		<line x1="34" y1="26" x2="46" y2="26" />
		<path
			d="M62 58 C59.8 61 58.5 62.8 58.5 64.7 A3.5 3.5 0 0 0 65.5 64.7 C65.5 62.8 64.2 61 62 58 Z"
			fill="var(--water)"
			stroke="none"
		/>
	{/if}
	</g>
</svg>

<style>
	/* Library accent colors — defined on the tile so the drawing elements inherit
	   them (the contour itself follows `currentColor`). */
	.technikIcon {
		--fire: #d9622b;
		--oil: #8a6f4d;
		--elec: #d9a013;
		--water: #2f6bd6;
		--air: #8a97a8;
		--earth: #8a6f4d;
		--vl: #d63a2a;
		--rl: #2563cc;
		--cool: #2299b8;
		--kern: #f1f2f7;
	}
</style>

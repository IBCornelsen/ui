<script lang="ts">
	import { slide } from "svelte/transition";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import AnleitungCard from "./AnleitungCard.svelte";
	import type { AnleitungInstruction } from "./anleitung";
	import { getActiveAnleitung, getAnleitungAnker, setActiveAnleitung } from "./store.svelte";

	// Inline guidance as a speech bubble: one full-width row that opens directly
	// BELOW the row of fields the clicked question mark sits in — no matter how
	// many fields share that row. Opens ONLY via the "?" trigger that
	// use:anleitung injects (Jens 2026-08-04); the arrow points back at it.
	// Styled like the tooltip bubbles (neutral-900, white text, 45°-arrow).
	//
	// Placement without measuring the bubble: this element is a direct child of
	// the field grid and spans all columns. Explicitly assigning its grid row puts
	// it under the anchor field's row; the remaining fields flow around it.
	interface Props {
		// Guidance to show. Omit to follow the shared store that use:anleitung feeds.
		active?: AnleitungInstruction | null;
	}

	let { active }: Props = $props();

	const gezeigt = $derived(active === undefined ? getActiveAnleitung() : active);
	const anker = $derived(getAnleitungAnker());

	let zeileEl = $state<HTMLElement>();
	let gridZeile = $state(0);
	let pfeilX = $state(24);

	// Grid row of the anchor field: every distinct top edge among the field
	// wrappers is one row. Measured with getBoundingClientRect, NOT offsetTop —
	// the wrappers sit in differently positioned ancestors (e.g. `sm:contents`
	// sub-grids), which gives offsetTop inconsistent reference points. A tolerance
	// absorbs sub-pixel differences between fields of the same row.
	const ZEILEN_TOLERANZ = 4;

	// The real grid items — ALL of them, not just the ones carrying guidance. Rows
	// filled by an intro paragraph or a sketch count too; ignoring them made the
	// row land several rows too high. A `display: contents` wrapper is not an item
	// itself, its children are.
	function gridItems(grid: HTMLElement): HTMLElement[] {
		const items: HTMLElement[] = [];
		for (const kind of Array.from(grid.children) as HTMLElement[]) {
			if (kind === zeileEl) continue;
			if (getComputedStyle(kind).display === "contents") {
				items.push(...(Array.from(kind.children) as HTMLElement[]));
				continue;
			}
			items.push(kind);
		}
		return items.filter((item) => item.offsetParent !== null);
	}

	function ermittleGridZeile(): number {
		const grid = zeileEl?.parentElement;
		if (!grid || !gezeigt || !anker) return 0;
		const items = gridItems(grid);
		const aktiv = items.find((item) => item === anker || item.contains(anker));
		if (!aktiv) return 0;
		const kanten: number[] = [];
		for (const item of items) {
			const oben = item.getBoundingClientRect().top;
			if (kanten.some((kante) => Math.abs(kante - oben) <= ZEILEN_TOLERANZ)) continue;
			kanten.push(oben);
		}
		kanten.sort((a, b) => a - b);
		const aktivOben = aktiv.getBoundingClientRect().top;
		const index = kanten.findIndex((kante) => Math.abs(kante - aktivOben) <= ZEILEN_TOLERANZ);
		if (index < 0) return 0;
		return index + 1;
	}

	// Arrow x within the bubble = horizontal center of the clicked "?" chip.
	function ermittlePfeilX(): number {
		if (!zeileEl || !anker) return 24;
		const frage = anker.querySelector("[data-anleitung-frage]") ?? anker;
		const frageRect = frage.getBoundingClientRect();
		const zeileRect = zeileEl.getBoundingClientRect();
		const mitte = frageRect.left + frageRect.width / 2 - zeileRect.left;
		return Math.max(14, Math.min(mitte, zeileRect.width - 14));
	}

	function platzieren() {
		gridZeile = ermittleGridZeile();
		// Arrow after layout: the row assignment above may move this element first.
		requestAnimationFrame(() => {
			pfeilX = ermittlePfeilX();
		});
	}

	// The store is app-global, but several grids each mount their own row: only
	// the row whose OWN grid contains the anchor may render — otherwise every
	// grid on the page would show the same bubble. gridZeile > 0 is exactly
	// "anchor found among this grid's items"; an explicit `active` prop opts out.
	const hierVerankert = $derived(active !== undefined || gridZeile > 0);

	// Re-place when the guidance or its anchor changes, and on resize — a rewrap
	// of the grid (sm→xl, tablet rotation) moves the anchor into another row.
	$effect(() => {
		void gezeigt;
		void anker;
		platzieren();
	});
</script>

<svelte:window onresize={platzieren} />

<!-- grid-row wird nur gesetzt, wenn die Zeile ermittelt werden konnte; sonst
     hängt der Hinweis am Ende des Rasters an. -->
<div
	bind:this={zeileEl}
	class="col-span-full"
	style:grid-row={gridZeile > 0 ? `${gridZeile + 1}` : null}
>
	{#if gezeigt && hierVerankert}
		<div transition:slide={{ duration: 200 }} class="pt-2 pb-1">
			<div class="relative rounded-md bg-neutral-900 px-4 py-3 text-white shadow-lg">
				<span class="absolute -top-1 -ml-1 size-2 rotate-45 bg-neutral-900" style:left="{pfeilX}px"
				></span>
				<button
					type="button"
					onclick={() => setActiveAnleitung(null)}
					aria-label="Hinweis schließen"
					class="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
				>
					<XIcon size={14} weight="bold" />
				</button>
				<div class="pr-8">
					<AnleitungCard instruction={gezeigt} dunkel />
				</div>
			</div>
		</div>
	{/if}
</div>

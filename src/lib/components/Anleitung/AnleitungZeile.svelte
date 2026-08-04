<script lang="ts">
	import { slide } from "svelte/transition";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import AnleitungCard from "./AnleitungCard.svelte";
	import type { AnleitungInstruction } from "./anleitung";
	import { getActiveAnleitung, getAnleitungAnker, setActiveAnleitung } from "./store.svelte";

	// Inline guidance: one full-width row that opens directly BELOW the row of
	// fields the clicked question mark sits in — no matter how many fields share
	// that row. Opens ONLY via the "?" trigger that use:anleitung injects
	// (Jens 2026-08-04); light card design, no speech-bubble styling (Jens).
	//
	// Placement without measuring: this element is a direct child of the field
	// grid and spans all columns. Explicitly assigning its grid row puts it under
	// the anchor field's row; the remaining fields flow around it.
	interface Props {
		// Guidance to show. Omit to follow the shared store that use:anleitung
		// feeds; pass a value (or null) to drive the row directly — e.g. for
		// automatic checks that appear without a click. With an explicit value the
		// row keeps its DOM position in the grid.
		active?: AnleitungInstruction | null;
	}

	let { active }: Props = $props();

	const gezeigt = $derived(active === undefined ? getActiveAnleitung() : active);
	const anker = $derived(getAnleitungAnker());

	let zeileEl = $state<HTMLElement>();
	let gridZeile = $state(0);

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

	function platzieren() {
		if (active !== undefined) return;
		gridZeile = ermittleGridZeile();
	}

	// Re-place when the guidance or its anchor changes, and on resize — a rewrap
	// of the grid (sm→xl, tablet rotation) moves the anchor into another row.
	$effect(() => {
		void gezeigt;
		void anker;
		platzieren();
	});

	// The store is app-global, but several grids each mount their own row: only
	// the row whose OWN grid contains the anchor may render — otherwise every
	// grid on the page would show the same guidance. gridZeile > 0 is exactly
	// "anchor found among this grid's items"; an explicit `active` prop opts out.
	const hierVerankert = $derived(active !== undefined || gridZeile > 0);
</script>

<svelte:window onresize={platzieren} />

<!-- grid-row wird nur gesetzt, wenn die Zeile ermittelt werden konnte; mit
     explizitem `active` (oder ohne Treffer) bleibt sie an ihrer DOM-Position. -->
<div
	bind:this={zeileEl}
	class="col-span-full"
	style:grid-row={active === undefined && gridZeile > 0 ? `${gridZeile + 1}` : null}
>
	{#if gezeigt && hierVerankert}
		<div
			transition:slide={{ duration: 200 }}
			class="relative rounded-lg border border-primary-200 bg-primary-50/60 px-3 py-2.5"
		>
			{#if active === undefined}
				<button
					type="button"
					onclick={() => setActiveAnleitung(null)}
					aria-label="Hinweis schließen"
					class="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded text-neutral-500 transition-colors hover:bg-white hover:text-neutral-700"
				>
					<XIcon size={14} weight="bold" />
				</button>
			{/if}
			<div class:pr-8={active === undefined}>
				<AnleitungCard instruction={gezeigt} />
			</div>
		</div>
	{/if}
</div>

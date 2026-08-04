<script lang="ts">
	import { slide } from "svelte/transition";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import AnleitungCard from "./AnleitungCard.svelte";
	import type { AnleitungInstruction } from "./anleitung";
	import { getActiveAnleitung, setActiveAnleitung } from "./store.svelte";

	// Inline guidance for narrow layouts, where the Anleitung side panel is not on
	// screen: one full-width row that opens directly BELOW the row of fields the
	// active input sits in — no matter how many fields share that row (Jens
	// 2026-08-04). Only ever one row is open, because it follows the same single
	// `active` store as the panel.
	//
	// Placement without measuring: this element is a direct child of the field grid
	// and spans all columns. Explicitly assigning its grid row puts it under the
	// active field's row; the remaining fields flow around it and move down.
	interface Props {
		// Guidance to show. Omit to follow the shared store that use:anleitung feeds.
		active?: AnleitungInstruction | null;
		// Selector marking the field wrappers inside the grid. Their DOM order
		// decides which grid row the active one sits in.
		feldSelektor?: string;
	}

	let { active, feldSelektor = "[data-hilfe]" }: Props = $props();

	const gezeigt = $derived(active === undefined ? getActiveAnleitung() : active);

	let zeileEl = $state<HTMLElement>();
	let gridZeile = $state(0);

	// Grid row of the active field, derived from the vertical offsets of all field
	// wrappers: every distinct offsetTop is one row.
	function ermittleGridZeile(): number {
		const grid = zeileEl?.parentElement;
		if (!grid || !gezeigt) return 0;
		const felder = Array.from(grid.querySelectorAll<HTMLElement>(feldSelektor));
		const aktiv = felder.find((feld) => feld.contains(document.activeElement));
		if (!aktiv) return 0;
		const kanten = [...new Set(felder.map((feld) => feld.offsetTop))].sort((a, b) => a - b);
		return kanten.indexOf(aktiv.offsetTop) + 1;
	}

	$effect(() => {
		void gezeigt;
		gridZeile = ermittleGridZeile();
	});
</script>

<!-- grid-row wird nur gesetzt, wenn die Zeile ermittelt werden konnte; sonst
     hängt der Hinweis am Ende des Rasters an. -->
<div
	bind:this={zeileEl}
	class="col-span-full"
	style:grid-row={gridZeile > 0 ? `${gridZeile + 1}` : null}
>
	{#if gezeigt}
		<div
			transition:slide={{ duration: 200 }}
			class="relative rounded-lg border border-primary-200 bg-primary-50/60 px-3 py-2.5"
		>
			<button
				type="button"
				onclick={() => setActiveAnleitung(null)}
				aria-label="Hinweis schließen"
				class="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded text-neutral-500 transition-colors hover:bg-white hover:text-neutral-700"
			>
				<XIcon size={14} weight="bold" />
			</button>
			<div class="pr-8">
				<AnleitungCard instruction={gezeigt} />
			</div>
		</div>
	{/if}
</div>

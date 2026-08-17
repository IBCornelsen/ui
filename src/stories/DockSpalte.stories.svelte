<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import DockSpalte from "../lib/components/DockSpalte/DockSpalte.svelte";
	import SpaltenGriff from "../lib/components/DockSpalte/SpaltenGriff.svelte";

	const { Story } = defineMeta({
		title: "UI/DockSpalte",
		tags: ["autodocs"]
	});
</script>

<!-- Zwei Dock-Spalten wie in der Bedarfs-/Verbrauchsausweis-Strecke: die Griffe
     hängen an der gleitenden Innenkante und wandern beim Zufahren mit an den
     Rand — kein Positionssprung. -->
<Story name="Links und rechts">
	<div class="flex h-96 gap-4 overflow-hidden bg-neutral-50 p-4">
		<DockSpalte
			side="left"
			width="250px"
			collapseLabel="Schritt-Übersicht ausblenden"
			expandLabel="Schritt-Übersicht anzeigen"
		>
			<div class="w-[250px] shrink-0 rounded-xl border border-neutral-200 bg-white p-4 shadow-md">
				Workflow-Spalte
			</div>
		</DockSpalte>

		<div class="flex-1 rounded-xl border border-neutral-200 bg-white p-4">Inhalt</div>

		<DockSpalte
			side="right"
			width="300px"
			collapseLabel="Info-Spalte ausblenden"
			expandLabel="Info-Spalte anzeigen"
		>
			<div class="w-75 shrink-0 rounded-xl border border-neutral-200 bg-white p-4 shadow-md">
				Info-Spalte
			</div>
		</DockSpalte>
	</div>
</Story>

<Story name="Startet eingeklappt">
	<div class="flex h-64 gap-4 overflow-hidden bg-neutral-50 p-4">
		<DockSpalte
			side="left"
			collapsed={true}
			width="250px"
			collapseLabel="Spalte ausblenden"
			expandLabel="Spalte anzeigen"
		>
			<div class="w-[250px] shrink-0 rounded-xl border border-neutral-200 bg-white p-4 shadow-md">
				Spalte
			</div>
		</DockSpalte>
		<div class="flex-1 rounded-xl border border-neutral-200 bg-white p-4">Inhalt</div>
	</div>
</Story>

<!-- Der Griff allein — für Overlay-Fälle (fixed am Bildschirmrand). -->
<Story name="SpaltenGriff solo">
	<div class="relative h-40 bg-neutral-50">
		<SpaltenGriff
			direction="left"
			label="Info-Spalte anzeigen"
			onclick={() => {}}
			positionClass="absolute top-1/2 right-0 rounded-l-lg border-r-0"
		/>
	</div>
</Story>

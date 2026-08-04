<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import AnleitungZeile from "../lib/components/Anleitung/AnleitungZeile.svelte";
	import Field from "../lib/components/Field.svelte";
	import Input from "../lib/components/Input.svelte";
	import { anleitung } from "../lib/components/Anleitung/anleitung";

	const { Story } = defineMeta({
		title: "UI/AnleitungZeile",
		tags: ["autodocs"]
	});
</script>

<!-- Die Zeile öffnet sich unter DER Rasterzeile, in der das fokussierte Feld steht —
     unabhängig davon, wie viele Felder dort nebeneinander liegen. Sie folgt demselben
     Store wie das Anleitung-Panel, es ist also immer nur eine offen. -->
<Story name="Feldraster mit Hinweiszeile">
	<div class="grid max-w-[640px] grid-cols-2 gap-3">
		<div
			data-hilfe="baujahr"
			use:anleitung={{
				title: "Baujahr",
				importance: "required",
				description: "Fertigstellungsjahr des Gebäudes — bestimmt die Bauteil-Vorbelegung."
			}}
		>
			<Field label="Baujahr" for="baujahr" required>
				<Input id="baujahr" type="number" placeholder="1974" />
			</Field>
		</div>
		<div
			data-hilfe="wohnflaeche"
			use:anleitung={{
				title: "Wohnfläche",
				importance: "required",
				description: "Beheizte Wohnfläche in m². Keller und Dachboden nur, wenn beheizt.",
				norm: { ref: "GEG §3", quote: "Nutzfläche gebäudebezogen ermitteln." }
			}}
		>
			<Field label="Wohnfläche [m²]" for="wohnflaeche" required>
				<Input id="wohnflaeche" type="number" placeholder="120" />
			</Field>
		</div>
		<div
			data-hilfe="geschosse"
			use:anleitung={{
				title: "Vollgeschosse",
				importance: "recommended",
				description: "Anzahl beheizter Geschosse."
			}}
		>
			<Field label="Vollgeschosse" for="geschosse">
				<Input id="geschosse" type="number" placeholder="2" />
			</Field>
		</div>
		<div
			data-hilfe="hoehe"
			use:anleitung={{
				title: "Geschosshöhe",
				importance: "optional",
				description: "Lichte Raumhöhe je Geschoss in Metern."
			}}
		>
			<Field label="Geschosshöhe [m]" for="hoehe">
				<Input id="hoehe" type="number" placeholder="2.5" />
			</Field>
		</div>
		<AnleitungZeile />
	</div>
	<p class="mt-4 text-sm text-neutral-600">
		Ein Feld anklicken: der Hinweis erscheint über die volle Rasterbreite direkt unter der Zeile des
		Feldes.
	</p>
</Story>

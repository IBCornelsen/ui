<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import AnleitungZeile from "../lib/components/Anleitung/AnleitungZeile.svelte";
	import FieldLabel from "../lib/components/FieldLabel.svelte";
	import Input from "../lib/components/Input.svelte";

	const { Story } = defineMeta({
		title: "UI/FieldLabel",
		tags: ["autodocs"]
	});
</script>

<!-- Klick aufs Fragezeichen öffnet die Hinweiszeile über die volle Rasterbreite
     unter der Feldzeile (keine Sprechblase); erneuter Klick oder ✕ schließt. -->
<Story name="Mit Hilfe-Zeile">
	<div class="grid w-[560px] grid-cols-2 gap-3">
		<div class="flex flex-col gap-1">
			<FieldLabel title="Wohnfläche m²" required>
				Beheizte Wohnfläche des gesamten Gebäudes — Terrassen und Balkone zählen nicht mit.
			</FieldLabel>
			<Input name="wohnflaeche" type="number" placeholder="—" />
		</div>
		<div class="flex flex-col gap-1">
			<FieldLabel title="Baujahr" required>Fertigstellungsjahr des Gebäudes.</FieldLabel>
			<Input name="baujahr" type="number" placeholder="1974" />
		</div>
		<AnleitungZeile />
	</div>
</Story>

<Story name="Ohne Hilfe">
	<div class="flex w-72 flex-col gap-1">
		<FieldLabel title="Ort" />
		<Input name="ort" placeholder="Musterhausen" />
	</div>
</Story>

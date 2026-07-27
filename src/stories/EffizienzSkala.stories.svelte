<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import EffizienzSkala from "../lib/components/EffizienzSkala.svelte";
	import type { EnergyScaleClass } from "../lib/components/EnergyScale/types";

	const { Story } = defineMeta({
		title: "UI/EffizienzSkala",
		tags: ["autodocs"]
	});

	// GEG-Wohnbänder (A+ <30 … H ≥250) mit festen Beispiel-Farben.
	const CLASSES: EnergyScaleClass[] = [
		{ label: "A+", size: 30, color: "#00963f" },
		{ label: "A", size: 20, color: "#4bb748" },
		{ label: "B", size: 25, color: "#a2c517" },
		{ label: "C", size: 25, color: "#dfd000" },
		{ label: "D", size: 30, color: "#fbbb00" },
		{ label: "E", size: 30, color: "#f18700" },
		{ label: "F", size: 40, color: "#e6320f" },
		{ label: "G", size: 50, color: "#cc1517" },
		{ label: "H", size: 50, color: "#951b1e" }
	];
</script>

<Story name="Mit Kennwerten">
	<div class="w-80">
		<EffizienzSkala classes={CLASSES} endenergie={87} primaerenergie={104} />
	</div>
</Story>

<Story name="Ohne Berechnung">
	<div class="w-80">
		<EffizienzSkala classes={CLASSES} endenergie={null} primaerenergie={null} />
	</div>
</Story>

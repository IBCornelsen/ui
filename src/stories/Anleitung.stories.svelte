<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Anleitung from "../lib/components/Anleitung/Anleitung.svelte";
	import AnleitungCard from "../lib/components/Anleitung/AnleitungCard.svelte";
	import AnleitungFormDemo from "./AnleitungFormDemo.svelte";
	import type { AnleitungInstruction } from "../lib/components/Anleitung/anleitung";

	const { Story } = defineMeta({
		title: "UI/Anleitung",
		tags: ["autodocs"]
	});

	const instruction: AnleitungInstruction = {
		title: "Anlass",
		description:
			"Grund der Ausstellung wählen (z. B. Verkauf, Vermietung, Modernisierung). Bestimmt die Ausweisart nach dem GEG.",
		importance: "required",
		norm: {
			ref: "GEG §80",
			quote: "Energieausweise werden als Energiebedarfs- oder Energieverbrauchsausweis ausgestellt."
		}
	};
</script>

<Story name="Panel (aktiv)">
	<div class="h-[420px] w-[380px] overflow-hidden rounded-2xl border border-neutral-200">
		<Anleitung active={instruction} />
	</div>
</Story>

<Story name="Panel (leer)">
	<div class="h-[420px] w-[380px] overflow-hidden rounded-2xl border border-neutral-200">
		<Anleitung active={null} />
	</div>
</Story>

<Story name="Einzelne Karte">
	<div class="w-[356px] bg-[#fafafa] p-3">
		<AnleitungCard {instruction} />
	</div>
</Story>

<!-- Usage: focusing a form field feeds its guidance into the panel via use:anleitung. -->
<Story name="Neben Formular">
	<AnleitungFormDemo />
</Story>

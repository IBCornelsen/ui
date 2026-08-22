<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import PdfButton from "../lib/components/PdfButton.svelte";

	const { Story } = defineMeta({
		title: "UI/PdfButton",
		tags: ["autodocs"]
	});
</script>

<Story name="Vorschau-Zeilen">
	<div class="flex w-72 flex-col gap-2">
		<PdfButton title="Energieausweis als PDF-Vorschau öffnen">Ansichtsausweis</PdfButton>
		<PdfButton>Datenblatt</PdfButton>
		<PdfButton disabled>Datenblatt (gesperrt)</PdfButton>
	</div>
</Story>

<!-- size="lg": Dokument-Boxen, in denen das PDF-Symbol die Zeile trägt. -->
<Story name="Groß (Dokument-Box)">
	<div class="grid w-[36rem] grid-cols-2 gap-2">
		<PdfButton size="lg">Energieausweis</PdfButton>
		<PdfButton size="lg">Datenblatt</PdfButton>
	</div>
</Story>

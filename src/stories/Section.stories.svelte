<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Section from "../lib/components/Section.svelte";

	const { Story } = defineMeta({
		title: "UI/Section",
		tags: ["autodocs"]
	});
</script>

<!-- Statusikonen wie im Accordion (Verbrauchsausweis-Referenz): Haken im
     CI-blauen Kreis, X im CI-orangen Kreis — keine Dreiecke. -->
<Story name="Statusvarianten">
	<div class="flex w-[640px] flex-col gap-3">
		<Section bereich="A" title="Vollständiger Abschnitt" isValid={true} showErrors open={false}>
			<p class="text-sm text-neutral-600">Alle Pflichtfelder sind ausgefüllt.</p>
		</Section>
		<Section bereich="B" title="Unvollständiger Abschnitt" isValid={false} showErrors optional>
			<p class="text-sm text-neutral-600">Hier fehlen noch Angaben.</p>
		</Section>
		<Section bereich="C" title="Ohne Statusanzeige" open={false}>
			<p class="text-sm text-neutral-600">showErrors ist aus — kein Statuskreis.</p>
		</Section>
	</div>
</Story>

<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FaqAccordion from "../lib/components/FaqAccordion/FaqAccordion.svelte";
	import FaqAccordionItem from "../lib/components/FaqAccordion/FaqAccordionItem.svelte";

	const { Story } = defineMeta({
		title: "UI/FaqAccordion",
		tags: ["autodocs"]
	});
</script>

<Story name="Standard">
	<div class="max-w-xl">
		<FaqAccordion>
			<FaqAccordionItem title="Was kostet ein Energieausweis?">
				<p>Der Verbrauchsausweis für Wohngebäude beginnt bei 49 €.</p>
			</FaqAccordionItem>
			<FaqAccordionItem title="Wie lange ist der Ausweis gültig?">
				<p>Zehn Jahre ab Ausstellungsdatum.</p>
			</FaqAccordionItem>
			<FaqAccordionItem title="Brauche ich Bedarf oder Verbrauch?">
				<p>
					Bei unsanierten Gebäuden vor 1978 mit bis zu vier Wohnungen ist der Bedarfsausweis
					Pflicht.
				</p>
			</FaqAccordionItem>
		</FaqAccordion>
	</div>
</Story>

<Story name="Erste Frage offen">
	<div class="max-w-xl">
		<FaqAccordion initialOpen="Was kostet ein Energieausweis?">
			<FaqAccordionItem title="Was kostet ein Energieausweis?">
				<p>Der Verbrauchsausweis für Wohngebäude beginnt bei 49 €.</p>
			</FaqAccordionItem>
			<FaqAccordionItem title="Wie lange ist der Ausweis gültig?">
				<p>Zehn Jahre ab Ausstellungsdatum.</p>
			</FaqAccordionItem>
		</FaqAccordion>
	</div>
</Story>

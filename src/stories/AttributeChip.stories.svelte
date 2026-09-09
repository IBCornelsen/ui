<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import AttributeChip from "../lib/components/AttributeChip.svelte";

	const { Story } = defineMeta({
		title: "UI/AttributeChip",
		tags: ["autodocs"]
	});
</script>

<Story name="Gebäudeliste">
	<div class="flex flex-wrap gap-1.5">
		<AttributeChip value="Mehrfamilienhaus" />
		<AttributeChip value="Baujahr 1998" />
		<AttributeChip value="420 m²" />
		<AttributeChip value="6 Wohneinheiten" />
	</div>
</Story>

<Story name="Gebäudeakte">
	<div class="flex flex-wrap gap-1.5">
		<AttributeChip value="Mehrfamilienhaus" />
		<AttributeChip value="Gesamtgebäude" />
		<AttributeChip value="Wohnfläche 420 m²" />
		<AttributeChip value="Nutzfläche 530 m²" />
		<AttributeChip value="6 Wohneinheiten" />
		<AttributeChip value="Baujahr 1998" />
		<AttributeChip value="Heizung 2014" />
		<AttributeChip value="Zentralheizung" />
	</div>
</Story>

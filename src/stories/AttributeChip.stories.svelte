<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import AttributeChip from "../lib/components/AttributeChip.svelte";

	const { Story } = defineMeta({
		title: "UI/AttributeChip",
		tags: ["autodocs"]
	});
</script>

<Story name="Ohne Beschriftung">
	<div class="flex flex-wrap gap-1.5">
		<AttributeChip value="Mehrfamilienhaus" />
		<AttributeChip value="Baujahr 1998" />
		<AttributeChip value="420 m²" />
		<AttributeChip value="6 Wohneinheiten" />
	</div>
</Story>

<Story name="Mit Beschriftung">
	<div class="flex flex-wrap gap-1.5">
		<AttributeChip label="Gebäudetyp" value="Mehrfamilienhaus" />
		<AttributeChip label="Gebäudeteil" value="Gesamtgebäude" />
		<AttributeChip label="Wohnfläche" value="420 m²" />
		<AttributeChip label="Nutzfläche" value="530 m²" />
		<AttributeChip label="Baujahr Heizung" value="2014" />
		<AttributeChip label="Heizsystem" value="Zentralheizung" />
	</div>
</Story>

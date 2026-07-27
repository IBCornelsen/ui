<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FieldLabel from "../lib/components/FieldLabel.svelte";
	import Input from "../lib/components/Input.svelte";

	const { Story } = defineMeta({
		title: "UI/FieldLabel",
		tags: ["autodocs"]
	});
</script>

<Story name="Mit Hilfe-Tooltip">
	<div class="flex w-72 flex-col gap-1 pt-24">
		<FieldLabel title="Wohnfläche m²" required>
			Beheizte Wohnfläche des gesamten Gebäudes — Terrassen und Balkone zählen nicht mit.
		</FieldLabel>
		<Input name="wohnflaeche" type="number" placeholder="—" />
	</div>
</Story>

<Story name="Ohne Hilfe">
	<div class="flex w-72 flex-col gap-1">
		<FieldLabel title="Ort" />
		<Input name="ort" placeholder="Musterhausen" />
	</div>
</Story>

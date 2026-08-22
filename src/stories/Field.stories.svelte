<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Field from "../lib/components/Field.svelte";
	import Input from "../lib/components/Input.svelte";
	import AnleitungZeile from "../lib/components/Anleitung/AnleitungZeile.svelte";

	const { Story } = defineMeta({
		title: "UI/Field",
		tags: ["autodocs"]
	});
</script>

<Story name="Label, Fehler, Hinweis">
	<div class="flex w-[420px] flex-col gap-4">
		<Field label="Straße, Hausnummer" for="strasse" required>
			<Input id="strasse" name="strasse" placeholder="Musterweg 1" />
		</Field>
		<Field label="PLZ" error="Bitte eine gültige Postleitzahl eingeben.">
			<Input name="plz" value="123" invalid />
		</Field>
		<Field label="Ort" hint="Wird aus der PLZ vorgeschlagen.">
			<Input name="ort" />
		</Field>
	</div>
</Story>

<Story name="Mit ?-Hilfe (AnleitungZeile)">
	<div class="grid w-[420px] grid-cols-1 gap-4">
		<Field label="Baujahr" required>
			{#snippet hilfe()}
				Baujahr laut Bauakte; bei Kernsanierung zählt das Sanierungsjahr.
			{/snippet}
			<Input name="baujahr" type="number" />
		</Field>
		<AnleitungZeile />
	</div>
</Story>

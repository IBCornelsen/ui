<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Input from "../lib/components/Input.svelte";
	import Field from "../lib/components/Field.svelte";

	const { Story } = defineMeta({
		title: "UI/Input",
		tags: ["autodocs"]
	});
</script>

<Story name="Standard">
	<div class="w-72">
		<Field label="E-Mail" for="email">
			<Input id="email" type="email" placeholder="name@example.de" />
		</Field>
	</div>
</Story>

<Story name="Mit Hinweis">
	<div class="w-72">
		<Field label="Postleitzahl" for="plz" hint="Fünfstellig, ohne Leerzeichen.">
			<Input id="plz" inputmode="numeric" placeholder="12345" />
		</Field>
	</div>
</Story>

<Story name="Ungültig">
	<div class="w-72">
		<Field label="Wohnfläche (m²)" for="flaeche" required error="Pflichtfeld.">
			<Input id="flaeche" invalid placeholder="0" />
		</Field>
	</div>
</Story>

<Story name="Deaktiviert">
	<div class="w-72">
		<Field label="Kundennummer" for="kdnr">
			<Input id="kdnr" value="AW-100234" disabled />
		</Field>
	</div>
</Story>

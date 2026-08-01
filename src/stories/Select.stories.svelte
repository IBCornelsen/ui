<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Select from "../lib/components/Select.svelte";
	import Field from "../lib/components/Field.svelte";

	const { Story } = defineMeta({
		title: "UI/Select",
		tags: ["autodocs"]
	});
</script>

<Story name="Standard">
	<div class="w-72">
		<Field label="Dachgeschoss" for="dg">
			<Select id="dg">
				<option value="nicht_vorhanden">Nicht vorhanden</option>
				<option value="unbeheizt">Vorhanden – unbeheizt</option>
				<option value="beheizt">Vorhanden – beheizt</option>
			</Select>
		</Field>
	</div>
</Story>

<Story name="Ungültig">
	<div class="w-72">
		<Field label="Art der Fenster" for="fen" required error="Bitte auswählen.">
			<Select id="fen" invalid>
				<option value="">Bitte auswählen</option>
				<option value="1.1">Dreifach-Wärmeschutz (U 1,1)</option>
			</Select>
		</Field>
	</div>
</Story>

<!-- Leeres Pflichtfeld: CI-orange statt Fehlerrot (Formulare cad/Schnellerfassung). -->
<Story name="Pflichtfeld leer">
	<div class="w-72">
		<Field label="Dachgeschoss" for="dg-pflicht" required>
			<Select id="dg-pflicht" invalid invalidVariant="required" value={null}>
				<option disabled value={null}>Bitte auswählen</option>
				<option value="unbeheizt">Vorhanden – unbeheizt</option>
			</Select>
		</Field>
	</div>
</Story>

<!-- validate: Fehlertext erscheint nach dem ersten Verlassen des Feldes. -->
<Story name="Mit Validierung">
	<div class="w-72">
		<Field label="Lüftung" for="lueftung-validate" required>
			<Select id="lueftung-validate" required validate value={null}>
				<option disabled value={null}>Bitte auswählen</option>
				<option value="fenster">Fensterlüftung</option>
				<option value="anlage">Lüftungsanlage</option>
			</Select>
		</Field>
	</div>
</Story>

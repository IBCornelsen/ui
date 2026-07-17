<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import SelectInput from "../lib/components/SelectInput/SelectInput.svelte";

	const { Story } = defineMeta({
		title: "UI/SelectInput",
		tags: ["autodocs"]
	});
</script>

<script lang="ts">
	import type { SelectInputOption } from "../lib/components/SelectInput/types";

	const CITIES = [
		{ value: "20095", label: "20095, Hamburg" },
		{ value: "20097", label: "20097, Hamburg" },
		{ value: "10115", label: "10115, Berlin" },
		{ value: "80331", label: "80331, München" },
		{ value: "50667", label: "50667, Köln" }
	];

	let value = $state("");
	let options = $state<SelectInputOption[]>([]);

	// Local prefix filter stands in for a server lookup.
	function filter(input: string) {
		if (input.length < 1) {
			options = [];
			return;
		}
		options = CITIES.filter((city) => city.value.startsWith(input));
	}
</script>

<Story name="PLZ-Suche">
	<div class="w-64">
		<SelectInput
			bind:value
			{options}
			placeholder="PLZ eingeben…"
			onInput={filter}
			onSelect={(option) => (value = option.value)}
		/>
	</div>
</Story>

<Story name="Ungültig">
	<div class="w-64">
		<SelectInput value="" invalid placeholder="Pflichtfeld" />
	</div>
</Story>

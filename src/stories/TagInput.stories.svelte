<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import TagInput from "../lib/components/TagInput.svelte";

	const { Story } = defineMeta({
		title: "UI/TagInput",
		tags: ["autodocs"]
	});
</script>

<script lang="ts">
	let baujahre = $state<(string | number)[]>([1998, 2012]);
	let stichworte = $state<(string | number)[]>(["Altbau", "Denkmalschutz"]);
	let leer = $state<(string | number)[]>([]);
</script>

<Story name="Baujahre (numerisch, sortiert)">
	<div class="w-80">
		<TagInput
			bind:tags={baujahre}
			type="number"
			minlength={4}
			maxlength={4}
			onlyUnique
			sortNumeric
			placeholder="Jahr + Enter"
		/>
	</div>
</Story>

<Story name="Stichworte (Text)">
	<div class="w-80">
		<TagInput bind:tags={stichworte} placeholder="Stichwort + Enter" />
	</div>
</Story>

<Story name="Leer">
	<div class="w-80">
		<TagInput bind:tags={leer} placeholder="Eingabe + Enter" />
	</div>
</Story>

<Story name="Ungültig (Pflichtfeld)">
	<div class="w-80">
		<TagInput bind:tags={leer} invalid placeholder="Pflichtangabe" />
	</div>
</Story>

<Story name="Deaktiviert">
	<div class="w-80">
		<TagInput tags={[1998, 2012]} type="number" disabled />
	</div>
</Story>

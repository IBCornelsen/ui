<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Zwischentitel from "../lib/components/Zwischentitel.svelte";
	import Checkbox from "../lib/components/Checkbox.svelte";

	const { Story } = defineMeta({
		title: "UI/Zwischentitel",
		tags: ["autodocs"]
	});
</script>

<Story name="Gruppen im Abschnitt">
	<div class="w-[420px]">
		<Zwischentitel text="Heizungs-Merkmale" first />
		<label class="flex items-center gap-2 text-sm text-neutral-700">
			<Checkbox /> Zentral-/Etagenheizung
		</label>
		<Zwischentitel text="Fenster, Dachfenster & Türen" />
		<label class="flex items-center gap-2 text-sm text-neutral-700">
			<Checkbox /> Doppelverglasung
		</label>
	</div>
</Story>

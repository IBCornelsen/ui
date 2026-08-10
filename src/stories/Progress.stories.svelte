<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Progress from "../lib/components/Progress.svelte";

	const { Story } = defineMeta({
		title: "UI/Progress",
		tags: ["autodocs"]
	});
</script>

<Story name="Stufen">
	<div class="flex w-96 flex-col gap-5">
		<Progress wert={33} farbe="error" />
		<Progress wert={66} />
		<Progress wert={100} farbe="success" />
	</div>
</Story>

<Story name="Mit Beschriftung">
	<div class="w-96">
		<Progress wert={66} label="Bearbeitungsstand" />
	</div>
</Story>

<Story name="Ladevorgang (pulsierend)">
	<div class="w-64">
		<Progress wert={40} pulsiert />
	</div>
</Story>

<Story name="Grenzwerte werden gekappt">
	<div class="flex w-96 flex-col gap-5">
		<Progress wert={-20} label="unter 0" />
		<Progress wert={140} label="über 100" farbe="success" />
	</div>
</Story>

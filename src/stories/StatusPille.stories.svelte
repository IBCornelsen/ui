<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StatusPille from "../lib/components/StatusPille.svelte";

	const { Story } = defineMeta({
		title: "UI/StatusPille",
		tags: ["autodocs"]
	});
</script>

<Story name="Lebenszyklus">
	<div class="flex items-center gap-3">
		<StatusPille ton="error" label="Gespeichert" />
		<StatusPille ton="warning" label="In Prüfung" />
		<StatusPille ton="success" label="Ausgestellt" />
		<StatusPille ton="neutral" label="Abgelaufen" />
	</div>
</Story>

<Story name="Handlungsbedarf">
	<div class="flex items-center gap-3">
		<StatusPille ton="error" label="Unterlagen fehlen" />
		<StatusPille ton="neutral" label="Ohne Status" />
	</div>
</Story>

<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import CardTitle from "../lib/components/CardTitle.svelte";
	import Card from "../lib/components/Card.svelte";

	const { Story } = defineMeta({
		title: "UI/CardTitle",
		component: CardTitle,
		tags: ["autodocs"]
	});
</script>

<Story name="In der Marketingkarte">
	<div class="flex w-[300px] flex-col gap-4">
		<Card size="sm">
			<CardTitle title="Preise im Überblick" as="h2" />
			<p class="m-0 body-sm">Der Strich trennt den Titel vom Inhalt der Karte.</p>
		</Card>
		<Card size="sm">
			<CardTitle title="Verbrauchsausweis Wohnen" />
			<p class="m-0 body-sm">
				Ohne Gliederungsrolle genügt ein <code class="code-inline">span</code>.
			</p>
		</Card>
	</div>
</Story>

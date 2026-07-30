<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Checkbox from "../lib/components/Checkbox.svelte";

	const { Story } = defineMeta({
		title: "UI/Checkbox",
		tags: ["autodocs"]
	});
</script>

<Story name="Mit Label">
	<div class="flex w-96 flex-col gap-3">
		<Checkbox name="agb">Ich habe die AGB gelesen und akzeptiert.</Checkbox>
		<Checkbox name="newsletter" checked>Newsletter abonnieren.</Checkbox>
		<Checkbox name="gesperrt" disabled>Deaktivierte Option.</Checkbox>
	</div>
</Story>

<Story name="Nur Box">
	<div class="flex items-center gap-4">
		<Checkbox name="a" />
		<Checkbox name="b" checked />
		<Checkbox name="c" disabled />
	</div>
</Story>

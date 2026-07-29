<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Pill from "../lib/components/Pill.svelte";
	import TechnikIcon from "../lib/components/TechnikIcon/TechnikIcon.svelte";

	const { Story } = defineMeta({
		title: "UI/Pill",
		tags: ["autodocs"]
	});
</script>

<Story name="Zustände">
	<div class="flex flex-wrap gap-1.5">
		<Pill active>Heizkörper</Pill>
		<Pill>Fußbodenheizung</Pill>
		<Pill>Beides</Pill>
		<Pill assumption class="italic">Weiß ich nicht</Pill>
	</div>
</Story>

<Story name="Mit Gerätegrafik">
	<div class="flex flex-wrap gap-1.5">
		<Pill active><TechnikIcon name="wp-luft-aussen" size={26} class="-ml-1 shrink-0" />Wärmepumpe</Pill>
		<Pill><TechnikIcon name="gas-boden" size={26} class="-ml-1 shrink-0" />Gas/Öl-Kessel</Pill>
		<Pill><TechnikIcon name="pellet" size={26} class="-ml-1 shrink-0" />Biomassekessel</Pill>
	</div>
</Story>

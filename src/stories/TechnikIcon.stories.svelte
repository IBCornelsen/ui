<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import TechnikIcon from "../lib/components/TechnikIcon/TechnikIcon.svelte";
	import { TECHNIK_ICON_LABEL, type TechnikIconName } from "../lib/components/TechnikIcon/technikIkonen";

	const { Story } = defineMeta({
		title: "UI/TechnikIcon",
		tags: ["autodocs"]
	});

	const alleNamen = Object.keys(TECHNIK_ICON_LABEL) as TechnikIconName[];
</script>

<Story name="Bibliothek (alle Icons)">
	<div class="grid grid-cols-6 gap-3">
		{#each alleNamen as name (name)}
			<figure class="m-0 rounded border border-neutral-300 p-2 text-center text-neutral-800">
				<TechnikIcon {name} size={84} />
				<figcaption class="text-[10px] text-neutral-600">{name}</figcaption>
			</figure>
		{/each}
	</div>
</Story>

<Story name="Schaubild-Modus (ohne Stutzen und Grundlinie)">
	<div class="flex items-end gap-6 text-[#33384a]">
		<TechnikIcon name="wp-luft-aussen" size={120} stutzen={false} boden={false} />
		<TechnikIcon name="gas-boden" size={120} stutzen={false} boden={false} />
		<TechnikIcon name="ww-speicher" size={120} stutzen={false} boden={false} />
	</div>
</Story>

<Story name="Größen">
	<div class="flex items-end gap-4 text-neutral-800">
		<TechnikIcon name="pellet" size={26} />
		<TechnikIcon name="pellet" size={48} />
		<TechnikIcon name="pellet" size={96} />
	</div>
</Story>

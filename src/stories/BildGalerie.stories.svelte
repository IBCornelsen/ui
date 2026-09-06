<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import BildGalerie from "../lib/components/BildGalerie/BildGalerie.svelte";
	import Button from "../lib/components/Button.svelte";
	import type { GalerieBild } from "../lib/components/BildGalerie/types";

	const { Story } = defineMeta({
		title: "UI/BildGalerie",
		tags: ["autodocs"]
	});

	// Inline-SVG statt externer Bilddatei — Storybook läuft ohne Backend.
	const kachel = (farbe: string, text: string) =>
		`data:image/svg+xml;utf8,${encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="${farbe}"/><text x="320" y="250" font-size="48" text-anchor="middle" fill="white" font-family="sans-serif">${text}</text></svg>`
		)}`;

	const bilder: GalerieBild[] = [
		{ url: kachel("#9db4c0", "Gebäude außen"), titel: "Gebäude außen" },
		{ url: kachel("#c0a89d", "Heizung"), titel: "Heizung" },
		{ url: kachel("#a8c09d", "Fenster"), titel: "Fenster" },
		{ url: kachel("#b09dc0", "Dämmung"), titel: "Dämmung" }
	];
</script>

<script lang="ts">
	let offen = $state(false);
	let index = $state(0);
	let einzelnOffen = $state(false);
</script>

<Story name="Mehrere Bilder">
	<div class="flex gap-2">
		{#each bilder as bild, position (bild.url)}
			<button
				type="button"
				class="h-16 w-20 cursor-pointer overflow-hidden rounded-md border border-neutral-200"
				onclick={() => {
					index = position;
					offen = true;
				}}
			>
				<img src={bild.url} alt={bild.titel} class="h-full w-full object-cover" />
			</button>
		{/each}
	</div>
	<BildGalerie {bilder} bind:offen bind:index titel="Musterstraße 1" />
</Story>

<Story name="Einzelbild">
	<Button onclick={() => (einzelnOffen = true)}>Bild öffnen</Button>
	<BildGalerie bilder={bilder.slice(0, 1)} bind:offen={einzelnOffen} />
</Story>

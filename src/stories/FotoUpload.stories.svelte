<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FotoUpload from "../lib/components/FotoUpload/FotoUpload.svelte";
	import { FOTO_KATEGORIEN } from "../lib/components/FotoUpload/fotoKategorien";
	import type { FotoUploadBild } from "../lib/components/FotoUpload/types";

	const { Story } = defineMeta({
		title: "UI/FotoUpload",
		tags: ["autodocs"]
	});

	// Inline-SVG statt externer Bilddatei — Storybook läuft ohne Backend.
	const kachel = (farbe: string) =>
		`data:image/svg+xml;utf8,${encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="160" height="120" fill="${farbe}"/></svg>`
		)}`;

	const bilder: FotoUploadBild[] = [
		{ id: "media:1", url: kachel("#9db4c0"), kategorie: "Gebaeude" },
		{ id: "media:2", url: kachel("#c0a89d"), kategorie: "Heizung" },
		{ id: "media:3", url: kachel("#a8c09d"), kategorie: null }
	];
</script>

<Story name="Standard">
	<div class="max-w-2xl">
		<FotoUpload
			titel="Fotos des Vorgangs"
			{bilder}
			hinweis={{
				title: "Fotos des Vorgangs",
				description:
					"Die Fotos dienen der Prüfung durch den Aussteller und erscheinen nicht auf dem Energieausweis.",
				importance: "recommended"
			}}
			onHochladen={() => {}}
			onLoeschen={() => {}}
		/>
	</div>
</Story>

<!-- Bestellstrecke: Kategorie des Abschnitts ist vorbelegt, bleibt aber änderbar. -->
<Story name="Vorbelegte Kategorie">
	<div class="max-w-2xl">
		<FotoUpload
			titel="Fotos der Wärmedämmung"
			bilder={bilder.slice(0, 1)}
			vorauswahl="Daemmung"
			min={2}
			max={4}
			name="daemmung_image"
			hinweis={{
				title: "Fotos der Wärmedämmung",
				description: "Mindestens zwei Aufnahmen der gedämmten Bauteile.",
				importance: "required"
			}}
			onHochladen={() => {}}
			onLoeschen={() => {}}
		/>
	</div>
</Story>

<Story name="Leer">
	<div class="max-w-2xl">
		<FotoUpload titel="Fotos" kategorien={FOTO_KATEGORIEN} onHochladen={() => {}} />
	</div>
</Story>

<!-- Bei max=1 bleibt die Kachel als „Foto ersetzen" stehen — der Aufrufer
     tauscht das Bestandsbild beim Upload aus. -->
<Story name="Ersetzen bei max 1">
	<div class="max-w-2xl">
		<FotoUpload
			titel="Gebäudefoto"
			bilder={bilder.slice(0, 1)}
			max={1}
			min={1}
			vorauswahl="Gebaeude"
			onHochladen={() => {}}
			onLoeschen={() => {}}
		/>
	</div>
</Story>

<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import TextWithVideo from "../lib/components/TextWithVideo.svelte";
	import VideoEmbed from "../lib/components/VideoEmbed.svelte";

	const { Story } = defineMeta({
		title: "UI/TextWithVideo",
		component: TextWithVideo,
		tags: ["autodocs"]
	});

	// Stand-in for the locally served poster of the real page.
	const poster =
		"data:image/svg+xml;utf8," +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><rect width="640" height="360" fill="#cbd5e1"/><text x="320" y="190" font-family="sans-serif" font-size="28" text-anchor="middle" fill="#334155">Vorschaubild</text></svg>'
		);

	const absatz =
		"Sie wählen die Ausweisart, tragen die Gebäudedaten in ein geführtes Formular ein und erhalten den registrierten Energieausweis als PDF — geprüft von einem Diplom-Ingenieur. Welche Unterlagen Sie brauchen, wie lange es dauert und was nach dem Absenden passiert, steht weiter unten.";
</script>

<!-- priority: the block sits at the top of its page, so the poster is fetched
     eagerly instead of lazily. -->
<Story name="Video neben dem Fließtext">
	<div class="prose @container w-[1000px]">
		<TextWithVideo
			videoId="rFKzKRu1_Yk"
			posterUrl={poster}
			priority
			title="Erklärvideo: Energieausweis online erstellen"
			caption="Erklärvideo: So läuft die Bestellung ab."
		>
			<p>{absatz}</p>
			<p>{absatz}</p>
		</TextWithVideo>
	</div>
</Story>

<Story name="Schmale Spalte — Video mittig darunter">
	<div class="prose @container w-[620px]">
		<TextWithVideo
			videoId="rFKzKRu1_Yk"
			posterUrl={poster}
			title="Erklärvideo: Energieausweis online erstellen"
			caption="Erklärvideo: So läuft die Bestellung ab."
		>
			<p>{absatz}</p>
		</TextWithVideo>
	</div>
</Story>

<Story name="Video allein — Vorschaubild, Player erst nach Klick">
	<div class="w-[520px]">
		<VideoEmbed
			videoId="rFKzKRu1_Yk"
			posterUrl={poster}
			title="Erklärvideo: Energieausweis online erstellen"
			caption="Erklärvideo: So läuft die Bestellung ab."
		/>
	</div>
</Story>

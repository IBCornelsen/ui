<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import TextWithVideo from "../lib/components/TextWithVideo.svelte";

	const { Story } = defineMeta({
		title: "UI/TextWithVideo",
		component: TextWithVideo,
		tags: ["autodocs"]
	});

	const absatz =
		"Sie wählen die Ausweisart, tragen die Gebäudedaten in ein geführtes Formular ein und erhalten den registrierten Energieausweis als PDF — geprüft von einem Diplom-Ingenieur. Welche Unterlagen Sie brauchen, wie lange es dauert und was nach dem Absenden passiert, steht weiter unten.";
</script>

<Story name="Video neben dem Fließtext">
	<div class="prose @container w-[1000px]">
		<TextWithVideo
			videoId="rFKzKRu1_Yk"
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
			title="Erklärvideo: Energieausweis online erstellen"
			caption="Erklärvideo: So läuft die Bestellung ab."
		>
			<p>{absatz}</p>
		</TextWithVideo>
	</div>
</Story>

<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Accordion from "../lib/components/Accordion.svelte";
	import FieldLabel from "../lib/components/FieldLabel.svelte";
	import Input from "../lib/components/Input.svelte";

	const { Story } = defineMeta({
		title: "UI/Accordion",
		tags: ["autodocs"]
	});
</script>

<Story name="Formular-Abschnitte">
	<div class="flex w-[560px] flex-col gap-4">
		<Accordion badge="A" title="Prüfung der Ausweisart" complete>
			<div class="flex flex-col gap-1">
				<FieldLabel title="Anlass" required />
				<Input name="anlass" placeholder="Verkauf" />
			</div>
		</Accordion>
		<Accordion badge="B" title="Gebäudeadresse" complete={false} open={false}>
			<p class="text-sm text-neutral-600">Zugeklappt — Körper bleibt gemountet.</p>
		</Accordion>
	</div>
</Story>

<Story name="Kurztitel auf schmalen Bildschirmen">
	<div class="flex w-[360px] flex-col gap-4">
		<Accordion
			badge="B"
			title="Eingabe der Gebäudeadresse - Angaben zu Wohnfläche, Keller und Dachgeschoss"
			titleKurz="Adresse & Flächen"
			complete={false}
		>
			<p class="text-sm text-neutral-600">
				Unter sm steht der Kurztitel, ab sm der volle Titel — die Langfassung liefe auf einem
				390px-Bildschirm über drei Zeilen.
			</p>
		</Accordion>
	</div>
</Story>

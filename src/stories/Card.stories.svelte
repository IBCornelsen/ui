<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Card from "../lib/components/Card.svelte";

	const { Story } = defineMeta({
		title: "UI/Card",
		component: Card,
		tags: ["autodocs"]
	});
</script>

<Story name="Größen">
	<div class="flex w-[560px] flex-col gap-4">
		<Card size="sm">
			<div class="h5">sm — rounded-lg, p-4</div>
			<p class="m-0 body-md">Für Kachelreihen: Schrittkarten, Kennzahlen, kurze Hinweise.</p>
		</Card>
		<Card size="md">
			<div class="h5">md — rounded-xl, p-5</div>
			<p class="m-0 body-md">Standard für erklärende Boxen im Fließtext.</p>
		</Card>
		<Card size="lg">
			<div class="h5">lg — rounded-2xl, p-6</div>
			<p class="m-0 body-md">Für Karten, die einen ganzen Abschnitt tragen.</p>
		</Card>
	</div>
</Story>

<Story name="Tonlagen">
	<div class="flex w-[560px] flex-col gap-4 bg-surface-page p-6">
		<Card tone="card">
			<div class="h5">card</div>
			<p class="m-0 body-md">Weiße Fläche — der Regelfall auf weißem wie grauem Grund.</p>
		</Card>
		<Card tone="subtle">
			<div class="h5">subtle</div>
			<p class="m-0 body-md">Gedeckte Fläche, wenn die Karte auf weißem Grund zurücktreten soll.</p>
		</Card>
	</div>
</Story>

<Story name="Als Link">
	<div class="w-[560px]">
		<Card href="/verbrauchsausweis">
			<div class="h5">Verbrauchsausweis</div>
			<p class="m-0 body-md">
				Mit <code class="code-inline">href</code> wird die Karte anklickbar und bekommt als einziges Kartenmuster
				eine Hover-Rückmeldung.
			</p>
		</Card>
	</div>
</Story>

<Story name="Kanten">
	<div class="flex w-[560px] flex-col gap-4 bg-surface-page p-6">
		<Card edge="content">
			<div class="h5">content — Inhaltsseiten</div>
			<p class="m-0 body-md">
				Sichtbare Kante in neutral-400, keine Erhebung: die Karte grenzt sich durch die Linie ab.
			</p>
		</Card>
		<Card edge="app">
			<div class="h5">app — eingeloggter Bereich</div>
			<p class="m-0 body-md">
				Weichere Kante in neutral-200 mit leichter Erhebung — EIN Randton für alle Panels von
				Dashboard, Ausstellerbereich und Bestellstrecke.
			</p>
		</Card>
	</div>
</Story>

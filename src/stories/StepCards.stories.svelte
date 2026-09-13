<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StepCards from "../lib/components/StepCards.svelte";

	const { Story } = defineMeta({
		title: "UI/StepCards",
		component: StepCards,
		tags: ["autodocs"]
	});

	const schritte = [
		{
			title: "Ausweisart wählen",
			text: "Der Check nimmt Ihnen die Entscheidung ab — oder Sie wählen direkt."
		},
		{
			title: "Gebäudedaten eingeben",
			text: "Geführtes Formular, nur die Angaben Ihrer Ausweisart."
		},
		{
			title: "Fachliche Prüfung",
			text: "Ein Diplom-Ingenieur prüft auf Plausibilität und fragt nach."
		},
		{
			title: "Ausweis erhalten",
			text: "Registriertes PDF per E-Mail, auf Wunsch gedruckt per Post."
		}
	];
</script>

<Story name="Vier Schritte">
	<div class="w-[900px]">
		<StepCards steps={schritte} />
	</div>
</Story>

<Story name="Drei Spalten">
	<div class="w-[760px]">
		<StepCards steps={schritte.slice(0, 3)} columns={3} />
	</div>
</Story>

<Story name="Schmaler Bildschirm">
	<div class="w-[360px]">
		<StepCards steps={schritte} />
	</div>
</Story>

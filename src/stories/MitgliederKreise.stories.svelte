<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import MitgliederKreise, {
		type MitgliederKreis
	} from "../lib/components/MitgliederKreise.svelte";

	const { Story } = defineMeta({
		title: "UI/MitgliederKreise",
		tags: ["autodocs"]
	});

	const MITGLIEDER: MitgliederKreis[] = [
		{ id: "1", name: "Anna Schmidt", initialen: "AS", farbe: "bg-primary-600" },
		{ id: "2", name: "Thomas Weber", initialen: "TW", farbe: "bg-secondary-500" },
		{ id: "3", name: "Petra Klein", initialen: "PK", farbe: "bg-success-500" },
		{ id: "4", name: "Michael Braun", initialen: "MB", farbe: "bg-info-500" },
		{ id: "5", name: "Ingo Cornelsen", initialen: "IC", farbe: "bg-warning-500" }
	];

	const MIT_EINLADUNG: MitgliederKreis[] = [
		...MITGLIEDER.slice(0, 2),
		{
			id: "einladung-1",
			name: "gast@beispiel.de",
			initialen: "G",
			farbe: "bg-neutral-400",
			ausstehend: true
		}
	];
</script>

<Story name="Stapel">
	<div class="flex flex-col gap-4">
		<MitgliederKreise mitglieder={MITGLIEDER.slice(0, 2)} />
		<MitgliederKreise mitglieder={MITGLIEDER} />
		<MitgliederKreise mitglieder={MITGLIEDER} max={2} />
	</div>
</Story>

<Story name="Groß">
	<MitgliederKreise mitglieder={MITGLIEDER} groesse="md" />
</Story>

<Story name="Mit offener Einladung">
	<MitgliederKreise mitglieder={MIT_EINLADUNG} groesse="md" />
</Story>

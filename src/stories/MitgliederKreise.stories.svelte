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

	// Datei-URLs statt Fremdhosts: Storybook läuft ohne Netz.
	const PORTRAIT =
		"data:image/svg+xml;utf8," +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#3f4f8f"/><circle cx="32" cy="24" r="12" fill="#f2f4fb"/><path d="M8 64c0-13 11-22 24-22s24 9 24 22z" fill="#f2f4fb"/></svg>'
		);

	const MIT_PORTRAIT: MitgliederKreis[] = [
		{ ...MITGLIEDER[0], bild: PORTRAIT },
		MITGLIEDER[1],
		{ ...MITGLIEDER[2], bild: PORTRAIT }
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

<Story name="Mit Porträtbild">
	<div class="flex flex-col gap-4">
		<MitgliederKreise mitglieder={MIT_PORTRAIT} />
		<MitgliederKreise mitglieder={MIT_PORTRAIT} groesse="md" />
	</div>
</Story>

<Story name="Mit offener Einladung">
	<MitgliederKreise mitglieder={MIT_EINLADUNG} groesse="md" />
</Story>

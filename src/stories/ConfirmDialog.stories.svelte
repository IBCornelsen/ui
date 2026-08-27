<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import ConfirmDialog from "../lib/components/ConfirmDialog.svelte";
	import Button from "../lib/components/Button.svelte";

	const { Story } = defineMeta({
		title: "UI/ConfirmDialog",
		tags: ["autodocs"]
	});
</script>

<script lang="ts">
	let offen = $state(false);
	let offenDestruktiv = $state(false);
	let ergebnis = $state("");
</script>

<Story name="Standard">
	<Button onclick={() => (offen = true)}>Schnellerfassung entsperren …</Button>
	<ConfirmDialog
		bind:offen
		title="Schnellerfassung entsperren?"
		message="Die unter „Gebäude zeichnen“ gemachten Änderungen werden verworfen und das Gebäude wird aus den Werten der Schnellerfassung neu aufgebaut."
		confirmLabel="Entsperren"
		onConfirm={() => (ergebnis = "bestätigt")}
	/>
	{#if ergebnis}<p class="mt-3 text-sm text-neutral-600">Aktion: {ergebnis}</p>{/if}
</Story>

<Story name="Destruktiv">
	<Button onclick={() => (offenDestruktiv = true)}>Ausweis stornieren …</Button>
	<ConfirmDialog
		bind:offen={offenDestruktiv}
		ton="destruktiv"
		title="Ausweis stornieren?"
		message="Der Vorgang wird als storniert markiert und der Kunde erhält keine Dokumente. Das lässt sich nicht rückgängig machen."
		confirmLabel="Stornieren"
		onConfirm={() => (ergebnis = "storniert")}
	/>
</Story>

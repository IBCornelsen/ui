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
	let eigenesLabelOffen = $state(false);
	let zuletzt = $state("—");
</script>

<Story name="Standard">
	<Button onclick={() => (offen = true)}>Zeichnen aktivieren</Button>
	<p class="mt-3 text-sm text-neutral-600">Zuletzt: {zuletzt}</p>
	<ConfirmDialog
		bind:offen
		title="Zeichnen wieder aktivieren?"
		message="Sollten Sie manuelle Änderungen an den Hüllflächen durchgeführt haben, werden diese überschrieben."
		confirmLabel="Zeichnen aktivieren"
		onConfirm={() => (zuletzt = "bestätigt")}
		onCancel={() => (zuletzt = "abgebrochen")}
	/>
</Story>

<Story name="Eigenes Abbrechen-Label">
	<Button onclick={() => (eigenesLabelOffen = true)}>Schnellerfassung entsperren</Button>
	<ConfirmDialog
		bind:offen={eigenesLabelOffen}
		title="Schnellerfassung entsperren?"
		message="Die unter „Gebäude zeichnen“ gemachten Änderungen werden verworfen und das Gebäude wird aus den Werten der Schnellerfassung neu aufgebaut."
		confirmLabel="Entsperren"
		cancelLabel="Doch nicht"
		onConfirm={() => {}}
	/>
</Story>

<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Modal from "../lib/components/Modal.svelte";
	import Button from "../lib/components/Button.svelte";

	const { Story } = defineMeta({
		title: "UI/Modal",
		tags: ["autodocs"]
	});
</script>

<script lang="ts">
	let hidden = $state(true);
	let breitHidden = $state(true);
	let inhaltHidden = $state(true);
	let vollHidden = $state(true);
</script>

<Story name="Standard">
	<Button onclick={() => (hidden = false)}>Modal öffnen</Button>
	<Modal
		bind:hidden
		title="Entwurf gefunden"
		options={[
			{ title: "Fortsetzen", variant: "primary", action: () => true },
			{ title: "Neu beginnen", variant: "outline", action: () => true },
			{ title: "Abbrechen", variant: "ghost", action: () => true }
		]}
	>
		<p class="text-sm leading-relaxed text-neutral-600">
			Es existiert bereits ein gespeicherter Entwurf. Möchten Sie ihn weiterbearbeiten?
		</p>
	</Modal>
</Story>

<Story name="Breit (Editor-Dialog)">
	<Button onclick={() => (breitHidden = false)}>Breites Modal öffnen</Button>
	<Modal bind:hidden={breitHidden} title="Bauteilaufbau definieren" size="breit" randlos>
		{#snippet kopfZusatz()}
			<p class="text-[11px] text-neutral-600">Außenwand · EG Nord</p>
		{/snippet}
		<div class="min-h-0 flex-1 overflow-y-auto p-4">
			<div class="grid grid-cols-2 gap-2">
				{#each ["Mauerwerk + WDVS", "Beton + Kerndämmung", "Holzständer", "Altbau ungedämmt"] as vorlage (vorlage)}
					<div class="rounded-lg border border-neutral-200 p-3 text-sm">{vorlage}</div>
				{/each}
			</div>
		</div>
		{#snippet fusszeile()}
			<Button variant="outline" size="sm" onclick={() => (breitHidden = true)}>Abbrechen</Button>
			<Button size="sm" onclick={() => (breitHidden = true)}>Übernehmen</Button>
		{/snippet}
	</Modal>
</Story>

<!-- size="inhalt": der Dialog ist so breit wie sein Inhalt (Seiten-/Bildvorschau),
     begrenzt auf den Bildschirm. -->
<Story name="Inhaltsbreit (Vorschau)">
	<Button onclick={() => (inhaltHidden = false)}>Inhaltsbreites Modal öffnen</Button>
	<Modal bind:hidden={inhaltHidden} title="Energieausweis" size="inhalt" randlos>
		{#snippet kopfZusatz()}
			<p class="text-[11px] text-neutral-600">Vorschau — Dialogbreite folgt der Seite.</p>
		{/snippet}
		<div class="flex max-w-full items-center justify-center bg-neutral-100 p-4">
			<div
				class="flex h-[480px] w-[340px] items-center justify-center rounded border border-neutral-300 bg-white text-sm text-neutral-500"
			>
				Seite 1
			</div>
		</div>
		{#snippet fusszeile()}
			<Button variant="outline" size="sm" onclick={() => (inhaltHidden = true)}>Schließen</Button>
		{/snippet}
	</Modal>
</Story>

<!-- vollflaeche: maximale Nutzfläche für PDF-/Bildvorschauen — minimaler Rand
     zur Bildschirmkante, kompakte Kopf- und Fußzeile. -->
<Story name="Vollfläche (PDF-Vorschau)">
	<Button onclick={() => (vollHidden = false)}>Vollflächen-Modal öffnen</Button>
	<Modal bind:hidden={vollHidden} title="Energieausweis" size="inhalt" randlos vollflaeche>
		{#snippet kopfZusatz()}
			<p class="text-[11px] text-neutral-600">Vorschau — nutzt fast die volle Bildschirmhöhe.</p>
		{/snippet}
		<div class="flex max-w-full items-center justify-center bg-neutral-100 p-1.5">
			<div
				class="flex h-[80dvh] w-[500px] items-center justify-center rounded border border-neutral-300 bg-white text-sm text-neutral-500"
			>
				Seite 1
			</div>
		</div>
		{#snippet fusszeile()}
			<Button variant="outline" size="sm" onclick={() => (vollHidden = true)}>Schließen</Button>
		{/snippet}
	</Modal>
</Story>

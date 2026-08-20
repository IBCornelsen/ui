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

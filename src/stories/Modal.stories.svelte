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

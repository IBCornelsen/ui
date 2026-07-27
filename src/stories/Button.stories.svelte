<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Button from "../lib/components/Button.svelte";

	// No `component:` — these stories render custom markup. Setting `component` makes
	// addon-svelte-csf wrap the Story content inside an auto-rendered instance (nested button).
	const { Story } = defineMeta({
		title: "UI/Button",
		tags: ["autodocs"]
	});
</script>

<Story name="Primär">
	<Button variant="primary">Speichern &amp; weiter</Button>
</Story>

<Story name="Sekundär">
	<Button variant="secondary">Bestellen</Button>
</Story>

<Story name="Outline">
	<Button variant="outline">Entwurf</Button>
</Story>

<Story name="Ghost">
	<Button variant="ghost">Hilfe</Button>
</Story>

<Story name="Danger">
	<Button variant="danger">Löschen</Button>
</Story>

<Story name="Deaktiviert">
	<Button variant="primary" disabled>Speichern</Button>
</Story>

<Story name="Größen">
	<div class="flex items-center gap-3">
		<Button size="xs">Winzig</Button>
		<Button size="sm">Klein</Button>
		<Button size="md">Mittel</Button>
		<Button size="lg">Groß</Button>
	</div>
</Story>

<Story name="Alle Varianten">
	<div class="flex flex-wrap gap-3">
		<Button variant="primary">Primär</Button>
		<Button variant="secondary">Sekundär</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="danger">Danger</Button>
	</div>
</Story>

<Story name="Als Link">
	<div class="flex gap-3">
		<Button href="#ziel">Primär-Link</Button>
		<Button variant="outline" size="sm" href="#ziel">Outline-Link</Button>
	</div>
</Story>

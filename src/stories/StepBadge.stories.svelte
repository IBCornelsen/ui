<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StepBadge from "../lib/components/StepBadge.svelte";
	import Button from "../lib/components/Button.svelte";

	const { Story } = defineMeta({
		title: "UI/StepBadge",
		tags: ["autodocs"]
	});
</script>

<Story name="Größen">
	<div class="flex items-center gap-3">
		<StepBadge step={1} />
		<StepBadge step={2} />
		<StepBadge step={3} size="sm" />
	</div>
</Story>

<Story name="Vor der Schritt-Überschrift">
	<div class="flex items-center gap-3">
		<StepBadge step={2} />
		<h2 class="text-xl leading-snug font-semibold text-primary-900">Verbrauch & Warmwasser</h2>
	</div>
</Story>

<Story name="In der Schritt-Navigation">
	<div class="flex gap-3">
		<Button variant="outline">
			Zurück zu
			<StepBadge step={1} size="sm" />
			Ausweisart & Adresse
		</Button>
		<Button variant="outline">
			Weiter zu
			<StepBadge step={3} size="sm" />
			Lüftung & Heizung
		</Button>
	</div>
</Story>

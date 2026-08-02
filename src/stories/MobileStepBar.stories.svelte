<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import MobileStepBar from "../lib/components/MobileStepBar.svelte";
	import StepMenuBadge from "../lib/components/StepMenuBadge.svelte";
	import Button from "../lib/components/Button.svelte";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
	import type { WorkflowStepStatus } from "../lib/components/WorkflowNav.svelte";

	const { Story } = defineMeta({
		title: "UI/MobileStepBar",
		tags: ["autodocs"]
	});

	const STEPS = [
		"Ausweisart & Adresse",
		"Gebäudedaten",
		"Verbrauch & Warmwasser",
		"Lüftung & Heizung",
		"Abschluss"
	];
	const STATUS: WorkflowStepStatus[] = ["complete", "complete", "open", "blocked", "open"];
</script>

<script lang="ts">
	let active = $state(2);
</script>

{#snippet menu()}
	<StepMenuBadge
		label="Workflow"
		steps={STEPS}
		{active}
		status={STATUS}
		onSelect={(index) => (active = index)}
	/>
{/snippet}

{#snippet bestellen()}
	<Button class="w-full" onclick={() => console.log("bestellen")}>
		Kostenpflichtig bestellen
		<CaretRightIcon size={16} weight="bold" />
	</Button>
{/snippet}

<!-- Die Leiste ist position:fixed und nur unter lg sichtbar — Storybook-Viewport
     auf ein Mobilformat stellen. -->
<Story name="Zwischenschritt">
	<p class="text-sm text-neutral-700">Schritt {active + 1}/{STEPS.length}: {STEPS[active]}</p>
	<div class="h-20"></div>
	<MobileStepBar
		onPrev={() => (active = active - 1)}
		onNext={() => (active = active + 1)}
		prevDisabled={active <= 0}
		nextDisabled={active >= STEPS.length - 1}
		{menu}
	/>
</Story>

<Story name="Letzter Schritt mit Abschluss-Aktion">
	<p class="text-sm text-neutral-700">
		Die Abschluss-Aktion steht fest über den Kreisen und bleibt beim Scrollen sichtbar.
	</p>
	<div class="h-36"></div>
	<MobileStepBar
		onPrev={() => console.log("zurück")}
		onNext={() => console.log("weiter")}
		nextDisabled
		{menu}
		abschlussAktion={bestellen}
	/>
</Story>

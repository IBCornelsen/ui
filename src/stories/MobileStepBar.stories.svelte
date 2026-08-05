<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import MobileStepBar from "../lib/components/MobileStepBar.svelte";
	import StepMenuBadge from "../lib/components/StepMenuBadge.svelte";
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

<!-- Die Leiste ist position:fixed und in JEDER Breite sichtbar; auf breiten
     Viewports sitzen die Kreise an den Kanten des 1920er-Inhaltsrasters. -->
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

<Story name="Letzter Schritt">
	<p class="text-sm text-neutral-700">
		Im letzten Schritt trägt die Leiste keine Abschluss-Aktion mehr — der weiter-Kreis öffnet die
		rechte Karte des Hosts, in der Bestellung, Entwurf und Hilfe stehen.
	</p>
	<div class="h-20"></div>
	<MobileStepBar
		onPrev={() => console.log("zurück")}
		onNext={() => console.log("rechte Karte öffnen")}
		{menu}
		nextLabel="Abschluss öffnen"
	/>
</Story>

<Story name="Letzter Schritt mit offener Karte">
	<p class="text-sm text-neutral-700">
		Ist die rechte Karte schon aufgeklappt (ab xl), gibt es nichts mehr zu öffnen — der Host
		deaktiviert den weiter-Kreis.
	</p>
	<div class="h-20"></div>
	<MobileStepBar
		onPrev={() => console.log("zurück")}
		onNext={() => {}}
		nextDisabled
		{menu}
		nextLabel="Letzter Schritt"
	/>
</Story>

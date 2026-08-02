<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StepMenuBadge from "../lib/components/StepMenuBadge.svelte";
	import StepBadge from "../lib/components/StepBadge.svelte";
	import type { WorkflowStepStatus } from "../lib/components/WorkflowNav.svelte";

	const { Story } = defineMeta({
		title: "UI/StepMenuBadge",
		tags: ["autodocs"]
	});

	const steps = [
		"Ausweisart & Adresse",
		"Gebäudedaten",
		"Verbrauch & Warmwasser",
		"Lüftung & Heizung",
		"Abschluss"
	];
	const status: WorkflowStepStatus[] = ["complete", "complete", "open", "blocked", "open"];
</script>

<Story name="Neben der Schritt-Überschrift">
	<div class="flex items-center gap-3">
		<StepBadge step={3} />
		<h2 class="text-xl leading-snug font-semibold text-primary-900">Verbrauch & Warmwasser</h2>
		<div class="ml-auto">
			<StepMenuBadge
				label="Workflow"
				{steps}
				active={2}
				{status}
				onSelect={(index) => console.log("Schritt", index + 1)}
			/>
		</div>
	</div>
	<p class="mt-4 text-sm text-neutral-600">
		Der Kreis zeigt „aktuell/gesamt" und klappt die Schrittliste mit Status auf — Ersatz für die
		unter lg ausgeblendete Workflow-Spalte.
	</p>
</Story>

<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StepMenuBadge from "../lib/components/StepMenuBadge.svelte";
	import StepBadge from "../lib/components/StepBadge.svelte";
	import type { WorkflowStepStatus } from "../lib/components/WorkflowNav.svelte";

	const { Story } = defineMeta({
		title: "UI/StepMenuBadge",
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

<Story name="Neben der Schritt-Überschrift">
	<div class="flex items-center gap-3">
		<StepBadge step={active + 1} />
		<h2 class="text-xl leading-snug font-semibold text-primary-900">{STEPS[active]}</h2>
		<div class="ml-auto">
			<StepMenuBadge
				label="Workflow"
				steps={STEPS}
				{active}
				status={STATUS}
				onSelect={(index) => (active = index)}
			/>
		</div>
	</div>
	<p class="mt-4 text-sm text-neutral-600">
		Der Kreis zeigt „aktuell/gesamt" und klappt die Schrittliste mit Status auf — Ersatz für die
		unter lg ausgeblendete Workflow-Spalte. Escape oder Klick daneben schließt das Menü.
	</p>
</Story>

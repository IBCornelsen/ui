<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import SummaryCard from "../lib/components/SummaryCard/SummaryCard.svelte";
	import SummaryCardAnleitungDemo from "./SummaryCardAnleitungDemo.svelte";
	import type { StepInfo } from "../lib/components/SummaryCard/types";
	import type { EnergyScaleClass } from "../lib/components/EnergyScale/types";

	const { Story } = defineMeta({
		title: "UI/SummaryCard",
		tags: ["autodocs"]
	});

	// GEG residential class bands in kWh/(m²·a) — H is nearly twice as wide as A+.
	const classes: EnergyScaleClass[] = [
		{ label: "A+", size: 30, color: "var(--color-energy-aplus)" },
		{ label: "A", size: 20, color: "var(--color-energy-a)" },
		{ label: "B", size: 25, color: "var(--color-energy-b)" },
		{ label: "C", size: 25, color: "var(--color-energy-c)" },
		{ label: "D", size: 30, color: "var(--color-energy-d)" },
		{ label: "E", size: 30, color: "var(--color-energy-e)" },
		{ label: "F", size: 40, color: "var(--color-energy-f)" },
		{ label: "G", size: 50, color: "var(--color-energy-g)" },
		{ label: "H", size: 50, color: "var(--color-energy-h)" }
	];

	const scale = {
		classes,
		markers: [
			{ value: 90, position: "top" as const },
			{ value: 140, position: "bottom" as const }
		]
	};

	const steps: StepInfo[] = [
		{ label: "Ausweisart", state: "done", severity: "none", messages: [] },
		{ label: "Gebäudedaten", state: "done", severity: "none", messages: [] },
		{
			label: "Verbrauchsdaten",
			state: "current",
			severity: "warning",
			messages: [
				{
					id: "vd-1",
					severity: "warning",
					html: "Ein Abrechnungszeitraum fehlt.",
					dismissible: false
				}
			]
		},
		{ label: "Dokumente", state: "upcoming", severity: "none", messages: [] },
		{ label: "Prüfung", state: "upcoming", severity: "none", messages: [] },
		{ label: "Zahlung", state: "upcoming", severity: "none", messages: [] }
	];
</script>

<Story name="Standard">
	<div class="flex min-h-screen justify-center bg-[#fafafa] p-6">
		<div class="w-[380px] px-3">
			<SummaryCard produkt="Verbrauchsausweis Wohngebäude" preis={79} {steps} {scale} />
		</div>
	</div>
</Story>

<Story name="Eingebettet (cad)">
	<div class="flex min-h-screen justify-center bg-[#fafafa] p-6">
		<div class="w-[380px] px-3">
			<SummaryCard produkt="Bedarfsausweis Wohngebäude" preis={99} {steps} {scale} embedded />
		</div>
	</div>
</Story>

<!-- Embedded SummaryCard + contextual Anleitung beside a form (cad RightPanel layout). -->
<Story name="Mit Anleitung neben Formular">
	<SummaryCardAnleitungDemo />
</Story>

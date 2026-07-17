<script lang="ts">
	import Anleitung from "../lib/components/Anleitung/Anleitung.svelte";
	import { anleitung, type AnleitungInstruction } from "../lib/components/Anleitung/anleitung";
	import SummaryCard from "../lib/components/SummaryCard/SummaryCard.svelte";
	import Field from "../lib/components/Field.svelte";
	import Input from "../lib/components/Input.svelte";
	import Select from "../lib/components/Select.svelte";
	import type { EnergyScaleClass } from "../lib/components/EnergyScale/types";

	// GEG residential class bands — supplied by the caller so the card stays domain-free.
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
	const scale = { classes, markers: [{ value: 90, position: "top" as const }] };

	// Focused/hovered field feeds its guidance into the embedded Anleitung.
	let active = $state<AnleitungInstruction | null>(null);
	const setActive = (instruction: AnleitungInstruction) => (active = instruction);
</script>

<div class="flex gap-4 bg-[#fafafa] p-6">
	<!-- Form -->
	<form class="flex w-[360px] flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
		<div
			use:anleitung={{
				title: "Anlass",
				description: "Grund der Ausstellung wählen (z. B. Verkauf, Vermietung, Modernisierung). Bestimmt die Ausweisart nach dem GEG.",
				importance: "required",
				norm: {
					ref: "GEG §80",
					quote:
						"Energieausweise werden als Energiebedarfs- oder Energieverbrauchsausweis ausgestellt."
				},
				onFocus: setActive
			}}
		>
			<Field label="Anlass" required>
				<Select>
					<option>Verkauf</option>
					<option>Vermietung</option>
					<option>Modernisierung</option>
				</Select>
			</Field>
		</div>

		<div
			use:anleitung={{
				title: "Wohnfläche",
				description: "Wohnfläche nach Wohnflächenverordnung eintragen. Vertraute Bezugsgröße; dient der Plausibilitätsprüfung.",
				importance: "required",
				onFocus: setActive
			}}
		>
			<Field label="Wohnfläche (m²)" required>
				<Input type="number" placeholder="z. B. 140" />
			</Field>
		</div>

		<div
			use:anleitung={{
				title: "Nutzfläche A_NGF",
				description: "Nutzfläche eintragen. Leer lassen = automatisch aus dem Volumen geschätzt (0,32 · Vₑ). Bezugsfläche der Bilanz.",
				importance: "required",
				norm: {
					ref: "DIN V 18599-1, 8.2.1",
					quote: "Als Bezugsfläche wird die Nettogrundfläche A_NGF verwendet."
				},
				onFocus: setActive
			}}
		>
			<Field label="Nutzfläche A_NGF (m²)">
				<Input type="number" placeholder="automatisch" />
			</Field>
		</div>

		<div
			use:anleitung={{
				title: "Gebäudebild",
				description: "Optional ein Foto hochladen. Nur Dokumentation, keine Rechenwirkung.",
				importance: "optional",
				onFocus: setActive
			}}
		>
			<Field label="Gebäudebild" hint="Optional">
				<Input type="file" />
			</Field>
		</div>
	</form>

	<!-- Embedded SummaryCard: the Anleitung sits between the scale and the action buttons -->
	<div class="w-[380px] shrink-0 px-3">
		<SummaryCard produkt="Verbrauchsausweis Wohngebäude" preis={79} {scale} embedded>
			{#snippet anleitung()}
				<Anleitung {active} />
			{/snippet}
		</SummaryCard>
	</div>
</div>

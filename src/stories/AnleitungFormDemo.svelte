<script lang="ts">
	import Anleitung from "../lib/components/Anleitung/Anleitung.svelte";
	import { anleitung, type AnleitungInstruction } from "../lib/components/Anleitung/anleitung";
	import Field from "../lib/components/Field.svelte";
	import Input from "../lib/components/Input.svelte";
	import Select from "../lib/components/Select.svelte";

	// The focused/hovered input reports its guidance; the panel shows it and keeps
	// it until another field takes over.
	let active = $state<AnleitungInstruction | null>(null);
	const setActive = (instruction: AnleitungInstruction) => (active = instruction);
</script>

<div class="flex gap-4">
	<!-- use:anleitung on the wrapper reports the guidance of the control inside (events bubble) -->
	<form class="flex w-[360px] flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
		<div
			use:anleitung={{
				title: "Anlass",
				description:
					"Grund der Ausstellung wählen (z. B. Verkauf, Vermietung, Modernisierung). Bestimmt die Ausweisart nach dem GEG.",
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
				title: "Gebäudetyp",
				description:
					"Wohngebäudetyp wählen (z. B. Ein- oder Mehrfamilienhaus). Legt das Nutzungsprofil fest: 20 °C, Warmwasser- und Luftbedarf.",
				importance: "required",
				onFocus: setActive
			}}
		>
			<Field label="Gebäudetyp" required>
				<Select>
					<option>Einfamilienhaus</option>
					<option>Mehrfamilienhaus</option>
				</Select>
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

	<div class="h-[560px] w-[380px] overflow-hidden rounded-2xl border border-neutral-200">
		<Anleitung {active} />
	</div>
</div>

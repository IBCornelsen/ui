<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StatusKreis from "../lib/components/StatusKreis.svelte";
	import StepBadge from "../lib/components/StepBadge.svelte";

	const { Story } = defineMeta({
		title: "UI/StatusKreis",
		tags: ["autodocs"]
	});
</script>

<Story name="Zustände">
	<div class="flex items-center gap-3">
		<StatusKreis status="complete" />
		<StatusKreis status="fehlt" />
		<StatusKreis status="complete" size="md" />
		<StatusKreis status="fehlt" size="md" />
	</div>
</Story>

<!-- Am Schritttitel: der Nummernkreis bleibt links die Zahl, der Status steht
     RECHTS neben der Überschrift (Jens 2026-08-10). -->
<Story name="Am Schritttitel">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-3">
			<StepBadge step={2} />
			<h2 class="text-xl leading-snug font-semibold text-primary-900">Verbrauch & Warmwasser</h2>
			<StatusKreis status="complete" size="md" />
		</div>
		<div class="flex items-center gap-3">
			<StepBadge step={3} />
			<h2 class="text-xl leading-snug font-semibold text-primary-900">Lüftung & Heizung</h2>
			<StatusKreis status="fehlt" size="md" />
		</div>
	</div>
</Story>

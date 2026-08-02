<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StepNavigation from "../lib/components/StepNavigation.svelte";
	import Button from "../lib/components/Button.svelte";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	const { Story } = defineMeta({
		title: "UI/StepNavigation",
		tags: ["autodocs"]
	});

	const STEPS = [
		"Ausweisart & Adresse",
		"Gebäudedaten",
		"Verbrauch & Warmwasser",
		"Lüftung & Heizung",
		"Abschluss"
	];
</script>

<script lang="ts">
	let active = $state(1);
</script>

{#snippet bestellen()}
	<Button class="w-full sm:w-auto" onclick={() => console.log("bestellen")}>
		Kostenpflichtig bestellen
		<CaretRightIcon size={16} weight="bold" />
	</Button>
{/snippet}

<Story name="Zwischenschritt">
	<p class="text-sm text-neutral-700">Schritt {active + 1}/{STEPS.length}: {STEPS[active]}</p>
	<StepNavigation
		steps={STEPS}
		{active}
		onGoto={(index) => (active = index)}
		abschlussAktion={bestellen}
	/>
	<p class="text-sm text-neutral-600">
		Unter lg ist die Leiste in den Zwischenschritten ausgeblendet — dort übernehmen die schwebenden
		Pfeil-Kreise; nur die Abschluss-Aktion des letzten Schritts bleibt stehen.
	</p>
</Story>

<Story name="Letzter Schritt (Abschluss-Aktion)">
	<StepNavigation
		steps={STEPS}
		active={STEPS.length - 1}
		onGoto={(index) => console.log("Schritt", index + 1)}
		abschlussAktion={bestellen}
	/>
</Story>

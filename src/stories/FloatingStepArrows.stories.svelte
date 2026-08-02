<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FloatingStepArrows from "../lib/components/FloatingStepArrows.svelte";

	const { Story } = defineMeta({
		title: "UI/FloatingStepArrows",
		tags: ["autodocs"]
	});
</script>

<script lang="ts">
	let step = $state(1);
</script>

<!-- The circles are position:fixed in the lower corners and only visible below the
     lg breakpoint — narrow the preview viewport to see them. -->
<Story name="Schrittwechsel">
	<p class="text-sm text-neutral-700">Aktueller Schritt: {step}/4</p>
	<p class="mt-2 text-sm text-neutral-600">
		Zurück liegt unten links, weiter unten rechts; an den Enden sind die Kreise ausgegraut.
	</p>
	<FloatingStepArrows
		onPrev={() => (step = step - 1)}
		onNext={() => (step = step + 1)}
		prevDisabled={step <= 1}
		nextDisabled={step >= 4}
	/>
</Story>

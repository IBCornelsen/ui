<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FloatingStepArrows from "../lib/components/FloatingStepArrows.svelte";

	const { Story } = defineMeta({
		title: "UI/FloatingStepArrows",
		tags: ["autodocs"]
	});
</script>

<!-- Die Kreise sind fixed am unteren rechten Rand und nur unter lg sichtbar —
     Storybook-Viewport auf ein Mobilformat stellen, um sie zu sehen. -->
<Story name="Beide aktiv">
	<FloatingStepArrows onPrev={() => console.log("zurück")} onNext={() => console.log("weiter")} />
	<p class="text-sm text-neutral-600">
		Schwebende Pfeil-Kreise für den Schrittwechsel unter lg (Viewport verkleinern).
	</p>
</Story>

<Story name="Erster Schritt (zurück gesperrt)">
	<FloatingStepArrows
		onPrev={() => console.log("zurück")}
		onNext={() => console.log("weiter")}
		prevDisabled
	/>
	<p class="text-sm text-neutral-600">Im ersten Schritt ist der linke Kreis ausgegraut.</p>
</Story>

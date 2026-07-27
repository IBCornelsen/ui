<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import WorkflowNav from "../lib/components/WorkflowNav.svelte";

	const { Story } = defineMeta({
		title: "UI/WorkflowNav",
		tags: ["autodocs"]
	});
</script>

<script lang="ts">
	let active = $state(1);
</script>

<Story name="Bestellstrecke">
	<div class="w-72 bg-neutral-50 p-4">
		<WorkflowNav
			label="Workflow"
			steps={[
				"Ausweisart & Adresse",
				"Verbrauch & Warmwasser",
				"Lüftung & Heizung",
				"Fenster, Dämmung & Vorschau"
			]}
			{active}
			status={["complete", "open", "blocked", "open"]}
			onSelect={(index) => (active = index)}
		/>
	</div>
</Story>

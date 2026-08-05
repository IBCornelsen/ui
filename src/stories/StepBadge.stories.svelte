<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StepBadge from "../lib/components/StepBadge.svelte";

	const { Story } = defineMeta({
		title: "UI/StepBadge",
		tags: ["autodocs"]
	});
</script>

<Story name="Größen">
	<div class="flex items-center gap-4">
		<StepBadge step={2} size="sm" />
		<StepBadge step={2} />
		<StepBadge step={12} />
	</div>
</Story>

<Story name="Vor einer Überschrift">
	<div class="flex items-center gap-3">
		<StepBadge step={5} />
		<h2 class="text-[21px] font-semibold tracking-tight text-neutral-900">Bauteilaufbauten</h2>
	</div>
</Story>

<Story name="Inline im Knopf">
	<button
		class="inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-600 hover:text-primary-700"
	>
		zu
		<StepBadge step={7} size="sm" />
		<span>Haustechnik konfigurieren</span>
	</button>
</Story>

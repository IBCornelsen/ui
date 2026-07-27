<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Accordion from "../lib/components/Accordion.svelte";
	import FieldLabel from "../lib/components/FieldLabel.svelte";
	import Input from "../lib/components/Input.svelte";

	const { Story } = defineMeta({
		title: "UI/Accordion",
		tags: ["autodocs"]
	});
</script>

<Story name="Formular-Abschnitte">
	<div class="flex w-[560px] flex-col gap-4">
		<Accordion badge="A" title="Prüfung der Ausweisart" complete>
			<div class="flex flex-col gap-1">
				<FieldLabel title="Anlass" required />
				<Input name="anlass" placeholder="Verkauf" />
			</div>
		</Accordion>
		<Accordion badge="B" title="Gebäudeadresse" complete={false} open={false}>
			<p class="text-sm text-neutral-600">Zugeklappt — Körper bleibt gemountet.</p>
		</Accordion>
	</div>
</Story>

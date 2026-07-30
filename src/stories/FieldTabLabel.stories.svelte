<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FieldTabLabel from "../lib/components/FieldTabLabel.svelte";

	const { Story } = defineMeta({
		title: "UI/FieldTabLabel",
		tags: ["autodocs"]
	});
</script>

<!-- Das Label sitzt absolut auf der Oberkante: der Elternknoten braucht `relative`. -->
<Story name="Standard">
	<div class="w-72 pt-6">
		<div class="relative">
			<FieldTabLabel title="Anlass *" />
			<select class="w-full rounded-sm ring-1 ring-black/15">
				<option>Vermietung/Verkauf</option>
				<option>Aushangpflicht</option>
			</select>
		</div>
	</div>
</Story>

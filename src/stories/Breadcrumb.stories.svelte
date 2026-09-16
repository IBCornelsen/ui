<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Breadcrumb from "../lib/components/Breadcrumb.svelte";

	const { Story } = defineMeta({
		title: "UI/Breadcrumb",
		component: Breadcrumb,
		tags: ["autodocs"]
	});
</script>

<Story name="Drei Stufen">
	<div class="w-[560px]">
		<Breadcrumb
			items={[
				{ label: "Start", href: "/" },
				{ label: "Verbrauchsausweis", href: "/verbrauchsausweis" },
				{ label: "Verbrauchsausweis Gewerbe", href: "/verbrauchsausweis/verbrauchsausweis-gewerbe" }
			]}
		/>
	</div>
</Story>

<Story name="Vier Stufen, umbrechend">
	<div class="w-[320px]">
		<Breadcrumb
			items={[
				{ label: "Start", href: "/" },
				{ label: "GEG 2024", href: "/geg" },
				{ label: "Energieausweis ab 2027", href: "/geg/gmodg-2027" },
				{
					label: "Verbrauchsausweis Gewerbe bis 2026",
					href: "/geg/gmodg-2027/verbrauchsausweis-gewerbe-bis-2026"
				}
			]}
		/>
	</div>
</Story>

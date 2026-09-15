<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import PortraitZuschnitt from "../lib/components/PortraitZuschnitt.svelte";
	import type { Ausschnitt } from "../lib/components/portraitAusschnitt";

	const { Story } = defineMeta({
		title: "UI/PortraitZuschnitt",
		tags: ["autodocs"]
	});

	// Querformat-Testbild ohne Fremdhost: Gesicht rechts der Mitte, damit das
	// Verschieben im Dialog etwas zu tun hat.
	const BILD =
		"data:image/svg+xml;utf8," +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#cfd8e6"/><circle cx="600" cy="230" r="120" fill="#f2c9a6"/><path d="M380 600c0-130 100-220 220-220s220 90 220 220z" fill="#3f4f8f"/><circle cx="560" cy="210" r="14" fill="#333"/><circle cx="640" cy="210" r="14" fill="#333"/></svg>'
		);
</script>

<script lang="ts">
	let letzterAusschnitt = $state<Ausschnitt | null>(null);
	let offen = $state(true);
</script>

<Story name="Dialog">
	<div class="flex flex-col gap-3">
		<button type="button" class="btn btn-outline w-fit" onclick={() => (offen = true)}>
			Zuschnitt öffnen
		</button>
		{#if letzterAusschnitt}
			<p class="text-sm text-neutral-700">
				Ausschnitt: x {Math.round(letzterAusschnitt.x)}, y {Math.round(letzterAusschnitt.y)}, Kante
				{Math.round(letzterAusschnitt.kante)} px
			</p>
		{/if}
		{#if offen}
			<PortraitZuschnitt
				bildUrl={BILD}
				onUebernehmen={(ausschnitt) => {
					letzterAusschnitt = ausschnitt;
					offen = false;
				}}
				onAbbrechen={() => (offen = false)}
			/>
		{/if}
	</div>
</Story>

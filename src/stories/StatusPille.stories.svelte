<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import StatusPille, { STATUS_PILLE_RAND } from "../lib/components/StatusPille.svelte";
	import { statusPilleFuer, type AusweisStatus } from "../lib/components/ausweisStatus";

	const { Story } = defineMeta({
		title: "UI/StatusPille",
		tags: ["autodocs"]
	});

	const LEBENSZYKLUS: AusweisStatus[] = [
		"Entwurf",
		"In Prüfung",
		"Gültig",
		"Abgelaufen",
		"Storniert"
	];
</script>

<Story name="Lebenszyklus">
	<div class="flex items-center gap-3">
		{#each LEBENSZYKLUS as status (status)}
			{@const pille = statusPilleFuer(status)}
			<StatusPille ton={pille.ton} label={pille.label} />
		{/each}
	</div>
</Story>

<Story name="Infobox mit passendem Rand">
	<div class="flex items-start gap-3">
		{#each LEBENSZYKLUS as status (status)}
			{@const pille = statusPilleFuer(status)}
			<div class="flex w-36 flex-col items-center gap-2">
				<StatusPille ton={pille.ton} label={pille.label} />
				<p
					class="w-full rounded-lg border-2 px-2 py-1.5 text-sm leading-snug text-neutral-600 {STATUS_PILLE_RAND[
						pille.ton
					]}"
				>
					Hinweistext zum Status.
				</p>
			</div>
		{/each}
	</div>
</Story>

<Story name="Handlungsbedarf">
	<div class="flex items-center gap-3">
		<StatusPille ton="error" label="Unterlagen fehlen" />
		<StatusPille ton="warning" label="Anforderung nicht erfüllt" />
		<StatusPille ton="neutral" label="Ohne Status" />
	</div>
</Story>

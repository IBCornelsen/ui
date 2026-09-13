<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import InfoCard from "../lib/components/InfoCard.svelte";
	import ShieldCheckIcon from "phosphor-svelte/lib/ShieldCheckIcon";
	import ClockIcon from "phosphor-svelte/lib/ClockIcon";
	import WarningCircleIcon from "phosphor-svelte/lib/WarningCircleIcon";

	const { Story } = defineMeta({
		title: "UI/InfoCard",
		component: InfoCard,
		tags: ["autodocs"]
	});
</script>

<Story name="Liste mit Icon">
	<div class="w-[640px]">
		<InfoCard
			icon={ShieldCheckIcon}
			title="Was das Gebäudeenergiegesetz vorschreibt"
			items={[
				"Fotopflicht: Für die Modernisierungsempfehlungen sind Fotos von Dach, Fenstern, Heizung und Außenwand erforderlich.",
				"Die Primärenergiefaktoren stehen direkt im Gesetz (§ 22 GEG).",
				"Jeder Ausweis erhält eine Registriernummer beim DIBt."
			]}
		/>
	</div>
</Story>

<Story name="Freier Inhalt">
	<div class="w-[420px]">
		<InfoCard icon={ClockIcon} title="Wie lange dauert es?">
			<p class="m-0">
				Ausfüllen dauert beim Verbrauchsausweis meist 10 bis 20 Minuten. Sind die Angaben
				vollständig, geht der Ausweis in der Regel am nächsten Werktag heraus.
			</p>
		</InfoCard>
	</div>
</Story>

<Story name="Warnton">
	<div class="w-[640px]">
		<InfoCard
			icon={WarningCircleIcon}
			iconTone="warning"
			title="Häufige Stolpersteine bei der Eingabe"
			items={[
				"Wohnfläche statt beheizter Fläche: Gefragt ist die beheizte Fläche.",
				"Warmwasser vergessen: Wird es über die Heizung erzeugt, gehört der Anteil dazu."
			]}
		/>
	</div>
</Story>

<Story name="Ohne Icon, gedeckte Fläche">
	<div class="w-[420px]">
		<InfoCard
			title="Für den Bedarfsausweis"
			tone="subtle"
			items={[
				"Angaben zu Wandaufbau, Dach, Fenstern, Keller und Heizung",
				"Baupläne helfen — es gibt sie oft in der Bauakte beim Bauamt",
				"Fehlende Werte setzen wir normgerecht an"
			]}
		/>
	</div>
</Story>

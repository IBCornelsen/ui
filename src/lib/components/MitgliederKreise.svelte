<script lang="ts" module>
	// Überlappender Kreis-Stapel für Beteiligte. Die Avatarfarbe kommt als
	// fertige Tailwind-bg-Utility mit, damit dieselbe Person überall gleich aussieht.
	export type MitgliederKreis = {
		id: string;
		name: string;
		initialen: string;
		farbe: string;
		// Offene Einladung: gedämpfter, gestrichelter Kreis statt Avatarfarbe.
		ausstehend?: boolean;
	};
</script>

<script lang="ts">
	interface Props {
		mitglieder: MitgliederKreis[];
		max?: number;
		groesse?: "sm" | "md";
	}

	const { mitglieder, max = 4, groesse = "sm" }: Props = $props();

	const GROESSE_KLASSEN: Record<"sm" | "md", string> = {
		sm: "h-7 w-7 text-xs",
		md: "h-9 w-9 text-sm"
	};

	const sichtbare = $derived(mitglieder.slice(0, max));
	const weitere = $derived(mitglieder.length - sichtbare.length);

	function kreisKlassen(mitglied: MitgliederKreis): string {
		if (mitglied.ausstehend) {
			return "border-dashed border-neutral-400 bg-white text-neutral-500";
		}
		return `border-white text-white ${mitglied.farbe}`;
	}

	function kreisTitel(mitglied: MitgliederKreis): string {
		if (mitglied.ausstehend) return `${mitglied.name} — Einladung offen`;
		return mitglied.name;
	}
</script>

{#if mitglieder.length > 0}
	<div class="flex -space-x-2">
		{#each sichtbare as mitglied (mitglied.id)}
			<span
				class="flex shrink-0 items-center justify-center rounded-full border-2 font-semibold {GROESSE_KLASSEN[
					groesse
				]} {kreisKlassen(mitglied)}"
				title={kreisTitel(mitglied)}
			>
				{mitglied.initialen}
			</span>
		{/each}
		{#if weitere > 0}
			<span
				class="flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-neutral-200 font-semibold text-neutral-600 {GROESSE_KLASSEN[
					groesse
				]}"
				title="{weitere} weitere"
			>
				+{weitere}
			</span>
		{/if}
	</div>
{/if}

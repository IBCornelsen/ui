<script lang="ts">
	// Gruppen-Zwischenüberschrift innerhalb eines Abschnitts (Bestellstrecken):
	// dezente Uppercase-Zeile linksbündig — EIN Muster für alle Strecken.
	let { text, first = false }: { text: string; first?: boolean } = $props();
</script>

<p
	class="mb-1.5 text-[10px] font-semibold tracking-wide text-neutral-600 uppercase"
	class:mt-4={!first}
	class:mt-0={first}
>
	{text}
</p>

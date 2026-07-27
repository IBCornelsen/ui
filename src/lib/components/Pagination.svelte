<script lang="ts">
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Link-basierte Seitenblätterung: „x von y" mit Vor/Zurück-Pfeilen.
	interface Props {
		pages: number;
		current: number;
		next: string;
		prev: string;
	}

	let { pages, current, next, prev }: Props = $props();
</script>

<div class="my-4 flex items-center justify-center gap-2">
	<a
		href={prev}
		aria-label="Vorherige Seite"
		class="flex rounded-lg p-2 hover:bg-neutral-200"
		class:pointer-events-none={current === 1}
		class:text-neutral-500={current === 1}
	>
		<CaretLeftIcon />
	</a>
	<p>{current} von {pages}</p>
	<a
		href={next}
		aria-label="Nächste Seite"
		class="flex rounded-lg p-2 hover:bg-neutral-200"
		class:pointer-events-none={current === pages}
		class:text-neutral-500={current === pages}
	>
		<CaretRightIcon />
	</a>
</div>

<script lang="ts">
	import CaretLeftIcon from "phosphor-svelte/lib/CaretLeftIcon";
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";
	import XIcon from "phosphor-svelte/lib/XIcon";
	import type { GalerieBild } from "./types";

	// Full-screen image viewer: one image at a time, arrows/keyboard to step
	// through the list, thumbnail strip to jump. Mount once, open by setting
	// `offen` (and `index` for the start image).
	interface Props {
		bilder: GalerieBild[];
		offen?: boolean;
		index?: number;
		// Accessible name of the dialog (e.g. the building address).
		titel?: string;
	}

	let {
		bilder,
		offen = $bindable(false),
		index = $bindable(0),
		titel = "Bilder"
	}: Props = $props();

	const aktuell = $derived(bilder[index]);
	const hatMehrere = $derived(bilder.length > 1);

	let dialogEl = $state<HTMLDivElement>();
	let schliessenEl = $state<HTMLButtonElement>();

	function schliessen(): void {
		offen = false;
	}

	function blaettern(richtung: 1 | -1): void {
		if (!hatMehrere) return;
		index = (index + richtung + bilder.length) % bilder.length;
	}

	function onKeydown(event: KeyboardEvent): void {
		if (!offen) return;
		if (event.key === "Escape") schliessen();
		if (event.key === "ArrowRight") blaettern(1);
		if (event.key === "ArrowLeft") blaettern(-1);
	}

	function onBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) schliessen();
	}

	// Lock background scrolling and move focus into the dialog while open.
	$effect(() => {
		if (!offen) return;
		document.body.style.overflow = "hidden";
		const vorher = document.activeElement;
		schliessenEl?.focus();
		return () => {
			document.body.style.overflow = "";
			if (vorher instanceof HTMLElement) vorher.focus();
		};
	});

	// Keep the index inside the list when the images change while open.
	$effect(() => {
		if (bilder.length === 0) return;
		if (index >= bilder.length) index = bilder.length - 1;
		if (index < 0) index = 0;
	});

	const KNOPF =
		"flex cursor-pointer items-center justify-center rounded-full bg-neutral-900/70 text-white shadow-md transition-colors hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-white";
</script>

<svelte:window onkeydown={onKeydown} />

{#if offen && aktuell}
	<div
		class="fixed inset-0 z-[170] flex flex-col bg-black/90"
		role="presentation"
		onclick={onBackdropClick}
	>
		<div
			bind:this={dialogEl}
			role="dialog"
			aria-modal="true"
			aria-label={titel}
			class="flex min-h-0 flex-1 flex-col"
		>
			<!-- Header: counter and close -->
			<div class="flex items-center justify-between px-4 py-3 text-sm text-white/80">
				<span class="tabular-nums">
					{index + 1} / {bilder.length}
					{#if titel !== "Bilder"}<span class="ml-2 text-white/60">{titel}</span>{/if}
				</span>
				<button
					type="button"
					bind:this={schliessenEl}
					onclick={schliessen}
					aria-label="Bilderansicht schließen"
					class="{KNOPF} h-9 w-9"
				>
					<XIcon size={18} weight="bold" />
				</button>
			</div>

			<!-- Image stage: click on the backdrop closes, arrows step through -->
			<div
				class="relative flex min-h-0 flex-1 items-center justify-center px-16"
				role="presentation"
				onclick={onBackdropClick}
			>
				{#if hatMehrere}
					<button
						type="button"
						onclick={() => blaettern(-1)}
						aria-label="Vorheriges Bild"
						class="{KNOPF} absolute left-4 h-11 w-11"
					>
						<CaretLeftIcon size={22} weight="bold" />
					</button>
				{/if}
				<figure class="flex max-h-full max-w-full flex-col items-center gap-2">
					<img
						src={aktuell.url}
						alt={aktuell.titel ?? `Bild ${index + 1}`}
						class="max-h-[calc(100vh-11rem)] max-w-full rounded-md object-contain shadow-2xl"
					/>
					{#if aktuell.titel}
						<figcaption class="text-sm font-medium text-white/90">{aktuell.titel}</figcaption>
					{/if}
				</figure>
				{#if hatMehrere}
					<button
						type="button"
						onclick={() => blaettern(1)}
						aria-label="Nächstes Bild"
						class="{KNOPF} absolute right-4 h-11 w-11"
					>
						<CaretRightIcon size={22} weight="bold" />
					</button>
				{/if}
			</div>

			<!-- Thumbnail strip -->
			{#if hatMehrere}
				<div class="flex justify-center gap-2 overflow-x-auto px-4 py-3">
					{#each bilder as bild, position (bild.url + position)}
						<button
							type="button"
							onclick={() => (index = position)}
							aria-label={bild.titel ?? `Bild ${position + 1}`}
							aria-current={position === index}
							class="h-14 w-18 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-opacity"
							class:border-white={position === index}
							class:border-transparent={position !== index}
							class:opacity-60={position !== index}
							class:hover:opacity-100={position !== index}
						>
							<img src={bild.url} alt="" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

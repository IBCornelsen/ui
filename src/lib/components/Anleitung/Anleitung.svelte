<script lang="ts">
	import InfoIcon from "phosphor-svelte/lib/InfoIcon";
	import { fly } from "svelte/transition";
	import AnleitungCard from "./AnleitungCard.svelte";
	import type { AnleitungInstruction } from "./anleitung";
	import { getActiveAnleitung } from "./store.svelte";

	interface Props {
		// Guidance for the currently focused input. Omit it to read the shared store
		// that use:anleitung fields write to by default; pass it to drive the panel
		// from a custom source (null = nothing focused).
		active?: AnleitungInstruction | null;
	}

	let { active }: Props = $props();

	// No explicit prop → follow the shared store fed by use:anleitung.
	const shown = $derived(active === undefined ? getActiveAnleitung() : active);

	// Re-key on the shown instruction so switching fields animates: old slides
	// out to the left, new slides in from the right.
	const contentKey = $derived(shown?.title ?? "__placeholder__");
</script>

<div class="flex flex-col gap-2">
	<div
		class="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] text-primary-700 uppercase"
	>
		<InfoIcon size={13} weight="fill" /> Anleitung
	</div>

	<!-- Active field's guidance, or a placeholder. Grid stacks the outgoing and
	     incoming content in one cell so they cross-slide without a layout jump. -->
	<div class="grid overflow-hidden">
		{#key contentKey}
			<div
				class="col-start-1 row-start-1"
				in:fly={{ x: 24, duration: 220 }}
				out:fly={{ x: -24, duration: 220 }}
			>
				{#if shown}
					<AnleitungCard instruction={shown} />
				{:else}
					<div class="flex flex-col items-center gap-2 px-4 py-8 text-center">
						<InfoIcon size={28} class="text-neutral-400" />
						<p class="text-base leading-relaxed text-neutral-600">
							Wählen Sie ein Feld aus, um Hinweise dazu zu sehen.
						</p>
					</div>
				{/if}
			</div>
		{/key}
	</div>
</div>

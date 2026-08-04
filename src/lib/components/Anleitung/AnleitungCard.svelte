<script lang="ts">
	import BookOpenTextIcon from "phosphor-svelte/lib/BookOpenTextIcon";
	import WarningIcon from "phosphor-svelte/lib/WarningIcon";
	import { IMPORTANCE_LABEL, type Importance } from "./types";
	import type { AnleitungInstruction } from "./anleitung";

	interface Props {
		instruction: AnleitungInstruction;
		// Dark speech-bubble variant (AnleitungZeile): light text on neutral-900.
		dunkel?: boolean;
	}

	let { instruction, dunkel = false }: Props = $props();

	// required = clear red, recommended = primary, optional = muted neutral.
	// The light chips double as accents on the dark bubble.
	const importanceStyles: Record<Importance, string> = {
		required: "bg-error-50 text-error-700 border-error-200",
		recommended: "bg-primary-50 text-primary-700 border-primary-200",
		optional: "bg-neutral-100 text-neutral-600 border-neutral-200"
	};
</script>

<div class="flex items-start justify-between gap-2">
	<h4
		class="text-base leading-snug font-bold"
		class:text-white={dunkel}
		class:text-neutral-900={!dunkel}
	>
		{instruction.title}
	</h4>
	{#if instruction.importance}
		<span
			class={[
				"shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] font-bold tracking-wide uppercase",
				importanceStyles[instruction.importance]
			]}
		>
			{IMPORTANCE_LABEL[instruction.importance]}
		</span>
	{/if}
</div>

<p
	class="mt-2 text-base leading-relaxed"
	class:text-neutral-300={dunkel}
	class:text-neutral-700={!dunkel}
>
	{instruction.description}
</p>

{#if instruction.error}
	<div
		class={[
			"mt-2.5 flex items-start gap-2 rounded-md border px-3 py-2 text-base leading-snug font-medium",
			dunkel && "border-error-400/60 text-error-200 bg-error-500/20",
			!dunkel && "border-error-200 bg-error-50 text-error-700"
		]}
	>
		<WarningIcon size={18} weight="fill" class="mt-0.5 shrink-0" />
		<span>{instruction.error}</span>
	</div>
{/if}

{#if instruction.norm}
	<div
		class="mt-2.5 rounded-md border-l-[3px] px-3 py-2"
		class:border-primary-400={dunkel}
		class:bg-neutral-800={dunkel}
		class:border-primary-300={!dunkel}
		class:bg-primary-50={!dunkel}
	>
		<div
			class="flex items-center gap-1.5 text-base font-bold tracking-wide uppercase"
			class:text-primary-300={dunkel}
			class:text-primary-700={!dunkel}
		>
			<BookOpenTextIcon size={13} weight="fill" />
			{instruction.norm.ref}
		</div>
		<p
			class="mt-1 text-base leading-snug italic"
			class:text-neutral-300={dunkel}
			class:text-neutral-600={!dunkel}
		>
			„{instruction.norm.quote}"
		</p>
	</div>
{/if}

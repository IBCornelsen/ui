<script lang="ts">
	import ArrowRightIcon from "phosphor-svelte/lib/ArrowRightIcon";
	import BookOpenTextIcon from "phosphor-svelte/lib/BookOpenTextIcon";
	import WarningIcon from "phosphor-svelte/lib/WarningIcon";
	import Button from "../Button.svelte";
	import { IMPORTANCE_LABEL, type Importance } from "./types";
	import type { AnleitungInstruction } from "./anleitung";

	interface Props {
		instruction: AnleitungInstruction;
	}

	let { instruction }: Props = $props();

	// required = clear red, recommended = primary, optional = muted neutral.
	const importanceStyles: Record<Importance, string> = {
		required: "bg-error-50 text-error-700 border-error-200",
		recommended: "bg-primary-50 text-primary-700 border-primary-200",
		optional: "bg-neutral-100 text-neutral-600 border-neutral-200"
	};
</script>

<div class="flex items-start justify-between gap-2">
	<h4 class="text-base leading-snug font-bold text-neutral-900">{instruction.title}</h4>
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

<p class="mt-2 text-base leading-relaxed text-neutral-700">{instruction.description}</p>

{#if instruction.error}
	<div
		class="border-error-200 mt-2.5 flex items-start gap-2 rounded-md border bg-error-50 px-3 py-2 text-base leading-snug font-medium text-error-700"
	>
		<WarningIcon size={18} weight="fill" class="mt-0.5 shrink-0" />
		<span>{instruction.error}</span>
	</div>
{/if}

{#if instruction.link}
	<Button href={instruction.link.href} class="mt-3 w-full sm:w-auto">
		{instruction.link.label}
		<ArrowRightIcon size={16} weight="bold" />
	</Button>
{/if}

{#if instruction.norm}
	<div class="mt-2.5 rounded-md border-l-[3px] border-primary-300 bg-primary-50 px-3 py-2">
		<div
			class="flex items-center gap-1.5 text-base font-bold tracking-wide text-primary-700 uppercase"
		>
			<BookOpenTextIcon size={13} weight="fill" />
			{instruction.norm.ref}
		</div>
		<p class="mt-1 text-base leading-snug text-neutral-600 italic">
			„{instruction.norm.quote}"
		</p>
	</div>
{/if}

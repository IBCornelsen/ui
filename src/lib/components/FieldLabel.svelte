<script lang="ts">
	import type { Snippet } from "svelte";
	import QuestionIcon from "phosphor-svelte/lib/QuestionIcon";

	interface Props {
		title: string;
		children?: Snippet;
		required?: boolean;
	}

	let { title, children, required = false }: Props = $props();

	let tooltipOpen = $state(false);
</script>

<div class="flex items-center justify-between gap-2">
	<label class="text-sm leading-none font-semibold text-neutral-700">
		{title}{#if required}<span class="text-secondary-600 ml-0.5">*</span>{/if}
	</label>

	{#if children}
		<div class="relative flex-shrink-0">
			<button
				type="button"
				class="hover:bg-primary-100 hover:text-primary-700 flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors"
				onmouseenter={() => {
					tooltipOpen = true;
				}}
				onmouseleave={() => {
					tooltipOpen = false;
				}}
				onfocus={() => {
					tooltipOpen = true;
				}}
				onblur={() => {
					tooltipOpen = false;
				}}
				aria-label="Hilfe"
			>
				<QuestionIcon size={14} weight="bold" />
			</button>

			{#if tooltipOpen}
				<div
					role="tooltip"
					class="absolute right-0 bottom-full z-50 mb-2 w-56 rounded-lg border border-neutral-200 bg-white p-2.5 text-sm leading-relaxed text-neutral-600 shadow-lg"
				>
					{@render children()}
					<!-- Arrow -->
					<div
						class="absolute right-2.5 -bottom-1.5 h-3 w-3 rotate-45 border-r border-b border-neutral-200 bg-white"
					></div>
				</div>
			{/if}
		</div>
	{/if}
</div>

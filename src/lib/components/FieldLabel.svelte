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

<!-- Hilfe-Symbol steht direkt hinter dem Text, nicht am Spaltenrand: in engen
     Rastern riss `justify-between` eine Lücke auf und schob das Symbol bei langen
     Labels in die Nachbarspalte. `items-start` hält es bei zweizeiligen Labels
     auf der ersten Zeile. -->
<div class="flex items-start gap-1.5">
	<label class="text-sm leading-snug font-semibold text-neutral-700">
		{title}{#if required}<span class="ml-0.5 text-secondary-600">*</span>{/if}
	</label>

	{#if children}
		<div class="relative mt-px flex-shrink-0">
			<button
				type="button"
				class="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-primary-100 hover:text-primary-700"
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
					class="absolute bottom-full left-0 z-50 mb-2 w-56 max-w-[70vw] rounded-lg border border-neutral-200 bg-white p-2.5 text-sm leading-relaxed text-neutral-600 shadow-lg"
				>
					{@render children()}
					<!-- Arrow -->
					<div
						class="absolute -bottom-1.5 left-2.5 h-3 w-3 rotate-45 border-r border-b border-neutral-200 bg-white"
					></div>
				</div>
			{/if}
		</div>
	{/if}
</div>

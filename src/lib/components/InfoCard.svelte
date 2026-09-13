<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { IconComponentProps } from "phosphor-svelte";
	import CheckCircleIcon from "phosphor-svelte/lib/CheckCircleIcon";
	import Card from "./Card.svelte";

	// Card with a heading line — optionally introduced by an icon — over either a
	// checked list (`items`) or free content (`children`). One visual treatment
	// for every explanatory box on the content pages.
	interface Props {
		title: string;
		icon?: Component<IconComponentProps>;
		/** Checked list. Omit it and pass `children` for free content instead. */
		items?: string[];
		size?: "sm" | "md" | "lg";
		tone?: "card" | "subtle";
		class?: string;
		children?: Snippet;
	}

	let {
		title,
		icon: IconComponent,
		items,
		size = "md",
		tone = "card",
		class: className = "",
		children
	}: Props = $props();
</script>

<Card {size} {tone} class={className}>
	<div class="mb-3 flex items-center gap-3">
		{#if IconComponent}
			<span
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700"
			>
				<IconComponent size={22} weight="fill" />
			</span>
		{/if}
		<h3 class="m-0 h5">{title}</h3>
	</div>

	{#if items}
		<ul class="m-0 flex list-none flex-col gap-2 p-0">
			{#each items as item (item)}
				<li class="flex items-start gap-2.5">
					<CheckCircleIcon size={18} weight="fill" class="mt-[3px] shrink-0 text-secondary-500" />
					<span class="body-md">{item}</span>
				</li>
			{/each}
		</ul>
	{/if}

	{#if children}
		<div class="body-md">
			{@render children()}
		</div>
	{/if}
</Card>

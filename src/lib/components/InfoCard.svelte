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
		/** Blue by default; `warning` marks a box that points out pitfalls. */
		iconTone?: "primary" | "warning";
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
		iconTone = "primary",
		items,
		size = "md",
		tone = "card",
		class: className = "",
		children
	}: Props = $props();

	// The icon stands on its own, without a tinted tile, and carries the size of
	// the step badges so every round mark on a content page reads the same.
	const ICON_SIZE = 36;
	const ICON_TONE_CLASSES: Record<"primary" | "warning", string> = {
		primary: "text-primary-600",
		warning: "text-secondary-500"
	};
</script>

<Card {size} {tone} class={className}>
	<div class="mb-3 flex items-center gap-3">
		{#if IconComponent}
			<IconComponent
				size={ICON_SIZE}
				weight="fill"
				class="shrink-0 {ICON_TONE_CLASSES[iconTone]}"
			/>
		{/if}
		<h3 class="m-0 h5">{title}</h3>
	</div>

	{#if items}
		<ul class="m-0 flex list-none flex-col gap-2 p-0">
			{#each items as item (item)}
				<li class="flex items-start gap-2.5">
					<CheckCircleIcon size={18} weight="fill" class="mt-[3px] shrink-0 text-primary-600" />
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

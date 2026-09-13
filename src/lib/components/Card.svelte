<script lang="ts">
	import type { Snippet } from "svelte";

	// The one content surface of the house: a white panel with a hairline border.
	// Elevation is reserved for elements that float above the page (sidebar,
	// menu, dialogs) — a content card earns its edge from the border, not a
	// shadow. Radius and padding move together, so a small card never carries
	// the radius of a large one.
	type Size = "sm" | "md" | "lg";
	type Tone = "card" | "subtle";

	interface Props {
		size?: Size;
		tone?: Tone;
		/** Renders the card as a link, including hover feedback. */
		href?: string;
		class?: string;
		children: Snippet;
	}

	let { size = "md", tone = "card", href, class: className = "", children }: Props = $props();

	const SIZE_CLASSES: Record<Size, string> = {
		sm: "rounded-lg p-4",
		md: "rounded-xl p-5",
		lg: "rounded-2xl p-6"
	};

	const TONE_CLASSES: Record<Tone, string> = {
		card: "bg-surface-card",
		subtle: "bg-surface-subtle"
	};

	// neutral-400 statt der helleren Stufe: auf weissem Grund war die Kante
	// vorher kaum auszumachen — die Karte muss sich ohne Schatten abgrenzen.
	const BASE_CLASSES = "border border-neutral-400";
	const LINK_CLASSES =
		"block no-underline transition-colors hover:border-primary-300 hover:bg-primary-50/40";
</script>

{#if href}
	<a
		{href}
		class="{BASE_CLASSES} {SIZE_CLASSES[size]} {TONE_CLASSES[tone]} {LINK_CLASSES} {className}"
	>
		{@render children()}
	</a>
{:else}
	<div class="{BASE_CLASSES} {SIZE_CLASSES[size]} {TONE_CLASSES[tone]} {className}">
		{@render children()}
	</div>
{/if}

<script lang="ts">
	import type { Snippet } from "svelte";

	// The one content surface of the house: a panel with a hairline border.
	// Radius and padding move together, so a small card never carries the radius
	// of a large one.
	type Size = "sm" | "md" | "lg";
	type Tone = "card" | "subtle";
	type Edge = "content" | "app";

	interface Props {
		size?: Size;
		tone?: Tone;
		/**
		 * `content` — the visible edge of the content pages, no elevation.
		 * `app` — the softer panel of the signed-in area, lifted a little off the
		 * tinted page background.
		 */
		edge?: Edge;
		/** Renders the card as a link, including hover feedback. */
		href?: string;
		class?: string;
		children: Snippet;
	}

	let {
		size = "md",
		tone = "card",
		edge = "content",
		href,
		class: className = "",
		children
	}: Props = $props();

	const SIZE_CLASSES: Record<Size, string> = {
		sm: "rounded-lg p-4",
		md: "rounded-xl p-5",
		lg: "rounded-2xl p-6"
	};

	const TONE_CLASSES: Record<Tone, string> = {
		card: "bg-surface-card",
		subtle: "bg-surface-subtle"
	};

	// content: neutral-400 statt der helleren Stufe — auf weissem Grund war die
	// Kante vorher kaum auszumachen, und eine Inhaltskarte bezieht ihren Rand aus
	// der Linie, nicht aus einem Schatten.
	// app: der eingeloggte Bereich steht auf getoentem Grund und hebt seine
	// Flaechen leicht ab; EIN Randton fuer alle Panels dort.
	const EDGE_CLASSES: Record<Edge, string> = {
		content: "border border-neutral-400",
		app: "border border-neutral-200 shadow-sm"
	};

	const LINK_CLASSES =
		"block no-underline transition-colors hover:border-primary-300 hover:bg-primary-50/40";
</script>

{#if href}
	<a
		{href}
		class="{EDGE_CLASSES[edge]} {SIZE_CLASSES[size]} {TONE_CLASSES[
			tone
		]} {LINK_CLASSES} {className}"
	>
		{@render children()}
	</a>
{:else}
	<div class="{EDGE_CLASSES[edge]} {SIZE_CLASSES[size]} {TONE_CLASSES[tone]} {className}">
		{@render children()}
	</div>
{/if}

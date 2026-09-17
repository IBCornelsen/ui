<script lang="ts">
	import type { Snippet } from "svelte";
	import VideoEmbed from "./VideoEmbed.svelte";

	// Uses the free space beside the running text: the text keeps its measure,
	// the video stands to its right. Too narrow a column and the video moves
	// under the text, centred.
	//
	// The measure is a container query, not a window width — the content column
	// changes with the marketing column, so the window alone says nothing about
	// the space actually available. The surrounding column therefore needs the
	// `@container` class.
	interface Props {
		videoId: string;
		title: string;
		posterUrl: string;
		caption?: string;
		/** Poster fetched eagerly — for the block at the top of a page (LCP). */
		priority?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		videoId,
		title,
		posterUrl,
		caption,
		priority = false,
		class: className = "",
		children
	}: Props = $props();

	// 55rem = 880px: below that, text and a 300px video no longer share a line
	// without pushing the measure under roughly 70 characters.
	const AUFTEILUNG = "flex flex-col gap-6 @min-[55rem]:flex-row @min-[55rem]:items-start";
</script>

<div class="{AUFTEILUNG} {className}">
	<div class="min-w-0 flex-1">
		{@render children()}
	</div>
	<VideoEmbed
		{videoId}
		{title}
		{posterUrl}
		{caption}
		{priority}
		class="mx-auto w-full max-w-[520px] @min-[55rem]:mx-0 @min-[55rem]:w-[300px] @min-[55rem]:shrink-0"
	/>
</div>

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
		/**
		 * Shows the video only while it stands beside the text. In the narrow
		 * column the page places it elsewhere (for example next to the check that
		 * answers the same question) so that the block above the fold stays short.
		 */
		videoOnlyWide?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		videoId,
		title,
		posterUrl,
		caption,
		priority = false,
		videoOnlyWide = false,
		class: className = "",
		children
	}: Props = $props();

	const videoNarrowClasses = $derived.by(() => {
		if (videoOnlyWide) return "hidden @min-[55rem]:block";
		return "mx-auto w-full max-w-[520px]";
	});

	// 55rem = 880px: below that, text and a 300px video no longer share a line
	// without pushing the measure under roughly 70 characters. In the narrow
	// column the block stays a plain block, not a flex container: a flex
	// container steps aside from the float that keeps the first lines clear of
	// the floating menu button, and the whole block would be indented instead
	// of only the lines next to the button.
	const AUFTEILUNG =
		"@min-[55rem]:flex @min-[55rem]:flex-row @min-[55rem]:items-start @min-[55rem]:gap-6";
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
		lazyWhenHidden={videoOnlyWide}
		class="{videoNarrowClasses} mt-6 @min-[55rem]:mx-0 @min-[55rem]:mt-0 @min-[55rem]:w-[300px] @min-[55rem]:shrink-0"
	/>
</div>

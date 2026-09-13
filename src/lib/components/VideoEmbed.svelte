<script lang="ts">
	// YouTube video, youtube-nocookie like the order forms: no cookie before the
	// visitor plays. Fills the width it is given — `TextWithVideo` puts it beside
	// a passage of running text.
	interface Props {
		videoId: string;
		title: string;
		/** Line under the video. Omit it and the video stands on its own. */
		caption?: string;
		class?: string;
	}

	let { videoId, title, caption, class: className = "" }: Props = $props();
</script>

<figure class="m-0 {className}">
	<iframe
		class="aspect-video w-full rounded-lg border border-neutral-400"
		src="https://www.youtube-nocookie.com/embed/{videoId}"
		{title}
		allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		loading="lazy"
	></iframe>
	{#if caption}
		<figcaption class="mt-2 body-sm">{caption}</figcaption>
	{/if}
</figure>

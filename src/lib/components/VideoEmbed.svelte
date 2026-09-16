<script lang="ts">
	import PlayIcon from "phosphor-svelte/lib/PlayIcon";

	// YouTube video behind a local poster image: the player (several MB of
	// third-party script) and the first contact with YouTube only happen once
	// the visitor presses play. youtube-nocookie like the order forms. Fills
	// the width it is given — `TextWithVideo` puts it beside running text.
	interface Props {
		videoId: string;
		title: string;
		/** Poster shown before playback; served locally, nothing comes from YouTube until play. */
		posterUrl: string;
		/** Line under the video. Omit it and the video stands on its own. */
		caption?: string;
		class?: string;
	}

	let { videoId, title, posterUrl, caption, class: className = "" }: Props = $props();

	let playing = $state(false);

	function play() {
		playing = true;
	}
</script>

<figure class="m-0 {className}">
	{#if playing}
		<iframe
			class="aspect-video w-full rounded-lg border border-neutral-400"
			src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1"
			{title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<button
			type="button"
			class="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-neutral-400 bg-neutral-900 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/40"
			aria-label="Video abspielen: {title}"
			onclick={play}
		>
			<img src={posterUrl} alt="" class="h-full w-full object-cover" loading="lazy" />
			<span class="absolute inset-0 flex items-center justify-center">
				<span
					class="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-md transition-colors group-hover:bg-primary-700"
				>
					<PlayIcon size={28} weight="fill" />
				</span>
			</span>
		</button>
	{/if}
	<!-- The privacy note sits below the poster so the title in the image stays
	     readable; it is always rendered so that pressing play does not shift the layout. -->
	<figcaption class="mt-2 body-sm">
		{#if caption}
			<span class="block">{caption}</span>
		{/if}
		<span class="block text-xs text-neutral-500">
			Beim Abspielen werden Daten an YouTube übertragen.
		</span>
	</figcaption>
</figure>

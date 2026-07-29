<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
		[key: string]: unknown;
	}

	let { children, ...rest }: Props = $props();
</script>

<div class="fixed right-8 bottom-8 z-50 flex max-w-[400px] flex-col gap-4" {...rest}>
	{@render children?.()}
</div>

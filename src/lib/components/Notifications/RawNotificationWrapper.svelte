<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
		[key: string]: unknown;
	}

	let { children, ...rest }: Props = $props();
</script>

<!-- z-[200]: Benachrichtigungen müssen über allen Seiten-Schichten liegen —
     die Bestellstrecken stapeln Karten/Overlays bis z-150 (Kundendaten-Dock),
     unter denen Toasts sonst unsichtbar aufpoppen. -->
<div class="fixed right-8 bottom-8 z-[200] flex max-w-[400px] flex-col gap-4" {...rest}>
	{@render children?.()}
</div>

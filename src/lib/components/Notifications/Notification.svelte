<script lang="ts">
	import RawNotification from "./RawNotification.svelte";
	import type { Notification } from "./store.svelte.js";

	interface Props {
		notification: Notification & { uid: string };
	}

	let { notification }: Props = $props();
</script>

<RawNotification {notification}>
	<p class="text-sm text-neutral-700">{@html notification.subtext}</p>
</RawNotification>

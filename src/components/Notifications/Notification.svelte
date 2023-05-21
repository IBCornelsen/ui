<script lang="ts">
	import RawNotification from "./RawNotification.svelte";
	import type { Notification } from "./types";

	export let notification: Notification & { uid: string };
</script>

<RawNotification {notification}>
	<p class="text-gray-600 text-lg">{@html notification.subtext}</p>
</RawNotification>
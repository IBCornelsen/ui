<script lang="ts">
	import Notification from "./Notification.svelte";
	import RawNotificationWrapper from "./RawNotificationWrapper.svelte";

	import { notifications } from "./shared";
</script>

<RawNotificationWrapper>
	{#each Object.entries($notifications) as [uid, notification] (uid)}
		<Notification notification={{...notification, uid }}></Notification>
	{/each}
</RawNotificationWrapper>
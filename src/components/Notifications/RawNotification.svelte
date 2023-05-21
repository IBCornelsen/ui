<script lang="ts">
	import { deleteNotification } from "./shared";
	import { fly } from "svelte/transition";
	import type { Notification } from "./types";

	export let notification: Partial<Notification> & { uid: string };
</script>

<div
	class="border rounded-lg bg-white shadow-md flex flex-row border-l-8" in:fly={{x: 200, duration: 200}} out:fly={{x: 200, duration: 200}}
	class:border-l-red-400={notification.type == "error"}
	class:border-l-blue-400={notification.type == "info"}
	class:border-l-green-400={notification.type == "success"}
	class:border-l-yellow-400={notification.type == "warning"}
>
	<div class="flex flex-col px-4 py-2">
		<h2 class="text-xl font-semibold">{@html notification.message}</h2>
		<p class="text-gray-600 text-lg"><slot></slot></p>
	</div>
	{#if notification.dismissable}
		<button
			class="border-l px-4 py-2 hover:bg-gray-100"
			on:click={() => {
				deleteNotification(notification.uid);
				if (notification.onUserDismiss) {
					notification.onUserDismiss()
				}
			}}>X</button
		>
	{/if}
</div>

<style>
	:global(a) {
		@apply text-blue-700;
	}

	:global(a:hover) {
		@apply underline;
	}

	:global(kbd) {
		@apply rounded-lg shadow-md border bg-gray-50 px-1.5 py-1 text-sm;
	}
</style>
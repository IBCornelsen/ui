<script lang="ts">
	import { scale } from "svelte/transition";

	export let onUserDismiss: () => any = () => {};
	export let hidden: boolean = false;
	export let heading: string;
</script>

<div
	class="backdrop-brightness-50 backdrop-blur-sm fixed top-0 left-0 w-full h-full"
	{hidden}
>
	<div
	class="border rounded-lg bg-white shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 min-w-[400px] min-h-[100px]"
	{hidden}
	in:scale={{ duration: 200 }}
	out:scale={{ duration: 200 }}
>
	<div class="flex flex-row justify-between items-center">
		<h2 class="text-xl font-semibold">{heading}</h2>
		<button
		class="px-4 py-2 hover:bg-gray-100 rounded-lg"
		on:click={() => {
			onUserDismiss();
			hidden = true;
		}}>X</button
	>
	</div>
	<slot></slot>
</div>
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

<script lang="ts">
	import { scale } from "svelte/transition";

	export let onUserDismiss: () => any = () => {};

	let dialog: HTMLDialogElement;

	$: {
		if (hidden) {
			dialog?.close();
		} else {
			dialog?.show();
		}
	}
	export let hidden: boolean = false;
	export let heading: string;
</script>

<dialog
	bind:this={dialog}
	class="border rounded-lg bg-white shadow-md p-4 min-w-[400px] min-h-[100px]"
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
	<slot />
</dialog>

<style>
	dialog::backdrop {
		@apply opacity-50 bg-black;
	}

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

<script lang="ts">
	import { onMount } from "svelte";

	export let placeholder: string;
	export let name: string;
	export let value: string | null = null;
	export let cypress: string = "";

	onMount(() => {
		if (value !== null) {
			select.value = value;
		}
	})

	let select: HTMLSelectElement;
</script>

<select
	bind:this={select}
	data-test={cypress}
	{name}
	{placeholder}
	{...$$restProps}
	class="px-1.5 py-1 rounded-md border border-gray-200 outline-offset-0 outline-none focus:outline-2 focus:shadow-[0_0_0_0.2rem] focus:shadow-blue-200 transition-shadow focus:border-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
>
<slot></slot>
</select>

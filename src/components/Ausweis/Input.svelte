<script lang="ts">
	export let type: HTMLInputElement["type"];
	export let placeholder: string;
	export let name: string;
	export let value: string = "";
	export let cypress: string = "";
</script>

<input
	data-test={cypress}
	{name}
	{type}
	{placeholder}
	{value}
	{...$$restProps}
	class="px-1.5 py-1 rounded-md border border-gray-200 outline-offset-0 outline-none focus:outline-2 focus:shadow-[0_0_0_0.2rem] focus:shadow-blue-200 transition-shadow focus:border-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
/>

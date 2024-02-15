<script lang="ts">
	export let type: HTMLButtonElement["type"];

	const { class: className, ...rest } = $$restProps;
</script>


<button {type} {...rest} class="bg-secondary text-white px-3.5 py-1.5 rounded-lg hover:bg-blue-900 active:bg-blue-900 focus:shadow-[0_0_0_0.15rem] focus:shadow-blue-300 active:scale-[.97] {className}">
<slot></slot>
</button>
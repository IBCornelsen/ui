<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: string | null = null;
	export let cypress: string = "";
	export let id: string = name;
</script>

<label
	for={name}
	class="flex flex-row gap-2 items-center text-base text-gray-900"
	><input type="checkbox" {id} {name} {value} data-test={cypress} {...$$restProps} /><slot
	/>{label}</label
>

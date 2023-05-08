<script lang="ts">
	export let heading: string;
</script>

<div class="mb-6 border rounded-lg bg-white shadow-md">
	<p class="bg-secondary rounded-tr-lg rounded-tl-lg no-underline text-lg px-4 py-1 text-white font-medium">{heading}</p>
	<div class="py-4">
		<slot></slot>
	</div>
</div>
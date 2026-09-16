<script lang="ts" module>
	export type BreadcrumbItem = { label: string; href: string };
</script>

<script lang="ts">
	import CaretRightIcon from "phosphor-svelte/lib/CaretRightIcon";

	// Trail from the start page to the current one. The last item is the page
	// itself and therefore text, not a link. Rendered small and quiet: it
	// orients, it does not compete with the heading below it.
	interface Props {
		items: BreadcrumbItem[];
		class?: string;
	}

	let { items, class: className = "" }: Props = $props();

	function isLast(index: number): boolean {
		return index === items.length - 1;
	}
</script>

<nav aria-label="Brotkrumen" class={className}>
	<ol class="m-0 flex list-none flex-wrap items-center gap-x-1 gap-y-1 p-0 body-sm">
		{#each items as item, index (item.href)}
			<li class="m-0 flex max-w-none items-center gap-1 p-0">
				{#if index > 0}
					<CaretRightIcon
						size={12}
						weight="bold"
						class="shrink-0 text-neutral-500"
						aria-hidden="true"
					/>
				{/if}
				{#if isLast(index)}
					<span aria-current="page" class="font-semibold text-neutral-800">{item.label}</span>
				{:else}
					<a
						href={item.href}
						class="text-neutral-600 no-underline hover:text-primary-700 hover:underline"
					>
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<script lang="ts">
	// Heading line of a marketing card: title over a solid rule in the house
	// orange. One component so the rule's weight and colour live in one place.
	interface Props {
		title: string;
		/** Element to render. `span` where the card carries no outline role. */
		as?: "h2" | "h3" | "span";
		class?: string;
	}

	let { title, as = "span", class: className = "" }: Props = $props();
</script>

<div class="mb-3 border-b-2 border-secondary-500 pb-2 {className}">
	<svelte:element this={as} class="m-0 h4">{title}</svelte:element>
</div>

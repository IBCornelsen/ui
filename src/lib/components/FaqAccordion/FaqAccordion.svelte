<script lang="ts">
	import { setContext } from "svelte";
	import type { Snippet } from "svelte";
	import { FAQ_ACCORDION_CONTEXT, type FaqAccordionContext } from "./context";

	// Frage-Antwort-Accordion (Marketing-Seiten): weiße Karten, immer nur eine offen.
	// Für die Abschnitts-Optik der Bestellstrecken siehe Accordion.svelte.
	interface Props {
		// Title of the item that starts open (null = all collapsed).
		initialOpen?: string | null;
		children: Snippet;
	}

	let { initialOpen = null, children }: Props = $props();

	// Nur der Startwert zählt — späteres Ändern von initialOpen klappt nichts um.
	// svelte-ignore state_referenced_locally
	let openTitle = $state<string | null>(initialOpen);

	const context: FaqAccordionContext = {
		isOpen: (title) => openTitle === title,
		toggle: (title) => {
			openTitle = openTitle === title ? null : title;
		}
	};

	setContext(FAQ_ACCORDION_CONTEXT, context);
</script>

<div class="flex flex-col gap-3">
	{@render children()}
</div>

<script lang="ts">
	import { getContext } from "svelte";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
	import type { Snippet } from "svelte";
	import { FAQ_ACCORDION_CONTEXT, type FaqAccordionContext } from "./context";

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();

	const accordion = getContext<FaqAccordionContext>(FAQ_ACCORDION_CONTEXT);
	let open = $derived(accordion.isOpen(title));

	// class: geht nur an Elementen, nicht an Komponenten (CaretDownIcon) und nicht mit
	// Tailwind-Arbitrary-Values (grid-rows-[1fr]) — daher hier Klassen-Ausdrücke.
	const caretClass = $derived(
		open
			? "text-primary-600 shrink-0 rotate-180 transition-transform duration-200"
			: "text-primary-600 shrink-0 transition-transform duration-200"
	);
	const bodyClass = $derived(
		open
			? "grid grid-rows-[1fr] transition-all duration-300 ease-out"
			: "grid grid-rows-[0fr] transition-all duration-300 ease-out"
	);
</script>

<div>
	<button
		type="button"
		onclick={() => accordion.toggle(title)}
		aria-expanded={open}
		class="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:border-primary-300"
	>
		<span class="text-lg font-bold text-box-heading">{title}</span>
		<CaretDownIcon size={20} weight="bold" class={caretClass} />
	</button>

	<!-- grid-rows 0fr→1fr animates the height while keeping content in the DOM. -->
	<div class={bodyClass}>
		<div class="overflow-hidden">
			<div class="prose mt-2 rounded-xl border border-neutral-200 bg-white px-5 py-4">
				{@render children()}
			</div>
		</div>
	</div>
</div>

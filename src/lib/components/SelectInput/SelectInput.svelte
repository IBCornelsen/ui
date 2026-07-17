<script lang="ts">
	import Input from "../Input.svelte";
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { SelectInputOption } from "./types";

	interface Props extends Omit<HTMLInputAttributes, "value"> {
		// Current input text. Bindable.
		value?: string | null;
		// Options to show. The caller supplies/filters these in response to onInput.
		options?: SelectInputOption[];
		invalid?: boolean;
		class?: string;
		// Fired on every keystroke so the caller can fetch or filter options.
		onInput?: (value: string) => void;
		// Fired when an option is picked (value is already set on the input).
		onSelect?: (option: SelectInputOption) => void;
	}

	let {
		value = $bindable(),
		options = [],
		invalid = false,
		class: className = "",
		onInput,
		onSelect,
		...rest
	}: Props = $props();

	let open = $state(false);
	let activeIndex = $state(-1);
	let container = $state<HTMLDivElement>();

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		value = event.currentTarget.value;
		activeIndex = -1;
		open = true;
		if (onInput) onInput(value);
	}

	function select(option: SelectInputOption) {
		value = option.value;
		open = false;
		activeIndex = -1;
		if (onSelect) onSelect(option);
	}

	function onFocus() {
		if (options.length > 0) open = true;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			open = false;
			return;
		}
		if (!open || options.length === 0) return;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			activeIndex = (activeIndex + 1) % options.length;
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			activeIndex = (activeIndex - 1 + options.length) % options.length;
		} else if (event.key === "Enter") {
			// Swallow Enter while the list is open so it never submits the form.
			event.preventDefault();
			if (activeIndex >= 0) select(options[activeIndex]);
			else open = false;
		}
	}

	// Close when clicking anywhere outside the component.
	$effect(() => {
		function onDocumentClick(event: MouseEvent) {
			if (container && !container.contains(event.target as Node)) open = false;
		}
		document.addEventListener("click", onDocumentClick);
		return () => document.removeEventListener("click", onDocumentClick);
	});
</script>

<div class="relative" bind:this={container}>
	<Input
		{value}
		{invalid}
		class={className}
		autocomplete="off"
		oninput={handleInput}
		onfocus={onFocus}
		onkeydown={onKeydown}
		{...rest}
	/>

	{#if open && options.length > 0}
		<ul
			class="absolute top-[calc(100%+4px)] left-0 z-20 max-h-64 w-max max-w-[min(20rem,90vw)] overflow-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg"
		>
			{#each options as option, index (option.value + index)}
				<li>
					<button
						type="button"
						tabindex="-1"
						class="block w-full cursor-pointer px-3 py-2 text-left text-sm whitespace-nowrap text-neutral-800 hover:bg-neutral-100"
						class:bg-neutral-100={index === activeIndex}
						onclick={() => select(option)}
					>
						{option.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

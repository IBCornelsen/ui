<script lang="ts">
	import XIcon from "phosphor-svelte/lib/XIcon";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Tag = string | number;

	interface Props extends Omit<HTMLInputAttributes, "value" | "type"> {
		// Current tags. Bindable so the parent stays in sync.
		tags?: Tag[];
		type?: "text" | "number";
		placeholder?: string;
		// Reject a value that already exists.
		onlyUnique?: boolean;
		maxTags?: number;
		minlength?: number;
		maxlength?: number;
		disabled?: boolean;
		readonly?: boolean;
		// invalid: roter Rahmen für leere/ungültige Pflichtfelder (wie in den Formularen).
		invalid?: boolean;
		// required: Pflichtfeld — ohne Tags CI-orange markiert (offene Eingabe),
		// analog zur :invalid-Konvention der nativen Felder.
		required?: boolean;
		// Keep numeric tags in ascending order after each insert.
		sortNumeric?: boolean;
		class?: string;
	}

	let {
		tags = $bindable([]),
		type = "text",
		placeholder = "",
		onlyUnique = false,
		maxTags = Infinity,
		minlength = 0,
		maxlength = Infinity,
		disabled = false,
		readonly = false,
		invalid = false,
		required = false,
		sortNumeric = false,
		class: className = "",
		...rest
	}: Props = $props();

	const pflichtOffen = $derived(required && !invalid && tags.length === 0);

	let draft = $state("");

	function hasValidLength(value: string): boolean {
		return value.length >= minlength && value.length <= maxlength;
	}

	function addTag(raw: string) {
		const value = raw.trim();
		if (value.length === 0) return;
		if (!hasValidLength(value)) return;
		if (onlyUnique && tags.some((tag) => String(tag) === value)) return;
		if (tags.length >= maxTags) return;

		let next: Tag = value;
		if (type === "number") next = Number(value);

		tags = [...tags, next];
		if (sortNumeric) tags = [...tags].sort((a, b) => Number(a) - Number(b));
		draft = "";
	}

	function removeTag(index: number) {
		tags = tags.filter((_, position) => position !== index);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			event.preventDefault();
			addTag(draft);
			return;
		}
		// Backspace on an empty field removes the last tag.
		if (event.key === "Backspace" && draft.length === 0 && tags.length > 0) {
			event.preventDefault();
			removeTag(tags.length - 1);
		}
	}

	// Commit a pending value when the field loses focus.
	function onBlur() {
		addTag(draft);
	}
</script>

<div
	class={[
		"flex flex-wrap items-center gap-1.5 rounded-md border px-1.5 py-0.5 transition-colors focus-within:ring-2",
		!invalid &&
			!pflichtOffen &&
			"border-neutral-300 bg-white focus-within:border-primary-600 focus-within:ring-primary-600/15",
		pflichtOffen && "border-secondary-500 bg-secondary-50 focus-within:ring-secondary-500/20",
		invalid && "border-error-500 bg-error-50 focus-within:ring-error-500/20",
		disabled && "cursor-default bg-neutral-100",
		className
	]}
>
	{#each tags as tag, index (index)}
		<span
			class="inline-flex items-center gap-1 rounded border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-sm text-neutral-700"
		>
			{tag}
			{#if !disabled && !readonly}
				<button
					type="button"
					aria-label="Entfernen"
					class="inline-flex cursor-pointer text-neutral-500 hover:text-neutral-800"
					onclick={() => removeTag(index)}
				>
					<XIcon size={13} weight="bold" />
				</button>
			{/if}
		</span>
	{/each}

	<!-- value/oninput instead of bind:value: a number-typed bind would coerce `draft`
	     away from a string and break the length/trim logic below. -->
	<input
		value={draft}
		{type}
		{placeholder}
		{disabled}
		{readonly}
		{minlength}
		{maxlength}
		autocomplete="off"
		class="h-9 min-w-[4rem] flex-1 bg-transparent px-1 text-sm text-neutral-800 focus:outline-none disabled:cursor-default"
		oninput={(event) => (draft = event.currentTarget.value)}
		onkeydown={onKeydown}
		onblur={onBlur}
		{...rest}
	/>
</div>

<style>
	/* Spinner-Pfeile bei Zahlenfeldern entfernen. */
	input[type="number"] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>

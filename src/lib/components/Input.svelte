<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { validateFieldValue, type FieldValidator } from "./fieldValidation";

	interface Props extends Omit<HTMLInputAttributes, "value"> {
		value?: unknown;
		// invalid: roter Rahmen für leere/ungültige Pflichtfelder (wie in den Formularen).
		invalid?: boolean;
		element?: HTMLInputElement;
		// Optionales Icon links im Feld (z. B. Suche, E-Mail).
		icon?: Snippet;
		// validate: Fehlertext unter dem Feld, sobald es berührt und ungültig ist.
		// Opt-in, weil es einen Wrapper um das <input> legt (Layout der übrigen
		// Aufrufer bleibt damit unverändert).
		validate?: boolean;
		validator?: FieldValidator;
	}

	let {
		value = $bindable(),
		invalid = false,
		element = $bindable(),
		class: className = "",
		icon,
		validate = false,
		validator,
		onblur,
		...rest
	}: Props = $props();

	const base =
		"w-full rounded-md border px-3 py-2 text-sm leading-normal text-neutral-800 transition-colors focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-500";
	const ok = "border-neutral-300 bg-white focus:border-primary-600 focus:ring-primary-600/15";
	const error = "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-500/20";

	const validationActive = $derived(validate || Boolean(validator));

	// Fehler erst nach der ersten Interaktion anzeigen.
	let touched = $state(false);

	function handleBlur(event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		touched = true;
		onblur?.(event);
	}

	const validation = $derived(
		validateFieldValue(value, {
			required: Boolean(rest.required),
			validator,
			emptyMessage: "Pflichtfeld."
		})
	);

	const showInvalid = $derived(invalid || (validationActive && touched && !validation.ok));
</script>

{#snippet control()}
	{#if icon}
		<div class="relative w-full">
			<span
				class="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center text-neutral-400"
			>
				{@render icon()}
			</span>
			<input
				bind:value
				bind:this={element}
				class={[base, "pl-9", !showInvalid && ok, showInvalid && error, className]}
				onblur={handleBlur}
				{...rest}
			/>
		</div>
	{:else}
		<input
			bind:value
			bind:this={element}
			class={[base, !showInvalid && ok, showInvalid && error, className]}
			onblur={handleBlur}
			{...rest}
		/>
	{/if}
{/snippet}

{#if validationActive}
	<div class="flex w-full flex-col gap-1">
		{@render control()}

		{#if showInvalid && validation.message}
			<span class="text-sm text-error-600">{validation.message}</span>
		{/if}
	</div>
{:else}
	{@render control()}
{/if}

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

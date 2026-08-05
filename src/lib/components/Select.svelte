<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
	import { validateFieldValue, type FieldValidator } from "./fieldValidation";

	interface Props extends Omit<HTMLSelectAttributes, "value"> {
		value?: unknown;
		invalid?: boolean;
		// "required": CI-orange Markierung für leere Pflichtfelder statt Fehlerrot
		// (einheitlich mit FieldLabel-Stern und der Pflicht-Hervorhebung in cad).
		invalidVariant?: "error" | "required";
		element?: HTMLSelectElement;
		// validate: Fehlertext unter dem Feld, sobald es berührt und ungültig ist.
		// Opt-in wie bei Input.svelte, damit das Layout der übrigen Aufrufer bleibt.
		validate?: boolean;
		validator?: FieldValidator;
		children: Snippet;
	}

	let {
		value = $bindable(),
		invalid = false,
		invalidVariant = "error",
		element = $bindable(),
		class: className = "",
		validate = false,
		validator,
		onblur,
		children,
		...rest
	}: Props = $props();

	// appearance-none + pr-10: eigenes Caret statt nativer Pfeil, damit die Höhe der
	// des Inputs entspricht (native selects ignorieren padding-block teilweise).
	const base =
		"w-full cursor-pointer appearance-none rounded-md border py-2 pr-10 pl-3 text-sm leading-normal text-neutral-800 transition-colors focus:outline-none focus:ring-2 disabled:cursor-default disabled:bg-neutral-100 disabled:text-neutral-500";
	const ok = "border-neutral-300 bg-white focus:border-primary-600 focus:ring-primary-600/15";
	const error = "border-error-500 bg-error-50 focus:border-error-500 focus:ring-error-500/20";
	const requiredEmpty =
		"border-secondary-500 bg-secondary-50 focus:border-secondary-600 focus:ring-secondary-500/20";

	const invalidClass = $derived(invalidVariant === "required" ? requiredEmpty : error);

	const validationActive = $derived(validate || Boolean(validator));

	// Fehler erst nach der ersten Interaktion anzeigen.
	let touched = $state(false);

	function handleBlur(event: FocusEvent & { currentTarget: EventTarget & HTMLSelectElement }) {
		touched = true;
		onblur?.(event);
	}

	const validation = $derived(
		validateFieldValue(value, {
			required: Boolean(rest.required),
			validator,
			emptyMessage: "Bitte auswählen."
		})
	);

	const showInvalid = $derived(invalid || (validationActive && touched && !validation.ok));
</script>

{#snippet control()}
	<div class="relative w-full">
		<select
			bind:value
			bind:this={element}
			class={[base, !showInvalid && ok, showInvalid && invalidClass, className]}
			onblur={handleBlur}
			{...rest}
		>
			{@render children()}
		</select>

		<CaretDownIcon
			size={16}
			weight="bold"
			class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-600"
		/>
	</div>
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

<script lang="ts" module>
	// Laufende Nummer für aria-labelledby — mehrere Modale auf einer Seite.
	let modalZaehler = 0;
</script>

<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import CircleNotchIcon from "phosphor-svelte/lib/CircleNotchIcon";
	import Button from "./Button.svelte";

	// Dialog with a stacked action list. An action returning true closes the
	// modal; while its promise is pending a spinner replaces the label.
	// Wide editor dialogs use size="breit" + randlos (body manages its own
	// scroll/padding) and a custom `fusszeile` instead of the option stack.
	// size="inhalt" shrinks the box to its content width (image/page previews).
	type Option = {
		title: string;
		variant?: "primary" | "outline" | "ghost";
		icon?: Component;
		action: () => Promise<boolean> | boolean;
	};

	let {
		hidden = $bindable(true),
		title,
		children,
		closable = true,
		size = "md",
		options = [],
		kopfZusatz,
		fusszeile,
		randlos = false,
		onClose
	}: {
		hidden?: boolean;
		closable?: boolean;
		title: string;
		size?: "sm" | "md" | "lg" | "xl" | "breit" | "inhalt";
		children?: Snippet;
		options?: Option[];
		// Zusatzzeilen unter dem Titel (Untertitel, Warnhinweise).
		kopfZusatz?: Snippet;
		// Eigene Fußzeile (rechtsbündige Aktions-Reihe) statt des Options-Stapels.
		fusszeile?: Snippet;
		// Körper ohne Innenabstand — der Inhalt orchestriert Scrollen/Padding selbst.
		randlos?: boolean;
		// Wird bei jedem Schließen gerufen (Escape, Backdrop, ✕, erfolgreiche Option).
		onClose?: () => void;
	} = $props();

	const widthClass = {
		sm: "w-full max-w-sm",
		md: "w-full max-w-md",
		lg: "w-full max-w-lg",
		xl: "w-full max-w-2xl",
		breit: "w-full max-w-4xl",
		inhalt: "w-fit max-w-full"
	};

	let loading = $state<number | null>(null);
	let dialogEl = $state<HTMLDivElement>();
	modalZaehler += 1;
	const titelId = `modal-titel-${modalZaehler}`;

	function close() {
		hidden = true;
		document.body.style.overflow = "";
		if (onClose) onClose();
	}

	$effect(() => {
		if (!hidden) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	});

	// Fokus wandert beim Öffnen in den Dialog und beim Schließen zurück zum Auslöser.
	$effect(() => {
		const dialog = dialogEl;
		if (hidden || !dialog) return;
		const vorher = document.activeElement;
		dialog.focus();
		return () => {
			if (vorher instanceof HTMLElement) vorher.focus();
		};
	});

	const FOKUSSIERBAR =
		'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function fokussierbareElemente(dialog: HTMLElement): HTMLElement[] {
		const alle = Array.from(dialog.querySelectorAll<HTMLElement>(FOKUSSIERBAR));
		return alle.filter((element) => element.offsetParent !== null);
	}

	// Tab bleibt im Dialog (Fokusfalle); greift nur, wenn der Fokus schon im
	// Dialog liegt — ein darüberliegender ConfirmDialog behält seinen eigenen.
	function fokusImDialogHalten(event: KeyboardEvent) {
		const dialog = dialogEl;
		if (!dialog) return;
		const aktiv = document.activeElement;
		if (!dialog.contains(aktiv)) return;
		const elemente = fokussierbareElemente(dialog);
		if (elemente.length === 0) {
			event.preventDefault();
			return;
		}
		const erstes = elemente[0];
		const letztes = elemente[elemente.length - 1];
		if (event.shiftKey && (aktiv === erstes || aktiv === dialog)) {
			event.preventDefault();
			letztes.focus();
			return;
		}
		if (!event.shiftKey && aktiv === letztes) {
			event.preventDefault();
			erstes.focus();
		}
	}

	async function handleOption(option: Option, index: number) {
		loading = index;
		try {
			const result = await option.action();
			if (result) close();
		} finally {
			loading = null;
		}
	}

	function onBackdropClick(event: MouseEvent) {
		if (!closable) return;
		if (event.target === event.currentTarget) close();
	}

	function onKeydown(event: KeyboardEvent) {
		if (hidden) return;
		if (event.key === "Tab") {
			fokusImDialogHalten(event);
			return;
		}
		if (event.key === "Escape" && closable) close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if !hidden}
	<!-- z-[170]: über dem cad-Chrome (Dock/Overlay bis z-160) — ein Modal deckt
	     immer die ganze Anwendung ab. -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-[170] flex items-center justify-center bg-black/85 p-4"
		role="presentation"
		onclick={onBackdropClick}
	>
		<div
			bind:this={dialogEl}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titelId}
			tabindex="-1"
			class="flex max-h-[90dvh] {widthClass[
				size
			]} flex-col overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-2xl outline-none"
		>
			<div
				class="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-5 py-3"
			>
				<div class="min-w-0">
					<span id={titelId} class="text-base font-bold text-neutral-800">{title}</span>
					{#if kopfZusatz}
						{@render kopfZusatz()}
					{/if}
				</div>
				{#if closable}
					<button
						class="cursor-pointer border-none bg-transparent text-lg leading-none text-neutral-400 transition-colors hover:text-neutral-600"
						onclick={close}
						aria-label="Schließen"
					>
						&#x2715;
					</button>
				{/if}
			</div>

			{#if children}
				{#if randlos}
					<div class="flex min-h-0 flex-1 flex-col overflow-hidden">
						{@render children()}
					</div>
				{:else}
					<div class="min-h-0 overflow-y-auto p-5">
						{@render children()}
					</div>
				{/if}
			{/if}

			{#if fusszeile}
				<div
					class="flex shrink-0 items-center justify-end gap-2 border-t border-neutral-200 px-5 py-3"
				>
					{@render fusszeile()}
				</div>
			{:else if options.length > 0}
				<div class="flex shrink-0 flex-col gap-2 border-t border-neutral-200 px-5 pt-4 pb-5">
					{#each options as option, index (option.title)}
						<Button
							variant={option.variant ?? "primary"}
							class="w-full"
							onclick={() => handleOption(option, index)}
							disabled={loading !== null}
						>
							{#if loading === index}
								<CircleNotchIcon size={18} class="animate-spin" />
							{:else}
								{#if option.icon}
									{@const Icon = option.icon}
									<Icon size={18} />
								{/if}
								{option.title}
							{/if}
						</Button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

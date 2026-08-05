<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import CircleNotchIcon from "phosphor-svelte/lib/CircleNotchIcon";
	import Button from "./Button.svelte";

	// Dialog with a stacked action list. An action returning true closes the
	// modal; while its promise is pending a spinner replaces the label.
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
		options
	}: {
		hidden?: boolean;
		closable?: boolean;
		title: string;
		size?: "sm" | "md" | "lg";
		children?: Snippet;
		options: Option[];
	} = $props();

	const maxWidthClass = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg" };

	let loading = $state<number | null>(null);

	function close() {
		hidden = true;
		document.body.style.overflow = "";
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
		if (hidden || !closable) return;
		if (event.key === "Escape") close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if !hidden}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
		onclick={onBackdropClick}
	>
		<div
			class="w-full {maxWidthClass[
				size
			]} overflow-hidden rounded-lg border border-neutral-300 bg-white shadow-2xl"
		>
			<div class="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-3">
				<span class="text-base font-bold text-neutral-800">{title}</span>
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
				<div class="p-5">
					{@render children()}
				</div>
			{/if}

			<div class="flex flex-col gap-2 border-t border-neutral-200 px-5 pt-4 pb-5">
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
		</div>
	</div>
{/if}

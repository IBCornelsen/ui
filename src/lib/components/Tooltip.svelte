<script lang="ts">
	import type { Snippet } from "svelte";

	type Placement = "top" | "bottom" | "left" | "right";

	interface Props {
		// Tooltip body: plain text, or a snippet for richer content.
		text?: string;
		content?: Snippet;
		placement?: Placement;
		// Delay before showing on hover/focus (ms).
		delay?: number;
		// Extra classes for the trigger wrapper (e.g. w-full for block-level triggers).
		class?: string;
		// The trigger element(s) the tooltip is anchored to.
		children: Snippet;
	}

	let {
		text,
		content,
		placement = "top",
		delay = 150,
		class: className = "",
		children
	}: Props = $props();

	let open = $state(false);
	let showTimer: ReturnType<typeof setTimeout> | undefined;

	function show() {
		showTimer = setTimeout(() => (open = true), delay);
	}

	function hide() {
		clearTimeout(showTimer);
		open = false;
	}

	// Outer wrapper positions the bubble; translate lives here so the inner
	// element is free to run a scale animation without fighting the offset.
	const bubblePlacement: Record<Placement, string> = {
		top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
		bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
		left: "right-full top-1/2 mr-2 -translate-y-1/2",
		right: "left-full top-1/2 ml-2 -translate-y-1/2"
	};

	// Plop origin points back at the trigger for each placement.
	const plopOrigin: Record<Placement, string> = {
		top: "origin-bottom",
		bottom: "origin-top",
		left: "origin-right",
		right: "origin-left"
	};

	const arrowPlacement: Record<Placement, string> = {
		top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
		bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
		left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
		right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2"
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class={["relative inline-flex", className]}
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={hide}
>
	{@render children()}

	{#if open}
		<span class={["pointer-events-none absolute z-50", bubblePlacement[placement]]}>
			<span
				role="tooltip"
				class={[
					"plop relative block w-max max-w-[200px] rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs leading-snug font-medium text-white shadow-lg",
					plopOrigin[placement]
				]}
			>
				{#if content}
					{@render content()}
				{:else}
					{text}
				{/if}
				<span class={["absolute size-2 rotate-45 bg-neutral-900", arrowPlacement[placement]]}
				></span>
			</span>
		</span>
	{/if}
</span>

<style>
	.plop {
		animation: plop-in 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes plop-in {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>

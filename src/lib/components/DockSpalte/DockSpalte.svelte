<script lang="ts">
	import type { Snippet } from "svelte";
	import SpaltenGriff from "./SpaltenGriff.svelte";

	// Side dock column with a handle: collapses to width 0 via the handle. The
	// handle is anchored to the SLIDING inner edge (left-full/right-full) and
	// travels with the width animation — no position jump on collapse/expand;
	// at width 0 it rests at the edge of the parent area. The content needs its
	// OWN fixed width (e.g. w-75): the inner overflow-x-clip crops it while
	// closing instead of squeezing it.
	let {
		side,
		collapsed = $bindable(false),
		width = "300px",
		handleVisible = true,
		collapseLabel,
		expandLabel,
		onTransitionEnd,
		children
	} = $props<{
		side: "left" | "right";
		collapsed?: boolean;
		width?: string;
		handleVisible?: boolean;
		collapseLabel: string;
		expandLabel: string;
		onTransitionEnd?: () => void;
		children: Snippet;
	}>();

	function toggle() {
		collapsed = !collapsed;
	}

	// transitionend bubbles up from the content — only report the own width transition.
	function handleTransitionEnd(event: TransitionEvent) {
		if (event.target !== event.currentTarget) return;
		if (event.propertyName !== "width") return;
		onTransitionEnd?.();
	}

	// The caret points in the direction the column will move on click.
	const direction = $derived.by(() => {
		if (side === "left") {
			if (collapsed) return "right" as const;
			return "left" as const;
		}
		if (collapsed) return "left" as const;
		return "right" as const;
	});

	const handlePosition = $derived.by(() => {
		if (side === "left") return "left-full rounded-r-lg border-l-0";
		return "right-full rounded-l-lg border-r-0";
	});
</script>

<div
	class="relative flex shrink-0 transition-[width] duration-300 ease-out"
	style:width={collapsed ? "0px" : width}
	ontransitionend={handleTransitionEnd}
>
	<div class="flex h-full w-full overflow-x-clip">
		{@render children()}
	</div>
	{#if handleVisible}
		<SpaltenGriff
			{direction}
			label={collapsed ? expandLabel : collapseLabel}
			onclick={toggle}
			positionClass="absolute top-1/2 z-130 {handlePosition}"
		/>
	{/if}
</div>

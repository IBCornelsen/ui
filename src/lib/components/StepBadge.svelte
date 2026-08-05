<script lang="ts">
	// Numbered circle of the workflow stepper, reused outside the stepper itself:
	// next to a section heading, or inline in a "zu <n> <Schritt>" button.
	// Same visual as the active step in WorkflowNav.
	type Size = "sm" | "md";

	interface Props {
		step: number;
		size?: Size;
	}

	let { step, size = "md" }: Props = $props();

	const sizes: Record<Size, string> = {
		sm: "h-[20px] w-[20px] text-[11px]",
		md: "h-[26px] w-[26px] text-[12px]"
	};
</script>

<span
	class="inline-flex shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white {sizes[
		size
	]}"
>
	{step}
</span>

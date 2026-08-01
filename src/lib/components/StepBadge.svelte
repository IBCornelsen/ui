<script lang="ts">
	// Step number in a filled circle — same visual language as the circles in
	// WorkflowNav. Used in front of step headings and inside the step navigation
	// buttons of the order forms.
	interface Props {
		step: number;
		size?: "sm" | "md";
	}

	const { step, size = "md" }: Props = $props();

	const MASSE = {
		sm: "h-[22px] w-[22px] text-[11px]",
		md: "h-[26px] w-[26px] text-[13px]"
	};
</script>

<span
	class="inline-flex shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-white {MASSE[
		size
	]}"
	aria-hidden="true"
>
	{step}
</span>

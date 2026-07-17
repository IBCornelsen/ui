<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Variant = "primary" | "secondary" | "outline" | "neutral" | "ghost" | "danger";
	type Size = "sm" | "md" | "lg";

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		children: Snippet;
	}

	let {
		variant = "primary",
		size = "md",
		type = "button",
		class: className = "",
		children,
		...rest
	}: Props = $props();

	// Ripple layer needs a positioned, clipped host.
	const base =
		"relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/40 disabled:cursor-default disabled:opacity-50";

	const variants: Record<Variant, string> = {
		primary: "bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800",
		secondary:
			"bg-secondary-500 text-white shadow-sm hover:bg-secondary-600 active:bg-secondary-700",
		outline:
			"border border-primary-300 bg-white text-primary-700 hover:bg-primary-50 active:bg-primary-100",
		// Same shape as outline but with a neutral border/text instead of the blue accent.
		neutral:
			"border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100",
		ghost: "bg-transparent text-primary-700 hover:bg-primary-50 active:bg-primary-100",
		danger: "bg-error-600 text-white shadow-sm hover:bg-error-700 active:bg-error-700"
	};

	const sizes: Record<Size, string> = {
		sm: "h-8 px-3 text-xs",
		md: "h-10 px-4 text-sm",
		lg: "h-12 px-5 text-base"
	};

	// Material-style ripple emanating from the pointer position.
	function spawnRipple(event: PointerEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		if (button.disabled) return;

		const diameter = Math.max(button.clientWidth, button.clientHeight);
		const rect = button.getBoundingClientRect();

		const circle = document.createElement("span");
		circle.className = "ripple";
		circle.style.width = `${diameter}px`;
		circle.style.height = `${diameter}px`;
		circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
		circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;
		circle.addEventListener("animationend", () => circle.remove());

		button.appendChild(circle);
	}
</script>

<button {type} class={[base, variants[variant], sizes[size], className]} {...rest} onpointerdown={spawnRipple}>
	{@render children()}
</button>

<style>
	:global(.ripple) {
		position: absolute;
		border-radius: 9999px;
		transform: scale(0);
		background-color: currentColor;
		opacity: 0.15;
		pointer-events: none;
		animation: ripple 600ms linear;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>

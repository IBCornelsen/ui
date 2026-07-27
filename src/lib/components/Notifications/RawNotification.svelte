<script lang="ts">
	import ArrowSquareOutIcon from "phosphor-svelte/lib/ArrowSquareOutIcon";
	import { type Notification, deleteNotification } from "./store.svelte.js";
	import { fly } from "svelte/transition";

	interface Props {
		notification: Partial<Notification> & { uid: string };
		children?: import("svelte").Snippet;
	}

	let { notification, children }: Props = $props();

	// Farbwelt je Typ (vormals .alert-*-Klassen der App).
	const TYP_KLASSEN: Record<string, string> = {
		error: "border-red-200 bg-error-50 text-error-700",
		info: "border-blue-200 bg-info-50 text-info-700",
		success: "border-green-200 bg-success-50 text-success-700",
		warning: "border-amber-200 bg-warning-50 text-warning-700"
	};

	function focusSelector() {
		const element = document.querySelector(notification.selector as string) as HTMLElement | null;

		if (!element) {
			return;
		}

		element.classList.add("bg-primary-300");

		element.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center"
		});

		element.focus();
		deleteNotification(notification.uid);

		setTimeout(() => {
			element?.classList.remove("bg-primary-300");
		}, 3000);
	}
</script>

<div
	class="flex flex-row items-start gap-3 rounded-lg border p-4 text-sm leading-snug {TYP_KLASSEN[
		notification.type ?? 'error'
	]}"
	in:fly|global={{ x: 200, duration: 200 }}
	out:fly|global={{ x: 200, duration: 200 }}
>
	<div class="flex flex-col">
		<h3 class="flex flex-row items-center gap-3 font-semibold">
			{@html notification.message}
			{#if notification.selector}
				<button onclick={focusSelector} class="rounded-lg border p-1.5" title="Anzeigen">
					<ArrowSquareOutIcon size={18} />
				</button>
			{/if}
		</h3>
		<p class="text-sm">{@render children?.()}</p>
	</div>
	{#if notification.dismissible}
		<button
			class="h-full cursor-pointer border-l px-4 py-3 hover:bg-neutral-100"
			onclick={() => {
				deleteNotification(notification.uid);
				if (notification.onUserDismiss) {
					notification.onUserDismiss();
				}
			}}
		>
			X
		</button>
	{/if}
</div>

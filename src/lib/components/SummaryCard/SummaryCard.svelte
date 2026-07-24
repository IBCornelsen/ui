<script lang="ts">
  import CaretUpIcon from "phosphor-svelte/lib/CaretUpIcon";
  import CheckIcon from "phosphor-svelte/lib/CheckIcon";
  import WarningIcon from "phosphor-svelte/lib/WarningIcon";
  import EnergyScale from "../EnergyScale/EnergyScale.svelte";
  import type { Snippet } from "svelte";
  import type {
    EnergyScaleClass,
    EnergyScaleMarker,
  } from "../EnergyScale/types";
  import type { StepInfo } from "./types";

  const DEFAULT_STEPS: StepInfo[] = [
    "Ausweisart",
    "Gebäudedaten",
    "Verbrauchsdaten",
    "Dokumente",
    "Prüfung",
    "Zahlung",
  ].map((label) => ({
    label,
    state: "upcoming",
    severity: "none",
    messages: [],
  }));

  interface Props {
    produkt: string;
    preis: number | string;
    steps?: StepInfo[];
    // embedded: same card as standard, but the step list is replaced by the
    // contextual Anleitung rendered via the `anleitung` snippet.
    embedded?: boolean;
    // Guidance panel shown in place of the steps when embedded.
    anleitung?: Snippet;
    // Energy efficiency scale data. Supplied by the caller so the card stays domain-free;
    // the card only passes it through to EnergyScale.
    scale?: { classes: EnergyScaleClass[]; markers?: EnergyScaleMarker[] };
    // Action buttons rendered in the sticky footer (desktop). Supplied by the caller so the
    // card stays domain-free; omit it to render no footer.
    actions?: Snippet;
  }

  let {
    produkt,
    preis,
    steps = DEFAULT_STEPS,
    embedded = false,
    anleitung,
    scale,
    actions,
  }: Props = $props();

  // Mobile: Zusammenfassung als aufziehbares Panel unter dem Header. Desktop zeigt immer alles.
  let expanded = $state(false);
  let cardEl = $state<HTMLDivElement>();
  let panelEl = $state<HTMLDivElement>();

  let innerWidth = $state(0);
  let isMobile = $derived(innerWidth > 0 && innerWidth < 1024);
  let fullscreen = $derived(expanded && isMobile);

  let dragStartY = 0;
  let dragStartScrollTop = 0;
  let contentHeight = 0;
  let dragging = false;
  let didDrag = false;
  const COMMIT_THRESHOLD = 60;

  // Body einfrieren, solange das Panel offen ist.
  $effect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  });

  function onCardTouchStart(event: TouchEvent) {
    if (!isMobile) return;
    dragStartY = event.touches[0].clientY;
    dragStartScrollTop = cardEl?.scrollTop ?? 0;
    didDrag = false;
    // Nur im eingeklappten Zustand die Öffnen-Geste mit Vorschau ziehen.
    dragging = !expanded;
    if (dragging && panelEl) {
      contentHeight =
        (panelEl.firstElementChild as HTMLElement | null)?.scrollHeight ?? 0;
      panelEl.style.transition = "none";
    }
  }

  function onCardTouchMove(event: TouchEvent) {
    const deltaY = event.touches[0].clientY - dragStartY;
    if (Math.abs(deltaY) > 6) didDrag = true;

    if (!dragging || !panelEl || contentHeight === 0) return;
    // Panelhöhe dem Finger folgen lassen (1:1 in Pixeln).
    const revealed = Math.max(0, Math.min(contentHeight, deltaY));
    panelEl.style.gridTemplateRows = `${revealed / contentHeight}fr`;
    event.preventDefault();
  }

  function onCardTouchEnd(event: TouchEvent) {
    const deltaY = event.changedTouches[0].clientY - dragStartY;

    if (dragging && panelEl) {
      dragging = false;
      panelEl.style.transition = "";
      panelEl.style.gridTemplateRows = "";
      if (didDrag) expanded = deltaY > COMMIT_THRESHOLD;
      return;
    }

    // Aufgeklappt: Wischen nach oben am oberen Rand klappt ein.
    if (expanded && deltaY < -COMMIT_THRESHOLD && dragStartScrollTop <= 0) {
      expanded = false;
    }
  }

  function onCardClick() {
    if (didDrag) {
      didDrag = false;
      return;
    }
    // Eingeklappt: Klick auf die Skala öffnet das Panel.
    if (!expanded && isMobile) expanded = true;
  }

  function collapse() {
    expanded = false;
  }
</script>

<svelte:window bind:innerWidth />

<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
<div
  bind:this={cardEl}
  class={[
    "flex flex-col gap-4 bg-white px-4 py-2",
    // Desktop: klassische Sidebar-Karte
    "lg:mx-0 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-neutral-200 lg:px-5 lg:py-5",
    // Mobil: volle Breite, direkt unter dem Header, ohne seitlichen Abstand
    "-mx-3 border-b border-neutral-200 lg:mx-0",
    // Mobil aufgeklappt: volle Höhe unter dem Header, eigener Scrollbereich (kein Body-Overflow)
    fullscreen && "max-h-[calc(100vh-4rem)] overflow-y-auto",
  ]}
  onclick={onCardClick}
  ontouchstart={onCardTouchStart}
  ontouchmove={onCardTouchMove}
  ontouchend={onCardTouchEnd}
>
  <!-- Energieeffizienz-Skala (mobil: einziger sichtbarer Bereich, wenn eingeklappt).
       Ohne Überschrift (einheitlich mit dem Bedarfsausweis); ohne scale-Daten
       entfällt der Block ganz. -->
  {#if scale}
    <div class="flex flex-col gap-2 border-neutral-100 lg:border-b lg:pb-4">
      <div class="order-none">
        <EnergyScale classes={scale.classes} markers={scale.markers} />
      </div>
    </div>
  {/if}

  <!-- Aufziehbares Panel (mobil): folgt beim Ziehen dem Finger -->
  <div class="collapsible" class:open={expanded} bind:this={panelEl}>
    <div class="collapsible-inner flex flex-col gap-4">
      <!-- Zusammenfassung Header -->
      <div
        class="flex flex-col gap-2 border-b border-neutral-100 pb-4 lg:order-first"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="text-primary-900 text-base font-bold">{produkt}</span>
          <div class="flex shrink-0 items-baseline gap-1.5">
            <span
              class="text-secondary-600 text-xl font-extrabold tracking-tight"
              >{preis} €</span
            >
            <span class="text-xs text-neutral-600">inkl. MwSt.</span>
          </div>
        </div>
      </div>

      <!-- Schritte: im Embed ersetzt die kontextuelle Anleitung die Schrittliste. -->
      {#if embedded}
        {@render anleitung?.()}
      {:else}
        <div class="flex flex-col gap-1">
          <ol class="mt-2 flex flex-col">
            {#each steps as step, index (step.label)}
              {@const stepNumber = index + 1}
              {@const isLast = stepNumber === steps.length}
              <li class="flex gap-3">
                <div class="flex flex-col items-center">
                  {#if step.severity === "error"}
                    <span
                      class="bg-error-600 flex size-7 items-center justify-center rounded-full text-white"
                    >
                      <WarningIcon size={16} weight="bold" />
                    </span>
                  {:else if step.severity === "warning"}
                    <span
                      class="bg-warning-500 flex size-7 items-center justify-center rounded-full text-white"
                    >
                      <WarningIcon size={16} weight="bold" />
                    </span>
                  {:else if step.state === "done"}
                    <span
                      class="bg-primary-600 flex size-7 items-center justify-center rounded-full text-white"
                    >
                      <CheckIcon size={16} weight="bold" />
                    </span>
                  {:else if step.state === "current"}
                    <span
                      class="bg-primary-600 flex size-7 items-center justify-center rounded-full text-sm font-bold text-white"
                    >
                      {stepNumber}
                    </span>
                  {:else}
                    <span
                      class="flex size-7 items-center justify-center rounded-full border border-neutral-300 text-sm font-semibold text-neutral-600"
                    >
                      {stepNumber}
                    </span>
                  {/if}
                  {#if !isLast}
                    <span
                      class="my-1 w-px flex-1"
                      class:bg-primary-300={step.state !== "upcoming"}
                      class:bg-neutral-200={step.state === "upcoming"}
                    ></span>
                  {/if}
                </div>
                <div class="flex flex-1 flex-col pb-4">
                  {#if step.onNavigate}
                    <button
                      type="button"
                      class="flex w-full cursor-pointer flex-col items-start text-left"
                      onclick={step.onNavigate}
                    >
                      {@render stepHeading(step)}
                    </button>
                  {:else}
                    {@render stepHeading(step)}
                  {/if}

                  {#if step.messages.length > 0}
                    <ul class="mt-2 flex flex-col gap-2">
                      {#each step.messages as message (message.id)}
                        <li
                          class="flex items-start gap-2 rounded-md border px-2.5 py-2 text-sm leading-snug"
                          class:border-red-200={message.severity === "error"}
                          class:bg-error-50={message.severity === "error"}
                          class:text-error-700={message.severity === "error"}
                          class:border-amber-200={message.severity ===
                            "warning"}
                          class:bg-warning-50={message.severity === "warning"}
                          class:text-warning-700={message.severity ===
                            "warning"}
                          class:border-primary-200={message.severity === "info"}
                          class:bg-primary-50={message.severity === "info"}
                          class:text-primary-800={message.severity === "info"}
                        >
                          <span class="flex-1 text-sm"
                            >{@html message.html}</span
                          >
                          {#if message.dismissible}
                            <button
                              type="button"
                              class="shrink-0 cursor-pointer font-bold opacity-70 hover:opacity-100"
                              aria-label="Hinweis ausblenden"
                              onclick={message.onDismiss}
                            >
                              ✕
                            </button>
                          {/if}
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              </li>
            {/each}
          </ol>
        </div>
      {/if}

      <!-- Aktionen (mobil am Seitenende, siehe Modul): vom Aufrufer über den actions-Snippet gestellt. -->
      {#if actions}
        <div
          class="z-10 hidden flex-col gap-3 border-t border-neutral-100 bg-white lg:sticky lg:bottom-0 lg:flex"
        >
          {@render actions()}
        </div>
      {/if}
    </div>
  </div>

  {#if fullscreen}
    <!-- Aufgeklappt: unten einklappen (Wischen nach oben am oberen Rand schließt ebenfalls) -->
    <button
      type="button"
      class="sticky bottom-0 -mx-4 flex items-center justify-center gap-2 border-t border-neutral-100 bg-white py-3"
      onclick={collapse}
      aria-label="Zusammenfassung einklappen"
    >
      <span class="h-1.5 w-10 rounded-full bg-neutral-300"></span>
      <CaretUpIcon size={16} class="text-neutral-500" />
    </button>
  {:else}
    <!-- Hinweis (mobil): das Panel lässt sich herunterziehen -->
    <div class="pull-hint -mt-6 flex justify-center lg:hidden">
      <span class="h-1 w-8 rounded-full bg-neutral-300"></span>
    </div>
  {/if}
</div>

{#snippet stepHeading(step: StepInfo)}
  <span
    class="text-sm font-bold"
    class:text-error-700={step.severity === "error"}
    class:text-warning-700={step.severity === "warning"}
    class:text-primary-700={step.severity === "none" &&
      step.state === "current"}
    class:text-primary-900={step.severity === "none" && step.state === "done"}
    class:text-neutral-600={step.severity === "none" &&
      step.state === "upcoming"}
  >
    {step.label}
  </span>
{/snippet}

<style>
  .collapsible {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 300ms ease;
  }
  .collapsible.open {
    grid-template-rows: 1fr;
  }
  .collapsible-inner {
    min-height: 0;
    overflow: hidden;
  }
  /* Desktop: Wrapper verschwinden, damit die Original-Reihenfolge
	   (Header, Skala, Schritte, Aktionen) über `lg:order-first` erhalten bleibt. */
  @media (min-width: 1024px) {
    .collapsible,
    .collapsible-inner {
      display: contents;
    }
  }

  /* Dezenter Bounce am Pull-Hinweis. */
  .pull-hint span {
    animation: pull-bounce 1.6s ease-in-out infinite;
  }
  @keyframes pull-bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(2px);
    }
  }
</style>

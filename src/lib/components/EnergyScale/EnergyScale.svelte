<script lang="ts">
  import type { EnergyScaleClass, EnergyScaleMarker } from "./types";

  // Compact live scale (Bedarfsausweis look): color band with class letters,
  // end-energy arrow above, primary-energy arrow below, class badge on the right.
  interface Props {
    classes: EnergyScaleClass[];
    markers?: EnergyScaleMarker[];
  }

  let { classes, markers = [] }: Props = $props();

  const total = $derived(classes.reduce((sum, klass) => sum + klass.size, 0));

  const segments = $derived.by(() => {
    let cumulative = 0;
    return classes.map((klass) => {
      const startValue = cumulative;
      cumulative += klass.size;
      return {
        label: klass.label,
        color: klass.color,
        startValue,
        endValue: cumulative,
        widthPercent: total > 0 ? (klass.size / total) * 100 : 0,
      };
    });
  });

  function markerPercent(value: number): number {
    if (total <= 0) return 0;
    return Math.max(0, Math.min(100, (value / total) * 100));
  }

  const endMarker = $derived(markers.find((marker) => marker.position !== "bottom"));
  const primaryMarker = $derived(markers.find((marker) => marker.position === "bottom"));

  // Efficiency class of the end-energy marker (badge on the right).
  const klasseSegment = $derived.by(() => {
    if (!endMarker) return null;
    return segments.find((segment) => endMarker.value < segment.endValue) ?? segments[segments.length - 1] ?? null;
  });

  const END_COLOR = "#1f3a8a";
  const PRIMARY_COLOR = "#1a1a1a";
</script>

<div class="flex w-full select-none items-center gap-3">
  <div class="min-w-0 flex-1">
    <!-- End-energy arrow (top, pointing down) -->
    <div class="relative h-2">
      {#if endMarker}
        <div
          class="absolute -translate-x-1/2 transition-[left] duration-1000 ease-in-out"
          style:left="{markerPercent(endMarker.value)}%"
          title="Endenergie"
        >
          <div
            class="h-0 w-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent"
            style:border-top-color={END_COLOR}
          ></div>
        </div>
      {/if}
    </div>

    <!-- Color band with class letters -->
    <div class="flex h-[26px] w-full overflow-hidden rounded-[3px]">
      {#each segments as segment (segment.label)}
        <div
          class="flex items-center justify-center text-[8.5px] font-bold leading-none text-white/95"
          style:width="{segment.widthPercent}%"
          style:background-color={segment.color}
        >
          {segment.label}
        </div>
      {/each}
    </div>

    <!-- Primary-energy arrow (bottom, pointing up) -->
    <div class="relative h-2">
      {#if primaryMarker}
        <div
          class="absolute -translate-x-1/2 transition-[left] duration-1000 ease-in-out"
          style:left="{markerPercent(primaryMarker.value)}%"
          title="Primärenergie"
        >
          <div
            class="h-0 w-0 border-b-[7px] border-l-[5px] border-r-[5px] border-l-transparent border-r-transparent"
            style:border-bottom-color={PRIMARY_COLOR}
          ></div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Efficiency class badge (same height as the band) -->
  <span
    class="flex h-[26px] w-[34px] shrink-0 items-center justify-center rounded-[3px] text-[15px] font-bold text-white"
    style:background-color={klasseSegment ? klasseSegment.color : "#9aa0b4"}
    title="Energieeffizienzklasse"
  >
    {klasseSegment ? klasseSegment.label : "–"}
  </span>
</div>

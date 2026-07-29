<script lang="ts">
  import type { EnergyScaleClass, EnergyScaleMarker } from "./types";

  interface Props {
    classes: EnergyScaleClass[];
    markers?: EnergyScaleMarker[];
  }

  let { classes, markers = [] }: Props = $props();

  const total = $derived(classes.reduce((sum, klass) => sum + klass.size, 0));

  // Lay classes end to end along a linear axis: each segment's width is its share
  // of the total, so a larger `size` yields a wider segment.
  const segments = $derived.by(() => {
    let cumulative = 0;
    return classes.map((klass) => {
      cumulative += klass.size;
      return {
        label: klass.label,
        color: klass.color,
        endValue: cumulative,
        widthPercent: total > 0 ? (klass.size / total) * 100 : 0,
      };
    });
  });

  function markerPercent(value: number): number {
    if (total <= 0) return 0;
    return Math.max(0, Math.min(100, (value / total) * 100));
  }

  const topMarkers = $derived(markers.filter((marker) => marker.position !== "bottom"));
  const bottomMarkers = $derived(markers.filter((marker) => marker.position === "bottom"));

  // Efficiency class of the first top marker, shown as the badge next to the band.
  const badgeSegment = $derived.by(() => {
    if (topMarkers.length === 0 || segments.length === 0) return null;
    const found = segments.find((segment) => topMarkers[0].value < segment.endValue);
    if (found) return found;
    return segments[segments.length - 1];
  });

  // Arrow colors follow the cad Effizienzskala: top = end energy, bottom = primary energy.
  const TOP_MARKER_COLOR = "#1f3a8a";
  const BOTTOM_MARKER_COLOR = "#1a1a1a";
</script>

<!-- Horizontal efficiency scale (GEG certificate color band, two arrows, class badge) -->
<div class="flex w-full select-none items-center gap-3.5">
  <div class="min-w-0 flex-1">
    <!-- Top markers (arrows pointing down) -->
    <div class="relative h-2">
      {#each topMarkers as marker (marker.value)}
        <div
          class="absolute -translate-x-1/2 transition-[left] duration-1000 ease-in-out"
          style:left="{markerPercent(marker.value)}%"
        >
          <div
            class="h-0 w-0 border-t-[7px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent"
            style:border-top-color={TOP_MARKER_COLOR}
          ></div>
        </div>
      {/each}
    </div>

    <!-- Color band -->
    <div class="flex h-[26px] w-full overflow-hidden rounded-[3px]">
      {#each segments as segment (segment.label)}
        <div
          class="flex items-center justify-center"
          style:width="{segment.widthPercent}%"
          style:background-color={segment.color}
        >
          <span class="text-[9px] leading-none font-bold text-white/95"
            >{segment.label}</span
          >
        </div>
      {/each}
    </div>

    <!-- Bottom markers (arrows pointing up, slightly offset from the band) -->
    <div class="relative h-2.5">
      {#each bottomMarkers as marker (marker.value)}
        <div
          class="absolute top-0.5 -translate-x-1/2 transition-[left] duration-1000 ease-in-out"
          style:left="{markerPercent(marker.value)}%"
        >
          <div
            class="h-0 w-0 border-r-[5px] border-b-[7px] border-l-[5px] border-r-transparent border-l-transparent"
            style:border-bottom-color={BOTTOM_MARKER_COLOR}
          ></div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Efficiency class badge (same height as the band) -->
  <span
    class="flex h-[26px] w-[34px] shrink-0 items-center justify-center rounded-[3px] text-[15px] font-bold text-white"
    style:background-color={badgeSegment ? badgeSegment.color : "#9aa0b4"}
  >
    {badgeSegment ? badgeSegment.label : "–"}
  </span>
</div>

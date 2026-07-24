<script lang="ts">
  import CaretUpIcon from "phosphor-svelte/lib/CaretUpIcon";
  import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";
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
      const startValue = cumulative;
      cumulative += klass.size;
      return {
        label: klass.label,
        color: klass.color,
        startValue,
        widthPercent: total > 0 ? (klass.size / total) * 100 : 0,
        startPercent: total > 0 ? (startValue / total) * 100 : 0,
      };
    });
  });

  function markerPercent(value: number): number {
    if (total <= 0) return 0;
    return Math.max(0, Math.min(100, (value / total) * 100));
  }
</script>

<div class="w-full select-none">
  <!-- Color scale: one solid block per class, widths proportional to bandwidth -->
  <div class="relative flex h-8 w-full overflow-hidden rounded-md">
    {#each segments as segment, index (segment.label)}
      <div
        class={[
          "flex items-center justify-center",
          index < segments.length - 1 && "border-r border-black/20",
        ]}
        style:width="{segment.widthPercent}%"
        style:background-color={segment.color}
      >
        <span class="text-[11px] font-bold text-neutral-900"
          >{segment.label}</span
        >
      </div>
    {/each}

    {#each markers as marker (marker.value + (marker.position ?? "top"))}
      <div
        class="absolute z-10 -translate-x-1/2 transition-[left] duration-1000 ease-in-out"
        class:top-0={marker.position !== "bottom"}
        class:bottom-0={marker.position === "bottom"}
        style:left="{markerPercent(marker.value)}%"
      >
        {#if marker.position === "bottom"}
          <CaretUpIcon
            size={24}
            weight="fill"
            class="translate-y-[9px] text-white"
          />
        {:else}
          <CaretDownIcon
            size={24}
            weight="fill"
            class="-translate-y-[9px] text-white"
          />
        {/if}
      </div>
    {/each}
  </div>

  <!-- Number axis: class boundaries at their real positions -->
  <div class="relative mt-1 h-4 text-[10px] font-medium text-neutral-600">
    {#each segments as segment, index (segment.label)}
      <span
        class={["absolute", index > 0 && "-translate-x-1/2"]}
        style:left="{segment.startPercent}%"
      >
        {segment.startValue}
      </span>
    {/each}
  </div>
</div>

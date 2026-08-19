# @ibc/ui

Shared IBC UI library: design tokens + Svelte 5 components, showcased in Storybook.
Single source of truth for the look of both apps (`online-energieausweis`, `cad`).

## What's in here

- `src/lib/tokens.css` — the design tokens (`@theme`). **New tokens go here**, not in an app.
- `src/lib/components/` — `Button`, `Input`, `Select`, `Textarea`, `Field`.
- `src/lib/index.ts` — barrel export.
- Storybook (`.storybook/`, `src/stories/`) — visual showcase / component catalogue.

## Usage in an app

```ts
import { Button, Input, Select, Field } from "@ibc/ui";
```

```svelte
<Field label="PLZ" for="plz" required error={errors.plz}>
	<Input id="plz" bind:value={objekt.plz} invalid={!objekt.plz} />
</Field>

<Button variant="primary" onclick={save}>Speichern &amp; weiter</Button>
```

Components ship as raw `.svelte` (resolved via the `svelte` export condition), so the
consuming app compiles them with its own Svelte/Vite. Two requirements per app:

1. Tokens: `@import "@ibc/ui/tokens.css";` in the app's `design-system.css`.
2. Tailwind must scan the library so its utility classes are generated:
   `@source "../../../../packages/ui/src";` (adjust depth to the css file).

## Storybook

```bash
bun run --filter @ibc/ui storybook        # dev on :6006
bun run --filter @ibc/ui build-storybook  # static build
```

## Roadmap

- **Adopt across apps**: replace the ad-hoc input/select/button styles in the CAD
  editor (`apps/online-energieausweis/src/cad/`, e.g. `ProjektdatenModal`/`EnvelopeModal`
  diverged) and the host `Ausweis/*` form components with these shared ones.
- **Drop DaisyUI**: once Button/Input/Select cover the usages, remove the
  `@plugin "daisyui"` from `apps/online-energieausweis/src/style/design-system.css`
  and migrate remaining `.btn`/`.input`/`.card` DaisyUI classes to `@ibc/ui`
  components + tokens.

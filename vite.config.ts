import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

// @storybook/svelte-vite (v10) no longer registers the Svelte plugin itself, so the
// project must provide it — otherwise *.stories.svelte is never compiled and the
// addon-svelte-csf post-transform receives raw markup. Storybook's Vite builder
// merges this config.
export default defineConfig({
	plugins: [svelte(), tailwindcss()]
});

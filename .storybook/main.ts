import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.svelte"],
	addons: ["@storybook/addon-svelte-csf"],
	framework: {
		name: "@storybook/svelte-vite",
		options: {
			// docgen plugin's `/\.svelte$/` filter also matches *.stories.svelte and fails
			// to parse the CSF module script; disable it.
			docgen: false
		}
	}
	// Svelte + Tailwind plugins come from vite.config.ts, which Storybook's Vite builder merges.
};

export default config;

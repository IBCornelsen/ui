import type { Preview } from "@storybook/svelte";
import "../src/lib/storybook.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: { color: /(background|color)$/i, date: /Date$/i }
		},
		backgrounds: {
			options: {
				app: { name: "App", value: "#ecedef" },
				white: { name: "White", value: "#ffffff" }
			}
		}
	},
	initialGlobals: {
		backgrounds: { value: "app" }
	}
};

export default preview;

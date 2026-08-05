import prettier from "eslint-config-prettier";
import path from "node:path";
import { readFileSync } from "node:fs";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

// Bestands-Ausnahmen: die scharfen Konventionsregeln gelten überall, sind aber für
// genau die Dateien abgeschaltet, die sie heute verletzen. Neucode wird geprüft.
// Liste erzeugen/kürzen: `bun run lint:legacy` (nur monoton fallend).
const legacy = JSON.parse(
	readFileSync(path.resolve(import.meta.dirname, "eslint-legacy.json"), "utf8")
);
const legacyOverrides = Object.entries(legacy.rules).map(([rule, files]) => ({
	files,
	rules: { [rule]: "off" }
}));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": "off",
			// Konventionen aus CLAUDE.md maschinell durchgesetzt (siehe legacyOverrides).
			"max-depth": ["error", 2],
			"max-lines-per-function": [
				"error",
				{ max: 80, skipBlankLines: true, skipComments: true, IIFEs: true }
			],
			"@typescript-eslint/no-explicit-any": "warn"
		}
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
				svelteConfig
			}
		}
	},
	...legacyOverrides
);

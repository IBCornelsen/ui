# CLAUDE.md — packages/ui (@ibc/ui)

Shared Svelte component package used by `apps/cad` and `apps/online-energieausweis`. Source-only package: apps compile `src/lib/` directly, there is no build step. No database, no server code — if a change needs either, it belongs in an app.

## Working rules

- `src/lib/index.ts` is the public API. Every component that apps should use gets exported there; check it first before adding anything new.
- Every new or visually changed component needs a Storybook story in `src/stories/` (`bunx storybook dev` to preview).
- Keep components generic: no app-specific business logic, no imports from `apps/*`. App-specific behavior stays in the app; the component gets props/snippets instead.
- Design tokens live in `src/lib/tokens.css` (exported as `@ibc/ui/tokens.css`). Use them instead of hardcoding colors.
- Breaking a component's props breaks two apps — check usages in both apps (`grep -r "from \"@ibc/ui\"" ../../apps`) before changing a public prop.

## Git

You're allowed to use git. Commit in this submodule first, then bump the submodule pointer in the monorepo root (see root `CLAUDE.md`). Always mention that a commit was made by you and not an actual human.

## Code Style

Follow the Code Style section of the root `CLAUDE.md` (English code/comments, Svelte `class:` directives, camelCase, guard clauses, short functions, no `??`/ternary shorthand, no eager single-use variables). This package is currently the cleanest workspace in the repo — keep it that way.

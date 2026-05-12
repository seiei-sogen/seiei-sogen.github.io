# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands go through `just` (see `justfile`). Package manager is **pnpm** (Node `>=22.12.0`, see `.nvmrc` → `v22.22.2`). Do not invoke `pnpm` / `astro` directly — add a recipe to the `justfile` if a new command is needed.

- `just` — list available recipes
- `just install` — install dependencies
- `just dev` — local dev server (http://localhost:4321)
- `just build` — runs `astro check` (TypeScript + content schema validation) then `astro build`. This is the typecheck path; there is no separate `lint` / `typecheck` recipe.
- `just preview` — preview the production build locally
- `just check` / `just sync` — `astro check` / `astro sync` directly
- `just astro <args>` — escape hatch to the Astro CLI
- `just clean` — remove `.astro` and `node_modules/.vite`
- `just reset` — clean + dev (recovery when the dev server crashes after dependency / config changes)
- `just pwa-icons` — regenerate PWA icons via `scripts/generate-pwa-icons.mjs`

There is no test framework wired up. `playwright` and `lighthouse` are devDependencies but no recipes invoke them.

## Architecture

This is an **Astro 6 static site** (`output: 'static'` in `astro.config.mjs`) deployed to **GitHub Pages** via `.github/workflows/deploy.yml` (`actions/upload-pages-artifact` + `actions/deploy-pages`). The README still describes a Cloudflare Pages flow and the `@astrojs/cloudflare` adapter is installed but **not active** — the GitHub Pages workflow is the source of truth for deployment.

### Single-file configuration

`src/site-config.ts` is the central config object consumed everywhere — `astro.config.mjs` reads it to derive the `site` URL and PWA manifest, layouts read it for SEO/theme, components read it for UI toggles (theme picker, background orbs, view transitions, brand colors). When changing site-wide behavior, prefer extending this object over adding new config files.

### Routing & content

- File-based routing under `src/pages/`. Dynamic routes: `blog/[slug].astro`, `projects/[slug].astro`, plus paginated `blog/page/[page]` and `projects/page/[page]` (per-page counts from `siteConfig.content`).
- Content Collections defined in `src/content.config.ts` using the glob loader: `projects`, `blog`, `services`, `testimonials`, `faq`, `changelog`. **Zod schema messages are written in Spanish** — they surface as build errors during `astro check`.
- Files prefixed with `_` are ignored by the content glob (`**/[^_]*.{md,mdx}`).
- Blog entries with `draft: true` should be filtered in pages — the schema defaults `draft` to `false`.

### i18n

`src/i18n.ts` exports `t(key)` and a `translations` object keyed by locale (`'es' | 'en' | 'pl' | 'ja'`). The active locale comes from `siteConfig.site.lang`. `TranslationKey` is derived from the `es` dictionary, so **every key must exist in `translations.es` first**; other locales fall back to `en`, then the raw key. The site is currently set to `ja`.

### Styling

- Tailwind via `@astrojs/tailwind` with `applyBaseStyles: false` — base styles live in `src/styles/global.css` as CSS variables.
- Brand color is HSL components only (`"230 70% 52%"`, not a full color) and is set per light/dark mode in `siteConfig.ui.brandColor`. CSS consumes these via `hsl(var(--primary))`.
- Path alias `@/*` → `src/*` (see `tsconfig.json`).

### Vite quirks

`astro.config.mjs` contains two non-obvious workarounds — preserve them when editing:
- `resolve.alias.debug` → `/src/utils/debug-mock.js` (stubs the `debug` package)
- `ssr.noExternal: ['astro-icon']` and `ssr.external: ['node:buffer']`

For new CommonJS dependencies that break the build, add to `ssr.noExternal`.

## Conventions

- Formatting: Prettier with `printWidth: 100`, `singleQuote`, `semi`, `trailingComma: 'es5'`, plus `prettier-plugin-astro` and `prettier-plugin-tailwindcss` (class sorting).
- TypeScript extends `astro/tsconfigs/strictest`.
- Components split into `src/components/sections/` (page-level composed sections) vs `src/components/ui/` (reusable primitives) vs `src/components/cards/` and `src/components/navigation/`.

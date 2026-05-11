# Changelog

All notable changes to this project are documented here. For the visual changelog, visit [/changelog](https://buyportfolio.zutra.agency/changelog) on your deployed site.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.9.1] - 2026-04-21 (Mobile Reveal Fix)

### Fixed

- **Invisible Content on Mobile**: All page content was stuck at `opacity: 0` on mobile browsers because `<main>` had the `.reveal` class, meaning the entire page wrapper started hidden and depended on the Intersection Observer to become visible. Removed `.reveal` from `<main>` in `BaseLayout.astro` — section-level reveal animations are unaffected
- **Reveal Race Condition**: `initReveal()` now checks if a `.reveal` element is already in the viewport at init time and immediately applies the `active` class, instead of solely relying on the deferred Intersection Observer. Prevents content from staying invisible when the observer initializes after elements are already visible

---

## [2.9.0] - 2026-04-20 (Customer Feedback & Polish)

### Added

- **Configurable Header Logo**: New `header` section in `site-config.ts` with support for `logoType: 'text' | 'svg' | 'image'`, allowing users to use an SVG logo or image instead of text name
- **Configurable Footer Logo**: New `footer` section in `site-config.ts` with `logoType: 'text' | 'svg' | 'image'`, `logoSvg`, `logoImage`, `logoAlt`, and `text` fields. `Footer.astro` now conditionally renders SVG, image, or text logo to match the header logo system
- **Background Pattern Toggle**: New `ui.showBackgroundPattern` option in `site-config.ts` to enable/disable the dot grid background pattern. Set to `false` for a clean white background
- **Background Orbs Toggle**: New `ui.showBackgroundOrbs` option in `site-config.ts` to enable/disable the colorful aurora/orbs background effect. Combine with `showBackgroundPattern: false` for a completely clean white background
- **Theme Control (Dark/Light)**: New `theme` section in `site-config.ts` with `allowToggle` (boolean) and `defaultMode` ('light' | 'dark'). Allows locking the theme and forcing a specific mode, ignoring the user's browser preferences

### Fixed

- **Testimonial Author Visibility**: Removed CSS classes `translate-y-4 opacity-0` that were hiding the testimonial footer. Author, role, and company are now immediately visible without relying on external animation classes
- **Refactored enableDarkMode**: Replaced `ui.enableDarkMode` option with the new `theme` section providing more granular controls (`allowToggle` and `defaultMode`)
- **Full i18n Coverage — Site-Wide**: Translation system now covers 100% of visible UI strings. Fixed 80+ hardcoded Spanish strings across 30+ files. Updated components: `Hero`, `ContactForm`, `FAQ`, `Newsletter`, `NewsletterWide`, `ContactCTA`, `Stack`, `Experience`, `Expertise`, `RecentProjects`, `Testimonials`, `ServiceSidebar`, `PostAuthor`, `PostCard`, `ServiceCard`, `ServiceCardSmall`, `ThemePicker`, `ContentPagination`, `Header`, `Footer`. Pages: `404`, `500`, `contact`, `services/index`, `services/[slug]`, `blog/index`, `blog/page/[page]`, `projects/index`, `projects/page/[page]`, `projects/[slug]`, `blog/[slug]`. `navigation` and `legal` arrays in `site-config.ts` now use i18n keys. Dates localized via `siteConfig.site.locale` instead of hardcoded `'es-ES'`. Inline script strings (form sending state, copied theme label) now pass through `data-*` attributes. 100+ new keys added to `src/i18n.ts` for ES/EN/PL

### Changed

- **Internationalized Comments**: All comments in `site-config.ts` translated from Spanish to English for better accessibility to global customers
- **Documentation Improved**: Added prerequisite note about installing `pnpm` before running commands in the documentation portal
- **i18n Polish Support**: Added Polish (pl) translations to `src/i18n.ts`. Language is now automatically determined by `site.lang` configuration, supporting Spanish, English, and Polish
- **Bilingual Documentation**: Documentation portal (`_docs/`) now supports both Spanish and English with a language switcher in `index.html` and `guide.html`. Language preference is persisted in localStorage

## [2.8.1] - 2026-04-11 (PostAuthor Avatar Fallback)

### Fixed

- **PostAuthor Avatar Fallback**: Added `onerror` handler to gracefully show initials when avatar image file doesn't exist or fails to load (404)

## [2.8.0] - 2026-04-11 (Full Config Activation & A11y Hardening)

### Added

- **Content Pagination (Page Mode)**: `ContentPagination` now supports numbered page navigation alongside prev/next, with `aria-current="page"` for accessibility
- **Paginated Routes**: `/projects/page/[page]` and `/blog/page/[page]` generated via `getStaticPaths`
- **GEO Optimization**: `public/llms.txt` for AI search engine discoverability
- **i18n Foundation**: `src/i18n.ts` with ES/EN translation dictionaries and `t()` helper
- **Environment Config**: `.env.example` with documented variables for contact forms and analytics
- **PWA Icon Generator**: `scripts/generate-pwa-icons.mjs` to produce PNG icons from SVG favicon
- **Root CHANGELOG.md**: Standard Keep-a-Changelog format for GitHub visibility

### Changed

- **`profile.bio` Activation**: Now renders as the Hero description paragraph instead of hardcoded text
- **`content.projectsPerPage` Activation**: Controls item slicing and pagination on `/projects`
- **`content.postsPerPage` Activation**: Controls item slicing and pagination on `/blog`
- **`ui.enableViewTransitions` Activation**: `<ClientRouter />` is now conditionally rendered
- **`ui.enableDarkMode` Activation**: Theme toggle button hides completely when set to `false`
- **ContactForm Backend Integration**: Real `fetch()` submission to Formspree/Cloudflare Forms, with honeypot spam protection, error state overlay, and config hint when no endpoint is set
- **Newsletter Validation**: Email format check with visual error feedback (red ring)
- **Hero Image Alt Text**: Now descriptive — includes name, role, and context for SEO/A11y

### Fixed

- **Duplicate robots.txt**: Removed static `public/robots.txt`, keeping only the dynamic API route
- **Zod Alpha**: Migrated from `4.0.0-alpha.1` to stable `3.24.2` with updated schema API
- **Deprecated `substr()`**: Replaced with `substring()` in Input and Textarea components
- **JSON-LD Script Hints**: Added explicit `is:inline` to silence Astro processing warnings
- **Header Social A11y**: Added `<span class="sr-only">` to match Footer accessibility pattern
- **`Button.astro` Typing**: Replaced `[x: string]: any` with `[x: string]: unknown`
- **`debug-mock.js` Documentation**: Added JSDoc explaining its purpose and how to replace it

### Security

- **Updated `security.txt`**: Corrected canonical URLs, extended expiry to 2027-12-31

## [2.7.0] - 2026-04-07 (Security & SEO Infrastructure)

### Added

- **Cloudflare Security Headers**: Native `_headers` file for Cloudflare Pages, including HSTS, CSP, X-Frame-Options, and Permissions-Policy
- **Security Standards**: `security.txt` in `.well-known/` for vulnerability reporting
- **Robust Metadata**: Standardized social placeholders in `site-config.ts`

### Changed

- **SEO Core Hardening**: Updated `robots.txt` with generalized sitemap references and optimized meta-tags

## [2.6.0] - 2026-04-04 (Minimalist Master Update)

### Added

- **Contact Page v2 Redesign**: Single-column ultra-clean contact layout
- **Extreme Minimalism**: Removed visual noise (container borders, heavy shadows, secondary backgrounds)
- **Pure Text Links**: Replaced icon boxes with quick-link row (Email · LinkedIn · Calendar)

### Changed

- **Button Architecture**: New `secondary` variant in `Button.astro`
- **Build Core Integrity**: Resolved TypeScript errors related to `exactOptionalPropertyTypes`

## [2.5.0] - 2026-04-04 (Services Experience Update)

### Added

- **Services Index Page**: `/services` route for centralized value proposition and hierarchical SEO
- **ServiceCard Component**: Extracted reusable specialty card with premium animations

### Changed

- **Navigation Structure**: Migrated "Servicios" from internal anchor to dedicated page
- **Business Conversion**: Strategic CTA section at end of services listing

## [2.4.0] - 2026-04-04 (Architecture & Modularity Update)

### Added

- **Master ContentHeader**: Unified header system for Blog, Projects, and Services
- **FAQ & Testimonial Atoms**: `FAQItem` and `TestimonialItem` modular components
- **Reading Progress Pro**: Scroll-based reading progress bar

### Changed

- **Zero Hardcoded UI**: Moved all inline UI to reusable widgets (`ServiceSidebar`, `PostAuthor`, etc.)
- **Unified Navigation**: `ContentPagination` component for all dynamic content

## [2.3.0] - 2026-04-04 (Structural Rebirth)

### Added

- **Enterprise Organization**: New folder structure: `/ui` (primitives), `/cards` (data), `/sections` (blocks), `/navigation` (global structure)
- **Extracted**: `PostCard`, `Footer`, `ExperienceItem` components

## [2.2.0] - 2026-04-04 (Elite Experience Update)

### Added

- **Custom Cursor Pro**: Intelligent pointer reacting to interactive elements
- **Magnetic Buttons**: Magnetic attraction effect for primary buttons
- **Project SEO (Deep Schema)**: `Schema.org/CreativeWork` for each project

### Changed

- **Retina Optimization**: Auto `densities={[1, 2]}` for project cards and hero images
- **Form UX Polish**: Redesigned Input/Textarea with inner shadows and focus rings
- **Performance LCP**: `loading="eager"` on hero image

## [2.1.0] - 2026-04-04 (Core Polish Update)

### Added

- **Advanced SEO Engine**: Automatic JSON-LD injection (`FAQPage`, `Service`)
- **Reveal Animations**: Intersection Observer-based fade-in on scroll
- **Public Assets**: Optimized `robots.txt`

### Changed

- **Web Accessibility (WCAG)**: Reinforced ARIA labels and focus management
- **Privacy & Perf (Fontsource)**: Migrated from Google Fonts to local font serving
- **Glassmorphism 2.0**: Refined glass layers and HSL borders

### Fixed

- **Pnpm Protocol**: Forced migration from `npm` to `pnpm` for build consistency

## [2.0.0] - 2026-03-31 (Enterprise Protocol Update)

### Added

- **Documentation Hub**: `_docs/index.html` portal for guides and setup
- **Visual Pedagogy**: Interactive UI screenshots in user manual
- **Dynamic Projects Layout**: Official support for 16:9 image containers
- **Enterprise Licensing**: Zutra.agency branding in `package.json` and footer

### Fixed

- **View Transitions Engine**: Stabilized `transition:name` attribute pairing
- **JSX Compilation Syntax**: Purged parse errors in virtual tag trees

## [1.2.0] - 2026-03-31 (Adaptive Pro Update)

### Added

- **ThemePicker Pro**: Floating color picker with 12+ premium palettes
- **Adaptive Color System**: Dual-mode (Light/Dark) brand color support
- **Developer Tools**: Reset and Copy buttons in ThemePicker
- **Centralized Brand Config**: Separate light/dark color definitions

### Changed

- **WCAG Contrast**: Global palette refined for AA compliance in both modes
- **UX Personalization**: Improved theme injection script to prevent FOUC

### Fixed

- **TypeScript Strictness**: Multiple typing errors resolved
- **CSS Structure**: Cleaned duplicate rules and optimized variable hierarchy

## [1.0.0] - 2026-03-15

### Added

- Initial release of Minimalist Portfolio template
- Astro 6 + Tailwind CSS native integration
- Content Collections support (Projects, Blog, Services)
- Cloudflare Pages adapter included

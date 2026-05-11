# Minimalist Portfolio Template

A professional, production-ready portfolio template built with **Astro 6**, **Tailwind CSS**, and **Cloudflare Pages**. Designed for developers and designers who value performance, clean aesthetics, and zero friction.

[**🔗 Live Demo**](https://buyportfolio.zutra.agency) · [**📖 Documentation**](_docs/index.html) · [**📋 Changelog**](CHANGELOG.md)

---

## ⚡ Why This Template?

| Metric | Score |
|---|---|
| **Lighthouse Performance** | 95–100 (all categories) |
| **First Contentful Paint** | < 0.8s on Cloudflare edge |
| **Total JS (homepage)** | < 15 KB (gzipped) |
| **Accessibility** | WCAG 2.2 AA compliant |
| **SEO** | Full JSON-LD, OG, Twitter Cards, Sitemap |
| **Bundle Size** | ~40% smaller than Next.js/React equivalents |

**vs. typical React portfolios:** Astro ships **zero JavaScript by default**. Your HTML is fully rendered at build time, with interactive islands loading only when needed. This means faster LCP, better SEO rankings, and lower hosting costs.

---

## ✨ Features

- 🚀 **Astro 6** with View Transitions and Islands Architecture
- ☁️ **Cloudflare Pages** deployment (SSG by default, SSR-capable via adapter swap)
- 🎨 **Adaptive Color System**: Dual-mode (Light/Dark) brand color configuration in `site-config.ts`
- 🛠️ **ThemePicker Pro**: Floating UI for real-time color customization with +12 premium palettes
- ✨ **Reveal Animations**: Intersection Observer based "Fade-in-ups" for premium scrolling
- 🌌 **Aurora Design**: Dynamic "Glass & Texture" background with theme-aware blend modes
- 📁 **Legal Ready**: Privacy and Terms templates included (MDX based)
- ⚙️ **Single-file configuration** (`src/site-config.ts`) and Cal.com integration
- 📋 **Dev Tools**: Integrated "Copy as Config" and "Reset" features for faster branding
- 🌙 **Persistent Dark/Light toggle** via localStorage
- ♿ **WCAG AA Compliant**: Enhanced ARIA labels, focus management, and `prefers-reduced-motion` support
- 🛡️ **Hardened Infrastructure**: Native Cloudflare Pages `_headers` (HSTS, CSP, X-Frame-Options) and `security.txt` support
- 📱 **PWA-ready** with manifest and icons
- 🤖 **Advanced SEO Engine**: Direct JSON-LD schema injection for FAQ and Services
- 📝 **Content Layer API** for Projects, Blog, Services, Testimonials & FAQs
- 📬 **Contact Form**: Real backend integration ready (Formspree, Cloudflare Forms, etc.)
- 🧠 **GEO Optimized**: `llms.txt` included for AI search engine discoverability
- 📄 **Paginated Content**: `/projects/page/[page]` and `/blog/page/[page]` with configurable items per page
- ♿ **Reduced Motion**: Full `prefers-reduced-motion` support — disables animations for vestibular disorders
- 🌍 **i18n Ready**: Translation system with ES/EN dictionaries (`src/i18n.ts`)

---

## 🗂️ Project Structure

```
/
├── _docs/                  # 📄 Documentation Portal (open index.html!)
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── llms.txt            # 🧠 AI search engine optimization
│   └── site.webmanifest
├── src/
│   ├── components/
│   │   ├── sections/       # Page sections (Hero, Expertise, ContactCTA...)
│   │   └── ui/             # Reusable UI components (Button, Card, SEO...)
│   ├── content/            # Content collections (MDX files)
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── testimonials/
│   │   └── faq/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── 404.astro
│   │   └── 500.astro
│   ├── styles/
│   │   └── global.css      # CSS variables for themes
│   └── site-config.ts      # ⭐ MAIN CONFIGURATION FILE
├── astro.config.mjs
├── tailwind.config.mjs
└── CHANGELOG.md
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js `22+`
- pnpm `9+` (`npm install -g pnpm`)

### Installation

```bash
# Clone or download the template
git clone https://github.com/yourusername/minimalist-portfolio.git
cd minimalist-portfolio

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## ⚙️ Configuration

**All template customization starts in one file:**

```
src/site-config.ts
```

Open `_docs/index.html` in your browser to access the complete Documentation Portal.

### Quick Personalization Checklist

1. Edit `src/site-config.ts` — set your name, email, social links, and SEO data
2. Replace `public/favicon.svg` — your brand mark
3. Replace `public/og-image.jpg` — social sharing image (1200×630px)
4. Edit content in `src/content/` — add your real projects, blog posts, services
5. *(Optional)* Set `contact.formEndpoint` in `site-config.ts` for real form submissions

---

The design system uses **HSL format** (`H S% L%`) for all tokens.

For maximum quality, our **Adaptive Color System** allows you to set different tones for light and dark modes:

```typescript
// src/site-config.ts
brandColor: {
  light: { primary: "152 70% 38%", foreground: "0 0% 100%" },
  dark: { primary: "152 70% 58%", foreground: "0 0% 100%" }
}
```

> [!TIP]
> Use the **ThemePicker** (floating palette icon in dev mode) to experiment with colors. Use the **Copy** button to get the perfect HSL codes for your configuration!

---

## 📝 Content Collections

| Collection | Path | Description |
|---|---|---|
| `projects` | `src/content/projects/*.mdx` | Portfolio case studies |
| `blog` | `src/content/blog/*.mdx` | Blog articles |
| `services` | `src/content/services/*.mdx` | Services / offering pages |
| `testimonials` | `src/content/testimonials/*.json` | Client testimonials |
| `faq` | `src/content/faq/*.json` | FAQ accordion items |

---

## 🚀 Deployment

### Cloudflare Pages (Recommended)

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

Connect your GitHub repo to [Cloudflare Pages](https://pages.cloudflare.com/) and set:
- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Node version:** `22`

### Environment Variables (optional)

Copy `.env.example` to `.env` and configure as needed:

```bash
cp .env.example .env
```

See [`.env.example`](.env.example) for available options including contact form endpoints and analytics providers.

---

## 📊 Analytics Integration

This template is analytics-ready but privacy-respecting — **no tracking scripts are included by default**.

### Supported Providers (configure via `.env`)

| Provider | Type | Setup |
|---|---|---|
| **Plausible** | Privacy-friendly | Add script tag to `BaseLayout.astro` head |
| **Umami** | Self-hosted, open-source | Same as Plausible — swap the script URL |
| **Cloudflare Web Analytics** | Zero-JS, server-side | Enable in your Cloudflare dashboard — no code changes needed |

### Recommended: Cloudflare Web Analytics

The easiest option — zero JavaScript added to your pages. Just enable it in your [Cloudflare Dashboard](https://dash.cloudflare.com/) > Analytics > Web Analytics.

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Astro](https://astro.build) | 6.1+ | Framework |
| [Tailwind CSS](https://tailwindcss.com) | 3.x | Styling |
| [Fontsource](https://fontsource.org/) | Latest | Local-hosted variable fonts (Privacy & Speed) |
| [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations/integrations-guide/cloudflare/) | 13.x | Adapter |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations/integrations-guide/sitemap/) | 3.x | SEO Sitemap |
| [astro-icon](https://github.com/natemoo-re/astro-icon) | latest | Icon system |
| [@iconify-json/ph](https://icon-sets.iconify.design/ph/) | latest | Phosphor icons |
| [@vite-pwa/astro](https://github.com/vite-pwa/astro) | latest | PWA with offline support |

---

## 📁 Troubleshooting

### Dev server crashes (Cloudflare worker error)

```bash
# Clear Vite and Astro caches
rm -rf .astro node_modules/.vite && pnpm dev
```

### New CommonJS dependency breaks the build

Add it to `ssr.noExternal` in `astro.config.mjs`:

```js
vite: {
  ssr: {
    noExternal: ['your-package-name'],
  },
},
```

### Contact form doesn't send?

Set `contact.formEndpoint` in `src/site-config.ts` to a real backend URL:
- **Formspree**: `https://formspree.io/f/YOUR_ID`
- **Cloudflare Forms**: Your Worker URL
- Leave empty to show a config hint on the contact page

---

## 📄 License

MIT License — free for personal and commercial use.

---

---

Made with ♥ by [Zutra.agency](https://zutra.agency) using [Astro](https://astro.build) + [Cloudflare](https://cloudflare.com)

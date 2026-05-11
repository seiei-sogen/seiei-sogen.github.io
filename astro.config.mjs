import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';
import astroPwa from '@vite-pwa/astro';
import { siteConfig } from './src/site-config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    icon(),
    astroPwa({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: {
        name: siteConfig.site.name,
        short_name: siteConfig.site.name,
        description: siteConfig.seo.defaultDescription,
        theme_color: siteConfig.seo.themeColor.dark,
        background_color: siteConfig.seo.themeColor.dark,
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  site: siteConfig.site.url,
  vite: {
    resolve: {
      alias: {
        debug: '/src/utils/debug-mock.js',
      },
    },
    ssr: {
      noExternal: ['astro-icon'],
      external: ['node:buffer'],
    },
  },
});

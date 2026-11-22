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
    // public/ files are not crawled by the sitemap integration
    sitemap({
      customPages: [
        new URL('fukan_zazen_gi/', siteConfig.site.url).href,
        new URL('et-cetera/', siteConfig.site.url).href,
        new URL('et-cetera/code-vipassana/', siteConfig.site.url).href,
        new URL('et-cetera/quaternion/', siteConfig.site.url).href,
        new URL('et-cetera/quaternion/double-cover/', siteConfig.site.url).href,
        new URL('et-cetera/quaternion/euler/', siteConfig.site.url).href,
        new URL('et-cetera/quaternion/hypersphere/', siteConfig.site.url).href,
        new URL('et-cetera/kenron/', siteConfig.site.url).href,
        new URL('et-cetera/kenron/natural-transformation/', siteConfig.site.url).href,
        new URL('et-cetera/designing-data-intensive-applications-2nd/', siteConfig.site.url).href,
        // 章のページ（apps/src/topics/designing-data-intensive-applications-2nd/chapters.ts の slug）
        ...['ch1-2', 'ch1-3', 'ch1-4', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'ch9'].map(
          (slug) =>
            new URL(`et-cetera/designing-data-intensive-applications-2nd/${slug}/`, siteConfig.site.url)
              .href
        ),
      ],
    }),
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
        // /et-cetera/ は別アプリ（apps/ のビルド成果物を public/ に同梱）。プリキャッシュせず、
        // ナビゲーションをこのサイトの index.html にフォールバックさせない
        globIgnores: ['et-cetera/**'],
        navigateFallbackDenylist: [/^\/et-cetera\//],
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

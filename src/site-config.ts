/**
 * siteConfig - Centralized configuration for the portfolio template.
 * Edit this file to customize your brand, SEO, navigation, and profile.
 */

export const siteConfig = {
  // 1. Core Configuration (Essential for Astro, Sitemaps, and RSS)
  site: {
    url: 'https://seiei-sogen.github.io/', // ⭐ Replace with your real domain before publishing
    lang: 'ja', // HTML lang attribute and i18n: 'es' | 'en' | 'pl' (Spanish, English, Polish)
    locale: 'ja-JP', // Date format (e.g., es-CL, en-US, pl-PL)
    name: 'seiei-sogen.dev', // Brand name (appears in logo and copyright)
    favicon: '/favicon.svg', // Browser logo (in public/)
  },

  // 2. Brand and Profile Information (Change this and the entire site updates)
  profile: {
    name: 'seiei-sogen',
    role: 'フロントエンドデベロッパー & UI デザイナー',
    headline: 'ミニマルなアプローチで Web の未来を作る。',
    bio: '約 11 年の Web 開発経験を持つフリーランスエンジニアです。Next.js / React / TypeScript を中心としたフロントエンドを軸に、Rust や Hono などバックエンドにも領域を広げ、要件の整理から設計・実装・改善までを一貫して推進します。「価値のあるソフトウェアを早く継続的に提供する」というアジャイル原則を行動指針に、お客様に持続的に価値を届けることを大事にしています。',
    avatar: '/images/avatar.webp', // Path from public/
    heroImage: '/src/assets/images/hero-portrait.webp',
  },

  // 3. SEO and Metadata
  seo: {
    defaultDescription:
      '聖永宗玄 / Software Engineer。Next.js / React / TypeScript を中心にフロントエンドを軸足とし、Rust や Hono などバックエンドにも領域を広げて、要件整理から実装・改善までを一貫して推進するフリーランスエンジニアのポートフォリオ。',
    ogImage: '/og-image.png', // Ideally 1200x630px
    twitterHandle: '@seiei_sogen',
    themeColor: {
      dark: '#09090b',
      light: '#fafafa',
    },
  },

  // 4. Collection Configuration (Pagination)
  content: {
    projectsPerPage: 6,
    postsPerPage: 4,
  },

  // 5. UI Options (Toggles)
  ui: {
    enableViewTransitions: true, // Allows disabling if client doesn't want them
    showThemePicker: true, // ⭐ Shows floating color picker (useful for testing)
    showBuyBanner: false, // ⭐ Shows 'Buy Template' banner (hide for final client)
    enableCustomCursor: false, // ⭐ Activates premium interactive cursor
    showBackgroundPattern: true, // ⭐ Shows dot pattern in background (false = clean background)
    showBackgroundOrbs: true, // ⭐ Shows colored orbs in background (false = no aurora/blobs)
    brandColor: {
      light: { primary: '230 70% 52%', foreground: '0 0% 100%' },
      dark: { primary: '230 75% 68%', foreground: '0 0% 100%' },
    },
  },

  // 5.1 Theme Configuration (Dark/Light Mode)
  theme: {
    // If false, the user CANNOT change the theme (toggle hidden)
    // and defaultMode is enforced ignoring browser preferences
    allowToggle: true,
    // 'light' or 'dark' — default and permanent theme if allowToggle is false
    defaultMode: 'dark',
  },

  // 5.5 Header/Logo Configuration
  header: {
    // Use 'text' for text name (site.name), 'svg' for SVG logo, or 'image' for image
    logoType: 'text', // 'text' | 'svg' | 'image'
    // If logoType is 'svg', set the path to the SVG file in public/ (e.g., '/logo.svg')
    logoSvg: '/logo.svg',
    // If logoType is 'image', set the path to the image (e.g., '/images/logo.png')
    logoImage: '',
    // Alt text for the logo (accessibility)
    logoAlt: 'Logo',
  },

  // 5.6 Footer/Logo Configuration
  footer: {
    // Use 'text' for text name (site.name), 'svg' for SVG logo, or 'image' for image
    logoType: 'text', // 'text' | 'svg' | 'image'
    // If logoType is 'svg', set the path to the SVG file in public/ (e.g., '/logo.svg')
    logoSvg: '/logo.svg',
    // If logoType is 'image', set the path to the image (e.g., '/images/logo.png')
    logoImage: '',
    // Alt text for the logo (accessibility)
    logoAlt: 'Logo',
    text: 'v2.9.0',
  },

  // 6. Main Navigation
  navigation: [
    { name: 'nav.home', href: '/' },
    // { name: 'nav.projects', href: '/projects' },
    // { name: 'nav.services', href: '/services' },
    { name: 'nav.blog', href: '/blog' },
    { name: 'nav.zenn', href: 'https://zenn.dev/purenium' },
    // { name: 'nav.contact', href: '/contact' },
  ],

  // 7. Legal Links (Footer)
  legal: [
    { name: 'legal.privacy', href: '/legal/privacy' },
    { name: 'legal.terms', href: '/legal/terms' },
    { name: 'legal.changelog', href: '/changelog' },
  ],

  // 7. Social Media and Contact
  socials: [
    {
      name: 'GitHub',
      href: 'https://github.com/seiei-sogen',
      icon: 'ph:github-logo-duotone',
      showInHeader: true,
    },
    // {
    //   name: 'LinkedIn',
    //   href: 'https://linkedin.com/in/yourusername',
    //   icon: 'ph:linkedin-logo-duotone',
    //   showInHeader: true,
    // },
    {
      name: 'Twitter / X',
      href: 'https://twitter.com/seiei_sogen',
      icon: 'ph:twitter-logo-duotone',
      showInHeader: false, // Will only appear in the footer
    },
    {
      name: 'Zenn',
      href: 'https://zenn.dev/purenium',
      icon: 'ph:pen-nib-duotone',
      showInHeader: false,
    },
  ],
  contact: {
    email: 'lesilluminations0@gmail.com',
    calCom: 'https://cal.com/yourusername', // Very useful for freelancers
    formEndpoint: '', // ⭐ Formspree/Cloudflare Forms URL (e.g., "https://formspree.io/f/xzyabc")
  },
};

/**
 * NOTE ABOUT COLORS AND TYPOGRAPHY:
 * - Colors: Managed via CSS variables in 'src/styles/global.css'.
 * - Typography: Configured in 'tailwind.config.mjs' and 'src/layouts/BaseLayout.astro'.
 */

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://irfc.com',
  integrations: [
    sitemap({
      // 设计稿 demo 页不进 sitemap（内部评审用，非对外内容）
      filter: (page) => !page.includes('/demo/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en', 'zh', 'ja', 'ko', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

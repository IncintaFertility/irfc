// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://irfc.com',
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

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://irfc.com',
  integrations: [
    // 排除提交成功后的薄确认页（en + zh-hant），避免无意义的页面进 sitemap
    sitemap({
      filter: (page) =>
        !page.includes('/appointment/success/') &&
        !page.includes('/contact/success/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    // en 为默认语言，无前缀；繁體中文挂在 /zh-hant/ 下。
    // 简体（zh / zh-CN）当前不做，故不在 locales 内。
    locales: ['en', 'zh-hant'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

/**
 * 已產出繁體中文版本的路由。
 * 階段性上線：先把核心頁加入集合，隨翻譯進度擴充。
 * - 精確路徑：首頁、關於、團隊、地點、各療程、諮詢、預約、聯絡、部落格樞紐
 * - 前綴：/standards/（6 個標準樞紐頁）、/blog/（部落格文章）
 * 未翻譯的頁面在繁體模式下會導回英文版，避免 404。
 */
import { localizePath, stripLocale, type Locale } from './index';

const translatedRoutes = new Set<string>([
  '/',
  '/about',
  '/team',
  '/locations',
  '/contact',
  '/appointment',
  '/consultation',
  '/services/ivf',
  '/services/iui',
  '/services/egg-freezing',
  '/services/pgt',
  '/services/icsi',
  '/services/recurrent-pregnancy-loss',
  '/services/donors-surrogacy',
  '/services/lgbtqia',
]);

const translatedPrefixes = new Set<string>(['/standards/', '/blog/']);

export function isTranslated(href: string): boolean {
  if (translatedRoutes.has(href)) return true;
  return Array.from(translatedPrefixes).some((p) => href === p || href.startsWith(p));
}

/** 內部連結：繁體模式下指向對應繁體頁；未翻譯則回英文版（不 404） */
export function localeHref(href: string, locale: Locale): string {
  if (locale === 'en') return href;
  return isTranslated(href) ? localizePath(href, 'zh-hant') : href;
}

/** 語言切換器：切到繁體時若當前頁未翻譯，則停留在英文版 */
export function switchLocale(pathname: string, target: Locale): string {
  if (target === 'en') return stripLocale(pathname) || '/';
  const base = stripLocale(pathname);
  return isTranslated(base) ? '/zh-hant' + (base === '/' ? '' : base) : (base || '/');
}

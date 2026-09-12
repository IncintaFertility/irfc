/**
 * 已產出繁體中文版本的路由。
 * 階段性上線：先把核心頁加入集合，隨翻譯進度擴充。
 * - 精確路徑：首頁、關於、團隊、地點、各療程、諮詢、預約、聯絡、部落格樞紐
 *              法律/政策 7（privacy/terms/accessibility/faq/insurance/financing/patient-resources）
 *              品牌信任/診所 3（testimonials/why-irfc/international-patients）
 *              臨床/流程 3（outcomes/technology/patient-journey）
 * - 前綴：/blog/（部落格文章）
 * 未翻譯的頁面在繁體模式下會導回英文版，避免 404。
 * 注意：/standards/ 暫不列入——6 個標準樞紐頁尚未出繁體版，列入會導致切換器 404。
 *       標準頁翻譯完成後再重新加入 translatedPrefixes。
 */
import { localizePath, stripLocale, type Locale } from './index';

const translatedRoutes = new Set<string>([
  '/',
  '/about',
  '/team',
  '/team/dr-james-lin',
  '/team/dr-tiffanny-jones',
  '/team/dr-zitao-liu',
  '/team/dr-yufen-xie',
  '/team/hyang-park',
  '/team/lily-hao',
  '/team/kelly-zhao',
  '/locations',
  '/contact',
  '/appointment',
  '/consultation',
  '/services',
  '/services/ivf',
  '/services/iui',
  '/services/egg-freezing',
  '/services/pgt',
  '/services/icsi',
  '/services/recurrent-pregnancy-loss',
  '/services/donors-surrogacy',
  '/services/lgbtqia',
  '/privacy',
  '/terms',
  '/accessibility',
  '/faq',
  '/insurance',
  '/financing',
  '/patient-resources',
  '/patient-portal',
  '/testimonials',
  '/why-irfc',
  '/international-patients',
  '/outcomes',
  '/technology',
  '/patient-journey',
  '/conditions/pcos',
  '/conditions/age-related-infertility',
  '/conditions/endometriosis',
  '/conditions/low-ovarian-reserve',
  '/conditions/male-factor',
  '/conditions/unexplained-infertility',
  '/standards/collective-expertise',
  '/standards/precision-personalization',
  '/standards/laboratory-excellence',
  '/standards/privacy-transparency',
  '/standards/art-of-care',
  '/standards/care-within-reach',
  '/blog',
]);

const translatedPrefixes = new Set<string>(['/blog/']);

export function isTranslated(href: string): boolean {
  // 正規化尾端斜線：/testimonials/ 與 /testimonials 視為同一路由
  const norm = href === '/' ? '/' : href.replace(/\/+$/, '');
  if (translatedRoutes.has(norm)) return true;
  return Array.from(translatedPrefixes).some((p) => {
    const pn = p.replace(/\/+$/, '');
    return norm === pn || norm.startsWith(pn + '/');
  });
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

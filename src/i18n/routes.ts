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
  '/appointment',
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

/**
 * 內部連結：繁體模式下指向對應繁體頁；未翻譯則回英文版（不 404）。
 * 統一補尾端斜線（與 canonical 規範形態對齊），避免 GSC 內鏈重複計數與權重分散。
 * 排除：根「/」、含副檔名(資源)、錨點、查詢；外鏈(含「.」)不動。
 */
export function localeHref(href: string, locale: Locale): string {
  // 先拆出錨點 / 查詢，僅對路徑部分做 locale 轉換與補斜線
  const hashIdx = href.indexOf('#');
  const qIdx = href.indexOf('?');
  const splitIdx = Math.min(hashIdx >= 0 ? hashIdx : Infinity, qIdx >= 0 ? qIdx : Infinity);
  const path = splitIdx === Infinity ? href : href.slice(0, splitIdx);
  const tail = splitIdx === Infinity ? '' : href.slice(splitIdx);
  let p = locale === 'en' ? path : (isTranslated(path) ? localizePath(path, 'zh-hant') : path);
  if (p !== '/' && !p.includes('.') && !p.endsWith('/')) p += '/';
  return p + tail;
}

/** 語言切換器：切到繁體時若當前頁未翻譯，則停留在英文版；同時補尾端斜線（首頁 / 與 /zh-hant 保持不變） */
export function switchLocale(pathname: string, target: Locale): string {
  if (target === 'en') {
    const e = stripLocale(pathname) || '/';
    return e !== '/' && !e.endsWith('/') ? e + '/' : e;
  }
  const base = stripLocale(pathname);
  let t = isTranslated(base) ? '/zh-hant' + (base === '/' ? '' : base) : (base || '/');
  if (t !== '/' && t !== '/zh-hant' && !t.endsWith('/')) t += '/';
  return t;
}

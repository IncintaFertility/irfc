/**
 * IRFC i18n 单一事实来源
 * ───────────────────────────────────────────────────────────
 * 仅支持 en（默认）与 zh-hant（繁體中文）。
 * - locales / defaultLocale：与 astro.config.mjs 的 i18n 保持一致。
 * - ui：全局 UI chrome 字符串（导航 / 页脚 / 表单 / CTA / 通用标签）。
 * - linkLabels：页面链接标签（页脚、导航下拉、面包屑共用，避免重复翻译）。
 * 页面正文（标准 / 博客 / 各页文案）放在各自数据文件里的 zhHant 字段。
 */

export const locales = ['en', 'zh-hant'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  'zh-hant': { label: '繁體中文', short: 'ZH', htmlLang: 'zh-Hant', ogLocale: 'zh_Hant' },
};

// ── 全局 UI chrome 字典 ──────────────────────────────────────
type UIDict = Record<string, string>;
export const ui: Record<Locale, UIDict> = {
  en: {
    'nav.cta': 'Schedule a Consultation',
    'nav.cta.short': 'Schedule',
    'std.theStandard': 'The Standard',
    'std.explore': 'Explore this standard',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.standards': 'Our Standards',
    'footer.locations': 'Locations',
    'footer.tagline': 'Helping families grow across Southern California.',
    'footer.rights': 'All rights reserved.',
    'footer.disclaimer':
      'The information on this website is for general informational purposes only and does not constitute medical advice. Please consult with a qualified healthcare provider regarding your individual circumstances.',
    'lang.switch': 'Language',
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.email': 'Email Address',
    'form.emailHint': 'Or provide a phone number below.',
    'form.phone': 'Phone Number',
    'form.location': 'Preferred Location',
    'form.locationPlaceholder': 'Select a location',
    'form.visitType': 'Visit Type',
    'form.visitTypePlaceholder': 'Select a visit type',
    'form.language': 'Preferred Language',
    'form.submit': 'Submit Request',
    'form.successTitle': 'Request received.',
    'form.successBody':
      'A member of our care team will contact you within one business day to confirm a time. We look forward to meeting you.',
    'form.errorBody':
      'Something went wrong sending your request. Please call us instead — we’ll schedule you right away.',
    'form.note':
      'We typically respond within one business day. This form collects your contact details only — your medical history is gathered securely through the patient portal after registration.',
    'floating.whatsapp': 'WhatsApp Us',
    'floating.call': 'Call',
    'common.learnMore': 'Learn More',
    'common.readMore': 'Read More',
    'common.backTo': 'Back to',
  },
  'zh-hant': {
    'nav.cta': '預約諮詢',
    'nav.cta.short': '預約',
    'std.theStandard': '標準',
    'std.explore': '探索此標準',
    'footer.services': '服務項目',
    'footer.company': '關於機構',
    'footer.standards': '我們的標準',
    'footer.locations': '診所地點',
    'footer.tagline': '陪伴南加州家庭圓滿成家。',
    'footer.rights': '版權所有。',
    'footer.disclaimer':
      '本網站資訊僅供一般參考，不構成醫療建議。如有個別情況，請諮詢合格醫療專業人員。',
    'lang.switch': '語言',
    'form.firstName': '名字',
    'form.lastName': '姓氏',
    'form.email': '電子郵件',
    'form.emailHint': '或在下方填寫電話號碼。',
    'form.phone': '電話號碼',
    'form.location': '偏好診所',
    'form.locationPlaceholder': '請選擇診所',
    'form.visitType': '諮詢方式',
    'form.visitTypePlaceholder': '請選擇諮詢方式',
    'form.language': '偏好語言',
    'form.submit': '送出申請',
    'form.successTitle': '已收到您的申請。',
    'form.successBody': '我們的醫療團隊將於一個工作日內與您聯繫，確認諮詢時間。期待與您相見。',
    'form.errorBody': '送出申請時發生問題，請直接致電我們——我們會立即為您安排。',
    'form.note':
      '我們通常於一個工作日內回覆。此表單僅收集您的聯絡資料——您的病史將於註冊後經由病人專區安全地建立。',
    'floating.whatsapp': 'WhatsApp 聯絡',
    'floating.call': '致電',
    'common.learnMore': '了解更多',
    'common.readMore': '閱讀更多',
    'common.backTo': '返回',
  },
};

export function t(locale: Locale, key: string): string {
  return ui[locale]?.[key] ?? ui.en[key] ?? key;
}

// ── 頁面連結標籤（頁腳 / 導航下拉 / 麵包屑共用）──────────────
export const linkLabels: Record<Locale, Record<string, string>> = {
  en: {
    '/': 'Home',
    '/about': 'About IRFC',
    '/team': 'Our Team',
    '/locations': 'Locations',
    '/services': 'Treatments & Services',
    '/services/ivf': 'In Vitro Fertilization (IVF)',
    '/services/iui': 'Intrauterine Insemination (IUI)',
    '/services/egg-freezing': 'Egg Freezing & Fertility Preservation',
    '/services/pgt': 'Preimplantation Genetic Testing (PGT)',
    '/services/icsi': 'Intracytoplasmic Sperm Injection (ICSI)',
    '/services/recurrent-pregnancy-loss': 'Recurrent Pregnancy Loss',
    '/services/donors-surrogacy': 'Donors & Surrogacy',
    '/services/lgbtqia': 'LGBTQIA+ Family Building',
    '/standards': 'The INCINTA Standard',
    '/financing': 'Financing',
    '/insurance': 'Insurance & Coverage',
    '/consultation': 'Phone & Online Consultation',
    '/patient-resources': 'Patient Resources',
    '/testimonials': 'Patient Stories',
    '/contact': 'Contact',
    '/appointment': 'Appointment',
    '/faq': 'FAQ',
    '/patient-journey': 'Patient Journey',
    '/conditions': 'Conditions',
    '/technology': 'Lab Technology',
    '/outcomes': 'Success Rates',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms of Use',
    '/accessibility': 'Accessibility',
    '/patient-portal': 'Patient Portal',
    '/international-patients': 'International Patients',
    '/why-irfc': 'Why Choose IRFC',
    '/blog': 'Fertility Insights',
  },
  'zh-hant': {
    '/': '首頁',
    '/about': '關於 IRFC',
    '/team': '醫療團隊',
    '/locations': '診所地點',
    '/services': '療程與服務',
    '/services/ivf': '體外受精 (IVF)',
    '/services/iui': '宮腔內人工授精 (IUI)',
    '/services/egg-freezing': '凍卵與生育保存',
    '/services/pgt': '胚胎著床前基因檢測 (PGT)',
    '/services/icsi': '卵胞質內單精子注入 (ICSI)',
    '/services/recurrent-pregnancy-loss': '反覆流產',
    '/services/donors-surrogacy': '捐卵與代理孕母',
    '/services/lgbtqia': 'LGBTQIA+ 成家',
    '/standards': 'INCINTA 的標準',
    '/financing': '費用與補助',
    '/insurance': '保險與給付',
    '/consultation': '電話與線上諮詢',
    '/patient-resources': '病人資源',
    '/testimonials': '病人故事',
    '/contact': '聯絡我們',
    '/appointment': '預約',
    '/faq': '常見問題',
    '/patient-journey': '療程旅程',
    '/conditions': '適應症',
    '/technology': '實驗室技術',
    '/outcomes': '成功率',
    '/privacy': '隱私權政策',
    '/terms': '使用條款',
    '/accessibility': '無障礙宣告',
    '/patient-portal': '病人專區',
    '/international-patients': '國際病人',
    '/why-irfc': '為何選擇 IRFC',
    '/blog': '生育洞察',
  },
};

export function linkLabel(locale: Locale, href: string): string {
  return linkLabels[locale]?.[href] ?? linkLabels.en[href] ?? href;
}

// ── 路徑 / locale 助手 ──────────────────────────────────────
const localeSet = new Set<string>(locales);
export function isLocale(seg: string | undefined): seg is Locale {
  return !!seg && localeSet.has(seg);
}

/** 從路徑判斷當前 locale（en 預設、無前綴） */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && isLocale(seg) && seg !== defaultLocale) return seg;
  return defaultLocale;
}

/** 去掉路徑中的 locale 前綴，回到 en 基準路徑（保留尾端斜線，與實際網址一致） */
export function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isLocale(parts[0])) return '/' + parts.slice(1).join('/');
  return pathname;
}

/** 把某路徑切換到指定 locale（保持同頁） */
export function localizePath(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname) || '/';
  if (locale === defaultLocale) return base;
  return '/' + locale + (base === '/' ? '' : base);
}

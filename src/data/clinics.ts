// 诊所城市页单一数据源（SEO：hub-and-spoke 的 spoke 内容）
// 合并 Locations.astro 内联 locations 数组 + testimonials.ts 的 clinicName/sources/key，
// 并补：slug、唯一本地文案、地标路线、现场服务、geo 坐标、sameAs(真实 GBP)、本地团队、本地 FAQ。
// 注意：localTeamSlugs（医生-诊所映射）为暂定，发布前请用户核对。
import { clinics as reviewClinics, sourcesOf, type ClinicKey } from './testimonials';
import { SITE_URL } from '../config/brand';

export interface LocationFaq {
  q: string;
  qZh: string;
  a: string;
  aZh: string;
}

export interface ClinicLocation {
  key: ClinicKey;
  slug: string;
  city: string;
  cityState: string;
  address: string;
  region: string;
  regionZh: string;
  phone: string; // '(424) 212-4087'
  phoneHref: string; // '+14242124087'
  hours: string;
  hoursZh: string;
  geo: { lat: number; lng: number };
  /** 真实 Google 商家页 URL（NAP 对齐用）。无公开 GBP 则省略。 */
  sameAs?: string;
  heroImage: string;
  introEn: string;
  introZh: string;
  landmarksEn: { label: string; text: string }[];
  landmarksZh: { label: string; text: string }[];
  services: string[];
  /** 医生-诊所映射（暂定，待核对） */
  localTeamSlugs: string[];
  faqs: LocationFaq[];
}

/** 服务 slug → 显示名（全名优先，符合项目术语规则） */
export const SERVICE_LABELS: Record<string, { en: string; zh: string }> = {
  ivf: { en: 'In Vitro Fertilization (IVF)', zh: '體外受精（IVF）' },
  iui: { en: 'Intrauterine Insemination (IUI)', zh: '宮內人工授精（IUI）' },
  'egg-freezing': { en: 'Egg Freezing', zh: '卵子凍存' },
  pgt: { en: 'Preimplantation Genetic Testing (PGT)', zh: '胚胎著床前基因檢測（PGT）' },
  icsi: { en: 'Intracytoplasmic Sperm Injection (ICSI)', zh: '卵胞質內單精子注入（ICSI）' },
  'donors-surrogacy': { en: 'Egg Donation & Surrogacy', zh: '捐卵與代理孕母' },
  'recurrent-pregnancy-loss': { en: 'Recurrent Pregnancy Loss', zh: '反覆流產' },
  lgbtqia: { en: 'LGBTQ+ Family Building', zh: 'LGBTQ+ 成家' },
};

export const clinicLocations: ClinicLocation[] = [
  {
    key: 'torrance',
    slug: 'torrance',
    city: 'Torrance',
    cityState: 'Torrance, CA 90503',
    address: '21545 Hawthorne Blvd, Pavilion B',
    region: 'Greater Los Angeles',
    regionZh: '大洛杉磯地區',
    phone: '(424) 212-4087',
    phoneHref: '+14242124087',
    hours: 'Mon–Fri 7:00 AM – 5:00 PM · Sat 8:00 AM – 12:00 PM · Sun Closed',
    hoursZh: '週一至週五 7:00 AM – 5:00 PM · 週六 8:00 AM – 12:00 PM · 週日 休診',
    geo: { lat: 33.827, lng: -118.3396 },
    sameAs: 'https://www.google.com/maps/search/?api=1&query=Incinta+Fertility+Center+Torrance+CA',
    heroImage: '/images/locations/network-welcome-torrance.jpg',
    introEn:
      "IRFC's Torrance clinic brings expert fertility care to the South Bay, serving families from Torrance, Redondo Beach, Manhattan Beach, Palos Verdes, and greater Los Angeles' beach cities. Located at 21545 Hawthorne Blvd in Pavilion B, the clinic offers consultations, monitoring, and coordinated treatment planning in a calm, welcoming setting just off the 405 and 91 freeways. While advanced embryo work is performed at our Irvine and Corona laboratories, Torrance patients receive the same connected standard of care — your physician, care coordinator, and lab team share every case. Mandarin-speaking coordinators are available, and parking is on-site. Whether you are beginning with a fertility evaluation, considering IUI or IVF, or continuing care close to home, our Torrance team helps you move forward with clarity.",
    introZh:
      'IRFC 的 Torrance 診所將專業的生育照護帶到南海灣，服務來自 Torrance、Redondo Beach、Manhattan Beach、Palos Verdes 以及大洛杉磯海濱城市的家庭。診所位於 21545 Hawthorne Blvd 的 Pavilion B，提供諮詢、監測與協調性的治療規劃，環境平靜溫馨，鄰近 405 與 91 號高速公路。進階的胚胎作業在 Irvine 與 Corona 的實驗室進行，但 Torrance 的病人同樣享有那套連結的照護標準——您的醫師、照護協調員與實驗室團隊共同參與每一個病例。我們提供國語（中文）協調員，並設有現場停車。不論您正要開始生育評估、考慮 IUI 或 IVF，或想在住家附近持續療程，Torrance 團隊都協助您清晰前行。',
    landmarksEn: [
      { label: 'By car', text: 'Off the 405 at Hawthorne Blvd, about 5 minutes from Del Amo Fashion Center.' },
      { label: 'Nearby', text: 'Minutes from Torrance Memorial Medical Center and the South Bay Galleria.' },
      { label: 'From LAX', text: 'Roughly 15 minutes north via the 405 — convenient for out-of-town and international patients.' },
    ],
    landmarksZh: [
      { label: '開車', text: '由 405 號高速公路 Hawthorne Blvd 出口下，距 Del Amo Fashion Center 約 5 分鐘。' },
      { label: '鄰近', text: '距 Torrance Memorial Medical Center 與 South Bay Galleria 僅數分鐘。' },
      { label: '自 LAX', text: '經 405 號北上約 15 分鐘——對外地與國際病人十分方便。' },
    ],
    services: ['ivf', 'iui', 'egg-freezing', 'pgt', 'icsi'],
    localTeamSlugs: ['dr-tiffanny-jones', 'lily-hao', 'kelly-zhao'],
    faqs: [
      {
        q: 'What happens at my first visit to the Torrance clinic?',
        qZh: '我在 Torrance 診所的首次看診會發生什麼？',
        a: 'You meet with a reproductive endocrinologist for a fertility evaluation and a personalized plan. Monitoring appointments can often be scheduled at this South Bay location for convenience.',
        aZh: '您將與生殖內分泌專科醫師會面，進行生育評估並擬定個人化方案。監測預約常可安排在此南海灣據點，方便就診。',
      },
      {
        q: 'Do you have Mandarin-speaking staff at Torrance?',
        qZh: 'Torrance 有國語（中文）人員嗎？',
        a: 'Yes. Mandarin-speaking care coordinators are available to guide you through consultations, scheduling, and treatment steps.',
        aZh: '有。我們提供國語（中文）照護協調員，協助您走過諮詢、預約與治療步驟。',
      },
      {
        q: 'Where does the embryo lab work happen?',
        qZh: '胚胎實驗室作業在哪裡進行？',
        a: 'Retrieval and lab procedures are performed at our Irvine and Corona centers, which have on-site surgery and IVF laboratories. Your Torrance team coordinates every step.',
        aZh: '取卵與實驗室程序在設有現場手術與 IVF 實驗室的 Irvine 與 Corona 中心進行。您的 Torrance 團隊協調每一個步驟。',
      },
    ],
  },
  {
    key: 'beverly-hills',
    slug: 'beverly-hills',
    city: 'Beverly Hills',
    cityState: 'Los Angeles, CA 90048',
    address: '8635 West 3rd Street, Suite 1170W',
    region: 'Greater Los Angeles',
    regionZh: '大洛杉磯地區',
    phone: '(213) 600-8088',
    phoneHref: '+12136008088',
    hours: 'Mon–Fri 7:00 AM – 5:00 PM · Sat 8:00 AM – 12:00 PM · Sun Closed',
    hoursZh: '週一至週五 7:00 AM – 5:00 PM · 週六 8:00 AM – 12:00 PM · 週日 休診',
    geo: { lat: 34.0736, lng: -118.3791 },
    heroImage: '/images/locations/network-consultation-beverly-hills.jpg',
    introEn:
      "On West 3rd Street in the heart of Beverly Hills, IRFC's Westside clinic offers discreet, convenient fertility consultations and monitoring for patients across Los Angeles — from Century City and West Hollywood to Beverly Hills and Hollywood. The suite at 8635 West 3rd Street places expert reproductive care within minutes of the 10 and 405 freeways. Here you meet with a reproductive endocrinologist to map a personalized plan, with monitoring appointments scheduled around your life. As with every IRFC location, your case is coordinated as one team with our Irvine and Corona laboratories, so nothing is lost in the handoff. Mandarin and Spanish-speaking coordination is available. Begin with a consultation and leave with a clear next step.",
    introZh:
      'IRFC 西區診所位於 Beverly Hills 心臟地帶的 West 3rd Street，為大洛杉磯的病人提供隱私、便利的生育諮詢與監測——服務範圍涵蓋 Century City、West Hollywood、Beverly Hills 與 Hollywood。8635 West 3rd Street 的診間讓專業的生殖照護距 10 號與 405 號高速公路僅數分鐘。在此您將與生殖內分泌專科醫師會面，擬定個人化方案，監測預約也能配合您的生活安排。與每一間 IRFC 據點相同，您的病例與 Irvine、Corona 實驗室組成同一個團隊協調，交接不流失任何資訊。我們提供國語（中文）與西班牙語協調。從一次諮詢開始，帶著清晰的下一步離開。',
    landmarksEn: [
      { label: 'By car', text: 'Half a block south of the 10 Freeway at La Cienega Blvd, with easy access from Beverly Drive.' },
      { label: 'Nearby', text: 'Close to the Cedars-Sinai medical corridor and Beverly Center.' },
      { label: 'From West Hollywood', text: 'About 10 minutes west via the 10 — a short trip for Westside families.' },
    ],
    landmarksZh: [
      { label: '開車', text: '位於 10 號高速公路 La Cienega Blvd 出口以南半個街區，由 Beverly Drive 容易抵達。' },
      { label: '鄰近', text: '靠近 Cedars-Sinai 醫療廊與 Beverly Center。' },
      { label: '自 West Hollywood', text: '經 10 號西行約 10 分鐣——對西區家庭是一段短程。' },
    ],
    services: ['ivf', 'iui', 'egg-freezing', 'pgt'],
    localTeamSlugs: ['dr-zitao-liu', 'lily-hao', 'kelly-zhao'],
    faqs: [
      {
        q: 'Is the Beverly Hills clinic a full IVF center?',
        qZh: 'Beverly Hills 診所是完整的 IVF 中心嗎？',
        a: 'This Westside location focuses on consultations and monitoring. Retrieval and lab procedures are performed at our Irvine and Corona centers, coordinated seamlessly with your Beverly Hills team.',
        aZh: '這間西區據點以諮詢與監測為主。取卵與實驗室程序在 Irvine 與 Corona 中心進行，並與您的 Beverly Hills 團隊無縫協調。',
      },
      {
        q: 'What languages are spoken at this location?',
        qZh: '這個據點說哪些語言？',
        a: 'English, Mandarin Chinese, and Spanish coordination are available to support your visit.',
        aZh: '我們提供英文、國語（中文）與西班牙語協調，協助您的看診。',
      },
      {
        q: 'How do I schedule a consultation?',
        qZh: '我該如何預約諮詢？',
        a: 'Call our main line or request a consultation online. A coordinator will match you with the physician and time that fit your needs.',
        aZh: '請撥打我們的總機或線上提出諮詢。協調員會為您搭配合適的醫師與時段。',
      },
    ],
  },
  {
    key: 'corona',
    slug: 'corona',
    city: 'Corona',
    cityState: 'Corona, CA 92879',
    address: '400 East Rincon Street, Suite 108',
    region: 'Inland Empire',
    regionZh: '內陸帝國',
    phone: '(951) 272-2221',
    phoneHref: '+19512722221',
    hours: 'Mon–Fri 7:00 AM – 5:00 PM · Sat 8:00 AM – 12:00 PM · Sun Closed',
    hoursZh: '週一至週五 7:00 AM – 5:00 PM · 週六 8:00 AM – 12:00 PM · 週日 休診',
    geo: { lat: 33.8667, lng: -117.5664 },
    sameAs: 'https://www.google.com/maps/search/?api=1&query=Reproductive+Fertility+Center+400+E+Rincon+St+Corona+CA+92879',
    heroImage: '/images/locations/network-lab-corona.jpg',
    introEn:
      "In the Inland Empire, IRFC's Corona clinic is a full-service fertility center with on-site surgical and embryology facilities — so most of your care happens under one roof. From 400 East Rincon Street, we serve families across Corona, Riverside, Ontario, and the wider Inland Empire, with easy access from the 91 and 15 freeways. Beyond consultations and monitoring, Corona offers IVF, ICSI, preimplantation genetic testing, egg freezing, and donor or surrogacy coordination, supported by an on-site laboratory and procedure suite. The same embryology team ranked #1 in US IVF success rates in 2016 cares for your cycle here. Mandarin-speaking coordinators and on-site parking make visits straightforward. This is comprehensive care, close to home.",
    introZh:
      '在內陸帝國（Inland Empire），IRFC 的 Corona 診所是一間設有現場手術與胚胎學設施的全方位生育中心——您大部分的照護都在同一屋簷下完成。從 400 East Rincon Street 出發，我們服務 Corona、Riverside、Ontario 與更廣大的內陸帝國地區，鄰近 91 與 15 號高速公路。除了諮詢與監測，Corona 還提供 IVF、ICSI、胚胎著床前基因檢測、卵子凍存，以及捐卵或代理孕母協調，並由現場實驗室與手術套間支援。正是這支在 2016 年全美 IVF 成功率排名第一的胚胎學團隊，在這裡照顧您的週期。我們提供國語（中文）協調員與現場停車，讓看診直接了當。這是在家附近的全方位照護。',
    landmarksEn: [
      { label: 'By car', text: 'At the 91 and 15 interchange, about 10 minutes from the 91 at Main Street.' },
      { label: 'Nearby', text: 'Minutes from Corona Regional Medical Center and the Crossings retail area.' },
      { label: 'From Riverside', text: 'Roughly 20 minutes east via the 91 — a straightforward trip for Inland Empire families.' },
    ],
    landmarksZh: [
      { label: '開車', text: '位於 91 與 15 號高速公路交流道，自 Main Street 的 91 號出口約 10 分鐘。' },
      { label: '鄰近', text: '距 Corona Regional Medical Center 與 Crossings 商圈僅數分鐘。' },
      { label: '自 Riverside', text: '經 91 號東行約 20 分鐘——對內陸帝國家庭是一段順暢的路程。' },
    ],
    services: ['ivf', 'iui', 'egg-freezing', 'pgt', 'icsi', 'donors-surrogacy', 'recurrent-pregnancy-loss'],
    localTeamSlugs: ['dr-tiffanny-jones', 'dr-yufen-xie', 'hyang-park', 'lily-hao'],
    faqs: [
      {
        q: 'Does the Corona clinic have an on-site IVF laboratory?',
        qZh: 'Corona 診所設有現場 IVF 實驗室嗎？',
        a: 'Yes. Corona has an on-site embryology laboratory and procedure suite, so consultations, monitoring, retrieval, and transfer can all happen here.',
        aZh: '有。Corona 設有現場胚胎學實驗室與手術套間，因此諮詢、監測、取卵與植入都可以在這裡完成。',
      },
      {
        q: 'Which treatments are offered at Corona?',
        qZh: 'Corona 提供哪些療程？',
        a: 'IVF, ICSI, PGT, egg freezing, IUI, and donor or surrogacy coordination — a full range of fertility services under one roof.',
        aZh: 'IVF、ICSI、PGT、卵子凍存、IUI，以及捐卵或代理孕母協調——在同一屋簷下提供全方位的生育服務。',
      },
      {
        q: 'Is Mandarin-language coordination available?',
        qZh: '有國語（中文）協調嗎？',
        a: 'Yes. Mandarin-speaking coordinators support Inland Empire families through every step of care.',
        aZh: '有。國語（中文）協調員在照護的每一步支援內陸帝國的家庭。',
      },
    ],
  },
  {
    key: 'irvine',
    slug: 'irvine',
    city: 'Irvine',
    cityState: 'Irvine, CA 92618',
    address: '16300 Sand Canyon Avenue, 9th Floor',
    region: 'Orange County',
    regionZh: '橙縣',
    phone: '(949) 453-8600',
    phoneHref: '+19494538600',
    hours: 'Mon–Fri 7:00 AM – 5:00 PM · Sat 8:00 AM – 12:00 PM · Sun Closed',
    hoursZh: '週一至週五 7:00 AM – 5:00 PM · 週六 8:00 AM – 12:00 PM · 週日 休診',
    geo: { lat: 33.667, lng: -117.7617 },
    sameAs: 'https://www.google.com/maps/search/?api=1&query=Reproductive+Fertility+Center+16300+Sand+Canyon+Ave+Irvine+CA+92618',
    heroImage: '/images/locations/network-welcome-irvine.webp',
    introEn:
      "Our Irvine location is IRFC's Orange County flagship — a dedicated fertility center with a full surgery center and IVF laboratory on-site at 16300 Sand Canyon Avenue. Serving Irvine, Tustin, Newport Beach, and greater Orange County, the clinic brings the complete journey together: consultation, monitoring, retrieval, transfer, and cryopreservation, all in one building with on-site parking. The embryology lab pairs EmbryoScope+ time-lapse monitoring with RI Witness electronic witnessing and the TMRW smart cryo vault. Our medical director and lab leadership practice here, and the same coordinated model connects you to every IRFC location. Mandarin, Spanish, Korean, and Japanese coordination is available. Choose Irvine for the fullest on-site capability in Southern California.",
    introZh:
      '我們的 Irvine 據點是 IRFC 在橙縣的旗艦——一間設有完整手術中心與現場 IVF 實驗室的專屬生育中心，位於 16300 Sand Canyon Avenue。服務 Irvine、Tustin、Newport Beach 與更廣大的橙縣，診所將完整的旅程匯聚一處：諮詢、監測、取卵、植入與冷凍保存，全在同一棟建築、設有現場停車。胚胎學實驗室結合 EmbryoScope+ 連續縮時監測、RI Witness 電子見證系統，以及 TMRW 智慧冷凍庫。我們的醫療總監與實驗室領導在此執業，同一套協調模式也將您連結到每一間 IRFC 據點。我們提供國語（中文）、西班牙語、韓語與日語協調。若要在南加州享有最完整的現場能力，請選擇 Irvine。',
    landmarksEn: [
      { label: 'By car', text: 'Off the 405 and 5 interchange at Sand Canyon Avenue, with easy access across Orange County.' },
      { label: 'Nearby', text: 'Close to Hoag and the Irvine business and medical districts.' },
      { label: 'From John Wayne Airport', text: 'About 20 minutes via the 405 — convenient for traveling patients.' },
    ],
    landmarksZh: [
      { label: '開車', text: '位於 405 與 5 號交流道 Sand Canyon Avenue 出口，便利抵達橙縣各地。' },
      { label: '鄰近', text: '靠近 Hoag 與 Irvine 的商業及醫療園區。' },
      { label: '自 John Wayne 機場', text: '經 405 號約 20 分鐘——對遠道而來的病人十分方便。' },
    ],
    services: ['ivf', 'iui', 'egg-freezing', 'pgt', 'icsi', 'donors-surrogacy', 'recurrent-pregnancy-loss', 'lgbtqia'],
    localTeamSlugs: ['dr-james-lin', 'dr-zitao-liu', 'dr-yufen-xie', 'hyang-park', 'lily-hao'],
    faqs: [
      {
        q: 'Why choose the Irvine clinic?',
        qZh: '為什麼選擇 Irvine 診所？',
        a: 'Irvine is our flagship with a full surgery center and on-site IVF laboratory — consultation, monitoring, retrieval, transfer, and cryopreservation all happen in one building.',
        aZh: 'Irvine 是我們的旗艦，設有完整手術中心與現場 IVF 實驗室——諮詢、監測、取卵、植入與冷凍保存全在同一棟建築完成。',
      },
      {
        q: 'What makes the Irvine lab special?',
        qZh: 'Irvine 的實驗室有何特別之處？',
        a: 'It pairs EmbryoScope+ time-lapse monitoring with RI Witness electronic witnessing and the TMRW smart cryo vault with 24/7 monitoring.',
        aZh: '它結合 EmbryoScope+ 連續縮時監測、RI Witness 電子見證系統，以及具 24/7 監控的 TMRW 智慧冷凍庫。',
      },
      {
        q: 'Which languages are supported at Irvine?',
        qZh: 'Irvine 支援哪些語言？',
        a: 'English, Mandarin Chinese, Spanish, Korean, and Japanese coordination are available.',
        aZh: '我們提供英文、國語（中文）、西班牙語、韓語與日語協調。',
      },
    ],
  },
];

export function getClinic(slug: string): ClinicLocation | undefined {
  return clinicLocations.find((c) => c.slug === slug);
}

/** 生成该城市独立的 MedicalClinic / LocalBusiness JSON-LD（含 geo / openingHours / aggregateRating / sameAs） */
export function buildClinicSchema(loc: ClinicLocation): object {
  const reviewClinic = reviewClinics.find((c) => c.key === loc.key);
  const srcs = reviewClinic ? sourcesOf(reviewClinic) : [];
  const totalCount = srcs.reduce((n, s) => n + s.count, 0);
  const rating =
    srcs.length && totalCount
      ? Number((srcs.reduce((n, s) => n + s.rating * s.count, 0) / totalCount).toFixed(2))
      : undefined;
  const [city, stateZip] = loc.cityState.split(', ');
  const [, postalCode] = stateZip.split(' ');
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    name: `IRFC — ${loc.city}`,
    parentOrganization: { '@type': 'MedicalOrganization', name: 'IRFC' },
    telephone: loc.phoneHref,
    medicalSpecialty: 'Reproductive Medicine',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address,
      addressLocality: city,
      addressRegion: 'CA',
      postalCode,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: loc.geo.lat, longitude: loc.geo.lng },
    url: `${SITE_URL}/locations/${loc.slug}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '12:00',
      },
    ],
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(loc.address + ', ' + loc.cityState)}`,
  };
  if (loc.sameAs) schema.sameAs = loc.sameAs;
  if (rating && totalCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: totalCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return schema;
}

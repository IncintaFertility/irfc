// ════════════════════════════════════════════════════════════
//  The INCINTA Standard — single source of truth
//  Drives: homepage six-standards block, main nav, standard hub pages,
//  and the footer "Our 6 Standards" strip.
//  Edit here once; every surface updates.
// ════════════════════════════════════════════════════════════

export interface RelatedItem {
  href: string;
  label: string;
  /** 繁體中文標籤（人名以外的連結才需要；人名維持原文） */
  labelZh?: string;
  desc?: string;
  /** 繁體中文描述（與 labelZh 配套；未提供則繁體模式不顯示 desc） */
  descZh?: string;
  /** Optional portrait image — when present the related card renders as a team member card */
  photo?: string;
  /** Short bio line shown on the team member card */
  bio?: string;
  /** When true the link points to an external site and opens in a new tab */
  external?: boolean;
}

export interface RelatedGroup {
  heading: string;
  /** 繁體中文群組標題 */
  headingZh?: string;
  items: RelatedItem[];
}

export interface StandardPillar {
  num: string;
  title: string;
  /** 繁體中文標題 */
  titleZh?: string;
  text: string;
  /** 繁體中文說明 */
  textZh?: string;
}

export interface Standard {
  /** Two-digit display number, e.g. "01" */
  number: string;
  /** URL slug used at /standards/<slug> */
  slug: string;
  /** Display title (English site) */
  title: string;
  /** 繁體中文標題 */
  titleZh?: string;
  /** Compact nav title (keep it short: one word or 2-3 words max) */
  navLabel: string;
  /** 繁體中文導航標題 */
  navLabelZh?: string;
  /** Concrete, scannable nav label shown as the primary line in the top nav */
  lead: string;
  /** 繁體中文導語 */
  leadZh?: string;
  /** Supporting paragraph (from homepage copy) */
  text: string;
  /** 繁體中文 supporting paragraph */
  textZh?: string;
  /** Hero / row image */
  image: string;
  /** Longer intro paragraph explaining the standard at IRFC */
  intro: string;
  /** 繁體中文 intro */
  introZh?: string;
  /** Related content pages, clustered by group */
  related: RelatedGroup[];
  /** Optional concrete points that show how the standard shows up in care */
  pillars?: StandardPillar[];
}

export const standards: Standard[] = [
  {
    number: '01',
    slug: 'collective-expertise',
    title: 'Collective expertise',
    titleZh: '集體專業',
    navLabel: 'Our Team',
    navLabelZh: '醫療團隊',
    lead: 'One patient. The expertise of an entire team.',
    leadZh: '一位病人，整個團隊的專業為其守護。',
    text: 'When a patient chooses INCINTA, the strength of our entire team carries that trust—together, we strive for the best possible outcome.',
    textZh: '當您選擇 INCINTA，整個團隊的實力便承接這份信任——我們共同為最佳的療程結果而努力。',
    image: '/images/standards/01-collective-expertise.jpg',
    intro:
      'Expertise at IRFC is never held by a single person. Physicians, embryologists, nurses, and care coordinators work as one unit around your case—so every decision benefits from the full weight of the practice, not just one opinion.',
    introZh:
      '在 IRFC，專業從不僅由單一人員掌握。醫師、胚胎學家、護理師與療程協調師圍繞您的個案共同合作——因此每項決定都匯聚整個團隊的實力，而非僅憑一人之見。',
    related: [
      {
        heading: 'Physician Team',
        headingZh: '醫師團隊',
        items: [
          { href: '/team/dr-james-lin', label: 'James P. Lin, MD', desc: 'Founder & Medical Director', photo: '/images/team/dr-james-lin-circle.png', bio: 'Founder of RFC; 20+ years building it into a Kaiser Center of Excellence.' },
          { href: '/team/dr-tiffanny-jones', label: 'Tiffanny LaTrice Jones, MD', desc: 'Reproductive Endocrinology Specialist', photo: '/images/doctor-tiffanny-jones.webp', bio: 'Patient-centered REI specialist for IVF, genetic testing and preservation.' },
          { href: '/team/dr-zitao-liu', label: 'Zitao Liu, MD', desc: 'Associate Chief Medical Officer', photo: '/images/team/dr-zitao-liu-circle.png', bio: 'Pioneer of mild-stimulation IVF; integrates AI for precise planning.' },
        ],
      },
      {
        heading: 'Embryologists',
        headingZh: '胚胎學家',
        items: [
          { href: '/team/dr-yufen-xie', label: 'Yufen Xie, PhD', desc: 'IVF Laboratory Director', photo: '/images/team/dr-yufen-xie.png', bio: 'Directed the lab ranked #1 in US IVF success rates in 2016.' },
          { href: '/team/hyang-park', label: 'Hyang Park, M.S.', desc: 'IVF Laboratory Supervisor', photo: '/images/team/hyang-park.png', bio: 'Ensures day-to-day excellence of the embryology laboratory.' },
        ],
      },
      {
        heading: 'Nursing Team',
        headingZh: '護理團隊',
        items: [
          { href: '/team/lily-hao', label: 'Lily Hao, MSN, WHNP', desc: 'Nurse Manager', photo: '/images/team/lily-hao.png', bio: 'Women’s Health NP leading compassionate, patient-first nursing.' },
          { href: '/team/kelly-zhao', label: 'Kelly Zhao', desc: 'Third Party Coordinator', photo: '/images/team/kelly-zhao.png', bio: 'Bilingual third-party coordinator for donor and surrogacy programs.' },
        ],
      },
    ],
    pillars: [
      { num: '01', title: 'Physician-led care', titleZh: '醫師主導的照護', text: 'Every case is shaped by specialist physicians, not protocols alone.', textZh: '每個個案都由專科醫師親自把關，而非僅依制式流程。' },
      { num: '02', title: 'Embryology precision', titleZh: '胚胎學的精準', text: 'A lab ranked #1 in US IVF success rates safeguards each embryo.', textZh: '全美 IVF 成功率第一的實驗室，守護每一顆胚胎。' },
      { num: '03', title: 'Coordinated nursing', titleZh: '協調式護理', text: 'Nurse coordinators carry your plan end-to-end, so nothing falls through.', textZh: '護理協調師全程守護您的計畫，不讓任何環節脫節。' },
    ],
  },
  {
    number: '02',
    slug: 'precision-personalization',
    title: 'Precision & personalization',
    titleZh: '精準與個人化',
    navLabel: 'Treatments',
    navLabelZh: '療程',
    lead: 'No two patients are the same. Their care shouldn’t be either.',
    leadZh: '沒有兩位病人相同，療程也不該相同。',
    text: 'Care is never one-size-fits-all. It is a plan crafted for your life.',
    textZh: '療程從非一體適用，而是一份為您的人生量身打造的計畫。',
    image: '/images/standards/02-precision-personalization.jpg',
    intro:
      'Fertility medicine rewards precision. We map your unique picture—diagnosis, history, and goals—and build a protocol around it, from the first consult to the lab bench. Your plan is built for your life, not a template.',
    introZh:
      '生育醫學的價值來自精準。我們描繪您的獨特圖像——診斷、病史與目標——並據此量身打造療程，從初次諮詢到實驗室操作。您的計畫為您的人生而建，而非套用範本。',
    related: [
      {
        heading: 'Conditions We Treat',
        headingZh: '適應症',
        items: [
          { href: '/conditions/age-related-infertility', label: 'Age-Related Infertility', labelZh: '年齡相關不孕' },
          { href: '/conditions/endometriosis', label: 'Endometriosis', labelZh: '子宮內膜異位症' },
          { href: '/conditions/low-ovarian-reserve', label: 'Low Ovarian Reserve', labelZh: '卵巢庫存量低下' },
          { href: '/conditions/male-factor', label: 'Male Factor Infertility', labelZh: '男性因素不孕' },
          { href: '/conditions/pcos', label: 'Polycystic Ovary Syndrome (PCOS)', labelZh: '多囊性卵巢症候群 (PCOS)' },
          { href: '/conditions/unexplained-infertility', label: 'Unexplained Infertility', labelZh: '不明原因不孕' },
        ],
      },
      {
        heading: 'Your Personalized Journey',
        headingZh: '您的個人化旅程',
        items: [
          { href: '/services/ivf', label: 'In Vitro Fertilization (IVF)', labelZh: '體外受精 (IVF)', desc: 'In Vitro Fertilization' },
          { href: '/services/iui', label: 'Intrauterine Insemination (IUI)', labelZh: '宮腔內人工授精 (IUI)', desc: 'Intrauterine Insemination' },
          { href: '/services/egg-freezing', label: 'Egg Freezing & Fertility Preservation', labelZh: '凍卵與生育保存' },
          { href: '/services/pgt', label: 'Preimplantation Genetic Testing (PGT)', labelZh: '胚胎著床前基因檢測 (PGT)', desc: 'Preimplantation Genetic Testing' },
          { href: '/services/icsi', label: 'Intracytoplasmic Sperm Injection (ICSI)', labelZh: '卵胞質內單精子注入 (ICSI)', desc: 'Intracytoplasmic Sperm Injection' },
          { href: '/services/recurrent-pregnancy-loss', label: 'Recurrent Pregnancy Loss', labelZh: '反覆流產' },
        ],
      },
    ],
  },
  {
    number: '03',
    slug: 'laboratory-excellence',
    title: 'Laboratory excellence',
    titleZh: '卓越實驗室',
    navLabel: 'Our Lab',
    navLabelZh: '實驗室',
    lead: 'Where life begins, standards matter most.',
    leadZh: '生命起始之處，標準最為關鍵。',
    text: 'With exacting rigor in every laboratory detail, we safeguard every extraordinary beginning.',
    textZh: '以每一處實驗室細節的嚴謹把關，我們守護每一個非凡的開始。',
    image: '/images/standards/03-lab-excellence.jpg',
    intro:
      'Our embryology lab has ranked #1 in US IVF success rates. Behind that number is a culture of precision—time-lapse incubation, rigorous quality control, and an uncompromising standard for every embryo we nurture.',
    introZh:
      '我們的胚胎學實驗室曾榮登全美 IVF 成功率第一。這數字背後是一種精準的文化——連續拍攝培養、嚴謹的品質管控，以及對我們所培育的每顆胚胎毫不妥協的標準。',
    related: [
      {
        heading: 'The Laboratory',
        headingZh: '實驗室',
        items: [
          { href: '/technology', label: 'Lab Technology', labelZh: '實驗室技術', desc: 'The systems behind better outcomes', descZh: '成就更好結果的系統' },
          { href: '/outcomes', label: 'Success Rates', labelZh: '成功率', desc: 'Transparent, published results', descZh: '透明公開的數據' },
          { href: '/why-irfc', label: 'Why Choose IRFC', labelZh: '為何選擇 IRFC', desc: 'Recognition & lab leadership', descZh: '榮譽與實驗室領導地位' },
        ],
      },
    ],
  },
  {
    number: '04',
    slug: 'privacy-transparency',
    title: 'Privacy & transparency',
    titleZh: '隱私與透明',
    navLabel: 'Financing',
    navLabelZh: '費用',
    lead: 'Private, yet completely open.',
    leadZh: '私密，卻完全公開。',
    text: 'Your body and choices remain absolutely private; our standards and processes are completely open. True trust is built through clear boundaries.',
    textZh: '您的身體與選擇絕對私密；我們的標準與流程則完全公開。真正的信任，建立在清晰的界線之上。',
    image: '/images/standards/04-privacy-transparency.jpg',
    intro:
      'We keep your information strictly confidential—and we keep our own practices fully transparent. From clear pricing to plain-language policies, you should always know exactly where you stand.',
    introZh:
      '我們嚴格保密您的資訊——同時對自身的作法完全透明。從清晰的價格到白話的條款，您應隨時清楚自己處於何種位置。',
    related: [
      {
        heading: 'Cost & Clarity',
        headingZh: '費用與透明',
        items: [
          { href: '/financing', label: 'Financing & Cost', labelZh: '費用與補助', desc: 'Clear, upfront pricing' },
          { href: '/insurance', label: 'Insurance & Coverage', labelZh: '保險與給付', desc: 'What your plan may cover' },
          { href: '/faq', label: 'FAQ', labelZh: '常見問題', desc: 'Straight answers to common questions' },
        ],
      },
      {
        heading: 'Our Policies',
        headingZh: '我們的條款',
        items: [
          { href: '/privacy', label: 'Privacy Policy', labelZh: '隱私權政策' },
          { href: '/terms', label: 'Terms of Use', labelZh: '使用條款' },
          { href: '/accessibility', label: 'Accessibility', labelZh: '無障礙宣告' },
        ],
      },
    ],
  },
  {
    number: '05',
    slug: 'art-of-care',
    title: 'The art of care',
    titleZh: '照護的藝術',
    navLabel: 'Resources',
    navLabelZh: '資源',
    lead: 'More than clinical rigor, it holds the beauty of art and the warmth of nature.',
    leadZh: '不止於臨床的嚴謹，更蘊含藝術之美與自然之暖。',
    text: 'From the texture of pearl to the imagery of the lotus, from light to material—a space carefully created for life.',
    textZh: '從珍珠的質感到蓮花的意象，從光線到材質——這是一個為生命精心打造的空間。',
    image: '/images/standards/05-art-of-care.jpg',
    intro:
      'Science gets you here; humanity carries you through. We design spaces, moments, and conversations that make the hardest parts of the journey feel held—for every kind of family that comes to us.',
    introZh:
      '科學帶您來到此處，人性陪您走完全程。我們精心設計空間、時刻與對話，讓旅程中最艱難的段落也被溫柔承接——無論前來的是哪一種家庭。',
    related: [
      {
        heading: 'The Experience',
        headingZh: '體驗',
        items: [
          { href: '/patient-resources', label: 'Patient Resources', labelZh: '病人資源', desc: 'Guides & support', descZh: '指南與支持' },
          { href: '/blog', label: 'Fertility Insights', labelZh: '生育洞察', desc: 'Articles & patient guides', descZh: '文章與病人指南' },
          { href: '/patient-portal', label: 'Patient Portal', labelZh: '病人專區', desc: 'Access your records & messages', descZh: '查看病歷與訊息' },
          { href: '/testimonials', label: 'Patient Stories', labelZh: '病人故事', desc: 'Voices from our community', descZh: '來自社群的真實聲音' },
          { href: '/about', label: 'About', labelZh: '關於機構', desc: 'Our commitment to welcome all', descZh: '我們歡迎每一個家庭的承諾' },
        ],
      },
    ],
  },
  {
    number: '06',
    slug: 'care-within-reach',
    title: 'Exceptional care, within reach',
    titleZh: '卓越照護，觸手可及',
    navLabel: 'Visit Us',
    navLabelZh: '預約前往',
    lead: 'Beyond distance and resources.',
    leadZh: '超越距離與資源的限制。',
    text: 'Exceptional care truly reaches every family in need.',
    textZh: '卓越的照護，真正觸及每一位需要的家庭。',
    image: '/images/standards/06-care-within-reach.jpg',
    intro:
      'World-class fertility care should not depend on your zip code or your budget. With four clinics, telehealth, and transparent financing, we bring exceptional care within reach of every family who needs it.',
    introZh:
      '世界級的生育照護不該取決於您的郵遞區號或預算。憑藉四間診所、遠距醫療與透明的費用方案，我們讓卓越照護觸及每一位需要的家庭。',
    related: [
      {
        heading: 'Find & Reach Us',
        headingZh: '尋找與聯絡',
        items: [
          { href: '/consultation', label: 'Phone & Online Consultation', labelZh: '電話與線上諮詢', desc: 'Call or meet us virtually' },
          { href: '/appointment', label: 'Schedule a Consultation', labelZh: '預約諮詢', desc: 'Book your first appointment' },
          { href: '/contact', label: 'Contact Us', labelZh: '聯絡我們', desc: 'Questions? Reach our team' },
          { href: '/locations', label: 'Locations', labelZh: '診所地點', desc: '4 Southern California clinics' },
        ],
      },
      {
        heading: 'Your Guide',
        headingZh: '您的指南',
        items: [
          { href: '/patient-journey', label: 'Patient Journey', labelZh: '療程旅程', desc: 'How care unfolds, step by step', descZh: '療程如何一步步展開' },
          { href: '/international-patients', label: 'International Patients', labelZh: '國際病人', desc: 'Telehealth & multilingual care', descZh: '遠距醫療與多語照護' },
          { href: '/services/lgbtqia', label: 'LGBTQIA+ Family Building', labelZh: 'LGBTQIA+ 成家', desc: 'Affirming, inclusive care', descZh: '肯定且包容的照護' },
        ],
      },
    ],
  },
];

export function getStandard(slug: string): Standard | undefined {
  return standards.find((s) => s.slug === slug);
}

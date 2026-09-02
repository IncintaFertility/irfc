/**
 * INCINTA 品牌单一事实来源
 *
 * 依据：PEARL LUXE 品牌体系
 *  - INCINTA_WEBSITE_MASTER_PEARL_LUXE
 *  - INCINTA_Brand_Message_Architecture_EN_PEARL_LUXE
 *  - INCINTA_Client_Brand_Story_EN_PEARL_LUXE
 *  - INCINTA_VI_VISUAL_IDENTITY_MASTER_PEARL_LUXE
 *
 * 品牌架构：INCINTA（主品牌） > IRFC = Incinta Reproductive Fertility Center（业务实体）
 *
 * 所有页面应从此文件引用品牌语言，禁止在页面内硬编码。
 */

/** 主品牌名 */
export const BRAND_NAME = 'INCINTA';

/** 业务实体法定称谓（用于结构化数据、页脚、法律文本） */
export const LEGAL_ENTITY = 'Incinta Reproductive Fertility Center';

/** 业务实体缩写 */
export const BRAND_ABBREV = 'IRFC';

export const SITE_URL = 'https://irfc.com';
export const SITE_PHONE = '+19494538600';
export const SITE_PHONE_DISPLAY = '(949) 453-8600';

/**
 * 四层品牌语言（Brand Message Architecture）
 * 从信念 → 核心 → 承诺 → 情感连接
 */
export const BRAND_LANGUAGE = {
  belief: {
    en: 'Life Is the Ultimate Art.',
    zh: '生命，是最珍贵的艺术。',
  },
  core: {
    en: 'Science · Art · Life',
    zh: '科学 · 艺术 · 生命',
  },
  promise: {
    en: 'Every Extraordinary Life Deserves an Extraordinary Beginning.',
    zh: '生而不凡，始于不凡。',
  },
  expression: {
    en: 'Where Art Nurtures Possibility, and Science Listens for a Heartbeat.',
    zh: '以艺术孕育美好，让科技听见心跳。',
  },
  /** 莲花意象（辅助艺术元素，非 Logo） */
  lotus: {
    en: 'Where a thought blooms, the future is already within.',
    zh: '一念花开，未来已在其中。',
  },
} as const;

/**
 * 五大标准（The INCINTA Standard）
 *
 * 叙事视角：体验哲学导向 —— 让信任被看见，而非索取信任。
 * 品牌原文判据：Trust in medicine should not be requested.
 *              It should be visible, felt, and proven.
 *
 * 每个标准下的 evidence 为可验证的硬资产（Kaiser 认证、#1 实验室等），
 * 它们下沉为证据，不再作为标题层的自述。
 */
export interface Standard {
  id: string;
  index: string;
  en: string;
  zh: string;
  /** 一句话主张 */
  claim: string;
  claimZh: string;
  /** 患者视角描述 */
  body: string;
  /** 可验证证据 */
  evidence: string[];
  /** 视觉关键词，用于配图选择 */
  visual: string;
  /** 首屏轮播配图（站点实景 webp） */
  image: string;
}

export const FIVE_STANDARDS: Standard[] = [
  {
    id: 'science-revealed',
    index: '01',
    en: 'Science, Revealed',
    zh: '科学，可见',
    claim: 'Transparency you can see',
    claimZh: '透明实验室 · 胚胎学团队 · 可理解的科学',
    body: 'Our embryology laboratory is built to be seen, not described. Every protocol, every monitor, every decision is legible to the people it matters most to — because understanding what is happening to you is part of the care itself.',
    evidence: [
      'EmbryoScope+ time-lapse monitoring on every cycle',
      'Embryology team ranked #1 in US IVF success rates (2016)',
      'RI Witness electronic witnessing for every sample',
    ],
    visual: '实验室 / 胚胎学家 / 显微操作',
    image: '/images/care-team-embryologist-800.webp',
  },
  {
    id: 'architected-for-life',
    index: '02',
    en: 'Architected for Life',
    zh: '为生命而建',
    claim: 'Purpose-built environments',
    claimZh: '空气 · 环境 · 动线 · 工程系统',
    body: 'Air, light, circulation and engineering systems are designed around one question: what does a developing embryo need? Our facilities are built from the inside out for that purpose — not adapted after the fact.',
    evidence: [
      'Independent air handling and filtration systems',
      'Purpose-designed clinical circulation and patient flow',
      'VOC-controlled materials throughout laboratory spaces',
    ],
    visual: '空间 / 建筑线条 / 空气感 / 材质细节',
    image: '/images/lobby-detail-800.webp',
  },
  {
    id: 'life-treasured',
    index: '03',
    en: 'Life, Treasured',
    zh: '生命，被珍视',
    claim: 'Protection for what is irreplaceable',
    claimZh: '储存 · 监测 · 冗余 · 安全',
    body: 'What we hold for you cannot be replaced. Storage, monitoring and redundancy are engineered so that no single point of failure is ever allowed to matter.',
    evidence: [
      'TMRW Vault smart cryogenic storage',
      'Continuous monitoring with redundant alarm systems',
      'Backup power and fail-safe protocols at every site',
    ],
    visual: '患者关系 / 伴侣 / 温暖 / 珍视',
    image: '/images/couple-clinic-800.webp',
  },
  {
    id: 'systems-of-excellence',
    index: '04',
    en: 'Systems of Excellence',
    zh: '卓越的系统',
    claim: 'Integrated capability at scale',
    claimZh: '手术中心 · 实验室 · 中心网络',
    body: 'Surgery, laboratory and clinical care operate as one system across our network — so that capability does not depend on which door a patient walks through.',
    evidence: [
      'Accredited surgery centers integrated with laboratory capability',
      'Kaiser Permanente Center of Excellence designation',
      'One clinical standard across the entire center network',
    ],
    visual: '团队 / 网络 / 协作 / 系统',
    image: '/images/team-rfc-wide-800.webp',
  },
  {
    id: 'private-by-nature',
    index: '05',
    en: 'Private by Nature',
    zh: '私密的天性',
    claim: 'Hospital-grade systems. Private-care intimacy.',
    claimZh: '隐私 · 连续关系 · 专属患者体验',
    body: 'The rigor of a hospital, the intimacy of private care. You are not a case number moving through a system — you are a person seen continuously by the same team, from first consultation onward.',
    evidence: [
      'Continuous care relationship with a dedicated team',
      'Private consultation and recovery spaces',
      'Care in English, Mandarin, Japanese, Korean and Spanish',
    ],
    visual: '私密诊室 / 医患关系 / 细节',
    image: '/images/consultation-800.webp',
  },
];

/** 中心网络（ONE INCINTA NETWORK） */
export const LOCATIONS = [
  { id: 'beverly-hills', name: 'Beverly Hills' },
  { id: 'torrance', name: 'Torrance' },
  { id: 'irvine', name: 'Irvine' },
  { id: 'corona', name: 'Corona' },
] as const;

/**
 * 转化路径（WEBSITE_MASTER 11 / CONVERSION）
 * Primary 与 Secondary 措辞全站统一
 */
export const CTA = {
  primary: 'Schedule a Consultation',
  secondary: {
    call: 'Call',
    location: 'Find a Location',
  },
} as const;

/** 首页七段 flow（WEBSITE_MASTER 03 / HOMEPAGE FLOW） */
export const HOMEPAGE_FLOW = [
  { id: 'hero', en: 'HERO', zh: '生命，是最珍贵的艺术。' },
  { id: 'why', en: 'WHY', zh: '生命的开始，不应只是一场医疗过程。' },
  { id: 'standard', en: 'STANDARD', zh: 'A New Standard in Fertility Care.' },
  { id: 'proofs', en: 'FIVE PROOFS', zh: '五大标准 + 真实证据' },
  { id: 'experts', en: 'EXPERTS', zh: '医生 + 胚胎学团队' },
  { id: 'network', en: 'NETWORK', zh: 'One INCINTA Network' },
  { id: 'action', en: 'ACTION', zh: 'Your Beginning Starts Here.' },
] as const;

/** 默认 meta description（品牌语言版，替代旧语） */
export const DEFAULT_DESCRIPTION =
  'INCINTA — Life Is the Ultimate Art. World-class fertility care across Southern California at Incinta Reproductive Fertility Center (IRFC).';

/** 结构化数据用的机构描述 */
export const ORG_DESCRIPTION =
  'World-class fertility treatments across Southern California — IVF, IUI, egg freezing, PGT, donor egg, and surrogacy. Incinta Reproductive Fertility Center (IRFC), part of INCINTA.';

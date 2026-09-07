// ════════════════════════════════════════════════════════════════════════
//  The INCINTA Standard — single source of truth
//  Drives: homepage six-standards block, main nav, standard hub pages,
//  and the footer "Our 6 Standards" strip.
//  Edit here once; every surface updates.
// ════════════════════════════════════════════════════════════════════════

export interface RelatedItem {
  href: string;
  label: string;
  desc?: string;
}

export interface RelatedGroup {
  heading: string;
  items: RelatedItem[];
}

export interface Standard {
  /** Two-digit display number, e.g. "01" */
  number: string;
  /** URL slug used at /standards/<slug> */
  slug: string;
  /** Display title (English site) */
  title: string;
  /** Compact nav label (keep it short: one word or 2-3 words max) */
  shortTitle: string;
  /** Concrete, scannable nav label shown as the primary line in the top nav */
  navLabel: string;
  /** Short italic lead line (from homepage copy) */
  lead: string;
  /** Supporting paragraph (from homepage copy) */
  text: string;
  /** Hero / row image */
  image: string;
  /** Longer intro paragraph explaining the standard at IRFC */
  intro: string;
  /** Related content pages, clustered by group */
  related: RelatedGroup[];
}

export const standards: Standard[] = [
  {
    number: '01',
    slug: 'collective-expertise',
    title: 'Collective expertise',
    shortTitle: 'Collective',
    navLabel: 'Our Team',
    lead: 'One patient. The expertise of an entire team.',
    text: 'When a patient chooses INCINTA, the strength of our entire team carries that trust—together, we strive for the best possible outcome.',
    image: '/images/standards/01-collective-expertise.jpg',
    intro:
      'Expertise at IRFC is never held by a single person. Physicians, embryologists, nurses, and care coordinators work as one unit around your case—so every decision benefits from the full weight of the practice, not just one opinion.',
    related: [
      {
        heading: 'Our Physicians',
        items: [
          { href: '/team', label: 'Meet the Team', desc: 'The specialists who lead your care' },
          { href: '/team/dr-james-lin', label: 'Dr. James P. Lin, MD', desc: 'Founder & Reproductive Endocrinologist' },
          { href: '/team/dr-zitao-liu', label: 'Dr. Zitao Liu, MD', desc: 'Reproductive Endocrinologist' },
          { href: '/team/dr-yufen-xie', label: 'Dr. Yufen Xie, PhD', desc: 'Laboratory & Embryology Director' },
        ],
      },
      {
        heading: 'Why it matters',
        items: [
          { href: '/why-irfc', label: 'Why Choose IRFC', desc: 'What sets our practice apart' },
          { href: '/testimonials', label: 'Patient Stories', desc: 'Outcomes from the people we have helped' },
        ],
      },
    ],
  },
  {
    number: '02',
    slug: 'precision-personalization',
    title: 'Precision & personalization',
    shortTitle: 'Precision',
    navLabel: 'Treatments',
    lead: 'No two patients are the same. Their care shouldn’t be either.',
    text: 'Care is never one-size-fits-all. It is a plan crafted for your life.',
    image: '/images/standards/02-precision-personalization.jpg',
    intro:
      'Fertility medicine rewards precision. We map your unique picture—diagnosis, history, and goals—and build a protocol around it, from the first consult to the lab bench. Your plan is built for your life, not a template.',
    related: [
      {
        heading: 'Conditions We Treat',
        items: [
          { href: '/conditions/age-related-infertility', label: 'Age-Related Infertility' },
          { href: '/conditions/endometriosis', label: 'Endometriosis' },
          { href: '/conditions/low-ovarian-reserve', label: 'Low Ovarian Reserve' },
          { href: '/conditions/male-factor', label: 'Male Factor Infertility' },
          { href: '/conditions/pcos', label: 'PCOS' },
          { href: '/conditions/unexplained-infertility', label: 'Unexplained Infertility' },
        ],
      },
      {
        heading: 'Your Personalized Journey',
        items: [
          { href: '/patient-journey', label: 'Patient Journey', desc: 'How care unfolds, step by step' },
          { href: '/services/ivf', label: 'IVF', desc: 'In Vitro Fertilization' },
          { href: '/services/iui', label: 'IUI', desc: 'Intrauterine Insemination' },
          { href: '/services/egg-freezing', label: 'Fertility Preservation', desc: 'Egg freezing' },
          { href: '/services/pgt', label: 'Genetic Testing (PGT)', desc: 'Preimplantation genetic testing' },
          { href: '/services/icsi', label: 'ICSI', desc: 'Intracytoplasmic sperm injection' },
          { href: '/services/recurrent-pregnancy-loss', label: 'Recurrent Pregnancy Loss' },
        ],
      },
    ],
  },
  {
    number: '03',
    slug: 'laboratory-excellence',
    title: 'Laboratory excellence',
    shortTitle: 'Lab',
    navLabel: 'Our Lab',
    lead: 'Where life begins, standards matter most.',
    text: 'With exacting rigor in every laboratory detail, we safeguard every extraordinary beginning.',
    image: '/images/standards/03-lab-excellence.jpg',
    intro:
      'Our embryology lab has ranked #1 in US IVF success rates. Behind that number is a culture of precision—time-lapse incubation, rigorous quality control, and an uncompromising standard for every embryo we nurture.',
    related: [
      {
        heading: 'The Laboratory',
        items: [
          { href: '/technology', label: 'Lab Technology', desc: 'The systems behind better outcomes' },
          { href: '/outcomes', label: 'Success Rates', desc: 'Transparent, published results' },
          { href: '/why-irfc', label: 'Why Choose IRFC', desc: 'Recognition & lab leadership' },
        ],
      },
    ],
  },
  {
    number: '04',
    slug: 'privacy-transparency',
    title: 'Privacy & transparency',
    shortTitle: 'Privacy',
    navLabel: 'Financing',
    lead: 'Private, yet completely open.',
    text: 'Your body and choices remain absolutely private; our standards and processes are completely open. True trust is built through clear boundaries.',
    image: '/images/standards/04-privacy-transparency.jpg',
    intro:
      'We keep your information strictly confidential—and we keep our own practices fully transparent. From clear pricing to plain-language policies, you should always know exactly where you stand.',
    related: [
      {
        heading: 'Cost & Clarity',
        items: [
          { href: '/financing', label: 'Financing & Cost', desc: 'Clear, upfront pricing' },
          { href: '/faq', label: 'FAQ', desc: 'Straight answers to common questions' },
        ],
      },
      {
        heading: 'Our Policies',
        items: [
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/terms', label: 'Terms of Use' },
          { href: '/accessibility', label: 'Accessibility' },
        ],
      },
    ],
  },
  {
    number: '05',
    slug: 'art-of-care',
    title: 'The art of care',
    shortTitle: 'Art of Care',
    navLabel: 'Resources',
    lead: 'More than clinical rigor, it holds the beauty of art and the warmth of nature.',
    text: 'From the texture of pearl to the imagery of the lotus, from light to material—a space carefully created for life.',
    image: '/images/standards/05-art-of-care.jpg',
    intro:
      'Science gets you here; humanity carries you through. We design spaces, moments, and conversations that make the hardest parts of the journey feel held—for every kind of family that comes to us.',
    related: [
      {
        heading: 'The Experience',
        items: [
          { href: '/patient-resources', label: 'Patient Resources', desc: 'Guides & support' },
          { href: '/testimonials', label: 'Patient Stories', desc: 'Voices from our community' },
        ],
      },
      {
        heading: 'Care for Every Family',
        items: [
          { href: '/services/lgbtqia', label: 'LGBTQIA+ Family Building', desc: 'Affirming, inclusive care' },
          { href: '/international-patients', label: 'International Patients', desc: 'Telehealth & multilingual care' },
          { href: '/about', label: 'Inclusive Care', desc: 'Our commitment to welcome all' },
        ],
      },
    ],
  },
  {
    number: '06',
    slug: 'care-within-reach',
    title: 'Exceptional care, within reach',
    shortTitle: 'Within Reach',
    navLabel: 'Visit Us',
    lead: 'Beyond distance and resources.',
    text: 'Exceptional care truly reaches every family in need.',
    image: '/images/standards/06-care-within-reach.jpg',
    intro:
      'World-class fertility care should not depend on your zip code or your budget. With five clinics, telehealth, and transparent financing, we bring exceptional care within reach of every family who needs it.',
    related: [
      {
        heading: 'Find & Reach Us',
        items: [
          { href: '/locations', label: 'Locations', desc: '5 Southern California clinics' },
          { href: '/contact', label: 'Schedule a Consultation' },
          { href: '/international-patients', label: 'Telehealth & Travel', desc: 'Care from anywhere' },
        ],
      },
      {
        heading: 'Make It Possible',
        items: [
          { href: '/financing', label: 'Affordable Care', desc: 'Financing options' },
          { href: '/accessibility', label: 'Accessibility' },
        ],
      },
    ],
  },
];

export function getStandard(slug: string): Standard | undefined {
  return standards.find((s) => s.slug === slug);
}

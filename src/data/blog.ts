export interface BlogPost {
  /** URL slug, e.g. "ivf-success-rates" → /blog/ivf-success-rates */
  slug: string;
  title: string;
  description: string;
  /** ISO date, used for display + Article structured data */
  date: string;
  /** Display category shown on cards + hub */
  category: string;
  /** Estimated reading time label */
  readingTime: string;
  /** Short summary for hub cards + meta description fallback */
  excerpt: string;
  /** Article body as semantic HTML (rendered with set:html) */
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ivf-success-rates',
    title: 'IVF Success Rates: How to Read Them and What Affects Your Odds',
    description:
      'IVF success rates are reported in ways that are easy to misread. Learn what clinic statistics actually measure, which factors move your odds, and the questions worth asking before you start.',
    date: '2026-09-08',
    category: 'IVF & Treatment',
    readingTime: '7 min read',
    excerpt:
      'Clinic success-rate tables can be misleading if you don’t know what they measure. Here is how to read IVF statistics and the factors that shape your own odds.',
    body: `
      <p>When you are comparing fertility clinics, the first number most people look for is the <strong>IVF success rate</strong>. It feels like a report card — higher must be better. But success-rate tables are easy to misread, and the figure that matters most is the one attached to <em>your</em> specific situation, not the clinic average.</p>

      <h2>What "success rate" actually measures</h2>
      <p>Most published IVF statistics come from registries such as the U.S. <a href="/services/ivf">SART</a> or CDC reports. They are usually expressed a few different ways:</p>
      <ul>
        <li><strong>Live-birth rate per transfer</strong> — the chance a single embryo transfer results in a baby. This is the most honest "per attempt" number.</li>
        <li><strong>Live-birth rate per retrieval</strong> — across an entire stimulation cycle, including any frozen transfers from that cycle.</li>
        <li><strong>Cumulative rate</strong> — the odds across all transfers from one retrieval plus any future retrievals, sometimes over a full year.</li>
      </ul>
      <p>A clinic can post a very high "per transfer" rate simply by transferring only high-grade embryos to younger patients and declining harder cases. That is not cheating — but it means the average is not <em>your</em> average.</p>

      <h2>The factors that move your odds most</h2>
      <p>No clinic controls the single biggest predictor of IVF success: <strong>age-related egg quality</strong>. A 38-year-old’s odds per transfer are materially different from a 30-year-old’s, regardless of which clinic they walk into. Other meaningful factors include:</p>
      <ul>
        <li><strong>Ovarian reserve</strong> (AMH, FSH, antral follicle count) — sets how many eggs a cycle is likely to yield.</li>
        <li><strong>Diagnosis</strong> — unexplained infertility, endometriosis, male-factor, and recurrent loss each change the protocol.</li>
        <li><strong>Embryo genetics</strong> — <a href="/services/pgt">preimplantation genetic testing (PGT-A)</a> helps select euploid embryos and is especially relevant after 35.</li>
        <li><strong>Lab quality</strong> — culture conditions, vitrification (freezing) skill, and embryologist experience quietly shape outcomes.</li>
      </ul>

      <h2>Questions worth asking before you start</h2>
      <p>Instead of asking "what is your overall success rate?", ask the clinic for numbers that match you:</p>
      <blockquote>"What is your live-birth rate per transfer for patients in my age band and diagnosis?"</blockquote>
      <p>Also ask how many cycles they perform a year (volume correlates with lab refinement), whether they tailor stimulation protocols rather than using one default, and how they handle frozen embryos. A transparent clinic will walk you through the nuance rather than quoting a single headline figure.</p>

      <h2>Reading rates alongside care</h2>
      <p>Statistics are one input, not the whole decision. The right clinic pairs honest numbers with a protocol built around your biology, clear pricing, and a team you can actually reach. If you want to talk through what your own odds might look like, <a href="/consultation">book a consultation</a> with one of our physicians — in person at any of our <a href="/locations">four Southern California clinics</a> or by secure video visit.</p>
    `,
  },
  {
    slug: 'preimplantation-genetic-testing-pgt',
    title: 'Preimplantation Genetic Testing (PGT): A Complete Patient Guide',
    description:
      'PGT screens embryos for chromosomal normality before transfer. Learn what PGT-A, PGT-M, and PGT-SR actually test for, who benefits, and how it fits into an IVF cycle.',
    date: '2026-09-09',
    category: 'IVF & Genetics',
    readingTime: '8 min read',
    excerpt:
      'PGT checks embryos for the right number of chromosomes before they are transferred. Here is what each type tests for, who it helps, and what to expect.',
    body: `
      <p>If you are going through <a href="/services/ivf">IVF</a>, you will almost certainly hear about <strong>preimplantation genetic testing (PGT)</strong>. It is one of the most misunderstood — and most useful — tools in modern fertility care. This guide explains what it does, the three types, and who tends to benefit.</p>

      <h2>What PGT does</h2>
      <p>After eggs are fertilized (often with <a href="/services/icsi">ICSI</a> for male-factor cases), embryos are grown to the blastocyst stage (day 5–6). A few cells are gently biopsied and sent for genetic analysis. The embryo is frozen while results come back. Transfer then focuses on the healthiest embryo.</p>

      <h2>The three types</h2>
      <ul>
        <li><strong>PGT-A</strong> (aneuploidy) — screens for the right number of chromosomes. Most embryos from patients over 35 carry some chromosomal mismatch, and transferring a normal (euploid) embryo markedly improves the chance of a live birth and lowers miscarriage risk.</li>
        <li><strong>PGT-M</strong> (monogenic) — checks for a specific single-gene condition the parents are known to carry, such as cystic fibrosis or Tay-Sachs.</li>
        <li><strong>PGT-SR</strong> (structural rearrangement) — for patients with a balanced translocation or inversion, to avoid passing an unbalanced chromosome set to the embryo.</li>
      </ul>

      <h2>Who tends to benefit</h2>
      <p>PGT-A is most often recommended for patients of advanced maternal age, those with recurrent pregnancy loss, repeated unexplained IVF failure, or known chromosomal concerns. For a younger patient with plenty of high-quality embryos, the added value is smaller — and a clinician should talk through the trade-offs rather than defaulting to "yes."</p>

      <h2>What PGT cannot tell you</h2>
      <p>It is a screening test, not a full guarantee. It does not assess every genetic disease, and it does not grade an embryo’s developmental potential perfectly. A "normal" result raises the odds substantially; it does not eliminate them. Your care team should be clear about both the upside and the limits.</p>

      <h2>Fitting PGT into your cycle</h2>
      <p>PGT adds a biopsy step and a few days of waiting (the embryo is vitrified in the meantime), but it does not change the stimulation itself. If you are considering it, ask how your clinic’s lab validates results and how biopsy experience compares across embryologists. To see how genetic testing sits within a full treatment plan, <a href="/services/pgt">explore our PGT overview</a> or <a href="/consultation">speak with a physician</a>.</p>
    `,
  },
  {
    slug: 'egg-freezing-guide',
    title: 'Egg Freezing & Fertility Preservation: What to Know Before You Start',
    description:
      'Egg freezing lets you bank eggs at today’s egg quality for future use. Learn when it helps most, what a cycle involves, and how to think about timing and odds.',
    date: '2026-09-10',
    category: 'Preservation',
    readingTime: '7 min read',
    excerpt:
      'Fertility preservation banks eggs at your current egg quality. Here is what a freezing cycle involves, who it helps most, and how to think about timing.',
    body: `
      <p><strong>Egg freezing</strong> (oocyte cryopreservation) has moved from experimental to mainstream. The appeal is simple: eggs are frozen at the quality they have today, then thawed and fertilized later — with a partner, donor sperm, or a future decision you have not made yet. Here is what to know before you start.</p>

      <h2>Why timing matters more than anything</h2>
      <p>Egg quality and quantity decline with age, gradually through your 30s and more steeply after about 35. Freezing at 32 is not the same as freezing at 39. The single biggest predictor of a future live birth from banked eggs is the age at which they were frozen — which is exactly why many people consider it earlier than they "feel" they need to.</p>

      <h2>What a freezing cycle involves</h2>
      <ul>
        <li><strong>Testing</strong> — baseline ultrasound and hormone bloodwork (AMH, FSH) to estimate your response.</li>
        <li><strong>Stimulation</strong> — daily injections for ~10–12 days to grow multiple follicles, with monitoring visits.</li>
        <li><strong>Retrieval</strong> — a short, sedated procedure to collect the eggs.</li>
        <li><strong>Vitrification</strong> — eggs are flash-frozen using modern vitrification, which preserves them very reliably.</li>
      </ul>
      <p>The stimulation and retrieval mirror the first half of an <a href="/services/ivf">IVF cycle</a>; the difference is that fertilization is deferred to the future.</p>

      <h2>How many eggs should you bank?</h2>
      <p>There is no single answer, but the younger you are, the fewer eggs you typically need for a reasonable chance. A common target range is roughly 15–20 mature eggs for someone freezing before 35, and more if freezing later. Your clinician should give you a personalized estimate rather than a generic number.</p>

      <h2>Is it right for you?</h2>
      <p>Preservation is also relevant for medical reasons — before cancer treatment, for example — and for anyone who wants options without a present plan. It is not a guarantee of a future pregnancy, but it meaningfully widens the window. If you want to understand your own numbers, <a href="/consultation">schedule a consultation</a> or review our <a href="/services/egg-freezing">egg freezing overview</a>.</p>
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

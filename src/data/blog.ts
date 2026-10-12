export interface BlogPost {
  /** URL slug, e.g. "ivf-success-rates" → /blog/ivf-success-rates */
  slug: string;
  title: string;
  description: string;
  /** ISO date, used for display + Article structured data */
  date: string;
  /** Date of a substantive update; original publication date is preserved. */
  updatedDate?: string;
  /** Display category shown on cards + hub */
  category: string;
  /** Estimated reading time label */
  readingTime: string;
  /** Short summary for hub cards + meta description fallback */
  excerpt: string;
  /** Article body as semantic HTML (rendered with set:html) */
  body: string;
  /** Featured cover image, path under /public/images (e.g. "/images/consultation-joyful.webp") */
  cover: string;
  /** Alt text for the cover image (accessibility + image SEO) */
  coverAlt: string;
  /** 繁體中文版本（與上方欄位一一對應） */
  titleZh?: string;
  descriptionZh?: string;
  excerptZh?: string;
  bodyZh?: string;
  coverAltZh?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ivf-success-rates',
    title: 'IVF Success Rates: How to Read Them and What Affects Your Odds',
    description:
      'IVF success rates are reported in ways that are easy to misread. Learn what clinic statistics actually measure, which factors move your odds, and the questions worth asking before you start.',
    date: '2026-09-08',
    updatedDate: '2026-10-12',
    category: 'IVF & Treatment',
    readingTime: '3 min read',
    excerpt:
      'Clinic success-rate tables can be misleading if you don’t know what they measure. Here is how to read IVF statistics and the factors that shape your own odds.',
    body: `
      <p>When you are comparing fertility clinics, the first number most people look for is the <strong>IVF success rate</strong>. It feels like a report card — higher must be better. But success-rate tables are easy to misread, and the figure that matters most is the one attached to <em>your</em> specific situation, not the clinic average.</p>

      <h2>What "success rate" actually measures</h2>
      <p>Published IVF statistics include <a href="https://www.cdc.gov/art/success-rates/index.html">CDC ART reports</a>. They are usually expressed a few different ways:</p>
      <ul>
        <li><strong>Live-birth rate per transfer</strong> — the chance a single embryo transfer results in a baby. It excludes cycles that do not reach transfer.</li>
        <li><strong>Live-birth rate per retrieval</strong> — check whether the report counts intended or actual retrievals and which subsequent transfers are included.</li>
        <li><strong>Cumulative rate</strong> — outcomes across the transfers and follow-up period defined by that report; check whether it covers one retrieval or multiple retrievals.</li>
      </ul>
      <p>A clinic can post a very high "per transfer" rate simply by transferring only high-grade embryos to younger patients and declining harder cases. That is not cheating — but it means the average is not <em>your</em> average.</p>

      <h2>The factors that move your odds most</h2>
      <p>No clinic controls the single biggest predictor of IVF success: <strong>age-related egg quality</strong>. A 38-year-old’s odds per transfer are materially different from a 30-year-old’s, regardless of which clinic they walk into. Other meaningful factors include:</p>
      <ul>
        <li><strong>Ovarian reserve</strong> (AMH, FSH, antral follicle count) — sets how many eggs a cycle is likely to yield.</li>
        <li><strong>Diagnosis</strong> — unexplained infertility, endometriosis, male-factor, and recurrent loss each change the protocol.</li>
        <li><strong>Embryo genetics</strong> — <a href="/services/pgt">preimplantation genetic testing (PGT-A)</a> screens chromosome-number differences in sampled embryo cells. It is not recommended automatically by age and does not improve outcomes for everyone.</li>
        <li><strong>Lab quality</strong> — culture conditions, vitrification (freezing) skill, and embryologist experience quietly shape outcomes.</li>
      </ul>

      <h2>Questions worth asking before you start</h2>
      <p>Instead of asking "what is your overall success rate?", ask the clinic for numbers that match you:</p>
      <blockquote>"What is your live-birth rate per transfer for patients in my age band and diagnosis?"</blockquote>
      <p>Also ask how many cycles they perform a year , whether they tailor stimulation protocols rather than using one default, and how they handle frozen embryos. A transparent clinic will walk you through the nuance rather than quoting a single headline figure.</p>

      <h2>Reading rates alongside care</h2>
      <p>Statistics are one input, not the whole decision. The right clinic pairs honest numbers with a protocol built around your biology, clear pricing, and a team you can actually reach. If you want to talk through what your own odds might look like, <a href="/appointment">book a consultation</a> with one of our physicians — in person at any of our <a href="/locations">four Southern California clinics</a> or by secure video visit.</p>

      <h2>Sources and further reading</h2>
      <ul><li><a href="https://www.cdc.gov/art/success-rates/index.html">CDC — ART Success Rates</a></li><li><a href="https://www.hfea.gov.uk/treatments/treatment-add-ons/pre-implantation-genetic-testing-for-aneuploidy-pgt-a/">HFEA — PGT-A</a></li></ul>
    `,
    cover: '/images/consultation-joyful.webp',
    coverAlt: 'A joyful patient celebrating a successful fertility outcome at Incinta Reproductive Fertility Center.',
    titleZh: 'IVF 成功率：如何解讀，以及哪些因素影響你的機會',
    descriptionZh: 'IVF 成功率常以容易誤讀的方式呈現。了解診所統計數據真正衡量什麼、哪些因素會改變你的機會，以及開始前值得提出的問題。',
    excerptZh: '診所成功率表容易誤導，若不知其衡量內容。本文說明如何解讀 IVF 統計，以及影響你自身機會的因素。',
    coverAltZh: '一位在 Incinta Reproductive Fertility Center 喜迎生育成果的病人',
    bodyZh: `
      <p>當你比較生育診所時，大多數人第一個看的數字就是 <strong>IVF 成功率</strong>。它感覺像成績單——數字越高一定越好。但成功率表很容易誤讀，而最關鍵的數字，是附在你<em>自身</em>特定情況下的那一個，而非診所平均值。</p>

      <h2>「成功率」真正衡量什麼</h2>
      <p>大多數公開的 IVF 統計來自美國 <a href="https://www.cdc.gov/art/success-rates/index.html">CDC ART 報告</a>。它們通常以幾種方式呈現：</p>
      <ul>
        <li><strong>每次植入的活產率</strong>——單次胚胎植入帶來寶寶的機會。分母不包含未進入植入階段的週期。</li>
        <li><strong>每次取卵的活產率</strong>——請確認是預定取卵還是實際取卵，以及後續哪些植入被計入。</li>
        <li><strong>累積活產率</strong>——涵蓋報告指定植入範圍與追蹤時間的結果；請確認是一次還是多次取卵。</li>
      </ul>
      <p>診所只要只對年輕病人植入高評級胚胎、婉拒較困難的個案，就能貼出極高的「每次植入」成功率。這不算作弊——但這表示平均值並非<em>你</em>的平均值。</p>

      <h2>最影響你機會的因素</h2>
      <p>沒有診所能控制 IVF 成功的最大單一預測因子：<strong>年齡相關的卵子品質</strong>。一名 38 歲每次植入的機會，與 30 歲者有實質差異，無論走進哪家診所。其他重要因素包括：</p>
      <ul>
        <li><strong>卵巢庫存量</strong>（AMH、FSH、竇卵泡數）——決定一個週期可能取得的卵子數。</li>
        <li><strong>診斷</strong>——不明原因不孕、子宮內膜異位症、男性因素與反覆流產，各自改變療程。</li>
        <li><strong>胚胎基因</strong>——<a href="/services/pgt">胚胎著床前基因檢測 (PGT-A)</a> 篩檢胚胎取樣細胞的染色體數目差異。並非僅憑年齡就必須檢測，也不會改善每個人的結果。</li>
        <li><strong>實驗室品質</strong>——培養條件、玻璃化（冷凍）技術與胚胎學家經驗，悄悄影響結果。</li>
      </ul>

      <h2>開始前值得提出的問題</h2>
      <p>與其問「你們整體成功率是多少？」，不如請診所提供符合你的數字：</p>
      <blockquote>"在我這個年齡層與診斷下，你們每次植入的活產率是多少？"</blockquote>
      <p>也要詢問他們一年執行多少週期、是否量身打造刺激療程而非套用預設、以及如何處理冷凍胚胎。透明的診所會帶你理解細微差異，而非只報一個標題數字。</p>

      <h2>看懂數字，也看懂照護</h2>
      <p>統計只是一項輸入，而非整個決定。對的診所，是把誠實數字與為你生理打造的療程、清晰價格，以及真正聯絡得到的團隊結合在一起。若你想聊聊自己可能的機會，<a href="/appointment">預約諮詢</a>，與我們任一醫師面對面——在我們<a href="/locations">南加州四間診所</a>任一處，或透過安全視訊。</p>

      <h2>資料來源與延伸閱讀</h2>
      <ul><li><a href="https://www.cdc.gov/art/success-rates/index.html">CDC — ART Success Rates</a></li><li><a href="https://www.hfea.gov.uk/treatments/treatment-add-ons/pre-implantation-genetic-testing-for-aneuploidy-pgt-a/">HFEA — PGT-A</a></li></ul>
    `,
  },
  {
    slug: 'preimplantation-genetic-testing-pgt',
    title: 'Preimplantation Genetic Testing (PGT): A Complete Patient Guide',
    description:
      'PGT screens embryos for chromosomal normality before transfer. Learn what PGT-A, PGT-M, and PGT-SR actually test for, who benefits, and how it fits into an IVF cycle.',
    date: '2026-09-09',
    updatedDate: '2026-10-12',
    category: 'IVF & Genetics',
    readingTime: '3 min read',
    excerpt:
      'PGT checks embryos for the right number of chromosomes before they are transferred. Here is what each type tests for, who it helps, and what to expect.',
    body: `
      <p>If you are going through <a href="/services/ivf">IVF</a>, you will almost certainly hear about <strong>preimplantation genetic testing (PGT)</strong>. This guide explains the three types, what they test, and questions to discuss before deciding whether testing fits your plan.</p>

      <h2>What PGT does</h2>
      <p>After eggs are fertilized (often with <a href="/services/icsi">ICSI</a> for male-factor cases), embryos are grown to the blastocyst stage (day 5–6). A few cells are gently biopsied and sent for genetic analysis. The embryo is frozen while results come back. Your team interprets the results alongside other embryo assessments.</p>

      <h2>The three types</h2>
      <ul>
        <li><strong>PGT-A</strong> (aneuploidy) — screens for the right number of chromosomes. Results describe sampled cells and can include mosaic or inconclusive findings. PGT-A does not guarantee a healthy baby or improve live-birth outcomes for every patient.</li>
        <li><strong>PGT-M</strong> (monogenic) — checks for a specific single-gene condition the parents are known to carry, such as cystic fibrosis or Tay-Sachs.</li>
        <li><strong>PGT-SR</strong> (structural rearrangement) — for patients with a balanced translocation or inversion, to avoid passing an unbalanced chromosome set to the embryo.</li>
      </ul>

      <h2>Deciding whether PGT-A fits your plan</h2>
      <p>PGT-A is not a routine requirement for every IVF patient. HFEA reports no evidence from randomized trials that it improves the chance of having a baby for most patients. It may reduce miscarriage in some circumstances, but this does not necessarily increase the overall chance of a baby. Discuss your history, available embryos, risks, costs, and alternatives with your physician.</p>

      <h2>What PGT cannot tell you</h2>
      <p>It is a screening test, not a full guarantee. It does not assess every genetic disease, and it does not grade an embryo’s developmental potential perfectly. A result reported as normal does not guarantee pregnancy or live birth. Biopsy can damage an embryo, and inaccurate or mosaic results may reduce the embryos available for transfer. Your team should explain these limitations and how results are interpreted.</p>

      <h2>Fitting PGT into your cycle</h2>
      <p>PGT adds a biopsy step and a wait for laboratory results (the embryo is vitrified in the meantime), but it does not change the stimulation itself. If you are considering it, ask how your clinic’s lab validates results and how biopsy experience compares across embryologists. To see how genetic testing sits within a full treatment plan, <a href="/services/pgt">explore our PGT overview</a> or <a href="/appointment">speak with a physician</a>.</p>

      <h2>Sources and further reading</h2>
      <ul><li><a href="https://www.hfea.gov.uk/treatments/treatment-add-ons/pre-implantation-genetic-testing-for-aneuploidy-pgt-a/">HFEA — Pre-implantation genetic testing for aneuploidy (PGT-A)</a></li></ul>
    `,
    cover: '/images/care-team-embryologist.webp',
    coverAlt: 'An IRFC embryologist working at the microscope in the IVF laboratory during preimplantation genetic testing.',
    titleZh: '胚胎著床前基因檢測 (PGT)：完整病人指南',
    descriptionZh: 'PGT 在植入前篩檢胚胎的染色體是否正常。了解 PGT-A、PGT-M、PGT-SR 各檢測什麼、誰適合，以及它如何融入 IVF 療程。',
    excerptZh: 'PGT 在植入前檢查胚胎是否擁有正確數量的染色體。本文說明各類型檢測內容、適用對象與預期過程。',
    coverAltZh: 'IRFC 胚胎學家在 IVF 實驗室顯微鏡前進行胚胎著床前基因檢測',
    bodyZh: `
      <p>如果你正在進行 <a href="/services/ivf">IVF</a>，幾乎一定會聽到<strong>胚胎著床前基因檢測 (PGT)</strong>。本指南說明三種類型、檢測內容，以及決定是否適合你的計畫前，值得討論的問題。</p>

      <h2>PGT 做什麼</h2>
      <p>卵子受精後（男性因素個案常搭配 <a href="/services/icsi">ICSI</a>），胚胎培養至囊胚階段（第 5–6 天）。取少量細胞溫和地進行切片，送交基因分析。胚胎在結果出爐前冷凍。團隊會結合其他胚胎評估來解讀結果。</p>

      <h2>三種類型</h2>
      <ul>
        <li><strong>PGT-A</strong>（非整倍體）——篩檢染色體數量是否正確。結果描述取樣細胞，可能出現嵌合或無法判讀的結果。PGT-A 不保證生下健康寶寶，也不會提高每位病人的活產機會。</li>
        <li><strong>PGT-M</strong>（單基因）——檢查父母已知帶有的特定單基因疾病，如囊狀纖維化或泰薩氏症。</li>
        <li><strong>PGT-SR</strong>（結構重排）——適用於帶有平衡轉位或倒位、避免將不平衡染色體組傳給胚胎的病人。</li>
      </ul>

      <h2>決定 PGT-A 是否適合你的計畫</h2>
      <p>PGT-A 並非每位 IVF 病人都必須進行。HFEA 指出，隨機試驗未證實它能提高多數病人生下寶寶的機會。某些情況下可能降低流產，但不一定提高整體生下寶寶的機會。請與醫師討論病史、可用胚胎、風險、費用與替代方案。</p>

      <h2>PGT 無法告訴你什麼</h2>
      <p>它是篩檢，而非完全保證。它不檢查每一種基因疾病，也無法完美評估胚胎的發育潛力。「正常」結果不保證懷孕或活產。切片可能損傷胚胎，不準確或嵌合結果也可能減少可植入胚胎。團隊應說明這些限制及結果如何解讀。</p>

      <h2>PGT 如何融入你的療程</h2>
      <p>PGT 增加一道切片步驟與等待實驗室結果的時間（胚胎在此期間玻璃化冷凍），但不改變刺激本身。若你在考慮，請詢問診所實驗室如何驗證結果，以及不同胚胎學家的切片經驗。想了解基因檢測在完整療程中的位置，<a href="/services/pgt">瀏覽我們的 PGT 總覽</a>，或<a href="/appointment">與醫師交談</a>。</p>

      <h2>資料來源與延伸閱讀</h2>
      <ul><li><a href="https://www.hfea.gov.uk/treatments/treatment-add-ons/pre-implantation-genetic-testing-for-aneuploidy-pgt-a/">HFEA — Pre-implantation genetic testing for aneuploidy (PGT-A)</a></li></ul>
    `,
  },
  {
    slug: 'egg-freezing-guide',
    title: 'Egg Freezing & Fertility Preservation: What to Know Before You Start',
    description:
      'A practical guide to egg freezing: timing, ovarian reserve tests, treatment steps, risks, recovery, costs, storage, and realistic expectations for future use.',
    date: '2026-09-10',
    category: 'Preservation',
    readingTime: '9 min read',
    excerpt:
      'Considering egg freezing? Understand the full pathway, from testing and retrieval to storage and future IVF, plus the questions to ask before starting.',
    body: `
      <p><strong>Egg freezing</strong>, also called oocyte cryopreservation, preserves unfertilized eggs for possible use in a future pregnancy. It can be an option when you are not ready to have children or when medical treatment may affect fertility. It preserves an opportunity, not a promise: some eggs may not survive warming, fertilize, develop into usable embryos, or result in a live birth.</p>
      <p>This guide explains how to think about timing, what treatment involves, and what to ask before committing to a cycle. For an overview of care at IRFC, visit our <a href="/services/egg-freezing">egg freezing service page</a>.</p>

      <h2>Who might consider fertility preservation?</h2>
      <p>People consider planned egg freezing for many reasons, including education, work, relationships, or simply not being ready to parent. Others need a time-sensitive fertility preservation consultation before chemotherapy, pelvic radiation, certain ovarian surgeries, or other treatments that could affect their ovaries.</p>
      <p>If preservation is medically urgent, ask your treating specialist and fertility physician to coordinate promptly. Whether stimulation is safe and how much time is available depend on your diagnosis and treatment plan. Do not delay prescribed medical care on your own. Egg freezing is one option; embryo freezing or other preservation approaches may be appropriate in some circumstances.</p>

      <h2>Timing: age matters, but there is no universal deadline</h2>
      <p>On average, both egg supply and the likelihood that an egg can produce a chromosomally normal embryo decrease with age. Earlier freezing generally offers better reproductive potential per egg than later freezing. Age 35 is not a sudden cutoff, and people of the same age can respond differently to stimulation.</p>
      <p>The age when eggs are frozen is an important factor in their future potential. Your age and health when you later carry a pregnancy also matter: freezing younger eggs does not remove age-related pregnancy risks. A useful decision weighs likely benefit against the cost, treatment burden, desired family size, and the possibility that you may never use the eggs.</p>

      <h2>What ovarian reserve testing can—and cannot—tell you</h2>
      <p>A consultation usually includes your menstrual and medical history, medications, previous pregnancies or fertility treatment, and family history of early menopause. Your clinician may recommend blood tests such as anti-Müllerian hormone (AMH), follicle-stimulating hormone (FSH), and estradiol, together with an ultrasound antral follicle count (AFC).</p>
      <p>These tests help estimate how your ovaries might respond and how many eggs a cycle could yield. They do <strong>not directly measure egg quality</strong>, guarantee a future pregnancy, or reliably predict whether you can conceive naturally. A low AMH does not by itself mean pregnancy is impossible; a high AMH does not guarantee healthy eggs. Discuss results alongside age and your individual history.</p>

      <h2>What happens during an egg freezing cycle?</h2>
      <ul>
        <li><strong>Planning and baseline checks:</strong> review consent, medication training, screening, costs, and the timing of treatment. Depending on your circumstances, preparation can take longer than the stimulation itself.</li>
        <li><strong>Ovarian stimulation:</strong> daily hormone injections commonly continue for about 10–14 days. Ultrasounds and blood tests guide dose adjustments and help determine when the follicles are ready.</li>
        <li><strong>Trigger injection:</strong> a final medication helps eggs mature. Retrieval is usually scheduled about 34–36 hours later. Follow your clinic’s exact timing and call if a dose is missed; do not adjust it yourself.</li>
        <li><strong>Egg retrieval:</strong> under sedation or anesthesia, a clinician uses an ultrasound-guided needle through the vaginal wall to collect fluid from the follicles. This is generally an outpatient procedure.</li>
        <li><strong>Laboratory assessment and freezing:</strong> the embryology team identifies the eggs and assesses maturity. Mature eggs suitable for freezing are vitrified and placed in cryogenic storage. Ask for the number retrieved and the number of mature eggs actually frozen.</li>
      </ul>
      <p>The stimulation and retrieval resemble the first part of an <a href="/services/ivf">IVF cycle</a>. With egg freezing, fertilization and embryo transfer happen only if you decide to use the eggs later. Calendar dates and visit frequency vary; arrange flexibility for monitoring and a responsible adult to take you home after sedation.</p>

      <h2>How many mature eggs should you freeze?</h2>
      <p>There is no egg count that guarantees a baby and no single target that is right for everyone. Planning depends on age at freezing, expected response, laboratory experience, and whether you hope for one child or more. Some people need more than one retrieval; others may decide that additional cycles are not worthwhile for them.</p>
      <p>Keep the stages separate: follicles seen on ultrasound, eggs retrieved, and mature eggs frozen are different numbers. Later, only some frozen eggs will survive warming, fertilize, form embryos suitable for transfer, and lead to a live birth. Ask your physician for a range of likely outcomes, the evidence behind any calculator used, and how much uncertainty remains. A prediction model is an estimate, not your personal outcome.</p>
      <blockquote>“Given my age, test results, and family goals, how many mature eggs might one cycle yield, and what would another cycle realistically add?”</blockquote>

      <h2>Side effects, risks, and recovery</h2>
      <p>Temporary bloating, injection-site bruising, pelvic discomfort, and fatigue can occur during stimulation. After retrieval, mild cramping or light spotting may occur. Follow your team’s instructions about pain relief, work, exercise, sex, and when to resume normal activities. Enlarged ovaries can increase the risk of ovarian torsion, so ask which activities to avoid and for how long.</p>
      <p>Less common but important risks include ovarian hyperstimulation syndrome (OHSS), bleeding, infection, and complications of sedation or anesthesia. Individualized medication choices and monitoring can reduce some risks, but cannot eliminate them.</p>
      <p><strong>Contact your care team promptly</strong> for worsening or severe abdominal pain, rapidly increasing swelling or weight, persistent vomiting, reduced urination, fever, or heavy bleeding. Seek emergency care for difficulty breathing, chest pain, fainting, or other severe symptoms. Obtain an after-hours contact and written recovery instructions before retrieval.</p>

      <h2>Costs: ask about the full pathway</h2>
      <p>A quoted cycle price may not include medications, anesthesia, all monitoring, or annual storage. Request a written breakdown and clarify what happens if a cycle is cancelled or yields no mature eggs. Also ask whether additional retrievals are priced separately.</p>
      <ul>
        <li><strong>Now:</strong> consultation, testing, medications, monitoring, retrieval, anesthesia, and freezing.</li>
        <li><strong>During storage:</strong> recurring fees, billing terms, and any transport or transfer charges.</li>
        <li><strong>When you use the eggs:</strong> warming, fertilization, embryo culture, transfer, medications, and any separately indicated testing.</li>
      </ul>
      <p>Coverage varies by insurance plan, employer benefits, and whether preservation is medically indicated. Confirm benefits and authorization requirements directly rather than assuming coverage. Our <a href="/insurance">insurance information</a> and <a href="/financing">financing overview</a> can help you prepare questions; neither replaces a personalized quote or a benefits determination.</p>

      <h2>Storage and using your eggs in the future</h2>
      <p>Vitrified eggs can remain stored for years under appropriate conditions. Ask about monitoring, emergency procedures, storage location, consent renewal, transport to another clinic, and what happens if fees go unpaid or your wishes change. Confirm any clinic policies or legal limits that may affect storage and future treatment.</p>
      <p>When you are ready, the team reassesses your health and treatment plan. Eggs are warmed and surviving eggs are typically fertilized using <a href="/services/icsi">intracytoplasmic sperm injection (ICSI)</a>. Embryos are cultured before a suitable embryo is selected for transfer. Genetic testing may be discussed when indicated; it is not automatically needed for everyone. You can also explore our <a href="/services/ivf">IVF overview</a> to understand the later stages.</p>

      <h2>Egg freezing or embryo freezing?</h2>
      <p>Egg freezing defers the choice of sperm source and preserves unfertilized eggs. Embryo freezing requires sperm now and provides information about fertilization and embryo development before storage. That distinction can matter for treatment planning, consent, and decisions about future use. Discuss both options if you have a partner or are considering donor sperm; neither guarantees a pregnancy.</p>

      <h2>Questions to bring to your consultation</h2>
      <ul>
        <li>How do my age, ovarian reserve, medical history, and family goals change the recommendation?</li>
        <li>What range of mature eggs should I expect, and when would you discuss another cycle?</li>
        <li>Do your outcome estimates measure warming survival, pregnancy, or live birth, and are they based on patients like me?</li>
        <li>How many monitoring visits will I need, and whom do I call after hours?</li>
        <li>What is included in the quote, what are the ongoing storage fees, and what will future use cost?</li>
        <li>What are my alternatives, including waiting or choosing not to freeze?</li>
      </ul>
      <p>If you are ready to discuss your own situation, <a href="/appointment">schedule a consultation</a>. The goal is a realistic plan that fits your health, priorities, and resources—not a universal egg target or a guaranteed result.</p>
    `,
    cover: '/images/patient-portrait.webp',
    coverAlt: 'A patient considering egg freezing and fertility preservation at Incinta Reproductive Fertility Center.',
    titleZh: '凍卵與生育保存：開始前該知道的事',
    descriptionZh: '實用凍卵指南：了解時機、卵巢庫存檢測、療程步驟、風險與恢復、費用、保存及日後使用的合理期待。',
    excerptZh: '考慮凍卵？從檢查、取卵到保存與日後 IVF，了解完整流程及開始前值得提出的問題。',
    coverAltZh: '一位在 Incinta Reproductive Fertility Center 考慮凍卵與生育保存的病人',
    bodyZh: `
      <p><strong>凍卵</strong>，也稱卵母細胞冷凍保存，是將未受精卵子保存起來，供日後可能的懷孕使用。尚未準備生育，或即將接受可能影響生育力的醫療處置時，都可以考慮。它保留的是機會，而非承諾：並非每顆卵子都能在解凍後存活、受精、發育為可植入胚胎，或最終帶來活產。</p>
      <p>本指南說明時機、療程與決定前值得問的問題。若想了解 IRFC 的服務流程，可先閱讀<a href="/services/egg-freezing">凍卵服務總覽</a>。</p>

      <h2>誰可以考慮生育保存？</h2>
      <p>求學、工作、伴侶關係，或尚未準備好成為父母，都可能是考慮計畫性凍卵的原因。另一些人則需要在化學治療、骨盆放射治療、部分卵巢手術或其他可能影響卵巢的治療前，儘快評估生育保存。</p>
      <p>若有醫療上的急迫性，請及早讓原治療專科與生殖醫師共同安排。能否安全刺激卵巢、可用的時間有多少，都取決於診斷與治療計畫。不要自行延後必要的醫療處置。凍卵只是選項之一；某些情況也可討論凍胚或其他保存方式。</p>

      <h2>時機：年齡重要，但沒有適用所有人的期限</h2>
      <p>平均而言，卵子數量與卵子形成染色體正常胚胎的機會會隨年齡下降。較早凍卵通常比晚些時候凍卵有較好的每顆卵子生育潛力。35 歲不是突然改變的分界，同齡者對刺激的反應也可能不同。</p>
      <p>凍卵時的年齡是未來卵子潛力的重要因素；日後懷孕時的年齡與健康狀況同樣重要。使用年輕時保存的卵子，並不能消除高齡懷孕的風險。決策應同時衡量可能的效益、費用、療程負擔、期望的子女數，以及未來可能不會使用卵子的情況。</p>

      <h2>卵巢庫存檢測能告訴你什麼？</h2>
      <p>諮詢通常會了解月經與病史、用藥、過往懷孕或生育治療，以及家族是否有提早停經的情況。醫師可能安排抗穆勒氏管荷爾蒙（AMH）、濾泡刺激素（FSH）、雌二醇抽血，以及超音波竇卵泡數（AFC）檢查。</p>
      <p>這些檢查有助估算卵巢對刺激的反應及一個週期可能取得的卵子數，卻<strong>不能直接測量卵子品質</strong>、保證日後懷孕，或可靠地預測能否自然受孕。低 AMH 不等於不可能懷孕；高 AMH 也不保證卵子健康。請結合年齡與個人病史解讀結果。</p>

      <h2>一個凍卵週期如何進行？</h2>
      <ul>
        <li><strong>規劃與基礎檢查：</strong>確認同意書、注射教學、篩檢、費用及療程時機。依個人情況，準備時間可能比刺激階段更長。</li>
        <li><strong>卵巢刺激：</strong>每日荷爾蒙注射通常約 10–14 天，配合超音波與抽血調整劑量，判斷卵泡是否準備就緒。</li>
        <li><strong>觸發針：</strong>最後一劑藥物協助卵子成熟，通常約 34–36 小時後取卵。務必遵守診所指定時間；若漏打，請聯絡團隊，不要自行調整。</li>
        <li><strong>取卵：</strong>在鎮靜或麻醉下，醫師以超音波導引細針，經陰道壁抽取卵泡液，通常當天即可返家。</li>
        <li><strong>實驗室評估與冷凍：</strong>胚胎學家辨識卵子並評估成熟度，將適合保存的成熟卵子玻璃化冷凍。請確認「取出卵子數」及「實際冷凍成熟卵子數」。</li>
      </ul>
      <p>刺激與取卵類似<a href="/services/ivf">試管嬰兒（IVF）療程</a>的前半段；凍卵則將受精與植入留到日後決定使用時。日期與回診頻率因人而異，請預留監測回診的彈性，並安排一位可靠的成人在鎮靜後接你返家。</p>

      <h2>應該保存多少顆成熟卵子？</h2>
      <p>沒有任何卵子數能保證生下寶寶，也沒有適合所有人的固定目標。規劃需考慮凍卵年齡、預期反應、實驗室經驗，以及希望有一名或多名子女。有些人需要多次取卵；也有人會認為再做一個週期不符合自己的需求。</p>
      <p>超音波看到的卵泡數、取出的卵子數、冷凍的成熟卵子數，是不同數字。未來冷凍卵子中，也只有部分能存活、受精、形成可植入胚胎並帶來活產。請醫師提供合理的結果範圍、估算工具的依據，以及仍存在的不確定性。預測模型是估計，並非你的個人結果。</p>
      <blockquote>「依我的年齡、檢查結果與家庭目標，一個週期可能保存多少顆成熟卵子？再做一個週期能增加多少機會？」</blockquote>

      <h2>副作用、風險與恢復</h2>
      <p>刺激期間可能暫時腹脹、注射處瘀青、骨盆不適或疲倦；取卵後可能有輕微痙攣或少量出血。止痛、工作、運動、性行為及恢復日常活動的時機，請依團隊指示。卵巢變大會增加卵巢扭轉風險，應詢問需要避免哪些活動及多久。</p>
      <p>較少見但重要的風險包括卵巢過度刺激症候群（OHSS）、出血、感染及鎮靜或麻醉相關併發症。個人化用藥與監測能降低部分風險，但無法完全消除。</p>
      <p>若出現腹痛加劇或劇痛、腹脹或體重快速增加、持續嘔吐、尿量減少、發燒或大量出血，請<strong>儘快聯絡照護團隊</strong>。呼吸困難、胸痛、昏厥或其他嚴重症狀，應立即就醫。取卵前請取得非門診時間聯絡方式與書面恢復指示。</p>

      <h2>費用：了解整條療程的支出</h2>
      <p>一個週期的報價不一定包含藥物、麻醉、所有監測或每年保存費。請索取書面明細，確認取消週期或沒有成熟卵子時如何收費，以及追加取卵是否另行計價。</p>
      <ul>
        <li><strong>目前：</strong>諮詢、檢查、藥物、監測、取卵、麻醉與冷凍。</li>
        <li><strong>保存期間：</strong>定期保存費、付款條款，以及運送或轉院費。</li>
        <li><strong>日後使用：</strong>解凍、受精、胚胎培養、植入、用藥及另有適應症的檢測。</li>
      </ul>
      <p>保障因保險方案、雇主福利及是否有醫療適應症而異，請直接確認給付與事前授權，不要假定一定涵蓋。可參考我們的<a href="/insurance">保險資訊</a>及<a href="/financing">付款與融資說明</a>準備問題；這些資訊不能取代個人報價或保險給付認定。</p>

      <h2>保存及日後使用卵子</h2>
      <p>在適當條件下，玻璃化冷凍卵子可以保存多年。請了解監測、緊急應變、保存地點、同意書續簽、轉運至其他診所，以及未繳費或意願改變時的處理方式。也應確認診所政策或法律是否限制保存與日後治療。</p>
      <p>準備使用時，團隊會重新評估你的健康與治療計畫。卵子解凍後，存活的卵子通常透過<a href="/services/icsi">卵胞漿內單精子注射（ICSI）</a>受精，再培養胚胎並選擇適合的胚胎植入。若有適應症，可討論基因檢測，但並非每個人都需要。閱讀<a href="/services/ivf">IVF 總覽</a>可了解後續階段。</p>

      <h2>凍卵還是凍胚？</h2>
      <p>凍卵保存未受精卵子，將精子來源的選擇留到未來；凍胚則需要現在決定精子來源，並可在保存前了解受精及胚胎發育情況。這個差別會影響療程規劃、同意書及未來使用的決定。有伴侶或正在考慮捐精時，可一起討論兩種選項；兩者都不保證懷孕。</p>

      <h2>諮詢時值得帶上的問題</h2>
      <ul>
        <li>我的年齡、卵巢庫存、病史與家庭目標，如何影響建議？</li>
        <li>預期能保存多少顆成熟卵子？什麼情況會討論追加週期？</li>
        <li>估算的是解凍存活、懷孕，還是活產？資料是否來自與我相似的病人？</li>
        <li>需要多少次監測回診？非門診時間要聯絡誰？</li>
        <li>報價包含什麼？保存費與未來使用費用各是多少？</li>
        <li>還有哪些選項，包括等待或選擇不凍卵？</li>
      </ul>
      <p>若想討論自己的情況，歡迎<a href="/appointment">預約諮詢</a>。目標是制定符合健康、優先事項與資源的務實計畫，而非套用固定卵子數或承諾結果。</p>
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

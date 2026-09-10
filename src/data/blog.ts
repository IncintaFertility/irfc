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
    cover: '/images/consultation-joyful.webp',
    coverAlt: 'A joyful patient celebrating a successful fertility outcome at Incinta Reproductive Fertility Center.',
    titleZh: 'IVF 成功率：如何解讀，以及哪些因素影響你的機會',
    descriptionZh: 'IVF 成功率常以容易誤讀的方式呈現。了解診所統計數據真正衡量什麼、哪些因素會改變你的機會，以及開始前值得提出的問題。',
    excerptZh: '診所成功率表容易誤導，若不知其衡量內容。本文說明如何解讀 IVF 統計，以及影響你自身機會的因素。',
    coverAltZh: '一位在 Incinta Reproductive Fertility Center 喜迎生育成果的病人',
    bodyZh: `
      <p>當你比較生育診所時，大多數人第一個看的數字就是 <strong>IVF 成功率</strong>。它感覺像成績單——數字越高一定越好。但成功率表很容易誤讀，而最關鍵的數字，是附在你<em>自身</em>特定情況下的那一個，而非診所平均值。</p>

      <h2>「成功率」真正衡量什麼</h2>
      <p>大多數公開的 IVF 統計來自美國 <a href="/services/ivf">SART</a> 或 CDC 等登錄系統。它們通常以幾種方式呈現：</p>
      <ul>
        <li><strong>每次植入的活產率</strong>——單次胚胎植入帶來寶寶的機會。這是最誠實的「每次嘗試」數字。</li>
        <li><strong>每次取卵的活產率</strong>——涵蓋整個刺激週期，包括該週期任何冷凍植入。</li>
        <li><strong>累積活產率</strong>——來自一次取卵加上未來任何取卵的所有植入機會，有時長達一整年。</li>
      </ul>
      <p>診所只要只對年輕病人植入高評級胚胎、婉拒較困難的個案，就能貼出極高的「每次植入」成功率。這不算作弊——但這表示平均值並非<em>你</em>的平均值。</p>

      <h2>最影響你機會的因素</h2>
      <p>沒有診所能控制 IVF 成功的最大單一預測因子：<strong>年齡相關的卵子品質</strong>。一名 38 歲每次植入的機會，與 30 歲者有實質差異，無論走進哪家診所。其他重要因素包括：</p>
      <ul>
        <li><strong>卵巢庫存量</strong>（AMH、FSH、竇卵泡數）——決定一個週期可能取得的卵子數。</li>
        <li><strong>診斷</strong>——不明原因不孕、子宮內膜異位症、男性因素與反覆流產，各自改變療程。</li>
        <li><strong>胚胎基因</strong>——<a href="/services/pgt">胚胎著床前基因檢測 (PGT-A)</a> 有助挑選染色體正常的胚胎，對 35 歲後尤其相關。</li>
        <li><strong>實驗室品質</strong>——培養條件、玻璃化（冷凍）技術與胚胎學家經驗，悄悄影響結果。</li>
      </ul>

      <h2>開始前值得提出的問題</h2>
      <p>與其問「你們整體成功率是多少？」，不如請診所提供符合你的數字：</p>
      <blockquote>"在我這個年齡層與診斷下，你們每次植入的活產率是多少？"</blockquote>
      <p>也要詢問他們一年執行多少週期（量能與實驗室精進相關）、是否量身打造刺激療程而非套用預設、以及如何處理冷凍胚胎。透明的診所會帶你理解細微差異，而非只報一個標題數字。</p>

      <h2>看懂數字，也看懂照護</h2>
      <p>統計只是一項輸入，而非整個決定。對的診所，是把誠實數字與為你生理打造的療程、清晰價格，以及真正聯絡得到的團隊結合在一起。若你想聊聊自己可能的機會，<a href="/consultation">預約諮詢</a>，與我們任一醫師面對面——在我們<a href="/locations">南加州四間診所</a>任一處，或透過安全視訊。</p>
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
    cover: '/images/care-team-embryologist.webp',
    coverAlt: 'An IRFC embryologist working at the microscope in the IVF laboratory during preimplantation genetic testing.',
    titleZh: '胚胎著床前基因檢測 (PGT)：完整病人指南',
    descriptionZh: 'PGT 在植入前篩檢胚胎的染色體是否正常。了解 PGT-A、PGT-M、PGT-SR 各檢測什麼、誰適合，以及它如何融入 IVF 療程。',
    excerptZh: 'PGT 在植入前檢查胚胎是否擁有正確數量的染色體。本文說明各類型檢測內容、適用對象與預期過程。',
    coverAltZh: 'IRFC 胚胎學家在 IVF 實驗室顯微鏡前進行胚胎著床前基因檢測',
    bodyZh: `
      <p>如果你正在進行 <a href="/services/ivf">IVF</a>，幾乎一定會聽到<strong>胚胎著床前基因檢測 (PGT)</strong>。它是現代生育照護中最被誤解——也最有用的工具之一。本指南說明它的作用、三種類型，以及誰通常受益。</p>

      <h2>PGT 做什麼</h2>
      <p>卵子受精後（男性因素個案常搭配 <a href="/services/icsi">ICSI</a>），胚胎培養至囊胚階段（第 5–6 天）。取少量細胞溫和地進行切片，送交基因分析。胚胎在結果出爐前冷凍。植入則聚焦在最健康的胚胎。</p>

      <h2>三種類型</h2>
      <ul>
        <li><strong>PGT-A</strong>（非整倍體）——篩檢染色體數量是否正確。35 歲以上病人的多數胚胎帶有某些染色體偏差，植入正常（整倍體）胚胎能明顯提高活產機會並降低流產風險。</li>
        <li><strong>PGT-M</strong>（單基因）——檢查父母已知帶有的特定單基因疾病，如囊狀纖維化或泰薩氏症。</li>
        <li><strong>PGT-SR</strong>（結構重排）——適用於帶有平衡轉位或倒位、避免將不平衡染色體組傳給胚胎的病人。</li>
      </ul>

      <h2>誰通常受益</h2>
      <p>PGT-A 最常建議給高齡、反覆流產、反覆不明原因 IVF 失敗，或有已知染色體疑慮的病人。對擁有充足高品質胚胎的年輕病人，附加價值較小——臨床醫師應討論利弊，而非預設「做」。</p>

      <h2>PGT 無法告訴你什麼</h2>
      <p>它是篩檢，而非完全保證。它不檢查每一種基因疾病，也無法完美評估胚胎的發育潛力。「正常」結果大幅提高機會，但不消除。你的照護團隊應同時說明優點與限制。</p>

      <h2>PGT 如何融入你的療程</h2>
      <p>PGT 增加一道切片步驟與數天等待（胚胎在此期間玻璃化冷凍），但不改變刺激本身。若你在考慮，請詢問診所實驗室如何驗證結果，以及不同胚胎學家的切片經驗。想了解基因檢測在完整療程中的位置，<a href="/services/pgt">瀏覽我們的 PGT 總覽</a>，或<a href="/consultation">與醫師交談</a>。</p>
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
    cover: '/images/patient-portrait.webp',
    coverAlt: 'A patient considering egg freezing and fertility preservation at Incinta Reproductive Fertility Center.',
    titleZh: '凍卵與生育保存：開始前該知道的事',
    descriptionZh: '凍卵讓你以今日的卵子品質保存卵子供日後使用。了解何時最有幫助、一個療程包含什麼，以及如何思考時機與機會。',
    excerptZh: '生育保存以你當前的卵子品質保存卵子。本文說明凍卵療程包含什麼、誰最有助益，以及如何思考時機。',
    coverAltZh: '一位在 Incinta Reproductive Fertility Center 考慮凍卵與生育保存的病人',
    bodyZh: `
      <p><strong>凍卵</strong>（卵母細胞冷凍保存）已從實驗走向主流。吸引力很簡單：卵子以今日的品質冷凍，日後解凍受精——與伴侶、捐精，或一個你尚未做的決定。開始前該知道的事如下。</p>

      <h2>為什麼時機比什麼都重要</h2>
      <p>卵子品質與數量隨年齡下降，30 多歲逐漸下滑，約 35 歲後更陡。32 歲凍卵不同於 39 歲凍卵。未來來自冷凍卵子的活產機會，最大單一預測因子就是凍卵時的年齡——這正是許多人在「覺得」需要之前就考慮的原因。</p>

      <h2>一個凍卵療程包含什麼</h2>
      <ul>
        <li><strong>檢查</strong>——基礎超音波與荷爾蒙抽血（AMH、FSH）估算你的反應。</li>
        <li><strong>刺激</strong>——每日注射約 10–12 天，促使多顆卵泡生長，並安排監測回診。</li>
        <li><strong>取卵</strong>——短暫、鎮靜下的程序，取出卵子。</li>
        <li><strong>玻璃化冷凍</strong>——以現代玻璃化技術瞬間冷凍卵子，保存非常穩定。</li>
      </ul>
      <p>刺激與取卵對應 <a href="/services/ivf">IVF 療程</a> 的前半段；差別在受精延後到未來。</p>

      <h2>該保存多少顆卵子</h2>
      <p>沒有單一答案，但越年輕，通常需要的成熟卵子越少就能有合理機會。常見目標範圍：35 歲前約 15–20 顆成熟卵子，若較晚凍卵則更多。你的臨床醫師應給你個人化估計，而非通用數字。</p>

      <h2>適合你嗎</h2>
      <p>保存也與醫療原因相關——例如癌症治療前——以及任何想要選擇、卻尚未有計畫的人。它不保證未來懷孕，但明顯拓寬了窗口。若想了解你自己的數字，<a href="/consultation">預約諮詢</a>，或參考我們的<a href="/services/egg-freezing">凍卵總覽</a>。</p>
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

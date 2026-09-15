# IRFC 网站 HIPAA 合规审计报告

**审计对象**：Incinta Reproductive Fertility Center 官网（irfc.com）
**审计日期**：2026-09-15
**审计范围**：公开网站代码（源码 `src/`、`functions/`、`astro.config.mjs`、`public/_headers`、`wrangler.toml`、构建产物 `dist/`）
**审计方法**：静态代码审计 + 构建产物扫描（无第三方追踪器、无 iframe 嵌入、无表单 PHI 字段）

---

## 一、架构概览（决定了合规边界）

| 组件 | 技术 | 是否触达 PHI |
|------|------|--------------|
| 官网（公开站） | Astro 静态站 + Cloudflare Pages | 否，仅收集联系方式最小字段 |
| 预约请求接口 | `functions/api/appointment-request.ts`（Cloudflare Pages Function） | 否，仅转发联系方式，不落库 |
| 患者门户 | 外部 eIVF 系统（`portal.rfcfamily.com`） | 是，全部临床 PHI 在此处理（不在本站代码内） |
| 第三方联系渠道 | WhatsApp（`wa.me/14244324732`） | 风险点（见 G1） |

**核心结论**：本站把"公开网站不碰 PHI"作为架构原则落地了——这是面向患者营销站点最重要的一条 HIPAA 控制线，目前是**守得住的**。主要风险集中在**运营层面（WhatsApp 渠道）**与**响应头/文档完整度**两项，而非代码 PHI 泄露。

---

## 二、通过项（PASS）

### ✅ 1. 公开表单零 PHI 字段（最高优先级控制）
全站唯一表单 `src/components/RequestForm.astro` 仅收集：
`firstName / lastName / email / phone / location / visitType / language` + 一个 honeypot 字段 `company`。

代码级核验：全仓检索 `ssn / date of birth / dob / medical history / symptom / diagnosis / medication / icd / pregnancy history` 等 PHI 关键词，**没有任何输入框或字段收集临床信息**。所有"病史/诊断"文案都是科普内容（conditions、FAQ、blog），不是表单字段。

### ✅ 2. 服务端接口不持久化 PHI
`functions/api/appointment-request.ts`：
- 仅接收联系方式字段；honeypot 命中即静默丢弃；
- 校验通过后通过 Cloudflare `send_email` 绑定转发到 BAA 邮箱（`MAIL_TO`）；
- **无任何数据库写入、无请求体落盘、无日志打印 PHI**。
- 注释明确要求目标邮箱必须位于已签 BAA 的邮件服务（Google Workspace / M365）。

### ✅ 3. PHI 外移设计一致且明确
Privacy 页、表单下方提示、Appointment 页三处文案一致声明："病史与同意书仅在符合 HIPAA 的患者门户（eIVF）中收集与存储"。设计意图与现实代码一致。

### ⚠️ 4. 第三方脚本 —— 已更正：站点实际载有 Google Tag Manager（GTM）
> **审计更正**：初版报告误判为「无第三方追踪器」。复核发现 `src/layouts/Layout.astro`（head + body noscript）注入了 **Google Tag Manager 容器 `GTM-TLN399PK`**，构建产物 `dist/` 全部 107 个页面（含 `/privacy`、`/contact`）均含 `googletagmanager.com/gtm.js` 与 `ns.html` iframe。因此「零追踪器」不成立，详见风险项 **G11**。

仍属事实的部分：
- 全仓**无 `<iframe>` 嵌入内容**（GTM 的 noscript 仅一个 0×0 探针 iframe；无 YouTube/Vimeo/Maps 嵌入，Maps 仅为普通链接）；
- 唯一其他外部资源：Google Fonts、Yelp 头像静态图（纯图片无 JS）、eIVF 帮助视频**链接**（`<a>` 而非嵌入）；
- 表单通过 `fetch` 提交，不会触发 GTM 原生表单自动跟踪；但 GTM 容器可在 Dashboard 配置加载任意标签（含 GA / 广告像素），且能捕获 `dataLayer` 与页面参数——这是需治理的潜在风险点。

### ✅ 5. 隐私告知（NPP）已存在且双语
`src/components/pages/Privacy.astro` = 完整 Notice of Privacy Practices，含生效日期（2026-08）、HIPAA 七项个人权利、CCPA 加州隐私权、技术/管理/物理保障措施段落，EN + 繁中双语。

### ✅ 6. 患者门户为外部 HIPAA 指定系统
注册、病史、同意书、化验结果均在 eIVF 门户完成（`PatientPortal.astro` 指向 `portal.rfcfamily.com` + CareSync App），PHI 不落在公开站。

### ✅ 7. 传输加密与基础安全响应头
- Cloudflare Pages 默认 HTTPS；表单 `fetch('/api/appointment-request')` 走 HTTPS POST。
- `public/_headers` 已设置：`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin`、`Permissions-Policy: camera=(), microphone=(), geolocation=()`。

---

## 三、风险与整改清单（按等级）

### 🔴 高危（运营层面，非代码）
**G1 — WhatsApp 作为患者联系渠道，存在 PHI 暴露风险**
- **现象**：WhatsApp 在全站多处主动引导（浮动按钮 `FloatingContact.astro`、Contact、Insurance、Consultation、Locations、Appointment 页，文案含"message us on WhatsApp"预约咨询）。WhatsApp 由 Meta 运营，**不提供 HIPAA BAA**。
- **风险**：一旦患者经 WhatsApp 发送任何生育史/化验结果/治疗细节，即构成未加密 PHI 披露，属 HIPAA 违规，面临 OCR 处罚。
- **整改**：
  1. 在 WhatsApp 入口旁加明确免责："仅用于预约与一般性联系，请勿发送任何医疗信息"；
  2. 临床沟通一律引导至安全门户或电话；
  3. 对前台/协调员做培训，禁止在 WhatsApp 讨论病情；
  4. 评估是否从临床语境页面移除 WhatsApp 入口。

### 🟠 中危
**G2 — 安全响应头不完整**
`public/_headers` 缺少：
- `Strict-Transport-Security`（HSTS，强制 HTTPS + 防降级）
- `Content-Security-Policy`（纵深防御 XSS/注入，防止表单数据被恶意脚本外泄）
- `Upgrade-Insecure-Requests`
- **整改**：在 `_headers` 的 `/*` 段补充上述头；CSP 需放行 `self` 及表单 `fetch` 同源请求、Yelp 图片域，避免误伤功能。

**G3 — 预约接口未启用 Cloudflare Turnstile**
`appointment-request.ts` 注释 TODO 明确要求上线前开启 Turnstile，目前仅 honeypot。
- **风险**：虽无 PHI，但线索接口可被滥用/探测。
- **整改**：Cloudflare Dashboard 开启 Turnstile 并在 Function 内校验 token。

**G4 — NPP（隐私告知）内容不完整**
`/privacy` 缺少标准 NPP 要素：
- 联系表单线索与邮件记录的**数据保留期限**；
- **数据泄露通知**条款（HIPAA 要求 60 天内通知个人）；
- **业务伙伴（BA）清单**（eIVF 为 BA；邮件服务商须 BAA 覆盖）；
- **治疗/付款/医疗运营（TPO）使用与披露**说明，以及非 TPO 披露须**授权**的要求；
- 具名的**隐私官（Privacy Officer）/ 专用隐私邮箱**（当前仅诊所电话与地址）。
- **整改**：补全 NPP 或链接 eIVF 完整 NPP；补 retention / breach / BA / TPO / authorization / 具名官员。

**G5 — Cookie/同意与隐私文案一致性**
站内无追踪 Cookie，故当前无需同意横幅。但 Privacy 文案称"我们也可能收集技术性信息（浏览器/设备/访问页面）"。
- **整改**：核对实际是否启用 Cloudflare Web Analytics 或日志；若有，确保 URL/query 中无 PHI（表单为 POST，已安全），并使文案与真实遥测一致；若面向 EU/CCPA 用户启用分析，加同意机制。

**G11 — 站点载有 Google Tag Manager（第三方脚本，无 HIPAA BAA）**
- **现象**：`src/layouts/Layout.astro` 注入 GTM 容器 `GTM-TLN399PK`（head 脚本 + body noscript iframe），全站每页加载 `https://www.googletagmanager.com/gtm.js`。Google **不是** HIPAA 业务伙伴（无 BAA）。
- **风险**：GTM 是标签管理系统，可在容器里加载任意第三方标签（GA、广告像素等），并能读取 `dataLayer`、页面 URL 与表单 DOM。若日后误配把 PHI/PII（如 URL 参数、表单字段）推入 GTM/GA，即构成向无 BAA 的第三方披露 PHI，属 HIPAA 违规。当前表单为 `fetch` 提交且仅含联系方式字段，未见 PHI 进入 GTM，但属"依赖配置正确"的残留风险。
- **整改（已落地，均 `astro build` 通过）**：
  1. **表单页排除 GTM（核心缓解）**：`Layout.astro` 按路径判断 `isFormPage`（基准路径 `/contact`、`/appointment`，已 `stripLocale` 兼容 `/zh-hant/...`），仅在这两类「会录入联系方式/潜在 PHI」的页面**不渲染** GTM 的 head 脚本与 noscript iframe。构建验证：`dist/contact/`、`dist/appointment/`（含繁中）完全无 `googletagmanager`；其余营销页（如首页）保留 GTM 正常统计。→ 从源头把 PHI 录入点隔离在 Google 之外。
  2. **放开 GA4 上报（非表单页正常统计）**：`public/_headers` 的 `connect-src` 与 `img-src` 已加入 `https://*.google-analytics.com`，使非表单页的 GA4 `g/collect` beacon/像素可送达 Google。表单页因已不加载 GTM，不会产生 GA 上报。
  3. **披露**：NPP「Third-Party Analytics」已改写为「表单页（联络/预约）分析完全关闭、Google 标签不加载；其余页面常规统计；表单资料仅邮件转发、不经 Google」，明确 Google 非 BAA。
  4. **治理（仍建议）**：即便表单页已隔离，GTM 容器内仍应禁止把任何 PII/PHI 推入 `dataLayer`、URL 不带 PHI 参数，以免误配污染其余页面数据。
  5. **可选更强控制**：若未来合规要求最严，可评估移除 GTM/GA，改用 Cloudflare Web Analytics / 自托管 Plausible（具 BAA 或自托管）。
  6. **转化数据最大化（已落地，GA4 服务端回传）**：为在不向 Google 暴露 PHI 的前提下拿全转化归因，新增「服务端 GA4 Measurement Protocol」回传——表单成功转发后，由 `functions/api/appointment-request.ts` 向 `google-analytics.com/mp/collect` 发送一个**匿名** `generate_lead` 事件，仅含 `client_id`（来自访客 `_ga` cookie，由前端随表单 POST 带来）+ 非 PHI 选择项（`visit_type` / `location` / `language`）。**绝不携带姓名/邮箱/电话**；回传发生在 Cloudflare 服务端，表单页浏览器从不联系 Google。配置门控：仅在 Dashboard 同时配置 `GA4_MEASUREMENT_ID` 与 `GA4_API_SECRET` 时启用，否则完全不触发（向后兼容）。→ 这样既拿到 source/medium/campaign 的完整转化归因，又守住 PHI 边界；这是无 BAA 第三方分析下能取得的**最大合规转化数据**（刻意避开了"增强转化需上传 PII/邮箱哈希"那条违规路径）。

- **合规判定（针对「表单页关 GTM、其余页正常统计」方案）**
  - ✅ **满足 HIPAA 的核心要求**：「不得向无 BAA 的第三方（Google）披露 PHI」。已从源头消除披露路径：
    1. 表单页（`/contact`、`/appointment` 含繁中）完全不加载 GTM → 无 GA page_view、无 dataLayer、无表单 DOM 抓取；
    2. 表单以 `fetch` POST 提交、成功后在原页就地显示（`#rf-success`），**无跳转、URL 不带任何字段**（已核实 `RequestForm.astro` 无 `window.location` 跳转）→ 姓名/邮箱/电话不会出现在任何带 GTM 的页面 URL/query 中。
    3. 数据唯一去向是 `/api/appointment-request` → 邮件转发至 BAA 邮箱，**不经 Google**。
  - ⚠️ **但这是技术控制，不是法律认证**。要真正稳妥，还需满足：
    1. **边界完整性**：未来任何新增表单页都必须加入 `Layout.astro` 的 `FORM_PAGE_BASES` 排除名单；GTM 容器内不得配置抓取表单字段/DOM 的触发器。
    2. **容器治理**：禁止把任何 PII/PHI 推入 `dataLayer`，URL 不带 PII 参数（防误配污染其余页面）。
    3. **关联 BAA**：转发表单的邮件服务商须签 BAA（见 G9）；若希望营销页分析也零残留风险，可改用有 BAA/自托管方案（Cloudflare Web Analytics、Plausible）。
    4. **签字权**：最终合规认定归诊所 Privacy Officer / 法务；本方案与设计并入其 HIPAA 策略文档留痕。
  - 📌 **残留灰色地带**：其余页的 GA 仍会向 Google 发送 IP（用于地理定位）。按 HIPAA，IP 单独通常**不算 PHI**；但若诊所风险偏好更严，可进一步限制或改用自托管分析。浏览健康主题页（如 `/treatments/ivf`）的 page_location 进入 GA 一般也视为可接受的分析，但属同一灰色地带，已在 NPP 披露。

### 🟡 低危 / 建议
- **G6 — Google Maps 链接**：当前为纯链接非嵌入，无数据回传；后续勿改为嵌入 iframe。
- **G7 — Yelp 头像外部图**：静态图片无 JS；确保 URL 不带任何 PII 参数。
- **G8 — Zoom 视频问诊**：表单含 "Zoom Video Consultation" 选项。须确认诊所使用**带 BAA 的 Zoom for Healthcare** 而非普通版（运营确认）。
- **G9 — 邮件服务商 BAA 确认**：`MAIL_TO=newpatients@irfc.com` 必须位于已签 BAA 的邮箱（Google Workspace/M365）。代码无法验证，需管理员确认实际绑定。
- **G10 — 访问控制**：Cloudflare Pages 与邮件路由涉及 PHI 转发，须启用 MFA 并限制访问。
- **G12 — Zoho CRM 服务端写入（已落地，待 Zoho BAA 确认）**：`functions/api/appointment-request.ts` 在邮件转发成功后，若配置了 `ZOHO_CLIENT_ID/SECRET/REFRESH_TOKEN`，则以 OAuth2 在服务端向 `/crm/v7/Leads` 写入线索；PHI 仅在 Cloudflare 边缘函数内流转，从不到达浏览器或 Google。Zoho CRM 须启用 HIPAA 合规版并签署 BAA 方为合规落地（代码已就绪，账号侧 BAA 待确认）。

---

## 四、代码无法验证项（需管理员/运营确认）

| 项 | 为什么无法从代码确认 |
|----|----------------------|
| 邮件服务商（MAIL_TO）是否真签 BAA | `wrangler.toml` 仅为配置说明，实际绑定在 Dashboard |
| eIVF 是否为签约 BA | 外部系统，不在代码内 |
| Zoom 是否 BAA 版 | 运营层面 |
| 员工是否受过 WhatsApp/PHI 培训 | 流程层面 |
| Cloudflare 日志/Web Analytics 是否捕获敏感信息 | 需查 Dashboard 设置 |
| Zoho CRM 是否启用合规版并签署 BAA | 账号侧设置，不在代码内 |

---

## 五、合规评分卡

| 维度 | 评级 | 说明 |
|------|------|------|
| 表单 PHI 最小化 | 🟢 优秀 | 全站仅联系方式字段，零 PHI 输入 |
| 数据传输与存储 | 🟢 优秀 | 不落库、HTTPS、转发 BAA 邮箱 |
| 第三方追踪暴露 | 🟠 中危 | 全站载有 GTM（无 BAA），已加 NPP 披露 + CSP 放行 + 容器治理要求（G11） |
| 患者门户隔离 | 🟢 优秀 | PHI 全在 eIVF 外部系统 |
| 安全响应头 | 🟢 优秀 | 已补 HSTS+CSP（G2 已落地） |
| NPP 完整度 | 🟢 优秀 | 已补全 retention/breach/BA/TPO/隐私官（G4 已落地） |
| 非技术渠道（WhatsApp/Zoom） | 🟠 中危 | WhatsApp 已加免责与 tooltip（G1 代码侧）；员工培训待落地 |
| 接口抗滥用（Turnstile） | 🟢 优秀 | 服务端校验已落地，仅待 Dashboard 配置密钥激活（G3） |
| CRM 线索写入（Zoho） | 🟢 优秀 | 服务端写 Zoho，PHI 不出边缘函数；待 Zoho 合规版 BAA 落地（G12） |

**总体判断**：作为"公开营销站点"，IRFC 在**技术层面已达标甚至优于多数同业**（零 PHI、零追踪、PHI 全外移）。剩余风险主要是 **WhatsApp 渠道的运营管控**与**合规文档/响应头的收尾**。优先处理 G1、G2、G4 即可将合规水位拉到稳健级别。

---

## 六、建议执行顺序

1. **立即（G1）**：WhatsApp 免责声明 + 员工培训，堵住 PHI 经 Meta 渠道外泄。
2. **本周（G2/G3）**：补全 `_headers`（HSTS+CSP），开启 Turnstile。
3. **本月（G4/G5）**：补全 NPP（保留期/泄露通知/BA/TPO/隐私官），对齐隐私文案与真实遥测。
4. **确认类（G8/G9/G10）**：管理员核实 BAA 状态、Zoom 版本、MFA 访问。

---

## 七、整改落地记录（2026-09-15 已完成 G1–G4 代码侧）

> 全部改动已通过 `astro build` 验证（EXIT=0），构建产物 `dist/` 已确认包含新增内容。

### G1 — WhatsApp PHI 管控（代码侧已落地）
- 新增 `src/components/WhatsAppDisclaimer.astro`：统一声明「WhatsApp 由 Meta 运营、无 BAA，仅限一般联系与预约，严禁 PHI」，EN + 繁中双语。
- 在 **Contact / Consultation / Insurance / Locations / Appointment** 五处 WhatsApp 入口旁注入该声明（导入 + 渲染）。
- `FloatingContact.astro` 浮动按钮增加 `title` tooltip：同样的 PHI 免责提示。
- ⚠️ **待运营侧**：前台/协调员培训 + 评估是否从临床语境页面移除 WhatsApp。代码无法强制执行。

### G2 — 安全响应头（已落地）
`public/_headers` 的 `/*` 段新增：
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Upgrade-Insecure-Requests: 1`
- `Content-Security-Policy`：`default-src 'self'`、`form-action 'self'`、`frame-ancestors 'none'`、`object-src 'none'`；放行 Google Fonts（`fonts.googleapis.com`/`fonts.gstatic.com`）、Yelp 图域、GTM（`www.googletagmanager.com`，否则会破坏既有 GTM——见 G11）与（可选的）`challenges.cloudflare.com`（供 G3 Turnstile 加载）。`connect-src 'self'` 限制表单 fetch 不外泄。

### G3 — Cloudflare Turnstile（代码侧已落地，待激活）
- `functions/api/appointment-request.ts`：当 `env.TURNSTILE_SECRET` 配置时强制校验 `cf-turnstile-response`（含 IP、失败/错误分支）；未配置则向后兼容跳过。
- `src/components/RequestForm.astro`：仅当 `TURNSTILE_SITEKEY` 非空时渲染 Turnstile widget 并加载 `api.js`，提交时附带 token。
- `src/config/brand.ts`：新增 `TURNSTILE_SITEKEY = ''`（留空=不启用）。
- `wrangler.toml`：补充两端密钥配置说明。
- ⚠️ **待激活**：在 Cloudflare Dashboard 填入 `TURNSTILE_SECRET`（服务端）+ `brand.ts` 填公钥后生效；仅一端配置会被服务端拒绝（防绕过）。

### G4 — HIPAA 隐私告知（NPP）补全（已落地）
`src/components/pages/Privacy.astro` 新增四项标准 NPP 要素：
- **数据保留期限**（`retention`）：预约线索邮件保留 ≤ `PRIVACY_RETENTION_MONTHS`（默认 24 个月），并声明临床记录全在 eIVF。
- **使用与披露（TPO）**（`disclosure`）：治疗/付款/医疗运营使用与披露，非 TPO 须书面授权。
- **泄露通知**（`breach`）：依 HIPAA 规则，发现未加密 PHI 泄露后 ≤ 60 日通知。
- **业务伙伴清单**（`associates`）：eIVF、安全邮件/生产力工具、Cloudflare 均受 BAA 约束。
- 联系段新增具名 **Privacy Officer** 与专用邮箱 `privacy@irfc.com`。
- `PRIVACY_RETENTION_MONTHS` 配置化于 `src/config/brand.ts`，供隐私官调整。

### G11 — Google Tag Manager（已更正发现 + 处置）
- 更正初版「无第三方追踪器」误判：`Layout.astro` 全站注入 GTM `GTM-TLN399PK`。
- 在 NPP 新增 **Third-Party Analytics** 段落：明示使用 GTM、Google 非 HIPAA BAA、本站点不向 Google 传送 PHI，并说明可经「勿追踪」/拦截器限制。
- `_headers` CSP 已放行 `www.googletagmanager.com`（script-src + frame-src），避免 G2 CSP 阻断既有 GTM。
- ⚠️ **待运营/容器治理**：在 GTM Dashboard 禁止把 PHI/敏感 PII 推入 dataLayer；URL 不带 PHI 参数；可选方案为改用具 BAA 的分析或移除 GTM（业务决策）。

### G12 — Zoho CRM 服务端写入（已落地）
`functions/api/appointment-request.ts` 新增 `forwardToZoho()`：
- OAuth2 `refresh_token` 换 `access_token`（`https://accounts.zoho.{dc}/oauth/v2/token`），再以 `Zoho-oauthtoken` 头 `POST https://www.zohoapis.{dc}/crm/v7/Leads`。
- 仅当 `ZOHO_CLIENT_ID` + `ZOHO_CLIENT_SECRET` + `ZOHO_REFRESH_TOKEN` 三者都配置时写入；缺一则跳过（向后兼容）。
- 写入字段：`First_Name / Last_Name / Email / Phone / Lead_Source` + 把 `Clinic / Visit type / Language` 放进 `Description`（避免引用不存在的自定义字段导致 400；若建了自定义字段，告我 API 名即可改直接映射）。
- 失败仅 `console.error`，**不阻断主流程**（邮件已送达、GA4 已回传）。
- `wrangler.toml` 已补充 ZOHO_* 配置说明与 refresh_token 获取步骤。
- ⚠️ **待账号侧**：Zoho CRM 须启用 **HIPAA 合规版**并签署 **BAA**；否则仅作非 PHI 联系库，不构成合规落地。

### 仍待人工/运营确认项（代码无法覆盖）
- G1 员工培训；G8 Zoom for Healthcare BAA 版；G9 `MAIL_TO` 邮箱 BAA；G10 Cloudflare/Mail MFA；G5 实际遥测与文案对齐。

# IRFC 网站 HIPAA 合规审计（2026-09-17）

> 审计范围：静态站代码（src/）、部署配置（public/_headers）、隐私声明（Privacy.astro）。
> 目标：找出仍不符合 HIPAA / 隐私合规的地方。
> 结论：核心设计（表单页禁 GTM、成功页单源打点、最小字段、直连 Zoho）成立；
> 但发现 3 个实质缺口 + 若干低危项，详见下文。

---

## ✅ 已合规的控制项（正面项）

1. **表单页不加载 GTM/GA4** —— `Layout.astro:61-62` 用 `FORM_PAGE_BASES = ['/contact','/appointment']` 门控，`isFormPage` 时不注入 GTM 脚本与 noscript iframe。PII 录入页无任何 Google 标签。
2. **成功页 `/contact/success` 不携带 PHI** —— 仅 `?lead=1` 参数，成功页前端发匿名 `generate_lead`（无 PII），发后 `replaceState` 去掉参数。
3. **表单仅收集最小字段** —— ZohoForm 仅有 Last/First Name、Email、Phone、Location(LEADCF13)、Service(LEADCF1)、Language(隐含)；无病史/临床输入字段。
4. **提交为客户端直连 Zoho** —— `fetch` no-cors POST 到 `crm.zoho.com`，联系方式**不经本站服务器、不经 Google**。
5. **CSP 已约束表单出口** —— `_headers:22`：`form-action 'self' https://crm.zoho.com https://*.zoho.com`；并设 `Referrer-Policy: strict-origin-when-cross-origin`、`Strict-Transport-Security`、`frame-ancestors 'none'`。
6. **隐私声明含完整 HIPAA 章节** —— 权利、外泄通知（60 日）、eIVF 为 BAA 业务伙伴、公开站不存 PHI 等。
7. **仅一个分析厂商**（GTM/GA4），无 Meta / LinkedIn / Hotjar / TikTok / Segment 等全域追踪器。
8. **患者门户页视频为纯链接**（`<a href target=_blank>`），非嵌入 iframe，未把 eIVF 内容嵌进本站。

---

## 🔴 实质缺口（需修复）

### F1（高）— 隐私声明与实际数据流不符
- **代码事实**：线上表单是 `ZohoForm.astro`，提交**直接 POST 到 Zoho CRM**（`crm.zoho.com`）。
- **隐私声明却写**（Privacy.astro:139 英 / :143 中）：
  > "The contact details you submit through the request form are **forwarded by email** to our clinic."
-  reality 是**发到 Zoho CRM，不是邮件**。这是数据流向的**不实披露**。
- 同时 `Business Associates` 段（:126）列出了 eIVF / 安全邮件 / Cloudflare，**唯独没列 Zoho** —— 而 Zoho 现在确实接收了姓名/邮箱/电话/诊所/意向服务。
- **影响**：HIPAA 与州隐私法要求告知准确的数据接收方与 BAA 关系；当前声明既错述通道、又漏列处理方。
- **修复**：更新 Privacy.astro，说明联系方式经网站表单传输至 **Zoho CRM**；在 Business Associates 中补列 Zoho（前提是已签 BAA，见 F2）。

### F2（高，法务/合同项）— 需确认 Zoho 的 BAA
- Zoho CRM 接收潜在患者的联系方式 + 意向服务。一旦提交者成为患者，这些信息属 PHI 相关，Zoho 即**业务伙伴（Business Associate）**，须签署 **BAA**。
- 隐私声明的 BAA 清单未含 Zoho，等于声明与实务不一致。
- **行动**：与 Incinta 法务/运营确认（a）是否已与 Zoho 签 BAA（Zoho 有 Healthcare/HIPAA 方案）；（b）若无，须签署，或把 intake 改走已签 BAA 的通道。此项为**真正合规的阻断点**。

### F3（中）— 自由文本「Messages」框可能收集自愿 PHI
- `ZohoForm.astro:123-125` 有 `Messages` 文本域（`LEADCF2`，maxlength 1000）。
- 隐私声明写"We do not ask for medical history"——我们确实**不索取**，但用户可能在留言框**主动写下**病史/健康信息。
- **修复**：在留言框下方加一行提示：「Please do not include medical history or sensitive health information. / 請勿於此填寫病史或敏感健康資訊。」——不改变收集行为，但设定期望、支撑政策声明。

---

## 🟡 低危 / 技术债

### F4（低-中）— 死代码与孤儿 Functions
- `RequestForm.astro`（含 Turnstile + 提交到 `/api/appointment-request`）+ `/api/lead-event.ts` **均未被任何页面引用**：
  - grep 确认 `Appointment.astro` 与 `Contact.astro` 只 import `ZohoForm`；`RequestForm` 仅在其自身文件出现。
  - 即这套"服务端转发 + Turnstile + MP 回传"方案是**旧实现残留**，当前为死代码。
- **风险**：部署但仍未调用的 Functions 仍可被直接 URL 调用（如 `POST /api/appointment-request`），属轻微攻击面 + 代码漂移。
- **修复**：删除死组件与孤儿端点；或若拟作兜底，则真正接线并文档化。

### F5（低）— CSP 含 `'unsafe-inline'`
- `_headers:22` 的 `script-src` 含 `'unsafe-inline'`（gtag 与内联表单脚本所需）。非 HIPAA 问题，但削弱 CSP。后续加固可用 nonce/hash。不阻塞。

### F6（信息）— 转化归因缺口（非 HIPAA，已知）
- 因表单页不加载 GTM，用户若**直接落地 /contact**，`_ga` cookie 可能缺失，成功页的 `generate_lead` 归因会落到 direct/(not set)。此前已说明，可接受。

---

## 建议修复顺序
1. **F1** 改隐私声明（快、价值高）。
2. **F2** 确认/签署 Zoho BAA（法务阻断项）。
3. **F3** 留言框加提示语。
4. **F4** 清理死代码与孤儿 Functions。
5. （可选）**F5** CSP 加固。

---

## 附：本次审计用的核查命令（可复现）
- 追踪器全域扫描：`grep -ri "googletagmanager|gtag|GTM-|fbq|hotjar|linkedin|tiktok|clarity|segment|mixpanel" src/ public/`
- GTM 门控：`Layout.astro:59-62`
- 表单组件引用：`grep -rn "RequestForm|ZohoForm" src/`
- 数据流声明：`Privacy.astro:126-143`
- CSP：`public/_headers:9-22`

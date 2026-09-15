// ════════════════════════════════════════════════════════════════════════
//  POST /api/appointment-request
//  预约请求接口（HIPAA 最小化设计）：
//   - 只接收联系方式类最小字段：姓名 / 邮箱 / 电话 / 意向诊所 / 就诊方式 / 语言
//   - 不接收病史、症状等临床信息（临床信息一律走 eIVF HIPAA 患者门户）
//   - 不落库：验证后立即通过 send_email 绑定转发到诊所协调员邮箱，
//     目标邮箱必须位于已签 BAA 的邮件服务（Google Workspace / Microsoft 365 等）
//   - honeypot 字段 "company" 用于反垃圾，命中即静默丢弃
//   - TODO（上线前）：在 Cloudflare Dashboard 为该 Pages 项目开启 Turnstile
//     校验，进一步加固
//   - GA4 服务端转化回传（选配）：成功转发后，若配置了 GA4_MEASUREMENT_ID +
//     GA4_API_SECRET，则向 Google Analytics 发送一个匿名 generate_lead 事件，
//     仅含 client_id（来自访客 _ga cookie）+ 非 PHI 选择项（就诊方式/诊所/语言）。
//     不携带任何 PII，表单页浏览器也从不联系 Google —— 在合规前提下最大化转化归因。
//   - Zoho CRM 服务端写入（选配 / HIPAA 合规）：成功转发后，若配置了 ZOHO_CLIENT_ID +
//     ZOHO_CLIENT_SECRET + ZOHO_REFRESH_TOKEN，则以 OAuth2 refresh_token 换取
//     access_token，向 /crm/v7/Leads 写入一条线索。PHI（姓名/邮箱/电话/诊所/就诊方式/
//     语言）仅在 Cloudflare 边缘函数内流转，从不到达浏览器或 Google；配合已签 BAA 的
//     Zoho 合规版，满足 HIPAA「PHI 仅披露给已签 BAA 的业务伙伴」要求。
//     （Zoho CRM 须启用 HIPAA 合规版并签署 BAA 才构成合规落地；否则仅作非 PHI 联系库。）
//     诊所/就诊方式/语言默认写入 Lead 的 Description 字段，避免引用不存在的自定义字段
//     导致 400；若你在 Zoho 建了对应自定义字段，告诉我 API 名即可改成直接映射。
//
//  所需配置（Dashboard → Pages 项目 → Settings → Functions）：
//   - Binding: SEND_EMAIL（send_email，Email Workers 绑定）
//   - Variable: MAIL_FROM = 发件地址（建议 no-reply@irfc.com 所在域）
//   - Variable: MAIL_TO   = 协调员收件地址（BAA 覆盖邮箱，如
//     newpatients@irfc.com）
//   - Variable: GA4_MEASUREMENT_ID = G-XXXXXXXXXX（选配，转化回传用）
//   - Variable: GA4_API_SECRET     = GA4 事件 API 密钥（选配）
//   - Variable: ZOHO_CLIENT_ID      = Zoho OAuth Client ID（选配，CRM 写入用）
//   - Variable: ZOHO_CLIENT_SECRET  = Zoho OAuth Client Secret（选配）
//   - Variable: ZOHO_REFRESH_TOKEN  = Zoho OAuth Refresh Token（选配）
//   - Variable: ZOHO_DC             = Zoho 数据中心域名后缀，默认 "com"（美区；
//                                     欧区 "eu"、印度 "in" 等，按你账号所在区填写）
// ════════════════════════════════════════════════════════════════════════

import { EmailMessage } from "cloudflare:email";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const str = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ── Zoho CRM 服务端写入（选配 / HIPAA 合规）──
// 仅当 ZOHO_CLIENT_ID / ZOHO_CLIENT_SECRET / ZOHO_REFRESH_TOKEN 三者都配置时写入。
// 流程：OAuth2 refresh_token 换 access_token → 以 "Zoho-oauthtoken" 头向 /crm/v7/Leads
// POST 一条线索。PHI 只在边缘函数内，不在浏览器/Google 出现。Zoho 须启用 HIPAA 合规版
// 并签 BAA 方为合规落地。
const forwardToZoho = async (env: any, lead: Record<string, string>) => {
  const cid = env?.ZOHO_CLIENT_ID;
  const sec = env?.ZOHO_CLIENT_SECRET;
  const rt = env?.ZOHO_REFRESH_TOKEN;
  if (!cid || !sec || !rt) return; // 未配置 → 跳过

  const dc = (env?.ZOHO_DC || "com").toLowerCase();

  // 1) refresh_token → access_token
  const tokRes = await fetch(`https://accounts.zoho.${dc}/oauth/v2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: cid,
      client_secret: sec,
      refresh_token: rt,
    }).toString(),
  });
  const tok = (await tokRes.json().catch(() => ({}))) as { access_token?: string };
  if (!tok.access_token) {
    console.error("zoho token exchange failed:", tok);
    return;
  }

  // 2) 写入 Lead
  const recRes = await fetch(`https://www.zohoapis.${dc}/crm/v7/Leads`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Zoho-oauthtoken ${tok.access_token}`,
    },
    body: JSON.stringify({ data: [lead] }),
  });
  const rj = (await recRes.json().catch(() => ({}))) as any;
  if (!recRes.ok) {
    console.error("zoho lead insert failed:", recRes.status, rj);
  } else {
    console.log("zoho lead created:", rj?.data?.[0]?.details?.id);
  }
};

export const onRequestPost = async (ctx: { request: Request; env: any }) => {
  const { request, env } = ctx;

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_request" }, 400);
  }

  // honeypot：正常用户不会填写
  if (str(data.company, 200)) return json({ ok: true });

  // G3 — Cloudflare Turnstile 校验（仅当配置了 TURNSTILE_SECRET 时强制）
  // 未配置则跳过，保持向后兼容；两端（站点公钥 + 服务端密钥）须同时就位才生效。
  if (env?.TURNSTILE_SECRET) {
    const token = str(data["cf-turnstile-response"], 2000);
    if (!token) return json({ ok: false, error: "verification_required" }, 400);
    try {
      const fd = new URLSearchParams();
      fd.set("secret", env.TURNSTILE_SECRET);
      fd.set("response", token);
      const ip = request.headers.get("cf-connecting-ip");
      if (ip) fd.set("remoteip", ip);
      const vres = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: fd.toString(),
        },
      ).then((r) => r.json().catch(() => ({})));
      if (!(vres as { success?: boolean }).success) {
        return json({ ok: false, error: "verification_failed" }, 403);
      }
    } catch {
      return json({ ok: false, error: "verification_error" }, 503);
    }
  }

  const firstName = str(data.firstName, 80);
  const lastName = str(data.lastName, 80);
  const email = str(data.email, 160);
  const phone = str(data.phone, 40);
  const location = str(data.location, 40);
  const visitType = str(data.visitType, 40);
  const language = str(data.language, 40);
  const gaClientId = str(data.gaClientId, 80);

  if (!firstName || !lastName)
    return json({ ok: false, error: "name_required" }, 400);
  if (!EMAIL_RE.test(email) && !phone)
    return json({ ok: false, error: "contact_required" }, 400);
  if (!location || !visitType)
    return json({ ok: false, error: "location_and_visit_required" }, 400);

  // 未配置邮件转发时明确报错，绝不静默吞掉线索
  if (!env?.SEND_EMAIL || !env?.MAIL_TO)
    return json({ ok: false, error: "not_configured" }, 503);

  const lines = [
    "New appointment request from irfc.com",
    "",
    `Name:       ${firstName} ${lastName}`,
    `Email:      ${email || "(not provided)"}`,
    `Phone:      ${phone || "(not provided)"}`,
    `Location:   ${location}`,
    `Visit type: ${visitType}`,
    `Language:   ${language || "(not provided)"}`,
    "",
    "Submitted via the minimal-fields request form.",
    "No clinical information is collected on the website;",
    "medical history is gathered through the eIVF patient portal.",
  ];

  const raw = [
    `From: ${env.MAIL_FROM || "no-reply@irfc.com"}`,
    `To: ${env.MAIL_TO}`,
    `Subject: Appointment request — ${lastName}, ${firstName} (${location})`,
    "Content-Type: text/plain; charset=utf-8",
    "MIME-Version: 1.0",
    "",
    lines.join("\n"),
  ].join("\r\n");

  try {
    await env.SEND_EMAIL.send(
      new EmailMessage(
        env.MAIL_FROM || "no-reply@irfc.com",
        env.MAIL_TO,
        raw,
      ),
    );
  } catch (e) {
    console.error("appointment-request forward failed:", e);
    return json({ ok: false, error: "forward_failed" }, 502);
  }

  // ── GA4 服务端转化回传（Measurement Protocol，选配 / HIPAA 合规）──
  // 仅当 GA4 两端密钥都配置时回传；仅匿名 client_id + 非 PHI 选择项，绝不携带 PII。
  // 回传在 Cloudflare 服务端发起，表单页浏览器从不联系 Google。
  if (env?.GA4_MEASUREMENT_ID && env?.GA4_API_SECRET) {
    const clientId = gaClientId || crypto.randomUUID();
    const mpBody = JSON.stringify({
      client_id: clientId,
      events: [
        {
          name: "generate_lead",
          params: {
            visit_type: visitType,
            location: location,
            language: language,
            source: "website_request_form",
          },
        },
      ],
    });
    try {
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
          env.GA4_MEASUREMENT_ID,
        )}&api_secret=${encodeURIComponent(env.GA4_API_SECRET)}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: mpBody,
        },
      );
    } catch (e) {
      // 转化回传失败不影响主流程（线索已通过邮件送达），仅记录
      console.error("GA4 measurement protocol forward failed:", e);
    }
  }

  // ── Zoho CRM 服务端写入（选配 / HIPAA 合规）──
  // PHI 仅在边缘函数内；诊所/就诊方式/语言写入 Description，避免未知自定义字段致 400。
  // Zoho 须启用 HIPAA 合规版并签 BAA；失败仅记录，不阻断主流程（邮件已送达、GA4 已回传）。
  const zohoLead: Record<string, string> = {
    First_Name: firstName,
    Last_Name: lastName,
    Email: email,
    Phone: phone,
    Lead_Source: "Website - Appointment Request",
    Description: [
      `Clinic: ${location}`,
      `Visit type: ${visitType}`,
      `Language: ${language || "not provided"}`,
      "Submitted via irfc.com minimal-fields request form (no clinical info collected).",
    ].join("\n"),
  };
  try {
    await forwardToZoho(env, zohoLead);
  } catch (e) {
    console.error("zoho forward failed:", e);
  }

  return json({ ok: true });
};

export const onRequestGet = async () =>
  json({ ok: false, error: "method_not_allowed" }, 405);

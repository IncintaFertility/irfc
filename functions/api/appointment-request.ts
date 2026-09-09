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
//
//  所需配置（Dashboard → Pages 项目 → Settings → Functions）：
//   - Binding: SEND_EMAIL（send_email，Email Workers 绑定）
//   - Variable: MAIL_FROM = 发件地址（建议 no-reply@irfc.com 所在域）
//   - Variable: MAIL_TO   = 协调员收件地址（BAA 覆盖邮箱，如
//     newpatients@irfc.com）
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

  const firstName = str(data.firstName, 80);
  const lastName = str(data.lastName, 80);
  const email = str(data.email, 160);
  const phone = str(data.phone, 40);
  const location = str(data.location, 40);
  const visitType = str(data.visitType, 40);
  const language = str(data.language, 40);

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

  return json({ ok: true });
};

export const onRequestGet = async () =>
  json({ ok: false, error: "method_not_allowed" }, 405);

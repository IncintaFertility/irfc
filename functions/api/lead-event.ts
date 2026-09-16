// ════════════════════════════════════════════════════════════════════════
// /api/lead-event — 匿名转化回传端点（配合 Zoho 直连表单）
// ════════════════════════════════════════════════════════════════════════
//
// 背景：/contact、/appointment 表单页不加载 GTM/GA（HIPAA 约定）；表单改为浏览器
// 直连 crm.zoho.com 提交后，原来的 /api/appointment-request 服务端 GA4 回传路径
// 不再经过。本端点补回转化统计：表单提交成功后由前端 fire-and-forget 调用。
//
// HIPAA 约束（与 appointment-request.ts 一致）：
//   - 只接收非 PHI 选择项（诊所 Location / 服务类别 Service）+ 匿名 client_id
//   - 不接收、不记录任何姓名 / 邮箱 / 电话 / 病史；不落库、不发邮件
//   - GA4 回传在 Cloudflare 服务端发起，访客浏览器从不联系 Google
//
// 配置（Dashboard → Pages 项目 → Settings → Functions）：
//   - Variable: GA4_MEASUREMENT_ID = G-XXXXXXXXXX（未配置时本端点静默 no-op）
//   - Variable: GA4_API_SECRET     = GA4 事件 API 密钥
// ════════════════════════════════════════════════════════════════════════

interface PagesEnv {
  GA4_MEASUREMENT_ID?: string;
  GA4_API_SECRET?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const clamp = (v: unknown, max: number): string =>
  typeof v === "string" ? v.slice(0, max) : "";

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    /* 空/坏 body 视为无参数，照常回传匿名事件 */
  }

  const location = clamp(body.location, 80);
  const service = clamp(body.service, 120);
  const gaClientId = clamp(body.gaClientId, 64);

  // 未配置 GA4 → 静默成功（不报错，前端本就 fire-and-forget）
  if (!env?.GA4_MEASUREMENT_ID || !env?.GA4_API_SECRET) {
    return json({ ok: true, skipped: true });
  }

  const clientId = gaClientId || crypto.randomUUID();
  const mpBody = JSON.stringify({
    client_id: clientId,
    events: [
      {
        name: "generate_lead",
        params: {
          location,
          service,
          source: "website_zoho_form",
        },
      },
    ],
  });

  try {
    const mpRes = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
        env.GA4_MEASUREMENT_ID,
      )}&api_secret=${encodeURIComponent(env.GA4_API_SECRET)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: mpBody,
      },
    );
    // 透传 GA4 受理状态便于诊断：2xx=已受理；401=api_secret 错误；400/403=参数/权限问题
    return json({ ok: true, mpStatus: mpRes.status });
  } catch {
    return json({ ok: true, mpStatus: 0 });
  }
};

export const onRequestGet = async () => json({ ok: false, error: "method_not_allowed" }, 405);

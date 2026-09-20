# 全站内容严谨性审计 · 2026-09-20

> 范围：对照权威事实源，核查全站（en + zh-hant）事实一致性、内容正确性、术语与命名规范。
> 方法：源码级读取 `brand.ts` / `team.ts` / `standards.ts` / `testimonials.ts` / 各页面组件，并构建产物（dist 108 页）交叉验证。
> 构建：Astro 正确入口 `node_modules/astro/bin/astro.mjs`，exit 0。未 commit/push（用户未要求）。

## 权威事实基线（已确认）

| 项 | 权威值 | 来源 |
|---|---|---|
| 诊所数 | **4**（Torrance / Beverly Hills / Corona / Irvine） | `standards.ts` 防回归硬规则、`About.astro:23` |
| 品牌三态 | `INCINTA`=视觉标识；`Incinta Reproductive Fertility Center`=SEO/法律主名；`IRFC`=缩写 | `brand.ts:16-22` |
| 主电话 | `(424) 432-4732`（总机） | `brand.ts:26` |
| 语言 | English / Mandarin Chinese / Japanese / Korean / Spanish（5 种） | `About.astro:40`、FIVE_STANDARDS evidence |
| 年限 | RFC 创立 **2003**（非 2010）；"20+ years" 指 RFC 2003→今 ≈23 年 | `About.astro:12` 时间线 |
| 实验室荣誉 | 2016 全美 IVF 成功率第一（Dr. Yufen Xie 团队） | `About.astro:15` / `team.ts` / `WhyIrfc.astro` |

## 已修复项（按建议落地）

| 严重度 | 位置 | 问题 | 修复 |
|---|---|---|---|
| P1 | `src/data/team.ts:114/254/321` | 团队 `languages` 自相矛盾：3 人写 `Mandarin`、2 人写 `Mandarin Chinese` | 统一为 `Mandarin Chinese`（3 处）+ `About.astro:40` 语言列表 `'Chinese'`→`'Mandarin Chinese'`，全站语言术语一致 |
| P2 | `src/components/pages/WhyIrfc.astro:103` | 注释 `<!-- 6 Pillars -->` 错误（实际渲染 5）；该段无标题，与导航"6 大标准"混淆 | 注释改为「The INCINTA Standard: 5 proofs」；新增 H2 标题「The INCINTA Standard / 五大標準，讓信任被看見」，明确与导航 6 项服务标准区分 |
| P2 | `src/components/pages/Testimonials.astro:170` | Beverly Hills 评价位写「Public reviews coming soon. / 評價即將公開」（对尚未设 Google 商家页的诊所作出"即将公开"承诺，不够严谨） | 改为中性陈述「No public ratings are published for this location yet. / 此診所目前尚未發布公開評分」，去掉虚假承诺 |

## 已核查一致、无需改动的项

- **诊所数 = 4**：`About.astro:23` 成就条、`Home.astro` 统计、`brand.ts LOCATIONS`、导航均一致；无 "five/5 clinics" 误写。
- **品牌命名**：`INCINTA` 仅作视觉标识（logo alt / "The INCINTA Standard" / 正文语气）；`Incinta Reproductive Fertility Center` 作标题后缀与 og:site_name；`IRFC` 作缩写。文本中出现的 "Incinta Fertility" 仅限历史叙事（2010 成立）与 Torrance 关联商家名，属正确用法，非错误。
- **"20+ years"**：About 时间线显示 RFC 2003 创立，故"20+ 年临床"准确；"two decades" 指 RFC 2003→2024 合并，无矛盾。
- **"#1 US IVF lab 2016"**：About / 团队 / WhyIrfc 三处一致。
- **合规敏感表述**：全文无 guarantee / 100% pregnant / cure / money-back 等违规承诺。
- **HIPAA 零 PHI**：表单仅收联系方式最小字段，无病情/病史。
- **残留标签**：前期 `<br/>` 字面泄漏已修（About/WhyIrfc），本轮复查 dist 无 `&lt;br/&gt;`。
- **占位/示例文本**：无 lorem / TODO / placeholder / example.com。
- **邮箱**：全站统一 `info@irfc.com`（前轮 C2 已修，无 `RFCfamily` 残留）。
- **死链/孤儿页**：前轮审计已确认 0 死链、英文侧 0 孤儿。

## 未修改项（按用户要求）

- **C1 — NAP 电话**：页脚 4 家诊所仍全标总机 `(424) 432-4732`，与 Locations/JSON-LD 各店直拨（Torrance 424-212-4087 / BH 213-600-8088 / Corona 951-272-2221 / Irvine 949-453-8600）冲突。用户明确「C1 不要修改」，本轮跳过。

## 验证

- 构建成功：108 页，exit 0。
- `dist/why-irfc` 含新标题（en + zh-hant），支柱仍为 01–05。
- `dist/testimonials` 无 "coming soon" 字面。
- `dist/team/dr-james-lin` 与 `dist/about` 均显示 `Mandarin Chinese`；全站扫描无独立 `Mandarin` 遗留。

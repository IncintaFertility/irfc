# AI agent 协作规则

本文件适用于整个仓库，包括主 agent、子 agent 和其他 AI 开发工具。开始工作前读取本文件及修改目录内的补充规则。使用其他工具时，请将本文件设为项目指令来源。

本文先列简体中文规则，随后提供完整英文译文。两种版本应同步维护；如有歧义，以简体中文版本为准。

## 沟通语言

- agent 的沟通、计划、工作进度、完成报告以及项目规则文档默认使用简体中文；用户明确指定其他语言时遵从用户要求。
- 网站继续使用英文和繁体中文。沟通语言的调整不改变网站语言、现有路由或内容语言，不擅自添加简体中文站点。
- 保留代码标识符、命令、路径和第三方专有名称的原文。提交信息可沿用仓库现有英文惯例，PR 说明默认使用简体中文。

## 项目与验证

- 本项目是 Astro 静态网站，部署于 Cloudflare Pages。Node.js 需要 >=22.12.0。
- 页面位于 `src/pages/`，共享页面与组件位于 `src/components/`，博客内容位于 `src/data/blog.ts`，双语路由工具位于 `src/i18n/`。
- 在仓库根目录执行 `npm install --package-lock=false`。仓库刻意不使用锁文件，不要新增锁文件或无故修改依赖。
- 开发命令为 `npm run dev`；生产验证为 `npm run build`；本地生产预览为 `npm run preview`。
- 提交应用程序或网站内容修改前执行生产构建，并检查受影响页面的实际内容与功能。只改协作规则等开发文档时执行 `git diff --check` 即可。
- 修改链接或路由时，验证渲染后的 href、目标页面、末尾斜线与语言。未执行测试或只有开启端口，不算功能验证。

## 分支、PR 与合并

- 开始前检查工作区、当前分支与远程状态，保留他人的未提交修改及本地提交。
- 开发使用从最新 `origin/main` 建立的任务分支，例如 `fix/blog-links`、`feat/example`、`docs/agent-rules`。如果用户已指定分支或任务已有分支，沿用它。
- 不在 `main` 上开发，不直接推送 `main`。用户说“git push”时，默认提交并推送当前任务分支。
- 提交只包含本次任务的文件；逐一确认暂存差异，避免 `git add .` 或 `git commit -a` 混入其他 agent 的修改。
- 推送后建立或更新 PR，说明问题、最终变更、验证结果及实际 Cloudflare Pages 预览地址。权限不足时报告具体阻碍，不声称 PR 已建立。
- 完成开发不代表获准合并。等待用户明确要求或授权后再合并至 `main`，并遵守分支保护与必要检查。
- 未经明确授权，不执行破坏性 reset、清除未跟踪文件、force push 或改写共享历史。

## 多 agent 协作

- 使用现有 checkout；不要自行建立额外 worktree。如果需要隔离 checkout 或 worktree，先取得用户授权。
- 多个 agent 共用工作区时，由主 agent 指定各自负责的文件及依赖。避免同时编辑同一文件，遇到重叠先协调。
- 共用工作区中的切换分支、暂存、提交、推送与合并，由指定的集成 agent 统一执行；其他 agent 报告修改及验证结果。
- 不覆盖或撤销来源不明的修改，不为了让测试通过而移除他人的代码或断言。

## AI 内容更新流程

### 更新前确认

- 先阅读目标页面、同主题服务页、英文与繁体中文版本及相关共享数据，确定内容实际来源，避免只改页面外壳或错误的重复副本。
- 根据用户目标确定读者、需要解决的问题及更新范围。可推断的编辑细节自行处理；诊所事实、报价或医疗审核等无法确认的信息不得猜测。
- 检查现有事实与链接，不将旧内容自动视为正确依据。新增主题先检查是否已有文章，避免重复页面和互相矛盾的解释。

### 资料与医疗准确性

- 重要医疗结论、统计数据和时效性建议优先依据适用的专业学会指南、政府机构、同行评审研究或权威患者教育资料，例如 ASRM、ACOG、CDC、SART、HFEA。
- 对新增或改动的重要结论，在 PR 中记录来源 URL、标题、发表或更新日期（可取得时），以及对应的结论；需要读者核验的数据和结论在正文中提供适当引用。
- 实际打开并核对引用来源；不得编造文献、链接、引用内容或声称核验了无法访问的资料。无法核实时，说明限制，删除无依据的断言或将其留待确认，不把推测当事实发布。
- 成功率必须说明人群、年龄、统计时期和指标含义，如每次取卵、每次移植或累计活产率。不得混淆怀孕率与活产率、卵子数与成熟卵子数、筛查与诊断。
- 描述适用对象、局限、风险及替代选择，不保证疗效，不把平均数当作个人预测，不提供面向个人的诊断或用药剂量指导。
- 医疗科普保留适当的医疗免责声明。涉及实质医疗建议或重要结论变化时，在 PR 标明需要合格医疗人员审核；AI 自检不能替代医疗审核，不虚构审核者或审核日期。
- 诊所价格、服务地点、医师资历、认证、实验室能力和保险承诺，只能使用已确认的项目资料或用户提供的信息。不编造患者故事、评价或案例。

### 内容质量与双语同步

- 内容围绕读者问题展开，提供有用解释、实际流程、决策因素及下一步，而不是为了字数或 SEO 堆砌段落。
- 使用清晰标题、短段落和必要的列表；解释专业术语，避免恐吓、夸大或“最佳”“保证成功”等无依据宣传。
- 英文与繁体中文同步维护事实、数字、风险、引用、链接和行动入口；翻译应自然准确，不机械直译。确实无法完成某个版本时，明确报告尚未完成，不声称双语更新已完成。
- 不将网站繁体中文改为简体中文。复用既有组件和样式，保持移动端可读性、语义标题结构及图片替代文本。

### SEO、日期与链接

- 保留既有 slug 和 URL。确需变更时处理重定向，并检查内部链接、canonical、语言切换与 sitemap。
- 页面标题、描述、摘要与正文一致，不堆砌关键词。阅读时间按最终内容合理更新。
- 保留真实首次发布日期，不因刷新内容伪造发布日期。只有实质更新才记录真实修改日期；如果当前数据模型不支持修改日期，单独说明所需实现，不冒用首次发布日期。页面展示与结构化数据应一致。
- 内部链接使用 `localeHref` 等共享路由工具；链接文字应对应目标内容，不手动拼接语言前缀或重复斜线。
- 外部引用使用真实相关页面，验证目标及内容；不能访问时记录限制。不得用无关的站内链接冒充外部机构或原始来源。
- 新页面检查是否正确进入博客列表、相关内容和 sitemap；成功确认页等既有排除规则不得因内容更新失效。

### 内容发布前检查

- 执行 `npm run build`，用本地生产预览检查修改后的英文与繁体中文页面。
- 检查正文、标题、摘要、阅读时间、图片、语言切换、行动入口，以及渲染后每个新增或修改的链接；内链目标应可用，外链应与引用匹配。
- 检查相关共享组件或数据的影响；修改通用博客链接逻辑时，验证其他文章，不能只验证当前文章。
- 在 PR 中列出更新页面、实质内容变化、资料依据、验证结果、医疗审核需求和未解决问题。明确区分已验证、未验证及待确认内容。
- 内容更新仍使用任务分支、PR 和 Cloudflare Pages 预览；需要医疗审核的内容在审核完成及用户授权前不合并发布。

## 数据保护与修改范围

- 不在代码、日志、提交、PR 或聊天中输出凭据或患者资料。不提交真实预约表单、不发送邮件、不操作生产数据，除非用户明确授权。
- 保持任务范围，不顺手进行无关重构、依赖升级或全仓库格式化。

## Cloudflare Pages 预览

- 任务分支推送后，通过既有 Git 集成触发 Pages 预览部署。如果项目尚未设置该分支的预览部署，报告所需设置，不自行修改生产部署配置。
- 从该提交的 GitHub checks、部署记录或 Cloudflare Pages API/控制台取得实际预览 URL。优先提供绑定该提交的部署地址；如果提供会随后续推送变动的分支别名，明确标注。
- 不根据项目名或分支名猜测 URL，不把 localhost 当成 Cloudflare 预览地址。
- 确认部署成功及提交 SHA 相符后，请求预览的受影响页面，检查 HTTP 状态与预期内容。验证失败或遭访问保护时，说明实际结果。
- 如果无法读取部署记录或缺少必要权限，仍完成可做的开发、提交、推送与本地验证；明确说明预览 URL 尚未取得或尚未验证，不宣称已部署。
- 不因为需要预览而直接执行生产部署。推送任务分支不等于合并或生产发布。

## 完成报告

- 简要说明修改内容、验证结果、分支、提交与 PR 地址。
- 提供已取得的实际 Cloudflare Pages 预览地址，并说明是否验证、是否受保护。
- 区分本地完成、已推送、预览部署成功、已合并及生产部署成功；没有证据的状态不得宣称完成。

---

# AI Agent Collaboration Rules — English Translation

These rules apply to the entire repository, including the primary agent, subagents, and other AI development tools. Before starting work, read this file and any supplementary rules in the directories being changed. Configure other tools to use this file as their project instruction source.

The Simplified Chinese rules appear first, followed by this complete English translation. Keep both versions synchronized. If wording is ambiguous, the Simplified Chinese version takes precedence.

## Communication Language

- Use Simplified Chinese by default for agent communication, plans, progress updates, completion reports, and project rule documents. Follow the user's request when they explicitly specify another language.
- The website remains in English and Traditional Chinese. Changing the communication language does not change website languages, existing routes, or content languages. Do not add a Simplified Chinese site without authorization.
- Preserve code identifiers, commands, paths, and third-party proper names in their original form. Commit messages may follow the repository's existing English convention; PR descriptions default to Simplified Chinese.

## Project and Validation

- This is an Astro static website deployed on Cloudflare Pages. Node.js >=22.12.0 is required.
- Pages are in `src/pages/`, shared pages and components in `src/components/`, blog content in `src/data/blog.ts`, and bilingual routing utilities in `src/i18n/`.
- Run `npm install --package-lock=false` from the repository root. The repository intentionally does not use lockfiles. Do not add lockfiles or change dependencies without a reason.
- Use `npm run dev` for development, `npm run build` for production validation, and `npm run preview` for local production previews.
- Before committing application or website content changes, run a production build and check the actual content and functionality of affected pages. For changes limited to development documentation such as collaboration rules, `git diff --check` is sufficient.
- When changing links or routes, verify rendered href attributes, destination pages, trailing slashes, and language. Unexecuted tests or an open port alone do not establish functional validation.

## Branches, PRs, and Merging

- Before starting, inspect the working tree, current branch, and remote state. Preserve other people's uncommitted changes and local commits.
- Develop on a task branch created from the latest `origin/main`, such as `fix/blog-links`, `feat/example`, or `docs/agent-rules`. Reuse a user-specified branch or an existing branch for the task.
- Do not develop on or push directly to `main`. When the user says “git push,” default to committing and pushing the current task branch.
- Commit only files belonging to the current task. Inspect staged changes individually; avoid `git add .` or `git commit -a`, which may include other agents' changes.
- After pushing, create or update a PR describing the problem, final changes, validation results, and actual Cloudflare Pages preview URL. If permissions are insufficient, report the specific blocker rather than claiming that a PR was created.
- Completing development does not authorize merging. Merge into `main` only after the user explicitly requests or authorizes it, and honor branch protection and required checks.
- Without explicit authorization, do not perform destructive resets, delete untracked files, force-push, or rewrite shared history.

## Multi-Agent Collaboration

- Use the existing checkout; do not create additional worktrees on your own. Obtain user authorization before creating an isolated checkout or worktree.
- When multiple agents share a workspace, the primary agent assigns file ownership and dependencies. Avoid simultaneous edits to the same file; coordinate before handling overlapping changes.
- In a shared workspace, the designated integration agent handles branch switching, staging, committing, pushing, and merging. Other agents report their changes and validation results.
- Do not overwrite or revert changes of unknown origin, or remove another person's code or assertions merely to make tests pass.

## AI Content Update Workflow

### Before Updating

- Read the target page, service pages on the same topic, English and Traditional Chinese versions, and relevant shared data to locate the actual content source. Avoid changing only a page wrapper or the wrong duplicate.
- Determine the audience, questions to address, and scope from the user's goal. Resolve editorial details that can reasonably be inferred; do not guess unconfirmed clinic facts, prices, or medical review information.
- Check existing facts and links rather than automatically treating old content as reliable evidence. Before adding a topic, check for existing articles to avoid duplicate pages or contradictory explanations.

### Sources and Medical Accuracy

- Base important medical conclusions, statistics, and time-sensitive recommendations primarily on applicable professional society guidelines, government agencies, peer-reviewed research, or authoritative patient education resources, such as ASRM, ACOG, CDC, SART, and HFEA.
- For important new or revised claims, record source URLs, titles, publication or update dates when available, and the corresponding claims in the PR. Provide appropriate citations in the article for data and claims readers need to verify.
- Actually open and verify cited sources. Do not invent publications, links, quotations, or claims that inaccessible materials were verified. If verification is impossible, explain the limitation and remove unsupported assertions or leave them pending confirmation; do not publish speculation as fact.
- Success rates must identify the population, age, reporting period, and metric, such as per retrieval, per transfer, or cumulative live-birth rate. Do not confuse pregnancy rates with live-birth rates, total eggs with mature eggs, or screening with diagnosis.
- Explain eligibility, limitations, risks, and alternatives. Do not guarantee outcomes, present averages as individual predictions, or provide individualized diagnoses or medication dosing instructions.
- Retain appropriate medical disclaimers in educational content. For substantive medical advice or changes to important conclusions, identify the need for qualified medical review in the PR. AI self-review cannot replace medical review; do not invent reviewers or review dates.
- Use only confirmed project materials or user-provided information for clinic prices, service locations, physician credentials, certifications, laboratory capabilities, and insurance commitments. Do not fabricate patient stories, testimonials, or cases.

### Content Quality and Bilingual Consistency

- Organize content around readers' questions, with useful explanations, practical processes, decision factors, and next steps. Do not add filler merely for word count or SEO.
- Use clear headings, short paragraphs, and lists where useful. Explain technical terms and avoid fear-based messaging, exaggeration, or unsupported claims such as “best” or “guaranteed success.”
- Keep facts, numbers, risks, citations, links, and calls to action synchronized between English and Traditional Chinese. Translate naturally and accurately rather than mechanically. If a version cannot be completed, explicitly report it as unfinished rather than claiming that the bilingual update is complete.
- Do not convert the website's Traditional Chinese content to Simplified Chinese. Reuse existing components and styles, preserving mobile readability, semantic heading structure, and image alternative text.

### SEO, Dates, and Links

- Preserve existing slugs and URLs. If a change is necessary, handle redirects and check internal links, canonical URLs, language switching, and the sitemap.
- Keep page titles, descriptions, and excerpts consistent with the article. Avoid keyword stuffing. Update reading time reasonably based on the final content.
- Preserve the actual original publication date; do not fabricate a new publication date when refreshing content. Record a genuine modification date only for substantive updates. If the data model does not support modification dates, separately explain the implementation needed rather than repurposing the original publication date. Displayed dates and structured data must agree.
- Use shared routing utilities such as `localeHref` for internal links. Link text must match the destination content; do not manually concatenate language prefixes or duplicate slashes.
- Use real, relevant pages for external citations and verify their destinations and content. Record limitations when access is unavailable. Do not use unrelated internal links as substitutes for external organizations or original sources.
- For new pages, check inclusion in blog listings, related content, and the sitemap. Content updates must preserve existing exclusions such as success confirmation pages.

### Before Publishing Content

- Run `npm run build` and inspect the updated English and Traditional Chinese pages in a local production preview.
- Check article text, titles, excerpts, reading times, images, language switching, calls to action, and every new or modified rendered link. Internal destinations must work, and external links must match their citations.
- Check effects on related shared components or data. When changing common blog link logic, validate other articles as well as the current article.
- In the PR, list updated pages, substantive content changes, sources, validation results, medical review requirements, and unresolved issues. Clearly distinguish verified, unverified, and pending-confirmation content.
- Content updates still use task branches, PRs, and Cloudflare Pages previews. Do not merge or publish content requiring medical review until that review is complete and the user has authorized the merge or publication.

## Data Protection and Scope

- Do not expose credentials or patient data in code, logs, commits, PRs, or chat. Do not submit real appointment forms, send emails, or operate on production data unless the user explicitly authorizes it.
- Stay within the task's scope. Do not add unrelated refactoring, dependency upgrades, or repository-wide formatting.

## Cloudflare Pages Previews

- After pushing a task branch, use the existing Git integration to trigger a Pages preview deployment. If preview deployments are not configured for that branch, report the required setting rather than changing production deployment configuration yourself.
- Obtain the actual preview URL from that commit's GitHub checks, deployment records, or the Cloudflare Pages API/dashboard. Prefer a deployment URL tied to the commit. If providing a branch alias that changes with later pushes, label it clearly.
- Do not guess URLs from project or branch names, or present localhost as a Cloudflare preview URL.
- After confirming successful deployment and a matching commit SHA, request affected preview pages and check HTTP status and expected content. Report actual results when validation fails or access protection prevents it.
- If deployment records are inaccessible or permissions are missing, complete available development, committing, pushing, and local validation. Clearly state that the preview URL has not been obtained or verified; do not claim deployment success.
- Do not deploy to production merely to obtain a preview. Pushing a task branch does not mean merging or publishing to production.

## Completion Report

- Briefly describe changes, validation results, the branch, commit, and PR URL.
- Provide the actual Cloudflare Pages preview URL when obtained, noting whether it was verified or is access-protected.
- Distinguish local completion, successful push, successful preview deployment, merging, and successful production deployment. Do not claim any state without evidence.

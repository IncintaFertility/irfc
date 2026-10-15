# 客户反馈与投诉接入

## 页面及字段

- 英文：`/feedback/`；繁体中文：`/zh-hant/feedback/`。
- 页脚提供入口，两种语言可相互切换，页面进入 sitemap。
- 必填：Subject → `NAME`，Feedback Type → `COBJ5CF5`，Feedback Details → `COBJ5CF2`。
- 选填：Location → `COBJ5CF3`，Phone → `COBJ5CF1`，Email → `Email`。
- 类型值沿用用户提供的 Zoho 表单：Suggestion、Compliment、Service Concern、Formal Complaint。翻译只改变显示文字。
- 不提交 Status 或负责人字段，由 Zoho 网页表单及模块默认配置决定。

## Zoho 配置与发布前检查

1. 在 Zoho Web 表单中将英文及繁体页面的实际生产地址加入“表单地点 URL”。如果在 Cloudflare Pages 预览中测试真实提交，还需要加入该次预览的实际页面地址；不要猜测预览地址。
2. 保持上述三个字段必填，其他字段可选。确认表单已启用、接收负责人正确，CRM 状态默认值符合实际工作流程。
3. 提交后的操作采用“全屏消息”。网站按官方生成代码的 `Splash Message` JSON 响应显示本地双语确认；不把普通 HTTP 成功、HTML 或不可读响应认定为入库成功。
4. 发布前确认现有 Zoho 服务合同、BAA 适用范围、访问权限和反馈处理人员。页面不承诺未确认的回复时限、匿名性、受理编号或自动邮件。
5. 在授权的测试中检查真实 CRM 记录、字段、负责人、状态及任何自动通知。收到前端成功响应不等于所有内部处理步骤已核验。

## 实现说明

- 使用用户提供的公开网页表单路由参数，保存在 `src/config/feedback.ts`；这些参数不是 OAuth 或 API 凭据，官方嵌入表单也会公开它们。
- 浏览器将表单直接提交至 `https://crm.zoho.com/crm/WebForm`，保留路由参数及 Zoho honeypot 字段，数据不经过本站服务端。
- 以网站自身组件和提交逻辑替换生成代码的样式、校验和消息展示。不加载其分析追踪脚本；本站 GTM 也不在反馈页加载。
- 生成代码包含额外的 Zoho WebFormServlet 脚本。本实现没有加载该脚本；当前表单无 CAPTCHA 控件，仅保留 honeypot。是否有账户特定的服务端要求，需要通过授权的真实测试确认。后续启用 CAPTCHA 时，需同步集成其控件和校验，不可只添加隐藏字段。
- 请求失败、超时或非预期响应会保留输入，恢复按钮，并提示结果不确定及重复提交风险；不会自动重试，也不记录反馈正文。
- 已有 CSP 允许该 Zoho 提交地址，没有扩大允许域名。

## 已执行验证

- 生产构建、双语页面、sitemap、语言切换及三项必填检查通过。
- 浏览器拦截所有外部请求，模拟 Zoho 成功、错误、验证码失败、HTML 响应及网络失败；检查成功重置、失败保留输入及按钮恢复。
- 检查反馈页没有 GTM 或 Zoho 分析脚本，375px 宽度无水平溢出。
- 未向真实 Zoho 提交数据；未验证生产入库、通知、CRM 工作流或 Cloudflare 部署。

# 隐私政策发布记录 · 2026-10-31

- 用户明确授权官网生产部署，并要求 App 入口同步接入。
- 正式页面：https://seinpai.com/privacy
- 最终部署：`dpl_21yhbcEcjxtTWAkypN7ii11p8Eqy`，状态 READY，已绑定 `seinpai.com`。
- 部署代码：`c52186d`；网站主工作区已通过 `--no-ff` 合入 `feat/stripe-buy`，合并提交 `fe1f0d1`。本文记录不改变已发布的 UI 或政策正文。
- 页面按阅读语言默认选择文档；明确的 `service` 链接优先。无公司选择器、无 IP 判断，不修改账号主体或迁移数据。
- 用户要求的“当前阅读版本”行及版本日期／打印／独立页工具行已删除；生产页的预览标记也已移除。
- 五种语言的生产页面已通过浏览器检查；两主体乘五语共十份公开 JSON 均返回 200，且 service、language、16 个章节匹配。
- 浏览器检查还覆盖明确服务参数在语言切换时保持、手机宽度及无 JS 异常；本地五项路由测试和生产构建通过。
- 初次普通上传及一次收尾上传出现 `fetch failed`；使用 CLI 官方支持的 `--archive=tgz` 重试成功。此前可用部署未回滚或覆盖成失败状态。

## iOS

- 三处入口：设置、配对前隐私告知、V2 登录页。
- App 合并提交：`32c51395`，目标 `feat/integrate-0914`；四项 URL 逻辑测试、iOS SDK 完整 unsigned build 通过。
- 没有安装真机、上传 TestFlight 或发布 App Store。已安装 App 中原有裸链接仍可打开新官网政策；新包会明确附带当前 App 阅读语言。
- 详见 iOS 仓库 `docs/privacy-policy-links-2026-10-31.md`。现有未提交引擎提示词等用户改动保持原状。

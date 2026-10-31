# 帮助中心交接 · 2026-10-31

## 已实现

- `/help`：23 篇操作问答，按 7 个主题筛选、全文搜索、无结果清除、问题直达链接、邮件支持。
- 保留官网米白 / 橙色及现有 PageShell。首页和内页页脚新增帮助入口。
- 简体中文、繁体中文、英文全文；日文、韩文及其他未提供的语言明确提示显示英文。App 帮助链接携带当前阅读语言，不改变账号地区或服务主体。
- `/help?lang=zh-Hans#usb-update` 可直接打开电脑升级说明；问题使用稳定的文章 ID。
- 不向访问者展示调试地址或密钥，不在页面自动触发刷写、重置或发送邮件。

## 内容依据与版本边界

已对照 iOS 主干 `32c51395` 的 SettingsViewController / MyDeviceViewController / LocalizedStrings，以及近期工作树：

- `SeinPAI-onboarding-final-1030` @ `82438daa`：Home 输入、照片看图操作、API 密钥设置；其 10-31 交接明确新 Home Feed 引导仍是 Debug 预览，不作为公开版默认流程。
- `SeinPAI-device-v3-1029` @ `2ba0c601`：设备管理、模式、同步提示。
- `SeinPAI-drawer-chat-1030` @ `c2f32d5c` 及 BRANCHES 装机历史：最近 / 记忆 / 能力入口。界面逐版本变化，正文标注近期 iOS 范围。
- `docs/power/2026-09-30-manual-history-sync.md` 与后续装机历史存在断线续传差异；正文不承诺所有组合自动继续，提示按实际界面重新开始。
- 固件服务 `~/Downloads/sein-firmware-ota` @ `08377ef`，核对 `FlashUpdater.tsx`、正式与公测页面和公开 GET 响应。重置会清设备端数据；普通更新、硬重启、完整恢复分别说明。
- 本轮不改发布接口内容、不发固件、不修改协议、不把此前讨论的自动行为记录 / 每日漫画 / 健康推断作为已上线承诺。

## 已核验公开地址（2026-10-31）

| 用途 | 地址 | 核验结果 |
|---|---|---|
| 官网公开下载 | https://seinpai.com/start | 当前网站下载入口；帮助页集中指向此处 |
| 官网 iOS 链接 | https://testflight.apple.com/join/n6uzBvye | StartPage 当前配置；未把存在链接等同于还有测试名额 |
| 官网 Android APK | http://image.voice.51biaotai.com/Sein-1.0.1.apk | StartPage 当前配置，HTTP 旧地址；应由 Android 发布方确认后统一 HTTPS 和版本 |
| iOS 发布信息 | https://api.seinpai.com/v1/app/ios/latest | HTTP 200；0.87 / build 202608281723；TestFlight ZDhAGXmF，与官网不一致 |
| Android 发布信息 | https://api.seinpai.com/v1/app/android/latest | HTTP 200；0.1.0 / build 1；指向 /download/android，与官网 APK 不一致 |
| 正式固件信息 | https://api.seinpai.com/v1/firmware/sein-pai/latest | HTTP 200；0.5.24；released_at 2026-09-03 |
| 公测固件信息 | https://api.seinpai.com/v1/firmware/sein-pai-beta/latest | HTTP 200；0.6.0；released_at 2026-10-27 |
| 正式电脑升级 | https://api.seinpai.com/update | HTTP 200；网页入口，不是供模型调用的 API |
| 公测电脑升级 | https://api.seinpai.com/updateBate | HTTP 200；源码确认为公测页，大小写需保留；附完整恢复选项 |

固定 `.bin` 文件地址不作为用户主入口；版本随服务端变更。电脑升级从页面获取，App 内升级从对应渠道的 latest 获取。

## 后续应补齐的发布工作

1. **P0：统一下载与版本信息来源。** iOS / Android release metadata 已与官网配置不同；发布负责人确认当前有效渠道、版本与 build 后，再同时更新 `data/app.json` 和 StartPage。此轮不猜测发布号、不把本机开发 build 当作公开最新版本。
2. Android 下载升级、权限与设备实机流程需 Android 负责人核验后补专门指南，目前不承诺与 iOS 相同。
3. 日文与韩文全文待补；目前有明确的英文回退提示，不能对外宣称五语全文。
4. 新引导、设备页和技能流程正式发布时，按 build 更新帮助正文并补真实版本截图，不使用 Debug 预览图作为通用教程。
5. 若要从 App 定位到具体问题，可复用稳定 `#id`，后续对接错误码；本轮没有添加埋点或上传用户搜索词。

## 验证与发布

本地 `npm run build`、5 项隐私路由测试通过。Chrome 浏览器验证了 24 篇文章、三种全文语言、ja/ko/fr 明确回退、搜索与空结果、主题筛选、深链接、切换语言后返回及刷新、390px 无横向溢出，以及隐私页显式 service 参数保留；无页面脚本异常。桌面与手机截图已目检，路径 `/tmp/sein-help-desktop.png`、`/tmp/sein-help-mobile.png`。iOS generic 无签名完整构建成功。生产复测同样通过，使用页面渲染就绪条件核对功能，外部资源的 networkidle 等待曾超时，不作为产品功能失败或通过的依据。线上截图 `/tmp/sein-help-live-desktop.png`、`/tmp/sein-help-live-mobile.png`。App 仅更改现有帮助链接的语言参数，不新增界面，不覆盖用户当前安装的开发版本。

### 生产发布记录

- 网址：https://seinpai.com/help?lang=zh-Hans
- 代码提交：`0c0e673`；网站主分支合并：`645fd10`。
- Vercel：`dpl_HRYN3UwwWokqGvp228svqNe7tymi`，READY，已绑定 `seinpai.com`。
- 构建地址：https://sein-mnefqaush-riverotimes-projects.vercel.app
- 线上 bundle：`/assets/index-CpthjlQd.js`。帮助页、带语言 / 问题链接、隐私页返回 HTTP 200。
- 生产浏览器检查：24 篇文章、搜索/空态、分类、锚点、语言/返回/刷新、手机无横向溢出、隐私参数回归全部通过，无 pageerror。
- iOS 入口提交 `7156af6f`，已合入既有主干 `6beb175e`。未安装、未上传应用商店；现有 App 的原 `/help` 入口已能打开新网页，语言参数随下次 App 发版生效。

### 公开帮助内容修正

根据用户反馈，删除三种语言中误放入的内部需求讨论问答（`planned`），包括洗碗、剪指甲、每日漫画及相关健康推断段落。当前公开问答共 23 篇；上面的 24 篇验证记录属于首次发布。

- 删除提交：`bc940a6`；生产部署 `dpl_9QSfrX5e8jWGdyqxgEr5AcRMiL4S`，READY，已绑定 seinpai.com。

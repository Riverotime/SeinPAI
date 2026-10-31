# 帮助中心：当前 App 入口逐项复核

## 基准与核验方法

- 2026-10-31 读取 UPhone 实际安装信息：`com.persein.sein`，版本 **0.87 / build 202610311440**。命令为 `xcrun devicectl device info apps`，最新机器输出 `/tmp/sein-help-installed-apps-final.json`。
- 初次读取为 build 202610311431；核对结束前设备已更新至 build 202610311440，当前源码提交 `60341dbd`。复查 `0796665b..60341dbd` 的四个产品文件差异，变化集中于引导技能消息/点击与动画，本文涉及的正常首页、设备、设置入口未改变。本文按 `60341dbd` 的代码追踪按钮、行、点击回调、目的页面及状态条件。
- 当前开发主干已是 `feat/home-drawer`，见新工作树 `AGENTS.md` / `docs/TRUNK`。此前误把旧 `feat/integrate-0914` 中 `MyDeviceViewController` 的页面结构当作当前操作依据；旧类仍在工程里存在，不能仅凭搜索到该类就判断用户入口。
- 来源工作树 `/Users/igerlee/Documents/SeinPAI-onboarding-final-1030`。核对期间该工作树出现其他会话的未提交引导动画改动，不改动、不暂存；帮助按已安装提交冻结，不混入进行中代码。
- **证据边界：已读取真机安装版本并追踪该版本源码；没有完成真机逐屏点击或 BLE/OTA 端到端测试。** `idevicescreenshot` 无法发现 USB 设备，本轮没有为了截图安装测试宿主或 DebugBridge，也没有覆盖正在使用的 App。下文“核对”指入口和实现代码，不表示服务端、权限、模型或硬件功能均已实测。

## 确认的主要纠正

1. 侧边栏显示 **对话 / 记忆 / 技能**，不再是“最近 / 记忆 / 能力”。`HomeDrawer.build` 的实际文字优先于文件顶部旧注释。
2. 设备管理的可靠入口是 **首页底部 Sein 小头像或设备 / 声波区域**。侧边栏“感知中”实际回对话，“开启感知”直接恢复，“重新连接”直接重连，不能统一写成进入设备页。
3. `PeiViewController` 是当前设备页面，分 **设备 / Sein** 两签。设备签没有旧三档选择；现有控制是视觉感知开关与暂停弹层。
4. 首页暂停与设备页暂停是两套选项：前者 30 分钟 / 1 小时 / 3 小时 / 自定义；后者只关视觉 / 暂停 Sein PAI，加 1 小时 / 到明早 / 直到我打开。不可混写。
5. 固件入口 **设备 → Sein PAI → 固件**；当前门槛统一 **30%**。删除旧 MyDevice 中未充电 60% / 充电 30% 的说明。
6. 声纹与我的数据位于 **Sein → 你的声音和数据**；设置中的声纹 / 数据仍保留且指向同一控制器。并非所有设置都迁移。
7. 同步条在两签之外；显示 **开始同步 / 暂停 / 继续 / 重试**。没网时无开始按钮。删除“仅蓝牙连上就能点开始”的遗漏。
8. 在线解绑会清设备端录音、照片与设置；离线“仍然解绑”只解绑当前手机。不把解绑当成普通断开。
9. 照片底栏是 **存相册 / 换个样子 / 分享**；删除在 **⋯ / 长按菜单**。
10. 我的数据虽然入口副文案有“导出”，实际导出区隐藏、回调无 UI 调用方，不能教用户找一键导出。

## 23 篇公开文章逐项结论

所有下列路径已同步至简体、繁体和英文正文。带路径的文章新增可见「操作路径」，搜索包含路径文字。页首与页尾标明核对版本。

| 稳定文章 ID | 核对结论与处理 | 主要实现证据（60341dbd） |
|---|---|---|
| install | 设置入口补全为左上菜单 → 侧边栏右下用户头像 → 检查更新；关于分组仍存在 | HomeDrawer 的 settings 回调；HomeFeed.openSettingsApp；Settings.createAboutSection |
| first-use | 删除内部预览讨论；只说明当前能使用的配对、文字输入、手机录音与后补声纹，不混入 Debug 引导顺序 | ListenHome.showPlusMenu；Pei.renderNoDevice / renderVoiceAndData |
| navigation | 更正三入口实际名称、区分用户头像与 Sein 小头像、纠正侧栏感知按钮目的地 | HomeDrawer entryRow / senseTapped；ListenHome ipTap / waveTap；HomeFeed.homeDrawer |
| pair | 无绑定显示开始配对；其他设备有添加入口；补解绑清理提示 | Pei.renderNoDevice / startPairing / renderOtherDevices / unbind |
| connection | 对应头部重新连接、顶部蓝牙条“怎么办”、状态排障入口，不套用旧设备页按钮名 | Pei.actionTapped / addBluetoothOffBar / statusCard |
| modes | 替换旧三档；分别写视觉感知开关、设备页暂停与首页快捷暂停 | Pei.visionRow / PeiSheet.pause；ListenHome.showPauseMenu |
| voice | 明确首页 + → 录音 / 结束录音；佩长按读按键说明，不再模糊说“有语音按钮” | ListenHome.showPlusMenu；PeiButtonGuideViewController |
| voice-id | 主入口 Sein 签声纹，设置入口仍保留；说明五句录入与设备断开时手机补录 | Pei.renderVoiceAndData；Settings case VoiceID；OwnerVoiceprintViewController |
| photos | 对话流点击照片与记忆图片筛选均存在；拍照排查改视觉开关 / 暂停 / 感知时间 | ListenHome.showPhoto；AllMemories.Category；Pei.visionRow / quietHours |
| photo-style | 底部按钮按实物命名，删除改 ⋯ / 长按，去掉每日漫画比较 | PhotoViewer.buildToolbar / rebuildMenu；PhotoFilterPreview |
| history-sync | 写清两签共用顶部同步条、开始/继续/暂停/重试、没网等待、短暂完成态 | Pei.addSyncBarIfNeeded / syncTapped / addSyncDoneBar |
| sync-stuck | 补手机网络前提、按实际状态区分继续与重试；不教重置补记录 | 同上；ManualHistorySyncStatus |
| battery | 当前统一 30%；断开不宣称显示当前电量，删除旧 60% 门槛 | PeiDeviceState.current；Pei.firmwareTapped |
| firmware-update | 路径改设备 → Sein PAI → 固件；检查后再次点击升级；断连限制与失败重试 | Pei.renderPendantGroup / firmwareTapped；FirmwareUpdater |
| usb-update | 独立电脑流程，不修改服务和工具逻辑 | 固件服务 FlashUpdater；https://api.seinpai.com/update |
| beta-firmware | 保留正式/公测明确区分，删去面向用户不必要的构建技术说明 | FirmwareUpdater.channel；服务 update / updateBate |
| reset | 新增当前 App 关机位置，在线解绑/离线解绑分开说明；电脑重置另述 | Pei.renderPendantGroup / renderUnbind / unbind；ListenHome.confirmPowerOff |
| api-keys | 设置 → 系统与数据 → API 密钥仍正确，补完整进入设置路径 | Settings.createSystemSection / case key；DataAPIKey.setupSections |
| skills | 能力改技能；我的技能 / 全部N / 发现 / 右上＋与列表＋逐一对应 | SkillList.buildTopBar / buildMine / buildDiscover / add / teachTapped |
| permissions | Sein 签通知总开关、设置通知细项和系统通知授权分开，不混为一个开关 | Pei.renderSoul / setNotifications；Settings case Notification；NotificationViewController |
| data | 主入口 Sein → 我的数据；设置数据仍通；删除三个实际按钮；明确无可用一键导出按钮 | Pei.renderVoiceAndData；DataAPIKey.setupSections / createDeleteSection / exportDataTapped 注释 |
| no-answer | 按记录/文字/回复不同阶段排查，保留当前账户或自定义模型前提，不承诺免费档自动分析 | Pei.statusCard；ListenHome；DataAPIKey |
| contact | 仍用 hi@seinpai.com；反馈分类与实际升级/同步路径对应 | 官网 ContactPage；以上流程 |

## 没写入公开操作指南的内容

- Debug 引导的内部进展、尚未提交或尚未装机的动画改动。
- “每周回顾”等只有设置但尚无完整功能依据的产出承诺。
- 自动记录生活动作、每日漫画及其他先前内部需求讨论。
- “导出 · 删除”等仅入口副文案存在、实际没有可用操作的说明。
- 将页面代码存在视作已安装版本的公开可达入口，或将源码核对当成真机功能验收。

## 发布与验证

本轮仅修改官网帮助内容和辅助展示，不更改 iOS 页面、设置或固件。`npm run build`、`git diff --check` 与 5 项隐私路由回归通过。Chrome 本地验证：23 篇文章、17 条可见操作路径、版本号、路径文字搜索、空态、三种语言及浏览器返回、同步问题深链接、390px 展开固件步骤不溢出均通过，无 pageerror。桌面与手机截图已目检（`/tmp/sein-help-audit-desktop.png`、`/tmp/sein-help-audit-mobile.png`），保留既有配色和布局。线上回归复现了 URL 已返回繁体、语言选择框却仍显示英文的问题；历史同步改为在 popstate 后下一轮事件中执行，并在卸载时清理待执行任务，避免浏览器恢复表单值覆盖控件。修正后本地完整检查通过，另连续三轮语言切换 → 返回 → 前进检查通过。生产发布后另记部署及复测结果。

### 最终线上结果

- 内容核对提交 `44a7659`；返回选择器修正 `6112a0f`。
- 正式网址：https://seinpai.com/help?lang=zh-Hans
- 最终部署 `dpl_Ds3iExDRZrLkpZL3Z5e8BEsTLKA8`，READY，绑定 seinpai.com；构建地址 https://sein-635d1sho7-riverotimes-projects.vercel.app 。
- 线上 HTTP 200，bundle `/assets/index-BfQ_KEPH.js`。
- 生产 Chrome 回归通过：23 篇、17 条路径、核对 build 202610311440、路径搜索/无结果、三语切换和返回、同步问题直达、手机展开固件步骤不溢出；无 pageerror。使用实际渲染状态等待。
- 没有更改或安装 App，没有发固件，没有清理设备或用户数据；本轮修的是公开帮助文案、可见路径和网站返回语言显示。

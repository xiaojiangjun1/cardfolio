# Cardfolio v1.10 — Desktop + Mobile + PWA

本版只扩充卡面和账户 FTF：覆盖清单中 48 种产品，支持 BofA 转卡继承免 FTF。部分历史卡原图分辨率有限，详见 [本版说明](docs/V1_10_GUIDE.md) 和 [48 种卡面 / FTF 来源与像素](docs/SOURCES_v1_10.md)。既有权益功能保留。

一套原生 HTML / CSS / JavaScript 代码，桌面保留 v1.7.4 的完整业务界面，手机使用底部导航、数字卡片、事件流水卡片与全屏表单。没有登录、数据库、银行连接、第三方脚本、字体下载或统计服务。

**先备份，再迁移。只上传程序文件，绝不要上传个人 JSON / CSV 备份。**

## 1. 文件与两种用法

部署包根目录包含：

```text
index.html
manifest.webmanifest
sw.js
icons/
  icon-192.png
  icon-512.png
  icon-maskable-512.png
  apple-touch-icon.png
README.md
.nojekyll
.gitignore
docs/
```

- **GitHub Pages / PWA**：将以上目录内容放到仓库根目录；不需要编译、购买域名或后台服务。
- **电脑直接离线使用**：双击 `index.html`，或交付中的 `Cardfolio_v1_10_Offline.html`。两份 HTML 内容相同；不依赖 Service Worker 的核心业务可直接运行。建议固定文件路径和浏览器，换文件名或位置后不要假定原本地数据会自动出现。
- 独立 HTML 不请求外部 Manifest 或图标，不初始化 Service Worker。在线安装和自动更新需要 HTTPS / localhost。
- iPhone「文件」里的 HTML 预览不保证运行完整网页脚本；iPhone 推荐使用 Safari 打开部署网址，再添加到主屏幕。

## 2. 创建免费的 GitHub Pages 网站

1. 注册或登录自己的 GitHub 账户，点击右上角 **＋ → New repository**。
2. Repository name 填 `cardfolio`，选择 **Public**，创建仓库。无需购买域名。不要把个人备份当作初始化文件。
3. 解压 `Cardfolio_v1_10_PWA.zip`。进入仓库，选择 **Add file → Upload files**。
4. 把解压后的 **index.html、manifest.webmanifest、sw.js、icons 文件夹、README、docs 以及两个点文件**上传到仓库根目录。不要上传 ZIP 本身，也不要在根目录下再套一层 `cardfolio` 文件夹。
5. 如果上传界面没有带上 `.nojekyll` 或 `.gitignore`，用 **Add file → Create new file** 按这两个名字补建；`.nojekyll` 可以只保留一个空行，`.gitignore` 复制包内内容。提交时逐项检查文件清单。
6. 点击 **Commit changes**，提交程序文件。
7. 进入仓库 **Settings → Pages → Build and deployment**，Source 选择 **Deploy from a branch**，Branch 选择 **main**，文件夹选择 **/(root)**，点击 **Save**。
8. 等 GitHub 显示部署成功，打开 `https://USERNAME.github.io/cardfolio/`，把 USERNAME 换成自己的 GitHub 用户名。若未立即生效，到仓库 **Actions** 查看部署是否完成。
9. 在「备份与说明」看到“离线程序已就绪”后，再测试断网刷新。首次下载未完成时不能保证离线启动。

Manifest 的 `id`、`start_url`、`scope` 均为 `./`，图标与 SW 注册均使用相对路径，适用于 `/cardfolio/` 这样的子路径。换仓库名通常无需改路径；请保留网址结尾的 `/`。

GitHub 官方说明：[配置 Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。账户或组织策略可能限制 Pages，按 GitHub 页面实际提示处理。

## 3. iPhone Safari 添加到主屏幕

1. 用 Safari 打开自己的 HTTPS 网址。
2. 等离线程序初始化完成。先不要删除旧版文件或备份。
3. 点击 Safari **分享**，选择 **添加到主屏幕**；若系统提供“作为 Web App 打开 / Open as Web App”，将其打开，再点击 **添加**。
4. 从主屏幕的 Cardfolio 图标启动应用。
5. 打开 **更多 → 备份与说明**，从「文件」导入旧版 JSON。
6. 核对主卡、成员、流水和各项目积分，再导出一份新备份。
7. 打开飞行模式，重新启动应用，确认已有记录可见，并试录一笔再刷新核对。

Apple 官方说明：[把网站变成 iPhone App](https://support.apple.com/guide/iphone/iphea86e5236/ios)。不同 iOS 版本的分享入口和措辞可能不同。

**Safari 与主屏幕 App 的本地存储不能假定共享。**请把新安装的 App 当作一台新设备，检查数据后按需导入 JSON；不要因为 Safari 中有数据就删除备份。本次未使用真实 iPhone，详见 [真机验证与限制](docs/KNOWN_LIMITATIONS.md)。

## 4. 从 v1.7.4 迁移

1. 在正在使用的 v1.7.4 打开 **备份与说明 → 导出 JSON 全量备份**，把文件保存好。
2. 在 v1.10 的目标浏览器或主屏幕 App 中，先导出目标端现有数据（若有）。
3. 点击 **从「文件」导入 JSON**，选择备份文件；iPhone 会使用系统文件选择器。
4. 程序先验证结构、日期、ID 与关联，再展示将导入的成员、卡片、副卡关系及流水数量。确认覆盖后才保存。
5. 导入失败、取消确认或保存失败时，当前记录不会被替换；损坏存储会进入保护模式。
6. 核对数量及积分排序，确认完成后保存一份新的 JSON。

使用原数据格式 v6、原 `cardfolio_data_v6` 键及历史迁移逻辑。保留自定义积分项目、显示顺序、尾号、日期、副卡关系、部分到账与产品历史。**历史报销记录未标记的零值继续沿用 v1.7.4 的原统计口径**；只修改备注不会自动把旧零值解释成明确到账 0。详情见 [迁移说明](docs/MIGRATION.md)。

## 5. 导出备份与电脑 / 手机手动迁移

- 在「备份与说明」选择 **下载完整 JSON**，或 **分享 / 保存备份**。
- 支持文件分享时会打开系统分享界面；可以由你手动选择“存储到文件”等目的地。若不支持，会回退为下载。
- 在系统中确认文件确实已保存，再离开页面。应用只能记录“最近发起导出 / 分享”的时间，不能确认你最终保存了文件。
- 电脑与手机的相同网址不会同步 localStorage。将 JSON 用你选定的方式传到目标设备，然后手动导入。
- 导入是**全量替换，不是合并**。两端都修改后，应先各自导出备份，再决定以哪一端为主；没有自动冲突合并。
- 系统分享、AirDrop、邮件或云盘的使用由你主动选择；应用不会主动把备份传给这些服务。
- 本地存储会受到清理网站数据、删除 App、浏览器隐私模式、空间回收等影响。它不等于永久可靠的云端备份。

## 6. 日常使用与屏幕切换

- ≥1024 CSS px：原桌面侧栏与完整视图。
- 768–1023 CSS px：紧凑平板布局、底部导航，卡片可双列。
- ≤767 CSS px：手机单列，底部入口为总览 / 信用卡 / 奖励 / 积分 / 更多。
- 按窗口宽度切换，不按 UA。iPhone 横屏也保留触屏友好布局。支持安全区域、动态视口高度、至少 16px 表单输入。
- 信用卡和奖励搜索沿用 v1.7.4 保留输入框的更新机制；奖励列表继续每页 50 条，搜索及导出覆盖全部流水。
- 手机积分页使用原数字卡片、类别配色与可保存的 ↑ ↓ 排序。不同项目积分不会合并或折现。
- 保存失败时表单保留；主动关闭未保存表单会提示。调整窗口大小不重建表单。全屏表单打开时隐藏底部导航，保存按钮在表单底部可滚动到达。

## 7. 更新程序而不丢失数据

**用户更新：**

1. 先导出完整 JSON。
2. 联网打开应用，或在「备份与说明」点击 **检查程序更新**。
3. 新程序下载完成后会出现更新提示，点击 **更新并重新打开**。
4. 有未保存表单或正在保存时，会阻止更新；先保存或关闭表单。
5. 更新只切换静态程序缓存，不删除业务 localStorage。其他窗口有草稿时会保留草稿，完成后通过更新提示重新打开。

**维护者发布：**

1. 用新版本程序文件替换仓库里的程序文件，不携带用户备份。
2. **每次修改 HTML、Manifest 或图标，都必须同时修改 `sw.js` 中 `BUILD` 的值**，例如 `1.10.0-20261109-2`。否则已安装用户可能一直使用旧缓存。
3. 一次提交整套程序文件；等待 Pages 部署完成，再让用户检查更新。
4. SW 安装会完整下载白名单程序文件；任何必需文件失败，就不激活不完整版本，继续使用旧程序。
5. 新版本等待用户安装；激活后清理**本应用作用域**的旧静态缓存并接管页面。当前 HTML 自带全部业务代码，不依赖多份不同版本 JS。
6. 不要让用户清空网站数据来“升级”。确需迁移域名、协议或端口时，先导出，再在新地址导入。

缓存只包含程序首页、Manifest 和图标；JSON、CSV、blob 下载和任意其他文件均不进入应用静态缓存。程序更新检查只请求程序文件。

## 8. 避免把私人数据公开

- 仅上传此部署包中的程序文件。**真实 JSON、CSV、截图、个人导出都不应放进仓库。**
- `.gitignore` 忽略 `*.json` / `*.csv` 和备份目录；但 GitHub 网页手动上传**不会因为 `.gitignore` 自动阻止你上传**，提交前仍要检查。
- 如果误提交个人文件，仅删除当前文件并不等于清除 Git 历史；应立即停止公开，按 GitHub 的敏感数据清理流程处理历史记录。
- GitHub 只能看到托管页面的正常访问请求；Cardfolio 没有上传私人业务数据的代码。公开 HTML 中也没有你的真实卡片或积分记录。
- 同一个 `USERNAME.github.io` 下的多个仓库页面属于同一个 origin。由于保留原本地存储键，不要把另一个子路径当作数据隔离的测试环境；需要隔离时使用独立浏览器配置或不同 origin，并先备份。
- 卡号只输入后五位，不要在备注里保存完整卡号、密码或验证码。

## 9. 验证材料与已知限制

- [回归测试报告](docs/TEST_REPORT_v1_10.md)
- [性能对比报告](docs/PERFORMANCE_v1_10.md)
- [旧版迁移说明](docs/MIGRATION.md)
- [限制和 iPhone 真机验收步骤](docs/KNOWN_LIMITATIONS.md)
- [桌面卡面](docs/screenshots/v1_10/desktop-cards.png)、[手机卡面](docs/screenshots/v1_10/mobile-cards.png)、[BofA 继承说明](docs/screenshots/v1_10/mobile-ftf-inheritance.png)、[48种卡面总览](docs/screenshots/v1_10/card-art-contact-sheet.png)

截图仅包含合成测试数据。附加验证包提供基线、增量构建文件、测试脚本和原始结果；它不需要上传到公开网站。原有“25 组测试”脚本未提供，本次建立新的可复现测试，没有声称重新运行过缺失的脚本。

# Cardfolio v1.10 回归测试报告

日期：2026-11-09。Windows 10.0.26200、Chrome 155.0.8059.79、Node v24.22.1。所有账户 / 文件选择 / 记录均为合成夹具，无用户备份。

## 基线

修改前原 v1.9 HTML 运行同一套 30 项业务回归：30 项通过，0 项失败。源码原样保留 baseline/Cardfolio_v1_9.html；artifacts/v1.10-provenance.json 记录 SHA-256。继承 v1.7.4 → v1.8 → v1.9 的既有架构，未替换统计或搜索逻辑。此前称为“25组”的原脚本未提供，本次没有声称运行缺失脚本。

## 本版结果

| 检查 | 通过 | 失败 |
|---|---:|---:|
| 桌面业务 / 兼容性 | 30 | 0 |
| 手机业务 / 输入交互 | 30 | 0 |
| 原 v1.9 权益 / 年费场景，在本版运行 | 46 | 0 |
| 新增卡面 / FTF，桌面和手机各27项 | 54 | 0 |
| 本版独立 HTML / 手机 / 真实 SW 离线与更新 | 24 | 0 |
| 存储 / 冲突 / 导入 / 失败更新 | 9 | 0 |
| 本版合计 | 193 | 0 |

原始逐项结果与可运行脚本均在 Validation ZIP。新功能验证：48种产品逐一匹配并实际 decode 图片；不同网络 / 两代 Bilt / Morgan Stanley 独立匹配；HTML 注入、CSV前缀保护、旧报销零值、部分到账、副卡去重、50条分页、搜索光标与合成IME事件保留；BofA原始 / 中间产品继承、未来 / 失效事件排除、账户手动覆盖、产品变化复核、重复同名账户隔离；JSON往返和无效字段拒绝；来源弹窗及320px无横向溢出。

PWA 在 localhost /cardfolio/ 子路径使用真实 Service Worker 和 CacheStorage，测试首次缓存、离线启动 / 编辑 / 刷新、更新等待及保留草稿、更新后数据、JSON不入静态缓存、失败缓存安装回退。独立 HTML 测试明确打开本版 Cardfolio_v1_10_Offline.html，无 Service Worker 仍可保存。

## 边界

未部署到用户 GitHub Pages，也未接触真实 iPhone / Android / Safari。触屏模拟、CompositionEvent、缩短视口、文件输入与 Web Share 桩不等同原生键盘 / 文件App / Safari验收。请按 README 与 KNOWN_LIMITATIONS.md 真机核对。截图与卡面总览经过视觉检查；源图分辨率与卡面发行年份的限制见 SOURCES_v1_10.md。

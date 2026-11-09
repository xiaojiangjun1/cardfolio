# Cardfolio v1.8 回归测试报告

测试日期：2026-11-08（America/Los_Angeles）。仅以 Cardfolio_v1_7_4.html 为代码基线，原文件 173567 字节；SHA-256：

`660c05bb9660d27c1d4825c774dfea7ab3a774c6a2b4da61dd840c1c5caa27c6`

未取得之前的 25 组测试脚本，因此本次没有声称重新运行它们。已在修改前对实际 v1.7.4 建立并运行 30 项可复现业务回归，随后以同一脚本验证 v1.8。

## 执行结果

| 对象 | 视图 / 范围 | 通过 | 失败 |
|---|---|---:|---:|
| v1.7.4 修改前基线 | 桌面 | 30 | 0 |
| v1.7.4 对照 | 手机视口 | 30 | 0 |
| v1.8 | 桌面业务回归 | 30 | 0 |
| v1.8 | 手机业务回归 | 30 | 0 |
| v1.8 | 新增手机 / PWA 场景 | 24 | 0 |
| v1.8 | 追加可靠性场景 | 9 | 0 |

**v1.8 合计 93 项场景执行通过。**其中 30 项业务场景分别在两个布局执行（60 项），新增手机 / PWA 24 项，追加可靠性 9 项；这不表示 93 个完全独立业务规则。主回归与手机 / PWA 运行均未发现未捕获页面异常。

## 测试环境与边界

Windows Chrome 155.0.8059.79，Playwright 自动化；1440×1000 桌面，390×844 触屏模拟，布局另测 320、768、844、1024 CSS px。PWA 在 localhost 的真实 Service Worker / CacheStorage 上验证，与 GitHub Pages 相同的 /cardfolio/ 子路径结构。无真实 iPhone、Android 手机或公开 GitHub 账户部署。本报告中“手机”“IME”“分享”“键盘”相关自动化分别使用视口 / 触屏、合成 CompositionEvent、API 桩和缩短视口模拟，不代替真机。

## 关键结论

- 历史报销零值未自动改口径；明确零值与部分到账、剩余待兑现正确。
- P1/P2、主副卡关联、实际 Bonus 不乘副卡数及不重复统计通过。
- 信用卡与奖励新增 / 编辑 / 删除、产品变动删除后重算、日期迁移、项目目录和排序通过。
- JSON 全量导入 / 导出、自定义排序、异常 / 取消导入、快照与损坏数据恢复通过。
- XSS 字符作为文字显示；CSV 公式前缀保护保留；保存失败回滚，实际双窗口冲突拒绝覆盖并保留草稿。
- 5,000 条流水每页 50 条；可找到第 5,000 条，导出仍包含全部记录。
- 窗口切换保持同一表单及输入节点；连续输入、合成中文组合事件和光标保持通过。
- 安装、首次在线、缓存后离线、离线保存、刷新、更新后本地数据、旧缓存清理均通过。
- 等待更新 / 未保存表单拦截 / 另一窗口激活更新 / 下载不完整的新缓存拒绝激活均通过。
- 应用缓存只包含白名单静态文件；无 JSON、CSV 或 blob；测试请求没有私人数据上传及跨域请求。

## 业务回归清单（两种布局相同）

1. 通过 — schema v6 / visual order preserved
2. 通过 — legacy applied date migration / opened wins
3. 通过 — reject invalid JSON schema
4. 通过 — reject orphan event
5. 通过 — reject duplicate IDs and bad dates
6. 通过 — legacy ambiguous reimbursement zero stays claim amount
7. 通过 — explicit reimbursement zero stays zero
8. 通过 — partial reimbursement received / pending
9. 通过 — partial points / cash
10. 通过 — AU actual points do not multiply
11. 通过 — AU reward belongs only to primary owner
12. 通过 — cash metrics exclude point valuation
13. 通过 — actual date independent from registration
14. 通过 — AT&T Points Plus / Best Western catalogs retained
15. 通过 — CSV formula protection
16. 通过 — HTML injection escaped in names / titles
17. 通过 — lazy rendering only current page
18. 通过 — 5000 events paginated to 50
19. 通过 — search covers final record / caret remains mounted
20. 通过 — synthetic IME defers search and retains input
21. 通过 — JSON full export includes all records and preferences
22. 通过 — invalid import leaves data intact
23. 通过 — valid legacy JSON import works
24. 通过 — storage quota failure rolls back / draft stays
25. 通过 — stale window write rejected
26. 通过 — card add / edit / delete
27. 通过 — ledger add / edit / delete
28. 通过 — editing untouched legacy credit zero preserves meaning
29. 通过 — product change recalculates on deletion
30. 通过 — visual reorder persisted

## 新增手机 / PWA 清单

1. 通过 — 390px phone dashboard uses number cards / no table
2. 通过 — five bottom navigation entries and More routes
3. 通过 — mobile events reuse 50-record pagination
4. 通过 — mobile search finds record 5000 and holds caret
5. 通过 — event expands details and edits
6. 通过 — phone form is full screen / 16px / single column
7. 通过 — unsaved close rejected retains draft
8. 通过 — resize / layout switch preserves live form node and content
9. 通过 — 320 / 390 / 844 / 768 / 1024 screens have no horizontal overflow
10. 通过 — long name / million-plus points / large pending numbers
11. 通过 — phone product search / manual product / IME / cursor
12. 通过 — mobile save feedback only after commit
13. 通过 — native file input JSON import (synthetic file chooser)
14. 通过 — phone JSON download / backup timestamp
15. 通过 — Web Share files branch supplies full JSON (API simulation)
16. 通过 — offline HTML file opens / local save without service worker
17. 通过 — subpath manifest / icons / SW registration
18. 通过 — clean online launch contains no embedded private data
19. 通过 — offline start / edit / save / reload preserves records
20. 通过 — program update waits / caches current shell / data retained
21. 通过 — update is blocked for unsaved form / draft retained
22. 通过 — new worker in another tab preserves unsaved form
23. 通过 — obsolete cache removed / JSON not cached / no uploads
24. 通过 — updated shell starts offline with unchanged data

## 追加可靠性清单

1. 通过 — damaged localStorage is not overwritten
2. 通过 — explicit recovery import preserves damaged raw and succeeds
3. 通过 — real second window rejects stale overwrite / retains draft
4. 通过 — JSON import cancel preserves current bytes
5. 通过 — wrong benefit linkage rejected on import
6. 通过 — readable snapshot kept on full replacement
7. 通过 — reduced-height viewport can scroll to Save; nav is hidden
8. 通过 — font enlargement simulation keeps page within width
9. 通过 — incomplete update cache is rejected; old shell works offline

## 源码与复现

验证包含未改动的 baseline/Cardfolio_v1_7_4.html、src 增量视图、build.cjs、最终 cardfolio 静态程序、测试脚本与 artifacts 原始结果。生产 HTML 不含 __test 测试接口；测试服务器只在带 ?test 的受控页面临时注入接口，不会更改发布文件。

1. 安装 Node.js（推荐 20 或更高）并在验证目录运行 `npm install`。
2. 运行 `npx playwright install chromium`，或设置 CHROMIUM_EXECUTABLE 指向本机 Chrome。
3. 依次运行 `node build.cjs`、`node tests/make-icons.cjs`。
4. 运行 `node tests/regression.cjs baseline` 建立基线，再运行 `node tests/regression.cjs v1.8` 和 `node tests/regression.cjs v1.8 mobile`。
5. 运行 `node tests/mobile-pwa.cjs`、`node tests/reliability.cjs`、`node tests/benchmark.cjs`。
6. 所有结果写入 artifacts；`node tests/screenshots.cjs` 重新生成合成数据截图。

源码 / 依赖 / 测试包不需要上传到 GitHub Pages。详细原生验收清单见 [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md)。

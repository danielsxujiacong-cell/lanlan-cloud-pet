# 蓝蓝的小窝 / Lanlan Cloud Pet

给蓝蓝一个云端小窝，让任何访问者都能投喂她。页面无需注册，投喂记录和统计由 Supabase 共享保存。

## 状态

- **阶段：** V1 MVP，待连接 Supabase
- **主要入口：** `index.html`
- **最近更新：** 2026-09-28

## 快速开始

1. 按照 [SETUP.md](SETUP.md) 创建 Supabase 表并填写公开 URL 和 anon key。
2. 可将蓝蓝图片放在 `assets/lanlan.png`。
3. 运行 `python -m http.server 4173`，访问 `http://localhost:4173`。

## 项目结构

| 路径 | 用途 |
| --- | --- |
| `index.html` | 移动优先的投喂页面 |
| `styles.css` | 浅色、深色与响应式样式 |
| `app.js` | Supabase REST 写入、云端统计与交互 |
| `supabase-config.js` | 浏览器公开 Supabase 配置 |
| `assets/` | 蓝蓝的图片 |
| `SETUP.md` | Supabase 建表和运行步骤 |
| `docs/PROJECT_CONTEXT.md` | 项目范围与技术决策 |
| `docs/HANDOFF.md` | 当前状态和后续步骤 |

## 同步

在任一台电脑开始修改前先检查 Git 状态并安全同步。完成有意义的修改后，提交并推送到此私有 GitHub 仓库。

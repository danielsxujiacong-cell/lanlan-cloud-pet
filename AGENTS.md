# 项目说明

- 本项目是无需登录的静态 V1 页面；仅实现投喂、云端计数和浅/深色模式。
- `index.html`、`styles.css`、`app.js` 在仓库根目录，无构建步骤。
- Supabase 使用 REST API 和浏览器公开 anon/publishable key；严禁使用 `service_role` key。
- `feed_events` 只允许 `anon` 读取和插入。修改数据结构时同步更新 `SETUP.md`。
- 蓝蓝原图放在 `assets/lanlan.png`；没有原图时使用页面内置的猫咪占位图。
- 结束有后续事项的工作时更新 `docs/HANDOFF.md`；只改动需要的文件。
- 本地预览：`python -m http.server 4173`。检查移动布局时优先使用 390×844 视口。

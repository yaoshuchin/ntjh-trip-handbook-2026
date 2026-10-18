# 南投縣立南投國民中學 115學年度 畢業旅行行動簡報手冊（去個資版）

本專案依據南投國中 115 學年度畢業旅行手冊資料（115.10.21 - 115.10.23，三天二夜）打造之**全螢幕簡報式行動網頁（Slide Deck Webpage）**。全體 178 位同學與 12 位隨團師長姓名已全數完成「去個資處理」（第二個字替換為「O」），符合個資法規，適合公開展示與行前說明會投影簡報。

- **線上展示（GitHub Pages）**：[https://yaoshuchin.github.io/ntjh-trip-handbook-2026/](https://yaoshuchin.github.io/ntjh-trip-handbook-2026/)
- **GitHub 專案倉庫**：[https://github.com/yaoshuchin/ntjh-trip-handbook-2026](https://github.com/yaoshuchin/ntjh-trip-handbook-2026)
- **Netlify 部署支援**：專案內已包含 `netlify.toml`，於 Netlify 連結此 GitHub 儲存庫即可一鍵自動部署。

---

## 🌟 展示功能與特色

1. **🖥️ 簡報模式（Presentation Mode）**
   - 專為教室投影機、大螢幕與行前說明會打造，支援固定 16:9 比例與自動等比縮放（1280×720）。
   - 支援鍵盤快速翻頁（`←`、`→`、`Space`）與全螢幕模式（`F`）。
   - 內建投影片目錄總覽（TOC）快速跳頁。

2. **📜 閱讀模式（Reading Mode）**
   - 一鍵切換垂直捲動瀏覽，適合師生與家長於手機、平板滑動查閱完整手冊內容。

3. **📱 整合行動手冊速查版（App Mode）**
   - 內建 `app.html`，提供輸入姓名/房號秒查的搜尋引擎、海生館學習單即時互動驗證與行李打包打勾清單。

---

## 📄 專案目錄結構

- `投中畢旅手冊-去個資.md`：手冊完整文字檔（已去除個人隱私個資）。
- `index.html`：簡報式主網頁（28 頁精緻投影投影片）。
- `app.html`：行動版即時查房搜尋手冊。
- `deck.css` / `lesson-deck.js`：簡報縮放與投影翻頁引擎。
- `netlify.toml`：Netlify 自動構建與發布設定檔。
- `start.bat`：本機一鍵啟動伺服器與開啟瀏覽器指令檔。

---

## 🚀 本機開啟方式

- 直接雙擊 `start.bat`，系統將啟動本機伺服器並自動開啟 `http://localhost:8080` 瀏覽簡報。

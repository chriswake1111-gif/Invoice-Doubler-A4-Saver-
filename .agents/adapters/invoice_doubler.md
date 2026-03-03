name: Invoice-Doubler Frontend Architecture
description: 專案專用的架構與技術約定（React + Vite 純前端，無後端與資料庫）。

# Adapter: Invoice-Doubler Frontend Architecture

**專案概述**：出貨單排版小幫手 (Invoice Doubler)  
**技術棧**：React (Vite) + TypeScript + TailwindCSS (如適用) + CSS3  
**專案型態**：純前端應用 (無資料庫、無後端 API)

## 🎯 核心領域知識 (Domain Knowledge)
1. **剪貼簿操作**：依賴瀏覽器的 Clipboard API 攔截剪貼簿中的圖片（Print Screen）。
2. **影像處理/排版**：將截圖自動一分為二（Top/Bottom），並進行縮放或位移微調。
3. **列印優化 (Print CSS)**：最重要的功能。必須使用 `@media print` 隱藏 UI 介面，並確保生成的兩張 A4 排版能夠滿版列印，不跑版。

## 🏗️ 架構與設計約定
- **不使用後端/資料庫**：所有狀態僅保存在前端（`useState`, 或是 `localStorage` 若需記住使用者的微調設定）。
- **輕量化與高效**：重點在於順暢的貼上與即時預覽。
- **UI/UX**：簡潔直覺，包含可讓使用者即刻微調的 Control Panel (縮放比、位移等)。

## 🧪 測試與驗證策略
- **沒有後端 Python 腳本**。所有的測試都集中在 React 元件層面與流覽器 API (特別是列印與剪貼簿)。
- **混沌測試重點 (Auditor)**：
  - 載入非圖片資料到剪貼簿時的 Error Handling。
  - 列印預覽模式切換時的樣式變化。
  - 非常大解析度的截圖是否會造成瀏覽器卡頓或內存溢出。
  - `@media print` 規則在跨瀏覽器下是否正常工作。

## 🚫 禁忌與限制
- 禁止引入任何後端資料庫依賴 (如 SQLite, ORM)。
- 禁止新增伺服器端路由。

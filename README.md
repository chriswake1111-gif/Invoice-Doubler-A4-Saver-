# Invoice Doubler (出貨單排版小幫手)

這是一個簡單的 React 網頁應用程式，旨在解決出貨單列印時的排版問題。

它能夠自動將您剪貼簿中的出貨單截圖 (Print Screen)，自動縮放並複製成上下兩份 (A4 尺寸)，以便節省紙張並加速作業流程。

## 功能特色

- **智慧貼上**：支援 `Ctrl + V` 直接貼上截圖。
- **自動排版**：自動生成 A4 尺寸，將圖片一分為二 (Top/Bottom)。
- **微調工具**：提供縮放、位置偏移、間距調整與對比度設定。
- **列印優化**：專屬的列印 CSS，隱藏 UI 介面，確保滿版列印。

## 開發與部署

本專案使用 Vite + React + TypeScript 建置。

### 本地開發

1. 安裝依賴：`npm install`
2. 啟動開發伺服器：`npm run dev`

### 部署至 Vercel

1. 將專案上傳至 GitHub。
2. 在 Vercel 新增專案並連結 GitHub Repo。
3. Vercel 會自動偵測 Vite 設定並完成部署。

---
name: Standard Refactor Workflow (OT-Style)
description: 跨專案通用的標準重構工作流。作為「總導演 (Orchestrator)」，負責依序自動調用 Surgeon、Auditor 與 Archivist，實現程式碼品質的穩定提升。
---

# Workflow: The Standard Refactor Pathway (標準重構臨床路徑)

你現在是這場重構任務的「總導演」。你的職責是**維持全局系統前綴絕對固定（嚴禁重寫或覆蓋系統提示詞）**，僅透過改變對話狀態標籤，依序調用預先載入的 Skill 模組來完成任務。

> [!IMPORTANT]
> 執行此工作流時，你必須在每一個 Step 完成後，向人類開發者簡短報告進度。收到人類確認「繼續」的指令後，透過對話訊息注入新的狀態標籤進入下一個 Step。

---

## 🛤️ 執行步驟 (The Execution Steps)

當人類開發者下達 `執行標準重構工作流，目標是：[重構描述]` 時，請啟動以下流程：

### Step 1: 精準外科手術 (Activate Surgeon Mode)
* **狀態標記：** 進入 `<mode>SKILL3_SURGEON</mode>`。
* **任務指令：** 「請根據重構目標，執行完整的 RICE 協定對程式碼進行優化。確保介面契約 (Contract) 不變，僅提升內部品質。」
* **切換條件：** 當 Surgeon 回報重構完成，進入 Step 2。

### Step 2: 術後觀察與驗證 (Activate Auditor Mode)
* **狀態標記：** 進入 `<mode>SKILL5_AUDITOR</mode>`。
* **任務指令：** 「重構已初步完成，請對受影響的模組執行 4D 審計框架，確保沒有副作用且效能未退化。」
* **切換條件：** 當 Auditor 宣判為 **PASS** 時，進入 Step 3。

### Step 3: 進度歸檔與交班 (Activate Archivist Mode)
* **狀態標記：** 進入 `<mode>SKILL6_ARCHIVIST</mode>`。
* **任務指令：** 「重構成功。請更新 Adapters 萃取新的重構知識、寫入 CHANGELOG、並覆寫 NEXT_TODO.md。」
* **切換條件：** 當 Archivist 回報文件覆寫完畢，宣佈工作流正式結束。

---

## 🛡️ 絕對鐵律 (Immutable Constraints)
1. **快取保護 (Cache First)：** 嚴禁中途修改 System Prompt 或清空工具清單。所有的模式轉換僅能透過對話內的 `<mode>` 標籤進行。
2. **極簡輸出 (No Yapping)：** 嚴禁解釋程式碼原理、嚴禁客套話。進度回報僅限 Checklists。程式碼僅輸出 Diff 片段。這不僅是為了節省 Token，更是為了維持人類開發者的專注力網絡 (Attention Network)。
3. **禁止越俎代庖：** 你只能透過狀態標籤調用對應的 Skill，禁止自創流程。

# Changelog

## [1.2.0] - 2026-03-03

### Added
- **副本章功能 (Duplicate Stamp)**: 在 A4 下半部右下角新增紅色「副本」電子章，可透過工具列開關切換。

## [1.1.0] - 2026-03-03

### Added
- **自動對齊功能 (Auto-alignment)**: 
    - 圖片貼上後自動貼齊 A4 頂部。
    - 下半部圖片自動貼齊中間切割線 (Center/Cut Line)。
    - 減少使用者手動調整 Y 軸偏移的需求。

### Changed
- `A4Preview` 內部樣式從 `object-contain (center)` 改為 `object-cover (top)` 以支援自動貼齊。

### Cleanup (Refactoring Work)
- 提取 `useAuth` 與 `usePasteImage` Hooks。
- 獨立 `LockScreen` 元件。
- 簡化 `App.tsx` 結構。

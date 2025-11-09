// src/consts.ts

// 1. 定義分類的顯示名稱
export const CATEGORY_MAP = {
    health: '衛教資訊',
    reports: '報導',
    director: '院長專欄'
};

// 2. 導出一個包含所有分類 "鍵" 的陣列
// (使用 as const 確保 TypeScript 知道這些是固定值，不是隨便的 string)
export const CATEGORY_KEYS = ['health', 'reports', 'director'] as const;
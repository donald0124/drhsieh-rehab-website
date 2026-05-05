# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 診所基本資料
- **診所名稱：** 謝明福復健科診所
- **院長：** 謝明福醫師
- **網站：** https://drhsieh-rehab.com
- **位置：** 三峽/鶯歌地區（新北市）
- **技術棧：** Astro 5.x SSG、Tailwind CSS、TypeScript

---

## 開發指令

```bash
npm run dev      # 啟動開發伺服器 (http://localhost:4321)
npm run build    # 靜態產出至 dist/
npm run preview  # 預覽 build 結果
```

無測試套件，無 lint 指令。TypeScript 由 Astro 在建置時自動型別檢查。

---

## 架構概覽

### 路由與頁面
- `src/pages/index.astro` — 首頁，組合所有區塊元件
- `src/pages/blog/[...slug].astro` — 部落格文章動態路由，從 Content Collection 生成
- `src/pages/blog/index.astro` — 部落格列表頁
- `src/pages/conditions/` — 症狀分類頁（back-pain、knee-pain、neck-shoulder-pain、heel-pain、sports-injury）
- `src/pages/treatments/` — 治療方式頁（NEIMS、superlizer）
- `src/pages/api/posts.json.ts` — JSON API，輸出部落格文章清單

**重要：** `astro.config.mjs` 設定 `trailingSlash: 'always'`，所有 URL 必須以 `/` 結尾。內部連結請統一帶尾斜線（如 `/blog/`、`/treatments/neims/`）。

### 版型與元件
- `src/layouts/BaseLayout.astro` — 唯一版型，接受 `title`、`description`、`ogImage?`、`ogType?` props。包含 GA4、Schema.org JSON-LD（MedicalClinic、Person）、OG meta、canonical URL、favicon、Noto Sans TC 字型。使用 `<slot name="head" />` 讓子頁注入額外 meta。
- `src/components/` — 純 Astro 元件，無框架依賴

### 部落格 Content Collection
定義於 `src/content/config.ts`，Zod schema 如下：

| 欄位 | 型別 | 必填 | 備註 |
|------|------|------|------|
| `title` | string | ✅ | |
| `description` | string | ✅ | 用於 SEO |
| `pubDate` | date | ✅ | |
| `updatedDate` | date | — | 優先顯示為「更新於」|
| `lastMod` | date | — | 舊欄位，保留相容性 |
| `heroImage` | string | — | 圖片路徑，用於 OG Image |
| `category` | string[] | — | 分類標籤陣列 |
| `tags` | string[] | — | 標籤陣列，影響相關文章推薦演算法 |
| `author` | string | — | 預設 `謝明福 院長` |
| `featured` | boolean | — | 預設 `false` |

### 樣式系統
- `src/styles/base.css` — CSS 自訂屬性（品牌色、字型等），必須第一個引入
- `src/styles/style.css` — 全域樣式，引入在 `base.css` 之後
- `tailwind.config.mjs` — Tailwind 顏色（`primary`、`heading`、`text`、`border`、`gray-bg`）全部對應 `base.css` 的 CSS 變數，修改顏色只改 `base.css`

### 靜態資產
- `public/images/` — 一般圖片（hero、診所照片、blog 文章圖）
- `public/favicon/` — 所有 favicon 格式

---

## 重要診所特性（影響開發決策）

### 門診時間不可靜態化
診所採「**門診（看診）+ 復健預約**」雙軌制：
- 患者**必須先掛門診**由謝院長評估，才能安排復健療程
- 門診時間動態調整，**不固定**

**結論：不可在 Schema.org 或任何靜態內容中加入 `openingHoursSpecification`**。應引導患者至官網、Facebook、LINE 確認最新時段。

### 付款方式
- 僅接受**現金**（Schema.org `paymentAccepted: "現金"`）
- **不加入 `priceRange`**（費用依健保/自費不同，靜態價格區間會誤導）

### 社群媒體
- 診所**沒有 Twitter/X 帳號**，不加入 Twitter Card meta tags
- 有 Facebook、LINE 官方帳號

### 醫療內容邊界
- FAQ 與部落格內容**不回答醫療預後問題**（如「幾次會好？」）
- 涉及特定症狀治療細節，引導至診所就診
- NEIMS（針極肌肉內電刺激）相關問題引導至 `/blog/neims-first-visit/`

---

## SEO / Schema.org 原則

- Schema 類型：`MedicalClinic`、`Person`（院長）、`FAQPage`、`MedicalWebPage`、`Article`
- **不加** `openingHoursSpecification`、**不加** `priceRange`（見上）
- 部落格文章在 `[...slug].astro` 自動注入 `BreadcrumbList` + `Article`/`MedicalWebPage` JSON-LD
- `robots.txt` 明確允許 GPTBot、Claude-Web、PerplexityBot 等 AI 爬蟲

---

## 開發規範
- 語言：繁體中文（zh-TW）
- 無障礙：所有連結需有 `aria-label` 或可讀文字
- 圖片 alt 文字使用繁體中文描述

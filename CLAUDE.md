# 謝明福復健科診所 — Claude 專案背景

## 診所基本資料
- **診所名稱：** 謝明福復健科診所
- **院長：** 謝明福醫師
- **網站：** https://drhsieh-rehab.com
- **位置：** 三峽/鶯歌地區（新北市）
- **技術棧：** Astro 5.x SSG、Tailwind CSS、TypeScript

---

## 重要診所特性（影響開發決策）

### 門診時間不可靜態化
診所採「**門診（看診）+ 復健預約**」雙軌制：
- 患者**必須先掛門診**由謝院長評估，才能安排復健療程
- 復健時段另外預約，與門診時間分開
- 門診時間會依院長排班動態調整，**不固定**

**結論：不可在 Schema.org 或任何靜態內容中加入 `openingHoursSpecification`**。靜態營業時間會誤導患者以為復健隨時可做。應引導患者至官網、Facebook、LINE 確認最新時段。

### 付款方式
- 僅接受**現金**（`paymentAccepted: "現金"`）
- 貨幣：新台幣 TWD（`currenciesAccepted: "TWD"`）
- **不加入 `priceRange`**（復健診所費用依健保給付與自費項目不同，靜態價格區間會誤導）

### 無社群媒體帳號限制
- 診所**沒有 Twitter/X 帳號**，不加入 Twitter Card meta tags
- 有 Facebook、LINE 官方帳號

### 醫療內容邊界
- FAQ 與部落格內容**不回答醫療預後問題**（如「幾次會好？」）
- 涉及特定症狀治療細節，引導至診所就診
- NEIMS（針極肌肉內電刺激）相關問題引導至 `/blog/neims-first-visit/`

---

## SEO / GEO 決策記錄

### 已完成（2026-04-08）
- `BaseLayout.astro`：新增 `ogType` prop、`<slot name="head" />`、skip link、`id="main-content"`
- `[...slug].astro`：blog 文章加入 `og:type="article"` 與 `article:*` meta tags
- `QA.astro`：FAQ 從 3 題擴充至 10 題（含健保、NEIMS、初診流程等）
- `robots.txt`：明確允許 GPTBot、Claude-Web、PerplexityBot 等 AI 爬蟲

### Schema.org 原則
- 使用 `MedicalClinic`、`Person`（院長）、`FAQPage`、`MedicalWebPage`、`Article`
- **不加** `openingHoursSpecification`（見上方原因）
- **不加** `priceRange`

---

## 開發規範
- 語言：繁體中文（zh-TW）
- 無障礙：所有連結需有 `aria-label` 或可讀文字
- 圖片 alt 文字使用繁體中文描述

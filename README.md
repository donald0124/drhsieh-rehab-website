# 謝明福復健科診所 - 官方網站

三峽、鶯歌地區復健治療專業診所的官方網站。由 Astro + Tailwind CSS 驅動，提供響應式設計和完善的 SEO 優化。

## 🏥 網站特色

- **專業醫療內容**：由謝明福院長親自審核的衛教文章
- **響應式設計 (RWD)**：完美支援桌機、平板與手機
- **SEO 優化完善**：結構化資料、動態內部連結、長尾關鍵字策略
- **快速載入效能**：Astro SSG 靜態生成，國際 CDN 分發
- **內容管理便捷**：Markdown 檔案驅動的部落格系統

## 🚀 快速開始

### 環境需求
- Node.js 18+ 
- npm 或 pnpm

### 安裝與開發

```sh
# 安裝依賴
npm install

# 啟動開發伺服器 (http://localhost:4321)
npm run dev

# 構建生產版本
npm run build

# 預覽構建結果
npm run preview
```

## 📁 專案結構

```
src/
├── pages/          # 頁面路由 (index.astro, blog/[...slug].astro 等)
├── components/     # 可複用元件 (Header, Services, Team, QA 等)
├── layouts/        # 版型模板 (BaseLayout 用於 SEO 與全域結構)
├── content/        # Markdown 內容集合
│   └── blog/       # 部落格文章
├── styles/         # 全域樣式
└── consts.ts       # 常數設定

public/
├── images/         # 圖片資產
├── favicon/        # Favicon 設定
└── robots.txt      # 搜尋引擎爬蟲指引
```

## 🎯 主要頁面

| 頁面 | 路徑 | 說明 |
|:---|:---|:---|
| 首頁 | `/` | 診所介紹、服務項目、醫師簡介 |
| 部落格 | `/blog/` | 衛教文章列表 |
| 文章詳情 | `/blog/[slug]/` | 個別文章頁面（含推薦文章、FAQ Schema） |
| 隱私政策 | `/privacy/` | 個資保護聲明 |
| 404 | `/404.astro` | 找不到頁面（含文章推薦） |

## 📝 新增文章步驟

1. **建立 Markdown 檔案**：在 `src/content/blog/` 下新增 `your-article.md`
2. **填寫 Front Matter**（必須）：
   ```yaml
   ---
   title: '文章標題'
   description: 'SEO 描述（160字內）'
   pubDate: 2025-01-15
   updatedDate: 2025-01-16  # 可選
   heroImage: '/images/blog/your-image.jpg'
   author: '謝明福 院長'
   featured: false
   tags: ['標籤1', '標籤2', '標籤3']
   ---
   ```
3. **編寫內容**：使用 Markdown 格式撰寫
4. **自動發佈**：推送到 GitHub 後，CI/CD 自動部署

## 🔧 重要設定檔

| 檔案 | 用途 |
|:---|:---|
| `astro.config.mjs` | Astro 專案設定（域名、集成、Sitemap） |
| `tailwind.config.mjs` | Tailwind CSS 自訂主題 |
| `tsconfig.json` | TypeScript 編譯設定 |
| `GROWTH_STRATEGY.md` | SEO 優化與轉換率提升策略 |
| `CONTENT_PLAN.md` | 內容行銷規劃與執行排程 |

## 🚀 部署

網站由 **Cloudflare Pages** 託管，自動從 GitHub `main` 分支部署。

- **生產網址**：https://drhsieh-rehab.com
- **Preview**：每個 PR 自動生成預覽連結
- **DNS**：由 Cloudflare 管理
- **SSL/TLS**：全自動 HTTPS

## 📊 SEO 優化功能

✅ **技術 SEO**
- XML Sitemap 自動生成
- 結構化資料 (Schema.org)：WebSite、MedicalClinic、BreadcrumbList、FAQPage
- Canonical Tags 自動設置
- Open Graph / Twitter Card

✅ **內容 SEO**
- 長尾關鍵字策略（症狀導向查詢）
- 內部連結自動串聯（Services ↔ Blog）
- Meta Title / Description 優化
- 圖片 Alt 屬性描述

✅ **轉換率優化 (CRO)**
- 行動版 Sticky Bottom CTA Bar（地圖、電話、LINE、時間）
- 強化信任感（醫師資歷、媒體報導、Q&A）
- 明確的行動呼籲（現場掛號·醫師親診）

## 🛠️ 常見任務

### 編輯首頁內容
編輯位置通常在：
- 醫師介紹：[`src/components/Team.astro`](src/components/Team.astro)
- 診所簡介：[`src/components/AboutUs.astro`](src/components/AboutUs.astro)
- 服務項目：[`src/components/Services.astro`](src/components/Services.astro)
- 常見問題：[`src/components/QA.astro`](src/components/QA.astro)

### 更新就診資訊
編輯 [`src/components/Patientinfo.astro`](src/components/Patientinfo.astro) 中的：
- 診所地址、電話、門診時間
- Google Maps 嵌入
- 掛號須知

### 更新部落格文章標籤
編輯 [`src/components/Services.astro`](src/components/Services.astro) 中的 `rawServicesData`，確保新增的 `tags` 能自動串聯相關文章。

## 📞 聯絡資訊

- **診所電話**：+886-2-2671-8910
- **地址**：新北市三峽區中華路 22 號 2 樓
- **LINE 官方帳號**：@gsj9393s
- **Facebook**：Top rehabilitation center

## 📋 相關文件

- [成長與 SEO 策略](GROWTH_STRATEGY.md) - 完整的優化方案與執行路線圖
- [內容策劃](CONTENT_PLAN.md) - 文章主題規劃與撰寫規範

## 📄 授權

本專案內容（文章、圖片）屬謝明福復健科診所著作權。程式碼部分參考 Astro 官方模板。

---

**最後更新**：2026年2月  
**維護者**：謝明福復健科診所
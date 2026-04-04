# 🚀 謝明福復健科診所網站：深度 SEO 痛點修復與最佳化方案

根據針對 Astro codebase 與即時狀況的深度分析，網站在基礎架構（Astro 靜態生成、Cloudflare 配置、sitemap/robots）上表現優異。

然而，要真正在 **E-E-A-T (專業、權威、可信度)** 評分中脫穎而出並**統治區域醫療市場**，我們必須修復以下影響搜尋排名的關鍵技術漏洞。

---

## 1. 致命缺陷：部落格缺乏 `MedicalWebPage` 或 `Article` 結構化標記

**問題描述**：目前的部落格文章頁面 (`[...slug].astro`) 只有建立 `BreadcrumbList` (麵包屑) 的結構化資料，缺乏宣告「這是一篇由專業復健科醫師撰寫的醫療文章」。這會錯失讓 Google 精確辨識醫療專業度的機會，長尾關鍵字的競爭力會受到限制。

**修復方案**：
在 `src/pages/blog/[...slug].astro` 的 Frontmatter 中加入以下 JSON-LD 結構化資料。

> [!IMPORTANT]
> 醫療相關網頁強烈建議使用 `MedicalWebPage` 作為 `@type`，這能直接向搜尋引擎證明內容的專業醫療性質。

```astro
// src/pages/blog/[...slug].astro (約 91 行附近)
const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage", // 標示為專業醫療領域網頁
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${post.slug}/`
    },
    "headline": post.data.title,
    "description": post.data.description,
    "image": post.data.heroImage ? `${siteUrl}${post.data.heroImage}` : `${siteUrl}/images/default-og-image-1200x630.jpg`,
    "author": {
        "@type": "Person",
        "name": post.data.author || "謝明福醫師",
        "url": `${siteUrl}/#team`
    },
    "publisher": {
        "@type": "MedicalClinic",
        "name": "謝明福復健科診所",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/drhsieh-rehab-logo.svg`
        }
    },
    "datePublished": post.data.pubDate.toISOString(),
    "dateModified": lastModified ? lastModified.toISOString() : post.data.pubDate.toISOString()
});
```

並在頁面下方匯出腳本：
```html
<script type="application/ld+json" set:html={breadcrumbSchema} />
<script type="application/ld+json" set:html={articleSchema} /> <!-- 新增這一行 -->
```

---

## 2. 圖片未最佳化：嚴重拖垮 LCP (最大內容繪製) 指標

**問題描述**：專案大量依賴原生的 `<img>` 標籤（如 `AboutUs.astro`、`Team.astro`、`Patientinfo.astro` 中的診所外觀與醫師照片）。這些圖片不僅**沒有** `loading="lazy"` 與 `decoding="async"`，也沒有經過 WebP/AVIF 自動轉換壓縮，對手機版網頁載入速度 (PageSpeed / Core Web Vitals) 是重傷。

**修復方案**：
針對非首屏 (Below the fold) 的圖片加上原生 Lazy loading 屬性。

> [!TIP]
> 第一屏的 Hero Section 首圖請不要加 Lazy Loading，甚至可以加上 `fetchpriority="high"`。

```html
<!-- 範例修改 src/components/Team.astro 中醫師的照片 -->
<img 
    src="/images/dr-hsiehmf.jpg" 
    alt="謝明福復健科診所院長 - 謝明福醫師" 
    class="absolute inset-0 w-full h-full object-cover object-top"
    loading="lazy"    <!-- 必加 -->
    decoding="async"  <!-- 必加 -->
/>
```

---

## 3. Header 存在 Accessibility (無障礙) 標籤空白

**問題描述**：`src/components/Header.astro` 內的社群連結 (LINE、Facebook) 圖片標籤使用了空的 `alt=""`。搜尋爬蟲相當看重無障礙分數，空白的替代文字會流失關鍵字的關聯性。

**修復方案**：
明確標示出圖示的意義，強化在地關鍵字。

```html
<!-- 修正 src/components/Header.astro -->
<img 
    src="/LINE_icon.svg" 
    alt="謝明福復健科診所 LINE 官方預約諮詢"  <!-- 加強地區字群 -->
    width="36" 
    height="36" 
    loading="lazy" 
/>
<img 
    src="/Facebook_icon.svg" 
    alt="謝明福復健科診所 Facebook 粉絲專頁"
    width="36" 
    height="36" 
    loading="lazy" 
/>
```

---

## 4. HTML Heading (H1-H6) 標籤層級跳躍

**問題描述**：在文章分類頁 (`src/pages/blog/[category].astro`) 及文章預覽元件 (`src/components/BlogPreview.astro`) 中，大標題被設定為 `<h1>` 後，文章清單標題直接跳躍使用了 `<h3>` 或 `<h4>`。這會破壞網頁樹狀結構，進而影響 Googlebot 爬取時對內容重要性的理解。

**修復方案**：
循序漸進使用 Heading 層架 (H1 → H2 → H3)，如果視覺效果不想太大，應利用 Tailwind classes 調整大小，而非隨意變更 Heading 層級。

```astro
<!-- 修正 src/pages/blog/[category].astro 以及 BlogPreview.astro -->

<!-- 將原本的 <h3> 或 <h4> 改為 <h2> -->
<h2 class="text-xl font-bold my-2 text-primary text-left">
    {post.data.title}
</h2> 
```

---

## 5. 外部連結漏掉安全性標籤，導致 PageRank 權重流失

**問題描述**：在 `src/components/Patientinfo.astro` 等元件中，帶有 `target="_blank"`（開新分頁）的外部連結（如連至三總掛號系統）。若是沒有加上 `rel` 安全屬性，不僅有安全風險，也會無謂地將網站積累的 SEO 權重流失出去。

**修復方案**：
對所有非本站的外部 `target="_blank"` 連結，強制加上 `rel="noopener noreferrer"`。不希望給予權重的站點可以加上 `nofollow`。

```html
<!-- 修正 src/components/Patientinfo.astro 連至三總的部分 -->
<a 
    href="https://www2.ndmctsgh.edu.tw/..." 
    target="_blank" 
    rel="noopener noreferrer nofollow" <!-- 必加 -->
    class="..."
>
    三總汀州
</a>
```

---

## 💡 總結行動建議

完成上述修復後，建議：
1. **再次進入 Google Search Console**：提交更新後的 `/sitemap-index.xml` 以加速重新抓取。
2. **在地 SEO 擴充**：如果您未來有寫新文章的計畫，可以稍微提高「三峽、鶯歌、樹林、桃園」等地名關鍵字與「症狀（如：肩頸僵硬）」的搭配頻率。

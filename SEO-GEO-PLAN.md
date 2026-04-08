# Core 30 完美鏡像策略 — SEO/GEO 優化計畫

> 最後更新：2026-04-08

## 核心問題

GBP 有 18 項服務，但網站上**0 個獨立服務頁面**。所有病症都塞在首頁的手風琴元件中，Google/AI 無法做 1:1 對應。

## 現況快照

| 指標 | 現況 |
|------|------|
| 總頁面數 | 5（首頁、隱私、部落格列表、動態文章、404）|
| GBP 服務項目 | 18 項 |
| 對應的服務獨立頁 | **0 個** |
| 部落格文章 | 37 篇（涵蓋 NEIMS、坐骨神經痛、五十肩等主題）|
| 現有 Schema | MedicalClinic、Person、FAQPage、Article+MedicalWebPage、BreadcrumbList |
| 缺少的 Schema | MedicalProcedure、openingHoursSpecification、availableService、hasMap |

---

## 實作計畫（8 步驟）

### 第一步：建立 Services Content Collection（前置）

**檔案：** `src/content/config.ts`

新增 `servicesCollection`：

```typescript
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    gbpService: z.string(),          // GBP 完全一致的服務名稱
    hubCategory: z.enum(['neck-shoulder','upper-limb','lower-limb','spine-skeletal','neurological']),
    description: z.string(),
    heroImage: z.string().optional(),
    keywords: z.array(z.string()),
    relatedConditions: z.array(z.string()),
    relatedBlogSlugs: z.array(z.string()).optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
  'services': servicesCollection,  // 新增
};
```

---

### 第二步：建立服務頁動態路由

**新增檔案：** `src/pages/services/[slug].astro`

參考 `src/pages/blog/[...slug].astro`，每頁需包含：

1. Breadcrumb：首頁 → 服務項目 → [服務名稱]
2. 服務定義區塊（AI 可擷取的摘要）
3. 適合症狀清單
4. 治療流程說明
5. 謝明福院長治療特色（E-E-A-T 權威性）
6. 相關衛教文章（內部連結至 `/blog/[slug]/`）
7. 常見問題 FAQ（觸發 FAQPage Schema rich snippets）
8. 複用現有 `CallToAction.astro`

**每頁注入的 Schema（透過 `<slot name="head">` 傳入 BaseLayout）：**

```json
{
  "@type": "MedicalProcedure",
  "@id": "https://drhsieh-rehab.com/services/[slug]/#procedure",
  "name": "服務中文名稱",
  "performer": { "@id": "https://drhsieh-rehab.com/#doctor" },
  "availableService": { "@id": "https://drhsieh-rehab.com/#clinic" }
}
```

\+ `BreadcrumbList` \+ `FAQPage`（若有 FAQs）

---

### 第三步：建立 18 個 GBP 鏡像服務頁

**新增目錄：** `src/content/services/`

#### GBP 服務 → Slug → 類別中樞對應表

| 優先 | GBP 服務名稱 | Slug | 類別中樞 | 可連結的現有部落格文章 |
|------|------------|------|---------|---------------------|
| **P0** | 針極肌肉內電刺激治療 | `neims` | neurological | neims.md, neims-first-visit.md, chronic-myofascial-pain-neims.md 等 9 篇 |
| **P0** | 坐骨神經痛治療 | `sciatica-treatment` | spine-skeletal | sciatica-piriformis-myofascial-pain.md, neims-sciatica-elderly.md |
| **P0** | 肩頸痠痛治療 | `neck-shoulder-pain` | neck-shoulder | stiff-neck.md, hand-numbness-when-sleeping.md |
| **P0** | 肌筋膜疼痛治療 | `myofascial-pain-treatment` | neurological | myofascial-pain-syndrome.md, groin-pain-myofasciitis-neims.md |
| P1 | 直線偏極光治療 | `superlizer` | neck-shoulder | superlizer.md, great-toe-fracture-superlizer.md |
| P1 | 關節玻尿酸注射 | `hyaluronic-acid-injection` | spine-skeletal | knee-pain-osteoarthritis.md |
| P1 | 葡萄糖水增生注射 | `prolotherapy` | upper-limb | tennis-elbow-treatment-experience.md |
| P1 | 骨科術後復健 | `post-surgical-rehab` | spine-skeletal | post-spinal-surgery-myofascial-pain.md |
| P1 | 運動傷害治療 | `sports-injury-treatment` | upper-limb | runner-knee.md, neims-ankle-sprain.md |
| P1 | 脊椎復健 | `spine-rehab` | spine-skeletal | sleep-posture-disc-herniation-spine-care.md |
| P1 | 神經復健 | `neurological-rehab` | neurological | peroneal-nerve-injury-foot-drop-neims.md |
| P1 | 個別化復健治療 | `individualized-rehab` | neurological | neims-for-senior.md |
| P2 | 肌腱炎治療 | `tendinitis-treatment` | upper-limb | mommy-thumb-de-quervains-syndrome.md, trigger-finger-3c-product-injury.md |
| P2 | 疼痛管理 | `pain-management` | neurological | external-pain-relief-medication.md |
| P2 | 慢性疼痛評估 | `chronic-pain-assessment` | neurological | — |
| P2 | 肌肉韌帶扭拉傷復健 | `muscle-ligament-rehab` | lower-limb | plantar-fasciitis-heel-pain.md, pes-anserine-bursitis.md |
| P2 | 復健中心 | `rehab-center` | neurological | — |
| P2 | 復健科醫師 | `physiatrist` | neurological | top-rehab-doctor-award-personal-reflections.md |

---

### 第四步：建立 5 個類別中樞頁 + 服務總覽

**新增檔案：**

```
src/pages/services/
├── index.astro                     ← 服務項目總覽（列出全部 18 項）
├── [slug].astro                    ← 動態路由（18 個 GBP 服務頁）
├── neck-shoulder/index.astro       ← 頭頸疼痛復健
├── upper-limb/index.astro          ← 上肢傷害復健
├── lower-limb/index.astro          ← 下肢與足部復健
├── spine-skeletal/index.astro      ← 脊椎與骨骼復健
└── neurological/index.astro        ← 神經與全身性復健
```

每個中樞頁透過 `getCollection('services').filter(...)` 自動彙整子服務清單。
Schema：`MedicalWebPage` + `BreadcrumbList` + `ItemList`

---

### 第五步：更新 BaseLayout.astro（全域 Schema 補強）

**檔案：** `src/layouts/BaseLayout.astro`（第 86-117 行）

新增至現有 `MedicalClinic` JSON-LD：

```json
"hasMap": "https://maps.app.goo.gl/Hn1g21m9DsVVTFQ97",
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "12:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Wednesday","Friday"],
    "opens": "15:00", "closes": "18:00"
  }
],
"availableService": [
  { "@type": "MedicalProcedure", "name": "針極肌肉內電刺激治療", "url": "https://drhsieh-rehab.com/services/neims/" }
  // ... 全部 18 項
]
```

> **注意：** 門診時間請先確認精確時段（週二下午院長於三總、週日休診等），確保與 GBP 100% 一致。

---

### 第六步：部落格 → 服務頁反向內部連結

**新增檔案：** `src/data/blog-service-links.ts`

```typescript
export const blogToServiceLinks: Record<string, string[]> = {
  'neims': ['/services/neims/', '/services/myofascial-pain-treatment/'],
  'frozen-shoulder': ['/services/neck-shoulder-pain/', '/services/individualized-rehab/'],
  'sciatica-piriformis-myofascial-pain': ['/services/sciatica-treatment/', '/services/spine-rehab/'],
  'plantar-fasciitis-heel-pain': ['/services/muscle-ligament-rehab/', '/services/sports-injury-treatment/'],
  // ... 全部 37 篇
};
```

**修改：** `src/pages/blog/[...slug].astro`

在 `<CallToAction />` 前插入「相關治療服務」區塊，**無須修改任何 Markdown 文章**。

---

### 第七步：更新導覽元件

**Header.astro** — 展開「主治項目」下拉選單：

```
主治項目 ▾
├── 服務項目總覽       /services/
├── 頭頸疼痛復健       /services/neck-shoulder/
├── 上肢傷害復健       /services/upper-limb/
├── 下肢與足部復健     /services/lower-limb/
├── 脊椎與骨骼復健     /services/spine-skeletal/
├── 神經與全身性復健   /services/neurological/
├── ─────────────────
├── NEIMS             /services/neims/
└── 直線偏極光         /services/superlizer/
```

**Footer.astro** — 將「主治項目」欄的 `/#services` 靜態連結換成真實服務頁 URL。

**Services.astro** — 在各手風琴底部加「查看完整說明 →」連結；「特別專長」4 個 Card 連至對應服務頁。

---

### 第八步：地理訊號植入（內容寫作指引）

在服務頁 Markdown 中**自然置入**地理訊號（禁止關鍵字堆砌）：

| 地理訊號 | 適合頁面 |
|---------|---------|
| 三峽黃昏市場攤商因長時間站立... | 足底筋膜炎、肌腱炎 |
| 板橋/土城居民搭 910 公車... | 坐骨神經痛、脊椎復健 |
| 鶯歌、樹林沿台 3 線約 10 分鐘... | 疼痛管理、慢性疼痛評估 |
| 龍門社區長輩的膝關節... | 骨科術後復健、膝關節炎 |

---

## 新增頁面總計

| 類型 | 數量 |
|------|------|
| GBP 服務鏡像頁 `/services/[slug]/` | 18 |
| 類別中樞頁 | 5 |
| 服務總覽頁 `/services/` | 1 |
| **合計** | **24 個新頁面** |

---

## 關鍵檔案清單

### 需修改的現有檔案

| 檔案 | 修改內容 |
|------|---------|
| `src/content/config.ts` | 新增 services collection schema |
| `src/layouts/BaseLayout.astro` | MedicalClinic schema 補強 |
| `src/pages/blog/[...slug].astro` | 新增「相關治療服務」區塊 |
| `src/components/Header.astro` | 展開導覽下拉選單 |
| `src/components/Footer.astro` | 更新服務連結 URL |
| `src/components/Services.astro` | 加入指向中樞頁與服務頁的連結 |

### 需新增的檔案

```
src/content/services/         ← 18 個 .md 服務頁內容
src/pages/services/
  ├── index.astro
  ├── [slug].astro
  ├── neck-shoulder/index.astro
  ├── upper-limb/index.astro
  ├── lower-limb/index.astro
  ├── spine-skeletal/index.astro
  └── neurological/index.astro
src/data/blog-service-links.ts
```

---

## 驗證方式

1. `npm run build` 無錯誤，sitemap 新增 24 個 URL
2. Google Rich Results Test 驗證每個服務頁的 MedicalProcedure + FAQPage schema
3. schema.org validator 確認 MedicalClinic `availableService` 陣列正確連結
4. 以在地搜尋詞（「三峽 NEIMS」、「鶯歌 坐骨神經痛」）確認 Google Search Console 收錄狀況

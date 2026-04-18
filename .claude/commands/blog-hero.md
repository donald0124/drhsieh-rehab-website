# Blog Hero Image 製作流程

為缺少 `heroImage` 的 blog 文章，透過 Canva 製作封面圖並更新 YAML frontmatter。

## 步驟一：找出缺少 heroImage 的文章

```bash
grep -rL "heroImage:" src/content/blog/*.md
```

## 步驟二：在 Canva 建立對應頁面

**設計 ID：** `DAG4MDFOamo`（現有模板，風格統一：藍框、白底、診所 logo）

1. 在 Canva UI 手動複製現有頁面（API 不支援新增/複製頁面）
2. 記下各頁面編號與對應 slug

## 步驟三：用 Canva MCP 編輯頁面文字

每張封面有 3 個文字元素，透過 `perform-editing-operations` 批次替換：
- **主標題**（中文）：文章標題的精簡版（30字內）
- **英文副標題**：對應英文關鍵詞
- **底部說明**：固定為「謝明福復健科診所｜三峽・鶯歌」

操作流程：
```
1. start-editing-transaction (design_id: DAG4MDFOamo)
2. perform-editing-operations — replace_text × (頁數 × 3)
3. commit-editing-transaction
```

> **注意：** 每次 session 結束若未 commit，下次需先確認舊 transaction 狀態。

## 步驟四：讓使用者在 Canva 確認並微調

提供 Canva 設計連結，等使用者確認後再繼續。

## 步驟五：匯出所有頁面為 JPG

```
export-design:
  design_id: DAG4MDFOamo
  format:
    type: jpg
    pages: [1, 2, 3, ...]   # 需要的頁碼
    width: 1400
    quality: 90
```

## 步驟六：下載圖片到本地

```bash
# 依頁碼對應 slug 逐一下載
curl -sL "<export_url>" -o public/images/blog/{slug}-hero.jpg
```

**頁碼對應表（現有 14 張）：**

| 頁碼 | 檔名 |
|------|------|
| 1 | hand-numbness-when-sleeping-hero.jpg |
| 2 | knee-pain-osteoarthritis-hero.jpg |
| 3 | neims-elderly-compression-fracture-hero.jpg |
| 4 | neims-first-visit-hero.jpg |
| 5 | neims-for-senior-hero.jpg |
| 6 | neims-myofascial-pain-chinese-western-medicine-hero.jpg |
| 7 | osteoporosis-prevention-bone-density-hero.jpg |
| 8 | plantar-fasciitis-heel-pain-hero.jpg |
| 9 | post-spinal-surgery-myofascial-pain-hero.jpg |
| 10 | stiff-neck-hero.jpg |
| 11 | tennis-elbow-treatment-experience-hero.jpg |
| 12 | trigger-finger-3c-product-injury-hero.jpg |
| 13 | vascular-claudication-diagnosis-case-hero.jpg |
| 14 | stellate-ganglion-irradiation-hero.jpg |

新增文章時，從第 15 頁開始繼續。

## 步驟七：更新 .md 檔的 YAML frontmatter

在 frontmatter 的 `updatedDate`（或 `pubDate`）後面插入：

```yaml
heroImage: /images/blog/{slug}-hero.jpg
```

常見情況：
- `#heroImage: ''` 或 `＃heroImage: ''`（被註解）→ 直接替換整行
- `heroImage: ''`（空值）→ 替換
- 無此欄位 → 在 `updatedDate` 或 `pubDate` 後插入

## 步驟八：驗證

```bash
# 確認所有文章都有 heroImage
grep -rL "heroImage:" src/content/blog/*.md

# 建置確認無錯誤
npm run build
```

## 常見問題

**Q: Canva 看不到修改？**
A: 上次 transaction 可能未 commit。執行 `commit-editing-transaction` 送出。

**Q: export URL 過期？**
A: 重新執行 `export-design` 取得新的 URL（URL 有效期約 1–24 小時）。

**Q: API 不讓新增頁面？**
A: 目前 Canva MCP 不支援複製頁面，需在 Canva UI 手動複製後再用 API 編輯文字。

## Plan: Local Healthcare SEO/GEO 2 週衝刺

目標是在 14 天內最大化可見度與轉換率，優先做對排名與 AI 引用最有影響的項目：在地搜尋意圖頁面、高可信醫療內容、強化內部連結、提升 CTR 與可引用結構。以現有 Astro 架構與內容模型直接落地，不含安全標頭工程。

**Steps**
1. Day 1-2｜基線與策略定錨
1.1 定義核心目標關鍵字群：三峽復健、鶯歌復健、疼痛治療、運動傷害、肌筋膜炎、骨科術後復健、NEIMS。
1.2 建立追蹤 KPI：自然流量、品牌詞點擊、電話點擊、路線導航點擊、首頁與三大重點文章 CTR。
1.3 對齊頁面主題分工：首頁主打在地品牌 + 症狀入口；文章頁承接長尾問題。 

2. Day 3-4｜首頁與列表頁 CTR 放大（高影響）
2.1 優化首頁標題與描述文案，加入在地詞與高意圖詞組合，保留醫師權威訊號。
2.2 優化部落格列表頁標題與描述，明確加入「症狀、治療、就診地區」語彙。
2.3 確保首頁與部落格列表頁都有明確 ogImage 與一致品牌訊號。

3. Day 5-7｜內容集群衝刺（Local + Problem-Solution）
3.1 發佈 4 篇高意圖在地文章（每篇對應一個症狀/治療主題 + 三峽/鶯歌場景）。
3.2 每篇文章採固定模板：症狀辨識、常見誤區、何時就醫、治療流程、院長觀點、Q&A、就診 CTA。
3.3 文章首段與結尾加入可被 AI 摘要引用的精簡結論句（2-3 句）。

4. Day 8-9｜內部連結重構（排名放大器）
4.1 首頁新增到 6-8 篇目標文章的深連結（依症狀群分組）。
4.2 每篇新文章至少連到 2 篇既有相關文與 1 個服務區塊。
4.3 檢查分類與標籤一致性，避免同義詞分裂造成主題權重稀釋。

5. Day 10-11｜GEO 強化（可引用性）
5.1 FAQ 結構擴充到 8-12 題，涵蓋在地患者最常問問題（掛號、療程次數、恢復期、費用區間邏輯）。
5.2 文章頁持續補齊 author、updatedDate、醫療聲明語句，強化可信度。
5.3 將高價值段落改成短句與清單格式，提升 AI 抽取成功率。

6. Day 12-13｜技術驗收與回歸
6.1 跑技術稽核：broken links、duplicate content、social meta、schema、pagespeed。
6.2 修正 404、重複描述、缺圖、過長標題與過短內容。
6.3 抽查首頁、blog 列表、3 篇重點文章在手機版的可讀性與 CTA 可點擊性。

7. Day 14｜成效盤點與下一輪優先序
7.1 彙整本輪 KPI 變化：曝光、點擊、查詢字詞、電話/導航互動。
7.2 挑出前 20% 高潛力內容做二次優化（標題 A/B、首段改寫、內鏈再加權）。
7.3 定義下一輪 14 天主題集群（例如肩頸、腰背、膝痛）。

**Relevant files**
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/pages/index.astro — 首頁 title/description 與主題定位。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/layouts/BaseLayout.astro — 全站 meta、canonical、OG 與 MedicalClinic schema。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/pages/blog/index.astro — 列表頁 SEO 與分類入口。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/pages/blog/[...slug].astro — 文章 schema、breadcrumb、作者與更新時間。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/components/QA.astro — FAQ 實體內容與 FAQPage schema。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/components/HomeBlogSection.astro — 首頁導流至文章頁的核心入口。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/content/config.ts — 內容欄位（author、updatedDate、category、tags）規範。
- c:/Users/Lee/Desktop/士博檔案/drhsieh-rehab-website/src/content/blog/*.md — 既有 36 篇文章，可作為集群內鏈資產。

**Verification**
1. 內容驗收：14 天內至少新增 4 篇在地長尾文，每篇含明確 FAQ 與就診 CTA。
2. 結構驗收：首頁與 blog 列表頁 title/description/ogImage 一致且可預覽正常。
3. 技術驗收：無 404 內鏈、無缺失 og:image、schema 無重大錯誤。
4. 成效驗收：品牌詞與在地詞曝光上升、電話與導航點擊有可觀增幅。

**Decisions**
- 納入：SEO + GEO 可見度與轉換任務，不含安全標頭工程。
- 假設：維持單語（zh-TW），主戰場為三峽與鄰近生活圈。
- 風險：無法保證 2 週內拿到在地市場第 1；可保證的是最大化可執行增長動作與勝率。

**Further Considerations**
1. 是否同步優化 Google 商家檔案（GBP）貼文與問答：建議同步，對 Local Pack 影響顯著。
2. 是否加入每週短影片素材嵌入文章：建議加入，可拉高停留與多媒體引用機率。
3. 是否把 NEIMS 打造成主題樞紐頁：建議優先，利於建立差異化權威。


---------------------


## Plan: SEO/GEO 成果最大化 2 週衝刺（Local Healthcare）

先說結論：  
你現在的程式基底已經夠好，可以直接進入「內容與在地意圖擴張」階段。  
2 週內最有機會拉升的是：在地長尾關鍵字曝光、電話/導航互動、AI 摘要引用率。  
但「保證在地第 1」無法承諾，因為還受競品、Google 商家檔案、評論量與外部連結影響。

### 你目前基底（依最新程式）
1. 全站 meta/canonical/OG 與醫療 schema 已在 BaseLayout.astro。
2. 首頁已有強在地與醫療權威文案，在 index.astro。
3. 部落格列表頁已帶獨立 ogImage，在 index.astro。
4. 文章頁有 Breadcrumb + Article/MedicalWebPage schema，在 [src/pages/blog/[...slug].astro](src/pages/blog/[...slug].astro#L1)。
5. FAQ schema 已存在，可擴充，在 QA.astro。
6. 內容模型有 author、updatedDate、tags、category 欄位，可直接支援 GEO，在 config.ts。
7. 目前已有 36 篇內容資產可做內鏈加權，在 blog。

### 2 週執行清單（每日）

1. Day 1：KPI 定錨與關鍵字地圖
- 建立追蹤表：自然曝光、自然點擊、電話點擊、Google 導航點擊、首頁與 3 篇主力文 CTR。
- 關鍵字群分 3 層：品牌詞、在地治療詞、症狀長尾詞。
- 產出：20 個主戰關鍵字 + 對應目標頁。

2. Day 2：首頁 CTR 改寫
- 微調首頁 title/description（保持醫療可信 + 在地詞）。
- 首頁新增「症狀入口」明確導流（肩頸、腰背、膝痛、手麻）。
- 產出：首頁 snippet 新版 1 套。

3. Day 3：部落格列表頁改寫
- 強化列表頁說明文，加入「三峽/鶯歌 + 症狀 + 治療」語彙。
- 分類詞統一命名，避免主題權重被切散。
- 產出：列表頁 SEO 文案新版 + 分類語彙規範。

4. Day 4：文章模板標準化（GEO）
- 設定每篇固定段落：誰適合看、重點結論、何時就醫、治療方式、FAQ、CTA。
- 每篇第一段與最後一段改成 AI 易抽取的短句。
- 產出：可複製文章模板 1 份（供後續 10 天快速發文）。

5. Day 5：發文 1（高意圖）
- 主題建議：三峽常見肩頸痛何時該看復健科。
- 內鏈到 2 篇舊文 + 首頁就診資訊。
- 產出：新文 1 篇。

6. Day 6：發文 2（高意圖）
- 主題建議：鶯歌腰背痛與坐骨神經痛差異。
- 加入 5 題 FAQ 與就醫時機表格。
- 產出：新文 1 篇。

7. Day 7：發文 3（差異化）
- 主題建議：NEIMS 適用族群與治療流程。
- 連回既有 NEIMS 文章形成主題樞紐。
- 產出：新文 1 篇。

8. Day 8：發文 4（轉換導向）
- 主題建議：骨科術後復健常見錯誤與恢復節奏。
- 文末放清楚掛號流程與門診時段提醒。
- 產出：新文 1 篇。

9. Day 9：首頁內鏈重構
- 在首頁熱門區塊加 6 到 8 個症狀導向深連結。
- 讓首頁流量把權重傳到新文。
- 產出：首頁內鏈結構 v2。

10. Day 10：文章間互鏈強化
- 新舊文互相加鏈：每篇至少 3 條語義相關內鏈。
- 修正錨文字，避免都用「了解更多」。
- 產出：內鏈矩陣表 + 全文更新。

11. Day 11：FAQ 擴充（GEO 重點）
- 將常見問題擴到 8 到 12 題，優先回答病患真實提問。
- FAQ 內容要短句、先答案後補充。
- 產出：FAQ 擴充完成。

12. Day 12：技術回歸檢查
- 檢查壞連結、重複描述、缺圖、標題過長。
- 修正最影響收錄與摘要的錯誤。
- 產出：技術缺失清單歸零或大幅下降。

13. Day 13：手機體驗與轉換檢查
- 手機檢查首頁、列表頁、4 篇新文的可讀性與 CTA 點擊動線。
- 修正按鈕位置、段落過長、字距行高問題。
- 產出：手機版 UX 修正完成。

14. Day 14：成果盤點與下一輪主題
- 比對 Day 1 KPI：曝光、點擊、互動是否上升。
- 選出成效前 20% 文章做二次優化（標題/首段/內鏈）。
- 產出：下一輪 14 天主題清單（建議先做肩頸、腰背、膝痛三群）。

## 驗收標準（2 週）
1. 新增 4 篇在地高意圖文（每篇含 FAQ + CTA）。
2. 首頁與列表頁 CTR 有明顯提升趨勢。
3. 新文被索引，且至少 2 篇開始拿到長尾曝光。
4. 電話與導航點擊出現成長。
5. 內鏈與 schema 無重大錯誤。

## 最關鍵的 3 個勝負點
1. 內容是否真的對準在地患者的就醫決策問題。  
2. 新文是否被首頁與舊文高密度內鏈帶權重。  
3. FAQ 與段落是否足夠精煉，能被 AI 摘要直接引用。  

如果你要，我下一步可以直接給你 Day 5 到 Day 8 的「4 篇文章題目 + H2 大綱 + 每篇 10 個長尾關鍵字」，你就能馬上開寫。
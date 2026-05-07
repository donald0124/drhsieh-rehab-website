---
name: hero-prompt
description: 部落格文章封面圖 Prompt 設計技能。讀取文章 → 分析主題對應解剖部位 → 與使用者討論風格構圖 → 產出最終 JSON prompt → 使用者附上醫師照後呼叫 draw 生圖。觸發詞：「幫這篇文章生成 hero image」「做封面圖」「生成 hero prompt」或指定文章後說「封面」「hero」。
---

# Hero Prompt Skill — 部落格封面圖 Prompt 設計流程

## 觸發情境
- 「幫這篇文章生成封面圖」
- 「做 hero image」「生成 hero prompt」
- 「設計封面」「封面圖 prompt」
- 使用者打開或指定一篇 blog 文章後說「封面」「hero」

---

## 設計風格基準（固定不詢問）

| 項目 | 預設值 |
|------|--------|
| 尺寸 | 1400×788（橫式） |
| 背景 | 暖白 #F7F4EF，細緻紙紋 |
| 主角 | 精確解剖插圖，暖色系醫學教科書風格 |
| 醫師 | 左下去背合成，使用者事後提供照片 |
| 文字 | **圖上不放任何文字**（使用者自行後製加上） |
| Badge | 無 |
| 禁止文字 | 三峽、鶯歌、復健科診所、任何診斷預後保證字眼 |
| 色盤 | `#F7F4EF` `#1A1A1A` `#C8783A` `#8B6B4A` |
| 氣氛 | trustworthy, premium, calm — NOT flashy or neon |

---

## 執行流程（共四步）

---

### STEP 1 — 讀取文章

讀取使用者指定的文章（通常在 `blogdrafts/` 或 `src/content/blog/`）。

重點擷取：
- **主題**：什麼部位、什麼症狀、什麼機制
- **核心主張**：文章想傳遞的一句話
- **目標讀者**：患者自述症狀為何（用於決定解剖插圖角度）

---

### STEP 2 — 確認解剖插圖主角

根據文章主題，決定解剖插圖的內容，例如：

| 文章主題 | 解剖插圖建議 |
|----------|-------------|
| 骶髂關節痛 | 骨盆正面，骶髂關節接觸面橘色 highlight |
| 髕股關節症候群 | 膝關節側面或前面，髕骨追蹤路徑、軟骨接觸面 coral 標示 |
| 頸椎痠痛 | 頸椎側面剖面，椎間盤與神經根 |
| 足底筋膜炎 | 足部內側剖面，跟骨附著點發炎處 |
| 肩關節 | 肩關節前面或後面，旋轉肌群或肩峰下空間 |

列出建議後，**詢問使用者確認或調整視角／部位**，再進入 STEP 3。

---

### STEP 3 — 輸出 JSON Prompt 並討論

輸出初版 JSON prompt，格式如下：

```json
{
  "article": "<文章標題>",
  "style": "clean medical editorial, light airy aesthetic, high-end health magazine cover",
  "size": "1400x788",
  "format": "jpg",
  "background": {
    "base": "warm off-white #F7F4EF",
    "texture": "subtle paper grain, very light",
    "accent": "soft warm beige gradient fading toward left edge"
  },
  "main_subject": {
    "type": "anatomical illustration",
    "content": "<精確解剖部位描述>",
    "style": "premium medical textbook illustration — warm anatomical tones: bone ivory/beige, cartilage soft amber, <患部> highlighted with translucent warm coral-orange glow, fine linework details, no labels or text",
    "position": "right 55% of canvas, vertically centered, slightly oversized, partially cropped at right edge",
    "size": "dominant"
  },
  "doctor": {
    "source": "provided as image input with this prompt",
    "background": "fully removed — clean cutout, no remnants of original background",
    "position": "bottom-left, anchored to left and bottom edge",
    "size": "occupies ~45% canvas height, natural proportion",
    "treatment": "crisp cutout edges, composited onto warm off-white background, subtle ambient shadow at feet for grounding"
  },
  "typography": null,
  "badge": null,
  "color_palette": ["#F7F4EF", "#1A1A1A", "#C8783A", "#8B6B4A"],
  "mood": "trustworthy, premium, calm — NOT flashy or neon",
  "no_text_in_image": true
}
```

提案後，主動確認以下兩點：

1. 解剖插圖視角與 highlight 部位是否正確？
2. 醫師照片是否由使用者另行提供（預設是），還是沿用 `public/images/dr-hsiehmf.jpg`？

> 其餘設計元素（背景、色調、氣氛）以基準值為主，無需詢問，除非使用者主動提出。

---

### STEP 4 — 等待使用者提供醫師照並呼叫 draw

**必須等使用者附上醫師照片後**，才呼叫 draw skill。

照片可能是：
- 直接在對話中上傳圖片（→ 以 `--edit` 傳入 draw）
- 指定檔案路徑（→ 直接使用）

呼叫指令：

```bash
python .claude/skills/draw/draw.py \
  "<將 JSON prompt 轉譯為英文自然語言 prompt>" \
  --size 1536x1024 \
  --quality low \
  --name <article-slug>-hero \
  --outdir public/images/blog \
  --edit <醫師照片路徑>
```

**Prompt 轉譯規則（JSON → 英文自然語言）：**
- 從 `main_subject` 展開解剖描述，強調暖色系、精確解剖細節
- 明確說明醫師照去背後合成左下
- 結尾加：`No text, labels, or typography anywhere in the image. Clean, premium, trustworthy medical editorial style.`

**生成後：**
1. 顯示圖片給使用者
2. 詢問是否調整，或升畫質（`--quality medium`）

---

## 注意事項

- 圖上**絕對不放任何文字**，使用者會自行在設計軟體加上
- 解剖插圖必須醫學上正確，避免錯誤示意
- 醫師去背要乾淨，不可有原背景殘留
- 符合醫療法：不做療效保證、不寫誤診字眼、不承諾預後
- 整個流程對話式進行，STEP 2 確認後再出 JSON，JSON 確認後再等照片

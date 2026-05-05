# Draw Skill Setup（生圖技能設置）

此專案已集成 OpenAI GPT-4 Vision 生圖技能。

## 本地設置（Local）

### 1. 準備 API Key
從 [OpenAI Platform](https://platform.openai.com/account/api-keys) 生成 API key

### 2. 建立 `.env` 文件
在本項目根目錄或 `~/.openai.env` 中設置：
```
OPENAI_API_KEY=sk-your-key-here
```

### 3. 使用技能
在 Claude Code 中輸入「畫一張...」即可觸發技能

---

## Codespace 設置（Codespace）

### 1. 準備 API Key
- 從 [OpenAI Platform](https://platform.openai.com/account/api-keys) 生成 API key
- **切勿上傳至 GitHub**

### 2. 設置方式二選一

#### 方式 A：創建 `.claude/skills/draw/.env`（推薦）
在 Codespace 終端中執行：
```bash
cat > .claude/skills/draw/.env << 'EOF'
OPENAI_API_KEY=sk-your-key-here
EOF
```
此檔案已在 `.gitignore` 中被排除，不會被 commit

#### 方式 B：設置環境變數（替代方案）
在 Codespace 中設置環境變數：
```bash
export OPENAI_API_KEY=sk-your-key-here
```

### 3. 驗證設置
```bash
cd drhsieh-rehab-website
python .claude/skills/draw/draw.py "測試：一隻貓" --name test
```

---

## 使用範例

- **基本生圖**：「畫一張診所的海報」
- **指定尺寸**：「生一張1536x1024的橫向插圖」
- **改圖**：「把這張圖的背景換成藍色」（提供圖片路徑）

詳細文檔見 `SKILL.md`

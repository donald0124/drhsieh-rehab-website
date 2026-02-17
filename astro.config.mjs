import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// 匯入官方 Tailwind 整合套件
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // 填入您在 Cloudflare 購買的 "自訂網域"
  site: 'https://drhsieh-rehab.com',

  // 2. 這行非常重要！在根目錄設定強制斜線
  // 這會確保 Astro 生成的所有內部連結、Canonical Tag 全部自動帶上 /
  // 解決你之前 GSC 報表中「/privacy」跳轉到「/privacy/」的重複問題
  trailingSlash: 'always',

  // 啟用 sitemap 和 tailwind 整合套件
  integrations: [
    sitemap(),
    tailwind() // <--- 確保 tailwind() 在這裡被啟用
  ],

  // 4. 確保輸出格式為資料夾 (例如 /privacy/index.html)，這對 SEO 最友善
  build: {
    format: 'directory'
  },

  // 網站是放在根目錄
  base: '/',
});

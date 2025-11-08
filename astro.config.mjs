import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// 匯入官方 Tailwind 整合套件
import tailwind from "@astrojs/tailwind"; 

// https://astro.build/config
export default defineConfig({
  // 填入您在 Cloudflare 購買的 "自訂網域"
  site: 'https://drhsieh-rehab.com',

  // 啟用 sitemap 和 tailwind 整合套件
  integrations: [
    sitemap(),
    tailwind() // <--- 確保 tailwind() 在這裡被啟用
  ],

  // 網站是放在根目錄
  base: '/',
});
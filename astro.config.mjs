import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; // <--- **需要這一行**

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 填入您在 Cloudflare 購買的 "自訂網域"
  site: 'https://drhsieh-rehab.com',

  // 啟用 sitemap 整合套件
  integrations: [sitemap()],

  // 網站是放在根目錄 (不是 /blog/ 之類的子資料夾)。這是預設值，但寫出來也沒問題。
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});
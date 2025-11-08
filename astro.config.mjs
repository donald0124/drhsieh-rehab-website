import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 填入您在 Cloudflare 購買的 "自訂網域"
  site: 'https://drhsieh-rehab.com',

  // 網站是放在根目錄 (不是 /blog/ 之類的子資料夾)
  base: '/',
});
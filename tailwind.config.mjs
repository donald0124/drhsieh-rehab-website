/** @type {import('tailwindcss').Config} */
export default {
  // (關鍵) 告訴 Tailwind 要掃描哪些檔案
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
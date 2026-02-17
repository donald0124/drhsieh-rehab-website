/** @type {import('tailwindcss').Config} */
export default {
  // (關鍵) 告訴 Tailwind 要掃描哪些檔案
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005a9c', // 專業藍
          dark: '#004070',    // 深藍 (hover)
          light: '#eaf4fbff',   // 淺藍背景
        },
        heading: '#222222',
        text: '#444444',
        border: '#dddddd',
      }
    },
  },
  plugins: [],
}
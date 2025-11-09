// 1. 從 Astro 匯入工具
import { defineCollection, z } from 'astro:content';

// 2. 定義一個 'blog' 集合
const blogCollection = defineCollection({
    type: 'content', // (指定為 "內容"，例如 .md 檔案)
    schema: z.object({
        title: z.string(), // 標題 (必填)
        description: z.string(), // 描述 (必填，用於 SEO)
        pubDate: z.date(), // 發布日期 (必填)
        lastMod: z.date().optional(),
        // 封面圖 (選填)
        heroImage: z.string().optional(), 

        // 標籤 (選填，例如 [媽媽手, 復健])
        tags: z.array(z.string()).optional(), 
    }),
});

// 3. 匯出這個集合 (這是乾淨的版本)
export const collections = {
  'blog': blogCollection,
};
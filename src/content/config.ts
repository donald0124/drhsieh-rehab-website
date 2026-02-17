// 1. 從 Astro 匯入工具
import { defineCollection, z } from 'astro:content';

// 2. 定義一個 'blog' 集合
const blogCollection = defineCollection({
  type: 'content', // (指定為 "內容"，例如 .md 檔案)
  schema: z.object({
    title: z.string(), // 標題 (必填)
    description: z.string(), // 描述 (必填，用於 SEO)
    pubDate: z.date(), // 發布日期 (必填)
    updatedDate: z.date().optional(), // 更新日期 (選填)
    lastMod: z.date().optional(), // (舊欄位，保留相容性)
    heroImage: z.string().optional(),
    // category: z.string(), // 已移除，改用 tags
    tags: z.array(z.string()).optional(),
    author: z.string().optional().default('謝明福 院長'), // 作者
    featured: z.boolean().optional().default(false), // 是否置頂
  }),
});

// 3. 匯出這個集合 (這是乾淨的版本)
export const collections = {
  'blog': blogCollection,
};
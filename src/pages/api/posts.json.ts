import type { APIRoute } from 'astro';

export const prerender = true;
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const sorted = posts
    .sort((a, b) => {
      const dateA = a.data.updatedDate ?? a.data.lastMod ?? a.data.pubDate;
      const dateB = b.data.updatedDate ?? b.data.lastMod ?? b.data.pubDate;
      return dateB.valueOf() - dateA.valueOf();
    })
    .map((post) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate ?? post.data.lastMod ?? null,
      heroImage: post.data.heroImage ?? null,
      category: post.data.category ?? [],
      tags: post.data.tags ?? [],
      author: post.data.author ?? '謝明福 院長',
      featured: post.data.featured ?? false,
      // 增加這個欄位，直接把 Markdown 或內文抓出來
      // 如果怕太長，可以用 .substring(0, 1000) 抓前一千字就好
      fullContent: post.body,
      url: `/blog/${post.slug}/`,
    }));

  return new Response(JSON.stringify(sorted, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};

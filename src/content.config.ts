// News content collection. Every Markdown file in src/content/news/ becomes a
// statically-generated post page at build time (no client-side fetching).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string().optional(),
    author: z.string().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(), // path under /public, e.g. /news/alive.svg
  }),
});

export const collections = { news };

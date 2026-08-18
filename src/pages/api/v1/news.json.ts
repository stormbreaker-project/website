// Newsroom feed for the Android companion app.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../../../config/site';

export const prerender = true;

const SCHEMA_VERSION = 1;

const WORDS_PER_MINUTE = 200;

const readingMinutes = (body: string): number =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));

// URLs are absolute: the app has no site root to resolve them against.
const absolute = (path: string): string => new URL(path, SITE.url).href;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('news')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const feed = {
    schema: SCHEMA_VERSION,
    posts: posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      // Date only; the collection has no time component to report.
      date: post.data.date.toISOString().slice(0, 10),
      tag: post.data.tag ?? null,
      author: post.data.author ?? null,
      summary: post.data.summary ?? null,
      cover: post.data.cover ? absolute(post.data.cover) : null,
      url: absolute(`/news/${post.id}/`),
      reading_minutes: readingMinutes(post.body ?? ''),
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

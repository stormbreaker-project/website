# News posts

Each `.md` file in this folder becomes a card on **/news.html** and a full page at
**/news/article.html?slug=&lt;filename-without-.md&gt;**. No build step — the site
discovers posts via the GitHub Contents API and renders them client-side.

## Add a post

1. Create a file here, e.g. `2026-09-01-my-update.md`.
2. Start it with a front-matter block:

   ```markdown
   ---
   title: Your headline
   date: 2026-09-01
   tag: Release
   author: your-name
   summary: One-line teaser shown on the card.
   ---

   Your **Markdown** body goes here…
   ```

3. Commit & push. It appears automatically (cards cache for ~10 min per visitor).

## Notes

- **Filename = slug** (URL). Use `YYYY-MM-DD-title.md`; keep it `A–Z a–z 0–9 . _ -`.
- Recognized front-matter keys: `title`, `date`, `tag`, `author`, `summary`.
- Posts are first-party; Markdown is **not** sanitized before rendering. If you ever
  accept outside submissions, add DOMPurify in `js/news-article.js` first.
- This `README.md` is ignored by the listing.

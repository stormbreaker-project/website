# Team StormBreaker — website

Source for **https://stormbreaker.squadri.me**, built with [Astro](https://astro.build).
Static, component-based, deployed to GitHub Pages via GitHub Actions.

## Develop

```bash
npm install      # once
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build -> dist/
npm run preview  # serve the production build locally
```

## Structure

```
src/
  config/site.ts        # site metadata, social links, NAV (single source of truth)
  data/kernels.ts       # featured-kernels list for the home page
  content.config.ts     # News collection schema
  content/news/*.md      # ← news posts (see below)
  styles/*.css          # one stylesheet per component (imported where used)
  components/
    Icon.astro          # central SVG icon set
    Header.astro        # the ONE nav (renders NAV, dropdowns, theme toggle)
    Footer.astro
    Dropdown.astro      # reusable hover/click dropdown
    KernelCard.astro · NewsCard.astro
    home/               # home-page sections (Hero, Features, …)
  layouts/Base.astro    # <head>, header, footer, theme init, reveal
  pages/                # routes -> pages
public/
  CNAME                 # custom domain (copied into the build)
  .nojekyll
```

Change a nav item in `src/config/site.ts` and **every page** updates — the header
lives in one component.

## Add a news post

Create a Markdown file in `src/content/news/`, e.g. `2026-09-01-my-update.md`:

```markdown
---
title: Your headline
date: 2026-09-01
tag: Release
author: your-name
summary: One-line teaser shown on the card.
---

Your **Markdown** body here…
```

Commit & push — CI rebuilds and the post appears at
`/news/2026-09-01-my-update/` with a card on `/news/`. Filename = URL slug.
Recognized front-matter: `title`, `date`, `tag`, `author`, `summary`.

## Deploy

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds with
Astro and publishes `dist/` to GitHub Pages. In the repo settings, **Pages →
Build and deployment → Source** must be set to **GitHub Actions**.

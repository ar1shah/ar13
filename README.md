# ar13.dev

Personal site for Ari Shah. Next.js (App Router) + Tailwind CSS, deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | Where |
| --- | --- |
| Homepage | `src/app/page.tsx` |
| Halftone portrait animation | `src/components/HalftonePortrait.tsx` (reads `public/portrait.png`) |
| Hover preview cards | `src/components/PreviewLink.tsx`, card text in `src/lib/site.ts`, screenshots in `public/previews/` |
| Social links | `src/lib/site.ts` |
| Projects | `src/content/projects.ts` (`featured: true` shows on the homepage) |
| Photos | add files to `public/photos/`, then list them in `src/content/photos.ts` |
| Thoughts (posts) | one Markdown file per post in `src/content/thoughts/` |
| Résumé | `public/Ari_Shah_Resume.pdf` |
| Share image | `src/app/opengraph-image.png` |

## Writing a post

Add `src/content/thoughts/my-post.md`:

```md
---
title: "My post"
date: "2026-11-20"
summary: "One line shown on the Thoughts page."
draft: false
---

Post body in Markdown.
```

Posts with `draft: true` only show in `npm run dev`.

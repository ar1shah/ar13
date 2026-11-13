---
title: "How to write a post"
date: "2026-11-13"
summary: "A draft that shows how posts work. It only appears in npm run dev, never on the live site."
draft: true
---

Every `.md` file in `src/content/thoughts` becomes a post. The file name is the URL, so `my-first-post.md` lives at `/thoughts/my-first-post`.

## Front matter

The block at the top of the file sets the title, date (`YYYY-MM-DD`), and the one-line summary shown on the Thoughts page. Set `draft: true` to keep a post off the live site while you work on it.

## What you can use

Regular Markdown works: **bold**, *italics*, [links](https://ar13.dev), lists, quotes, tables and code.

- Lists like this
- And this

> A quote looks like this.

```ts
const hello = "code blocks look like this";
```

Delete this file once your first real post is up.

# Manushresth

Personal website for [Manushresth.in](https://manushresth.in). Built with Next.js, TypeScript, Tailwind CSS, and MDX files on disk.

## Content

Posts live in:

- `content/writings/`
- `content/poems/`
- `content/life/`

Each `.mdx` file uses YAML frontmatter:

```yaml
title: "Title"
date: "2026-09-02"
description: "A short summary."
```

Writings and life posts are rendered as MDX. Poems are shown as preformatted text so line breaks stay intact.

## Routes

- `/` — homepage (Writings, Poems, Life, About)
- `/writings/[slug]`
- `/poems/[slug]`
- `/life/[slug]`

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
npm run lint
```

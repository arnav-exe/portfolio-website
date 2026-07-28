# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Check with Prettier + ESLint
npm run format    # Auto-format with Prettier
```

No test suite is configured in this project.

## Architecture

**Stack:** SvelteKit + Svelte 4, Tailwind CSS, SkeletonUI, GSAP, mdsvex (Markdown in Svelte)

**Routing:** SvelteKit file-based routing under `src/routes/`
- `+page.svelte` — Single-page portfolio (Hero → About → Skills → Projects → Timeline → Contact)
- `blog/` — Blog listing with search/filter/pagination; posts are `.svx` files in `blog/posts/`
- `+layout.svelte` — Root layout: imports global styles, sets up SkeletonUI popup system, fires analytics on navigation

**Components** (`src/lib/components/`):
- `Timeline.svelte` — Two-column education/experience timeline with staggered GSAP animations
- `Cursor.svelte` — Custom SVG cursor using Svelte spring physics, morphs on hover
- `Contact.svelte` — Form submitting to Web3Forms API
- `blog-layout.svelte` — Wrapper for individual blog post styling

**Theme:** Custom SkeletonUI theme defined in `src/minimalist.js`. Colors configured in `tailwind.config.js`. Dark mode is forced on via JS in `src/app.html` (`document.documentElement.classList.add('dark')`). Font: Neue Montreal (preloaded OTF).

**Animations:** GSAP (TextPlugin, ScrollTrigger) drives hero typewriter, scroll-triggered section fades, and project card skew. Timeline cards use staggered `0.2s` delays. Custom cursor uses Svelte `spring` store.

**Blog posts:** `.svx` files (Markdown + Svelte) under `src/routes/blog/posts/`. Loaded via `src/lib/utils/blog.js` using Vite's `import.meta.glob`. Metadata comes from YAML frontmatter; reading time is calculated at ~200 wpm. The blog listing's `+page.js` aggregates a deduped, sorted tag list across all posts' frontmatter for the filter UI — add a new tag to a post's frontmatter and it automatically appears as a filter option.

**Analytics:** Goatcounter (privacy-focused, no cookies) — fires after each SvelteKit navigation in the root layout.

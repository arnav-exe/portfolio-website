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
- `chat/` — AI chatbot page ("Chat" tab): transcript-style conversation streamed
  over SSE from the arnav-ai agent (`src/lib/utils/chat.js` is the hand-rolled
  SSE-over-fetch client; EventSource can't POST). API base defaults to
  `https://chat.arnavjagetia.com`, overridable with `VITE_CHAT_API_BASE` for dev
  (e.g. the agent's tailnet address). The SSE envelope (meta/status/receipt/delta/
  done/error) is defined by the arnav-ai repo — changes must stay in sync.
  Session id lives in `sessionStorage`; conversations are per-tab.
- `+layout.svelte` — Root layout: imports global styles, sets up SkeletonUI popup system, fires analytics on navigation

**Nav:** the Portfolio/Blog/Chat switch is the shared
`src/lib/components/NavSwitch.svelte` (`active={0|1|2}`) — no longer duplicated
inline per page.

**Dev mode:** `DEV_MODE` from `src/lib/utils/env.js` (`VITE_DEV_MODE === 'true'`)
is the single switch for dev-only behaviour. It is set only by the arnav-ai
compose stack's `site-dev` service, which runs this repo's Vite dev server over a
bind-mount of the local checkout, reachable on the tailnet only, pointed at its
own `agent-dev` API. Currently it disables Goatcounter; dev panels/metrics mount
behind the same flag. See `.env.example` for the two variables.

**Components** (`src/lib/components/`):
- `Timeline.svelte` — Two-column education/experience timeline with staggered GSAP animations
- `Cursor.svelte` — Custom SVG cursor using Svelte spring physics, morphs on hover
- `Contact.svelte` — Form submitting to Web3Forms API
- `blog-layout.svelte` — Wrapper for individual blog post styling

**Theme:** Custom SkeletonUI theme defined in `src/minimalist.js`. Colors configured in `tailwind.config.js`. Dark mode is forced on via JS in `src/app.html` (`document.documentElement.classList.add('dark')`). Font: Neue Montreal (preloaded OTF).

**Animations:** GSAP (TextPlugin, ScrollTrigger) drives hero typewriter, scroll-triggered section fades, and project card skew. Timeline cards use staggered `0.2s` delays. Custom cursor uses Svelte `spring` store.

**Blog posts:** `.svx` files (Markdown + Svelte) under `src/routes/blog/posts/`. Loaded via `src/lib/utils/blog.js` using Vite's `import.meta.glob`. Metadata comes from YAML frontmatter; reading time is calculated at ~200 wpm. The blog listing's `+page.js` aggregates a deduped, sorted tag list across all posts' frontmatter for the filter UI — add a new tag to a post's frontmatter and it automatically appears as a filter option.

**Analytics:** Goatcounter (privacy-focused, no cookies) — fires after each SvelteKit navigation in the root layout.

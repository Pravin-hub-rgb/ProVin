# 07 — Meta Frameworks: Next.js, Remix, Astro and the Rest

> Umbrella: Frontend → Meta Frameworks
> Purpose: Full-stack framework on top of React/Vue/Svelte — routing, SSR, API routes
> You know Next.js — this doc gives context on the alternatives

---

## What Is a Meta Framework

Plain React only builds UI — no routing, SSR, or API routes.

Meta framework = React + Routing + SSR + API + Build tools — all in one package.

```
Plain React: UI only
Meta Framework: UI + Server + Routing + Build — complete solution
```

---

## Tools

---

### Next.js
**Tag: 🟢 Industry Standard | Most Popular | You know this**

```
What it is: React's most popular meta framework — built by Vercel
When to use:
  → Almost always in a React project
  → E-commerce, SaaS, blogs, dashboards — everything

Real app example:
  → Notion's marketing site
  → Twitch's web app
  → Razorpay's website
  → Majority of Indian startups

Why popular:
  → SSR + SSG + CSR — all in one
  → API routes — backend in the same project
  → App Router (new) — powerful
  → Deploy on Vercel → Seamless
  → Largest ecosystem

App Router vs Pages Router:
  → Pages Router: Old (/pages/index.jsx)
  → App Router: New (/app/page.jsx) — recommended
  → New projects: Use App Router

In India: Almost default choice for React projects
```

---

### Remix
**Tag: 🟢 Growing | Web Standards | Different Philosophy**

```
What it is: React meta framework — focused on web fundamentals (forms, HTTP)
When to use:
  → Prefer web standards
  → Need progressive enhancement (works even if JS is off)
  → Form-heavy apps
  → Shopify uses it — enterprise credibility

Difference from Next.js:
  → Remix: Relies on the web platform (native form actions, HTTP caching)
  → Next.js: More custom solutions (Server Actions, custom caching)
  → Remix: Better nested layouts (multiple loading states on one page)
  → Next.js: Larger ecosystem

Real app example:
  → Shopify Hydrogen (headless commerce)
  → Remix's own site

In India: Growing — but Next.js dominant
When to consider: Already learned Next.js → explore Remix for a different perspective
```

---

### Astro
**Tag: 🟢 Content Sites | Blogs | Zero JS by default**

```
What it is: Content-first framework — sends HTML, JavaScript only where needed
When to use:
  → Blog, documentation site, marketing site, portfolio
  → Content heavy, low interactivity
  → SEO critical, maximum performance needed

Unique concept — Islands Architecture:
  → Entire page is static HTML
  → Only interactive parts get React/Vue/Svelte "islands" embedded
  → Result: Very fast — minimal JS

Real app example:
  → dev.to type blog
  → Documentation sites (Starlight — Astro's doc template)
  → Company marketing sites
  → Indian developer portfolios

Difference from Next.js:
  → Astro: Content sites, static-first, framework agnostic
  → Next.js: Apps, dynamic data, React-specific

Code feel:
  --- (Astro frontmatter)
  const posts = await fetchPosts()
  ---
  {posts.map(post => <PostCard {post} />)}  <!-- Zero JS unless needed -->

When NOT to use:
  → Complex web app (dashboard, e-commerce with lots of interactions)
  → Next.js better then
```

---

### Nuxt.js
**Tag: 🟢 Vue Ecosystem | Vue's Next.js**

```
What it is: Vue.js's meta framework — like Next.js but for Vue
When to use:
  → Using Vue.js
  → Don't want React

Irrelevant with React — but if you hear the name: "Vue's Next.js" — remember that

Real app example:
  → Vue-based Indian projects (some fintech companies)
  → GitLab's frontend (historically)
```

---

### SvelteKit
**Tag: 🔵 Svelte Ecosystem | Interesting | Niche**

```
What it is: Svelte's meta framework
What is Svelte: React alternative — compile-time framework, no virtual DOM

When to use:
  → Want to learn Svelte
  → Performance-critical apps

Know React/Next.js → SvelteKit has a different mental model
In India: Very niche — mostly experimental projects
```

---

### TanStack Start
**Tag: 🔵 New | Growing | Worth watching**

```
What it is: TanStack's (creators of React Query) meta framework
Status: Beta in 2024 — not production ready yet
Interesting because: TanStack Router + TanStack Query = seamless integration
Watch it — may become relevant in the future
```

---

## Quick Decision

```
React project, almost anything?
  → Next.js

Blog, documentation, marketing site?
  → Astro (static-first, fast)

Vue project?
  → Nuxt.js

Want a different philosophy from Next.js?
  → Remix (worth learning)

Want to explore?
  → SvelteKit (completely different paradigm)
```

---

## India Reality

```
Startups / Product companies:  Next.js (90%+)
Marketing / Blog sites:        Next.js or Astro
Agency work:                   Next.js (familiarity)
Experimental:                  Remix or SvelteKit
```

---

## Next Doc

`08-backend-frameworks.md` — Backend Frameworks — Express, Fastify, Hono, NestJS — which framework Zomato's order service would use, when Express when NestJS.

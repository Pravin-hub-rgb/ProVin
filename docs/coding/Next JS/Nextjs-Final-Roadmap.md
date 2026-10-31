# Next.js (with TypeScript) — Complete Roadmap
### Concept → Mini-Project → Combined Project → ... → Capstone

**Prerequisite:** The React course must be complete (`useState`, `useEffect`, `useMemo`, `useCallback`, `useReducer`, Context/Zustand, custom hooks, forms, TypeScript patterns, a11y/testing basics — all should be solid; they won't be re-taught here, only *used*).

**Same core philosophy as the React course:**
1. First understand internals (how it works), not just usage.
2. Every new concept gets its own small isolated mini-project.
3. Combined Project after each batch.
4. The **"Manual → Better" principle** continues here too: first the traditional/manual way, then Next.js's better built-in solution.
5. TypeScript, security, and production-practices throughout.

---

# 📋 Notes Creation Workflow (Every Batch Follows This)

This roadmap is just the plan — the actual notes are created following this workflow. In a new chat, anyone reading this roadmap builds a module/batch **exactly this way**:

1. **One module/batch at a time** — Module 0, then Batch 1, then Batch 2... never write multiple at once. The next one starts only after the previous module/batch is complete + reviewed.
2. **Style sources (always all three together):**
   - `prompts/Master Teaching Prompt.md` — structure (Cheat Sheet, THINK→CONCEPT→CODE→TEST, Nutshell, Common Mistakes, Try It Yourself)
   - `prompts/Dost-to-Dost Style.md` — tone (friendly, like a friend, vulnerability, cause-effect chain)
   - `AGENTS.md` + `docs/coding/AGENTIC-AI-WRITING-RULES.md` — course writing rules
3. **Every note file contains:** open with a relatable thing → connect to the previous file → THINK/CONCEPT/CODE/TEST → Nutshell (for new concepts) → Common Mistakes → "In Your Own Words" (3-5 Q, sample answer in `<details>`) → "What It Is NOT" → next-file bridge at the end.
4. **React comparisons always generic:** "remember `useParams` in React Router" — never name a specific React course project (like Blog Platform or TrackIt). Only the generic concept should be recalled.
5. **Notes-only by default** — quiz files can be added separately later.
6. **Every batch has its own distinct combined project** — see the summary table below. The v1→v2 upgrade is allowed only once (the Portfolio/Blog spine in Batch 1-2); after that every batch has a fresh project, no project repeats.
7. **Register in the app when a batch completes:** append a new phase in `lib/subjects/nextjs.subject.ts` + ensure the subject in the `subjects` array of `lib/coding-data.ts` (the roadmap lecture always stays first).
8. **Follow the roadmap order strictly** — within each batch: Manual → Better (first feel the old way, then Next.js's better solution).

### Combined Projects Summary — each batch has its own project (no repeats)

| Batch | Combined Project |
|---|---|
| 1 | **Portfolio/Blog Site** |
| 2 | **Portfolio/Blog Site v2** (spine — upgrade only here) |
| 3 | **Reviews & Ratings App** |
| 4 | **Proxy Playground** (deep-dive demo app — no combined project, increments with the series) |
| 5 | **Member Dashboard / "My Account" App** |
| 6 | **Task Board App (Real DB)** |
| 7 | **Photo Gallery / Media Showcase** |
| 8 | *(no new one — security audit + deploy)* |
| Capstone | **Hiring Platform** (production-grade) — `Final Capstone - Hiring Platform/` folder, 13 files (C.0–C.12): AI JD generator + match scoring (Gemini), Stripe featured listings, resume uploads (Vercel Blob), role-based auth, rate limiting, Vercel deploy |

---

# MODULE 0 — "How Next.js Works" (No project, pure understanding)

This is the most important module because it introduces the genuinely new mental model that didn't exist in React.

- **SSR vs SSG vs CSR** — the difference between the three rendering strategies, and how Next.js lets you mix them in a single app
- **React Server Components (RSC) vs Client Components** — the biggest mindset-shift: by default every component now renders on the server; when and why to add `use client`
- **Hydration** — how server-rendered HTML becomes interactive in the browser
- **Next.js's Fetch Caching Model** — Next.js caches `fetch()` requests itself by default (this didn't exist in React) — the biggest source of confusion for beginners, so we'll explain it explicitly
- **Incremental Static Regeneration (ISR)** — refreshing a static page periodically without a full rebuild
- **App Router's File-based Routing model** — folders *are* routes, `page.tsx`, `layout.tsx` conventions

**Setup:** `create-next-app` (TypeScript + App Router + Tailwind), understanding the project structure (`app/`, `public/`, config files).

**React Essentials refresher:** 0.0.5 (hooks, refs, child-to-parent, re-renders, memo/useMemo/useCallback, HOC, render props, portals), 0.0.8 (React Compiler for automatic optimization).

*(No project in this module — just the foundation. This module's reference will come back in every relevant lesson ahead.)*

---

# BATCH 1 — Routing Fundamentals (compared to React Router)

| # | Concept | Compare-to (React) | Mini-Project |
|---|---|---|---|
| A | File-based Routing basics (`page.tsx`, folders = routes) | React Router's `<Route>` config | **Simple Multi-page Site** — Home/About/Contact, three static pages |
| B | Nested Layouts (`layout.tsx`) — state doesn't reset on route change | In React you had to manually wrap a shared layout | (add a shared Navbar/Footer layout to the same project) |
| C | Dynamic Routes (`[id]` folder syntax) + `params` | React Router's `:id` + `useParams` | **Blog Post Pages** — `/blog/[slug]` dynamic route, from dummy data |
| D | `loading.tsx` + `error.tsx` + `not-found.tsx` conventions | Manual Suspense/ErrorBoundary/404 route in React | (add these three files to the blog project and watch them work automatically) |
| E | `searchParams` + `template.tsx` — URL query params + state reset on navigation | React Router's `useSearchParams` / component remount patterns | **1.6 extension** — query filters + template vs layout comparison |

### 🔗 Combined Project #1 — **Portfolio/Blog Site**
File-routing, nested layouts, dynamic slug-based blog pages, and loading/error/404 states — all in one small real site.

---

# BATCH 2 — Rendering & Data Fetching

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| E | Direct `await fetch()` inside Server Components (no `useEffect` needed) | typed response `interface` | **Product Listing Page** — data fetched on the server, no loading spinner needed (because data is ready by page load) |
| F | Client Components — when you need them (`useState`, `onClick`, browser APIs) | `use client` directive | (an "Add to favorites" button in the product listing — client-side interactivity) |
| G | Static (SSG) vs Dynamic rendering + `revalidate` option | Try ISR practically | (make the product listing static, then set a revalidate interval) |
| H | Caching — `use cache`, `cacheTag`, `cacheLife`, `revalidateTag` — data layer caching across users | React's `cache()` + manual revalidation | **2.6 extension** — tag-based invalidation, TTL expiration, cache vs ISR layer differences |
| I | Metadata API (`generateMetadata`) — SEO | — | (add proper meta tags to both blog + product projects) |

### 🔗 Combined Project #2 — **Portfolio/Blog Site v2**
Blog posts are now fetched via Server Components (real API/CMS-like dummy data), some interactive widgets are Client Components, SEO metadata is proper.

---

# BATCH 3 — Mutations: REST API + Server Actions

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| I | **Route Handlers** (`route.ts`) — building a REST API. This is **fundamental** — every web developer must know it. Third-party APIs, mobile apps, microservices — all use REST. | typed request/response | **Comment System v1** — build `/api/comments` route handler, add a comment from the client via `fetch(POST)` |
| J | **HTTP Methods** — GET vs POST vs PUT vs DELETE. Understand REST — use REST when you need to share an API or have an external client. | HTTP semantics | (use GET, POST, DELETE in the comment system) |
| K | **Server Actions + Refactor series (3.3.x)** — Next.js's **shortcut** for forms. Works only in Next.js. The form calls the server function directly, no API layer. Integrated inside this series: `useFormStatus`/`useFormState` (pending/success/error feedback), revalidation (`revalidatePath`, `revalidateTag`), and the **Route Handler vs Server Actions — When to Use Which** comparison. | typed action function, `'use server'` directive, form hooks | **Comment System v2** — same feature now via Server Action + feedback hooks in 3.3.1 + revalidation concept — way less boilerplate |

**3.3.6 — `useFormStatus` + `next/form`:** Form status without prop drilling, progressive enhancement for Server Action forms.

**3.3.7 — `useOptimistic`:** Instant UI updates while the server action runs, automatic reconciliation on failure.

### 🔗 Combined Project #3 — **Reviews & Ratings App** (Batch 3's finale — `3.4.1` Planning, `3.4.2` v1 Route Handler, `3.4.3` v2 Server Actions)
Reviews feature on every item (product/school/film) — first via Route Handler (v1, REST-style), then via Server Actions (v2), pending + error states with `useFormStatus`/`useFormState`, and auto-refresh with `revalidatePath`/`revalidateTag`. **Learn both approaches — when to use which.** The blog spine ends here — new project.

---

# BATCH 4 — Proxy (Middleware) Deep Dive

A full course on proxy — the request interception layer, `proxy.ts` (Next 16: middleware's successor, **Node.js runtime by default** — not Edge). 17 files: Foundation (what proxy is, setup, matcher) → Reading the request (URL/headers/cookies) → Creating the response (NextResponse: next/redirect/rewrite, adding headers) → Real scenarios (logging, protected routes demo, rate limiting, geo blocking) → Edge Runtime (concept + Next 16 change, revised limitations, golden rules, official stance + decision table).

| # | Concept | Approach | Mini-Project |
|---|---|---|---|
| Q | What proxy is + request lifecycle, `proxy.ts` setup, matcher (single/array/`:path*`/negative regex) | `proxy.ts` + `config.matcher` | (setup + verify on the demo app) |
| R | Reading the request: URL (`pathname`/`searchParams`), headers (device/IP), cookies (session check) | `request.nextUrl` / `request.headers.get` / `request.cookies` | (login-check pattern in log version) |
| S | Creating the response: `NextResponse` — `next()` vs `redirect()` vs `rewrite()`, setting headers/cookies | `NextResponse.*` | (redirect protected list + loop analysis; rewrite A/B + maintenance) |
| T | Real scenarios: logging, protected routes (**as a demo** — why not: CVE-2025-29927 + spoofable cookie), rate limiting (429, window, Redis limit), geo blocking (`x-vercel-ip-country`) | module-level store / Vercel header | (Proxy Playground — incremental demo app alongside the series, no login) |
| U | Edge Runtime: concept + **Next 16 = Node.js default** (fs verified, `runtime` export removed), revised limitations + golden rule, **when to use** (official stance "avoid relying on Middleware" + decision table) | — | (why not: auth in proxy — layout/components instead) |

**Proxy = request-level infra layer** (routing, rate limit, geo, logging) — not security/auth (CVE-2025-29927). Series 4.1–4.17, in `docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/`.

---

# BATCH 5 — Authentication & Protected Access

| # | Concept | Approach | Mini-Project |
|---|---|---|---|
| M | **Manual**: understand session/cookie handling yourself (conceptual + small hands-on) | typed session shape | **Login Demo v1** — very basic, set/read a cookie-based session yourself (only to understand, not for production) |
| N | **Better**: Auth.js (NextAuth) or similar library | typed session/user | **Login Demo v2** — same feature, with a proper auth library (OAuth provider or credentials) |
| O | Protection layer — `auth()` + redirect in the layout (main security), `proxy.ts` (Next 16's middleware successor) only for routing. Why not middleware-proxy-only: CVE-2025-29927 bypass. The **full proxy deep-dive is in Batch 4** (matcher, NextResponse, rate limiting, geo, edge) | layout-level `auth()` check | (build a protected `/dashboard` route that redirects without login) |
| P | Real Protected Routes (in the React course this was "dummy" — now genuinely real) | — | (in the Member Dashboard: dashboard + profile protected route group `(protected)` inside) |
| Q | **Clerk Auth** — industry-standard managed auth (alternative to Auth.js) | `@clerk/nextjs`, `ClerkProvider`, `currentUser()`, `useAuth()` | **5.6 extension (4 files)** — 5.6: What is Clerk + vs Auth.js → 5.6.1: Install + Keys + Provider → 5.6.2: Sign-in UI + Protected routes → 5.6.3: Summary — when to choose |

### 🔗 Combined Project #5 — **Member Dashboard / "My Account" App**
Users log in (Auth.js + GitHub OAuth), view their dashboard/profile (protected routes — `auth()` + redirect inside the route group `(protected)`'s layout; `proxy.ts` only routes logged-in users from `/login` to `/dashboard`, security isn't in it). Login Demo v1 (manual session/cookie) and v2 (Auth.js) combine here into a real project. **Fresh project — not the blog.**

---

# BATCH 6 — Database Integration

Batch 6 is now a **deep database course** (MongoDB + PostgreSQL both hands-on), not just CRUD — API design, Postman testing, and system design too. Two mini-projects teach two different data-flow patterns:

- **MongoDB mini-project** → **REST (Route Handlers) + client fetch** — API Design + Postman testing live here (REST + Postman are a natural pair)
- **SQL (Neon + Drizzle) mini-project** → **Server Components + Server Actions** — system design lives here (relations, indexes)

The Task Board (combined project) runs on the **production pattern** — Server Components reads + Server Actions mutations, Prisma + Neon.

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| Q1 | What a database is + SQL vs NoSQL + ORM/Providers — **pure fundamentals** (starting from Batch 5's `profiles.json` pain) | — | (no DB — just the concept) |
| Q2 | **MongoDB + Mongoose** — Atlas setup, schema/model, then **REST CRUD via Route Handlers** | Mongoose model + Route Handler | **Mongo Todo API** — GET/POST/DELETE in `route.ts`, client fetch |
| Q3 | **API Design + Postman testing** — resource naming, status codes, error shape, testing with a REST client | REST design + testing | (on the Mongo Todo API itself — all cases via Postman) |
| R | **PostgreSQL + Drizzle** — Neon setup, typed schema, **Server Components query directly (no API layer)** | typed Drizzle schema | **SQL Todo** — list straight from the DB in a Server Component |
| S | **Server Actions + Database mutations** + **system design** (relations, indexes) | typed action + Drizzle call | (SQL Todo's add/edit/delete persisted via SA) |
| T | **Combined Project — Task Board (Prisma + Neon)** — production pattern: SC reads + SA mutations | Prisma models + actions | **Task Board App** — real database-backed CRUD (replacing dummy data) |

### 🔗 Combined Project #6 — **Task Board App (Real Database)**
The Task Board is built on **Prisma + Neon** — real CRUD, list comes straight from the DB in a Server Component (no API layer), add/edit/delete persisted via Server Actions. No dummy data left. **Fresh project — not the blog.** The production-grade result of Batch 6's whole journey: JSON file → MongoDB (REST) → SQL (Server Actions) → Prisma Task Board.

---

# BATCH 7 — Optimization & Production Concerns

Every concept is written as a **"Manual → Better"** pair — the manual approach's problem first (7.1/7.3), then the Next.js solution (7.2/7.4):

| # | Concept | Layer | File |
|---|---|---|---|
| T | Problems with manual `<img>` (no optimization, CLS, srcset, lazy limits) | — | 7.1 |
| T | `next/image` — automatic optimization, srcset, `fill`, `remotePatterns` | — | 7.2 |
| U | Manual Google Fonts (FOUC, CLS, network dependency) | — | 7.3 |
| U | `next/font` — self-hosted, no layout shift (`adjustFontFallback`) | — | 7.4 |
| W | Streaming with Suspense — progressive section loading (`<Suspense>` vs `loading.tsx`) | — | 7.5 |
| V | Parallel Routes + Intercepting Routes — modal-in-route pattern (light) | — | 7.6 |

### 🔗 Combined Project #7 — **Photo Gallery / Media Showcase**
Optimized images with `next/image` (before/after size compare), `next/font` project-wide, an Instagram-style photo modal via parallel + intercepting routes, and progressive loading of the gallery grid with Streaming + Suspense. Prisma + Neon reused (Batch 6). Read-only showcase (no mutations). Files: `7.7.1 Planning → 7.7.2 Hardcoded UI → 7.7.3 Data Layer + Read + SEO → 7.7.4 next/image + next/font → 7.7.5 Photo Modal (parallel + intercepting) → 7.7.6 Streaming + States + Testing + Summary`.

---

# BATCH 8 — Security & Deployment

| # | Concept | Layer | File |
|---|---|---|---|
| X | Env Vars Security — server-only vs `NEXT_PUBLIC_` vars | — | 8.1 |
| X | Input + CSRF (awareness) — Server Actions built-in protection | — | 8.2 |
| Y | Error Boundaries at Scale — `global-error.tsx` + hierarchy | — | 8.3 |
| Z | Deployment on Vercel + env config | — | 8.4 |
| Z1 | MCP (Model Context Protocol) + `next-browser` — a dev tool that lets your AI assistant read your real codebase | `@cloud/mcp`, `@next/mcp-tool`, `.mcp.json` | **8.6 extension (4 files)** — 8.6: What is MCP? → 8.6.1: Setup → 8.6.2: `get routes` tools → 8.6.3: `next-browser` + adapters → 8.6.4: Summary |

### 🔗 Combined Project #8 — **Security Audit + Deploy (Photo Gallery)**
No new project — Batch 7's Photo Gallery gets audited + deployed. **8.5.1** Planning (audit checklist) → **8.5.2** Audit — Env + Config (`.env`, `.gitignore`, `remotePatterns`, build) → **8.5.3** Audit — Error Boundaries (`global-error.tsx`, hierarchy) → **8.5.4** Deploy — Vercel (live URL). Read-only showcase, no mutations. **8.6** MCP (8.6–8.6.4) — connect your AI assistant to your live codebase, use `get routes` to auto-inspect your app, and edit with full context. All files in `Batch 8 - Security & Deployment/`.

---

# BATCH 9 — State Management at Scale

## When you need this batch

You've built 8 batches of projects. Your app now has many components sharing the same state (user, UI preferences, selections across screens). Context API re-renders **every** consumer on **every** change. At scale — 30+ components — that cascade becomes a performance problem.

This batch teaches Redux Toolkit: the industry standard for large-scale client-side state.

| # | Concept | When It Matters |
|---|---|---|
| 9.0 | Redux — Why you need it, Manual → Better comparison | When Context re-renders everyone, every time |
| 9.1 | Store + Slice + Provider | Set up Redux Toolkit from scratch |
| 9.2 | Selectors + Typed Hooks | Only the components that read the changed slice re-render |
| 9.3 | Mini-Project: Dashboard Todo App | Full working app — add/delete/toggle wired through the store |
| 9.4 | Next.js Integration | Server Components boundary, hydration, Client Component patterns |
| 9.5 | Summary + What It Is NOT | When to reach for Redux vs Context — and when to skip both |

**Combined Project:** Dashboard Todo App — a task-tracking feature (add, delete, toggle, filter) where every interaction routes through the Redux store. Multiple components read the same state without prop drilling.

---

# 🏁 FINAL CAPSTONE — Real Backend Project

Your earlier question comes back here — choosing the capstone domain:
1. **DukaanOS-adjacent** (small Inventory/Order Dashboard) — leverages your existing Prisma/Supabase knowledge directly
2. **New domain** (Blog Platform / Job Board) — a fresh real-world case outside the kirana context

Whichever you choose, it includes (production-grade, latest approaches):
- Server Components + Client Components properly split
- Server Actions (not manual API+fetch) for mutations
- Auth.js real authentication + Protected routes (layout-level `auth()` — proxy/middleware only for routing, no security there because of CVE-2025-29927)
- Prisma/Supabase database
- Redux Toolkit (Batch 9) — state management at scale when Context isn't enough
- SEO metadata, `next/image`, `next/font`
- Streaming + Suspense where useful
- Security-audited, deployed on Vercel
- MCP-ready (8.6) — your AI assistant can read your codebase for future debugging

---

## "Manual → Better" pairs — Next.js summary

| Learn first (fundamental) | Then the Next.js shortcut |
|---|---|
| Route Handlers + client `fetch()` (REST — universal) | Server Actions (Next.js specific — for forms) |
| Manual session/cookie code | Auth.js (NextAuth) |
| Manual `<img>` tags | `next/image` |
| Manual refetch after mutation | `revalidatePath`/`revalidateTag` |
| `useEffect`-style data fetching (from React course) | Server Component `await fetch()` directly |
| Context API prop drilling + cascade re-renders | Redux Toolkit — selectors, single store, DevTools time-travel |

This pattern is the same as the React course — first feel the problem, then understand the solution, so the "why" is genuinely clear, not just the "how".

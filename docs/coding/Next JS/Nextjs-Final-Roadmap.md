# Next.js (with TypeScript) — Complete Roadmap
### Concept → Mini-Project → Combined Project → ... → Capstone

**Prerequisite:** React course complete honi chahiye (`useState`, `useEffect`, `useMemo`, `useCallback`, `useReducer`, Context/Zustand, custom hooks, forms, TypeScript patterns, a11y/testing basics — sab already pakka hai, yahan dobara nahi sikhaya jayega, sirf *use* honge).

**Same core philosophy jo React course mein tha:**
1. Pehle internals samjho (kaise kaam karta hai), sirf usage nahi.
2. Har naye concept ka apna chhota isolated mini-project.
3. Batch ke baad Combined Project.
4. **"Manual → Better" principle** yahan bhi continue: pehle traditional/manual tareeka, phir Next.js ka better built-in solution.
5. TypeScript, security, aur production-practices throughout.

---

# 📋 Notes Banane Ka Workflow (Har Batch Isi Tarah Banega)

Yeh roadmap sirf plan hai — asli notes isi workflow se banti hain. Naye chat mein is roadmap ko padhke koi bhi module/batch banane ka kaam **bilkul isi tarah** karna:

1. **Ek module/batch at a time** — Module 0, phir Batch 1, phir Batch 2... kuch bhi ek saath nahi likhna. Har module/batch complete + reviewed hone ke baad hi agla.
2. **Style sources (teeno hamesha saath):**
   - `prompts/Master Teaching Prompt.md` — structure (Cheat Sheet, SOCH→CONCEPT→CODE→TEST, Nutshell, Common Mistakes, Khud Try Karo)
   - `prompts/Dost-to-Dost Style.md` — tone (Hinglish, dost jaisa, vulnerability, cause-effect chain)
   - `AGENTS.md` + `docs/coding/AGENTIC-AI-WRITING-RULES.md` — course writing rules
3. **Har note file mein:** relatable cheez se open → pichli file se connect → SOCH/CONCEPT/CODE/TEST → Nutshell (naye concepts ke liye) → Common Mistakes → "In Your Own Words" (3-5 Q, `<details>` mein sample jawab) → "What It Is NOT" → end mein next-file bridge.
4. **React comparisons hamesha generic:** "yaad hai React Router mein `useParams` tha" — kabhi kisi specific React course project ka naam nahi (jaise Blog Platform ya TrackIt). Generic concept hi yaad dilana hai.
5. **Notes-only by default** — quiz files alag se baad mein add ki ja sakti hain.
6. **Har batch ka apna distinct combined project** — niche summary table. v1→v2 upgrade sirf ek baar allowed hai (Batch 1-2 ka Portfolio/Blog spine); uske baad har batch ka fresh project, koi project repeat nahi.
7. **Batch complete hone pe app mein register:** `lib/subjects/nextjs.subject.ts` mein naya phase append + `lib/coding-data.ts` ke `subjects` array mein subject ensure (roadmap lecture hamesha pehla rehta hai).
8. **Roadmap order strictly follow** — har batch ke andar Manual → Better (pehle purana tareeka feel karo, phir Next.js ka better solution).

### Combined Projects Summary — har batch ka apna project (repeat nahi)

| Batch | Combined Project |
|---|---|
| 1 | **Portfolio/Blog Site** |
| 2 | **Portfolio/Blog Site v2** (spine — sirf yahin upgrade) |
| 3 | **Reviews & Ratings App** |
| 4 | **Proxy Playground** (deep-dive demo app — no combined project, series ke saath incrementally) |
| 5 | **Member Dashboard / "My Account" App** |
| 6 | **Task Board App (Real DB)** |
| 7 | **Photo Gallery / Media Showcase** |
| 8 | *(koi naya nahi — security audit + deploy)* |
| Capstone | **Inventory/Order Dashboard ya Blog/Job Board** (production-grade) |

---

# MODULE 0 — "Next.js Kaise Kaam Karta Hai" (No project, pure understanding)

Ye sabse zaroori module hai kyunki yahi genuinely naya mental model hai jo React mein nahi tha.

- **SSR vs SSG vs CSR** — teeno rendering strategies mein fark, aur Next.js inko kaise mix karne deta hai ek hi app mein
- **React Server Components (RSC) vs Client Components** — sabse bada mindset-shift: by default har component ab server pe render hota hai; `use client` kab aur kyun lagana hai
- **Hydration** — server-rendered HTML browser mein interactive kaise banta hai
- **Next.js ka Fetch Caching Model** — `fetch()` requests Next.js khud cache karta hai by default (ye React mein nahi tha) — beginners ke liye sabse bada confusion-source, isliye explicitly samjhayenge
- **Incremental Static Regeneration (ISR)** — static page ko poora rebuild kiye bina periodically refresh karna
- **App Router ka File-based Routing model** — folders hi routes hain, `page.tsx`, `layout.tsx` conventions

**Setup:** `create-next-app` (TypeScript + App Router + Tailwind), project structure samajhna (`app/`, `public/`, config files).

*(Koi project nahi is module mein — sirf foundation. Isi module ka reference aage har relevant lesson mein wapas aayega.)*

---

# BATCH 1 — Routing Fundamentals (React Router se compare karke)

| # | Concept | Compare-to (React) | Mini-Project |
|---|---|---|---|
| A | File-based Routing basics (`page.tsx`, folders = routes) | React Router ka `<Route>` config | **Simple Multi-page Site** — Home/About/Contact, teen static pages |
| B | Nested Layouts (`layout.tsx`) — route change pe reset nahi hota | React mein manually shared layout wrap karna padta tha | (isi project mein ek shared Navbar/Footer layout add karo) |
| C | Dynamic Routes (`[id]` folder syntax) + `params` | React Router ka `:id` + `useParams` | **Blog Post Pages** — `/blog/[slug]` dynamic route, dummy data se |
| D | `loading.tsx` + `error.tsx` + `not-found.tsx` conventions | React mein manual Suspense/ErrorBoundary/404 route | (blog project mein hi in teeno files ko add karo, dekho automatically kaise kaam karte hain) |

### 🔗 Combined Project #1 — **Portfolio/Blog Site**
File-routing, nested layouts, dynamic slug-based blog pages, aur loading/error/404 states — sab ek chhote real site mein.

---

# BATCH 2 — Rendering & Data Fetching

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| E | Server Components mein direct `await fetch()` (no `useEffect` needed) | typed response `interface` | **Product Listing Page** — server pe hi data fetch, koi loading spinner ki zaroorat nahi (kyunki page load tak data ready hai) |
| F | Client Components — kab zaroorat padti hai (`useState`, `onClick`, browser APIs) | `use client` directive | (product listing mein ek "Add to favorites" button — client-side interactivity ke liye) |
| G | Static (SSG) vs Dynamic rendering + `revalidate` option | ISR practically try karke dekhna | (product listing ko static banao, phir ek revalidate interval set karo) |
| H | Metadata API (`generateMetadata`) — SEO | — | (blog + product project dono mein proper meta tags add karo) |

### 🔗 Combined Project #2 — **Portfolio/Blog Site v2**
Blog posts ab Server Components se fetch hote hain (real API/CMS-jaisa dummy data), kuch interactive widgets Client Components hain, SEO metadata proper hai.

---

# BATCH 3 — Mutations: REST API + Server Actions

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| I | **Route Handlers** (`route.ts`) — REST API banana. Ye **fundamental** hai — har web developer ko aana chahiye. Third-party APIs, mobile apps, microservices — sab REST use karte hain. | typed request/response | **Comment System v1** — `/api/comments` route handler banake, client se `fetch(POST)` karke comment add karna |
| J | **HTTP Methods** — GET vs POST vs PUT vs DELETE. REST samjho — jab API share karni ho, ya external client ho, toh REST use karo. | HTTP semantics | (comment system mein GET, POST, DELETE — teeno methods use karo) |
| K | **Server Actions + Refactor series (3.3.x)** — Next.js ka **shortcut** forms ke liye. Sirf Next.js mein kaam aata hai. Form seedha server function ko call kare, koi API layer nahi. Is series ke andar hi integrate hain: `useFormStatus`/`useFormState` (pending/success/error feedback), revalidation (`revalidatePath`, `revalidateTag`), aur **Route Handler vs Server Actions — Kab Kya** comparison. | typed action function, `'use server'` directive, form hooks | **Comment System v2** — same feature ab Server Action se + 3.3.1 mein feedback hooks + revalidation concept — kitna kam boilerplate |

### 🔗 Combined Project #3 — **Reviews & Ratings App** (Batch 3 ka final — `3.4.1` Planning, `3.4.2` v1 Route Handler, `3.4.3` v2 Server Actions)
Har item (product/school/film) pe reviews feature — pehle Route Handler (v1, REST-style) se, phir Server Actions (v2) se, `useFormStatus`/`useFormState` se pending + error states, aur `revalidatePath`/`revalidateTag` se auto-refresh. **Dono approaches seekho — kab kya use karna hai.** Blog spine yahin khatam — naya project.

---

# BATCH 4 — Proxy (Middleware) Deep Dive

Proxy ka poora course — request interception layer, `proxy.ts` (Next 16: middleware ka successor, **Node.js runtime default** — Edge nahi). 17 files: Foundation (proxy kya hai, setup, matcher) → Request padhna (URL/headers/cookies) → Response banana (NextResponse: next/redirect/rewrite, headers add) → Real scenarios (logging, protected routes demo, rate limiting, geo blocking) → Edge Runtime (concept + Next 16 change, limitations revised, golden rules, official stance + decision table).

| # | Concept | Approach | Mini-Project |
|---|---|---|---|
| Q | Proxy kya hai + request lifecycle, `proxy.ts` setup, matcher (single/array/`:path*`/negative regex) | `proxy.ts` + `config.matcher` | (demo app pe setup + verify) |
| R | Request padhna: URL (`pathname`/`searchParams`), headers (device/IP), cookies (session check) | `request.nextUrl` / `request.headers.get` / `request.cookies` | (login-check pattern log version) |
| S | Response banana: `NextResponse` — `next()` vs `redirect()` vs `rewrite()`, headers/cookies set | `NextResponse.*` | (redirect protected list + loop analysis; rewrite A/B + maintenance) |
| T | Real scenarios: logging, protected routes (**demo as demo** — why-not: CVE-2025-29927 + spoofable cookie), rate limiting (429, window, Redis limit), geo blocking (`x-vercel-ip-country`) | module-level store / Vercel header | (Proxy Playground — series ke saath incremental demo app, login-less) |
| U | Edge Runtime: concept + **Next 16 = Node.js default** (fs verified, `runtime` export removed), limitations revised + golden rule, **kab use karein** (official stance "avoid relying on Middleware" + decision table) | — | (kyun-not: auth proxy mein nahi — layout/components) |

**Proxy = request-level infra layer** (routing, rate limit, geo, logging) — security/auth nahi (CVE-2025-29927). Series 4.1–4.17, `docs/coding/Next JS/Batch 4 - Proxy (Middleware) Deep Dive/`.

---

# BATCH 5 — Authentication & Protected Access

| # | Concept | Approach | Mini-Project |
|---|---|---|---|
| M | **Manual**: Session/cookie handling khud samajhna (conceptual + chhota hands-on) | typed session shape | **Login Demo v1** — bahut basic, cookie-based session khud set/read karke (sirf samajhne ke liye, production mein use nahi karenge) |
| N | **Better**: Auth.js (NextAuth) ya similar library | typed session/user | **Login Demo v2** — same feature, proper auth library se (OAuth provider ya credentials) |
| O | Protection layer — layout mein `auth()` + redirect (main security), `proxy.ts` (Next 16 ka middleware successor) sirf routing ke liye. Kyun nahi middleware-proxy-only: CVE-2025-29927 bypass. Proxy ka **full deep-dive Batch 4 mein** (matcher, NextResponse, rate limiting, geo, edge) | layout-level `auth()` check | (protected `/dashboard` route banao jo bina login redirect kare) |
| P | Real Protected Routes (React course mein ye "dummy" tha — ab genuinely real hai) | — | (Member Dashboard mein hi: dashboard + profile protected route group `(protected)` ke andar) |

### 🔗 Combined Project #5 — **Member Dashboard / "My Account" App**
Users login karte hain (Auth.js + GitHub OAuth), apna dashboard/profile dekhte hain (protected routes — route group `(protected)` ke layout mein `auth()` + redirect; `proxy.ts` sirf logged-in users ko `/login` se `/dashboard` route karta hai, security usme nahi). Login Demo v1 (manual session/cookie) aur v2 (Auth.js) yahin combine ho kar real project ban jaate hain. **Fresh project — blog nahi.**

---

# BATCH 6 — Database Integration

Batch 6 ab **deep database course** hai (MongoDB + PostgreSQL dono hands-on), sirf CRUD nahi — API design, Postman testing, aur system design bhi. Do mini-projects do alag data-flow patterns sikhaate hain:

- **MongoDB mini-project** → **REST (Route Handlers) + client fetch** — yahan API Design + Postman testing (REST + Postman natural pair hain)
- **SQL (Neon + Drizzle) mini-project** → **Server Components + Server Actions** — yahan system design (relations, indexes)

Task Board (combined project) **production pattern** pe — Server Components reads + Server Actions mutations, Prisma + Neon.

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| Q1 | Database kya hoti hai + SQL vs NoSQL + ORM/Providers — **pure fundamentals** (Batch 5 ke `profiles.json` pain se shuru) | — | (koi DB nahi — sirf concept) |
| Q2 | **MongoDB + Mongoose** — Atlas setup, schema/model, then **REST CRUD via Route Handlers** | Mongoose model + Route Handler | **Mongo Todo API** — `route.ts` mein GET/POST/DELETE, client fetch |
| Q3 | **API Design + Postman testing** — resource naming, status codes, error shape, REST client se test | REST design + testing | (Mongo Todo API pe hi — Postman se saare cases) |
| R | **PostgreSQL + Drizzle** — Neon setup, typed schema, **Server Components queries directly (no API layer)** | typed Drizzle schema | **SQL Todo** — list Server Component mein seedha DB se |
| S | **Server Actions + Database mutations** + **system design** (relations, indexes) | typed action + Drizzle call | (SQL Todo ka add/edit/delete SA se persist) |
| T | **Combined Project — Task Board (Prisma + Neon)** — production pattern: SC reads + SA mutations | Prisma models + actions | **Task Board App** — real database-backed CRUD (dummy se replace) |

### 🔗 Combined Project #6 — **Task Board App (Real Database)**
Task Board **Prisma + Neon** pe banta hai — real CRUD, list Server Component mein seedha DB se (koi API layer nahi), add/edit/delete Server Actions se persist. Koi dummy data nahi bacha. **Fresh project — blog nahi.** Batch 6 ki poori journey ka production-grade result: JSON file → MongoDB (REST) → SQL (Server Actions) → Prisma Task Board.

---

# BATCH 7 — Optimization & Production Concerns

Har concept **"Manual → Better"** pair mein likha hai — manual approach ki problem pehle (7.1/7.3), phir Next.js solution (7.2/7.4):

| # | Concept | Layer | File |
|---|---|---|---|
| T | Manual `<img>` ke problems (no optimization, CLS, srcset, lazy limits) | — | 7.1 |
| T | `next/image` — automatic optimization, srcset, `fill`, `remotePatterns` | — | 7.2 |
| U | Manual Google Fonts (FOUC, CLS, network dependency) | — | 7.3 |
| U | `next/font` — self-hosted, no layout shift (`adjustFontFallback`) | — | 7.4 |
| W | Streaming with Suspense — sections progressive load (`<Suspense>` vs `loading.tsx`) | — | 7.5 |
| V | Parallel Routes + Intercepting Routes — modal-in-route pattern (halka) | — | 7.6 |

### 🔗 Combined Project #7 — **Photo Gallery / Media Showcase**
`next/image` se optimized images (before/after size compare), `next/font` project-wide, parallel + intercepting routes se Instagram-style photo modal, aur Streaming with Suspense se slow-loading gallery grid progressive load. Prisma + Neon reuse (Batch 6). Read-only showcase (koi mutations nahi). Files: `7.7.1 Planning → 7.7.2 Hardcoded UI → 7.7.3 Data Layer + Read + SEO → 7.7.4 next/image + next/font → 7.7.5 Photo Modal (parallel + intercepting) → 7.7.6 Streaming + States + Testing + Summary`.

---

# BATCH 8 — Security & Deployment

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| X | Security: server-only env vars vs `NEXT_PUBLIC_` vars, input sanitization, CSRF awareness with Server Actions | — | (poore project ka security audit — kya galti se client-expose ho raha hai) |
| Y | Error Boundaries + `error.tsx` at scale | — | — |
| Z | Deployment on Vercel + environment config | — | Poora project deploy |

---

# 🏁 FINAL CAPSTONE — Real Backend Project

Yahan tumhara pehle wala sawaal wapas aata hai — capstone domain choose karna hai:
1. **DukaanOS-adjacent** (chhota Inventory/Order Dashboard) — tumhara existing Prisma/Supabase knowledge directly leverage hoga
2. **Naya domain** (Blog Platform / Job Board) — kirana context se bahar ek fresh real-world case

Jo bhi choose karo, isme ye sab honge (production-grade, latest approaches):
- Server Components + Client Components properly split
- Server Actions (not manual API+fetch) for mutations
- Auth.js real authentication + Protected routes (layout-level `auth()` — proxy/middleware sirf routing, CVE-2025-29927 ke wajah se security wahan nahi)
- Prisma/Supabase database
- SEO metadata, `next/image`, `next/font`
- Streaming + Suspense where useful
- Security-audited, deployed on Vercel

---

## "Manual → Better" pairs — Next.js summary

| Pehle seekho (fundamental) | Phir Next.js shortcut |
|---|---|
| Route Handlers + client `fetch()` (REST — universal) | Server Actions (Next.js specific — forms ke liye) |
| Manual session/cookie code | Auth.js (NextAuth) |
| Manual `<img>` tags | `next/image` |
| Manual refetch after mutation | `revalidatePath`/`revalidateTag` |
| `useEffect`-style data fetching (from React course) | Server Component `await fetch()` directly |

Ye pattern React course jaisa hi hai — pehle problem mehsoos karo, phir solution samjho, taaki "why" genuinely clear ho, sirf "how" nahi.
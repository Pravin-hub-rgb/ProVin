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

# BATCH 3 — Mutations: Manual → Better

| # | Concept | Approach | Mini-Project |
|---|---|---|---|
| I | **Manual**: Route Handlers (`route.ts`) — traditional REST-style API banake fetch se call karna | typed request/response | **Comment System v1** — `/api/comments` route handler banake, client se `fetch(POST)` karke comment add karna (bilkul jaisa React mein karte the) |
| J | **Better**: Server Actions — form seedha server function ko call kare, koi API layer nahi | typed action function, `'use server'` directive | **Comment System v2** — same feature, ab Server Action se — kitna kam boilerplate lagta hai, dono versions comparison mein rakho |
| K | Server Actions + `useFormStatus` / `useFormState` (progressive enhancement) | typed form state | (comment system v2 ko upgrade — pending state, success/error feedback, sab bina extra client state ke) |
| L | Revalidation after mutation (`revalidatePath`, `revalidateTag`) | — | (comment add hone ke baad page ka data automatically refresh ho, bina manual refetch ke) |

### 🔗 Combined Project #3 — **Blog with Comments**
Blog post pages pe ab live comment system hai — Server Actions se add, revalidation se auto-refresh. Route Handler wala v1 bhi kept as reference/comparison.

---

# BATCH 4 — Authentication & Protected Access

| # | Concept | Approach | Mini-Project |
|---|---|---|---|
| M | **Manual**: Session/cookie handling khud samajhna (conceptual + chhota hands-on) | typed session shape | **Login Demo v1** — bahut basic, cookie-based session khud set/read karke (sirf samajhne ke liye, production mein use nahi karenge) |
| N | **Better**: Auth.js (NextAuth) ya similar library | typed session/user | **Login Demo v2** — same feature, proper auth library se (OAuth provider ya credentials) |
| O | Middleware — route ko intercept karke auth-check/redirect | typed middleware function | (protected `/dashboard` route banao jo bina login redirect kare) |
| P | Real Protected Routes (React course mein ye "dummy" tha — ab genuinely real hai) | — | (blog project mein "My Drafts" page sirf logged-in users ke liye) |

### 🔗 Combined Project #4 — **Blog with Real Auth**
Users login kar sakte hain (Auth.js), apne drafts bana sakte hain (protected route), middleware se unauthorized access blocked hai.

---

# BATCH 5 — Database Integration

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| Q | Prisma/Supabase setup with Next.js (tumhara DukaanOS experience yahan directly kaam aayega, ab structured tareeke se) | typed Prisma models | **Task Board App** — real database-backed CRUD (dummy se replace) |
| R | Server Components + Database queries directly (no API layer needed for reads) | — | (task board ki list Server Component mein directly DB se) |
| S | Server Actions + Database mutations (create/update/delete) | typed action + Prisma call | (task board ka add/edit/delete ab DB mein persist) |

### 🔗 Combined Project #5 — **Blog + Auth + Database**
Ab blog drafts, comments, sab real database mein store hote hain — koi dummy data nahi bacha.

---

# BATCH 6 — Optimization & Production Concerns

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| T | `next/image` (automatic image optimization) vs manual `<img>` | — | (blog/task board ke images optimize karo, before/after size compare) |
| U | `next/font` (font optimization, no layout shift) | — | (project-wide font setup) |
| V | Parallel Routes + Intercepting Routes (halka-level awareness, advanced pattern) | — | (chhota demo — modal-in-route pattern, jaise Instagram ka photo-modal) |
| W | Streaming with Suspense (server-rendered content progressively load karna) | — | (task board ki slow-loading section ko streaming se improve karo) |

---

# BATCH 7 — Security & Deployment

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
- Auth.js real authentication + Middleware-protected routes
- Prisma/Supabase database
- SEO metadata, `next/image`, `next/font`
- Streaming + Suspense where useful
- Security-audited, deployed on Vercel

---

## "Manual → Better" pairs — Next.js summary

| Manual (pehle) | Better (phir) |
|---|---|
| Route Handlers + client `fetch()` | Server Actions |
| Manual session/cookie code | Auth.js (NextAuth) |
| Manual `<img>` tags | `next/image` |
| Manual refetch after mutation | `revalidatePath`/`revalidateTag` |
| `useEffect`-style data fetching (from React course) | Server Component `await fetch()` directly |

Ye pattern React course jaisa hi hai — pehle problem mehsoos karo, phir solution samjho, taaki "why" genuinely clear ho, sirf "how" nahi.

# 🏁 Final Capstone — Hiring Platform (Internal Plan)

> This is an internal planning doc — not for readers. The full decision history, stack choices, and file-series plan are locked here. To resume work in a new chat, read this file + `Nextjs-Final-Roadmap.md`, then write the next file.

---

## 1. Decision History (Why Hiring Platform)

The roadmap offered 2 options: Inventory/Order Dashboard or Blog/Job Board.
Options evaluated in discussion:

| Option | Verdict | Reason |
|---|---|---|
| Mini-Dukaan (Storefront + Admin) | ❌ | DukaanOS is already built — nothing new for the reader/you |
| Blog Platform | ❌ | Repeats the Batch 1-2 spine — breaks the roadmap's own "no repeat" rule |
| Simple Job Board | ❌ | Tutorial vibes — looks average on a resume |
| **Hiring Platform** (Job Board upgraded) | ✅ | Fresh + all three add-ons fit naturally + exercises every batch's concepts |

**Resume-value add-ons (user-selected):**
1. **AI features** — JD Generator + Match Score via Gemini free tier
2. **Stripe** — one-time Featured Listing checkout (no recurring subscription — scope control)
3. **File uploads** — resume PDF via Vercel Blob, with private access control

**LLM provider decision:** Primary path = **Google Gemini (free tier)** — zero cost for students. A small box in the notes: what to change if you want to use OpenAI/Groq. AI calls go directly through the SDK from Server Actions — no LangChain (this is a Next.js course).

Bonus synergy: Gemini free tier's per-minute limit gives C.11 rate-limiting a natural context ("protect the AI endpoint or the quota runs out").

---

## 2. Locked Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router + TypeScript | Course core |
| DB | Prisma + Neon (PostgreSQL) | Batch 6-7 consistency |
| Auth | Auth.js v5 + GitHub OAuth + role field | Batch 5 continuity; roles are new |
| Styling | Tailwind | Same as the whole course |
| AI | `@google/genai` SDK, `GEMINI_API_KEY` server-only env var | Free tier, simple SDK |
| Payments | Stripe Checkout (one-time) + webhook Route Handler | Interview-favorite topic |
| Files | Vercel Blob (`@vercel/blob`) | Serverless-friendly upload |

**Security stance (Batch 4/8 style):** `auth()` checks at layout level; `proxy.ts` only for rate-limiting/logging — no security in proxy (CVE-2025-29927).

---

## 3. File Series (13 files) — Teaching Points

| File | Title | Core teaching point | Batch concepts |
|---|---|---|---|
| C.0 | What We'll Build (Course Finale) | Overview + concept map + resume-value framing | Whole course |
| C.1 | Planning — Pages, Roles, Data Shape | Routes table, 3 roles, schema draft, UI-first thinking | Planning pattern |
| C.2 | Setup + Prisma Schema + Seed | Relations User↔Company↔Job↔Application + indexes | 6 |
| C.3 | Home — Listings + Search Filters | SC reads + searchParams filters + revalidate | 1, 2 |
| C.4 | Job Detail — [slug] + SEO | generateMetadata, not-found, next/image logos | 1, 2, 7 |
| C.5 | Auth — With Roles | GitHub OAuth + role assignment + protected route group | 5 |
| C.6 | Employer — Post Job + AI JD Generator | SA + useActionState + first Gemini call | 3, 8(env) |
| C.7 | Manage Jobs + Featured Listing (Stripe) | Stripe Checkout session + webhook route handler | 3(route handlers), 8 |
| C.8 | Candidate — Apply + Resume Upload | FormData + Vercel Blob + type/size validation | 3, 6(relations) |
| C.9 | AI Match Score | Gemini structured output — apply-time scoring, DB store | 3, 6 |
| C.10 | Employer Dashboard — Ranked Applicants + Stats | AI-ranked list + Streaming Suspense stats | 3, 5, 7 |
| C.11 | Rate Limiting + Security Audit | proxy rate-limit on apply/AI + env audit + error hierarchy | 4, 8 |
| C.12 | Deploy + Testing + Resume Guidance | Vercel deploy, test table, course recap, writing README/resume | 8 |

### Flow logic (never break the order)
Employer posts (C.6-C.7) → candidate applies (C.8) → apply-time AI score computed (C.9) → employer gets ranked applicants (C.10).

### Roles
- **Guest** — can browse/search jobs, cannot apply
- **Candidate** — GitHub login, apply + resume upload, can view their own applications
- **Employer** — GitHub login + create company, post/manage jobs, view applicants

Role selection happens once after signup (on the profile page) — GitHub doesn't provide a role, it's our app-level field.

---

## 4. Writing Rules (every file)

- Sources: `prompts/Master Teaching Prompt.md` + `prompts/Dost-to-Dost Style.md` + `AGENTS.md` + `docs/coding/AGENTIC-AI-WRITING-RULES.md`
- One file at a time → review → next
- Relatable open → connect to previous file → THINK→CONCEPT→CODE→TEST → Nutshell (for new concepts) → Common Mistakes → In Your Own Words (`<details>` answers) → What It Is NOT → next-file bridge
- Code gradual: static UI first, console.log handlers first, imports when needed
- Explanation ALWAYS before code
- React comparisons generic; project references only real ones (DukaanOS etc.) when natural
- friendly conversational tone, vulnerability allowed, complete cause-effect chains

## 5. Registration Status

- Phase `capstone` — appended in `lib/subjects/nextjs.subject.ts` ✅ (all 13 lectures listed upfront — files written in this session)
- `lib/coding-data.ts` — nextjsSubject already imported, no change there

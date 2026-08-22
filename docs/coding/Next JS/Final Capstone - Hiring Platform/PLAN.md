# 🏁 Final Capstone — Hiring Platform (Internal Plan)

> Yeh internal planning doc hai — readers ke liye nahi. Yahan poora decision-history,
> stack choices, aur file-series plan locked hai. Naye chat mein kaam resume karna ho
> toh yeh file + `Nextjs-Final-Roadmap.md` padho, phir agla file likho.

---

## 1. Decision History (Kyun Hiring Platform)

Roadmap ne 2 options diye the: Inventory/Order Dashboard ya Blog/Job Board.
Discussion mein options evaluate hue:

| Option | Verdict | Reason |
|---|---|---|
| Mini-Dukaan (Storefront + Admin) | ❌ | DukaanOS already built hai — reader/tumhare liye naya kuch nahi |
| Blog Platform | ❌ | Batch 1-2 spine repeat — roadmap ka apna "no repeat" rule tootta |
| Simple Job Board | ❌ | Tutorial-vibes — resume pe average lagta hai |
| **Hiring Platform** (Job Board upgraded) | ✅ | Fresh + teeno add-ons naturally fit + saare batch concepts exercise |

**Resume-value add-ons (user-selected):**
1. **AI features** — Gemini free tier se JD Generator + Match Score
2. **Stripe** — one-time Featured Listing checkout (recurring subscription nahi — scope control)
3. **File uploads** — resume PDF via Vercel Blob, private access-control ke saath

**LLM provider decision:** Primary path = **Google Gemini (free tier)** — students ke liye
zero cost. Notes mein ek chhota box hoga: OpenAI/Groq use karna ho toh kya badalna hai.
AI calls Server Actions se direct SDK — LangChain nahi (yeh Next.js course hai).

Bonus synergy: Gemini free tier ki per-minute limit C.11 rate-limiting ko natural
context deti hai ("AI endpoint protect karo warna quota khatam").

---

## 2. Locked Stack

| Layer | Choice | Kyun |
|---|---|---|
| Framework | Next.js 16 App Router + TypeScript | Course ka core |
| DB | Prisma + Neon (PostgreSQL) | Batch 6-7 consistency |
| Auth | Auth.js v5 + GitHub OAuth + role field | Batch 5 continuity; roles naye |
| Styling | Tailwind | Poore course jaisa |
| AI | `@google/genai` SDK, `GEMINI_API_KEY` server-only env var | Free tier, simple SDK |
| Payments | Stripe Checkout (one-time) + webhook Route Handler | Interview-favorite topic |
| Files | Vercel Blob (`@vercel/blob`) | Serverless-friendly upload |

**Security stance (Batch 4/8 wala):** auth() layout-level checks; proxy.ts sirf
rate-limiting/logging ke liye — security proxy mein NAHI (CVE-2025-29927).

---

## 3. File Series (13 files) — Teaching Points

| File | Title | Core teaching point | Batch concepts |
|---|---|---|---|
| C.0 | Kya Banayenge (Course Ka Finale) | Overview + concept map + resume-value framing | Poora course |
| C.1 | Planning — Pages, Roles, Data Shape | Routes table, 3 roles, schema draft, UI-first soch | Planning pattern |
| C.2 | Setup + Prisma Schema + Seed | Relations User↔Company↔Job↔Application + indexes | 6 |
| C.3 | Home — Listings + Search Filters | SC reads + searchParams filters + revalidate | 1, 2 |
| C.4 | Job Detail — [slug] + SEO | generateMetadata, not-found, next/image logos | 1, 2, 7 |
| C.5 | Auth — Roles ke Saath | GitHub OAuth + role assignment + protected route group | 5 |
| C.6 | Employer — Post Job + AI JD Generator | SA + useActionState + pehli Gemini call | 3, 8(env) |
| C.7 | Manage Jobs + Featured Listing (Stripe) | Stripe Checkout session + webhook route handler | 3(route handlers), 8 |
| C.8 | Candidate — Apply + Resume Upload | FormData + Vercel Blob + type/size validation | 3, 6(relations) |
| C.9 | AI Match Score | Gemini structured output — apply-time scoring, DB store | 3, 6 |
| C.10 | Employer Dashboard — Ranked Applicants + Stats | AI-ranked list + Streaming Suspense stats | 3, 5, 7 |
| C.11 | Rate Limiting + Security Audit | proxy rate-limit on apply/AI + env audit + error hierarchy | 4, 8 |
| C.12 | Deploy + Testing + Resume Guidance | Vercel deploy, test table, course recap, README/resume likhna | 8 |

### Flow logic (order kabhi mat todna)
Employer post karta hai (C.6-C.7) → candidate apply karta hai (C.8) → apply-time
AI score compute hota hai (C.9) → employer ko applicants ranked milte hain (C.10).

### Roles
- **Guest** — jobs browse/search kar sakta hai, apply nahi
- **Candidate** — GitHub login, apply + resume upload, apni applications dekh sakta hai
- **Employer** — GitHub login + company create, job post/manage, applicants dekh sakta hai

Role selection signup ke baad ek baar hota hai (profile page pe) — GitHub se role
nahi aata, yeh humara app-level field hai.

---

## 4. Writing Rules (har file mein)

- Sources: `prompts/Master Teaching Prompt.md` + `prompts/Dost-to-Dost Style.md`
  + `AGENTS.md` + `docs/coding/AGENTIC-AI-WRITING-RULES.md`
- Ek time pe EK file → review → agla
- Relatable open → pichli file se connect → SOCH→CONCEPT→CODE→TEST → Nutshell
  (naye concepts pe) → Common Mistakes → In Your Own Words (`<details>` answers)
  → What It Is NOT → next-file bridge
- Code gradual: static UI pehle, console.log handlers pehle, imports jab zaroorat
- Explanation HAMESHA code se pehle
- React comparisons generic; project references sirf real (DukaanOS etc.) jab natural ho
- Hinglish dost-to-dost tone, vulnerability allowed, cause-effect chains complete

## 5. Registration Status

- Phase `capstone` — `lib/subjects/nextjs.subject.ts` mein appended ✅ (saari 13
  lectures upfront listed — files isi session mein likhi ja rahi hain)
- `lib/coding-data.ts` — nextjsSubject already imported hai, wahan change nahi

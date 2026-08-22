Batch 8 ke end mein ek line thi — "iske baad capstone ke liye ready ho." Woh ready ab kaam aane wala hai. Poora course tumhare saamne hai: routing (Batch 1), rendering + data fetching (Batch 2), mutations (Batch 3), proxy/middleware (Batch 4), auth (Batch 5), databases (Batch 6), optimization (Batch 7), security + deployment (Batch 8). Har batch mein chhote projects bane — Blog Site, Reviews App, Member Dashboard, Task Board, Photo Gallery. Ab sab kuch **ek hi production-grade app** mein jodna hai — **Hiring Platform**. Yeh course ka finale hai: ek aisa project jo resume pe daalne layak ho, interview mein dikhane layak ho, aur banate waqt poore course ka revision bhi ho.

---

## Kya Banayenge?

**Hiring Platform** — ek job portal jaisa app (LinkedIn Jobs / Naukri mini version). Do taraf ke log hote hain:

- **Employer** — apni company ke job posts banata hai, applicants dekhta hai
- **Candidate** — jobs browse karta hai, apply karta hai (resume upload karke)
- **Guest** — bina login sirf jobs dekh sakta hai

Aur teen "modern" features jo ise simple tutorial job board se alag karte hain:

| Feature | Kya hota hai | Resume value |
|---|---|---|
| **AI JD Generator** | Employer title/skills type kare, AI job description draft likh dega | LLM API integration |
| **AI Match Score** | Apply karte waqt AI candidate-resume ko job-description se compare karke 0-100 score deta hai | "AI-powered matching" — 2026 ka sabse strong line |
| **Stripe Featured Listing** | Employer paise deke apni job ko featured/boosted kar sakta hai | Payment gateway experience |
| **Resume Upload** | Candidate PDF upload karta hai — private storage mein, sirf us job ka employer dekh sake | File handling + access control |

Yeh features isliye chune gaye hain kyunki yeh naturally fit hote hain (force nahi kiya) — aur recruiter ko domain se zyada yeh cheezein impress karti hain. Ek normal job board tutorial mein yeh kuch nahi hota.

---

## Concept Map — Har Batch Ka Concept Project Mein Kahan

Yeh table capstone ka dil hai. Har file banate waqt isi table se connection dikhega:

| Batch Concept | Hiring Platform mein kahan |
|---|---|
| File-based routing, layouts (1.1-1.2) | Public pages + employer/candidate sections apne-apne layout ke saath |
| Dynamic routes `[slug]` (1.3) | `/jobs/[slug]` job detail page |
| loading/error/not-found states (1.4) | Har route group mein proper states |
| Server Components direct read (2.1) | Job listings, detail page — DB se seedha server pe |
| Client Components (2.2) | Search box, apply form, upload button |
| Static vs dynamic + `revalidate` (2.3) | Job listings ISR — naya post hone pe auto-refresh |
| Metadata API (2.4) | Job detail pe `generateMetadata` — SEO critical (job boards Google pe jeete hain) |
| Server Actions + useActionState (3.x) | Post job, apply, edit — saare mutations SA se (Route Handlers sirf Stripe webhook ke liye) |
| Proxy rate limiting (4.13) | Apply endpoint + AI endpoint pe limit (AI free quota bachana!) |
| Auth.js + protected routes (5.x) | GitHub OAuth + role system + `(employer)` / `(candidate)` protected groups |
| Prisma relations (6.x) | User ↔ Company ↔ Job ↔ Application — real relations + indexes |
| next/image + next/font (7.2/7.4) | Company logos + project-wide font |
| Streaming Suspense (7.5) | Employer dashboard stats progressive load |
| Env vars + audit + deploy (8.x) | GEMINI_API_KEY, STRIPE_SECRET_KEY server-only; Vercel deploy |

Dekho — **koi concept waste nahi ja raha.** Yahi capstone ka matlab hai.

---

## Roles Ka System

Auth.js GitHub OAuth se login hoga (Batch 5 jaisa), lekin ek naya twist — **role**:

- Login ke baad user choose karta hai: *"Main Employer hoon"* ya *"Main Candidate hoon"*
- Role DB mein store hota hai (`User.role` field) — session mein carry hota hai
- Protected route groups: `(employer)` section sirf employer ko, `(candidate)` section sirf candidate ko

Yeh Batch 5 se ek step aage hai — wahan sirf "logged in ya nahi" tha, yahan **kaun logged in hai** matter karta hai.

---

## File Series — 13 Files Ka Plan

| # | File | Kya banega |
|---|---|---|
| C.0 | Kya Banayenge (yeh file) | Overview + plan |
| C.1 | Planning — Pages, Routes, Data Shape | Code se pehle sochna — routes table, schema draft |
| C.2 | Setup + Prisma Schema + Seed | Project create, Neon connect, models + relations + seed data |
| C.3 | Home — Job Listings + Search Filters | SC reads + searchParams filters + revalidate |
| C.4 | Job Detail — `[slug]` + SEO | Dynamic route + generateMetadata + not-found + company logo |
| C.5 | Auth — Roles ke Saath | GitHub OAuth + role selection + protected groups |
| C.6 | Employer — Post Job + AI JD Generator | Pehli Gemini API call + Server Action form |
| C.7 | Manage Jobs + Featured Listing (Stripe) | Job edit/close/delete + Stripe Checkout + webhook |
| C.8 | Candidate — Apply + Resume Upload | Vercel Blob PDF upload + duplicate-apply check |
| C.9 | AI Match Score | Apply-time Gemini scoring — DB mein store |
| C.10 | Employer Dashboard | AI-ranked applicants + Streaming Suspense stats |
| C.11 | Rate Limiting + Security Audit | Proxy rate-limit + env audit + error boundaries |
| C.12 | Deploy + Testing + Resume Guidance | Vercel live URL + test table + resume/README likhna |

Order ka logic: **employer pehle job post karega** (C.6-C.7) → **tabhi candidate apply kar sakta hai** (C.8) → **apply ke waqt AI score banta hai** (C.9) → **employer ko ranked list milti hai** (C.10). Data flow ke against kabhi build nahi karenge.

---

## Stack — Kya Use Hoga

Sab course-consistent choices — koi naya framework nahi:

| Layer | Choice | Kyun |
|---|---|---|
| Next.js 16 + TypeScript + Tailwind | App Router | Poore course jaisa |
| Database | Prisma + Neon | Batch 6-7 same setup |
| Auth | Auth.js v5 (GitHub OAuth) | Batch 5 continuity |
| AI | Google Gemini (free tier) via `@google/genai` SDK | Students ke liye zero cost; OpenAI/Groq swap-box notes mein milega |
| Payments | Stripe Checkout (one-time) + webhook Route Handler | Simple, production-standard |
| Files | Vercel Blob | Serverless-friendly, private URLs |

---

## Is Capstone Mein Kya NAHI Hoga

Scope control utna hi zaroori jitna features banana:

- **Recurring subscriptions nahi** — sirf one-time Featured Listing purchase. Subscriptions = webhooks + portal + proration — scope double ho jaata.
- **Real-time chat between employer-candidate nahi** — messaging system alag bada topic hai.
- **Admin panel nahi** — moderation/moderation-reporting skip; focus core hiring flow pe.
- **Email notifications nahi** — Resend/SMTP nice-to-have hai, C.12 mein "aage khud try karo" list mein jayega.
- **Semantic/vector search nahi** — search simple text-match filters se hoga. Vector embeddings agla learning step hai, capstone nahi.
- **Mobile app / native nahi** — responsive web hi final deliverable.

Har "nahi" ek conscious trade-off hai — capstone mein depth > breadth.

---

## Prerequisite

Capstone shuru karne se pehle yeh hona chahiye:

- ✅ Batches 1-8 complete — especially Batch 6 (Prisma + Neon) aur Batch 8 (env/deploy)
- ✅ Neon account (free) — Batch 6 mein banaya tha
- ✅ GitHub account — OAuth ke liye (already hai hi hoga)
- ✅ Google AI Studio account (free) — C.6 mein Gemini key banayenge, abhi ki zaroorat nahi
- ✅ Stripe account (free test mode) — C.7 mein banayenge, abhi ki zaroorat nahi

Accounts abhi mat banana — har feature ke apne file mein setup steps hain.

---

## Nutshell

Final Capstone = **Hiring Platform** — employers job post karte hain (AI se description draft, Stripe se boost), candidates apply karte hain (PDF resume upload), aur AI har application ko job-description se match score deta hai jo employer dashboard pe ranked dikhta hai. 13 files mein banega, aur isme **poore course ka har batch ka concept genuinely use hoga** — yeh revision bhi hai aur portfolio piece bhi.

Pehla step: code likhne se pehle sochna — pages kya honge, data ka shape kya hoga, roles kaise flow karenge. C.1 Planning mein milte hain.

C.0 mein plan lock ho gaya tha — **Hiring Platform**: employers job post karenge (AI JD generator se), candidates resume upload karke apply karenge (AI Match Score ke saath), Stripe se featured listings bikengi. Ab code likhne se pehle wahi karna hai jo har project se pehle karte aaye hain — **sochna**. Batch 1 ka blog project bhi planning file (1.5.1) se shuru hua tha, Task Board planning se (6.13.1), Photo Gallery planning se (7.7.1). Rule same hai: **UI dekhne se pehle pages, data aur flow clear karo** — warna beech mein schema badalne padte hain, aur migration pain hota hai.

Yeh 5 sawaal poore project ka blueprint banayenge:

---

## Sawaal 1 — Kya Banana Hai? (User Journey Se Samjho)

Features list karne se pehle **logon ki journey** sochte hain — kyunki app ka har page kisi insaan ke kisi kaam ke liye hona chahiye:

**Employer ki journey:**
1. GitHub se login → pehli baar "Employer" role choose + company name/logo deta hai
2. Dashboard pe jaata hai — apni jobs ki list, stats (kitni applications aayi)
3. "Post Job" pe click — title/skills type karta hai, **AI button** se description draft generate karwata hai, edit karke post karta hai
4. Chahe toh job ko **featured** banata hai — Stripe checkout → payment → job upar dikhegi
5. Applications aane lagti hain — har application pe **AI match score** already laga hai, ranked list dekhta hai, resume kholta hai

**Candidate ki journey:**
1. GitHub se login → "Candidate" role choose
2. Home pe jobs browse/filter karta hai — featured jobs sabse upar
3. Job detail kholta hai — "Apply" click
4. Form bharta hai (cover note) + **PDF resume upload** karta hai → submit
5. Turant **AI Match Score** milta hai ("aap is job ke liye 78/100 fit ho") — aur "My Applications" page pe apni saari applications track karta hai

Dekho — journey se features khud nikal aate hain. Yeh features ab pages banenge.

## Sawaal 2 — Kaunse Pages Chahiye?

Journey ko routes mein translate karte hain:

| Route | Kya dikhta hai | Access | Batch concept |
|---|---|---|---|
| `/` | Home — featured jobs upar, phir saari jobs + search/location/type filters | Public | SC read (2.1), searchParams (1.x), revalidate (2.3) |
| `/jobs/[slug]` | Job detail — description, skills, salary, company logo, Apply button | Public | Dynamic route (1.3), generateMetadata (2.4), next/image (7.2) |
| `/jobs/[slug]/apply` | Apply form — cover note + resume PDF upload | Candidate | Server Action (3.3), Vercel Blob |
| `/login` | GitHub sign-in button | Public | Auth.js (5.4) |
| `/onboarding` | Role selection — Employer ya Candidate (+ employer ke liye company form) | Logged-in | Session read (5.4.2), SA mutation |
| `(employer)/dashboard` | Apni jobs + stats cards (streaming Suspense) | Employer | Protected group (5.4.3), Streaming (7.5) |
| `(employer)/post-job` | Post job form + "Generate with AI" button | Employer | useActionState (3.3.1), Gemini API |
| `(employer)/jobs/[id]` | Applicants list — AI-ranked + resume links | Employer (owner) | Prisma relations (6.x) |
| `(candidate)/applications` | Meri applications + match scores | Candidate | SC reads + relations |

**Route groups ka fayda yahan real hai:** `(employer)` group ka layout ek hi jagah `auth()` check karega — teen employer pages ko alag-alag protect nahi karna padega. Yeh 5.4.3 wala pattern scale pe use ho raha hai.

Note `/jobs/[slug]` vs `(employer)/jobs/[id]` — public URL **SEO-friendly slug** (`frontend-developer-at-acme`) use karta hai, employer panel internal `id` se kaam karta hai. Dono alag concerns hain.

## Sawaal 3 — Data Ka Shape Kya Hai?

Rule wahi hai jo 7.7.1 mein tha: **UI dekh ke data decide karo, ulta nahi.**

Har page pe kya dikh raha hai, usse fields nikalti hain:

- Job card/detail → title, description, location, type, salary range, skills, posted date, company (name + logo)
- Featured sorting → `featured` flag
- Applicant list → kaun apply kiya, kab, score kitna, resume kahan
- Employer ka dashboard → uski company ki jobs

Iska matlab **4 tables + relations:**

```
User            Company          Job              Application
─────────       ─────────        ────────         ───────────
id              id               id               id
email (uniq)    name             slug (uniq)      coverNote?
name            logoUrl?         title            resumeUrl
image?          ownerId →User    description      matchScore?
role                             location?        matchReason?
company  1:1    jobs    1:N      type             status
applications                     salaryMin?       createdAt
createdAt                        salaryMax?
                                 skills
                                 featured
                                 companyId→Company
                                 applications 1:N
                                 createdAt
                                 
Application: jobId→Job + candidateId→User
```

Har field ka reason (jo obvious nahi):

- **`User.role`** — enum `CANDIDATE | EMPLOYER`. GitHub OAuth se yeh nahi aata — yeh hamara app-level decision hai, onboarding pe user choose karega. Session mein carry hoga taaki har check cheap ho.
- **`Job.slug`** — URL ke liye SEO-friendly string (`title-company` jaisa). `id` internal panel ke liye theek hai, par Google pe rank karna hai toh URL readable hone chahiye. Unique constraint zaroori — do jobs ka same slug nahi ho sakta.
- **`Job.skills`** — simple comma-separated string rakhte hain (`React, TypeScript, Next.js`). Array bhi ho sakta tha, par filter sirf text-match karega — array ki complexity abhi zaroorat se zyada hai.
- **`Job.featured`** — boolean flag. Stripe webhook payment confirm hone pe ise `true` karega (C.7). Home query ise sort mein use karegi.
- **`Application.matchScore` + `matchReason`** — nullable (`Int?`). Kyunki score **apply ke waqt** compute hoga (C.9) — agar AI call fail ho jaye toh application phir bhi save rahe, score baad mein aa sake. Nullable = "score optional hai" ka honest DB reflection.
- **`Application.resumeUrl`** — Vercel Blob ka private URL. Private kyun? Resume sirf us job ke employer ko dikhna chahiye — public URL hota toh koi bhi guess karke khol leta. Access control C.10/C.8 mein.
- **`@@unique([jobId, candidateId])`** — composite unique! Ek candidate ek job pe **sirf ek baar** apply kar sake. Yeh DB-level guard hai — agar humne app-level check hi sahii likha ho, race condition mein double apply ho sakta tha. Database hi last line of defense hai.

Relations recap (6.12 ka system design): `User 1—1 Company` (employer ka apna company), `Company 1—N Jobs`, `Job 1—N Applications`, `User 1—N Applications` (candidate ki applications). Do foreign keys `Application` mein hain kyunki woh do tables ko jodta hai — yahi junction-table pattern hai.

## Sawaal 4 — Mutations Kahan Hain?

Reads toh SC queries hongi, asli kaam mutations ka hai:

| Mutation | Kaise | File |
|---|---|---|
| Role/company setup | Server Action — `User.role` update (+ Company create) | C.5 |
| Job description draft | Server Action → Gemini API call → draft string return | C.6 |
| Job post/edit/close | Server Actions — `useActionState` forms | C.6/C.7 |
| Featured purchase | SA → Stripe Checkout session redirect; **payment result webhook Route Handler** (`route.ts`) mein aata hai → `featured = true` | C.7 |
| Apply (note + resume + score) | SA → Blob upload → Application create → Gemini score → save | C.8/C.9 |
| Rate limiting | proxy.ts — apply/AI endpoints pe request-limit | C.11 |

Pattern note (roadmap ka rule): **mutations Server Actions se**, Route Handlers sirf Stripe webhook ke liye — kyunki webhook ko external server se HTTP POST aata hai, woh SA call nahi kar sakta. Yeh 3.4.15 wale comparison ka live example hai.

## Sawaal 5 — Roles Ka Flow Kaise Hoga?

Auth flow step-by-step:

```
GitHub login (Auth.js)
   │
   ▼
Pehli baar login? ──yes──▶ /onboarding ──▶ role choose
   │ no                                      │
   ▼                                         ▼
Session mein role                    EMPLOYER → company form → (employer)/dashboard
ka pata hai                          CANDIDATE → (candidate)/applications
```

- Har protected layout `(employer)/layout.tsx` mein `auth()` se session uthayega, role check karega, galat role ho toh redirect — 5.4.3 ka pattern + role twist
- Guest sirf public routes dekh sakta hai — apply button pe click kare toh `/login` pe redirect

---

## Ab Tak Ka Plan — Summary Table

| | Plan |
|---|---|
| **Kya** | Hiring Platform — jobs (public) + posting/applicants (employer) + applying/scores (candidate) |
| **Pages** | 4 public (`/`, `[slug]`, apply, login) + onboarding + 3 employer + 1 candidate |
| **Roles** | Guest / Candidate / Employer — role onboarding pe choose, session mein carry |
| **Data** | 4 models — User, Company, Job, Application; Application junction table (@@unique duplicate guard) |
| **Mutations** | Sab Server Actions; Route Handler sirf Stripe webhook ke liye |
| **AI** | 2 Gemini calls — JD draft (C.6) + Match Score (C.9) |
| **Payments** | One-time Featured Listing via Stripe Checkout + webhook |
| **Files** | Resume PDF → Vercel Blob private storage |
| **Series** | C.2 setup/schema → C.3 home → C.4 detail → C.5 auth → C.6-C.7 employer → C.8-C.9 candidate+AI → C.10 dashboard → C.11 audit → C.12 deploy |

## Nutshell

Planning pattern: **user journeys se pages niklo** (har page kisi ke kaam ka ho), **pages se data shape** (UI pehle, schema baad mein — 7.7.1 ka rule), **mutations ka pattern pehle decide karo** (SA vs Route Handler — webhook exception), aur **auth flow ka diagram bana lo** (kab kahan check hoga). Hiring Platform = 4 public pages + onboarding + 3 employer + 1 candidate page, 4 related models, 2 AI calls, 1 payment flow.

## What It Is NOT

- **Hiring platform = LinkedIn clone nahi.** Feed, connections, messaging — kuch nahi. Sirf core loop: post → apply → review. Scope control capstone ki strength hai, kamzori nahi.
- **`matchScore` = "candidate ki guarantee" nahi.** LLM ka estimate hai — screening helper, hiring decision nahi. Isliye `matchReason` bhi store karenge — score akela misleading hota hai.
- **Role system = "permissions matrix" nahi.** Sirf 2 roles hain, admin/moderator kuch nahi. Simple enum + layout checks — RBAC frameworks ki zaroorat nahi.
- **Slug = "random ID ka nickname" nahi.** Slug ka purpose SEO + shareability hai — Google pe job listing rank karni hai, UUID nahi.
- **Planning file = "schema final hai" nahi.** Build karte waqt chhoti adjustments aayengi (jaise koi field add ho). Planning direction fix karti hai, har line freeze nahi karti.

---

**In Your Own Words**

1. `Application` table mein do foreign keys kyun hain — `jobId` aur `candidateId`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Application ek **junction entity** hai — woh `Job` aur `User` (candidate) dono ko jodti hai. Ek job pe kai candidates apply karte hain, ek candidate kai jobs pe — dono taraf many relationships hain, isliye middle table chahiye jisme dono ka reference ho plus apni fields (resumeUrl, matchScore).

</details>

2. `@@unique([jobId, candidateId])` kya rok raha hai — app-level check se kya problem thi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Duplicate apply rok raha hai — ek candidate ek job pe sirf ek baar. App-level check (pehle query, phir insert) mein **race condition** hoti hai: do requests almost saath mein aayein toh dono check pass karke insert ho sakti hain. DB-level unique constraint atomic hai — second insert fail ho jayega chahe kuch bhi ho.

</details>

3. Stripe payment ke baad job featured kaise hogi — Server Action se kyun nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Payment confirmation **Stripe ke server se** hamare app pe POST aata hai (webhook) — woh hamara browser/UI nahi hai, Server Action call nahi kar sakta. Webhook ek public HTTP endpoint maangta hai — Route Handler (`route.ts`). Hum Checkout session SA se banate hain, par result webhook se process hota hai.

</details>

4. `matchScore` nullable (`Int?`) kyun rakha — apply ke waqt hi toh score banega?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Score apply ke waqt compute hota hai, lekin AI call fail ho sakti hai (rate limit, network). Agar field non-null hoti toh application save hi nahi hoti jab tak score na mile. Nullable ka matlab: application important hai, score bonus hai — fail hone pe application saved rahegi, score null rahega, baad mein retry ho sakta hai.

</details>

5. `/jobs/[slug]` public hai par `(employer)/jobs/[id]` protected — ek hi cheez ke do URLs kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Dono ka audience alag hai. Public detail page **SEO/shareability** ke liye slug use karta hai (Google + candidates ke liye readable URL). Employer panel internal management ke liye hai — wahan SEO matter nahi karta, seedha `id` se lookup fast aur simple hai. Alag concerns = alag URLs.

</details>

---

Plan ready — pages, roles, data, flow, sab clear. Ab **environment** banana hai: naya Next.js project, Neon connection, Prisma schema (yehi 4 models), aur seed data — taaki C.3 se pehle database mein real jobs paddi hui hon. C.2 mein milte hain.

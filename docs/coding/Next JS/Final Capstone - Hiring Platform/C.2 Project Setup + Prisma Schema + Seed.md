C.1 mein poora blueprint ready hai — 9 pages, 3 roles, aur 4 models ka schema draft (`User`, `Company`, `Job`, `Application`). Ab uss draft ko **asli cheez** banana hai: naya project create karna, Neon se jodna, Prisma schema likhna, tables migrate karna, aur seed data daalna — taaki C.3 mein jab home page banayein, database mein real jobs paddi hui hon.

Setup ke steps (create-next-app, Prisma install/init) Batch 6/7 mein detail mein kar chuke hain (0.8, 6.9, 6.13.3) — yahan wahi commands hain, isliye quick rakhenge. **Asli focus schema pe hoga** — kyunki yeh capstone ka foundation hai, aur C.1 ke design decisions ab PSL (Prisma Schema Language) mein likhe jaenge.

# Hiring Platform — Part 2: Setup + Schema + Seed

## Project Create + Packages

**Concept:** Naya project, naya folder — Photo Gallery (7.7.2) jaisa hi process. `create-next-app` TypeScript + App Router + Tailwind ke saath:

```bash
npx create-next-app@latest hiring-platform --typescript --app --tailwind
cd hiring-platform
```

Ab Prisma ke dono packages + init — 6.13.3 wale hi steps:

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

- **`@prisma/client`** — runtime client — `prisma.job.findMany()` isi se chalega
- **`prisma`** (dev dependency) — CLI — `migrate dev` jaise commands ke liye
- **`npx prisma init`** — `prisma/schema.prisma` + `.env` scaffold karta hai

`.env` mein Neon ki connection string daalo — 6.9 mein Neon project banaya tha (ya naya bana lo — capstone ke liye fresh project saaf rahta hai):

```env
DATABASE_URL="postgresql://username:password@ep-something-xxx.region.neon.tech/neondb?sslmode=require"
```

> **Yaad hai?** `.env` (Prisma convention), `.env.local` nahi — 6.13.3 mein wajah bhi padi thi: Prisma khud `.env` padhta hai.

**TEST:** `npx prisma init` ke baad terminal mein `✔ Generated prisma/schema.prisma` dikhna chahiye. Folder structure:

```
hiring-platform/
├── app/
├── prisma/
│   └── schema.prisma    ← abhi models likhenge
├── .env                 ← DATABASE_URL set ho chuki
└── package.json
```

## Schema — 4 Models, Ek-Ek Karke

Ab C.1 ka draft asli PSL mein. Order same jo planning mein tha: **User (root) → Company → Job → Application (junction)**. Har model build karte waqt sirf naye lines `NEW` se mark karunga — purana code repeat nahi.

### Model 1 — User

Pehla model sabse simple hai — email, naam, image (GitHub avatar), role, timestamps:

```prisma
// prisma/schema.prisma
model User {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  name        String?
  image       String?
  role        Role     @default(CANDIDATE)
  createdAt   DateTime @default(now())
}
```

Line-by-line:

- **`id Int @id @default(autoincrement())`** — 6.13.3 ka wahi pattern — primary key, auto 1,2,3...
- **`email String @unique`** — GitHub se aane wali email; `@unique` = do users same email se register nahi kar sakte. Yeh auth lookup bhi fast banata hai (unique = automatic index)
- **`name String?` / `image String?`** — optional (`?`) — GitHub profile se aate hain, par guaranteed nahi
- **`role Role @default(CANDIDATE)`** — C.1 ka decision! Enum type `Role` (neeche define karenge). Default `CANDIDATE` kyun? Safe default hai — koi bina soche employer powers na le le. Employer hona conscious choice hona chahiye.
- **`createdAt DateTime @default(now())`** — banate waqt khud set hoti hai, hum nahi bhejte (6.13.3 Board wala hi concept)

Ab relations — User do jagah judta hai:

```prisma
// prisma/schema.prisma
model User {
  id           Int           @id @default(autoincrement())
  email        String        @unique
  name         String?
  image        String?
  role         Role          @default(CANDIDATE)
  createdAt    DateTime      @default(now())
  company      Company?                                  // NEW
  applications Application[]                             // NEW
}
```

- **`company Company?`** — relation field (database column NAHI — 6.13.3 rule yaad hai). `?` kyun? Sirf employer ka company hota hai — candidate ka nahi. Optional = honest reflection.
- **`applications Application[]`** — ek candidate ki saari applications (1:N)

### Model 2 — Company

Employer apni company register karega onboarding pe (C.5). Fields: naam, logo, owner:

```prisma
// prisma/schema.prisma
model User {
  id           Int           @id @default(autoincrement())
  email        String        @unique
  name         String?
  image        String?
  role         Role          @default(CANDIDATE)
  createdAt    DateTime      @default(now())
  company      Company?
  applications Application[]
}

model Company {                                              // NEW
  id      Int     @id @default(autoincrement())              // NEW
  name    String                                             // NEW
  logoUrl String?                                            // NEW
                                                            // NEW
  ownerId Int     @unique                                    // NEW
  owner   User    @relation(fields: [ownerId], references: [id])  // NEW
                                                            // NEW
  jobs    Job[]                                              // NEW
}                                                            // NEW
```

Naye concepts yahan do hain:

- **`logoUrl String?`** — remote URL store karenge (jaise 7.7.1 Photo.src tha). Logo har job card pe dikhega → `next/image` + `remotePatterns` (7.2) ka use-case. Optional — company bina logo ke bhi post kar sake.
- **`ownerId Int @unique` + `owner User @relation(fields: [ownerId], references: [id])`** — foreign key pattern toh 6.13.3 ka hi hai (`Board.user_id`), par ek naya twist: **`@unique` foreign key pe!**

**`@unique` FK pe kyun?** Socho — `ownerId` bina unique ke hota toh ek user multiple companies bana sakta (1:N). Unique lagane se ek user ki **sirf ek** company ho sakti hai — yeh Postgres mein **1:1 relationship** banane ka tareeka hai. Constraint hi relationship enforce karta hai.

- **`jobs Job[]`** — company ki saari jobs (1:N)

### Model 3 — Job

Sabse bada model — public listing ka saara data:

```prisma
// prisma/schema.prisma
// ...User aur Company upar waise hi...

model Job {                                                  // NEW
  id          Int      @id @default(autoincrement())        // NEW
  title       String                                        // NEW
  slug        String   @unique                              // NEW
  description String                                        // NEW
  location    String?                                       // NEW
  type        JobType  @default(FULL_TIME)                  // NEW
  salaryMin   Int?                                          // NEW
  salaryMax   Int?                                          // NEW
  skills      String                                        // NEW
  featured    Boolean  @default(false)                      // NEW
  createdAt   DateTime @default(now())                      // NEW
                                                           // NEW
  companyId  Int                                           // NEW
  company    Company @relation(fields: [companyId], references: [id])  // NEW
                                                           // NEW
  applications Application[]                               // NEW
                                                           // NEW
  @@index([featured, createdAt])                           // NEW
}                                                          // NEW
```

Har "sochne wali" field:

- **`slug String @unique`** — C.1 Sawaal 2 ka SEO decision. URL `/jobs/frontend-developer-at-acme` Google-friendly hai, `/jobs/42` nahi. Unique = do jobs ka same slug impossible.
- **`description String`** — lambi job description (AI generate karega C.6 mein). PostgreSQL mein Prisma ka `String` already TEXT type hota hai — limit ki chinta nahi.
- **`type JobType @default(FULL_TIME)`** — enum (neeche) — filter dropdown isi pe chalega (C.3)
- **`salaryMin/salaryMax Int?`** — range; optional kyunki kuch employers salary hide karti hain
- **`skills String`** — comma-separated ("React, TypeScript, Next.js") — C.1 ka scope decision (array complexity nahi chahiye). AI Match Score isi string ko padhega (C.9).
- **`featured Boolean @default(false)`** — Stripe payment hone pe webhook ise `true` karega (C.7). Default false = normal listing free.
- **`@@index([featured, createdAt])`** — **naya concept, dhyan do.** Home page query hamesha aisi hogi: *"featured pehle, phir newest"* — matlab sort by `featured DESC, createdAt DESC`. Bina index ke Postgres har baar poori table scan karta sort ke liye. Composite index dono columns ka pre-sorted mini-directory bana deta hai — query turant result utha leti hai. Abhi rows kam hain toh fark nahi dikhega, production data pe yehi fark hota hai. (6.12 system design ka "indexes" section ab haath mein aa gaya.)

### Model 4 — Application (Junction)

Do foreign keys wala junction table — C.1 ka sabse interesting design:

```prisma
// prisma/schema.prisma
// ...User, Company, Job upar waise hi...

model Application {                                          // NEW
  id          Int                @id @default(autoincrement())  // NEW
  coverNote   String?                                         // NEW
  resumeUrl   String                                          // NEW
  matchScore  Int?                                            // NEW
  matchReason String?                                         // NEW
  status      ApplicationStatus  @default(PENDING)            // NEW
  createdAt   DateTime           @default(now())              // NEW
                                                              // NEW
  jobId       Int                                             // NEW
  job         Job  @relation(fields: [jobId], references: [id])   // NEW
                                                              // NEW
  candidateId Int                                             // NEW
  candidate   User @relation(fields: [candidateId], references: [id])  // NEW
                                                              // NEW
  @@unique([jobId, candidateId])                              // NEW
}                                                             // NEW
```

- **`coverNote String?`** — candidate ka short message; optional
- **`resumeUrl String`** — Vercel Blob private URL (C.8). Non-null — resume ke bina apply hi nahi hota, isliye required.
- **`matchScore Int?` / `matchReason String?`** — nullable kyun, C.1 In-Your-Own-Words Q4 mein soch chuke: AI call fail ho toh application phir bhi save rahe. DB mein NULL = "score abhi available nahi".
- **`status ApplicationStatus @default(PENDING)`** — employer ne dekha ya nahi (REVIEWED). Minimal status enum — REJECTED/OFFERED jaise states abhi nahi (scope control, C.0 wala rule).
- **Do relations** — `job` (kaunsi job pe) + `candidate` (kaun apply kar raha). Junction table ka signature — 6.12 mein theory thi, yahan live hai.
- **`@@unique([jobId, candidateId])`** — **composite unique** — dono fields ka combination unique. Ek candidate ek job pe sirf ek application. Race condition bhi covered — do simultaneous requests mein second insert DB level pe fail hoga (C.1 Q2).

### Enums — Teen Types Ki Validity

Models reference kar chuke hain — ab teeno enums define karo (schema ke end mein, 6.13.3 Status jaisa):

```prisma
// prisma/schema.prisma
enum Role {
  CANDIDATE
  EMPLOYER
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERNSHIP
}

enum ApplicationStatus {
  PENDING
  REVIEWED
}
```

Enum ka fayda wahi 6.13.3 wala — galat value insert ho hi nahi sakti. `"fulltime"` (typo) DB mein jayega hi nahi.

**Poori relation picture:**

```
User 1 ── 0..1 Company 1 ── N Job 1 ── N Application N ── 1 User
(employer)        (ownerId uniq)  (companyId)   (jobId)      (candidateId)
```

**TEST:** `npx prisma migrate dev --name init` chalao:

```bash
npx prisma migrate dev --name init
```

Terminal output: `✔ Generated Prisma Client` + `✔ Your database is now in sync`. Neon SQL Editor mein verify:

```sql
SELECT * FROM "Job";
```

`(0 rows)` — 4 tables ban gayi, khali hain. Ab data bharte hain.

## Client — `lib/prisma.ts`

Wahi 6.13.3 wala singleton — code same hai, copy kar lo:

```ts
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

Kyun aisa hai — 6.13.3 mein line-by-line dekha tha (hot reload pe connection leak na ho). Recap ek line mein: dev mein client global slot mein cache hota hai, `??` pehli baar naya banata hai baar-baar nahi.

## Seed — Database Mein Starter Data

**Problem pehle:** Home page test karne ke liye jobs chahiye. Options kya the?

1. Neon SQL Editor mein INSERT statements — kaam karega, par 4 related tables mein FK order maintain karna padega (pehle User, phir Company, phir Job...) aur har baar IDs manually dekhni padengi. Painful.
2. **Seed script** — TypeScript file jo Prisma client se saara starter data create kare. Run karo, data aa gaya. Dobara run karo, pehle saaf karke firse.

Option 2 production-standard hai — har serious project mein seed script hota hai. Aur Prisma client use karne se relations automatically resolve hote hain (nested create — IDs manually nahi).

**File:** `prisma/seed.ts` — naya file:

```ts
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Purana seed data saaf karo (dobara run pe duplicate na ho)
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
```

**Delete order ulta kyun?** Foreign keys! Application Job + User ko reference karti hai — pehle woh delete nahi karoge toh Job delete fail hoga ("rows still referenced"). Child-first deletion — FK ka golden rule.

```ts
  // Employer 1 + company
  const acmeOwner = await prisma.user.create({
    data: {
      email: "acme@example.com",
      name: "Acme HR",
      role: "EMPLOYER",
      company: {
        create: {
          name: "Acme Corp",
          logoUrl: "https://picsum.photos/seed/acme/100",
        },
      },
    },
    include: { company: true },
  });
```

**Nested create** — `company: { create: {...} }` se User aur Company ek call mein bante hain, Prisma khud `ownerId` wire karta hai — manually ID pass karne ka jhanjhat zero. **`include: { company: true }`** — response mein created company bhi milegi (agli lines mein use hogi):

```ts
  // Jobs — Acme ki 3 (ek featured)
  const acmeJobs = await Promise.all([
    prisma.job.create({
      data: {
        title: "Frontend Developer",
        slug: "frontend-developer-at-acme",
        description:
          "Acme Corp ko React developer chahiye jo modern web apps banaye. Aap Next.js components, state management aur API integration handle karoge.",
        location: "Remote (India)",
        type: "FULL_TIME",
        salaryMin: 800000,
        salaryMax: 1400000,
        skills: "React, TypeScript, Next.js, Tailwind",
        featured: true,
        companyId: acmeOwner.company!.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Backend Intern",
        slug: "backend-intern-at-acme",
        description:
          "6-month internship — Node.js APIs, MongoDB/PostgreSQL basics, REST design seekhne ka mauka mentorship ke saath.",
        location: "Bengaluru",
        type: "INTERNSHIP",
        skills: "Node.js, Express, SQL basics",
        companyId: acmeOwner.company!.id,
      },
    }),
    prisma.job.create({
      data: {
        title: "Full Stack Engineer",
        slug: "fullstack-engineer-at-acme",
        description:
          "End-to-end features — React frontend se lekar PostgreSQL schema tak. Chhoti team, badi responsibility.",
        location: "Hyderabad (Hybrid)",
        type: "CONTRACT",
        salaryMin: 1200000,
        salaryMax: 1800000,
        skills: "React, Node.js, PostgreSQL, Prisma",
        companyId: acmeOwner.company!.id,
      },
    }),
  ]);
```

- **`salaryMin/max` lakhs mein** (800000 = ₹8 LPA) — Int hai, paise/currency symbol nahi store karte
- **Ek job `featured: true`** — taaki C.3 mein featured sorting ka effect turant dikhe
- **`Promise.all`** — teen independent creates parallel — speed (React course ka concept, bas yahan server-side)

```ts
  // Employer 2 + company + 1 job
  const techNovaOwner = await prisma.user.create({
    data: {
      email: "technova@example.com",
      name: "TechNova Hiring",
      role: "EMPLOYER",
      company: { create: { name: "TechNova", logoUrl: "https://picsum.photos/seed/technova/100" } },
    },
    include: { company: true },
  });

  await prisma.job.create({
    data: {
      title: "React Native Developer",
      slug: "react-native-developer-at-technova",
      description:
        "Mobile-first product team. React Native apps, performance tuning, native module integration.",
      location: "Remote",
      type: "FULL_TIME",
      salaryMin: 900000,
      salaryMax: 1500000,
      skills: "React Native, TypeScript, Mobile",
      companyId: techNovaOwner.company!.id,
    },
  });
```

```ts
  // Candidate + 1 application (score ke saath — dashboard test ke liye)
  const candidate = await prisma.user.create({
    data: {
      email: "priya@example.com",
      name: "Priya Sharma",
      role: "CANDIDATE",
    },
  });

  await prisma.application.create({
    data: {
      coverNote: "2 saal React experience hai, portfolio mein 3 projects.",
      resumeUrl: "https://example.com/sample-resume.pdf",
      matchScore: 82,
      matchReason: "Strong React+TS overlap; Next.js experience bonus.",
      jobId: acmeJobs[0].id,
      candidateId: candidate.id,
    },
  });

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

- **Sample application pre-seeded** — taaki C.10 dashboard pe khali list na dikhe, ranked applicant ka effect turant dikhe. `matchScore/matchReason` hardcoded hain — real AI scoring C.9 mein aayegi.
- **`finally(() => prisma.$disconnect())`** — script end pe connection band — warna terminal hang rehta hai.

Run karne ke liye TypeScript runner chahiye:

```bash
npx tsx prisma/seed.ts
```

**`tsx` kyun?** Node seedha TypeScript nahi chalata; `tsx` zero-config TS runner hai — seed ek baar chalani hai, isliye heavy tooling (tsc config etc.) bekaar hai.

**TEST:** Output `Seed complete!` — phir Neon SQL Editor:

```sql
SELECT j.title, c.name AS company, j.featured
FROM "Job" j JOIN "Company" c ON j."companyId" = c.id
ORDER BY j.featured DESC, j."createdAt" ASC;
```

4 rows milni chahiye — Frontend Developer sabse upar (featured), phir baaki. Yehi ordering C.3 home page dikhayega.

## Nutshell

Capstone setup: `create-next-app` + Prisma init + Neon `.env` (sab 6.x/7.x patterns). Schema = 4 models — `User` (role enum), `Company` (**FK pe `@unique` = 1:1 relationship**), `Job` (slug unique SEO ke liye, `@@index([featured, createdAt])` home-sorting ke liye), `Application` (junction — do FKs + **`@@unique([jobId, candidateId])`** duplicate-apply guard). `migrate dev --name init` se history-wali migration. Seed script (`prisma/seed.ts`, `npx tsx`) nested creates se FK pain solve karti hai — child-first delete, employer+jobs+ek scored application.

## What It Is NOT

- **`ownerId Int @unique` = "owner change nahi ho sakta" nahi.** Unique constraint "ek owner = ek company" enforce karta hai; owner update karna allowed hai. 1:1 ka matlab count-per-side, immutability nahi.
- **`@@index([featured, createdAt])` = "data sorted store hota hai" nahi.** Index ek alag data-structure (mini-directory) hai jo lookups fast karta hai; table ki actual row-order change nahi hoti. Read/write trade-off bhi hai — har insert pe index update hota hai, isliye har column pe index nahi dalte.
- **Seed = "production data" nahi.** Seed sirf development/testing starter data hai. Production deploy pe seed run nahi karte — real users ka data real se aata hai.
- **`skills String` = "best practice" nahi.** Comma-separated strings querying/searching mein limited hote hain — yeh conscious scope-trade-off hai (C.1). Real product mein array/JSON ya alag table better hoti.
- **Enums = "UI dropdown options ka source of truth" nahi.** DB validity enforce karte hain; UI labels (jaise "Full Time" display) alag mapping se aate hain — DB value `FULL_TIME` hai, screen pe "Full Time" dikha sakte ho.

---

**In Your Own Words**

1. `Company.ownerId` pe `@unique` lagane se relationship kaise badal gayi — bina unique ke kya hoti?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Bina `@unique` ke `ownerId` normal foreign key hoti — ek user multiple companies bana sakta (1:N). Unique lagane se ek `ownerId` value table mein sirf ek baar aa sakti — matlab ek user ki sirf ek company (1:1). Postgres mein one-to-one enforce karne ka standard tareeka hi yeh hai — FK pe unique constraint.

</details>

2. `@@unique([jobId, candidateId])` vs `@unique` single field pe — fark kya hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Single-field `@unique` us column ki har value unique maangta (do candidates same email nahi). Composite `@@unique` **combination** ko unique banata hai — `jobId=1, candidateId=5` allowed hai aur `jobId=1, candidateId=7` bhi allowed (different candidates, same job), par `jobId=1, candidateId=5` dobara nahi (duplicate apply block). Combination-level uniqueness junction tables ki zaroorat hoti hai.

</details>

3. Seed mein deletes child-first kyun — Application → Job → Company → User order pe kya hota agar User pehle delete karte?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Foreign key violation. `Company.ownerId` User.id reference karta hai — User delete karne pe wo row aisi ban jaati jiska reference hi exist nahi karta, isliye Postgres error deta ("update or delete violates foreign key constraint"). Isliye pehle deepest child (Application — do parents reference karta hai), phir Job, phir Company, phir User.

</details>

4. `matchScore Int?` nullable rakha — DB mein non-null kar dete toh kya concrete problem aati?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Apply flow mein AI call (C.9) DB insert ke around hoti hai. Agar score non-null hota, toh AI fail/rate-limit hone pe insert reject hoti — candidate ki application hi lost. Nullable se application pehle save hoti hai, score baad mein fill ho sakta hai (retry). Data integrity important-things-first principle: application > score.

</details>

5. `@@index([featured, createdAt])` kis exact query pattern ko serve karta hai, aur isse kab ignore bhi kar sakte the?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Home query pattern: `findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] })` — featured-first, newest-first sort. Index is composite sort ka pre-computed directory hai — scan ki jagah direct read. Chhote data (< few hundred rows) mein sequential scan bhi milliseconds mein hota — index ki value production volume pe dikhti hai. Over-indexing bhi cost hai (har insert slower), isliye soch ke lagate hain.

</details>

---

Foundation taiyar hai — project, database, 4 tables, seed data. Ab pehla **user-facing page**: home — featured jobs upar, search + filters, sab Server Component reads ke saath. C.3 mein hardcoded UI se shuru karenge, phir Prisma queries jodenge.

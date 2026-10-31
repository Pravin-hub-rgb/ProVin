# Batch 6 — Database Integration: WORKING PLAN

> This file is the **context file** while building the batch. Read it before writing any file — scope, decisions, structure, conventions — so the notes stay consistent and nothing is missed. Don't add this file to lecture registration (it guides the writer, not the student).

---

## 1. Batch Purpose (one line)

Starting from Batch 5's `profiles.json` pain, all the way to a real database: **why JSON files fail → what a database is → SQL vs NoSQL → ORM → two mini-projects (MongoDB REST + Neon/Drizzle Server Actions) → production-grade Task Board (Prisma + Neon).**

## 2. Locked Decisions (confirmed with the user)

- **Scope:** Full deep — **both MongoDB (NoSQL) and PostgreSQL (SQL)** hands-on. No shortcuts.
- **SQL provider:** **Neon** (serverless Postgres, connection string — matches your drizzle docs).
- **SQL ORM (mini-project):** **Drizzle** (`pgTable`, SQL-close, lightweight).
- **Combined Task Board:** **Prisma + Neon** (roadmap consistency, matches your prisma docs).
- **MongoDB ORM:** **Mongoose** (schema + model, from your doc-05.x).
- **Source material:** `C:\Users\Pravin\Desktop\main\Learn\nextjs_learn\backend\backend docs\` — `first mongodb`, `second drizzle`, `third prisma` tracks. **Concepts from there, but rewritten in course conventions** (gradual, file labels, `// NEW` markers).
- **Roadmap + 5.0:** Prisma/Supabase mentions need updating.

## 3. Data-Flow Pattern per Phase (the user's brainwave — IMPORTANT)

Two mini-projects = two different data-flow patterns. **Nothing force-fit.**

| Phase | DB | ORM | Data-flow | Why |
|---|---|---|---|---|
| Phase 2 | MongoDB | Mongoose | **REST (Route Handlers) + client fetch** | Postman testing + API design's natural home. Your MongoDB docs are already API-route style. |
| Phase 3 | Neon Postgres | Drizzle | **Server Components + Server Actions** | Roadmap R/S pattern. System design (relations/indexes) lives here. |
| Phase 4 (Task Board) | Neon Postgres | Prisma | **Server Components (reads) + Server Actions (mutations)** | Production pattern — the batch's finale. |

**Why Postman/API-design on Mongo?** Postman can only test REST URLs. Server Actions don't have a simple URL. So API design + Postman testing is built on the REST mini-project — no artificial REST layer on the Task Board.

## 4. File Structure (21 files)

### Phase 1 — Fundamentals (concept, no DB)
| File | Content | Source |
|---|---|---|
| **6.0** What We'll Learn | Batch intro (like 5.0): Batch 5 `profiles.json` pain → roadmap, data-flow pattern per phase, overview of two mini-projects + Task Board | — |
| **6.1** What a database is | File vs DB — why JSON files fail (data loss, no queries, no relations, concurrency), permanent warehouse | `doc-01` |
| **6.2** SQL vs NoSQL | Table/row/column vs collection/document, strict vs flexible, when to use which | `doc-01` + `drizzle 1.1` |
| **6.3** ORM + Providers | Raw query vs driver vs ORM/ODM; **Mongoose vs Drizzle vs Prisma**; providers **Neon vs Supabase vs Atlas vs SQLite** discussion | `prisma 1.1` + `drizzle 1.2` |

### Phase 2 — NoSQL Mini-Project: MongoDB + Mongoose + REST (5 files)
| File | Content | Source |
|---|---|---|
| **6.4** MongoDB Atlas + connection | Atlas account, cluster, connection string, env vars (`DATABASE_URL`), mongoose.connect | `doc-03` |
| **6.5** Mongoose schema + model | Todo interface → schema → model, `_id` | `doc-05.x` |
| **6.6** API Design | REST design: resource naming (`/api/todos`), method→semantics, status codes deep (200/201/204/400/404/500), error response shape, idempotency PUT vs POST | `doc-02` + Batch 3.1 expand |
| **6.7.1** Mongo GET + list UI | GET list route, client fetch (useEffect), TodoApp/TodoList components | `doc-07/08/09` |
| **6.7.2** Mongo POST + form UI | POST create route, request body, validation 400, AddTodoForm, re-fetch | `doc-07/08/09` |
| **6.7.3** Mongo DELETE + button UI | dynamic route `[id]`, await params, 404, TodoItem delete button | `doc-07/08/09` |
| **6.7.4** Mongo PUT + toggle UI | PUT update route, `{ new: true }`, checkbox toggle, full project summary | `doc-07/08/09` |
| **6.8** Postman Testing | Testing with REST client/Postman: status codes, headers, JSON body, error cases, CRUD flow | — |

### Phase 3 — SQL Mini-Project: Neon + Drizzle + Server Actions (7 files)
| File | Content | Source |
|---|---|---|
| **6.9** PostgreSQL + Neon setup | What SQL is (tables/rows/columns, primary key, SERIAL), Neon account, connection | `drizzle 1.1/1.2` |
| **6.10** Drizzle schema + client | `pgTable`, `db/index.ts`, connection | `drizzle 2.x` |
| **6.11.1** SQL Todo — Read (Server Component) | SC `db.select()`, async page, direct render | `drizzle 3.x` |
| **6.11.2** SQL Todo — Create (Server Action + Form) | `createTodo` SA, `<form action>`, `revalidatePath` | `drizzle 3.x` |
| **6.11.3** SQL Todo — Toggle + Delete (Server Actions) | `toggleTodo`/`deleteTodo` SA, checkbox client comp, `eq`/`where`, `not()`, `Number()` | `drizzle 3.x` |
| **6.11.4** SQL Todo — Mongo vs SQL Compare | **Mongo vs Postgres end-to-end compare table**, when to use which | — |
| **6.12** System Design | Relations (1:N foreign keys — users/todos), indexes/performance thinking, read vs write patterns, when REST vs Server Actions | — |

### Phase 4 — Combined Project #5: Task Board (Prisma + Neon) — production pattern
5-part series (series-prompt process):
| File | Content |
|---|---|
| **6.13.1** Planning | 4 questions (what, pages, data shape, flow), DB choice, routes table |
| **6.13.2** Hardcoded UI | UI first with static data |
| **6.13.3** Data Layer | Prisma schema (`prisma/schema.prisma`), client singleton (`lib/prisma.ts`), migrate |
| **6.13.4** Dynamic | SC reads (prisma.todo.findMany) + SA mutations (create/update/delete), revalidatePath |
| **6.13.5** States + Testing + Summary | loading/error states, test table, JSON→Mongo→SQL journey recap |

## 5. Writing Conventions (Batch 5 fixes carry forward — CRITICAL)

- **File label on every code block** — `// app/actions.ts` style comment inside the block + `**File:** app/...` line outside.
- **Full accumulating file per stage** — no code block that shows only the "new part". Show the whole file, mark new lines with `// NEW`.
- **Placement clarity** — explain "add it below X" in the context of the existing function, so the reader knows where to paste.
- **Gradual THINK → CONCEPT → CODE → TEST** in every step.
- **Compare/contrast table LAST** — first make each concept clear one by one, then the table.
- **If a new concept must be mentioned first**, say "we'll go into detail in the next topic" + give a simple working definition.
- **"In Your Own Words"** — 3-5 questions, only what was taught in this file, `<details>` accordion, logic test (not memorization).
- **"What It Is NOT"** section for every new concept.
- **Nutshell** for new concepts.
- **No real-life analogies** (removed batch-wide by the user) — only technical + friendly conversational tone.
- **React comparisons always generic** (never name a specific React course project).
- **`test-next` is never touched** — the user will use their own practice project (Task Board is a fresh project).

## 6. Code Style per Phase

- **Mongo (6.4-6.8):** `mongoose` package, `mongoose.connect(MONGODB_URI)`, schema `{ title: String, done: Boolean }`, `Route Handler` (REST) pattern.
- **Drizzle (6.9-6.12):** `drizzle-orm`, `pgTable`, `db/index.ts`, Server Components + Server Actions.
- **Prisma (6.13.x):** `prisma/schema.prisma` (PSL), `lib/prisma.ts` singleton, `prisma.todo.findMany/create/update/delete`, `npx prisma migrate dev`.

## 7. Consistency Updates Needed

1. `docs/coding/Next JS/Nextjs-Final-Roadmap.md` — Batch 6 section: add Mongo+REST mini-project + data-flow pattern per phase + Task Board Prisma/Neon (was: only Prisma/Supabase). Also update the Combined Project summary table.
2. `docs/coding/Next JS/Batch 5 - Authentication & Protected Access/5.0 Authentication — Kya Seekhenge.md` — line ~74 "Real DB (Prisma/Supabase) is in Batch 6" → update per Drizzle/Neon + Prisma.
3. `lib/subjects/nextjs.subject.ts` — append `batch5` phase (24 lectures: 6.0-6.12 with 6.7.x series = 4 files + 6.11.x series = 4 files = 19 files, 6.13.1-6.13.5 = 5 files). PLAN.md not registered.

## 8. Execution Order

6.0 → 6.1 → 6.2 → 6.3 → 6.4 → 6.5 → 6.6 → 6.7.1 → 6.7.2 → 6.7.3 → 6.7.4 → 6.8 → 6.9 → 6.10 → 6.11.1 → 6.11.2 → 6.11.3 → 6.11.4 → 6.12 → 6.13.1 → 6.13.2 → 6.13.3 → 6.13.4 → 6.13.5, user review after every file. Then roadmap + 5.0 + registration.

## 9. Verification Checklist (for the final pass)

- [ ] File label + placement context on every code block
- [ ] Full accumulating files + `// NEW` markers
- [ ] Compare tables LAST
- [ ] Phase data-flows match: Mongo=REST, SQL=Server Actions, Task Board=SC+SA
- [ ] Roadmap + 5.0 + subject.ts updated
- [ ] `test-next` untouched

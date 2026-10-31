# 📋 Plan Phase — Doc 2: PRD Template (Blank)
### For Every New Project — Copy, Fill

---

> This is a template to fill before starting any project.
> Copy it, rename it to `prd-[project-name].md`, and fill it in.
> Spend 20-30 minutes on this — it'll save hours of confusion later.

---

## 🏷️ Project Identity

```
PROJECT NAME     : ___________________________________

TYPE             : [ ] Web App   [ ] SaaS   [ ] Tool   [ ] Dashboard
                   [ ] E-commerce   [ ] Portfolio   [ ] Other: _______

ONE LINE         : "This is a _______ that does _______ for _______."

DEADLINE         : ___________________________________

SOLO / TEAM      : [ ] Solo   [ ] Team (size: ___)
```

---

## 👤 Target User

```
PRIMARY USER     : ___________________________________
  Who is it?     : ___________________________________
  Technical?     : [ ] Yes   [ ] No   [ ] Mixed
  Use case?      : ___________________________________

SECONDARY USER   : ___________________________________ (if any)
  Who is it?     : ___________________________________
```

**Example:**
```
PRIMARY USER     : Small business owners
  Who is it?     : Kirana shop, boutique — 1-5 employees
  Technical?     : No
  Use case?      : Track their inventory, see sales

SECONDARY USER   : Shop manager
  Who is it?     : Owner's trusted employee
```

---

## ✅ Core Features — MVP (Must Have)

> Rule: If this isn't there, the app doesn't work.

```
FEATURE 1: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 2: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 3: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 4: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________

FEATURE 5: ___________________________________
  Description  : ___________________________________
  Who uses it  : ___________________________________
```

---

## 🔮 Stretch Features — V2 (Nice to Have)

> Rule: The app can be delivered without these.

```
[ ] ___________________________________
[ ] ___________________________________
[ ] ___________________________________
[ ] ___________________________________
```

---

## 🚫 Out of Scope

> Rule: Explicitly write what NOT to build. This prevents scope creep.

```
❌ ___________________________________
❌ ___________________________________
❌ ___________________________________
```

---

## 🏗️ Architecture Decisions

> Write the **reason** along with every decision — not just the tool name.

```
FRAMEWORK        : ___________________________________
  Why?           : ___________________________________

RENDERING        : [ ] CSR  [ ] SSR  [ ] SSG  [ ] ISR  [ ] Mixed
  Why?           : ___________________________________

STATE MGMT       : ___________________________________
  Why?           : ___________________________________

DATABASE         : ___________________________________
  Why?           : ___________________________________

ORM              : ___________________________________
  Why?           : ___________________________________

AUTH             : ___________________________________
  Why?           : ___________________________________

API STYLE        : [ ] REST  [ ] Server Actions  [ ] tRPC  [ ] GraphQL
  Why?           : ___________________________________

FILE UPLOADS     : [ ] Yes → _____________   [ ] No
EMAILS           : [ ] Yes → _____________   [ ] No
REAL-TIME        : [ ] Yes → _____________   [ ] No
BACKGROUND JOBS  : [ ] Yes → _____________   [ ] No

HOSTING          : ___________________________________
  Why?           : ___________________________________
```

---

## 🗄️ Data Model

```
ENTITY 1: _______________
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type              | Notes
______________|___________________|_______________________
id            | UUID / SERIAL     | Primary Key
______________|___________________|_______________________
              |                   |
              |                   |
              |                   |
              |                   |
created_at    | TIMESTAMP         | Auto
updated_at    | TIMESTAMP         | Auto

ENTITY 2: _______________
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Field         | Type              | Notes
______________|___________________|_______________________
id            | UUID / SERIAL     | Primary Key
______________|___________________|_______________________
              |                   |
              |                   |
created_at    | TIMESTAMP         | Auto

RELATIONS:
→ ___________ has many ___________
→ ___________ belongs to ___________
→ ___________ and ___________ → Many-to-Many (via ___________ table)

INDEXES:
→ ___________ (reason: ___________)
→ ___________ (reason: ___________)
```

---

## 🔐 Auth & Roles

```
AUTH REQUIRED    : [ ] Yes   [ ] No

ROLES:
  Role 1: _____________ → Can: _________________ | Cannot: _________________
  Role 2: _____________ → Can: _________________ | Cannot: _________________
  Role 3: _____________ → Can: _________________ | Cannot: _________________

PUBLIC ROUTES    : (accessible without login)
  → ___________________________________
  → ___________________________________

PROTECTED ROUTES : (login required)
  → ___________________________________
  → ___________________________________
```

---

## 📋 Feature Breakdown

```
PHASE 1 — CORE MVP:

  [ ] Auth
      [ ] Signup
      [ ] Login
      [ ] Logout
      [ ] Protected route middleware

  [ ] [Main Feature Name]
      [ ] List / Read
      [ ] Create
      [ ] Edit
      [ ] Delete

  [ ] Edge Cases
      [ ] Empty state UI
      [ ] Loading state
      [ ] Error handling
      [ ] Form validation (client + server)

PHASE 2 — POLISH:
  [ ] ___________________________________
  [ ] ___________________________________
  [ ] ___________________________________

PHASE 3 — STRETCH:
  [ ] ___________________________________
  [ ] ___________________________________
```

---

## 🎯 Success Criteria

```
Project is complete when:
[ ] ___________________________________
[ ] ___________________________________
[ ] ___________________________________

Performance targets (optional):
[ ] Page load: ___ seconds
[ ] Lighthouse score: ___
[ ] Mobile responsive: Yes / No
```

---

## 🎙️ Interview Prep (STAR Method — Fill After Building)

> Fill this section AFTER building the project.
> Use it directly in the interview.

```
SITUATION:
"I built [project type] — [one line description].
 The problem was that [target user] had to face [pain point]."

TASK:
"I had to build a [solution] that fulfills [requirements].
 The scope included these features: [MVP features].
 I consciously kept [X] out of scope because [reason]."

ACTION (Technical Decisions):
"I chose [framework] because [reason].
 For state management I used [tool] because [reason].
 An interesting challenge was [describe challenge] —
 I evaluated [approach A] and [approach B],
 and chose [approach A] because [reason]."

RESULT:
"Final app had [key features].
 Achieved [specific metric or outcome].
 If I did it again, I'd handle [reflection] differently."
```

---

**Next Doc →** `plan-03-architecture-cheatsheet.md` — Quick reference: which tool in which situation.
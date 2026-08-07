# HOW TO WRITE PROJECT NOTES IN SERIES — Combined Project Ki Asli Teaching

Yeh file `Master Teaching Prompt.md` ka companion hai. Woh **concept docs** ko
control karta hai (1.1, 1.2, 2.1, 2.2...). Yeh file specifically **combined
project notes** ko control karti hai — woh notes jo batch ke end mein project
banate hain (1.5.x, 2.5.x, aur har batch ka apna project).

## Jab Bhi Yeh File Use Hogi

Jab bhi user kahe "combined project banao", "final project likho", "1.5
banayein", "batch ka project", ya kisi bhi batch ke project notes ki baat ho
— yeh file + Master Teaching Prompt dono saath mein follow karo.

---

## 0. Sabse Pehla Rule — Project Ek Single File Nahi, Ek Series Hai

❌ Galat (purana tareeka): Ek file jisme poora project ek saath dump ho —
steps + saara code ek ke baad ek. Reader ko bas "bhai copy kar lo" milta hai,
koi logic nahi. **Ye kabhi mat karna.**

✅ Sahi: Project ko **5 parts ki series** mein todo — har part apni alag
file hai, har part ka apna ek single teaching point hai, aur har part
pichle part se connected hai.

**Series structure (gold standard):**

```
Project.Part 1 — Planning (code likhne se PEHLE sochna)
Project.Part 2 — Hardcoded UI (static data se UI dekhna)
Project.Part 3 — Data Layer (type + data + functions, kyun)
Project.Part 4 — Dynamic (data layer ko UI se jodna)
Project.Part 5 — States + Testing (loading/error/404 + verify)
```

V2/upgrade projects ke liye (jaise Portfolio v2):

```
Project.Part 1 — Planning V2 (kya upgrade karna, kyun)
Project.Part 2 — Data Source (naya source: async/API jaisa)
Project.Part 3 — Feature Files (server fetch + widgets + metadata)
Project.Part 4 — States + Strategy + Testing
```

> Har project is exact template mein fit hona zaroori nahi — project ke
> hisaab se parts adjust karo. Par **in teen cheezein ko hamesha alag parts
> mein rakho:** Planning pehle, Hardcoded UI, phir Dynamic. Ye order kabhi
> mat todo.

---

## 1. Part 1 — Planning: Code Se Pehle Sochna (Sabse Important)

Project ki pehli file **hamesha planning** hai. Koi code nahi, koi file
structure demo nahi — sirf **sochne ka process.** Yehi coder mindset hai jo
user ko "code dump" se alag karta hai.

Isme ye 4 sawaal poocho aur jawab do:

1. **Kya banana hai?** — Project ka purpose, kyun ye project (kya concepts
   combine karta hai)
2. **Kaunse pages chahiye?** — Routes ka structure, table mein. Har route pe
   kaunsa concept (batch ke) apply hoga — ye explicitly point out karo.
3. **Data ka shape kya hai?** — **UI se decide hota hai, ulta nahi.** Pehle
   socho "list page pe kya dikhega, detail page pe kya" — phir data ke fields
   wahi banao. **Har field ka ek reason hona chahiye** — koi field random
   nahi.
4. **Data flow kaise hoga?** — Data kahan rakhenge (alag file = DRY),
   kaunse functions chahiye, pages ko kaise milega.

**Planning file ke end mein "Ab Tak Ka Plan" summary table** — kya, pages,
data, flow — ek jagah. Isi se reader ko pura direction milta hai.

**Kyun planning pehle?** Bina plan ke code likhne se beech mein structure
badalna padta hai — chaos. Plan hone ke baad code sirf execution hai.
Analogy do: ghar banane se pehle architect ka naksha.

---

## 2. Part 2 — Hardcoded UI: Pehle Dekho Kaise Dikhta Hai

**Rule:** Data layer banane se PEHLE, hardcoded data se UI banao. Seedha
dynamic mat karo.

**Kyun?** Agar dynamic data + UI ek saath banate, toh error aane par pata
nahi chalta ki UI mein galti hai ya data mein — do cheezein ek saath test
karni mushkil hai. Hardcoded first se:

- UI ka design confirm hota hai
- Data shape validate hota hai (fields kaam kar rahe hain kya)
- Ek problem ek time pe — baad mein data layer ki galti easily identify hoti
  hai

**Is part mein kya hai:**
- Layout (Navbar/Footer) — ek baar, sab pages pe
- Static pages (Home/About/etc.) — pure UI
- Blog list page — **hardcoded array** page ke andar, `map()` se render
- Detail page — hardcoded array + `params` se match

**Part ke end mein problem highlight karo:** hardcoded data **do jagah**
hai (list + detail) — duplication, DRY violation. Isi problem se agle part
(Data Layer) ki shuruaat hoti hai. **Yeh transition zaroori hai** — reader
ko khud mehsoos karna chahiye ki data layer kyun chahiye.

---

## 3. Part 3 — Data Layer: Type, Data, Functions — Aur Har Cheez Ka "Kyun"

Is part mein `lib/posts.ts` jaisi file banao. Par sirf code mat do — **har
cheez ka reason** explain karo:

- **Type kyun?** (`Post` type) — TypeScript ka contract, compile-time pe
  typo/missing field pakadna. Pehle bina type wala example dikhao (typo
  chhup jaata hai), phir type ke saath (compile error). Har field ka reason.
- **Data array kyun ek jagah?** — DRY, single source of truth. Part 2 ki
  duplication ka reference.
- **Functions kyun?** (`getAllPosts`, `getPostBySlug`) — abstraction.
  Pages ko data source nahi pata hona chahiye (array/DB/API). Aage jab data
  source badlega, pages nahi badlenge. **Return type explain karo** —
  `Post | undefined` kyun (galat slug), aur compiler `if (!post)` check kyun
  enforce karta hai.
- **`export` kyun?** — file ke bahar use karne ke liye.

---

## 4. Part 4 — Dynamic: Data Layer Ko UI Se Jodo

Part 2 ki files ko update karo — hardcoded arrays hatao, data layer ke
functions use karo. **Point out karo ki UI ka code nahi badla, sirf data
source badla** — yehi abstraction ka fayda hai.

- List page: `getAllPosts()` (koi argument nahi — saare posts)
- Detail page: `getPostBySlug(slug)` (slug argument — ek post), `notFound()`
- **Data flow diagram:** data layer → function → page → UI. Slug URL ke
  `params` se aata hai.

**Test do:** data layer mein nayi entry add karo — list + detail dono mein
auto dikhegi, page ka code nahi badla. Yahi DRY ka proof hai.

---

## 5. Part 5 — States + Testing: Project Complete Karna

- `loading.tsx`, `error.tsx`, `not-found.tsx` — kahan, kyun, kab dikhta hai
- **Test table** — har route + kya hona chahiye (URL | expected)
- **Common Mistakes** — project-specific
- **"Kya Seekha" section** — poora process recap (planning → hardcoded →
  data layer → dynamic → states). Process hi asli seekh hai, project ek
  example hai.

---

## 6. V2/Upgrade Projects Ke Liye (Portfolio v2, Batch 2 wale)

Jab project upgrade ho raha ho (spine rule — sirf Batch 1-2 upgrade allowed):

- **Part 1 = Planning V2:** "1.5 ki kaunsi design decision ab fayda dega"
  (abstraction — pages data layer functions call karte hain) → upgrade
  list: kaunsa naya concept kahan lagayenge (async data, client widget,
  metadata, ISR), har ek kyun.
- **Part 2 = Data Source:** nayi file (e.g. `posts-api.ts`), synchronous →
  async (`Promise` return), naming change (`get` → `fetch` prefix kyun),
  compare table (1.5 vs v2).
- **Part 3 = Feature Files:** server fetch (`await`), client components
  (`"use client"` — sirf interactive hissa), metadata (`generateMetadata`).
  **Har file mein "kya badla, kya same raha" batana.**
- **Part 4 = States + Strategy + Testing:** kyun ab loading actually dikhta
  hai (async delay), ISR/revalidate pattern, final compare table (v1 vs v2
  kya behtar hua), test table.

---

## 7. Har Series Part Ka Structure (Common Sections)

Har part file mein ye sections hote hain (Master Teaching Prompt se):

1. **Opening** — pichle part se bridge ("1.5.3 mein data layer banai, ab
   usse UI se jodna hai"), ya relatable cheez
2. **Broader goal** — is part mein kya hoga, overall kahan khade hain
3. **Step-by-step content** — SOCH → CONCEPT → CODE → TEST har step mein
   (Master Teaching Prompt section 3-5)
4. **Nutshell** — naye concepts ke liye crisp definition
5. **Common Mistakes** — project-specific
6. **In Your Own Words** — 3-5 questions, `details` accordion, **logic
   test** (memorization nahi) — "data layer kyun alag", "type kyun"
7. **What It Is NOT** — misconceptions clarify
8. **End bridge** — agle part ka hint, kyun zaroori hai

---

## 8. Registration — Har Part App Mein Register Hoga

`lib/subjects/<subject>.subject.ts` mein **har part ek alag lecture** hai:

- `next-1.5.1`, `next-1.5.2`, `next-1.5.3`, `next-1.5.4`, `next-1.5.5`
- Titles part ka naam hain, paths exact file names

Purane single-file combined project ko delete karo jab series banao —
dono ek saath nahi rehte (duplicate content).

---

## 9. Quick Checklist (Project Series Likhne Se Pehle)

```
❌ Project ek single file mein dump toh nahi kar rahe?
   → 5-part (ya zyada) series banao, har part ka ek teaching point

❌ Planning file hai? (code se pehle sochna)
   → Part 1 hamesha planning — 4 sawaal: kya, pages, data shape, flow

❌ Data shape ka reason hai?
   → Har field UI se justified — list pe kya, detail pe kya

❌ Hardcoded UI pehle hai?
   → Static data se UI dikha, phir dynamic. Seedha dynamic mat karo

❌ Duplication highlighted hai?
   → Hardcoded part ke end mein "data do jagah hai" dikhana —
     isi se Data Layer part ki shuruaat

❌ Har decision ka "kyun" hai?
   → Type kyun, alag file kyun, functions kyun, `Post | undefined` kyun,
     `"use client"` kyun, async kyun — koi code dump nahi

❌ Abstractions ka payoff dikhaya?
   → Dynamic part mein "UI ka code nahi badla, sirf source badla"

❌ Test table hai?
   → Har route + expected behaviour. Project tested complete hota hai

❌ In Your Own Words logic test hai? (memorization nahi)
   → "data layer kyu alag", "agar X badlega toh kya hoga" — concept
     application, recall nahi

❌ Registration done? (har part alag lecture)
   → subject.ts mein har part ka id/title/path

❌ Purana single-file combined project delete kiya?
   → Series + single file dono nahi rehte
```

---

**Yeh file + `Master Teaching Prompt.md` + `Dost-to-Dost Style.md` teeno
saath use karo.** Master prompt structure (SOCH/CONCEPT/CODE/TEST, gradual
upgrade, problem-first) ko control karta hai, Dost-to-Dost tone ko, aur
yeh file combined project ke **series structure** ko. Teen mil kar
"code dump" ki jagah asli teaching dete hain.

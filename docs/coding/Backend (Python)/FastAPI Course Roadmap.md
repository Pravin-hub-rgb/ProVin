# FastAPI Course Roadmap — Zero Se Real-Time Tak

## Ye Course Kiske Liye Hai

Socho tum ek restaurant mein jaate ho aur kitchen ke andar kabhi nahi gaye ho. Menu (frontend) pata hai, lekin kitchen (backend) mein order kaise banta hai, yeh pura naya hai. Tum khud bolo — *"mujhe backend ka koi idea nahi hai, Flask kya hai nahi pata, FastAPI kuch nahi pata."*

Iska matlab sirf ek cheez hai: hamein kahin se **bilkul zero** se shuru karna hai. Is course ka poora focus hai — pehle **backend ka mental model** banao (kya hai, kyun chahiye, duniya ke kitne options hain), phir **FastAPI** ko simply seekho, phir **real-time** (chat) wali duniya mein jao.

**Zaroori requirement:** Python basics aani chahiye (variables, functions, lists, dicts, loops). Agar nahi aati, toh pehle `docs/coding/python/` ka basics kar lo — is course mein Python syntax dobara nahi sikhaya jayega, sirf FastAPI ke andar *use* hoga.

**Kyun FastAPI aur Flask/Django/Express nahi?** Yeh sabse pehla sawaal hai jo koi backend seekhne wale ke mann mein aata hai. Iska pura jawab is course mein hai — aur saaf hai. Chalo ek baar wahi dekhein.
---

# Backend Framework Jungle Map — Sab Saare Options, Phir Humara Choice

Pehle ek chhoti si baat jo is pura course ka anchor banegi. Jab bhi backend ka naam aata hai, log itne saare naam sunte hain — Flask, FastAPI, Django, Express, NestJS. Pehli baar dar lagta hai: *"bhai yeh sab kya hain, kaunsa seekhu?"*

Isliye ek hi jagah, poora **jungle ka map** bana deta hoon. Yeh map is course mein **sirf yahan** hai — iske baad hum seedha FastAPI full-detail mein seekhenge. Sirf ek baar dekhne ka hai, taaki tumhara mental picture clear ho.

## Backend framework ka family tree

```
BACKEND BANANE KE LIYE FRAMEWORK (toolbox jo server sambhalta hai)
│
├── Python wali family
│   ├── Flask    → 1. simple, purana — easy, lekin modern cheezein khud likhni padti hain
│   ├── FastAPI  → 2. MODERN — auto docs + validation + real-time + TUMHARA PROJECT         YAHI HUM
│   └── Django   → 3. bada "sab-kuch-shaamil" — enterprise, powerful lekin beginner ke liye bhaari
│
└── JavaScript wali family (Node.js ke andar) — bas context ke liye
    ├── Express  → 4. sabse famous legacy (React/Node stream mein milega)
    ├── Fastify / Hono → 5. naye, fast, TypeScript-friendly
    └── NestJS   → 6. enterprise TypeScript, structured
```
## Hum FastAPI kyun — saaf decision

| Framework | Kya hai | Beginner ke liye | Hum kyun chun rahe / kyun nahi |
|-----------|---------|------------------|-------------------------------|
| **Flask** | Chhota, simple Python framework — purani style | Aasaan par purana | Seekhna easy, par auto `/docs`, built-in validation, async real-time yeh sab khud add karne padte. Aaj ke projects isse kam use karte hain. |
| **FastAPI** | Modern Python framework | Modern + sahi starting | YAHI use karenge. Auto docs (`/docs`) free, built-in validation (galat data reject), async real-time (WebSocket) — aur sabse bada reason: **tumhara TradeStack bilkul isi pe bana hai** (`backend/server.py`). |
| **Django** | Bada "batteries-included" framework | Powerful par bhaari | Beginner ke liye bahut zyada layered lagega. Baad mein explore kar sakta hai. |
| **Express** | JavaScript framework | — | Backend Python mein seekh raha hai, isliye abhi nahi. |

**Ek line mein:** Flask too old, Django too big, Express not Python — **FastAPI = perfect beginner + real project (TradeStack).**

## Aage explore karna ho toh (aage ka rasta clear)

Ek khulasa: **saare backend frameworks same concepts use karte hain** — URL se data lena, data validate karna, database se baat karna, real-time. Sirf **syntax aur tools alag hain.** Ek baar tum FastAPI seekh loge toh:

- **Flask explore karega toh:** wahi path params, wahi verbs (GET/POST), bas `@app.route('/user/<id>')` style. Same base, alag spelling.
- **Django explore karega toh:** bada structure milega (models, admin, ORM), lekin REST ke wahi concepts honge.
- **Node side (Express) explore karega toh:** wahi HTTP, wahi request/response — bas JavaScript mein.

Toh tum FastAPI se jo seekhega, kabhi waste nahi jayega. Aur aage-ka-aage ka decision (kaunsa framework lena hai) bhi in-concepts dekh kar hi le.



# Course Ka Structure — Phases aur Projects

Course ko 4 phases mein baanta hai. Har phase apna ek complete mini-project deta hai. Koi phase chhota nahi.

## PHASE 0 — Backend Mindset (koi project nahi, pure samajh)

Sabse important. Isse pehle ki hum FastAPI code likhein, hume samajhna hoga ki backend ki duniya mein kya-kya hai. Is phase mein koi project nahi — bas foundation.

| # | Topic | Kya seekhega |
|---|-------|--------------|
| 0.0 | Course kaise chalega + backend ki map | Puri journey ka overview, backend jungle-darshan |
| 0.1 | Client–Server model | Kya hota hai jab tum URL kholte ho (restaurant analogy) |
| 0.2 | HTTP ke basics | Request, Response, GET/POST, status codes |
| 0.3 | API + JSON | Kya hai, kaise dikhta hai, kyon chahiye |
| 0.4 | Flask vs FastAPI — jungle map + choice | Tera pehla sawaal ka jawab — sabse important note |
| 0.5 | Setup + pehla FastAPI app | venv + pip + Hello World, `/docs` pe Swagger UI |

**Phase 0 ke end tak:** backend ka clear map, Flask vs FastAPI samajh, pehla FastAPI app browser mein chal raha (`/docs` Swagger wali duniya).
---

## PHASE 1 — Simple Project: Todo/Notes API (CRUD + SQLite)

Yeh tumhara woh "simple project" hai jo tumne maanga tha — par yeh kaafi deep jaata hai, kyunki yahan FastAPI ke core features cover hote hain, aur data ko **save** karte hain (SQLite — wahi jo TradeStack use karta hai).

Har concept ek **"Manual → Better"** pair mein likha hoga — pehle seedha/purana tareeka (jo dard deta hai), phir FastAPI ka better solution. Isse "why" genuinely clear hota hai.

| # | Concept | File |
|---|----------|------|
| 1.1 | Path & Query params | URL se data lena |
| 1.2 | Pydantic + Request Body | Data validate karna, POST se data bhejna |
| 1.3 | CRUD (Create/Read/Update/Delete) | Poora task lifecycle |
| 1.4 | SQLite se jodo | Data save karna (restart pe bhi rahe) |
| 1.5 | **Combined Project: Todo API** | Sab ek saath — CRUD + SQLite + docs |

**Combined Project:** chhota lekin complete API. Tasks banao, list karo, update karo, delete karo. Data ek SQLite file mein save hota hai — server band karke dobara chalao, data wapas milta hai. Browser ke `/docs` se pura test karo — koi extra frontend nahi chahiye.

## PHASE 2 — Real-time: Chat App (WebSocket)

Yeh tumhara "chatting wala" hai. Yahan FastAPI ki asli power khulti hai — HTTP nahi, balki **persistent live connection** (WebSocket). Isi ka bada version TradeStack ke **Live Trader** mein hai jo Upstox se live market ticks laata hai.

| # | Topic | File |
|---|--------|------|
| 2.1 | HTTP polling kyun dard, WebSocket kya | Real-time ka mental model |
| 2.2 | WebSocket basics — pehla chat endpoint | Live connection banana |
| 2.3 | ConnectionManager / broadcast | Ek message sab clients ko |
| 2.4 | Chat rooms / multiple clients | Multiple browser tabs ek room |
| 2.5 | **Combined Project: Chat Room** | Real chat app, HTML page se |

**Combined Project:** multiple browser tabs (clients) ek room se connect hote hain, ek aadmi ka message baaki sab ko turant (real-time) dikhta hai. Live streaming ka mental model yahan pakad jayega — wahi jo TradeStack live trader mein hai.

## PHASE 3 (Capstone) — TradeStack Backend Pe Apply

Jo seekha use apne asli project pe maaro:
- `~/Desktop/Main/TradeStack/backend/server.py` kholo — 50+ endpoints ka structure samjho (Phase 1-2 ka combination)
- `backend/src/settings.py`, `db.py`, `cache_manager.py` — SQLite + FastAPI production mein kaise use hota hai
- Ek chhota isolated experiment karo

**Dhyan:** Phase 3 mein **koi production code change nahi** — sirf reading + notes + chhota experiment. TradeStack ka kaam kabhi mat todo.

---

## Combined Projects Summary

| Phase | Project |
|-------|---------|
| 0 | *(koi project nahi — pure foundation)* |
| 1 | Todo API (CRUD + SQLite) |
| 2 | Chat Room App (WebSocket) |
| 3 | TradeStream Backend Deep-Read |

## "Manual → Better" Pairs

| Pehle (dard) | Phir (FastAPI) |
|---|---|
| URL params khud parse karna | FastAPI path/query params (auto validation) |
| Data khud validate if/else | Pydantic models (auto 422 reject) |
| Data dictionary (restart pe khatam) | SQLite persistence (restart pe bhi) |
| HTTP polling (har second) | WebSocket (persistent live) |

## What This Course Is NOT

- ❌ **Flask course** — Flask sirf 0.4 mein comparison ke liye, build FastAPI se.
- ❌ **Django course** — sirf jungle map mein pehchaan.
- ❌ **Advanced SQL course** — sirf SQLite basics.
- ❌ **Python syntax course** — Python pehle kar lo.
- ❌ **Frontend course** — sirf ek HTML page chat test.
- ❌ **Deployment/production course** — alag phase baad mein.

---

## Baad Ke Liye

- BackgroundTasks + Threading (TradeStack long scans)
- Pydantic advanced (validators, nested)
- SQLite advanced / WAL / Postgres
- Docker deployment
- SSE (Server-Sent Events) — TradeStack live logs

## Har Note Ka Standard Form

1. Relatable cheez se open
2. Pichli file se connect
3. SOCH → CONCEPT → CODE → TEST
4. Nutshell — 2 line mein
5. Common Mistakes
6. "In Your Own Words" — `<details>` sample jawab
7. What It Is NOT
8. Next-file bridge

**Register:** Har phase khatam hone pe `lib/subjects/fastapi.subject.ts` mein register. Roadmap lecture hamesha pehla.

---

Toh yeh hai poora plan. Ab chalein — **Phase 0 (Backend Mindset)** se. Pehla note: `0.0`.
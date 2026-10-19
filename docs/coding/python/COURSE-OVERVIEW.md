# Python Basics — Course Overview (Lec 1 to 7)

Ye course Python ke fundamentals cover karta hai — zero se lekar file handling tak. Har lecture me teen cheezein milti hain: **Notes** (concept), **Practice Set** (khud karo), aur **Solutions** (check karo).

Har lecture ka structure yeh hai:

| Doc | Kya hai | Kab padho |
|-----|---------|-----------|
| **Notes** | Concept + examples + explanation | Pehle — theory samajh ke |
| **Practice Set** | Khud solve karne wale questions | Notes ke baad — bina dekhe |
| **Solutions** | Har question ka worked answer | Practice karne ke BAAD — tabhi seekhoge |

**Rule:** Solutions kabhi pehle mat kholna. Warna tum copy karoge, seekhoge nahi. Jo galtiyan tum practice me karoge — wahi asli sikhati hain. Solutions sirf tab dekho jab atak gaye ho ya practice kar liya ho.

---

## Lectures Kya Cover Karti Hain

### Lec 1 - Variables & Functions
Python me data kaise hold karte ho (`int`, `float`, `string`), aur logic kaise bundle karte ho (`def`, `return`). Ye course ka foundation hai — baaki sab isi pe bana hai.

### Lec 2 - Conditionals
`if / elif / else` — program ko decision lene dena. Real me har business logic me ye hota hai: *"agar user logged in hai toh dashboard dikha, warna login page."*

### Lec 3 - Loops
`for` aur `while` — same kaam baar baar karna. Ek list ke har item pe kaam karna, ya koi condition tak repeat karna. Real data processing ka 80% time yahi lagta hai.

### Lec 4 - Exceptions
`try / except` — error aaye to crash na ho. Yeh backend ka sabse zaroori concept hai. Ek API pe 1000 requests aayein, koi ek me error aaya — bina exceptions ke poora server gir jayega.

### Lec 5 - Modules
Apna code alag files me baantna aur `import` karna. Real project me ek file me sab nahi hota — har cheez apni file me, aur beech me `import`. TradeStack me `server.py` sirf routes hai, logic `src/` folder me hai — wahi modules concept hai.

### Lec 6 - Unit Testing
`pytest` se apne code ko test karna — matlab khud se confirm kiya ki "ye function galat input pe sahi behave kar raha hai." Yeh woh skill hai jo code likhne ke baad dikhati hai ki tumhe bharosa hai apne code pe.

### Lec 7 - File IO
Files se data padhna aur likhna (`open`, `read`, `write`, CSV). Backend me data har jagah files me hota hai — SQLite usi ka advanced version hai. Ye lecture un basics par hai jo FastAPI Phase 1 me SQLite se connect hongi.

---

## Course Kahan Se Jaata Hai

Ye 7 lectures complete karne ke baad tum **backend side** jaate ho:

```
Python Basics (Lec 1-7)        <- tum yahan ho / yahan khatam karo
        ↓
Backend Mindset (FastAPI 0.0-0.5)  <- backend kya hai, client-server, HTTP, FastAPI intro
        ↓
FastAPI Basics (Phase 1.0-1.5)    <- apna trading backend banano
        ↓
FastAPI Phase 2 - WebSocket     <- real-time
        ↓
FastAPI Phase 3 - TradeStack apply  <- apne asli project pe lagana
```

**Backend mindset me jane se pehle Lec 1-6 zaroor kar lo.** Exceptions aur Modules especially — FastAPI ke bina unse kuch nahi hoga. Lec 4 (Exceptions) aur Lec 5 (Modules) padhe bina Phase 0 ka `0.5 Setup` bhi confuse lagega.

---

## Recommended Pace

| Din | Kya karna hai |
|-----|--------------|
| 1 | Lec 1 — Notes + Practice Set (Solutions baad me) |
| 2 | Lec 1 — Solutions check karo, Lec 2 Notes start |
| 3-4 | Lec 2 + Lec 3 |
| 5-6 | Lec 4 (Exceptions — thoda extra time le, backend ke liye critical hai) |
| 7-8 | Lec 5 (Modules) + Lec 6 (Unit Testing) |
| 9 | Lec 7 (File IO) |

Roz 2-3 ghante = **~9 din**. Jaldi nahi hai — fundamentals strong hone se FastAPI Phase 1 aaram se aayega.

---

## Related

- `FastAPI Course Roadmap` — backend course ka full map
- `Phase 0 - Backend Mindset` — backend side shuruaat
- `Phase 1 - FastAPI Basics (CRUD + SQLite)` — apna trading backend

> **Transcript files** (`transcript.md` har folder me hain) raw audio-to-text dumps hain — padhne layak nahi, sirf reference ke liye. Notes hi padhne wale docs hain.
06 mein humne raw HTTP server banaya aur dekha — har code change pe restart karna padta hai. Aur ek cheez jo humne abhi tak chhupayi hai — **API keys aur database URLs code mein hardcode nahi karne chahiye.**

Socho agar tumne DukaanOS mein Supabase URL aur trading bot mein Upstox API keys code mein daal di hain, aur GitHub pe push kar diya — toh koi bhi tumhara code dekh ke tumhari secrets chura sakta hai. Iska fix hai **environment variables** (`.env`).

## Secret Hardcode Karna Galat Kyun

```javascript
// ❌ GALAT — secret code mein
const DATABASE_URL = "postgresql://admin:password123@db.example.com:5432/mydb";
```

Problem:
- GitHub pe push karo → secret public ho gaya
- Production aur development ka alag connection chahiye → code badalna padega
- Kisi aur ko code do → tumhara database password mil gaya

## Environment Variables — `.env` File

Sensitive/config values ko alag file mein rakho — **`.env`** — jo code mein nahi hoti, environment se aati hai.

**Step 1:** `.env` file banao (project root mein):

```bash
# .env
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret123
PORT=3000
```

**Step 2:** Code mein `process.env` se read karo:

```javascript
// server.js
console.log(process.env.DATABASE_URL);
console.log(process.env.API_KEY);
```

**Kya hua:** `.env` file load hui (Node 20+ mein `--env-file` flag, ya `dotenv` package se), values `process.env` mein aa gayi, aur code se access ki.

Node 20+ mein built-in:

```bash
node --env-file=.env server.js
```

Ya `dotenv` package se (jo Next.js/Express projects mein common hai):

```bash
npm install dotenv
```

```javascript
require('dotenv').config();  // .env load karo
```

## Yeh Values Kahan Se Aati Hain

Environment variables **code se alag** rehti hain — wo environment se milti hain:

| Environment | Kahan se value |
|---|---|
| Tumhara local machine | `.env` file |
| Vercel/Production | Vercel dashboard (Settings → Environment Variables) |
| CI/CD (GitHub Actions) | GitHub secrets |

**Same code, alag values.** Code mein `process.env.DATABASE_URL` likho — local mein apna DB, production mein production DB. Code change nahi karna padta.

**Important:** `.env` file kabhi Git mein commit nahi karni:

```gitignore
# .gitignore
node_modules
.env
```

`.env.example` (bina real values ke) commit karte hain — taaki team ko pata ho kaunsi variables chahiye:

```bash
# .env.example (safe, commit karo)
DATABASE_URL=your-database-url-here
API_KEY=your-api-key-here
```

## Ye Tum Pehle Se Use Kar Rahe Ho

Tumhara **DukaanOS** (Supabase URL/keys), **trading bot** (Upstox API keys) — wo sab `.env` mein hote hain. **Next.js** mein `NEXT_PUBLIC_` prefixed vars client ko dikhte hain, bina prefix ke sirf server pe rehte hain (Batch 7 security mein detail). Ab tumhe pata hai — *kyun* `.env` use karte hain: code alag, secrets alag, har environment apni values.

## Scripts + Nodemon — Restart Ki Takleef Khatam

06 mein notice kiya tha — server change pe restart karna padta hai. Isko solve karta hai **nodemon** (development tool):

```bash
npm install -D nodemon
```

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Ab:

```bash
npm run dev
```

`nodemon` file changes pe **automatically server restart** kar deta hai — Ctrl+C aur `node server.js` ki zaroorat nahi. Tum `server.js` save karo, woh khud restart hoke naya code run karta hai.

> **Ye Next.js ke `npm run dev` jaisa hi concept hai** — hot reload. Next.js mein bhi file save karte hi page refresh hota hai. Framework wahi convenience built-in deta hai.

## The Bridge — Raw Node se Next.js Tak

Ab tumne sab kuch manual dekha hai. Ab ek quick mental bridge banao — **raw Node ka kaam Next.js kaise automate karta hai:**

| Raw Node (abhi kiya) | Next.js (aage use hoga) |
|---|---|
| Routing `if (req.url === '/')` | **File-based routing** — folder + `page.tsx` = route |
| `res.end(JSON.stringify(...))` manual | API routes / Server Actions built-in |
| `require`/`import` modules | Wahi modules system |
| Async `await fetch()` manual | Server Components mein direct `await fetch()` |
| `.env` manually (`dotenv`) | Next.js `.env` built-in support |
| `nodemon` auto-restart | `npm run dev` hot reload |

**Asli baat:** Next.js mein jo "magic" dikhta hai (folder = route, server components, API routes), uska seedha connection raw Node ke in manual kaam se hai. Ab jab Next.js course mein routing ya data fetching dekho, samjho — *"yeh wahi hai jo raw Node mein if/else aur JSON.stringify se karta tha, bas framework ne automate kar diya."*

## Quick Revision Checklist

- [ ] Node.js kya hai, browser se alag kyun hai
- [ ] `require` vs `import/export` — dono syntax likh sakte ho
- [ ] npm, `package.json`, `node_modules`, `.gitignore` ka role
- [ ] Event Loop — single-threaded but non-blocking kyun
- [ ] Callback → Promise → async/await — teeno likh sakte ho
- [ ] Raw `http` module se server bana sakte ho
- [ ] `.env` file kyun use karte hain
- [ ] Bridge — "raw Node ka manual kaam Next.js kaise automate karta hai"

## Common Mistakes

- ❌ `.env` ko Git commit karna — secrets leak. `.gitignore` mein daalo, `.env.example` commit karo.
- ❌ Secret ko `console.log` karke debug karna aur bhoolna — log files mein secret reh gaya. Production logs se bachao.
- ❌ `.env` mein spaces/quotes galat lagana (`API_KEY = x` vs `API_KEY=x`) — kuch parsers strict hain. Bina spaces, bina quotes likho.
- ❌ `.env` ko change karke server restart na karna — dotenv startup pe load karta hai. Change ke baad restart zaroori (nodemon auto karega).
- ❌ Production secrets ko bhi `process.env` ki jagah code mein daalna — `.env`/environment hi sahi jagah hai.

## In Your Own Words

1. Secrets code mein hardcode karna galat kyun hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Kyunki code GitHub pe push hota hai — secret public ho jata hai. Aur production vs development ke alag connections hain — code mein hardcode karoge toh har environment ke liye code badalna padega. `.env` mein rakho — code alag, secrets alag.

</details>

2. `process.env.DATABASE_URL` kya karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Node ki environment variables se value read karta hai. `.env` file se (dotenv se load karke) ya deployed environment se value aati hai. Code mein value nahi, sirf reference hota hai.

</details>

3. `.env` ko `.gitignore` mein kyun daalte hain aur `.env.example` kyun commit karte hain?

<details>
<summary>Sample Jawab</summary>

**Jawab:** `.env` mein real secrets hain isliye commit nahi karte — nahi toh leek honge. `.env.example` mein placeholder values hain jo safe hain — isse team ko pata chalta hai kaunsi variables set karni hain.

</details>

4. Nodemon kya karta hai aur ye Next.js ke `npm run dev` se kaise relate karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Nodemon file changes pe automatically server restart karta hai — manually Ctrl+C + `node server.js` nahi karna padta. Next.js ka `npm run dev` bhi hot reload deta hai — same convenience, built-in.

</details>

## What It Is NOT

⚠️ **`.env` = secure storage nahi.** Ye file unencrypted hai. Iska protection `.gitignore` aur machine access control se hai. Service (Vercel, Supabase) ke secrets managers hi asli secure storage hain.

⚠️ **Environment variables = sirf secrets nahi.** Config ke liye bhi use hoti hain — port number, environment name, feature flags. Koi bhi value jo environment se environment badalti hai.

⚠️ **Nodemon = production tool nahi.** Ye sirf development mein use hota hai (`-D` devDependency). Production mein `node server.js` (ya `npm start`) chalta hai.

⚠️ **Node.js = pura backend nahi seekh liya.** Ye 3-din ka foundation tha — modules, async, server basics, env. Express, databases, auth, security — aage ke batches/courses mein. Par **base strong hai** — ab koi bhi JS server-side cheez padhoge, connect kar paoge.

---

Node.js ka primer complete! Ab tumhare paas:
- JavaScript browser ke bahar (Node)
- Modules aur npm
- Event Loop aur async patterns (callbacks, Promises, async/await)
- Raw HTTP server
- Environment variables

Yeh sab milke **wo foundation hai jispe Next.js khada hai**. Ab jab Next.js course chalao — Server Components, API routes, data fetching — har concept ke peeche tumhe wahi Node ki cheez dikhegi. Ready ho. Chalo, Next.js ke safar pe!
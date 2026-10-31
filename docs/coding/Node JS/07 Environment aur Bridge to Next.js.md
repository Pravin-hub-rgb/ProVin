In the previous file we built a raw HTTP server and saw — you have to restart on every code change. And one more thing we've been hiding — **API keys and database URLs should not be hardcoded in code.**

Imagine you put the Supabase URL in DukaanOS and the Upstox API keys in your trading bot directly in code, and pushed to GitHub — anyone reading your code could steal your secrets. The fix is **environment variables** (`.env`).

## Why Hardcoding Secrets Is Wrong

```javascript
// ❌ WRONG — secret in code
const DATABASE_URL = "postgresql://admin:password123@db.example.com:5432/mydb";
```

Problems:
- Push to GitHub → the secret goes public
- Production and development need different connections → you'd have to change code
- Give the code to someone → they get your database password

## Environment Variables — The `.env` File

Keep sensitive/config values in a separate file — **`.env`** — which isn't in the code; it comes from the environment.

**Step 1:** Create a `.env` file (in the project root):

```bash
# .env
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret123
PORT=3000
```

**Step 2:** Read it in code via `process.env`:

```javascript
// server.js
console.log(process.env.DATABASE_URL);
console.log(process.env.API_KEY);
```

**What happened:** The `.env` file got loaded (via the `--env-file` flag in Node 20+, or via the `dotenv` package), the values landed in `process.env`, and the code accessed them.

Node 20+ has it built in:

```bash
node --env-file=.env server.js
```

Or via the `dotenv` package (common in Next.js/Express projects):

```bash
npm install dotenv
```

```javascript
require('dotenv').config();  // load .env
```

## Where Do These Values Come From

Environment variables **live outside the code** — they come from the environment:

| Environment | Where the value comes from |
|---|---|
| Your local machine | `.env` file |
| Vercel/Production | Vercel dashboard (Settings → Environment Variables) |
| CI/CD (GitHub Actions) | GitHub secrets |

**Same code, different values.** Write `process.env.DATABASE_URL` in the code — local gets your DB, production gets the production DB. No code change needed.

**Important:** The `.env` file is never committed to Git:

```gitignore
# .gitignore
node_modules
.env
```

Commit `.env.example` (without real values) — so the team knows which variables are needed:

```bash
# .env.example (safe, commit this)
DATABASE_URL=your-database-url-here
API_KEY=your-api-key-here
```

## You're Already Using This

Your **DukaanOS** (Supabase URL/keys) and **trading bot** (Upstox API keys) — all of that lives in `.env`. **Next.js** has `NEXT_PUBLIC_` prefixed vars visible to the client, while unprefixed ones stay server-only (detailed in Batch 7 security). Now you know **why** `.env` is used: code separate, secrets separate, each environment its own values.

## Scripts + Nodemon — Ending the Restart Pain

Notice from file 06 — you have to restart the server on every code change. **nodemon** (a dev tool) solves this:

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

Now:

```bash
npm run dev
```

`nodemon` **automatically restarts the server on file changes** — no need for Ctrl+C and `node server.js`. You save `server.js`, and it restarts and runs the new code on its own.

> **This is the same concept as Next.js's `npm run dev`** — hot reload. In Next.js too, the page refreshes when you save a file. The framework gives the same convenience built in.

## The Bridge — From Raw Node to Next.js

Now you've seen everything manually. Build a quick mental bridge — **how does Next.js automate raw Node's manual work:**

| Raw Node (what we just did) | Next.js (what you'll use next) |
|---|---|
| Routing with `if (req.url === '/')` | **File-based routing** — folder + `page.tsx` = route |
| Manual `res.end(JSON.stringify(...))` | API routes / Server Actions built in |
| `require`/`import` modules | Same module system |
| Manual async `await fetch()` | Direct `await fetch()` in Server Components |
| Manual `.env` (`dotenv`) | Next.js has `.env` support built in |
| `nodemon` auto-restart | `npm run dev` hot reload |

**The real point:** The "magic" you see in Next.js (folder = route, server components, API routes) connects directly to this manual work in raw Node. Now when you see routing or data fetching in the Next.js course, you'll think — *"this is the same thing I did with if/else and JSON.stringify in raw Node, just automated by the framework."*

## Quick Revision Checklist

- [ ] What Node.js is and why it's different from the browser
- [ ] `require` vs `import/export` — you can write both
- [ ] npm, `package.json`, `node_modules`, `.gitignore` roles
- [ ] Event Loop — why single-threaded but non-blocking
- [ ] Callback → Promise → async/await — all three
- [ ] Raw `http` module server
- [ ] Why `.env` is used
- [ ] Bridge — "how raw Node's manual work is automated by Next.js"

## Common Mistakes

- ❌ Committing `.env` to Git — secrets leak. Put it in `.gitignore`, commit `.env.example`.
- ❌ Debugging by `console.log`-ing a secret and forgetting — the secret stays in log files. Keep secrets out of production logs.
- ❌ Wrong spaces/quotes in `.env` (`API_KEY = x` vs `API_KEY=x`) — some parsers are strict. Write without spaces, without quotes.
- ❌ Not restarting the server after changing `.env` — dotenv loads at startup. Restart after changes (nodemon will do it automatically).
- ❌ Putting production secrets in code instead of `.env`/environment — `.env`/environment is the right place.

## In Your Own Words

1. Why is hardcoding secrets in code wrong?

<details>
<summary>Sample Answer</summary>

**Answer:** Because code gets pushed to GitHub — the secret goes public. And production vs development need different connections — hardcoding means changing code for every environment. Keep them in `.env` — code separate, secrets separate.

</details>

2. What does `process.env.DATABASE_URL` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Reads the value from Node's environment variables. The value comes from the `.env` file (loaded via dotenv) or the deployed environment. The code holds only a reference, not the value.

</details>

3. Why put `.env` in `.gitignore` and commit `.env.example`?

<details>
<summary>Sample Answer</summary>

**Answer:** `.env` has real secrets, so we don't commit it — otherwise they'd leak. `.env.example` has placeholder values that are safe — it tells the team which variables need to be set.

</details>

4. What does nodemon do and how does it relate to Next.js's `npm run dev`?

<details>
<summary>Sample Answer</summary>

**Answer:** Nodemon automatically restarts the server on file changes — no manual Ctrl+C + `node server.js`. Next.js's `npm run dev` also gives hot reload — same convenience, built in.

</details>

## What It Is NOT

⚠️ **`.env` is NOT secure storage.** The file is unencrypted. Its protection comes from `.gitignore` and machine access control. The service's own secret managers (Vercel, Supabase) are the real secure storage.

⚠️ **Environment variables are NOT only for secrets.** They're used for config too — port number, environment name, feature flags. Any value that changes from environment to environment.

⚠️ **Nodemon is NOT a production tool.** It's used only in development (`-D` devDependency). In production, `node server.js` (or `npm start`) runs.

⚠️ **Node.js is NOT "all of backend learned".** This was a 3-day foundation — modules, async, server basics, env. Express, databases, auth, security — come in later batches/courses. But the **base is strong** — whatever JS server-side thing you read next, you'll be able to connect it.

---

Node.js primer complete! Now you have:
- JavaScript outside the browser (Node)
- Modules and npm
- Event Loop and async patterns (callbacks, Promises, async/await)
- Raw HTTP server
- Environment variables

All of this together is **the foundation Next.js stands on**. When you run the Next.js course — Server Components, API routes, data fetching — you'll see Node's concepts behind every one of them. You're ready. Let's go on the Next.js journey!
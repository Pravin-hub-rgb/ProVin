# Node.js Primer — Module 0 (Before the React/Next Course)

> Scope: A 2-3 day foundation — not learning all of Node.js, just enough to understand so that React/Next.js concepts (npm, modules, async, server-side execution) feel clear when you reach them.
> Approach: "Manual → Better" — first do it the raw/manual way, then understand why shortcuts/libraries exist.

---

## Day 1 — What Node Is + Module System + npm

### 1. What Node.js Is (concept, 15 min)

JavaScript used to run **only inside the browser**. Node.js is a runtime that lets JavaScript run **outside the browser** — directly on your computer/server. It's based on Chrome's V8 engine.

**Why it matters for React/Next:** Next.js itself runs on Node (server-side rendering, API routes all happen through Node). When you run `npm run dev`, it's Node running in the background.

**Practical:** Type `node` in the terminal — the REPL (interactive shell) opens. Try `1 + 1`, `console.log("hi")` there — it's JavaScript, just running without a browser.

### 2. Running a File (15 min)

```bash
node app.js
```

Create a simple `app.js`:
```javascript
console.log("Running from Node");
```

Run it and see the output. Simple, but this teaches you what Next.js is doing internally when it builds/runs.

### 3. Module System — `require`/`module.exports` and `import`/`export` (1-1.5 hours, IMPORTANT)

Node has two module systems — understanding both is essential because you'll use the modern syntax in Next.js, but older Node code/tutorials will have the old syntax.

**CommonJS (old, `require`)**:
```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3));
```

**ES Modules (new, `import`/`export`)** — this is what you'll use in React/Next:
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(2, 3));
```

**Practical exercise:** Build a small `utils.js` with 2-3 functions (like `formatPrice`, `calculateDiscount`), export them, import and use them in another file. Try both syntaxes so the difference is clear.

**Interview/learning tip:** Next.js uses ES Modules by default (`import`/`export`). If you ever see an old Node package using `require`, don't panic — it's just a different syntax, the job is the same.

### 4. npm — Node Package Manager (1 hour)

**What it is:** A registry from which you can install ready-made code (packages/libraries) without writing it yourself.

```bash
npm init -y          # start a new project (creates package.json)
npm install express  # install a package
npm install -D nodemon  # dev dependency (only needed in development)
```

**Understand `package.json`:** This is the project's "identity card" — name, dependencies, scripts, all here.

```json
{
  "name": "my-app",
  "dependencies": {
    "express": "^4.18.0"
  },
  "scripts": {
    "start": "node app.js"
  }
}
```

**`node_modules` folder:** Where the actual package code is downloaded. Never commit this to Git (put it in `.gitignore`) — because it can be reinstalled from `package.json`.

**Direct relevance:** When you create a Next.js project (`npx create-next-app`), these same concepts apply — `package.json`, `node_modules`, dependencies coming via `npm install`.

---

## Day 2 — Async JavaScript in Node (The Most Important Day)

This day matters most because you'll find async code everywhere in React/Next (data fetching, API calls) — if this concept isn't clear, you'll be confused there.

### 1. Node Is Single-Threaded, but Non-Blocking (30 min, concept)

Node runs JavaScript on **a single thread** (unlike some languages that use multiple threads), yet multiple things seem to happen "at once" — how?

Because of the **Event Loop**. When a slow operation happens (file read, network request, database query), Node sends it to the background and **doesn't wait** — it immediately moves to the next line. When that slow operation completes, its result arrives in the "event queue" and the event loop processes it.

**Analogy:** A waiter (Node) in a restaurant — takes the order to the kitchen (background) and doesn't stand there waiting. Goes to take the next table's order. When the food is ready, brings it back and serves.

### 2. Callbacks (30 min)

The old way to handle async — passing a function as an argument to another function, which gets called "later".

```javascript
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("File content:", data);
});

console.log("This prints first"); // because readFile is async, doesn't wait
```

**Problem with callbacks:** If many async operations must run one after another, you get "callback hell" (a pyramid of nested callbacks). Promises were created to solve this problem.

### 3. Promises (45 min)

An object that represents that some async operation **will eventually** complete (with success or failure).

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data mil gaya");
      } else {
        reject("Error aa gaya");
      }
    }, 1000);
  });
};

fetchData()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### 4. Async/Await (45 min, MOST IMPORTANT — you'll use this heavily in React/Next)

A **cleaner** way to write Promises — looks like synchronous code, but is actually async.

```javascript
async function getData() {
  try {
    const result = await fetchData(); // waits here until the Promise resolves
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

**Practical exercise:** Build a function that prints "Order placed" after 2 seconds — first with a callback, then with a Promise, then with async/await. Do the same task all three ways to feel the difference.

**Direct relevance:** In Next.js you'll write this repeatedly:
```javascript
async function getProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();
  return data;
}
```
This is exactly the same pattern you're practicing now.

---

## Day 3 — HTTP Server Basics + Environment Concepts

### 1. Raw HTTP Server (Manual, 1 hour) — the "Manual → Better" part

First build a server with raw Node, without any library — so you understand what's behind Express/Next.js.

```javascript
const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home page');
  } else if (req.url === '/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ products: ['Rice', 'Dal', 'Sugar'] }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Run it (`node server.js`), visit `localhost:3000` and `localhost:3000/products` in the browser.

**Why this exercise:** Look at how much manual work there is — an if-else for every route, manually stringifying JSON, setting headers. Now understand that libraries like Express (and Next.js's whole routing system) **solve this problem** — automatic routing, easier JSON handling, middleware system.

### 2. Environment Variables (30 min)

Sensitive data (API keys, database URLs) isn't hardcoded in code — it's kept in a `.env` file.

```bash
# .env file
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret123
```

```javascript
console.log(process.env.DATABASE_URL);
```

**Direct relevance:** You're already using this in DukaanOS (Supabase URL) and the trading bot (Upstox API keys) — now you'll understand *why*.

### 3. `package.json` scripts + `nodemon` (30 min)

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

`nodemon` automatically restarts the server on file changes — useful in development. This is the same concept as Next.js's `npm run dev` (hot reload).

### 4. Quick intro — what Next.js automates of all this (30 min, conceptual bridge)

Now that you've seen the manual server, routing, and async, make a quick mental note:

- Manual routing in raw Node (`if req.url === ...`) → Next.js has **file-based routing** (create a folder, it becomes a route)
- Manual JSON handling in raw Node → built-in API routes in Next.js
- Packages via `npm install` → Next.js is itself a framework installed via `create-next-app`

This bridge matters to understand — so that when the Next.js course starts, you know "this magic that's happening, this concept is behind it."

---

## Quick Revision Checklist (after 3 days)

- [ ] What Node.js is and how it differs from the browser
- [ ] `require` vs `import/export` — you can write both
- [ ] `npm install`, `package.json`, `node_modules` roles
- [ ] Basic idea of the event loop — why single-threaded but non-blocking
- [ ] Callback → Promise → async/await — you can write all three, and understand async/await is the cleanest
- [ ] Build a small server with the raw `http` module
- [ ] Why `.env` files are used
- [ ] Mental bridge — "how raw Node's manual work is automated by Next.js"

---

## Next Step

Once these 3 days are complete and the checklist feels confident, you can start the React/Next.js course directly from Module 1. The async/await part especially needs to be strong, because it comes up repeatedly in data fetching.
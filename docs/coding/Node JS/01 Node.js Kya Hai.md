Think about it — when you first learned JavaScript, it always ran inside a browser. `console.log` showed up in the browser console, `document` represented the browser page. JavaScript had no home of its own — it always lived in someone else's house (the browser).

Now imagine someone gave JavaScript its **own separate home** — a place where it can run directly on a computer, without any browser. That home is **Node.js**.

## JavaScript Now Runs Outside the Browser Too

**Node.js is a JavaScript runtime** — a program that runs JavaScript code directly on your computer or server, without a browser.

Chrome's **V8 engine** is what runs JavaScript fast (the same engine Chrome uses). Node.js took that V8 engine out of the browser and turned it into a standalone program. That's why:

- In the browser: JS runs inside the browser (with DOM, window, document)
- In Node: JS runs on the computer/server (with files, network, database)

This code runs in both places:

```javascript
// console.log works everywhere
console.log("Hello, JavaScript!");
```

Now think — when you run a Next.js app (`npm run dev`), what's running in the background? **Node.js.** Next.js, React's server-side rendering, API routes — all of it runs through Node. So understanding Node = understanding the engine behind Next.js.

## Why Understanding Node Makes Next.js Clear

In the React course, everything you built ran inside the browser — the UI. But in Next.js, code also runs on the server (Server Components, API routes, data fetching). And the engine that runs code on the server is **Node.js itself**.

When you write this in Next.js:

```javascript
// This code runs on the server (Node.js)
async function getProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();
  return data;
}
```

`await`, `fetch`, reading files, reading secrets from `.env` — all of that is **Node.js territory**. Browser developers have nothing to do with it (in the browser there's `window` and `document`). So first understand the Node base, and then Next.js's magic becomes transparent.

## Practical — Node REPL (JavaScript Without a Browser for the First Time)

Open a terminal and type:

```bash
node
```

The moment you press Enter, the **REPL** opens — an interactive shell where you can write JS and see the output instantly, just like the browser console.

```
> 1 + 1
2
> console.log("Hi from Node")
Hi from Node
> 2 * 5
10
```

This is **real JavaScript**, just running without a browser. This tiny difference is what unlocks all of Node's power — now you can open files with JS, build a server, hit a database.

To exit the REPL, press Ctrl+C twice (or type `.exit`).

## Practical — Running Your First JS File

REPL is for small question-answer experiments. For real work, you create a file.

**Step 1:** Create a folder and an `app.js` file inside it:

```javascript
// app.js
console.log("Running from Node");
```

**Step 2:** In the terminal (inside that folder), run:

```bash
node app.js
```

Output:

```
Running from Node
```

That's it. But this tiny step is exactly what happens behind `npm run dev` — Next.js also runs JavaScript from an entry file, just with the framework on top.

> **Why this is necessary:** When you run Next.js's `npm run build` or `npm run dev`, node executes the code in the background. Running a file gives you the body-feel of what "node X.js" is — everything else is built on top of this.

## Browser Environment vs Node Environment

| Thing | Browser | Node.js |
|---|---|---|
| Where code runs | Browser (client) | Computer/Server |
| Window/Document | Exists (UI) | Doesn't exist |
| Files read/write | Not directly (browser security) | Yes (`fs` module) |
| Network requests | `fetch` | `fetch` + much more |
| Console | Browser dev tools | Terminal |

That's why if you try to use `window` in Node, you'll get an error — window is a browser concept, not a Node one. `process` (Node's global) doesn't exist in the browser. **Both are different environments, the language is the same.**

## Common Mistakes

- ❌ Forgetting `node app.js` and opening `app.js` in the browser — the file runs like a script in the browser, but Node features (`require`, `process`, `fs`) won't work. Node code must be run **from the terminal** with `node`.
- ❌ Writing long programs in the REPL — REPL is for small tests. Write real programs in files and run with `node`.
- ❌ Using `window` or `document` in Node — these are browser globals. Node has globals like `process`, `__dirname`, `require`.
- ❌ Thinking "Node = a web framework" — Node is not a framework, it's a runtime. Express/Next.js are frameworks that run **on Node**.

## In Your Own Words

1. What is Node.js — in one line?

<details>
<summary>Sample Answer</summary>

**Answer:** Node.js is a JavaScript runtime that lets JavaScript run outside the browser — directly on your computer/server. It's based on Chrome's V8 engine.

</details>

2. What's the difference between browser JavaScript and Node JavaScript?

<details>
<summary>Sample Answer</summary>

**Answer:** The language is the same (JavaScript), but the environment is different. In the browser you get `window`/`document`/DOM; in Node you get `process`, `fs` (files), and server-side features. Browser is for UI, Node is for server/backend.

</details>

3. What is the REPL and where is it used?

<details>
<summary>Sample Answer</summary>

**Answer:** REPL (Read-Eval-Print Loop) is an interactive shell that opens when you type `node`. Use it for small experiments — type a line, see the output instantly. For long files, create a file and run `node app.js`.

</details>

4. Who runs Next.js's server-side code?

<details>
<summary>Sample Answer</summary>

**Answer:** Node.js. Server Components, API routes, data fetching — all of it runs on the server, and the runtime that runs JavaScript on the server is Node.js. `npm run dev` is also backed by node.

</details>

## What It Is NOT

⚠️ **Node.js is NOT a JavaScript framework.** It's a runtime (a program that runs JS). Express, Next.js are frameworks that run **on Node**.

⚠️ **Node.js is NOT a new JavaScript language.** The language is the same — your existing JS knowledge works, now with files, server, and database.

⚠️ **Node.js is NOT only for backends.** Backend is its most popular use, but Node can build build tools, CLI tools, desktop apps (Electron). Your Vite, webpack — all run on Node.

⚠️ **`node app.js` is not only for small files.** This same command is used in production — `npm start` is often `node server.js` internally.

---

Now your Node runs. The next question — when files get big, how do you split code across multiple files, and how does one file use another's code? That's the **Module System** — the next topic. Let's go.
Up to file 05 we saw that Node handles async work non-blocking — callbacks, Promises, async/await. Now use all of that to build something **real** — a server. Because until you send a response to another computer/browser from your code, Node's whole point is incomplete.

## First — What Does a Server Do

An **HTTP server** is a program that listens for requests from a browser (client) and sends back a response:

```
Browser (client)  ----  request: "GET /"  ---->  Server
Browser (client)  <---  response: "Home page" ----  Server
```

When you open `example.com` in a browser, the browser sends a request — "give me the home page." The server looks at that URL, decides what to send, and responds. An HTTP server does exactly that.

## Manual Approach — Raw HTTP Server

First, **without any library**, build a server using Node's `http` module. This is what Express/Next.js sit on top of.

**`server.js`:**

```javascript
const http = require('node:http');

const server = http.createServer((req, res) => {
  // this callback runs on every request
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

Run it:

```bash
node server.js
```

Now open in the browser:
- `http://localhost:3000` → "Home page"
- `http://localhost:3000/products` → JSON list
- `http://localhost:3000/anything-else` → "Not found" (404)

## Understand Every Line

```javascript
const http = require('node:http');
```

Imported Node's built-in `http` module — it has the power to build a server.

```javascript
const server = http.createServer((req, res) => {...});
```

Created a server. The callback runs on every request — `req` (request: what the browser asked for), `res` (response: what we'll send back).

```javascript
if (req.url === '/') {...}
```

The concept of routing — **manually**. We check the browser's request URL and decide what to send. If it's `/`, home; if `/products`, products; otherwise 404.

```javascript
res.writeHead(200, { 'Content-Type': 'text/plain' });
```

Set status code + headers. `200` = "all good". `Content-Type` tells the browser what's coming (plain text, JSON, HTML...).

```javascript
res.end(JSON.stringify({ products: [...] }));
```

Ended the response and sent the content. Notice — the JSON object had to be turned into a **string** with `JSON.stringify`, because HTTP only sends text.

```javascript
server.listen(3000, () => {...});
```

Started listening for requests on port 3000. The browser sends requests to `localhost:3000`.

## See How Much Manual Work There Is

Looking at this code, one thing becomes clear — **everything is manual:**

- ✅ Routing — an `if (req.url === ...)` else-if chain. 10 routes means 10 else-ifs.
- ✅ JSON — you have to `JSON.stringify` it yourself
- ✅ Headers — you set them yourself in `writeHead`
- ✅ 404 — you handle it yourself

Now understand why **Express** and **Next.js** exist — **they automate all of this.** In Express, a route looks like:

```javascript
// Express (same server, same routes)
app.get('/', (req, res) => res.send('Home page'));
app.get('/products', (req, res) => res.json({ products: [...] }));
```

Route name gives the method (`get`), URL (`'/'`), handler — all in one line. `res.json()` builds the JSON itself. **Next.js goes even further — you don't even write routes, folders are routes** (as you'll recall from 0.7/1.1). But now you know — all of that is **a shortcut for this manual work**.

## Practical Exercise — Extend Your Server

Try it yourself — add two things to the server:

1. `/about` route — send plain text "About us"
2. `/api/users` route — send JSON: `{ users: ['Aman', 'Pravin', 'Vin'] }`

```javascript
// server.js (extended)
const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home page');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About us');
  } else if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: ['Aman', 'Pravin', 'Vin'] }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

When you change the server, you have to **restart** it (Ctrl+C, then `node server.js`). `nodemon` solves this annoyance — next topic.

## Common Mistakes

- ❌ Forgetting `res.end()` — the response never completes and the browser keeps loading forever. Every handler needs `res.end()` or `res.send()`.
- ❌ Passing a JSON object directly into `res.end()` (`res.end({...})`) — HTTP only sends text/strings. `JSON.stringify()` is required.
- ❌ Port already in use — "EADDRINUSE" error. Change the port or kill the old process.
- ❌ Changing code but forgetting to restart the server — the server runs the old version. Auto-restart with nodemon (next topic).
- ❌ Mixing HTML/JSON in the response without the right Content-Type — the browser may render it incorrectly.

## In Your Own Words

1. How do you do routing in a raw HTTP server?

<details>
<summary>Sample Answer</summary>

**Answer:** Manually — by checking `req.url` in an if/else chain. Home at `req.url === '/'`, products at `'/products'`, otherwise 404. Express/Next.js automate this.

</details>

2. Why is `JSON.stringify` needed in `res.end(JSON.stringify(...))`?

<details>
<summary>Sample Answer</summary>

**Answer:** Because HTTP only sends text/strings — objects can't be sent directly. `JSON.stringify` converts the object into a JSON string that can be sent in the response.

</details>

3. What does `server.listen(3000)` do?

<details>
<summary>Sample Answer</summary>

**Answer:** Starts listening for requests on port 3000. When the browser sends a request to `http://localhost:3000`, this server handles it.

</details>

4. What manual things do you do in a raw HTTP server that a framework automates?

<details>
<summary>Sample Answer</summary>

**Answer:** Routing (if/else chain), JSON stringify, setting headers, 404 handling — all manual. Express gives routes via `app.get('/', handler)` and JSON via `res.json()`. Next.js creates routes from folders.

</details>

## What It Is NOT

⚠️ **A raw HTTP server is NOT a production-ready backend.** It's for understanding what's behind the framework. Real apps use Express/Next.js — security, routing, middleware are all built in.

⚠️ **The `http` module is NOT only for Node — but every server has something like it.** Every language has its own HTTP layer. The concept is universal.

⚠️ **A request is NOT just a URL.** `req` also has method (GET/POST), headers, body. We only used `req.url` here; mutations will bring `req.method` and body too.

⚠️ **A server is NOT just "sending text".** The full request/response cycle, status codes, content types, authentication — all of it is built on top of HTTP. This batch covers the foundation; details come later.

---

Now you have your own server — with manual routing. But one thing is annoying — **restarting the server on every code change.** And another — **API keys and database URLs shouldn't be hardcoded in code.** Both of these (and the bridge from Node to Next.js) — next topic: **Environment Variables and Bridge to Next.js**. Last topic, let's go.
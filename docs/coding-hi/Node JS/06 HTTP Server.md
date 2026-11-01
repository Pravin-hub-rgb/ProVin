05 tak humne dekha ki Node async kaam ko non-blocking handle karta hai — callbacks, Promises, async/await. Ab wo sab use karke kuch **asli** banate hain — ek server. Kyunki tab tak Node ka point adhura hai jab tak tum code se kisi aur computer/browser ko response na do.

## Sabse Pehle — Server Kya Karta Hai

Ek **HTTP server** ek program hai jo browser (client) se request sunta hai aur response bhejta hai:

```
Browser (client)  ----  request: "GET /"  ---->  Server
Browser (client)  <---  response: "Home page" ----  Server
```

Jab tum browser mein `example.com` kholte ho, browser ek request bhejta hai — "Home page do." Server us URL ko dekhta hai, decide karta hai kya bhejna hai, aur response karta hai. HTTP server wahi kaam karta hai.

## Manual Approach — Raw HTTP Server

Pehle **bina kisi library ke**, raw Node ke `http` module se server banate hain. Ye woh hai jo Express/Next.js ke peeche hota hai.

**`server.js`:**

```javascript
const http = require('node:http');

const server = http.createServer((req, res) => {
  // har request pe ye callback chalta hai
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
  console.log('Server chal raha hai port 3000 par');
});
```

Run karo:

```bash
node server.js
```

Ab browser mein kholo:
- `http://localhost:3000` → "Home page"
- `http://localhost:3000/products` → JSON list
- `http://localhost:3000/anything-else` → "Not found" (404)

## Har Line Samjho

```javascript
const http = require('node:http');
```
Node ka built-in `http` module import kiya — isme server banana ki power hai.

```javascript
const server = http.createServer((req, res) => {...});
```
Ek server banaya. Har request pe callback chalta hai — `req` (request: browser ne kya manga), `res` (response: hum kya bhejenge).

```javascript
if (req.url === '/') {...}
```
Route ka concept — **manually**. Browser ki request ka URL check karte hain aur decide karte hain kya bhejna hai. Agar `/` hai toh home, `/products` hai toh products, warna 404.

```javascript
res.writeHead(200, { 'Content-Type': 'text/plain' });
```
Status code + headers set kiye. `200` = "sab theek hai". `Content-Type` browser ko batata hai kya aa raha hai (plain text, JSON, HTML...).

```javascript
res.end(JSON.stringify({ products: [...] }));
```
Response ko end kiya aur content bheja. Notice — JSON object ko `JSON.stringify` karke **string** banana pada, kyunki HTTP sirf text bhejta hai.

```javascript
server.listen(3000, () => {...});
```
Server ko port 3000 pe sunna shuru kiya. Browser `localhost:3000` pe request bhejega.

## Dekho Kitna Manual Kaam Hai

Ab is code ko dekh ke ek baat samjho — **har cheez manual hai:**

- ✅ Routing — `if (req.url === ...)` else-if chain. 10 routes ho toh 10 else-if.
- ✅ JSON — khud `JSON.stringify` karna padta hai
- ✅ Headers — khud `writeHead` mein set karne padte hain
- ✅ 404 — khud handle karna padta hai

Ab samjho kyun **Express** aur **Next.js** exist karte hain — **ye sab automate karte hain.** Express mein route aisa hota hai:

```javascript
// Express (same server, same routes)
app.get('/', (req, res) => res.send('Home page'));
app.get('/products', (req, res) => res.json({ products: [...] }));
```

Route name se hi method (`get`), URL (`'/'`), handler ek line. `res.json()` khud JSON banata hai. **Next.js toh isse bhi aage — routes bhi nahi likhne, folders hi routes hain** (0.7/1.1 se yaad). Par ab tumhe pata hai — wo sab **isi manual kaam ka shortcut hai.**

## Practical Exercise — Apna Server Extend Karo

Khud try karo — server mein 2 cheezein add karo:

1. `/about` route — plain text "About us" bhejo
2. `/api/users` route — JSON bhejo: `{ users: ['Aman', 'Pravin', 'Vin'] }`

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
  console.log('Server chal raha hai port 3000 par');
});
```

Server change karne pe **restart** karna padta hai (Ctrl+C, phir `node server.js`). Isi tedhepan ko solve karta hai `nodemon` — agle topic mein.

## Common Mistakes

- ❌ `res.end()` bhoolna — response kabhi complete nahi hota, browser hamesha loading dikhata hai. Har handler mein `res.end()` ya `res.send()` zaroori hai.
- ❌ JSON object seedha `res.end()` mein dena (`res.end({...})`) — HTTP sirf string/text bhejta hai. `JSON.stringify()` karna zaroori hai.
- ❌ Port pehle se busy hona — "EADDRINUSE" error aata hai. Port change karo ya purana process band karo.
- ❌ Server ko run karke restart bhoolna — code change kiya, par server purana version chala raha hai. Nodemon se auto-restart (agla topic).
- ❌ Response mein HTML/JSON mixed bhejna bina sahi Content-Type ke — browser galat tareeke se render kar sakta hai.

## In Your Own Words

1. Raw HTTP server mein routing kaise karte hain?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Manually — `req.url` check karke if/else chain se. `req.url === '/'` pe home, `'/products'` pe products, warna 404. Express/Next.js isi ko automate karte hain.

</details>

2. `res.end(JSON.stringify(...))` mein JSON.stringify kyun zaroori hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Kyunki HTTP sirf text/string bhejta hai — objects directly nahi bhej sakte. `JSON.stringify` object ko JSON string mein convert karta hai jo response mein bheja ja sakta hai.

</details>

3. `server.listen(3000)` kya karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Server ko port 3000 pe requests sunna shuru karta hai. Browser `http://localhost:3000` pe request bhejega to ye server usko handle karega.

</details>

4. Raw HTTP server se kya manual cheezein karne padti hain jo framework automate karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Routing (if/else chain), JSON stringify, headers set karna, 404 handling — sab manual. Express `app.get('/', handler)` se route deta hai aur `res.json()` se JSON. Next.js folders se routes banata hai.

</details>

## What It Is NOT

⚠️ **Raw HTTP server = production-ready backend nahi.** Ye samajhne ke liye hai ki framework ke peeche kya hai. Real app mein Express/Next.js use hote hain — security, routing, middleware sab built-in.

⚠️ **`http` module = sirf Node ke liye nahi, par har server mein kuch na kuch aisa hi hota hai.** Har language ka apna HTTP layer hota hai. Concept universal hai.

⚠️ **Request = sirf URL nahi.** `req` mein method (GET/POST), headers, body — sab hota hai. Abhi sirf `req.url` use kiya, aage mutations mein `req.method`, body bhi aayenge.

⚠️ **Server = sirf "text bhejna" nahi.** Full request/response cycle, status codes, content types, authentication — yeh sab HTTP ke upar banta hai. Is batch mein foundation, aage detail.

---

Ab tumhara apna server hai — manual routing ke saath. Par ek cheez tedhi hai — **har code change pe server restart karna.** Aur ek aur — **API keys, database URLs code mein hardcode nahi karne chahiye.** Yeh dono (aur Node se Next.js ka bridge) — agla topic: **Environment Variables aur Bridge to Next.js**. Last topic, chal karte hain.
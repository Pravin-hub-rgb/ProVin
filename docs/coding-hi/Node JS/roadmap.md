# Node.js Primer — Module 0 (React/Next Course se pehle)

> Scope: 2-3 din ka foundation — poora Node.js seekhna nahi hai, bas itna samajhna hai ki React/Next.js ke concepts (npm, modules, async, server-side execution) clear lagein jab unpe pahunchoge.
> Approach: "Manual → Better" — pehle raw/manual tarike se karo, phir samjho shortcuts/libraries kyun exist karti hain.

---

## Day 1 — Node kya hai + Module System + npm

### 1. Node.js kya hai (concept, 15 min)

JavaScript pehle sirf **browser ke andar** chalti thi. Node.js ek runtime hai jo JavaScript ko **browser ke bahar** — seedha tumhare computer/server pe — chalne deta hai. Chrome ke V8 engine pe based hai.

**Kyun important hai React/Next ke liye**: Next.js khud Node pe chalta hai (server-side rendering, API routes sab Node ke through hote hain). Jab tum `npm run dev` karte ho, wo Node hi hai jo background mein chal raha hota hai.

**Practical**: Terminal mein `node` type karo — REPL (interactive shell) khul jayega. Wahan `1 + 1`, `console.log("hi")` try karo — ye JavaScript hi hai, bas browser ke bina chal rahi hai.

### 2. Running a file (15 min)

```bash
node app.js
```

Ek simple `app.js` banao:
```javascript
console.log("Node se chal raha hai");
```

Run karo aur dekho output. Simple hai, but ye tumhe samjhayega ki Next.js internally kya kar raha hai jab wo build/run hota hai.

### 3. Module System — `require`/`module.exports` aur `import`/`export` (1-1.5 hours, IMPORTANT)

Node mein do module systems hain — ye samajhna zaroori hai kyunki Next.js mein tum modern syntax use karoge, but purane Node code/tutorials mein purana syntax milega.

**CommonJS (purana, `require`)**:
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

**ES Modules (naya, `import`/`export`)** — ye wahi hai jo tum React/Next mein use karoge:
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(2, 3));
```

**Practical exercise**: Ek chhota `utils.js` banao 2-3 functions ke saath (jaise `formatPrice`, `calculateDiscount`), export karo, dusri file mein import karke use karo. Dono syntax try karo taaki difference clear ho.

**Interview/learning tip**: Next.js mein by default ES Modules use hote hain (`import`/`export`). Agar kabhi purana Node package dekho jisme `require` hai, ghabrana nahi — bas dusra syntax hai, kaam wahi hai.

### 4. npm — Node Package Manager (1 hour)

**Kya hai**: Ek registry jahan se tum ready-made code (packages/libraries) install kar sakte ho, bina khud se likhe.

```bash
npm init -y          # naya project shuru karo (package.json banega)
npm install express  # ek package install karo
npm install -D nodemon  # dev dependency (sirf development ke liye chahiye)
```

**`package.json` samjho**: Ye project ka "identity card" hai — naam, dependencies, scripts sab yahan.

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

**`node_modules` folder**: Jahan actual package code download hota hai. Isko kabhi Git mein commit nahi karte (`.gitignore` mein daalte hain) — kyunki `package.json` se dobara install ho sakta hai.

**Direct relevance**: Jab tum Next.js project banaoge (`npx create-next-app`), ye sab wahi concepts hain — `package.json`, `node_modules`, `npm install` se dependencies aayengi.

---

## Day 2 — Async JavaScript in Node (Sabse Important Din)

Ye din sabse zaroori hai kyunki React/Next mein har jagah async code milega (data fetching, API calls) — agar ye concept clear nahi hai, wahan confuse hoge.

### 1. Node Single-Threaded hai, but Non-Blocking (30 min, concept)

Node JavaScript ko **ek hi thread** pe run karta hai (unlike kuch languages jo multiple threads use karte hain), but phir bhi multiple cheezein "ek saath" hoti dikhti hain — kaise?

**Event Loop** ki wajah se. Jab koi slow operation hoti hai (file read, network request, database query), Node use background mein bhej deta hai aur **wait nahi karta** — turant next line pe chala jaata hai. Jab wo slow operation complete hoti hai, uska result "event queue" mein aata hai aur event loop use process karta hai.

**Analogy**: Ek waiter (Node) restaurant mein — order lekar kitchen (background) mein bhej deta hai, aur wait nahi karta wahin khada hoke. Doosre table ka order lene chala jaata hai. Jab khana ban jaata hai, wapas laake serve karta hai.

### 2. Callbacks (30 min)

Purana tarika async handle karne ka — ek function dusre function ko as argument pass karna, jo "baad mein" call hoga.

```javascript
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("File content:", data);
});

console.log("Ye pehle print hoga"); // kyunki readFile async hai, wait nahi karta
```

**Problem with callbacks**: Agar bahut saare async operations ek ke baad ek chahiye, "callback hell" ho jaata hai (nested callbacks ka pyramid). Isi problem ko solve karne ke liye Promises aaye.

### 3. Promises (45 min)

Ek object jo represent karta hai ki koi async operation **eventually** complete hoga (success ya failure ke saath).

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

### 4. Async/Await (45 min, MOST IMPORTANT — ye tum React/Next mein hardcore use karoge)

Promises ko likhne ka **cleaner** tarika — synchronous code jaisa dikhta hai, but async hi hota hai.

```javascript
async function getData() {
  try {
    const result = await fetchData(); // yahan wait karega Promise resolve hone tak
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

**Practical exercise**: Ek function banao jo `setTimeout` ke through 2 second baad "Order placed" print kare — pehle callback se, phir Promise se, phir async/await se. Teeno tarike se same kaam karke difference feel karo.

**Direct relevance**: Next.js mein tum ye likhoge baar-baar:
```javascript
async function getProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();
  return data;
}
```
Ye exactly wahi pattern hai jo abhi practice kiya.

---

## Day 3 — HTTP Server Basics + Environment Concepts

### 1. Raw HTTP Server (Manual, 1 hour) — "Manual → Better" wala part

Pehle bina kisi library ke, raw Node se ek server banao — taaki samjho Express/Next.js ke peeche kya ho raha hai.

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
  console.log('Server chal raha hai port 3000 par');
});
```

Run karo (`node server.js`), browser mein `localhost:3000` aur `localhost:3000/products` visit karo.

**Ye kyun karaya**: Dekho kitna manual kaam hai — har route ke liye `if-else`, manually JSON stringify karna, headers set karna. Ab samjho Express jaisi library (aur Next.js ka poora routing system) **isi problem ko solve karta hai** — automatic routing, easier JSON handling, middleware system.

### 2. Environment Variables (30 min)

Sensitive data (API keys, database URLs) code mein hardcode nahi karte — `.env` file mein rakhte hain.

```bash
# .env file
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret123
```

```javascript
console.log(process.env.DATABASE_URL);
```

**Direct relevance**: Tum ye already DukaanOS mein (Supabase URL) aur trading bot mein (Upstox API keys) use kar rahe ho — ye wahi concept hai, sirf ab "kyun" samajh aayega.

### 3. `package.json` scripts + `nodemon` (30 min)

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

`nodemon` file changes pe automatically server restart kar deta hai — development mein useful. Ye Next.js ke `npm run dev` jaisa hi concept hai (hot reload).

### 4. Quick intro — kya Next.js in sab ko automate karta hai (30 min, conceptual bridge)

Ab jab tumne manual server, routing, aur async dekh liya hai, ek quick mental note banao:

- Raw Node mein routing manually likhi (`if req.url === ...`) → Next.js mein **file-based routing** hota hai (folder banao, wo route ban jaata hai)
- Raw Node mein manual JSON handling → Next.js API routes mein built-in
- `npm install` se packages → Next.js khud ek framework hai jo `create-next-app` se install hota hai

Ye bridge samajhna zaroori hai — taaki jab Next.js course start ho, tumhe pata ho "ye jo magic ho raha hai, iske peeche ye concept hai."

---

## Quick Revision Checklist (3 din ke baad)

- [ ] Node.js kya hai, browser se kaise alag hai
- [ ] `require` vs `import/export` — dono syntax likh sakte ho
- [ ] `npm install`, `package.json`, `node_modules` ka role
- [ ] Event loop ka basic idea — single-threaded but non-blocking kyun
- [ ] Callback → Promise → async/await — teeno likh sakte ho, aur samajh ho ki async/await sabse clean hai
- [ ] Raw `http` module se chhota server bana sakte ho
- [ ] `.env` file kyun use karte hain
- [ ] Mental bridge — "raw Node ka manual kaam Next.js kaise automate karta hai"

---

## Next Step

Jab ye 3 din complete ho jaayein aur checklist confident lage, seedha React/Next.js course shuru kar sakte ho — Module 1 se. Async/await wala part especially strong hona chahiye, kyunki data fetching mein wahi baar-baar aayega.
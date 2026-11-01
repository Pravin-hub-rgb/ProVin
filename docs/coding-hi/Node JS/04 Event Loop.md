03 mein humne dekha ki packages npm se aate hain. Ab ek aur asli sawaal — **Node ek hi thread pe chalta hai, phir bhi itne saare requests kaise handle karta hai?** Ek restaurant soch lo.

## Waiter Wala Example — Khada Hoke Wait Nahi Karta

Ek restaurant mein ek **waiter (Node)** hai. Table 1 ne order diya — pasta. Waiter kitchen mein order de deta hai aur **wahin khada ho kar wait nahi karta** — Table 2 ke paas jata hai, unka order leta hai (coffee), kitchen mein deta hai, Table 3 ke paas jata hai... Jab pasta ban jaata hai, kitchen se utha kar Table 1 pe serve karta hai.

Yeh waiter ek hi hai, par **kabhi kisi ke liye block nahi hota** — wait karta nahi, agla kaam karta rehta hai. Yeh hi hai Node.js ka model.

## Single-Threaded, Lekin Non-Blocking

Node.js JavaScript ko **ek hi thread** pe run karta hai (ek hi kaam ek samay pe). Par phir bhi multiple cheezein saath mein hoti dikhti hain — **kaise?**

**Event Loop** ki wajah se. Basic idea:

1. Jab koi **slow operation** aati hai (file read, network request, database query, timer) — Node use **background mein bhej deta hai** (os se)
2. Node wait nahi karta — **agli line turant chala leta hai**
3. Jab background wala kaam complete hota hai, uska result ek queue mein aata hai
4. **Event Loop** us queue ko dekh ke callback ko process karta hai

Matlab — **blocking (wait karna) karta nahi, non-blocking rehta hai.** Waiter jaisa.

## Blocking vs Non-Blocking — Code Se Dekho

Yeh code hai jo **block** karta hai (wait karta hai):

```javascript
// sync.js — BLOCKING (galat tarika slow kaam ke liye)
const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');  // yahan wait karega!
console.log('File:', data);
console.log('Ye baad mein print hoga');
```

`readFileSync` — "Sync" naam mein hi hai — ye **wait karega** jab tak file read nahi ho jaati. Is dauran Node kuch aur nahi kar sakta — poora program block.

Ab **non-blocking** wala:

```javascript
// async.js — NON-BLOCKING (sahi tarika)
const fs = require('node:fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log('File:', data);   // baad mein chalega, jab file read ho
});

console.log('Ye PEHLE print hoga');  // file ka wait nahi kiya
```

`readFile` (bina Sync ke) — ye file read **background mein** karta hai aur callback deta hai. Turant agli line chalti hai. Output:

```
Ye PEHLE print hoga
File: <content>
```

**Notice order:** "Ye PEHLE print hoga" pehle aaya, file ka content baad mein. Kyunki `readFile` ne wait nahi kiya — callback queue mein gaya, main code chala, phir event loop ne callback chalaya.

## Event Loop Ka Flow — Step by Step

```
main code chalta hai
  ↓
slow operation (readFile) mili → background mein bheji
  ↓
main code agli lines chalta rehta hai (wait nahi)
  ↓
background kaam complete → callback queue mein gaya
  ↓
Event Loop queue dekhta hai → callback process karta hai
  ↓
callback chalaya → file content print
```

**Event Loop** ek loop hai jo hamesha chek karta rehta hai — "koi task queue mein aaya? haan? chalao." Jab tak queue khali na ho.

## Why Isko Samajhna Zaroori Hai

React/Next.js mein data fetching har jagah hai — `fetch`, database queries, API calls — sab async (non-blocking). Agar ye concept clear nahi hai:

- `await` kya kar raha hai samajh nahi aayega
- `useEffect` mein fetch kyun karte hain samajh nahi aayega
- Race conditions, "ye order mein print kyun nahi hua" — confuse honge

`await` wahi karta hai jo yeh non-blocking magic organize karta hai — Promise ke saath. Par abhi Event Loop ka base idea chahiye tha. Asli async patterns (callbacks, Promises, async/await) agle topic mein detail mein.

## Common Mistakes

- ❌ Slow kaam ke liye `readFileSync`/`Sync` versions use karna — blocking hota hai, server freeze kar sakta hai. Non-blocking (`readFile`) use karo.
- ❌ Output order se confuse hona — "main code pehle, callback baad" ye non-blocking ka normal behavior hai, bug nahi.
- ❌ Sochna ki "single-threaded = ek saath ek hi request" — single thread pe code chalta hai, par I/O background mein hota hai, isliye bahut saare requests handle ho sakte hain.
- ❌ CPU-heavy kaam (large computation) Event Loop pe chhodna — wo background nahi jaata, poora thread block kar deta hai. I/O hi background mein jaata hai.

## In Your Own Words

1. Node single-threaded hai phir bhi multiple requests handle kaise karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Kyunki I/O (file read, network, database) background mein bhej di jaati hai aur Node wait nahi karta — agli line turant chalta hai. Background wala kaam complete hone pe Event Loop callback ko process karta hai. Ek thread, par kabhi block nahi.

</details>

2. `readFileSync` aur `readFile` mein kya fark hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** `readFileSync` blocking hai — wait karta hai jab tak file read na ho, us dauran program aage nahi badhta. `readFile` non-blocking hai — background mein read karta hai, callback deta hai, main code turant aage chalta hai.

</details>

3. Event Loop kya karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Event Loop ek continuous loop hai jo background tasks ke results ko queue se utha kar process karta hai. Jab koi async operation complete hoti hai, uska callback queue mein aata hai, aur Event Loop use execute karta hai.

</details>

4. Waiter analogy se samjhao Node kya karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Waiter (Node) order kitchen mein deta hai (background I/O) aur wahin khada ho kar wait nahi karta — agli table ka order leta hai. Jab khana ready hota hai (I/O complete), serve karta hai (callback). Ek waiter, par kabhi block nahi.

</details>

## What It Is NOT

⚠️ **Single-threaded = sirf ek request handle kar sakta = NAHI.** Single thread code execution ke liye hai. I/O operations OS/background mein hoti hain — isliye Node hazaron concurrent requests handle kar sakta hai.

⚠️ **Event Loop = CPU-intensive kaam bhi background mein bhej deta hai = NAHI.** File/network I/O background mein jaata hai. Heavy computation (loops, JSON processing bada) main thread ko block karta hai — iske liye worker threads/queues chahiye.

⚠️ **Non-blocking = har jagah callback, koi await nahi = NAHI.** Callbacks purana tarika hai. Promises aur async/await (agla topic) isko clean banate hain.

⚠️ **"Sync = galat, async = sahi" hamesha nahi.** Chhote startup scripts mein Sync fine hai. Server mein (jahan concurrency chahiye) non-blocking zaroori hai.

---

Ab tum jaante ho ki Node wait nahi karta — background mein bhejta hai aur baad mein callback se result deta hai. Par callbacks ke saath ek dikkat hai — jab multiple async kaam ek ke baad ek karna ho, toh code kaise likhte hain? **Callback Hell** aur uska solution (Promises, async/await) — agla topic. Chal karte hain.
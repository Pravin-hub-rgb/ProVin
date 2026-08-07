02 mein humne dekha ki apna code modules mein baant sakte hain. Par ek asli sawaal bacha — **kya React Router, Express, zod jaise packages khud likhne padte hain?** Socho agar har project mein routing khud likhni ho, form validation khud banaani ho — toh ek project mein 2 mahine lagega aur sabka code alag hoga.

Solution? **Dusre developers ke bane packages use karo — bina khud likhe.** Aur un packages ko download karne ka manager hai **npm** (Node Package Manager).

## npm Kya Hai — Ek Line Mein

**npm** ek package manager hai — ek registry (online library) + command-line tool jo ready-made code packages ko download/install/update karta hai.

Socho ek **mega kitchen warehouse** jahan har tarah ka ready-made ingredient milta hai. Tumhe pasta banane ke liye pasta khud banana nahi padta — warehouse se ready pasta laate ho. npm wahi warehouse hai JavaScript packages ka.

## Project Shuru — `npm init`

Har naya Node project `npm init` se shuru hota hai:

```bash
npm init -y
```

`-y` matlab "haan, default answers se chalo" — nahi toh npm sawaal puchta hai (project name, version, description). Ye command ek **`package.json`** file banati hai.

**`package.json` project ka identity card hai** — naam, version, dependencies, scripts sab yahan. Kuch aisa dikhta hai:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

## Package Install Karna — `npm install`

Ab koi package install karte hain. Example: ek **date formatting library** `date-fns`:

```bash
npm install date-fns
```

Kya hua?
1. npm registry se package download hua
2. `node_modules/` folder mein code aa gaya
3. `package.json` ke `dependencies` mein entry add ho gayi
4. `package-lock.json` ban gaya (exact versions ka record)

Ab code mein use karo:

```javascript
// app.js
import { format } from 'date-fns';

console.log(format(new Date(), 'dd MMM yyyy'));  // 07 Aug 2026
```

**Notice:** `import { format } from 'date-fns'` — bina `./` ke! Kyunki `date-fns` apni file nahi, ek **package** hai (node_modules se aata hai). Yahan `./` ka rule ulat jata hai — relative file = `./`, package = direct naam.

## Dependencies vs DevDependencies

Do tarah ke packages hote hain:

```bash
npm install express              # dependency — production mein bhi chahiye
npm install -D nodemon           # devDependency — sirf development mein
```

| | `dependencies` | `devDependencies` |
|---|---|---|
| Kab install karo | `npm install express` | `npm install -D nodemon` |
| Kya hai | App chalne ke liye chahiye | Sirf development tools |
| Example | express, react, zod | nodemon, typescript, eslint |
| Production | Install hota hai | Install nahi hota |

**Example kyun:** `express` tumhara server hai — production mein bhi chalega. `nodemon` sirf dev mein file changes pe server restart karta hai — production mein koi use nahi.

## `node_modules` — Kahan Code Aata Hai

`npm install` se package code **`node_modules/`** folder mein download hota hai. Ye folder:
- **Kabhi Git mein commit nahi karte** — kyunki hazaaron files hoti hain (kabhi 100MB+)
- `.gitignore` mein daalte hain
- **Kyun safe hai?** Kyunki `package.json` + `package-lock.json` se koi bhi `npm install` chala ke exact packages dobara la sakta hai

```gitignore
# .gitignore
node_modules
```

**Real relevance:** Jab tum Next.js project banate ho (`create-next-app`), toh wo package.json, node_modules, aur dependencies sab setup kar deta hai. React Router, Tailwind, zod — sab npm se hi aate hain. `npm install <package>` React course mein bhi har jagah use kiya tha — ab tumhe pata hai peeche kya hota hai.

## Scripts — Apne Commands Shortcut Karna

`package.json` mein `scripts` section se commands ko shortcut bana sakte hain:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

```bash
npm run dev     # nodemon index.js chalega
npm start       # node index.js chalega
```

**`npm start`** aur **`npm run dev`** — ye wahi commands hain jo Next.js mein `npm run dev`/`npm run build` hote hain. Har framework apne scripts package.json mein define karta hai.

## Common Mistakes

- ❌ `node_modules` ko Git commit karna — ye folder hazaaron files ka hai aur package.json se dobara banta hai. `.gitignore` mein daalo.
- ❌ `npm install` ke bina project run karna — agar node_modules nahi hai, `npm install` pehle chalao.
- ❌ Package ka naam galat likhna (`datefns` bina dash ke) — npm error dega "not found". Sahi naam registry mein check karo.
- ❌ Production package ko `-D` se install karna — jo runtime chahiye wo `dependencies` mein hona chahiye.
- ❌ `package-lock.json` delete karna — isme exact versions locked hain. Isse same versions reproducibility aati hai. Handle pe rakh lo.

## In Your Own Words

1. npm kya karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** npm ek package manager hai — ek registry + tool jo ready-made JavaScript packages download/install/update karta hai. `npm install <package>` se dependency project mein aa jaati hai.

</details>

2. `package.json` ki kya role hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Ye project ka identity card hai — naam, version, dependencies (kaunse packages), aur scripts (npm run dev jaise commands) sab yahan. Isi se npm jaanta hai kya install karna hai.

</details>

3. `node_modules` ko Git mein commit kyun nahi karte?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Kyunki ye hazaaron files ka bada folder hai aur isse `package.json` + `package-lock.json` se koi bhi `npm install` chala ke dobara bana sakta hai. Commit karne se repo bhara jata hai bina kisi fayde ke.

</details>

4. `dependencies` aur `devDependencies` mein kya fark hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** `dependencies` app ko production mein chalne ke liye chahiye (express, react). `devDependencies` sirf development tools hain (nodemon, typescript) jo production mein install nahi hote. `npm install -D` se devDependency add hoti hai.

</details>

## What It Is NOT

⚠️ **npm = Node ke saath hi aata hai, alag install nahi karna.** Node install karte hi npm saath aa jata hai. `npm -v` se version check karo.

⚠️ **`node_modules` delete karna safe hai (agar `.gitignore` mein hai).** `npm install` se dobara aa jata hai. Kuch log "node_modules delete karke reinstall karo" bolte hain — ye purani problem solve karne ka common trick hai.

⚠️ **npm = sirf "dependencies install" nahi.** Scripts (npm run), package management, versions, publishing — sab isi ka kaam hai. React course mein jo bhi `npm install` kiya, npm hi tha.

⚠️ **`package.json` manually edit karna galat nahi, par carefully.** Dependencies ko npm commands se add/remove karna safest hai — npm lock file bhi sync karta hai.

---

Ab tumhare paas packages ka raasta hai. Par ek aur zaroori cheez bacha hai — **Node single-threaded hota hai, phir bhi multiple kaam ek saath kaise karta hai?** Yehi **Event Loop** hai — sabse samajhne wala par sabse important concept. Agla topic. Chal karte hain.
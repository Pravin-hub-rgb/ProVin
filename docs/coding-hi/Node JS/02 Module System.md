01 mein humne dekha ki Node.js JavaScript ko browser ke bahar chalata hai. Ab ek asli problem aati hai — jab program bada hota hai, toh ek hi file mein sab likhna bekar ho jata hai. Socho agar tumhara pura app ek file mein ho — hazaaron lines. Koi samjhe hi nahi, aur kisi ek cheez ko fix karna ho toh poora program toot jaaye.

Solution? **Code ko chhote-chhote hisson mein baanto — har hissa apni file mein — aur jaroorat pe ek hissa dusre ko use kare.** Isi ko kehte hain **modules**.

## Module Kya Hai — Ek Line Mein

**Module** = ek file jo apna code export karti hai, taaki dusri files use kar sakein.

Jaise React course mein tumne components ko alag files mein rakha tha aur `import`/`export` se joda tha — **wahi concept Node mein hai**, sirf ek purana syntax bhi hai jise tumhe pehchan na hai.

## Node Mein Do Module Systems Kyun?

Node ke itihaas mein pehle **CommonJS** aaya (purana), phir JavaScript mein officially **ES Modules** aaye (naya). Dono ka kaam same hai — code share karna — bas syntax alag.

Aur tumhe dono jaanne padenge kyunki:

- **Next.js/React mein** tum modern syntax use karoge → ES Modules (`import`/`export`)
- **Purane Node code/tutorials/packages** mein purana syntax milega → CommonJS (`require`/`module.exports`)
- Agar sirf ek jaante ho, doosra dekhte hi ghabra jaoge — "ye kya hai?"

Dono samajh lo, kaam same hai.

## CommonJS — Purana Tarika (`require`)

Ye Node ka original module system hai. Ek file apna code `module.exports` se bhejti hai, dusri `require()` se maangti hai.

**Step 1:** `math.js` banate hain — isme code hai jo hum share karna chahte hain:

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
```

**Step 2:** `app.js` banate hain — ye math.js ka code use karta hai:

```javascript
// app.js
const { add, multiply } = require('./math');

console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6
```

**Samjho kya hua:**
1. `math.js` mein functions banaye
2. `module.exports = { add, multiply }` — isne functions ko "bahar bhej diya" (dusri files use kar sakein)
3. `app.js` mein `require('./math')` — math.js ka exported content le aaya
4. Destructuring se `add` aur `multiply` alag alag mil gaye

**Notice:** `./math` — relative path hai. `.js` extension likhni zaroori nahi CommonJS mein.

## ES Modules — Naya Tarika (`import`/`export`)

Yeh wahi syntax hai jo React/Next.js mein use hota hai. `export` bhejta hai, `import` maangta hai.

**Step 1:** `math.js`:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

**Step 2:** `app.js`:

```javascript
// app.js
import { add, multiply } from './math.js';

console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6
```

**Dono mein fark:**
- CommonJS: `module.exports = {...}` + `const { x } = require('./math')`
- ES Modules: `export function x` + `import { x } from './math.js'`

**Important:** ES Modules mein extension `.js` likhni padti hai (`'./math.js'`) aur `package.json` mein `"type": "module"` set karna padta hai. Agar ya nahi lagaoge, Node assume karega CommonJS aur `import` use karne pe error aayega.

```json
{
  "name": "my-app",
  "type": "module"
}
```

## Practical Exercise — Apna `utils.js` Banao

Ab khud banao. **Real-world scenario:** ek chhota utility file jisme price formatting aur discount calculation hai.

**`utils.js`** (ES Modules se):

```javascript
// utils.js
export function formatPrice(price) {
  return `Rs. ${price.toFixed(2)}`;
}

export function calculateDiscount(price, percent) {
  const discount = (price * percent) / 100;
  return price - discount;
}
```

**`app.js`**:

```javascript
// app.js
import { formatPrice, calculateDiscount } from './utils.js';

const price = 499;
console.log(formatPrice(price));            // Rs. 499.00

const salePrice = calculateDiscount(price, 20);
console.log(formatPrice(salePrice));        // Rs. 399.20
```

Ab **wahi kaam CommonJS mein bhi karo** — dono syntax ka fark khud feel karo. `module.exports = { formatPrice, calculateDiscount }` aur `const { formatPrice } = require('./utils')`.

> **Tip:** Kisi bhi cheez ko do alag files mein repeat karte dekh rahe ho, toh wo utility file banane layak hai. `formatPrice` aisi hi cheez hai — kahi bhi price dikhana ho, wahi function use karo, bar-bar code mat likho.

## Default Export vs Named Export

ES Modules mein do tarah ke exports hain:

```javascript
// Named export — multiple cheezein
export function add(a, b) { return a + b; }
export const PI = 3.14;

// Default export — ek main cheez
export default function multiply(a, b) { return a * b; }
```

Import karte waqt fark:

```javascript
import multiply, { add, PI } from './math.js';
//     ^default       ^named
```

- **Named export:** curly braces mein, exact naam se
- **Default export:** bina curly braces, koi bhi naam de sakte ho

React mein bhi yahi tha — `export default function Component()` aur `import Component`. Ek hi concept, ek hi rule.

## Common Mistakes

- ❌ ES Modules file mein `"type": "module"` set na karna — error: `Cannot use import statement outside a module`. `package.json` mein add karo.
- ❌ CommonJS file mein `import` aur ES Modules file mein `require` mix karna — dono systems alag hain, ek file mein ek hi system.
- ❌ `export` ki jagah `module.exports` likh kar dono mix karna — ye kaam nahi karega.
- ❌ Export kiye bina dusri file se use karna — jo export nahi hua, wo bahar nahi jaata. `module.exports` ya `export` zaroori hai.
- ❌ Path galat dena (`require('math')` bina `./` ke) — `./` = apni file ke paas wali file. Bina `./` ke Node package registry mein dhundta hai.

## In Your Own Words

1. Module kya hota hai aur iska fayda kya hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Module ek file hai jo apna code export karti hai taaki dusri files use kar sakein. Fayda — code chhota, reusable, organized. Same utility (jaise formatPrice) ek jagah likho, har jagah use karo.

</details>

2. CommonJS aur ES Modules mein kya fark hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** CommonJS purana syntax hai — `module.exports` se bhejte the, `require()` se maangte the. ES Modules naya official syntax hai — `export` se bhejte hain, `import` se maangte hain. Next.js/React mein ES Modules use hota hai.

</details>

3. `"type": "module"` kyun set karna padta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Node ko batane ke liye ki project ES Modules use kar raha hai. Bina iske Node assume karta hai CommonJS, aur `import` use karne pe error deta hai.

</details>

4. Default export aur named export mein kya fark hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Named export se multiple cheezein export hoti hain aur import `{ naam }` se hota hai. Default export ek main cheez hoti hai, import bina curly braces ke hota hai aur naam khud de sakte ho.

</details>

## What It Is NOT

⚠️ **Modules = sirf Node ki cheez nahi.** Browser mein bhi ES Modules hote hain (script tag mein `type="module"`). Par file system, path resolution Node ki apni cheez hai.

⚠️ **CommonJS = "galat/purana" nahi.** Wo ab bhi kaam karta hai aur kai packages use karte hain. Tumhe dono samajhne hain — jo bhi mile, use kar sako.

⚠️ **`require` vs `import` = same cheez nahi exact.** Kaam same hai (code share karna), par beech ke rules alag hain (synchronous vs async loading, file extension rules). Ghabrana nahi — syntax pehchano, kaam wahi hai.

⚠️ **`module.exports` aur `exports` same nahi hain hamesha.** `module.exports` object ko replace karta hai; `exports` usi object ka reference hai. Confusion se bachne ke liye hamesha `module.exports` use karo.

---

Ab tumhare paas code ko baant-ne ki power hai. Agla sawaal — jab project bada hota hai, dependencies kahan se aati hain? Kya React Router, Express jaise ready-made packages khud likhte hain? Nahi — **npm** se install karte hain. Agla topic: **npm — Node Package Manager**. Chal karte hain.
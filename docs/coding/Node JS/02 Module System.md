In the previous file we saw that Node.js runs JavaScript outside the browser. Now a real problem shows up — when a program grows big, writing everything in a single file becomes useless. Imagine your entire app in one file — thousands of lines. Nobody understands it, and if you need to fix one thing, the whole program breaks.

Solution? **Split the code into small pieces — each piece in its own file — and let one piece use another when needed.** This is called **modules**.

## What Is a Module — In One Line

**Module** = a file that exports its code so other files can use it.

Just like in the React course where you kept components in separate files and connected them with `import`/`export` — **the same concept exists in Node**, only with an older syntax you also need to recognize.

## Why Are There Two Module Systems in Node?

In Node's history, **CommonJS** came first (the old one), then JavaScript officially got **ES Modules** (the new one). Both do the same job — sharing code — just with different syntax.

And you'll need to know both because:

- **In Next.js/React** you'll use the modern syntax → ES Modules (`import`/`export`)
- **In older Node code/tutorials/packages** you'll find the old syntax → CommonJS (`require`/`module.exports`)
- If you know only one, you'll panic seeing the other — "what is this?"

Learn both; the job is the same.

## CommonJS — The Old Way (`require`)

This is Node's original module system. One file sends its code via `module.exports`, another receives it with `require()`.

**Step 1:** Create `math.js` — code we want to share:

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

**Step 2:** Create `app.js` — it uses math.js's code:

```javascript
// app.js
const { add, multiply } = require('./math');

console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6
```

**What happened:**
1. Functions were defined in `math.js`
2. `module.exports = { add, multiply }` — sent the functions "outside" (so other files can use them)
3. `require('./math')` in `app.js` — fetched math.js's exported content
4. Destructuring separated `add` and `multiply`

**Notice:** `./math` is a relative path. In CommonJS you don't need to write the `.js` extension.

## ES Modules — The New Way (`import`/`export`)

This is the same syntax used in React/Next.js. `export` sends, `import` receives.

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

**Difference between the two:**
- CommonJS: `module.exports = {...}` + `const { x } = require('./math')`
- ES Modules: `export function x` + `import { x } from './math.js'`

**Important:** In ES Modules you must write the `.js` extension (`'./math.js'`) and set `"type": "module"` in `package.json`. If you don't, Node assumes CommonJS and using `import` throws an error.

```json
{
  "name": "my-app",
  "type": "module"
}
```

## Practical Exercise — Build Your Own `utils.js`

Now build it yourself. **Real-world scenario:** a small utility file with price formatting and discount calculation.

**`utils.js`** (using ES Modules):

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

Now **do the same thing in CommonJS** — feel the difference yourself. `module.exports = { formatPrice, calculateDiscount }` and `const { formatPrice } = require('./utils')`.

> **Tip:** Whenever you see the same thing repeated across two files, that's a candidate for a utility file. `formatPrice` is exactly that kind of thing — wherever you show a price, use the same function, don't rewrite the code.

## Default Export vs Named Export

ES Modules have two kinds of exports:

```javascript
// Named export — multiple things
export function add(a, b) { return a + b; }
export const PI = 3.14;

// Default export — one main thing
export default function multiply(a, b) { return a * b; }
```

When importing, the difference:

```javascript
import multiply, { add, PI } from './math.js';
//     ^default       ^named
```

- **Named export:** inside curly braces, by exact name
- **Default export:** without curly braces, you can give any name you want

This is the same in React — `export default function Component()` and `import Component`. Same concept, same rule.

## Common Mistakes

- ❌ Not setting `"type": "module"` in an ES Modules file — error: `Cannot use import statement outside a module`. Add it to `package.json`.
- ❌ Mixing `import` in a CommonJS file and `require` in an ES Modules file — the two systems are separate; one file uses one system.
- ❌ Writing `module.exports` instead of `export` (or mixing both) — that won't work.
- ❌ Using something from another file without exporting it — what isn't exported doesn't go out. `module.exports` or `export` is required.
- ❌ Wrong path (`require('math')` without `./`) — `./` means "the file next to mine". Without `./`, Node searches the package registry.

## In Your Own Words

1. What is a module and what's its benefit?

<details>
<summary>Sample Answer</summary>

**Answer:** A module is a file that exports its code so other files can use it. Benefit — code stays small, reusable, organized. Write a utility like `formatPrice` once, use it everywhere.

</details>

2. What's the difference between CommonJS and ES Modules?

<details>
<summary>Sample Answer</summary>

**Answer:** CommonJS is the old syntax — send with `module.exports`, receive with `require()`. ES Modules is the new official syntax — send with `export`, receive with `import`. Next.js/React use ES Modules.

</details>

3. Why set `"type": "module"`?

<details>
<summary>Sample Answer</summary>

**Answer:** To tell Node the project uses ES Modules. Without it Node assumes CommonJS and throws an error when you use `import`.

</details>

4. What's the difference between default export and named export?

<details>
<summary>Sample Answer</summary>

**Answer:** Named export sends multiple things and imports with `{ name }`. Default export sends one main thing, imports without curly braces, and you can name it anything.

</details>

## What It Is NOT

⚠️ **Modules are NOT only a Node thing.** Browsers also have ES Modules (with `type="module"` in the script tag). But file system and path resolution are Node's own.

⚠️ **CommonJS is NOT "wrong/outdated".** It still works and many packages use it. You need to understand both — whatever you encounter, you should be able to use it.

⚠️ **`require` vs `import` are NOT exactly the same.** The job is the same (sharing code), but the rules differ (synchronous vs async loading, file extension rules). Don't panic — recognize the syntax, the job is the same.

⚠️ **`module.exports` and `exports` are NOT always the same.** `module.exports` replaces the object; `exports` is a reference to that same object. To avoid confusion, always use `module.exports`.

---

Now you have the power to split code. The next question — when a project grows, where do dependencies come from? Do you write React Router, Express, zod yourself? No — you install them with **npm**. Next topic: **npm — Node Package Manager**. Let's go.
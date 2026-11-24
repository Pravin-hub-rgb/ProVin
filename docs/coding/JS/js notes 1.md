# JavaScript Notes 1 — Foundations

## Full Course Roadmap (all 3 parts)

**Part 1 — Foundations (this file)**
- JS history & setup
- var / let / const
- Data types, coercion, equality
- Operators
- Conditionals, loops
- Functions (all forms, template literals)
- Arrays + methods
- Objects (destructuring, spread)
- DOM intro

**Part 2 — DOM, Events, Forms, Timers, Storage** (`js notes 2.md`)
- DOM mindset & selection
- Text / HTML / attributes / CSS
- Tree navigation & manipulation
- Events & handling
- Bubbling & delegation
- Forms & validation
- Timers & intervals (debounce / throttle)
- localStorage / sessionStorage / cookies
- Project: Card Stack

**Part 3 — Advanced JS** (`js notes 3.md`)
- Scope, execution context, closures
- this, new, OOP
- Callbacks, promises, async / await
- Fetch API & HTTP
- Projects (API app)

---

## 1. Setup
Folder + `index.html` + `script.js`, link via `<script src="script.js"></script>`, open with Live Server. Console via DevTools.

## 2. Variables
```js
var x = 1;   // function-scoped, hoisted (avoid)
let y = 2;   // block-scoped, reassignable
const z = 3; // block-scoped, not reassignable
```
`const` objects/arrays can still be mutated (binding fixed, contents not).

## 3. Data Types
Primitives (by value): `string, number, boolean, null, undefined, symbol, bigint`.  
Reference (by ref): `object, array, function`.  
`typeof null === "object"` (bug). `null` = empty on purpose; `undefined` = not assigned.

## 4. Coercion & Equality
`==` coerces; `===` strict. Always `===`. `0 == false` true; `0 === false` false.

## 5. Operators
Arithmetic `+ - * / % **`, comparison, logical `&& || !` (short-circuit), assignment, ternary `? :`, nullish `??`, optional chaining `?.`.

## 6. Conditionals & Loops
```js
if (c) {} else if (c2) {} else {}
switch (x) { case 1: ...; break; default: ... }
for (let i=0; i<n; i++) {}
while (c) {}
for (const v of arr) {}   // values
for (const k in obj) {}   // keys
```

## 7. Functions
```js
function add(a,b){ return a+b; }          // declaration (hoisted)
const add = function(a,b){ return a+b; }; // expression
const add = (a,b) => a+b;                 // arrow
function g(name="stranger"){}             // default
function s(...nums){}                     // rest
(function(){ /* iife */ })();             // iife
```
Template literals: `` `Hello ${name}` ``.

## 8. Arrays
```js
arr.push(x); arr.pop(); arr.slice(0,2); arr.splice(1,1);
arr.map(n=>n*2); arr.filter(n=>n%2===0); arr.reduce((a,c)=>a+c,0);
arr.find(x=>x.id===3); arr.some(...); arr.every(...); arr.forEach(...);
```
`sort` mutates — pass comparator for numbers: `arr.sort((a,b)=>a-b)`.

## 9. Objects
```js
const { name, age=18 } = user;     // destructure
const copy = { ...user, age: 26 }; // spread
```

## 10. DOM Intro
```js
const h1 = document.querySelector("h1");
h1.textContent = "Hello"; h1.style.color = "red";
h1.classList.add("active");
document.querySelector("#btn").addEventListener("click", ()=>console.log("clicked"));
```
Selection: `getElementById`, `getElementsByClassName`, `querySelector`, `querySelectorAll`.

*End of Notes 1.*
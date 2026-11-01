# JavaScript Course Roadmap — Learn What Matters (Fullstack/Frontend)

> One file. No fluff. Everything that actually gets asked. Go phase by phase, don't skip.

---

## Phase 1 — Foundations (Don't skip this, everything builds on it)

### 1.1 var / let / const

- `var` is function-scoped, gets hoisted, can be re-declared. Avoid it.
- `let` is block-scoped, can be reassigned, not re-declared.
- `const` is block-scoped, cannot be reassigned. But objects/arrays declared with const can still be mutated.
- **Interview Q:** What is the difference between var, let, and const?

```js
var x = 1;
var x = 2; // no error, bad

let y = 1;
// let y = 2; // SyntaxError

const obj = { a: 1 };
obj.a = 99; // allowed — mutation, not reassignment
```

---

### 1.2 Data Types

**Primitives** (stored by value):
- `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

**Reference types** (stored by reference):
- `object`, `array`, `function`

```js
let a = 5;
let b = a;
b = 10;
console.log(a); // still 5 — copied by value

let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 99;
console.log(obj1.x); // 99 — same reference
```

- `typeof null` returns `"object"` — this is a known JS bug, not a feature
- `null` means intentionally empty. `undefined` means declared but not assigned yet.

---

### 1.3 Scope

- **Global scope** — accessible everywhere
- **Function scope** — variables inside a function, not accessible outside
- **Block scope** — inside `{}`, only `let` and `const` respect this
- **Lexical scope** — a function can access variables from where it was *defined*, not where it's *called*. This is the foundation of closures.

```js
function outer() {
  let name = "yaar";
  function inner() {
    console.log(name); // works — lexical scope
  }
  inner();
}
```

---

### 1.4 Hoisting

JS moves declarations to the top of their scope before execution.

- `var` → hoisted and initialized as `undefined`
- `let` / `const` → hoisted but NOT initialized → Temporal Dead Zone (TDZ) → ReferenceError if accessed early
- Function declarations → fully hoisted (you can call them before they appear in code)
- Function expressions (`const fn = function() {}`) → NOT hoisted

```js
console.log(a); // undefined (not error)
var a = 5;

console.log(b); // ReferenceError
let b = 5;

greet(); // works
function greet() { console.log("hi"); }

sayHi(); // TypeError — not a function yet
var sayHi = function() { console.log("hi"); };
```

---

### 1.5 Type Coercion & Equality

- `==` → loose equality, converts types before comparing
- `===` → strict equality, no conversion. Always use this.

```js
0 == false   // true (coercion)
0 === false  // false (strict)
null == undefined  // true
null === undefined // false
"5" == 5   // true
"5" === 5  // false
```

---

### 1.6 Functions — All Forms

```js
// Function declaration (hoisted)
function add(a, b) { return a + b; }

// Function expression (not hoisted)
const add = function(a, b) { return a + b; };

// Arrow function (no own `this`, no `arguments` object)
const add = (a, b) => a + b;

// Default parameters
function greet(name = "stranger") { return `Hello ${name}`; }

// Rest parameters — collects remaining args into array
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
sum(1, 2, 3, 4); // 10
```

---

### 1.7 Template Literals

```js
const name = "Arjun";
console.log(`Hello ${name}, you are ${20 + 1} years old`);

// Multi-line
const html = `
  <div>
    <p>${name}</p>
  </div>
`;
```

---

## Phase 2 — Core Concepts (Most Asked in Interviews)

### 2.1 Closures ⭐ (Very Frequently Asked)

A closure is when a function **remembers** variables from its outer scope even after that outer function has finished executing.

Why it works: because of **lexical scope** — the inner function holds a reference to the outer scope's variables, not a copy.

```js
function counter() {
  let count = 0; // this stays alive because inner function references it
  return function() {
    count++;
    return count;
  };
}

const increment = counter();
increment(); // 1
increment(); // 2
increment(); // 3
// count is private — can't access it directly from outside
```

**Real use cases:**
- Data privacy (above example)
- Memoization (caching results)
- Event handlers in loops
- Function factories (functions that create other functions)

```js
// closure in a loop — common interview trap
for (var i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 100);
}
// prints 3, 3, 3 — because var is function scoped, all share same i

// fix with let (block scoped, new i each iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 100);
}
// prints 0, 1, 2
```

---

### 2.2 `this` Keyword ⭐ (Very Frequently Asked)

`this` refers to the object that is **calling** the function. Its value depends on *how* the function is called, not where it's defined.

| Context | `this` refers to |
|---|---|
| Global scope | `window` (browser) / `global` (Node) |
| Regular function | depends on how it's called |
| Object method | the object itself |
| Arrow function | `this` from surrounding lexical scope (no own `this`) |
| `new` keyword | the newly created object |
| `call/apply/bind` | explicitly set |

```js
const user = {
  name: "Arjun",
  greet: function() {
    console.log(this.name); // "Arjun" — this = user object
  },
  greetArrow: () => {
    console.log(this.name); // undefined — arrow has no own this
  }
};

// Arrow functions are dangerous as object methods if you need `this`
```

---

### 2.3 call, apply, bind ⭐

All three let you manually set what `this` is.

```js
function introduce(city, country) {
  console.log(`I am ${this.name} from ${city}, ${country}`);
}

const person = { name: "Arjun" };

// call — invoke immediately, args passed one by one
introduce.call(person, "Delhi", "India");

// apply — invoke immediately, args passed as array
introduce.apply(person, ["Delhi", "India"]);

// bind — returns a NEW function with this fixed, doesn't call immediately
const boundFn = introduce.bind(person, "Delhi");
boundFn("India"); // call later
```

**Interview tip:** bind is what you do in React class components — `this.handleClick = this.handleClick.bind(this)` in constructor.

---

### 2.4 Prototype & Prototype Chain ⭐ (Frequently Asked)

Every object in JS has a hidden `__proto__` property pointing to another object — its prototype. This creates a **prototype chain**.

When you access a property, JS looks:
1. On the object itself
2. Then on `__proto__`
3. Then on `__proto__.__proto__`
4. Until it reaches `null` (end of chain)

```js
const animal = {
  breathe() { console.log("breathing"); }
};

const dog = {
  bark() { console.log("woof"); }
};

Object.setPrototypeOf(dog, animal); // dog's prototype = animal

dog.bark();    // found on dog itself
dog.breathe(); // not on dog → found on prototype (animal)
```

**Constructor functions and prototype:**
```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hi I'm ${this.name}`);
};

const p1 = new Person("Arjun");
p1.greet(); // works — greet is on Person.prototype, shared by all instances

// hasOwnProperty — check if property is directly on object, not prototype
p1.hasOwnProperty("name");  // true
p1.hasOwnProperty("greet"); // false
```

---

### 2.5 Classes ⭐

ES6 classes are **syntax sugar** over prototype-based inheritance. Under the hood, it's still prototypes.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }

  static create(name) { // static — called on class, not instance
    return new Animal(name);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // must call super before using this
    this.breed = breed;
  }

  speak() { // overrides parent method
    console.log(`${this.name} barks`);
  }
}

const d = new Dog("Bruno", "Lab");
d.speak(); // Bruno barks
d instanceof Dog;    // true
d instanceof Animal; // true
```

---

### 2.6 IIFE (Immediately Invoked Function Expression)

A function that runs immediately after being defined. Used to avoid polluting the global scope.

```js
(function() {
  let secret = "hidden";
  console.log("runs immediately");
})();

// secret is not accessible here
```

---

## Phase 3 — Async JavaScript (Very Heavily Tested)

### 3.1 Synchronous vs Asynchronous ⭐

- **Synchronous** — code runs line by line, one at a time. Next line waits for current to finish.
- **Asynchronous** — code doesn't block. You start an operation (API call, timer), JS continues to next line, and comes back when the result is ready.

```js
// Sync — blocks
console.log("1");
console.log("2"); // waits for 1 to finish
console.log("3");

// Async — doesn't block
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
// Output: 1, 3, 2
```

---

### 3.2 Event Loop ⭐ (Heavily Asked — Understand This Deeply)

JS is **single-threaded** — it has one call stack. But it can handle async operations without blocking because of the event loop.

**The components:**
- **Call Stack** — where your code runs, one at a time (LIFO)
- **Web APIs** — browser handles async stuff here (setTimeout, fetch, DOM events)
- **Callback Queue (Task Queue)** — callbacks from Web APIs wait here
- **Microtask Queue** — Promise callbacks go here (higher priority than callback queue)
- **Event Loop** — constantly checks: is call stack empty? → take from microtask queue first, then callback queue

**Order of execution:**
1. All synchronous code runs
2. Microtasks (Promise `.then`, `queueMicrotask`) — entire queue drains
3. One macrotask (setTimeout, setInterval callback)
4. Repeat

```js
console.log("1");

setTimeout(() => console.log("2"), 0); // macrotask queue

Promise.resolve().then(() => console.log("3")); // microtask queue

console.log("4");

// Output: 1, 4, 3, 2
// Sync first → microtask (promise) → macrotask (setTimeout)
```

---

### 3.3 Callbacks

A function passed as an argument to be called later.

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("data received");
  }, 1000);
}

fetchData(function(data) {
  console.log(data);
});
```

**Callback hell** — deeply nested callbacks, hard to read/maintain. This is why Promises were introduced.

```js
// callback hell — avoid this
doStep1(function(result1) {
  doStep2(result1, function(result2) {
    doStep3(result2, function(result3) {
      // deeply nested, nightmare to maintain
    });
  });
});
```

---

### 3.4 Promises ⭐

A Promise is an object representing the eventual result of an async operation. Has 3 states: **pending**, **fulfilled**, **rejected**.

```js
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("data");
  else reject("error");
});

promise
  .then(data => console.log(data))   // on success
  .catch(err => console.log(err))    // on failure
  .finally(() => console.log("done")); // always runs
```

**Promise combinators:**
```js
// Promise.all — waits for ALL to resolve, fails if any fail
Promise.all([fetch('/a'), fetch('/b'), fetch('/c')])
  .then(([a, b, c]) => console.log(a, b, c));

// Promise.allSettled — waits for ALL, returns all results regardless
Promise.allSettled([p1, p2, p3])
  .then(results => results.forEach(r => console.log(r.status)));

// Promise.race — resolves/rejects with FIRST one to settle
Promise.race([slowApi, fastApi]).then(first => console.log(first));

// Promise.any — resolves with FIRST success, fails only if ALL fail
Promise.any([p1, p2, p3]).then(first => console.log(first));
```

---

### 3.5 async / await ⭐ (Heavily Asked)

Syntactic sugar over Promises. Makes async code look synchronous — easier to read and reason about.

`async` function always returns a Promise. `await` pauses inside the async function until the promise resolves.

```js
async function getUserData(id) {
  try {
    const response = await fetch(`/api/users/${id}`); // pauses here
    const data = await response.json();               // then pauses here
    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}
```

**Promise vs async/await — when to use what:**
- async/await for sequential operations (one after another)
- `Promise.all` when you need parallel operations (don't await one by one — it's slower)

```js
// WRONG — sequential, slow (3 seconds total)
const a = await fetch('/api/a');
const b = await fetch('/api/b');
const c = await fetch('/api/c');

// RIGHT — parallel, fast (only as long as slowest)
const [a, b, c] = await Promise.all([fetch('/api/a'), fetch('/api/b'), fetch('/api/c')]);
```

---

### 3.6 Fetch API

```js
async function getUser() {
  const res = await fetch('https://api.example.com/user/1');

  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data = await res.json();
  return data;
}

// POST request
async function createUser(userData) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await res.json();
}
```

---

## Phase 4 — Arrays, Objects & Functional Patterns

### 4.1 Array Methods ⭐ (You'll Use These Every Day in React)

**`map`** — transform each element, returns new array (same length)
```js
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]

// React use case — rendering lists
const items = users.map(user => <UserCard key={user.id} user={user} />);
```

**`filter`** — keep elements that pass a test, returns new array
```js
const evens = nums.filter(n => n % 2 === 0); // [2]

// React use case
const activeUsers = users.filter(user => user.isActive);
```

**`reduce`** — accumulate array into single value (sum, object, anything)
```js
const total = nums.reduce((acc, curr) => acc + curr, 0); // 6

// Build an object from array
const usersById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
```

**`find`** — returns FIRST element that passes test (or undefined)
```js
const user = users.find(u => u.id === 3); // returns single object, not array
```

**`findIndex`** — returns index of first match (or -1)
```js
const idx = users.findIndex(u => u.id === 3);
```

**`some`** — returns true if AT LEAST ONE element passes test
```js
const hasAdmin = users.some(u => u.role === "admin"); // true/false
// React use case: checking if cart has out-of-stock items
const hasOutOfStock = cartItems.some(item => !item.inStock);
```

**`every`** — returns true if ALL elements pass test
```js
const allActive = users.every(u => u.isActive); // true/false
// React use case: check if all form fields are filled
const allFilled = fields.every(field => field.value !== "");
```

**`forEach`** — iterate over array, no return value (side effects only)
```js
users.forEach(user => console.log(user.name));
// Don't use when you need a new array — use map instead
```

**`flat`** — flatten nested arrays
```js
[1, [2, [3]]].flat();    // [1, 2, [3]] — one level
[1, [2, [3]]].flat(Infinity); // [1, 2, 3] — fully flat
```

**`flatMap`** — map + flat in one step
```js
const sentences = ["hello world", "foo bar"];
sentences.flatMap(s => s.split(" ")); // ["hello", "world", "foo", "bar"]
```

**`includes`** — checks if value exists
```js
[1, 2, 3].includes(2); // true
```

**`indexOf`** — returns index of value (-1 if not found)
```js
[1, 2, 3].indexOf(2); // 1
```

**`slice`** — returns portion of array (non-mutating)
```js
[1, 2, 3, 4].slice(1, 3); // [2, 3]
```

**`splice`** — mutates array — remove/insert elements
```js
const arr = [1, 2, 3, 4];
arr.splice(1, 2);       // removes 2 elements from index 1 → arr is now [1, 4]
arr.splice(1, 0, 9, 8); // inserts 9, 8 at index 1
```

**`sort`** — sorts in place (mutates). Always pass comparator for numbers.
```js
["banana", "apple"].sort(); // alphabetical — fine for strings
[10, 1, 21].sort();         // WRONG — [1, 10, 21] compares as strings
[10, 1, 21].sort((a, b) => a - b); // CORRECT — [1, 10, 21] ascending
```

**`Array.from`** — create array from iterable or array-like
```js
Array.from("hello");        // ["h", "e", "l", "l", "o"]
Array.from({length: 3}, (_, i) => i); // [0, 1, 2]
```

---

### 4.2 Destructuring ⭐

```js
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Object destructuring
const { name, age, city = "Delhi" } = user; // city has default

// Rename while destructuring
const { name: userName } = user;

// Nested
const { address: { street } } = user;

// In function params — very common in React
function UserCard({ name, age, isAdmin = false }) {
  return <div>{name}</div>;
}
```

---

### 4.3 Spread & Rest Operator ⭐

```js
// Spread — expand iterable
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Copy array/object without mutation (shallow copy)
const newArr = [...arr1];
const newObj = { ...obj, updatedKey: "value" };

// Merge objects
const merged = { ...obj1, ...obj2 }; // obj2 values override obj1

// Rest — collect remaining into array
function sum(first, ...rest) {
  return first + rest.reduce((a, b) => a + b, 0);
}
```

---

### 4.4 Higher-Order Functions

A function that takes another function as argument OR returns a function.

`map`, `filter`, `reduce`, `forEach` are all higher-order functions.

```js
// Function that returns a function (uses closure)
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplier(2);
const triple = multiplier(3);
double(5); // 10
triple(5); // 15
```

---

### 4.5 Memoization ⭐ (Asked in Interviews)

Cache the result of expensive function calls. If same input is seen again, return cached result instead of recomputing.

```js
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("from cache");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function slowSquare(n) {
  // imagine this is expensive
  return n * n;
}

const fastSquare = memoize(slowSquare);
fastSquare(5); // computes
fastSquare(5); // from cache
```

**In React** — `useMemo` and `useCallback` are React's built-in memoization hooks. Understanding this concept explains why those hooks exist.

---

### 4.6 Currying

Transforming `f(a, b, c)` into `f(a)(b)(c)`. Allows partial application — pre-filling some arguments.

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function(...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
const addFive = curriedAdd(5); // partial application
addFive(3)(2); // 10
```

---

### 4.7 Pure Functions

A function that:
1. Given same input, always returns same output
2. Has no side effects (doesn't modify external state)

```js
// Pure
function add(a, b) { return a + b; }

// Impure — modifies external state
let total = 0;
function addToTotal(n) { total += n; } // side effect

// Impure — depends on external state
function getTime() { return Date.now(); } // different output each time
```

Pure functions are predictable, testable, and the foundation of React's design philosophy.

---

### 4.8 Optional Chaining & Nullish Coalescing

```js
// Optional chaining — safely access nested properties
const city = user?.address?.city; // undefined instead of throwing error
const firstHobby = user?.hobbies?.[0];
const result = user?.getAge?.(); // optional method call

// Nullish coalescing — fallback only for null/undefined (not 0 or "")
const name = user.name ?? "Anonymous";
// vs OR operator which treats 0, "", false as falsy too
const count = user.count || 10; // wrong if count is 0
const count = user.count ?? 10; // correct — only falls back if null/undefined
```

---

### 4.9 Short-circuit Evaluation

```js
// && — returns first falsy, or last value
const name = user && user.name; // if user is falsy, returns user (doesn't crash)

// || — returns first truthy, or last value
const displayName = username || "Guest";

// In React JSX
{isLoggedIn && <Dashboard />}  // only renders if isLoggedIn is truthy
```

---

## Phase 5 — DOM & Browser (Real Frontend Work)

### 5.1 DOM Manipulation

```js
// Select elements
document.querySelector(".class");     // first match
document.querySelectorAll(".class");  // NodeList of all matches
document.getElementById("id");

// Create & insert
const div = document.createElement("div");
div.textContent = "Hello";
div.classList.add("card");
document.body.appendChild(div);

// Modify
el.innerHTML = "<strong>bold</strong>"; // parses HTML — XSS risk
el.textContent = "safe text";          // plain text — safer

// Remove
el.remove();
parent.removeChild(child);

// Attributes
el.setAttribute("data-id", "123");
el.getAttribute("data-id");
```

---

### 5.2 Events

```js
const btn = document.querySelector("#btn");

btn.addEventListener("click", function(event) {
  event.preventDefault();  // stop default browser behavior (form submit, link follow)
  event.stopPropagation(); // stop bubbling up
  console.log(event.target); // element that was clicked
});

// Remove event listener (must pass same function reference)
function handleClick() { console.log("clicked"); }
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);
```

---

### 5.3 Event Bubbling ⭐ (Frequently Asked)

When an event fires on an element, it **bubbles up** through its ancestors — from child to parent to grandparent to document.

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>
```

```js
document.getElementById("btn").addEventListener("click", () => console.log("button"));
document.getElementById("inner").addEventListener("click", () => console.log("inner"));
document.getElementById("outer").addEventListener("click", () => console.log("outer"));

// Click button → logs: button → inner → outer (bubbles up)
```

**Capturing vs Bubbling:**
- Bubbling: event goes UP from target (default)
- Capturing: event comes DOWN from document (use `{ capture: true }` as 3rd arg)

---

### 5.4 Event Delegation ⭐ (Frequently Asked)

Instead of attaching listeners to many child elements, attach ONE listener to the parent and use `event.target` to figure out what was clicked.

Why: efficient, and works for dynamically added elements.

```js
// Bad — attach to each item (breaks for dynamically added items)
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", handleClick);
});

// Good — one listener on parent
document.querySelector(".list").addEventListener("click", function(e) {
  if (e.target.classList.contains("item")) {
    console.log("item clicked:", e.target.textContent);
  }
});
```

---

### 5.5 Debounce & Throttle ⭐ (Heavily Asked)

**Debounce** — wait until the user STOPS doing something, then fire once. Good for: search input, window resize.

```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce(function(e) {
  console.log("Searching:", e.target.value); // fires 500ms after typing stops
}, 500);

input.addEventListener("input", handleSearch);
```

**Throttle** — fire at most once every X milliseconds, no matter how often triggered. Good for: scroll events, button clicks.

```js
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

window.addEventListener("scroll", throttle(function() {
  console.log("scroll event");
}, 200));
```

---

### 5.6 localStorage & sessionStorage

```js
// localStorage — persists across browser sessions
localStorage.setItem("user", JSON.stringify({ name: "Arjun" }));
const user = JSON.parse(localStorage.getItem("user"));
localStorage.removeItem("user");
localStorage.clear();

// sessionStorage — cleared when tab is closed
sessionStorage.setItem("token", "abc123");
```

---

## Phase 6 — Advanced Topics (Shows Depth in Interviews)

### 6.1 Modules (import / export) ⭐

```js
// Named exports — can export multiple things
export const PI = 3.14;
export function add(a, b) { return a + b; }
export class User { ... }

// Default export — one per file
export default function App() { ... }

// Importing named
import { add, PI } from './utils.js';
import { add as addNumbers } from './utils.js'; // rename

// Importing default
import App from './App.js';

// Import all named exports as namespace
import * as utils from './utils.js';
utils.add(1, 2);
```

---

### 6.2 Error Handling

```js
// try/catch/finally
try {
  const data = JSON.parse(invalidJSON); // throws SyntaxError
} catch (err) {
  console.log(err.name);    // SyntaxError
  console.log(err.message); // details
} finally {
  console.log("always runs — cleanup here");
}

// Custom errors
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

throw new ValidationError("Email is invalid", "email");

// Async error handling
async function fetchUser() {
  try {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
```

---

### 6.3 Design Patterns (Asked at Mid/Senior Level)

**Module Pattern** — using closures to create private state
```js
const counter = (function() {
  let count = 0; // private
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
})();

counter.increment();
counter.getCount(); // 1
// count is not accessible directly
```

**Observer Pattern** — subscribe/unsubscribe to events (used in React state management, Redux)
```js
class EventEmitter {
  constructor() { this.events = {}; }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, data) {
    (this.events[event] || []).forEach(listener => listener(data));
  }

  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter(l => l !== listener);
  }
}
```

**Singleton Pattern** — only one instance
```js
class Config {
  constructor() {
    if (Config.instance) return Config.instance;
    this.settings = {};
    Config.instance = this;
  }
}

const a = new Config();
const b = new Config();
a === b; // true — same instance
```

---

### 6.4 Memory & Performance

**Memory leaks** — common causes:
- Forgotten event listeners (always removeEventListener when component unmounts)
- Global variables holding references
- Closures holding large objects unintentionally
- Timers not cleared (`clearTimeout`, `clearInterval`)

**Garbage collection** — JS automatically frees memory that has no more references. If something still has a reference, it stays in memory.

```js
// Memory leak — listener never removed
function setup() {
  const bigArray = new Array(1000000).fill("data");
  document.addEventListener("click", function() {
    console.log(bigArray); // bigArray stays in memory forever
  });
}

// Fix
function setup() {
  const bigArray = new Array(1000000).fill("data");
  function handleClick() { console.log(bigArray); }
  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick); // cleanup
}
```

---

### 6.5 Generators (Good to Know)

Functions that can pause and resume. Use `function*` and `yield`.

```js
function* counter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = counter();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 2
```

Not commonly asked at junior level, but good to know they exist.

---

## Quick Reference — What Maps to What in React

| JS Concept | Where you'll see it in React |
|---|---|
| Closures | useState, useCallback, event handlers |
| Higher-order functions | map/filter for rendering lists |
| Async/await + fetch | useEffect for API calls |
| Spread operator | Immutable state updates `{...state, key: val}` |
| Destructuring | Props `({ name, age })`, useState `const [x, setX]` |
| Modules | Every import/export in React files |
| Pure functions | React components should be pure |
| Memoization | useMemo, useCallback hooks |
| Event delegation | React's synthetic event system |
| Prototype/classes | Understanding class components |
| this + bind | Class component event handlers |
| Debounce | Optimizing search/scroll handlers |
| Optional chaining | Safely accessing API response data |
| some/every | Form validation, conditional rendering |

---

## Study Order

```
Phase 1 (Foundations)
  ↓
Phase 2 (Core — closures, this, prototype, classes)
  ↓
Phase 3 (Async — event loop, promises, async/await)
  ↓
Phase 4 (Arrays, objects, functional patterns)
  ↓
Phase 5 (DOM, events, debounce)
  ↓
Phase 6 (Advanced — design patterns, error handling)
  ↓
React
```

---

*Build something at each phase. Don't just read. Write the code.*

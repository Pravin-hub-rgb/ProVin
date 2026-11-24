# JavaScript Notes 3 — Advanced JS

## 1. Scope
Global (anywhere), function (inside function), block (inside `{}`, let/const). `var` is function-scoped.

## 2. Execution Context
Box created when code runs: variable env, scope chain, `this`. Global first, then per function call. Call stack.

## 3. Closures
Function remembering outer variables after outer finishes.
```js
function counter(){ let c=0; return ()=>++c; }
const inc = counter(); inc(); // 1
```
Loop trap: `var` in for+setTimeout prints last value; use `let`.

## 4. this & new
`this`: global→window, method→object, arrow→lexical, new→instance, call/apply/bind→set.  
`new` creates object, links prototype, binds `this`, returns instance.
```js
function Person(name){ this.name=name; }
const p = new Person("Arjun");
```
Classes are sugar over prototypes.

## 5. OOP
Prototype chain: lookup walks `__proto__` until null. Inheritance via `Object.create` / `extends`. `instanceof`, `hasOwnProperty`.

## 6. Callbacks & Async
```js
function fetch(cb){ setTimeout(()=>cb("data"),1000); }
```
Callback hell → promises. States: pending/fulfilled/rejected.
```js
new Promise((res,rej)=>{...}).then(d=>...).catch(e=>...).finally(()=>...);
```
async/await:
```js
async function get(id){
  const r = await fetch(`/api/${id}`);
  if(!r.ok) throw new Error(r.status);
  return r.json();
}
```
Parallel: `await Promise.all([fetch(a), fetch(b)])`.

## 7. Fetch API
```js
const res = await fetch(url);
if(!res.ok) throw new Error(res.status);
const data = await res.json();
// POST
await fetch(url, { method:"POST", headers:{'Content-Type':'application/json'}, body:JSON.stringify(obj) });
```
fetch resolves even on 404/500 — check `res.ok`. Methods: GET/POST/PUT/PATCH/DELETE. Status: 2xx ok, 4xx client, 5xx server.

## 8. Project — API App
Fetch → check ok → parse JSON → render; handle loading/error states.
```js
async function loadPosts(){
  const c = document.querySelector("#posts");
  c.innerHTML = "<p>Loading…</p>";
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    const posts = await r.json();
    c.innerHTML = posts.map(p=>`<article><h3>${p.title}</h3><p>${p.body}</p></article>`).join("");
  } catch(e){ c.innerHTML = `<p>Failed: ${e.message}</p>`; }
}
loadPosts();
```

## 9. Common Mistakes
- Forgetting `new` → `this` is window/undefined.
- Not checking `res.ok`.
- Sequential awaits where `Promise.all` fits.
- Mutating prototype affecting all instances.
- Leaking closures holding large objects.

*End of Notes 3.*
# JavaScript Notes 2 — DOM, Events, Forms, Timers, Storage

## 1. DOM Mindset
DOM = browser's live tree of HTML. Select → change. Six ops: select, text, HTML, CSS, attributes, events.

## 2. Selecting
```js
document.getElementById("abc")              // single
document.getElementsByClassName("abc")      // collection
document.querySelector(".card")             // first match
document.querySelectorAll(".card")          // NodeList (static)
```
`console.dir(el)` to inspect properties. Convert NodeList: `Array.from(nl)`.

## 3. Changing
```js
el.textContent = "text";        // safe
el.innerHTML = "<b>html</b>";   // parses (XSS risk)
el.setAttribute("src","x.jpg"); el.getAttribute("src");
el.style.color = "red"; el.style.fontSize = "24px";
el.classList.add/remove/toggle("active");
```
Text appears in `innerHTML`, `innerText`, `textContent`.

## 4. Tree Navigation & Manipulation
```js
el.firstElementChild; el.lastElementChild; el.children; el.nextElementSibling;
parent.appendChild(node);
parent.insertBefore(node, referenceNode);
el.remove(); parent.removeChild(child);
container.innerHTML = "";   // clear
const div = document.createElement("div"); div.className="card";
```

## 5. Events
```js
btn.addEventListener("click", (e) => {
  e.preventDefault();     // stop default
  e.stopPropagation();    // stop bubbling
  console.log(e.target);
});
btn.removeEventListener("click", fn);  // needs same ref
```
Common: click, input, change, submit, keydown, scroll, load.

## 6. Bubbling & Delegation
Bubbling: event travels up child→parent→… Use `{ capture: true }` for top-down.  
Delegation: one listener on parent, check `e.target` — handles dynamic children.
```js
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) console.log(e.target.textContent);
});
```

## 7. Forms & Validation
```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(data.get("name"));
});
```
HTML5: `required`, `type="email"`, `minlength`, `pattern`.  
JS: `form.checkValidity()`, `form.reportValidity()`, `form.reset()`.

## 8. Timers
```js
const t = setTimeout(() => {...}, 2000); clearTimeout(t);
const id = setInterval(() => {...}, 1000); clearInterval(id);
```
Always clear. Debounce: fire after user stops. Throttle: fire at most once per X ms.

## 9. Storage & Cookies
```js
localStorage.setItem("k", JSON.stringify(obj));
const v = JSON.parse(localStorage.getItem("k"));
sessionStorage.setItem("token", "abc");   // cleared on tab close
document.cookie = "theme=dark; max-age=86400; path=/";
```
Pick: persist prefs → localStorage; per-tab → sessionStorage; server needs it → cookies. Stringify objects. Never store secrets in localStorage.

## 10. Project — Card Stack
Stack of cards; Up moves last→front, Down moves first→end; add via form; persist localStorage.

```js
const stack = document.querySelector("#stack");
function updateStack() {
  const cards = stack.querySelectorAll(".card");
  for (let i = 0; i < 3 && i < cards.length; i++) {
    cards[i].style.zIndex = String(cards.length - i);
    cards[i].style.transform = `translateY(${i*10}px) scale(${1 - i*0.02})`;
    cards[i].style.opacity = String(1 - i*0.2);
  }
}
document.querySelector("#upBtn").addEventListener("click", () => {
  const last = stack.lastElementChild;
  if (last) { stack.insertBefore(last, stack.firstElementChild); updateStack(); }
});
document.querySelector("#downBtn").addEventListener("click", () => {
  const first = stack.firstElementChild;
  if (first) { stack.appendChild(first); updateStack(); }
});
document.querySelector("#addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${d.get("img")}"><p>${d.get("name")}</p>`;
  stack.insertBefore(card, stack.firstElementChild);
  localStorage.setItem("stack", stack.innerHTML);
  updateStack(); e.target.reset();
});
```
Bugs hit: duplicates on re-render → clear with `innerHTML=""` first; `forEach` styled all cards → cap loop at 3.  
Checkpoint: stack shows depth; Up/Down move cards; add persists after refresh.

*End of Notes 2.*
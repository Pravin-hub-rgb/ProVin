In the previous file we saw that Node sends async work to the background and returns the result via a **callback**. But there's a problem — when many async tasks must run one after another, what happens?

## Callback Hell — Pyramids of Doom

Think of a real scenario — **online order flow**:

1. User places an order
2. Save the order to the database
3. Process the payment
4. Send a confirmation email

Every step is async and the next step needs the result of the previous one. With callbacks it looks like this:

```javascript
saveOrder(order, (orderErr, savedOrder) => {
  if (orderErr) {
    console.error(orderErr);
    return;
  }
  processPayment(savedOrder, (payErr, payment) => {
    if (payErr) {
      console.error(payErr);
      return;
    }
    sendEmail(payment, (emailErr, result) => {
      if (emailErr) {
        console.error(emailErr);
        return;
      }
      console.log("Order complete:", result);
    });
  });
});
```

See what happened? **A pyramid of nested callbacks.** Every async step is one level deeper. With 5-6 steps the code becomes impossible to read. This is called **Callback Hell**.

The problem isn't just "ugly code" — **error handling repeats**, nesting gets deep, and when every function needs `if (err)` written, bugs creep in. The JavaScript community hit this wall and created **Promises**.

## Promise — An Object That "Will Eventually Complete"

A **Promise** is an object that represents that some async operation **will eventually** complete — either with success (resolve) or failure (reject).

Think of an online order's status — "Order placed. Processing..." — something will happen now, but it's pending for now. A Promise is the same — it starts in a **pending** state, then becomes **fulfilled** (resolve) or **rejected** (reject).

## Creating a Promise — `new Promise`

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // async work (example: timer)
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data mil gaya");     // success → resolve
      } else {
        reject("Error aa gaya");      // failure → reject
      }
    }, 1000);
  });
};
```

- `new Promise((resolve, reject) => {...})` — you get an executor function
- `resolve(value)` — call with a value on success
- `reject(error)` — call with an error on failure

## Using a Promise — `.then` / `.catch`

```javascript
fetchData()
  .then((result) => console.log(result))   // runs on resolve
  .catch((error) => console.error(error)); // runs on reject
```

**Chaining — The Solution to Callback Hell:**

With Promises, sequential async work is written like a chain — **flat, not nested:**

```javascript
saveOrder(order)
  .then((savedOrder) => processPayment(savedOrder))
  .then((payment) => sendEmail(payment))
  .then((result) => console.log("Order complete:", result))
  .catch((error) => console.error(error));
```

Look — every step is at its own level, the chain builds with `.then`, and **one `.catch` handles all errors.** The nested pyramid is gone. The return value of each `.then` goes into the next `.then`.

## Async/Await — The Cleaner Version of Promises

Promises are flat, but `.then` chaining is still "promise-style". JavaScript gave an even cleaner way — **`async`/`await`**. It looks like synchronous code, but it's actually async.

```javascript
async function getData() {
  try {
    const result = await fetchData();  // waits here until resolve
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

- `async` function — marks it as "await will be used inside"
- `await` — **waits** for the Promise to resolve (but the thread doesn't block!)
- `try/catch` — cleaner error handling

**The same order flow with async/await:**

```javascript
async function placeOrder(order) {
  try {
    const savedOrder = await saveOrder(order);
    const payment = await processPayment(savedOrder);
    const result = await sendEmail(payment);
    console.log("Order complete:", result);
  } catch (error) {
    console.error(error);
  }
}
```

Read it — **it looks exactly like synchronous code**, but it's actually async. Each `await` pauses that line until the Promise settles, but the thread is not blocked.

## All Three Ways — Same Task, Compared

Create a function that prints "Order placed" after 2 seconds — in all three ways:

**1. Callback:**

```javascript
setTimeout(() => {
  console.log("Order placed");
}, 2000);
```

**2. Promise:**

```javascript
const placeOrder = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order placed");
      resolve();
    }, 2000);
  });
};
placeOrder();
```

**3. Async/Await:**

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function placeOrder() {
  await delay(2000);
  console.log("Order placed");
}
placeOrder();
```

**See the evolution:** Callback → Promise (chainable) → async/await (looks synchronous but is async). This is the real **"Manual → Better"** example — the job is the same, the way of writing it got better.

## Where You'll Use This in React/Next.js

When you fetch data in Next.js:

```javascript
async function getProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();
  return data;
}
```

`await fetch()` — it's a Promise, waited with `await`. `res.json()` — also a Promise, parsed with `await`. **This pattern will come up again and again** — data fetching, form submission, mutations. Nail it here.

## Common Mistakes

- ❌ Forgetting `await` inside an async function — the function is async but without await it won't wait for the Promise to resolve; you'll get a pending Promise directly.
- ❌ Using `await` in a non-async function — error: "await is only valid in async function". Make the function `async`.
- ❌ Forgetting to call `resolve`/`reject` in a Promise — the Promise stays pending forever, `.then` never runs, the app feels hung.
- ❌ Not using `.catch` or `try/catch` — a rejected Promise's error silently disappears or throws an unhandled rejection error.
- ❌ Putting synchronous work inside `new Promise` — if the inside is sync, you don't need a Promise. Promises are only for wrapping async.

## In Your Own Words

1. What is callback hell and why does it happen?

<details>
<summary>Sample Answer</summary>

**Answer:** When multiple async tasks must run one after another (order → payment → email), nesting callbacks creates a pyramid. The code becomes hard to read and error handling repeats. That's callback hell.

</details>

2. What does a Promise represent?

<details>
<summary>Sample Answer</summary>

**Answer:** A Promise is an object representing the eventual result of an async operation — starts in pending state, then becomes resolve (fulfilled) or reject (rejected). Handled with `.then`/`.catch`.

</details>

3. How does `.then()` chaining solve callback hell?

<details>
<summary>Sample Answer</summary>

**Answer:** Every async step chains via `.then()` — flat structure, not nested. The return value of each `.then` goes into the next `.then`, and a single `.catch` handles all errors.

</details>

4. What do `async`/`await` do and why `try/catch`?

<details>
<summary>Sample Answer</summary>

**Answer:** `async` marks a function as one where `await` will be used. `await` waits for the Promise to resolve (thread doesn't block). `try/catch` handles errors cleanly — like a Promise's `.catch`.

</details>

## What It Is NOT

⚠️ **`await` does NOT block the thread.** It only pauses that line until the Promise resolves, but the Event Loop stays free — other async work keeps running. This is different from blocking (04's `readFileSync`).

⚠️ **Callback is NOT "wrong/outdated".** Callbacks still exist (Event listeners, setTimeout). The problem is only **nested callbacks** (callback hell). A simple callback is fine.

⚠️ **A Promise is NOT the data of the async operation.** The Promise is the **contract/object** of "will arrive in the future". You access its data when you get the resolved value via `.then`/`await`.

⚠️ **async/await does NOT make it synchronous.** The code *looks* synchronous, but it behaves async. Race conditions remain the same.

---

Now you have the full async power set — callbacks, Promises, async/await. Use it to build something real — an **HTTP server**. Until you build a server, Node's whole point is incomplete. We'll build a raw Node server manually — so you understand what's behind Express/Next.js. Next topic: **HTTP Server**. Let's go.
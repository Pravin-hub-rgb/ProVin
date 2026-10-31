In the previous file we saw that packages come via npm. Now another real question — **Node runs on a single thread, so how does it handle so many requests?** Think of a restaurant.

## The Waiter Example — Standing and Waiting Is Not the Job

A restaurant has one **waiter (Node)**. Table 1 orders pasta. The waiter takes the order to the kitchen and **doesn't stand there waiting** — he goes to Table 2, takes their order (coffee), takes it to the kitchen, goes to Table 3... When the pasta is ready, he picks it up from the kitchen and serves Table 1.

This waiter is one person, but **he never blocks for anyone** — he doesn't wait, he keeps doing the next task. That's Node.js's model.

## Single-Threaded, But Non-Blocking

Node.js runs JavaScript on **a single thread** (one thing at a time). Yet multiple things seem to happen together — **how?**

Because of the **Event Loop**. The basic idea:

1. When a **slow operation** comes (file read, network request, database query, timer) — Node **sends it to the background** (to the OS)
2. Node doesn't wait — **it runs the next line immediately**
3. When the background work completes, its result goes into a queue
4. The **Event Loop** watches that queue and processes the callback

In short — it **doesn't block (wait), it stays non-blocking.** Like the waiter.

## Blocking vs Non-Blocking — See It in Code

This code **blocks** (waits):

```javascript
// sync.js — BLOCKING (wrong way for slow work)
const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');  // waits here!
console.log('File:', data);
console.log('This prints after');
```

`readFileSync` — "Sync" is right in the name — it **waits** until the file is read. During that time Node can't do anything else — the whole program blocks.

Now the **non-blocking** version:

```javascript
// async.js — NON-BLOCKING (right way)
const fs = require('node:fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  console.log('File:', data);   // runs later, when file is read
});

console.log('This prints FIRST');  // didn't wait for the file
```

`readFile` (without Sync) — reads the file **in the background** and gives a callback. The next line runs immediately. Output:

```
This prints FIRST
File: <content>
```

**Notice the order:** "This prints FIRST" came first, file content later. Because `readFile` didn't wait — the callback went into the queue, the main code ran, and then the event loop ran the callback.

## The Event Loop Flow — Step by Step

```
main code runs
  ↓
slow operation (readFile) found → sent to background
  ↓
main code keeps running next lines (no wait)
  ↓
background work completes → callback goes into queue
  ↓
Event Loop checks queue → processes callback
  ↓
callback runs → file content printed
```

The **Event Loop** is a loop that keeps checking — "any task in the queue? yes? run it." Until the queue is empty.

## Why You Need to Understand This

React/Next.js have data fetching everywhere — `fetch`, database queries, API calls — all async (non-blocking). If this concept isn't clear:

- You won't understand what `await` is doing
- You won't understand why we fetch inside `useEffect`
- Race conditions, "why didn't this print in order" — you'll be confused

`await` is what organizes this non-blocking magic — with Promises. But for now the base idea of the Event Loop is enough. The real async patterns (callbacks, Promises, async/await) come in detail in the next topic.

## Common Mistakes

- ❌ Using `readFileSync`/`Sync` versions for slow work — they block and can freeze the server. Use non-blocking (`readFile`).
- ❌ Getting confused by output order — "main code first, callback later" is normal non-blocking behavior, not a bug.
- ❌ Thinking "single-threaded = one request at a time" — code runs on one thread, but I/O happens in the background, so many requests can be handled.
- ❌ Leaving CPU-heavy work (large computation) on the Event Loop — it doesn't go to the background and blocks the whole thread. Only I/O goes to the background.

## In Your Own Words

1. How does Node handle multiple requests when it's single-threaded?

<details>
<summary>Sample Answer</summary>

**Answer:** Because I/O (file read, network, database) is sent to the background and Node doesn't wait — it runs the next line immediately. When background work completes, the Event Loop processes the callback. One thread, but never blocked.

</details>

2. What's the difference between `readFileSync` and `readFile`?

<details>
<summary>Sample Answer</summary>

**Answer:** `readFileSync` is blocking — it waits until the file is read and the program doesn't move forward. `readFile` is non-blocking — it reads in the background, gives a callback, and the main code runs immediately.

</details>

3. What does the Event Loop do?

<details>
<summary>Sample Answer</summary>

**Answer:** The Event Loop is a continuous loop that picks up results of background tasks from the queue and processes them. When an async operation completes, its callback goes into the queue, and the Event Loop executes it.

</details>

4. Explain what Node does using the waiter analogy?

<details>
<summary>Sample Answer</summary>

**Answer:** The waiter (Node) takes the order to the kitchen (background I/O) and doesn't stand there waiting — he goes to the next table for the next order. When the food is ready (I/O complete), he serves it (callback). One waiter, never blocked.

</details>

## What It Is NOT

⚠️ **Single-threaded does NOT mean "can handle only one request".** Single thread is for code execution. I/O operations happen in the OS/background — that's why Node can handle thousands of concurrent requests.

⚠️ **The Event Loop does NOT send CPU-intensive work to the background.** File/network I/O goes to the background. Heavy computation (loops, large JSON processing) blocks the main thread — for that you need worker threads/queues.

⚠️ **Non-blocking does NOT mean "callbacks everywhere, no await".** Callbacks are the old way. Promises and async/await (next topic) make this clean.

⚠️ **"Sync = wrong, async = right" is NOT always true.** For small startup scripts, Sync is fine. In a server (where concurrency matters), non-blocking is essential.

---

Now you know Node doesn't wait — it sends work to the background and returns the result later via a callback. But with callbacks there's a problem — when multiple async tasks must run one after another, how do you write the code? **Callback Hell** and its solution (Promises, async/await) — next topic. Let's go.
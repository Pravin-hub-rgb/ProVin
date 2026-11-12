In T.9 you answered interview questions about TrackIt — questions like "how does your protected route work?" and "why did you use Redux Toolkit there?". Those questions assume the interviewer has *seen* your work and wants you to explain it. But there is a completely different kind of interview, one that happens before anyone has seen anything: the take-home assignment. A brief arrives, a clock starts, and you are alone with your skills. No guided steps, no T.1-through-T.9 safety net, no one to ask.

This project is a rehearsal for exactly that. Not because the TrackIt knowledge is missing — you have all of it — but because a take-home tests a different muscle: performing without guidance, under a clock, when something in the environment breaks. And before we get to your brief, here is the story of a real one.

---

## The Real Assignment This Rehearses

A developer applied at a mid-size product services company. Cleared the HR round — got on well, both sides optimistic. Then came the technical round: a take-home assignment, 4 hours, no AI tools, documentation allowed. The brief had five requirements:

1. Fetch book data from a public API endpoint.
2. Display a book listing with search and filtering.
3. Build a book details page.
4. Create a dashboard displaying statistics.
5. Implement a mock login system and protect the dashboard from unauthenticated users.

Then the surprise: the API endpoint the company provided was broken. Not slow — *broken*, returning errors on every call. A senior team member tried it too. Same errors. So the developer made a decision: mock the API response with an array of book objects, and keep building.

The clock kept running. Manually writing Tailwind classes, setting up components, implementing feature after feature — the four hours ran out before everything was done. The submission went in incomplete. After roughly an hour of waiting, then a few hours more: a rejection email. No feedback. Not one line explaining what fell short.

The developer wrote about it publicly afterwards — and the closing points were the mature ones. First: when an external dependency fails during an assessment, candidates should be evaluated with that limitation in mind. Second: even brief constructive feedback can make a real difference to someone trying to improve. Both fair. Neither changes the lesson for you, which is this: **the API failing was not what cost them — running out of a plan was.** Mocking the data was the right call. What was missing was the rest of the strategy: what to build first, what to cut when the clock squeezes, and how to submit in a way that shows judgment, not just code.

That strategy is teachable. That's what this doc is for. You get the same brief, the same clock, the same no-AI rule — plus the strategy the real candidate had to invent on the spot.

---

## The Brief — BookShelf Take-Home

> **From:** Technical Team
> **Re:** Take-home assignment — BookShelf
>
> Build a small book-browsing application. Requirements:
>
> 1. **Fetch book data** from a public API endpoint. Use the Open Library search API: `https://openlibrary.org/search.json?q=...&limit=12&fields=key,title,author_name,first_publish_year,cover_i,subject,ratings_count` (it is free, needs no key, and works from the browser — verified).
> 2. **Book listing with search and filtering** — search by title or author, filter by decade of publication.
> 3. **Book details page** — a dynamic route showing one book's details.
> 4. **Dashboard with statistics** — a `/dashboard` page showing numbers derived from the data (totals, decades, most common subjects).
> 5. **Mock login + protected dashboard** — a login mechanism (dummy, no backend), and the dashboard reachable only by a logged-in user.
>
> **Time limit:** 4 hours, hard stop. Submit whatever is complete at that point.
> **Rules:** No AI tools during the attempt. Official documentation (React Router, Tailwind, Open Library) is allowed.
> **Submission:** repository link + deployed URL + README.

Read it twice. Notice something? Every single requirement is something you have already built in this course — fetch and display (2.2, 2.3.1), search and filter (1.12.6, 2.3.2), a dynamic details page (3.2), derived stats with `reduce` and `useMemo` (1.11, 5.2), context-based auth and a protected route (2.6, 3.3), Tailwind styling (4.1.1), build and deploy (7.5, T.8). There is no new concept in this brief. That is deliberate — a real take-home almost never teaches you something new; it checks whether what you claim to know is actually *yours*, without a course open beside you.

---

## What This Project Is NOT

- **Not a tutorial.** The strategy section below is the last teaching you get. After that, the clock starts and you build alone. The walkthrough notes (M.2) exist — and they are gated, on purpose: they are for *after* your four hours, to compare decisions, not to copy code from.
- **Not a new-concepts exercise.** If you catch yourself researching a library or pattern you have never seen — stop. The brief is answerable with batches 1 through 7. Adding unknown tools under time pressure is exactly how take-homes die.
- **Not a beauty contest.** Evaluators click routes, type in the search box, log out and try the dashboard URL. They do not admire your shadows and gradients. A clean, complete, boring-looking app beats a gorgeous half-built one, every time.
- **Not a place for Redux or Zustand.** The brief never asks for state management beyond one `user` value. Context (3.3) covers it. Real take-homes reward *matching the brief* — gold-plating reads as not reading the requirements.

---

## Strategy — The Six Moves

The real candidate discovered these moves live, one mistake at a time. You get them upfront. They are the difference between "ran out of time" and "submitted a complete core with documented gaps".

### Move 1 — Skeleton First (First 20 Minutes)

Do not start with the book card. Start with the route map: every page exists as a placeholder before any page is real.

```
/            → HomePage        (placeholder: "BookShelf")
/books       → BookList        (placeholder list)
/books/:id   → BookDetail      (placeholder detail)
/login       → LoginPage       (placeholder form)
/dashboard   → Dashboard       (placeholder stats)
*            → NotFound
```

All of it nested inside one `Layout` with a `<Navbar />` and an `<Outlet />` — the exact structure from 3.2's Movie Browser. Why first? Because for the remaining 3 hours 40 minutes, **nothing you click is ever broken**. Every page renders, every link navigates, the 404 works. Then each feature you build simply replaces a placeholder with the real thing. Compare that to the alternative — building the list page perfectly, then discovering at hour 3 that routing and layout don't hold together.

### Move 2 — Rank the Requirements Before Building

Take-home evaluators score what *works*, not what *almost works*. Rank the five requirements by what a scoring checklist would hit first:

- **Must have:** listing + search, details page, mock login + protected dashboard. These are three of the five requirements, fully done.
- **Should have:** filtering by decade, dashboard stats. One line of filter logic each once data flows — but only after the must-haves work end to end.
- **Cut first, under pressure:** decade *filtering* (keep the dashboard's decade stats — they show the same skill), cover images (show a placeholder `<div>`), animation of any kind.

Notice the direction of the cuts: from polish toward the brief's own wording. "Search **and filtering**" degrades to "search" — a stated gap you can document. Half-built everything degrades to nothing you can document.

### Move 3 — Timebox by the Hour

- **0:00–0:20** — scaffold: `create-vite` React-TS project, Tailwind setup, route skeleton (Move 1). Verify `npm run dev` shows six routes.
- **0:20–1:20** — data layer: types (`Book` interface), `fetchBooks()`, BookList rendering real API data, search box filtering live. By 1:20 you have requirement 1 and most of 2.
- **1:20–2:20** — BookDetail: dynamic route, fetch-by-id, cover placeholder. Requirement 3 done.
- **2:20–3:00** — AuthContext + LoginPage + ProtectedRoute around Dashboard. Requirements 5 and half of 4 (numbers at least visible, even if basic).
- **3:00–3:30** — Dashboard stats via `reduce` + `useMemo`; decade filter if the clock allows.
- **3:30–4:00** — README, deploy, final click-through (Move 6). **This half hour is not optional slack — it is your grade.**

If you fall behind, don't steal from 3:30 — cut from the *should* list instead. A take-home that ends at 3:30 with no submission package loses points a half-finished filter never cost anyone.

### Move 4 — Pre-build Four Tailwind Patterns

Writing Tailwind by hand, line by line, per element — that is what ate the real candidate's clock. Instead, settle four patterns early and reuse the class strings everywhere:

1. **Card** (books grid + dashboard stat cards) — `rounded-xl border border-slate-200 bg-white p-4 shadow-sm`
2. **Button** (login, search submit) — `rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700`
3. **Input** (search, login form) — `w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400`
4. **Page container** — `mx-auto max-w-5xl px-4 py-8`

Four patterns cover 90% of a take-home UI. Consistency is also a *look* — a page where every card matches reads as "designed" even with zero custom styling.

### Move 5 — The API-Failure Drill (15 Minutes, Practised)

The real assignment's API was dead. Yours (Open Library) is verified working — but drill the fallback anyway, because on real assignments the endpoint is never under your control, and the drill is short:

```tsx
// src/data/books.ts — 10 hand-written books, same shape the API returns
import type { Book } from "../types";

export const mockBooks: Book[] = [
  { key: "/works/OL82563W", title: "Harry Potter and the Philosopher's Stone", author_name: ["J. K. Rowling"], first_publish_year: 1997, cover_i: 15155833, subject: ["Fantasy"], ratings_count: 1074 },
  // ...9 more
];
```

```tsx
// src/api/fetchBooks.ts — the swap point, documented
import { mockBooks } from "../data/books";
import type { Book } from "../types";

export async function fetchBooks(query: string): Promise<Book[]> {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12&fields=key,title,author_name,first_publish_year,cover_i,subject,ratings_count`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data = await res.json();
    return data.docs as Book[];
  } catch {
    return mockBooks; // documented fallback — swap point for the live API
  }
}
```

One `try`/`catch`, one import, and the app is unkillable. Then — and this is the part the real candidate missed — **say so in the README**: one line, `"fetchBooks()` falls back to a mock dataset in `src/data/books.ts` if the API is unreachable (shape matches the API response)." Suddenly the fallback is not a hack; it is engineering judgment an evaluator can see.

### Move 6 — The Submission Package (Reserve 3:30–4:00)

You already know how to do all four parts — from 0.8.5, 7.1, 7.5 and T.8:

- **`npm run lint` and `npm run build` pass.** An app that fails its own build in front of an evaluator is a rough start.
- **Error boundary** (7.1) around the routes — one bad book record should never white-screen the whole app in the evaluator's browser.
- **Deployed on Vercel** (7.5 / T.8) — a live URL means the evaluator's first click is your app, not a `git clone`.
- **README** (T.8 pattern), short and answering exactly five things: what it is, how to run it, what works, what's mocked/fallback, what you would add with more time. That last section is not an apology — it is where you show you *know* what's missing, which reads as senior, not junior.

---

## The Evaluator's Click Path (Your Rubric)

When your timer stops, grade yourself the way a technical evaluator will spend their first ten minutes on your submission:

```
□  App opens (deployed URL) — no console errors, no white screen
□  /books lists real data; typing in search filters live
□  Clicking a book opens /books/:id with that book's details
□  /dashboard while logged out → redirected to /login
□  Logging in → /dashboard shows numbers derived from data
□  Stats are computed (reduce), not hardcoded literals
□  Unknown URL → NotFound page, navbar still visible
□  Lint and build pass; README answers: what works, what's mocked, what's next
```

Eight boxes. Aim to close every *must-have* box before spending a minute on anything a box doesn't check. Then — and only then — open M.2 and compare your decisions with the walkthrough notes.

---

## In Your Own Words

<details>
<summary>Why build the route skeleton before any real feature?</summary>

Because it guarantees the app is never broken. With all six routes as placeholders inside one Layout, every click and link works from minute one, and each feature you build afterwards just fills a placeholder with the real thing. If you build features first and discover routing problems at hour three, you're debugging architecture under time pressure — the worst possible moment.
</details>

<details>
<summary>The API dies at minute 30. What exactly do you do?</summary>

The drill: a `fetchBooks()` function with a `try`/`catch` — live API call in the `try`, a mock array with the same shape in `src/data/books.ts` returned in the `catch`. One swap point, everything downstream (list, detail, stats) keeps working untouched. Then document it in the README as a deliberate fallback, so the evaluator sees judgment instead of an unexplained hardcoded dataset.
</details>

<details>
<summary>You're at hour 3 and the decade filter isn't built. Cut it or rush it?</summary>

Cut it — and document it. The filter is a "should have", and a half-rushed version risks breaking the search that already works. Requirements you leave out but *mention* in the README ("decade filter not completed; dashboard already shows decade stats") cost almost nothing. Half-finished features that break other things cost a lot. Under a hard clock, complete-but-smaller always beats ambitious-but-broken.
</details>

<details>
<summary>Why is the last 30 minutes reserved for README, deploy and click-through — isn't that time "not building"?</summary>

Because the evaluator's first experience is not your code — it's your deployed URL and your README. A complete app that fails its build, white-screens on one bad record, or has no live link loses points that no missing filter ever costs. The submission package is how the four hours of work actually reaches the person scoring it; skipping it is doing the work and then not handing it in.
</details>

<details>
<summary>Why not use Zustand or Redux for the login state, since you know them?</summary>

Because the brief asks for a mock login and one protected page — a single `user` string plus a context. That's the 3.3 pattern, ~20 lines. Any state library adds setup, concepts and risk under a 4-hour clock for zero requirements gained. Real take-homes score how well your solution matches the brief — pulling in tools the brief never mentioned reads as gold-plating, not seniority.
</details>

---

Your four hours start whenever you decide to start them — pick a slot where you won't be interrupted, set a real timer, and build. When it rings: stop, run the rubric above, be honest with the checkboxes. M.2 — the walkthrough notes — are waiting right after, and they are written to be opened *after* your attempt: architecture decisions, key snippets, the common mistakes (including the real story's own), and pointers back to the exact lectures to revisit for every gap you find. Build first. Then compare.

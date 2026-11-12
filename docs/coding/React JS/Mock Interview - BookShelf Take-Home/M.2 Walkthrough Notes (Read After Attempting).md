Stop. If your four-hour timer is still running, or you haven't run the M.1 rubric against your submission yet, close this file now — it will still be here after the attempt, but the attempt only happens once. These notes are built to be read *after* you build, the way a candidate reviews a colleague's submission: decision by decision, asking "would I have done that?" — not line by line, looking for code to copy.

One more rule before we start: **compare decisions, not code.** If your BookShelf works but is structured differently — maybe you kept everything in `App.tsx`, maybe your stats live in a component instead of a hook — that is not a failure. Real take-homes are scored on behaviour (does it run, does it match the brief) and judgment (is it structured deliberately), not on matching a reference file. With that said, here's how a strong submission looks, piece by piece.

---

## How a Strong Submission Is Structured

The 3.4 Blog Platform convention carries over directly — `pages/` for route components, `components/` for reusable pieces, `context/` for providers, `data/` for mock data, `types.ts` at the root:

```
src/
├── api/
│   └── fetchBooks.ts        (live API + mock fallback — the swap point)
├── context/
│   └── AuthContext.tsx      (from 3.3 — user, login, logout, useAuth)
├── data/
│   └── books.ts             (10 mock books, API-shaped)
├── components/
│   ├── Layout.tsx           (navbar + <Outlet /> — from 3.2)
│   ├── BookCard.tsx
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   └── ProtectedRoute.tsx   (from 3.3)
├── pages/
│   ├── HomePage.tsx
│   ├── BookList.tsx
│   ├── BookDetail.tsx
│   ├── LoginPage.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
├── types.ts                 (Book interface — same shape as the API)
├── App.tsx                  (route tree, AuthProvider, ErrorBoundary)
└── main.tsx
```

Two deliberate choices worth noticing. First, `fetchBooks()` gets its own file — because the API-failure fallback is the one requirement-within-a-requirement, and a swap point that lives in its own file is trivial to explain in a README. Second, `BookDetail` lives in `pages/`, not `components/` — it is a route destination, exactly like 3.4's `PostDetail`.

---

## Decision 1 — The Fetch Layer and Its Fallback

The core judgment call of the whole assignment. A strong version has one function, one swap point, and shapes the mock data to match the real API so nothing downstream knows or cares which source answered:

```tsx
// src/api/fetchBooks.ts
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
    return mockBooks;
  }
}
```

Three details that separate a considered fallback from a lucky one. `encodeURIComponent(query)` — user input goes into a URL, so it gets encoded (spaces become `%20`; without this, a search like "harry potter" breaks the request). The `if (!res.ok) throw` — a 500 response does not reject `fetch`; without this check, `catch` never fires and you'd try to read `.docs` off an error body. And `data.docs as Book[]` — the Open Library response nests results under `docs`, so you unwrap once, at the boundary, and the rest of the app deals in `Book[]` only.

The deeper point: because the mock shares the API's shape, **the fallback isn't a special case anywhere else in the app.** BookList, BookDetail and Dashboard never ask "is this live data?" — they just receive books. That is what makes the drill 15 minutes instead of an hour.

---

## Decision 2 — Search and Filter (Client-Side, `useMemo`)

The brief says "search and filtering" — and after 1.12.6 and 2.3.2 you know both modes. Server-side search (the `q=` param, as above) handles the search box; the decade filter is client-side on the loaded results:

```tsx
// src/pages/BookList.tsx — the filtering core
const visibleBooks = useMemo(() => {
  return books.filter((b) => {
    const decade = Math.floor(b.first_publish_year / 10) * 10;
    return decadeFilter === null || decade === decadeFilter;
  });
}, [books, decadeFilter]);
```

`Math.floor(1997 / 10) * 10` → `1990` — the decade math is one line, and that is the entire "filtering" requirement. Two notes a strong submission gets right: the `useMemo` (5.2) exists because typing in the search box re-renders the list component on every keystroke, and recomputing the filtered array on each one is wasteful; and search itself should hit the API with `q=` (server-side, matching 2.3.2) while the decade filter runs client-side — no rule says both must live in the same place, and splitting them is the natural fit: search selects *which* books, filter narrows *those* books.

---

## Decision 3 — BookDetail: Fetch by ID, Not from List State

Tempting shortcut: pass the whole book object through navigation state. It breaks on refresh — the state vanishes, the page dies. A strong submission treats detail like 2.3.1 treated the user panel: the dynamic route captures the work key, and the component fetches that book fresh:

```tsx
// src/pages/BookDetail.tsx — the core
const { id } = useParams<{ id: string }>(); // id = "OL82563W" (URL-encoded work key)
const [book, setBook] = useState<BookDetailInfo | null>(null);

useEffect(() => {
  let cancelled = false;
  fetch(`https://openlibrary.org/works/${id}.json`)
    .then((res) => res.json())
    .then((data) => { if (!cancelled) setBook(data); })
    .catch(() => { if (!cancelled) setBook(null); });
  return () => { cancelled = true; }; // 2.1's cleanup — no setState after unmount
}, [id]);
```

And here is the real-world shape quirk Open Library hands you: the `description` field is **not always a string** — sometimes it arrives as `{ type: "...", value: "..." }`. A strong submission handles it in one line:

```tsx
const description =
  typeof book.description === "string" ? book.description : book.description?.value ?? "";
```

Interviewers love this kind of thing, because it demonstrates the 2.2 lesson in the wild: the API is the contract, you adapt at the boundary, and one defensive line beats a white screen. Same for covers — `cover_i` is absent on some books, so a placeholder `<div>` (not a broken `<img>`) is the polished answer.

---

## Decision 4 — Dashboard Stats: Derived, Never Hardcoded

The rubric line "stats are computed, not hardcoded" exists because hardcoded numbers are the most common tell of a rushed dashboard — and also the easiest to fix, since after 1.11 and 5.2 the derivation is a `reduce` away:

```tsx
// src/pages/Dashboard.tsx — stats from the loaded data
const stats = useMemo(() => {
  const byDecade = new Map<number, number>();
  const bySubject = new Map<string, number>();
  let totalRatings = 0;

  for (const b of books) {
    const decade = Math.floor(b.first_publish_year / 10) * 10;
    byDecade.set(decade, (byDecade.get(decade) ?? 0) + 1);
    for (const s of b.subject.slice(0, 3)) {
      bySubject.set(s, (bySubject.get(s) ?? 0) + 1);
    }
    totalRatings += b.ratings_count;
  }

  return {
    total: books.length,
    totalRatings,
    topDecade: [...byDecade.entries()].sort((a, b) => b[1] - a[1])[0]?.[0],
    topSubject: [...bySubject.entries()].sort((a, b) => b[1] - a[1])[0]?.[0],
  };
}, [books]);
```

One pass over the data, `Map` counters for decades and subjects, then two sorted lookups for the leaders. Notice `b.subject.slice(0, 3)` — Open Library's `subject` arrays can run to dozens of entries (a Harry Potter search returns one with 100+), and counting all of them makes one title dominate the "top subjects" list. Taking the first three is a judgment call — and a one-line README note ("subjects capped at 3 per book to balance the count") turns it into visible judgment.

These stats are also your safety net for the requirement ranking: if the clock squeezed out the decade *filter*, the decade *stats* still demonstrate the same skill — M.1's Move 2 said cut the filter first for exactly this reason.

---

## Decision 5 — Auth and the Guard (3.3, Unchanged)

Nothing new is needed here — a strong submission is recognizably the 3.3 pattern, React 19 syntax and all:

```tsx
// src/context/AuthContext.tsx — same file shape as 3.3
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext value={{ user, login, logout }}>
      {children}
    </AuthContext>
  );
}
```

```tsx
// src/components/ProtectedRoute.tsx — same guard as 3.3
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

Two details worth checking in your own version. `replace` on the `<Navigate>` — without it, back-buttoning after a redirect loops you between login and dashboard (the exact bug 3.3's story warned about). And the provider nesting — `AuthProvider` inside `BrowserRouter`, because `ProtectedRoute` renders `<Navigate>`, which needs the router context (the 3.3 mistake-story again). If your guard works when logged out *and* the navbar still shows on the login page, both details are right.

---

## Decision 6 — Tailwind: Four Patterns, Reused

The real candidate's clock died on hand-written classes. The fix from M.1's Move 4 — four class strings settled once and reused — is worth seeing assembled, because the same four strings build the listing, the detail page and the dashboard:

```tsx
// BookCard and StatCard are the same component at heart:
function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {children}
    </div>
  );
}
```

Grid of books = `grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3` of `Card`s. Dashboard = `grid gap-4 sm:grid-cols-2 lg:grid-cols-4` of `Card`s with a number inside. One component, two pages. If your submission reached for a different class string per page, that is the single biggest speed lesson to carry into the next take-home.

---

## The Mistakes This Format Rewards You for Avoiding

Every one of these is from the real story or its closest cousins — check your own attempt honestly:

1. **Perfect page one, broken everything else** — no skeleton-first. Symptoms: some routes 404, layout inconsistent, 404 page missing.
2. **Half-built everything** — no requirement ranking. Symptoms: search kind of works, filter is a button that does nothing, dashboard shows "loading…" forever.
3. **Mock data as an unexplained hack** — fallback works but isn't documented. Symptoms: README silent about `books.ts`, evaluator wonders why searching "anything" returns the same 10 books.
4. **Hardcoded dashboard numbers** — stats typed as literals. Symptom: numbers never change when data changes.
5. **README written never** — the 3:30–4:00 slot eaten by "one more feature". Symptom: evaluator clones, runs `npm install`, and has to reverse-engineer what they're looking at.
6. **No error boundary** — one bad book record white-screens the deployed app (7.1's whole reason for existing).

## Where to Go for Each Gap

Run your rubric results against this table — each row is a direct pointer back to the lecture that owns the skill:

| Rubric box that failed | Revisit |
|---|---|
| App doesn't boot / build fails | 0.8.5 (scripts), 7.5 (build) |
| Routes broken / 404 missing | 3.1, 3.2 (skeleton-first is Move 1) |
| Search/filter broken | 1.12.6, 2.3.2 |
| Detail page broken / dies on refresh | 3.2 (dynamic routes), 2.3.1 (fetch by id) |
| Guard broken / redirect loops | 3.3 (`replace`, provider nesting) |
| Stats hardcoded / not derived | 1.11, 5.2 |
| White screen on bad data | 7.1 (error boundary) |
| No deployed URL / weak README | 7.5, T.8 |

---

## In Your Own Words

<details>
<summary>Why does the mock data have to match the API's shape exactly?</summary>

So the fallback is invisible to everything downstream. BookList, BookDetail and Dashboard all consume `Book[]` — if `mockBooks` has the same fields as the API's `docs` entries, no component ever needs to know which source answered. Shape-mismatched mocks force special-case code ("if mock, use different field names") that multiplies under pressure and reads as a hack to the evaluator.
</details>

<details>
<summary>Why fetch the book by ID on the detail page instead of passing the object through navigation state?</summary>

Because state dies on refresh. Bookshelf URLs get shared, bookmarked, reopened later — and a detail page built on navigation state shows nothing the moment it's opened directly. Fetch-by-id makes the page a function of the URL (3.2's core lesson), which is also how 2.3.1's user panel worked. Navigation state is a shortcut for data that's guaranteed to already be in memory — and a book detail page never has that guarantee.
</details>

<details>
<summary>What made the Open Library `description` field tricky, and what's the general lesson?</summary>

The field is sometimes a plain string and sometimes an object like `{ type, value }` — the same concept, two shapes depending on the record. The general lesson (from 2.2): the API is the contract, and your code adapts at the boundary — here, one `typeof` check normalizes both shapes into a string before anything downstream sees it. Defending at the edge is one line; defending everywhere is a bug farm.
</details>

<details>
<summary>Your submission matches the brief but looks nothing like this walkthrough's structure. Fail?</summary>

No — structure that differs is only a problem when it's unintentional. Take-homes are scored on behaviour (rubric boxes) and judgment (deliberate decisions, documented in the README). If your stats live in a custom hook instead of a `useMemo` inside the page, that's arguably *better* reuse (6.1's whole point). The walkthrough exists to expose decisions worth comparing — not to hand you a single "correct" file tree.
</details>

<details>
<summary>Why cap subjects at 3 per book when counting "top subjects"?</summary>

Because Open Library's subject arrays are wildly unbalanced — one popular title can carry 100+ tags, and counting all of them lets that single book dominate the leaderboard, making the stat describe one title instead of the collection. Capping at 3 per book balances the count. The meta-lesson: a dashboard stat is a *choice* about what to measure — and stating the choice in the README is what turns a magic number into visible judgment.
</details>

---

That's the full loop: brief (M.1) → attempt under the clock → rubric self-grade → these notes to compare and fill gaps. If your rubric closed clean and these decisions read like things you already did — you are take-home ready, and the next stop is the [React Interview Questions](../Interview Prep/React%20Interview%20Questions.md) file for the spoken-round half of the process. If a few boxes stayed open — good, now you know exactly which lectures own them, and a second attempt a week later is the strongest move in this whole playbook.

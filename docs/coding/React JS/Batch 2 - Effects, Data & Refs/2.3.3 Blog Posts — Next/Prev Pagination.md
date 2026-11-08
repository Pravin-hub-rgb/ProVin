## Goal

We'll build a **Paginated Blog Feed** — ten posts per page, with "Prev" / "Next" buttons and a "Page X of 26" label on top. This one is the smallest app of the three, and it's the one that makes the fingerprint idea *click* completely: **page 1 and page 2 are two different queryKeys** (`["posts", 1]` vs `["posts", 2]`). React Query treats them as two separate notebooks — so page 1 is cached forever while you're reading page 2, and going back to it costs zero requests. Pagination is not some hard React Query feature — it's just the number in the key changing.

You already know `useQuery`, `queryKey`, `queryFn`, `enabled`, `isFetching`, `isLoading`. Nothing here is new — except the *feeling* that the fingerprint design is the whole architecture.

DummyJSON posts, publicly available, no key:

```text
GET https://dummyjson.com/posts?limit=10&skip=0   → { posts: [...], total: 251, skip: 0, limit: 10 }
```

`skip` = how many items to skip from the start. Page 1 → `skip=0`, page 2 → `skip=10`, page 3 → `skip=20`. And `total` (251) tells you how many pages exist: `Math.ceil(251 / 10) = 26`.

Same setup as before: Vite + TypeScript called `post-feed`, `bun add @tanstack/react-query`, `<QueryClientProvider>` wired in `main.tsx`.

---

## Step 1 — Static Page (Title + Placeholder Buttons)

**Think:** Three pieces on screen — the heading with the page indicator, the list of posts, the two buttons. Everything else comes after.

```tsx
function PostFeed() {
  return (
    <div>
      <h1>Blog Feed — Page 1 of 26</h1>
      <ul>
        {/* posts land here */}
      </ul>
      <button>← Prev</button>
      <span>Page 1</span>
      <button>Next →</button>
    </div>
  );
}
```

**Test:** Heading shows "Page 1 of 26", an empty list, two buttons. ✅

---

## Step 2 — Fetch Page 1 (The Fingerprint, Live)

**Think:** Now wire the first page. The queryKey is `["posts", page]` — where `page` is state living in the component. Whatever `page` currently is, the key is already changing with it. This is the rule from 2.3 working silently in the background: **change the key → new query → new fetch.**

```tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface DummyPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
}

const POSTS_PER_PAGE = 10;

function PostFeed() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const skip = (page - 1) * POSTS_PER_PAGE;
      const res = await fetch(`https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${skip}`);
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data.total / POSTS_PER_PAGE);

  return (
    <div>
      <h1>Blog Feed — Page {page} of {totalPages}</h1>
      {isFetching && <p>Refreshing...</p>}
      <ul>
        {data.posts.map((post: DummyPost) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body.slice(0, 120)}...</p>
            <p>👍 {post.reactions.likes} · 👁 {post.views} · {post.tags.slice(0, 2).join(", ")}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>← Prev</button>
      <span> Page {page} </span>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next →</button>
    </div>
  );
}
```

Line by line:

- **`const [page, setPage] = useState(1)`** — page number is client state. The server doesn't care which page you meant; you send it in the URL via `skip`.
- **`skip = (page - 1) * POSTS_PER_PAGE`** — the whole pagination math, once. Page 1 → 0, page 2 → 10, page 26 → 250. Off-by-one errors live here — never `page * POSTS_PER_PAGE` (that would start at 10 for page 1 and skip the first page).
- **`queryKey: ["posts", page]`** — `page` inside the key. That's the only thing that makes page 1 and page 2 different queries. Change `page` → new key → React Query runs the queryFn again → new `skip` in the URL.
- **`data.total`** — 251. `Math.ceil(251 / 10) = 26` pages. Compute this *from the response*, never hardcode 26 — the API can change and your buttons shouldn't break.
- **`disabled={page === 1}` / `disabled={page === totalPages}`** — Prev disabled on 1, Next disabled on the last. Buttons that let you click into nowhere are bugs the server then has to handle.
- **`isFetching` returns before `isLoading` matters here** — actually we read both: the early returns use `isLoading` (full-screen loading only the first time ever); inside the JSX we show the small "Refreshing..." line for background/page switches.

**Test:**
1. Page loads → 10 posts, heading "Page 1 of 26". Network shows `posts?limit=10&skip=0`. ✅
2. Click **Next** → page flips to 2, new heading, new request `skip=10`. Posts change. ✅
3. Click **Prev** → back to page 1 — notice: **zero network request.** Page 1 came straight from the cache. That's the cache doing exactly what you already know from user 1 click-backs. ✅
4. Click Next rapidly 4 times (pages 2 → 6) → you land on page 6; the in-flight requests for 2, 3, 4, 5 were deduplicated or the cache is already filled.
5. Page 26 → **Next** is disabled. Page 1 → **Prev** is disabled. ✅

---

## What Actually Happened — The Notebook Model at Scale

Revisit the notebook from the 2.3 introduction, one more time, now that you're holding a page number:

| queryKey | What's inside it |
|---|---|
| `["posts", 1]` | 10 oldest posts — cached on first visit |
| `["posts", 2]` | posts 11–20 — cached on first visit |
| ... | ... |
| `["posts", 26]` | posts 241–251 — cached on first visit |

Every page you visit becomes a notebook entry. Re-reading any visited page costs nothing — the network stays quiet. And `Math.ceil(total / POSTS_PER_PAGE)` is the size of the map. **This is all pagination is.** APIs that "support pagination" just expect you to send `skip` (or `page`, or `cursor`) — React Query doesn't know the difference between asking for "page 5 of 26" and asking for "search phone". Same hook, same cache, different slot in the key.

(If you enjoy how automatic this felt: `useInfiniteQuery` exists for the infinite-scroll version of exactly this idea — tweets and reels, not pages. Not needed for this project — mentioning it so the name doesn't surprise you later.)

## Common Mistakes

1. **`skip = page * POSTS_PER_PAGE`** — skips page 1 entirely. Always `(page - 1) * limit`.
2. **Hardcoding `totalPages = 26`** — works until the API adds posts. Derive it from `data.total`.
3. **Buttons left enabled at the ends** — clicking Next on page 26 fires a request for an out-of-range page and shows an empty grid with no explanation. Guard both buttons.
4. **`isLoading` for page switches** — switching from a cached page shows `isFetching: true, isLoading: false`. If you gate the whole list behind `isLoading`, the page flickers blank on every cached visit. Use `isFetching` for the little "Refreshing..." line instead.
5. **Forgetting `skip` in the queryFn** — `page` is in the *key*, and the key is the label. The actual URL must also use `page`. If the key says page 3 but the fetch always asks for page 1, you'll get page 1's posts whenever any page is clicked — the key and the function must agree, always.

## What It Is NOT

- **NOT infinite scroll.** Prev/Next with an explicit page number is a *paged* feed. Infinite scroll (appending, "load more") would keep one growing list — that's `useInfiniteQuery`, a different tool for a different UI.
- **NOT server-driven navigation** — there are no routes (`/posts/page/3`). The page is local state; a refresh restarts at page 1. Adding routes would be a reader exercise, not a React Query problem.
- **NOT a database or a "load more 25 more" pattern** — also not a filter, also not a "cursor"-based API pagination setup — the skip/limit pair shown here is exactly the one DummyJSON hands you.
- **NOT safe on very slow networks with Prev/Next smashing.** Smashing Next five times means five in-flight requests — React Query will dedupe identical keys, not different ones. The last click wins the screen; the buttons still work, just expect the screen to lag behind your finger on bad connections.

## In Your Own Words

1. Why is the page number inside the queryKey?

<details>
<summary>Sample Answer</summary>

Because page is the only thing that distinguishes "which slice of posts". Each page is a different ask, and different asks deserve different cache entries. `["posts", 3]` is page 3's fingerprint; change it to 4 and React Query knows it's a new question and runs the queryFn with `skip=30`. Without the page in the key, page 5 would "look" to the cache like page 1 again and you'd see the same posts forever.
</details>

2. Why does `skip` equal `(page - 1) * limit` and not `page * limit`?

<details>
<summary>Sample Answer</summary>

Page counts start from 0 in skip-land. Page 1 must skip nothing (`skip=0`) — otherwise the first page starts at post #11 and the app *never shows* posts 1–10. `(page - 1) * limit` maps 1→0, 2→10, 3→20. Off-by-one in this exact spot is the classic pagination bug.
</details>

3. Going back to page 1 from page 3 costs what? Why?

<details>
<summary>Sample Answer</summary>

Zero network requests. Page 1 has been fetched before, and the cache keeps its entry under `["posts", 1]`. When the key changes to 1 again, React Query sees that fingerprint already exists → serves the stored 10 posts instantly. You already knew this from user clicking back-and-forth in the User Directory.
</details>

4. `Math.ceil(data.total / POSTS_PER_PAGE)` — why from the response, not hardcoded?

<details>
<summary>Sample Answer</summary>

Because `total` is the one number that *will* change over time — more posts get added, some get made private, DummyJSON doesn't promise it stays 251. The button row ("Next" disabled) and the label ("Page X of Y") derive from it, so deriving keeps both correct without touching code when the feed grows.
</details>

5. What do you show while page 4 is being fetched after the user clicks Next? Why not replace the list with "Loading..."?

<details>
<summary>Sample Answer</summary>

Keep the old page visible and show a tiny "Refreshing..." line — that's `isFetching`. Replacing the whole list with a loading message unmounts every visible post for a split second on every single page switch, which feels like the app forgot what it was doing. `isLoading` is only for *nothing shown yet*; `isFetching` is *something shown, new data coming*.
</details>

---

## Next Up

That's 2.3.1–2.3.3 done — user directory, product catalog, paginated posts. Retake the TanStack React Query quiz if you want to lock it in, then move to **2.4 — useRef**, where you'll learn to hold values between renders without triggering a re-render at all.

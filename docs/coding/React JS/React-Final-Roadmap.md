# React.js (with TypeScript) — Final Roadmap
### Concept → Mini-Project → Combined Project → ... → Capstone

**Core philosophy of this roadmap:**
1. Pehle samajho **kaise kaam karta hai** (internals), sirf "kaise use karte hain" nahi.
2. Har naye concept ka apna **chhota isolated mini-project** (jaise `useState` → sirf ek Counter, itna hi kaafi hai).
3. Har batch ke baad ek **Combined Project** jo us batch ke sab concepts ko real app mein jodta hai.
4. Aage jaake agar koi purana approach outdated ho jaye (Context → Zustand jaisa), to purane ko naye se **replace** karenge combined project mein — dono ka concept pata hoga, lekin latest wala hi use hoga, jaisa real industry mein hota hai.
5. Sab kuch TypeScript mein, saath mein Accessibility / Testing / ESLint-Prettier / Security jahan relevant ho wahan woven.
6. **"Manual → Better" principle:** Jahan bhi ek industry-standard library kisi manual/from-scratch approach ka better alternative hai, pehle manual tareeka khud karke "problem" mehsoos karo, phir library seekho as "solution." Isse library ka "why" pata chalta hai, sirf "how" nahi — interview mein yehi difference dikhta hai.

---

# MODULE 0 — "React Kaise Kaam Karta Hai" (No project, pure understanding)

Ye module isliye pehle hai taaki aage jo bhi seekho, uske peeche ka "why" pata ho.

- **Real DOM vs Virtual DOM** — DOM manipulation expensive kyun hai, Virtual DOM ek lightweight in-memory copy kaise rakhta hai
- **JSX Compilation** — JSX asal mein Babel se `React.createElement()` calls mein compile hota hai (isse JSX "magic" nahi lagega)
- **Reconciliation + Diffing Algorithm** — state change hone pe React purane aur naye Virtual DOM tree ko kaise compare karta hai, aur `key` prop is process ke liye kyun critical hai
- **Fiber Architecture** (halka-level) — React ka internal engine jo rendering ko pause/resume kar sakta hai, isliye React "interruptible" hai
- **Batching of State Updates** — ek event handler ke andar multiple `setState` calls ek hi re-render mein kaise batch hote hain
- **Synthetic Events** — React apne events kyun banata hai, browser ke native events ke upar wrap karke

**0.7 TypeScript warm-up (slim):** basic types, arrays (`number[]`), objects, functions, optional props, union types, interface — only what React needs *right now*, Generics deferred to later modules
**0.8 Tooling setup:** Node.js/npm vs Bun introduction, Vite + `react-ts` template, folder structure walkthrough, HMR explained, first component (no Generics), ESLint + Prettier

*(Koi project nahi is module mein — sirf foundation. Aage har relevant phase mein isi module ka reference wapas aayega: jaise "yaad hai diffing mein humne keys ki baat ki thi? Ab practically dekhte hain.")*

---

# BATCH 1 — Core Building Blocks

| # | Concept | TypeScript Layer | Mini-Project (isolated) |
|---|---|---|---|
| A | JSX + Functional Components | Component typing basics | **Profile Card** — ek static component, hardcoded data |

### 📎 Conceptual side-note (no project, just recognition-level)
**Class Components + Lifecycle Methods** (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) — legacy React tareeka jo Hooks se pehle use hota tha. Isko hands-on practice nahi karni, bas itna samajhna hai ki Hooks ne exactly kya problem solve ki (logic reuse, less boilerplate) — kyunki legacy codebases aur interview questions dono mein ye aata hai. Ye side note 1.2 (Pehla Component) ke baad rakha gaya hai kyunki "component = function" seekhne ke baad curiosity naturally aati hai ki "koi aur tarika tha?"

| B | Props + `children` | `interface` for props, `React.ReactNode` | **Greeting Card Generator** — same component, alag-alag props se reuse |
| C | `useState` + Event Handling | `useState<T>`, `React.ChangeEvent<...>` | **Simple Counter** — bas increment/decrement/reset (chhota hi rakhna hai, jaisa tumne kaha) |
| D | Conditional Rendering + Lists & Keys | typed arrays, union types (`status: 'idle' \| 'done'`) | **Show/Hide Toggle List** — chhoti list jisme filter/conditional display ho (yahin Module 0 ki diffing/keys wapas revisit hogi practically) |

### 🔗 Combined Project #1 — **To-Do List App**
(A+B+C+D ek saath) — components, props, state, conditional rendering, lists+keys sab real app mein. Ye classic project hai (dono reference courses mein bhi hai) isliye yahan perfect fit hai.

---

# BATCH 2 — Effects, Data & Refs

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| E | `useEffect` + API Fetching + Loading/Error States — **Manual** (pehle) (bada standalone topic) | response `interface`, `useState<T \| null>` | **Recipe Finder Mini-App v1** — API se recipes fetch, loading/error state manually `useEffect`+`useState` se (dono reference courses mein "Recipe Finder"/"Gallery" tha, isi se inspire) |
| E2 | Data Fetching — **Better**: TanStack Query (React Query) | typed `useQuery<T>` | **Recipe Finder v2** — same app, ab TanStack Query se (auto caching, refetching, deduplication, no manual loading/error state juggling) — v1 vs v2 comparison se fark clearly dikhega |
| F | `useRef` | typed refs (`useRef<HTMLInputElement>(null)`) | **Auto-focus + Stopwatch** — ref se input pe focus, aur ek timer jisme previous value ref mein store ho (re-render trigger kiye bina) |
| G | Lifting State Up + Prop Drilling | callback prop typing | (koi naya project nahi — ye To-Do app ko hi refactor karke dikhaya jayega ki drilling kaisi feel hoti hai) |
| H | Context API | typed context + custom `useX()` hook pattern | **Theme Switcher Demo** — chhota standalone dark/light toggle |

### 🔗 Combined Project #2 — **To-Do App v2 (upgrade)**
Purane Combined #1 ko upgrade karo: ab categories API se load hoti hain (E), input pe auto-focus hai jab naya task add karo (F), state ab parent se properly lift hoti hai instead of messy prop drilling (G), aur poore app mein dark/light theme Context se aata hai (H).

---

# BATCH 3 — Navigation & Access Control

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| I | React Router — routes, dynamic routes, nested routes, `useNavigate` | `useParams<{id: string}>()` | **Movie Browser App** — home page + movie detail page (dynamic route), matches reference course's "Movie Website" idea |
| J | Protected Routes | typed auth-check wrapper component | (isi Movie app mein ek dummy "My Watchlist" route add karo jo sirf "logged in" (dummy) state mein accessible ho) |

### 🔗 Combined Project #3 — **Blog Platform**
Multi-page blog banao: `/` home (post list), `/posts/:id` (dynamic route with post detail), `/create` (protected — new post form), `/dashboard` (protected — manage/edit your posts), `/*` 404 page. Router, AuthContext, NavLink, protected routes sab ka saath.

---

# BATCH 4 — Styling, Forms & Accessibility

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| K | Tailwind CSS + Responsive Design + Conditional Styling | — | **Gym Website (Landing Page)** — pure styling/responsive focus, no complex logic (matches reference course's Gym Website idea — yahan design muscle build hogi) |
| L | Accessibility — labels, ARIA, keyboard navigation, focus states, modal focus-trap | — | (Gym website ke contact form aur mobile nav menu ko accessible banao — keyboard-only test karo) |
| M | Forms — **Manual** controlled inputs + manual `if`-based validation (pehle) | typed form state `interface`, `React.FormEvent` | **Notes App v1** — form-heavy app (create/edit/delete note), poori validation manually likhi hui (empty fields, length checks) |
| M2 | Forms — **Better**: React Hook Form + Zod (validation library) | Zod schema + `z.infer<typeof schema>` se automatic types | **Notes App v2** — same app, ab RHF (kam re-renders, less boilerplate) + Zod (schema-based, type-safe) se rebuild — dono versions comparison mein rakho taaki fark khud dikhe |

### 🔗 Combined Project #4 — **E-Commerce Store**
Product listing page (Tailwind responsive grid, accessible product cards), product detail page, shopping cart (lifted state + context), checkout form with React Hook Form + Zod validation, order confirmation. Poore app mein keyboard + screen-reader testing.

---

# BATCH 5 — Performance

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| N | `React.memo`, `useMemo`, `useCallback` | props typing revisit | **Re-render Visualizer** — chhota demo app jisme har render pe ek counter/border flash ho, taaki Profiler ke saath dikhe fark kab padta hai |
| O | `useReducer` | discriminated union action types (`{type:'add', payload:...}`) | (koi naya isolated project nahi — seedha combined project mein state ko migrate karenge) |
| P | Lazy Loading, Suspense, Code Splitting | — | **Image Gallery** with `React.lazy()` — routes/components on-demand load (matches reference course's Gallery Project) |

### 🔗 Combined Project #5 — **Analytics Dashboard**
Dashboard with data tables, interactive charts (lazy-loaded with `React.lazy()` + `Suspense`), filter/sort/pagination state with `useReducer` (typed discriminated actions), derived data with `useMemo`, table row components with `React.memo` + `useCallback`. Profiler khol ke pehle/baad compare karo.

---

# BATCH 6 — Reusability & State Management Maturity

| # | Concept | TypeScript Layer | Mini-Project |
|---|---|---|---|
| Q | Custom Hooks + Generics | `useFetch<T>`, `useLocalStorage<T>` | (Batch 2 ka `useEffect`/API logic aur localStorage logic ab generic custom hooks mein extract) |
| R | Zustand (Context ki jagah, awareness + comparison) | typed Zustand store | (Recipe Finder aur To-Do app dono ka fetch-logic ab `useFetch<T>` reuse karta hai) |

### 🔗 Combined Project #6 — **Kanban Board**
Multi-column board (Todo, In Progress, Done) with drag-drop cards. Zustand store with normalized state, generic custom hooks (`useBoard`, `useLocalStorage<T>`), generic UI components (`<Card<T>>`, `<Column<T>>`). Undo/redo history, localStorage persistence. Poore app mein performance optimizations from Batch 5 carry forward.

---

# BATCH 7 — Production-Readiness

| # | Concept | Layer | Mini-Project |
|---|---|---|---|
| S | Error Boundaries + Security Awareness (XSS, env vars, safe rendering) | — | (koi naya project nahi — To-Do app ke around ErrorBoundary wrap, .env proper use) |
| T | Testing (Vitest + React Testing Library) | typed tests | Har purane mini-project ke 1-2 core components/hooks ke tests likhna (retroactively, taaki practice ho) |
| U | Build & Deploy | — | Sab projects Vercel/GitHub Pages pe deploy + README |

---

# 🏁 FINAL CAPSTONE — **TrackIt** (habit/task tracker + dashboard)

Ye sabse alag hai — ek naya, bada, polished project jisme **saari batches ke latest/best approaches** ek saath aayenge (purane isolated projects ki tarah nahi, balki production-grade):

- TypeScript throughout
- Tailwind, responsive, accessible UI
- React Router (dynamic + protected routes) + lazy-loaded routes
- Zustand for state (not Context — latest approach)
- `useReducer` for complex task state (typed discriminated actions)
- Generic custom hooks (`useFetch<T>`, `useLocalStorage<T>`)
- Framer Motion animations
- Error boundary + security hygiene
- Test coverage on core pieces
- Deployed with clean README

Ye tumhara **resume + portfolio ka main project** banega.

---

## Best-combination logic (jo maine dono YouTube courses dekh ke decide kiya)

- **To-Do List** — dono courses mein hai, aur isliye Batch 1 aur 2 ka "spine" project hai. Chhota shuru hota hai, dheere-dheere production-grade banta hai. Batch 3 se aage har batch ka apna naya combined project hai — Blog Platform, E-Commerce, Analytics Dashboard, Kanban Board — taaki har batch mein kuch fresh bane.
- **Recipe Finder** aur **Gallery Project** — inhe standalone rakha hai kyunki inka focus specific hai (API fetching, lazy loading) — inko To-Do app mein zabardasti fit nahi karna, apna clean demo behtar hai.
- **Movie Website** — routing/dynamic-routes ke liye best fit hai (movie list → movie detail page pattern naturally dynamic routes demonstrate karta hai).
- **Gym Website** — pure styling/responsive/accessibility practice ke liye, jahan logic complexity nahi chahiye, sirf design muscle.
- **Notes App** — forms + validation deep-dive ke liye, kyunki notes app mein naturally create/edit/delete forms hote hain.

Isse har mini-project ka ek **clear, focused purpose** hai — koi bhi project "generic filler" nahi hai.

---

Agla step: chaho to main Batch 1 (Module 0 + A,B,C,D + Combined Project #1) ko lesson-by-lesson expand karke likh doon — matlab actual "kya karna hai, step by step" — ya pehle poori roadmap yahi final rahegi?

---

## Abhi Tak Kya Hua — Safar Poora

Saari batches (1-7) complete kar liye:

| Batch | Seekha |
|-------|--------|
| **1** | JSX, Components, Props, State, Lists |
| **2** | Effects, API, Refs, Context |
| **3** | React Router, Protected Routes |
| **4** | Tailwind, Forms, Accessibility |
| **5** | Performance (memo, useCallback, lazy) |
| **6** | Custom Hooks, Generics, Zustand |
| **7** | Error Boundaries, Security, Testing, Deploy |

Ab sab kuch ek saath — **FINAL CAPSTONE: TrackIt**. Ye tumhara **resume + portfolio ka main project** banega. Isliye hum ise ek batch ki tarah treat karenge — apna folder, apne steps (T.1 se T.8), code **from scratch** (`bunx` se start), coder mindset ke saath.

Toh aisa scene hai...

---

## Broader Goal — TrackIt Kya Hai

**TrackIt** — ek **habit tracker + dashboard**. Users apne daily habits track karte hain (jaldi uthna, paani peena, workout), streaks maintain karte hain, aur ek dashboard pe progress dekhte hain.

**Kya seekhenge is project mein (saari batches combine):**

| Concept | Batch | TrackIt Mein |
|---------|-------|--------------|
| Custom hooks + Generics | 6 | `useFetch<T>`, `useLocalStorage<T>` |
| Zustand + persist | 6 | habits, tasks, prefs, auth stores |
| `useReducer` | 5 | complex task state (discriminated actions) |
| React Router | 3 | dynamic + protected + lazy routes |
| Tailwind | 4 | responsive, accessible UI |
| Framer Motion | (naya) | smooth animations |
| Error Boundary | 7 | crash-proof |
| Security | 7 | env vars, safe rendering |
| Testing | 7 | Vitest + RTL on core pieces |
| Deploy | 7 | Vercel + README |

**Data-source decision (senior thinking — 7.2 से yaad karo):**
- **Core data** (habits, tasks, prefs, auth) → Zustand + `persist` → localStorage
- **`useFetch<T>`** → ek real public API (motivational quote dashboard pe) — fake complexity nahi, honest use
- **`useLocalStorage<T>`** → theme preference (hook ko visible rakhne ke liye)
- Frontend hai — private secrets nahi, sirf `VITE_` public values

---

## Tutorial — Kaise Chalega

Har step (T.1-T.8) ek isolated milestone hai:

1. **Project ko chalane layak** chhoda jaata hai — har file ka `// src/...` path, "yeh file banao" guidance
2. **Coder mindset** — pehle socho (problem), phir code karo (solution)
3. Har step ke end mein **In Your Own Words** — apne zuban mein samjho
4. Project **ek hi folder** mein — `trackit/` — har step usi folder ko build karta hai

**Folder structure (final target):**

```
trackit/
├── src/
│   ├── stores/
│   │   ├── habitsStore.ts       # T.2 — habits CRUD + streak
│   │   ├── tasksStore.ts        # T.2 — tasks (useReducer ke saath)
│   │   ├── prefsStore.ts        # T.2 — theme + preferences
│   │   └── authStore.ts         # T.2 — dummy auth
│   ├── hooks/
│   │   ├── useFetch.ts          # T.3 — generic fetch
│   │   ├── useLocalStorage.ts   # T.3 — generic persistence
│   │   └── useHabits.ts         # T.5 — habit logic
│   ├── components/
│   │   ├── layout/              # T.4 — navbar, layout
│   │   ├── habits/              # T.5 — habit cards, check-in
│   │   ├── dashboard/           # T.6 — stats, charts
│   │   ├── ui/                  # T.6 — reusable UI
│   │   ├── ErrorBoundary.tsx    # T.7
│   │   └── ProtectedRoute.tsx   # T.4
│   ├── pages/
│   │   ├── Dashboard.tsx        # T.6
│   │   ├── Habits.tsx           # T.5
│   │   ├── Tasks.tsx            # T.3-T.5
│   │   ├── Login.tsx            # T.4
│   │   └── NotFound.tsx         # T.4
│   ├── types/
│   │   └── index.ts             # T.2 — all types
│   ├── test/
│   │   └── setup.ts             # T.8
│   ├── App.tsx                  # T.4 — router
│   └── main.tsx                 # T.1
├── vitest.config.ts             # T.8
└── package.json
```

Ab shuru karte hain — **T.1: Project Setup**.

---

## T.1 — Project Setup

Ek nayi directory mein, `bunx` se Vite + React + TypeScript project banao:

```bash
bunx create-vite@latest trackit --template react-ts
cd trackit
```

**Kya bana:**

```
trackit/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Ab dependencies install karte hain — sab kuch jo project ko chahiye:

```bash
bun add zustand react-router-dom framer-motion
bun add -d vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom dompurify @types/dompurify
```

**Har dependency kya karegi:**

| Package | Kyun |
|---------|------|
| `zustand` | Global state management (Batch 6) |
| `react-router-dom` | Routing (Batch 3) |
| `framer-motion` | Animations |
| `dompurify` | HTML sanitization (Batch 7 security) |
| `vitest` + Testing Library | Tests (Batch 7) |

**Note:** Tailwind hum T.6 (dashboard/UI styling) mein add karenge — jab UI banane lagenge. Pehle data layer + logic (T.2-T.5), phir styling. **Yeh senior approach hai:** functional core pehle, styling baad mein.

---

## Folder Structure Clean Karna

Vite default mein `App.css`, `src/assets`, `App.tsx` hota hai. Hum project ko clean karte hain — structure warna. App ki `src/` folder ko proper folders banate hain:

```
mkdir src/components src/pages src/hooks src/stores src/types src/test
```

Ab `src/app/` ke andar **folder tree final** (nahi — structure upar diagram wala hi hai). Dekhte hain main.tsx ko saaf karte hain:

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Aur `src/App.tsx` ko ek simple placeholder se replace karo (router T.4 mein aayega):

```tsx
// src/App.tsx
function App() {
  return (
    <div className="app">
      <h1>TrackIt</h1>
      <p>Habit tracker + dashboard — development in progress.</p>
    </div>
  );
}

export default App;
```

**Cleanup:** Default Vite files jo use nahi hongi (`src/App.css`, `src/assets/react.svg`) hata sakte ho — unki jagah hum ajaye humara structure. `src/index.css` ko bhi basic reset se replace karo:

```css
/* src/index.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #111;
  background: #f8fafc;
}
```

---

## Dev Server Chalana

```bash
bun run dev
```

Browser mein `http://localhost:5173` — "TrackIt" heading dikhni chahiye. **Project setup ho gaya.** Ye milestone chhota hai lekin bhout important — clean structure pe bada project banti hai.

---

## What T.1 Taught Us

1. **`bunx create-vite`** — zero config React + TS project
2. **Dependencies ko samajh ke** install karna — har ek ka role pata hai
3. **Senior ordering** — functional core (data + logic) pehle, styling (Tailwind) baad mein
4. **Clean folder structure** — `stores/`, `hooks/`, `components/`, `pages/`, `types/` — kahan kya hai, pata rehta hai

---

## So Here's the Takeaway

Project ka foundation ready hai. Clean structure, saari dependencies, dev server chal raha hai. Ab agla step (T.2) — **types + normalized state + Zustand stores**. Data pehle, UI baad mein — production-grade thinking.

Forward is project mein agar kabhi "T.1 ka folder kaunsa tha" jaisa confusion ho, toh upar ka structure diagram dekh lo — sab map hai.

---

## In Your Own Words

1. TrackIt mein har main library (zustand, router, framer-motion) ki role kya hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Zustand global state ke liye hai — habits, tasks, prefs, auth stores (Batch 6 ka approach). react-router-dom routing ke liye — dynamic routes (habit detail), protected routes (login ke baad), lazy loading (Batch 3). framer-motion animations ke liye — card bane pe, dashboard update pe smooth transitions. Inke saath dompurify security ke liye (raw HTML sanitize) aur vitest+RTL testing ke liye.

</details>

2. Senior approach mein Tailwind (styling) baad mein kyon add kiya, pehle nahi?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki hamein pehle functional core chahiye — data layer, stores, logic, routing. Yeh cheezein test-able aur production-critical hain. Styling (Tailwind) chor page pe baad mein lagti hai — UI components banne ke baad. Approach: functional core pehle (T.2-T.5 data + logic), styling baad mein (T.6 dashboard/UI). Isse core pehle verify hota hai, aur styling seekhi cheez ko zabardasti pehle se include nahi karta jo core ko distracted kare.

</details>

3. `bunx create-vite@latest trackit --template react-ts` kya karta hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Ye `bunx` (bun ka CLI runner) se Vite ko latest version mein call karta hai, ek nayi project `trackit/` directory banata hai, aur `react-ts` template use karta hai — matlab React + TypeScript setup, zero config. Vite ek folder banata hai with `src/`, `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts` — ready-to-run project. Phir `cd trackit` aur dependencies install karte hain.

</details>

4. Project mein `stores/` aur `hooks/` folders alag kyun rakhe? Inka alag-alag role kya hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki yeh do alag cheezein hain (Batch 6 ka separation of concerns). `stores/` = Zustand stores — global state + actions + persistence (`persist` middleware). `hooks/` = custom hooks — `useFetch<T>` (data fetching), `useLocalStorage<T>` (minimized persistence), `useHabits` (habit business logic). Store raw state manages karta hai, hooks logic/composition provide karte hain. Alag folder = kahan kya hai clearly pata rehta hai, badi project mein clean rahta hai.

</details>

5. TrackIt mein core data localStorage mein kyon, API se kyon nahi? (senior thinking)

<details>
<summary>Show Answer</summary>

**Sample Answer:** Kyunki TrackIt pure frontend hai (React) — koi backend nahi. Habits/tasks user ke local data hain jo persist middleware localStorage mein save karta hai. Yahoo load/refresh-safe hai — bina backend ke asli persistence. API se data lene ke liye backend chahiye hota jo we taught nahi. `useFetch<T>` ko hum ek real public API (quote) ke liye use karte hain — jo dashboard pe honest use hai (fake mock-service nahi). Senior thinking: complexity nahi badhana bina zaroorat — apne data ka sahi tool (Zustand+persist) aur API ka sahi tool (useFetch) choona.

</details>
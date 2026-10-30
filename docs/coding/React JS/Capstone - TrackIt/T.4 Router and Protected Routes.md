Picking up from the last file — T.2 built the data layer (stores), T.3 built the logic layer (`useReducer` + generic hooks). Now **T.4 — Navigation**: React Router for dynamic routes, protected routes, and `React.lazy` + Suspense for code splitting.

So here's the situation...

---

## Coder Mindset — Think About the App's Layout

What pages should TrackIt have?

| Route | Page | Protected? |
|-------|------|-----------|
| `/` | Dashboard | ✅ (needs login) |
| `/habits` | Habits | ✅ |
| `/tasks` | Tasks | ✅ |
| `/login` | Login | ❌ (public) |
| `*` | 404 Not Found | ❌ |

**Senior thinking:** Dashboard, Habits, Tasks — all **protected** (user must log in). `/login` is public. This is the same pattern as real apps — pages with user data are only for logged-in users.

**Why lazy loading?** The Dashboard will have charts (T.6), Habits will have streak logic — loading all pages at once makes the initial bundle huge. With `React.lazy`, only the current page loads, the rest loads on demand. That's **code splitting** (Batch 5.6).

---

## Step 1 — Create the Pages

First, create skeletons for all pages. New files:

```tsx
// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>TrackIt</h1>
      <p>Enter your name — demo login (no real password)</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name..."
        aria-label="Your name"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

```tsx
// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page was not found.</p>
      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
}
```

**Login flow:**

```
User enters name and submits
    → login(name) → authStore sets { isLoggedIn: true, user: { name } }
    → navigate("/") → goes to Dashboard route
```

**Note:** `useAuthStore((s) => s.login)` — selective subscription, the action reference is stable.

---

## Step 2 — ProtectedRoute Component

The protected route pattern (from Batch 3.3) — a wrapper that checks login state. Create new file — `src/components/ProtectedRoute.tsx`:

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../stores/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

**The flow:**

```
User visits /habits
    │
    ▼
ProtectedRoute renders
    │
    ├── isLoggedIn = true  → renders children (Habits page)
    └── isLoggedIn = false → <Navigate to="/login" replace />
```

`replace` — on the back button, the protected page doesn't come back (clean history after login).

---

## Step 3 — Lazy-Loading Pages

Now load pages with `React.lazy` — only when the route is hit. Create the full router in `src/App.tsx`:

```tsx
// src/App.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./stores/authStore";

// Lazy-loaded pages — only loaded when route is hit
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const Habits = lazy(() =>
  import("./pages/Habits").then((m) => ({ default: m.Habits }))
);
const Tasks = lazy(() =>
  import("./pages/Tasks").then((m) => ({ default: m.Tasks }))
);
const Login = lazy(() =>
  import("./pages/Login").then((m) => ({ default: m.Login }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);

function App() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar">
          <span className="brand">TrackIt</span>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/habits">Habits</NavLink>
          <NavLink to="/tasks">Tasks</NavLink>
          <div className="nav-right">
            {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </nav>

        <main>
          <Suspense fallback={<div className="loading">⏳ Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/habits"
                element={
                  <ProtectedRoute>
                    <Habits />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

**What each thing does:**

| Thing | What it does |
|-------|------|
| `lazy(() => import(...))` | Dynamic import — page only loads when route is hit |
| `.then((m) => ({ default: m.Dashboard }))` | Turns the named export into a default export — `lazy` needs a default |
| `<Suspense fallback={...}>` | Shows loading indicator while a lazy page loads |
| `<NavLink>` | Highlights the active route |
| `<ProtectedRoute>` | Login check — wrapper |

**Why the `.then`?** `React.lazy` expects a function that returns a Promise whose result is `{ default: Component }`. Our pages are **named exports** (`export function Dashboard()`). The dynamic import gives you the whole module (`m`), and `.then` converts it to `{ default: m.Dashboard }` — turns the named export into a default.

---

## Step 4 — Integrating useLocalStorage for Theme

We built `useLocalStorage<T>` in T.3. Now integrate it for the theme. Create new file — `src/hooks/useTheme.ts`:

```ts
// src/hooks/useTheme.ts
import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("trackit-theme", "light");

  return { theme, setTheme };
}
```

Then apply the theme to the root div in `App.tsx` (Tailwind in T.6):

```tsx
// src/App.tsx (update — theme integration)
import { useTheme } from "./hooks/useTheme";

function App() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`app-shell ${theme}`}>
        {/* ... navbar + routes same ... */}
      </div>
    </BrowserRouter>
  );
}
```

**Why `useTheme` as a custom hook:** Keeps theme logic (localStorage + type) in one place — reusable, and `useLocalStorage<T>` stays visible in the project (per the roadmap).

---

## Testing the Routes

Run `bun run dev` and try the URLs:

| URL | Result |
|-----|--------|
| `/` | Redirects to `/login` (protected + not logged in) |
| `/login` | Login page |
| After login, `/` | Dashboard page |
| `/habits`, `/tasks` | Respective pages |
| `/random-junk` | 404 Not Found |

**The working flow:**

```
Not logged in → / → ProtectedRoute → Navigate to /login
Login → authStore isLoggedIn = true → navigate to /
Now protected pages are accessible
```

---

## What T.4 Taught Us

1. **Routing structure** — public (`/login`) + protected (`/`, `/habits`, `/tasks`) + 404
2. **ProtectedRoute pattern** — `useAuthStore` check + `<Navigate to="/login" replace />`
3. **`React.lazy` + `Suspense`** — code splitting, on-demand page loading, loading fallback
4. **`NavLink`** — highlights the active route (good for accessibility)
5. **Named export + lazy** — `.then((m) => ({ default: m.X }))` pattern
6. **`useLocalStorage` integration** — theme through a custom hook

---

## So Here's the Takeaway

The spine of the app is ready — routing, protected routes, lazy loading. Next step (T.5) — **Habits feature**: CRUD, daily check-in, streak logic. The core user-facing feature.

---

## In Your Own Words

1. What does ProtectedRoute do, and what is the `replace` prop for?

<details>
<summary>Show Answer</summary>

**Sample Answer:** ProtectedRoute is a wrapper component that checks `isLoggedIn` from `useAuthStore`. If logged in → renders children (the protected page). If not → `<Navigate to="/login" replace />` redirects. The `replace` prop means the redirect replaces the history entry instead of pushing — so when the user hits the back button after login, they don't end up back on the protected page they couldn't access. Clean history state.

</details>

2. What do `React.lazy` and `Suspense` achieve? What would happen without them?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `React.lazy` + dynamic imports split each page into its own bundle chunk. Only the current route's page loads — the rest loads on demand. `Suspense` shows a loading fallback while a lazy page loads. Without them, every page is bundled together — the initial load is slow. TrackIt has heavy pages (Dashboard with charts, Habits with streaks) — lazy loading keeps the initial bundle small and fast.

</details>

3. Why the `.then((m) => ({ default: m.Dashboard }))` in lazy imports?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `React.lazy` expects a function returning a Promise whose result is `{ default: Component }` — it needs a default export. Our pages are **named exports** (`export function Dashboard()`). The dynamic `import()` returns the whole module (`m`). The `.then` converts that module into `{ default: m.Dashboard }` — turning the named export into a default. So `lazy` knows which component to use as the default.

</details>

4. Why does `navigate("/")` after login matter? Doesn't ProtectedRoute handle it?

<details>
<summary>Show Answer</summary>

**Sample Answer:** The `navigate("/")` in the Login component redirects the user to the Dashboard after a successful login. ProtectedRoute renders when a route is hit — having it wait to see if the user tries to access `/` is worse UX than redirecting immediately on login. The flow: login submitted → authStore updated → `navigate("/")` → ProtectedRoute now sees `isLoggedIn = true` → Dashboard renders. Direct, clean user experience.

</details>

5. `NavLink` vs `Link` — what's the difference, and why `NavLink` for the navbar?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Both handle navigation — `Link` is a plain link, `NavLink` adds the ability to style the active route (via `isActive` or an `activeClassName`). The navbar should highlight which page the user is on — that's what `NavLink` does by default. It's also better for accessibility — the active link is visually clear. `Link` is for plain navigation where you don't need active-state styling.

</details>

---

## Abhi Tak Kya Hua

T.2 mein data layer (stores), T.3 mein logic layer (useReducer + generic hooks). Ab **T.4 — Navigation**: React Router se dynamic routes, protected routes, aur `React.lazy` + Suspense se code splitting.

Toh aisa scene hai...

---

## Coder Mindset — App Ka Layout Socho

TrackIt ki pages kya hongi?

| Route | Page | Protected? |
|-------|------|-----------|
| `/` | Dashboard | ✅ (login chahiye) |
| `/habits` | Habits | ✅ |
| `/tasks` | Tasks | ✅ |
| `/login` | Login | ❌ (public) |
| `*` | 404 NotFound | ❌ |

**Senior thinking:** Dashboard, Habits, Tasks — sabhi **protected** hain (user ko login karna hai). `/login` public hai. Yehi pattern industry apps mein hai — user data pages sirf logged-in users ke liye.

**Lazy loading kyu?** Dashboard mein charts honge (T.6), Habits mein streak logic — saari pages ek saath load karne se initial bundle bada ho jata hai. `React.lazy` se sirf current page load hota hai, baaki on-demand. **Code splitting** (Batch 5.6).

---

## Step 1 — Pages Banana

Pehle saari pages ka skeleton bana lete hain. Nayi files:

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
      <p>Apna naam daalo — demo login (koi real password nahi)</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Aapka naam..."
        aria-label="Aapka naam"
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
      <p>Yeh page nahi mila.</p>
      <Link to="/">← Dashboard pe jao</Link>
    </div>
  );
}
```

**Login flow:**

```
User naam daal kar submit
    → login(name) → authStore set { isLoggedIn: true, user: { name } }
    → navigate("/") → Dashboard route
```

**Note:** `useAuthStore((s) => s.login)` — selective subscription, action reference stable hai (6.4 pattern).

---

## Step 2 — ProtectedRoute Component

Protected route ka pattern (Batch 3.3) — ek wrapper jo check karta hai login state. Nayi file banao — `src/components/ProtectedRoute.tsx`:

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

**Flow:**

```
User /habits pe jata hai
    │
    ▼
ProtectedRoute render hota hai
    │
    ├── isLoggedIn = true  → children render (Habits page)
    └── isLoggedIn = false → <Navigate to="/login" replace />
```

`replace` — back button pe protected page wapas nahi aata (login ke baad), history clean.

---

## Step 3 — Lazy Loading Pages

Ab `React.lazy` se pages load karte hain — sirf jab route hit ho. Nayi file banao — `src/App.tsx` (poori router setup):

```tsx
// src/App.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./stores/authStore";

// Lazy-loaded pages — sirf route pe load hote hain
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

**Har cheez kya kar rahi hai:**

| Cheez | Kya |
|-------|-----|
| `lazy(() => import(...))` | Dynamic import — page sirf tab load jab route hit |
| `.then((m) => ({ default: m.Dashboard }))` | Named export ko default banata hai — `lazy` default expects |
| `<Suspense fallback={...}>` | Lazy load ke waqt loading indicator |
| `<NavLink>` | Active route pe highlight (isActive class auto) |
| `<ProtectedRoute>` | Login check — wrapper |

**Lazy import pattern — kyun `.then`?**

`lazy()` ko default export chahiye. Humara page **named export** hai (`export function Dashboard()`). Toh dynamic import se module milta hai, `.then` se `default` bana dete hain:

```ts
lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })))
```

---

## Step 4 — useLocalStorage for Theme (Integrate)

T.3 mein `useLocalStorage<T>` banaya. Theme ko integrate karte hain — App level pe `usePrefsStore` ke saath. Nayi file banao — `src/hooks/useTheme.ts`:

```ts
// src/hooks/useTheme.ts
import { useLocalStorage } from "./useLocalStorage";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("trackit-theme", "light");

  return { theme, setTheme };
}
```

Aur `App.tsx` mein isko root div pe class lagao (Tailwind T.6 mein use karenge):

```tsx
// src/App.tsx (update — theme integrate)
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

**`useTheme` kyon custom hook:** Theme logic (localStorage + type) ek jagah — reusable, aur `useLocalStorage<T>` ka use project mein visible hai (roadmap spec).

---

## Routes Ka Test

Ab `bun run dev` — URL try karo:

| URL | Result |
|-----|--------|
| `/` | Login pe redirect (protected + not logged in) |
| `/login` | Login page |
| Login karke `/` | Dashboard page |
| `/habits`, `/tasks` | Respective pages |
| `/random-junk` | 404 NotFound |

**Working flow:**

```
Not logged in → / → ProtectedRoute → Navigate /login
Login → authStore isLoggedIn=true → navigate /
Protected pages ab accessible
```

---

## What T.4 Taught Us

1. **Routing structure** — public (`/login`) + protected (`/`, `/habits`, `/tasks`) + 404
2. **ProtectedRoute pattern** — `useAuthStore` check + `<Navigate to="/login" replace />`
3. **React.lazy + Suspense** — code splitting, on-demand page loading, fallback
4. **NavLink** — active route highlighting (accessibility ke liye good)
5. **Named export + lazy** — `.then((m) => ({ default: m.X }))` pattern
6. **useLocalStorage integration** — theme custom hook ke through

---

## So Here's the Takeaway

App ki spine ready — routing, protected routes, lazy loading. Ab agla step (T.5) — **Habits UI**: CRUD, daily check-in, streak logic. Real user-facing feature.

---

## In Your Own Words

1. ProtectedRoute kya karta hai, aur `replace` prop kyu?

<details>
<summary>Show Answer</summary>

**Sample Answer:** ProtectedRoute ek wrapper component hai jo `useAuthStore` se `isLoggedIn` check karta hai. Agar logged in → children render (protected page). Agar nahi → `<Navigate to="/login" replace />` redirect. `replace` ka matlab history mein redirect entry replace hoti hai, push nahi — toh back button pe protected page wapas nahi aata (login ke baad clean state).

</details>

2. `React.lazy` + Suspense kya achieve karta hai? Iske bina kya hota?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `React.lazy` + dynamic import pages ko code-split karta hai — har page apne bundle chunk mein. Sirf current route ka page load hota hai, baaki on-demand. Suspense lazy load ke waqt fallback (loading spinner) dikhata hai. Iske bina saari pages ek hi bundle mein — initial load slow. TrackIt mein Dashboard (charts), Habits (streak) heavy hai — lazy se initial bundle chhota, jaldi load.

</details>

3. `lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })))` mein `.then` kyun?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `React.lazy` ko ek function chahiye jo ek Promise return kare jiska result `{ default: Component }` ho — default export. Humare pages **named exports** hain (`export function Dashboard()`). Dynamic import se poora module milta hai (`m`), `.then` se module ko `{ default: m.Dashboard }` mein convert karte hain — named export ko default banate hain. Isse `lazy` samajh pata hai ki default component kaun hai.

</details>

4. Login ke baad `navigate("/")` kyun? ProtectedRoute handle karta toh?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Login component mein `useNavigate` se `navigate("/")` — login success ke baad user ko dashboard (default route) le jaata hai. ProtectedRoute tab render hota hai jab route hit ho — user `/` pe redirect ka wait kare yeh better hai ki login component khud navigate kare. Flow: login submit → authStore update → navigate("/") → ProtectedRoute ab isLoggedIn=true → Dashboard render. Direct, clean UX.

</details>

5. NavLink vs Link — kya fark hai, aur kyon NavLink navbar ke liye?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Dono navigation ke liye — Link simple navigation, NavLink extra feature: active route pe auto class/isActive state deta hai. Navbar mein active page highlight hona chahiye (user ko pata ho kaunsi page pe hai) — isliye NavLink. Style ke liye `isActive` se conditional class lagate ho. Accessibility bhi improve hoti hai — active link visually clear hota hai.

</details>
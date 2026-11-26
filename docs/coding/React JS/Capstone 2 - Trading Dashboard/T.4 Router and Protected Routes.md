# Capstone 2 — Trading Dashboard

## T.4 Router and Protected Routes

---

## Broader Goal — What We're Building Here

We set up React Router with protected routes: login page → dashboard → portfolio → trade history → settings. Unauthenticated users get redirected to login. By the end you'll have a multi-page trading app with auth guards.

---

## Router Setup

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTradingStore } from "./store/tradingStore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useTradingStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Key patterns:**
- `ProtectedRoute` wrapper — checks auth state, redirects to `/login` if not authenticated
- Nested routes — `Layout` wraps all protected pages (shared sidebar/header)
- `*` catch-all — redirects unknown routes to dashboard
- `replace` — prevents back-button going to login after auth

---

## Layout (Shared Shell)

```tsx
// src/components/Layout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { useTradingStore } from "../store/tradingStore";

export default function Layout() {
  const navigate = useNavigate();
  const user = useTradingStore((s) => s.user);
  const toggleTheme = useTradingStore((s) => s.toggleTheme);
  const theme = useTradingStore((s) => s.theme);
  const logout = useTradingStore((s) => s.logout);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Trading Dashboard</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="px-3 py-1 rounded bg-gray-700">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <span>{user?.name}</span>
          <button onClick={() => { logout(); navigate("/login"); }} className="px-3 py-1 rounded bg-red-600">
            Logout
          </button>
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Login Page

```tsx
// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTradingStore } from "../store/tradingStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useTradingStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
        />
        <button type="submit" className="w-full p-2 rounded bg-blue-600 hover:bg-blue-700">
          Login
        </button>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Try: trader@test.com / password123
        </p>
      </form>
    </div>
  );
}
```

**Auth is fake (like EMS):** Hardcoded users in the store. No backend needed. The point is to demonstrate the auth flow — protected routes, login/logout, context/state management.

---

## In Your Own Words

1. Why use `replace` in `<Navigate to="/login" replace />`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `replace` replaces the current history entry instead of pushing a new one. Without it, after logging in, pressing the browser back button would go back to the login page (which would redirect again). With `replace`, the login page is removed from history — back button goes to the previous real page.

</details>

2. Why nested routes with `<Outlet />`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Nested routes let you share a layout (header, sidebar) across multiple pages. The parent route renders the `Layout` component, and `<Outlet />` is where the child route's component renders. This avoids repeating the header/sidebar code on every page.

</details>

3. What's the difference between `useNavigate` and `<Navigate />`?

<details>
<summary>Show Answer</summary>

**Sample Answer:** `useNavigate` is a hook for programmatic navigation (e.g., after form submit). `<Navigate />` is a component that redirects declaratively (e.g., in a route guard). Use `useNavigate` in event handlers, `<Navigate />` in route definitions and conditionals.

</details>
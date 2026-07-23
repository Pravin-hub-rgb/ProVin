import type { ReactScenario } from "../types"

export const ROUTER_LAB: ReactScenario = {
  id: "3.1-react-router",
  title: "3.1: React Router Basics",
  description: "HashRouter, Routes, Route, Link, NavLink, useNavigate",
  instructions: `## 🧭 React Router Basics

Is lab mein tum ek simple multi-page navigation app banaoge — Home, About, Contact, aur 404 page.

### Todo 1 — App.tsx: Routes complete karo

App mein 4 Routes hone chahiye:
| Path | Component |
|---|---|
| \`/\` | \`<Home />\` |
| \`/about\` | \`<About />\` |
| \`/contact\` | \`<Contact />\` |
| \`*\` | \`<NotFound />\` |

### Todo 2 — Navbar.tsx: NavLink with isActive

Har link \`<NavLink>\` se replace karo aur \`isActive\` ke according class \`"nav-link active"\` do.

### Todo 3 — Home.tsx: useNavigate

"Go to Contact" button pe \`navigate("/contact")\` lagao.

### Todo 4 — NotFound.tsx: 404 page

\`/components/NotFound.tsx\` file edit karo — ek simple "404 — Page not found" component banao jisme back to Home ka \`<Link>\` ho.

### Expected Output

| Route | Content |
|---|---|
| \`/\` | Welcome + "Go to Contact" button |
| \`/about\` | About page |
| \`/contact\` | Contact info + "← Back" button (useNavigate(-1)) |
| \`/xyz\` | 404 + "Go to Home" link |
| Navbar | Home • About • Contact (active link highlight) |
  `,

  hints: [
    "App.tsx mein <Route path=\"*\"> last mein rakhna — pehle specific routes",
    "NavLink ka className: `({ isActive }) => isActive ? \"nav-link active\" : \"nav-link\"`",
    "useNavigate import: `import { useNavigate } from \"react-router-dom\"`",
    "NotFound mein Link to=\"/\" — \"Go to Home\"",
  ],

  dependencies: {
    "react-router-dom": "^6.20.0",
  },

  starterFiles: {
    "/public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React Router Lab</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    "/index.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);`,
    "/App.tsx": `import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
// TODO: NotFound import karo

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* TODO: /contact ka Route add karo */}
          {/* TODO: * ka Route add karo (404) */}
        </Routes>
      </main>
    </div>
  );
}`,
    "/components/Navbar.tsx": `import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* TODO: teeno links ko NavLink mein badlo with isActive styling */}
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}`,
    "/components/Home.tsx": `import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>🏠 Welcome</h1>
      <p>This is a multi-page React app with React Router.</p>
      {/* TODO: "Go to Contact" button — navigate("/contact") */}
    </div>
  );
}`,
    "/components/About.tsx": `export default function About() {
  return (
    <div>
      <h1>ℹ️ About</h1>
      <p>This app demonstrates React Router basics — Routes, Link, NavLink, useNavigate.</p>
    </div>
  );
}`,
    "/components/Contact.tsx": `import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>📞 Contact</h1>
      <p>Email: hello@example.com</p>
      <p>Phone: +1 234 567 890</p>
      {/* TODO: "← Back" button — navigate(-1) */}
    </div>
  );
}`,
    "/components/NotFound.tsx": `import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>
      <p>Ye page exist nahi karta.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
  background: #0d1117;
  color: #c9d1d9;
}

.app { max-width: 600px; margin: 0 auto; padding: 1rem; }

.navbar {
  display: flex; gap: 1rem;
  padding: 1rem; background: #161b22;
  border: 1px solid #30363d; border-radius: 8px;
  margin-bottom: 2rem;
}

.navbar a { color: #79c0ff; text-decoration: none; padding: 0.25rem 0.5rem; border-radius: 4px; }
.nav-link { color: #79c0ff; text-decoration: none; padding: 0.25rem 0.5rem; border-radius: 4px; }
.nav-link.active { color: #58a6ff; background: #1f2937; font-weight: bold; }

button {
  background: #238636; color: white; border: none;
  padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;
  font-size: 0.9rem; margin-right: 0.5rem;
}
button:hover { background: #2ea043; }

h1 { margin-top: 0; }`,
  },

  solutionFiles: {
    "/index.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);`,
    "/App.tsx": `import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}`,
    "/components/Navbar.tsx": `import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
    </nav>
  );
}`,
    "/components/Home.tsx": `import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>🏠 Welcome</h1>
      <p>This is a multi-page React app with React Router.</p>
      <button onClick={() => navigate("/contact")}>Go to Contact</button>
    </div>
  );
}`,
    "/components/Contact.tsx": `import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>📞 Contact</h1>
      <p>Email: hello@example.com</p>
      <p>Phone: +1 234 567 890</p>
      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}`,
    "/components/NotFound.tsx": `import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 — Page Not Found</h1>
      <p>Ye page exist nahi karta.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    const navbar = files["/components/Navbar.tsx"] ?? ""
    const home = files["/components/Home.tsx"] ?? ""
    const contact = files["/components/Contact.tsx"] ?? ""
    const hasNotFound = "/components/NotFound.tsx" in files
    const notFound = hasNotFound ? (files["/components/NotFound.tsx"] ?? "") : ""

    return [
      { label: "App.tsx mein /contact ka Route hai", passed: /\/contact/.test(app) },
      { label: "App.tsx mein * ka 404 Route hai", passed: /\*/.test(app) },
      { label: "Navbar NavLink use kar raha hai (na ki <a>)", passed: /NavLink/.test(navbar) && !/<a\s/.test(navbar) },
      { label: "Navbar mein isActive styling hai", passed: /isActive/.test(navbar) },
      { label: "Home mein navigate('/contact') use ho raha hai", passed: /navigate\(\s*["']\/contact["']\s*\)/.test(home) },
      { label: "Contact mein navigate(-1) back button hai", passed: /navigate\(\s*-1\s*\)/.test(contact) },
      { label: "NotFound.tsx file exist karta hai", passed: hasNotFound },
      { label: "NotFound mein Link to='/' hai", passed: notFound.includes("/>") || notFound.includes("to=\"/\"") },
    ]
  },
}
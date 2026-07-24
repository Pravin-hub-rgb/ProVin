import type { ReactScenario } from "../types"

export const DYNAMIC_ROUTES_LAB: ReactScenario = {
  id: "3.2-dynamic-routes",
  title: "3.2: Dynamic Routes & Nested Routes",
  description: "useParams, dynamic routes, nested routes, Outlet, index route",
  instructions: `## 🧭 Dynamic Routes & Nested Routes

Is lab mein tum ek Product Catalog app banaoge — products ki list dekho, detail page dekho, aur sab kuch nested Layout ke saath.

### Todo 1 — App.tsx: Layout mein Outlet daalo

Layout component ke <main> mein \`<Outlet />\` daalo taaki child route wahan render ho. Pehle Outlet import karna mat bhoolna.

### Todo 2 — App.tsx: Index route daalo

Flat \`<Route path="/" ...>\` ki jagah nested \`<Route index>\` use karo — HomePage Layout ke andar render hogi.

### Todo 3 — App.tsx: Dynamic route daalo

\`/products/:id\` route daalo jo \`<ProductDetail />\` render kare. Saath hi \`/products\` aur \`*\` routes bhi daalo.

### Todo 4 — ProductList.tsx: Dynamic links

Har product card mein \`<Link>\` ke \`to\` mein product ID daalo — jaise \`/products/1\`, \`/products/2\`.

### Todo 5 — ProductDetail.tsx: useParams

\`useParams\` se URL se \`:id\` nikaalo, \`productData\` mein se matching product dhunndho, aur guard lagao agar product exist nahi karta.

### Expected Output

| Route | Content |
|---|---|
| \`/\` | Welcome page with Layout (navbar) |
| \`/products\` | 3 products ki list with "View Details" links |
| \`/products/1\` | Wireless Headphones detail page |
| \`/products/xyz\` | "Product not found" message |
| \`/random\` | 404 — NotFound component |
  `,

  hints: [
    "Outlet import: `import { Outlet } from \"react-router-dom\"`",
    "Index route syntax: `<Route index element={<Home />} />` — path nahi lagta",
    "Dynamic route: `<Route path=\"products/:id\" element={<ProductDetail />} />`",
    "useParams: `const { id } = useParams()` — colon ke baad ka naam match karo",
    "Nested routes mein paths parent ke relative hote hain — \"/\" prefix mat lagao",
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
    <title>Product Catalog</title>
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
// TODO: Outlet import karo
import Header from "./components/Header";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";

function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        {/* TODO 1: <Outlet /> daalo — child route yahan render hoga */}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* TODO 2: <Route index> use karo for HomePage */}
            {/* TODO 3: /products ka route daalo */}
            {/* TODO 4: /products/:id ka route daalo for ProductDetail */}
            {/* TODO 5: * ka route daalo for NotFound */}
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}`,
    "/components/Header.tsx": `import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        Home
      </NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        Products
      </NavLink>
    </nav>
  );
}`,
    "/components/Home.tsx": `import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>🛍️ Welcome to Product Catalog</h1>
      <p>Browse our collection of amazing products.</p>
      <Link to="/products" className="cta-button">View Products →</Link>
    </div>
  );
}`,
    "/components/ProductList.tsx": `import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Wireless Headphones", price: 2499 },
  { id: 2, name: "Smart Watch", price: 3999 },
  { id: 3, name: "USB-C Hub", price: 1299 },
];

export default function ProductList() {
  return (
    <div>
      <h1>📦 All Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            {/* TODO: Link ke to mein product ID daalo — /products/1 */}
            <Link to={""}>View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    "/components/ProductDetail.tsx": `import { Link } from "react-router-dom";
// TODO: useParams import karo

const productData: Record<string, { name: string; price: number; desc: string }> = {
  "1": { name: "Wireless Headphones", price: 2499, desc: "Noise-cancelling Bluetooth 5.0 headphones with 30hr battery life." },
  "2": { name: "Smart Watch", price: 3999, desc: "Fitness tracker with heart rate monitor, GPS, and 7 days battery." },
  "3": { name: "USB-C Hub", price: 1299, desc: "7-in-1 USB-C hub with HDMI 4K, USB 3.0, and SD card reader." },
};

export default function ProductDetail() {
  // TODO 1: useParams se id nikaalo — const { id } = ???
  // TODO 2: productData se matching product dhunndho
  // TODO 3: Guard — agar product nahi mila to "Product not found" dikhao

  return (
    <div className="product-detail">
      <h1>Wireless Headphones</h1>
      <p className="price">₹2499</p>
      <p>Noise-cancelling Bluetooth 5.0 headphones with 30hr battery life.</p>
      <Link to="/products">← Back to Products</Link>
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
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
  background: #0d1117;
  color: #c9d1d9;
}

.app { max-width: 700px; margin: 0 auto; padding: 1rem; }

.navbar {
  display: flex; gap: 1rem;
  padding: 1rem; background: #161b22;
  border: 1px solid #30363d; border-radius: 8px;
  margin-bottom: 2rem;
}

.nav-link { color: #79c0ff; text-decoration: none; padding: 0.25rem 0.5rem; border-radius: 4px; }
.nav-link.active { color: #58a6ff; background: #1f2937; font-weight: bold; }

.home { text-align: center; padding: 3rem 0; }
.home h1 { font-size: 1.8rem; }
.cta-button {
  display: inline-block; margin-top: 1rem;
  background: #238636; color: white; text-decoration: none;
  padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: bold;
}

.product-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
.product-card {
  flex: 1; min-width: 180px;
  padding: 1rem; background: #161b22;
  border: 1px solid #30363d; border-radius: 8px;
}
.product-card h3 { margin: 0 0 0.5rem; }
.price { color: #3fb950; font-weight: bold; font-size: 1.1rem; }
.product-card a { color: #79c0ff; }

.product-detail { padding: 1rem 0; }
.product-detail h1 { margin-top: 0; }
.product-detail .price { font-size: 1.5rem; }

button {
  background: #238636; color: white; border: none;
  padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;
  font-size: 0.9rem;
}
button:hover { background: #2ea043; }`,
  },

  solutionFiles: {
    "/App.tsx": `import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";

function Layout() {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}`,
    "/components/ProductList.tsx": `import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Wireless Headphones", price: 2499 },
  { id: 2, name: "Smart Watch", price: 3999 },
  { id: 3, name: "USB-C Hub", price: 1299 },
];

export default function ProductList() {
  return (
    <div>
      <h1>📦 All Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <Link to={\`/products/$\{p.id}\`}>View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    "/components/ProductDetail.tsx": `import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const productData: Record<string, { name: string; price: number; desc: string }> = {
  "1": { name: "Wireless Headphones", price: 2499, desc: "Noise-cancelling Bluetooth 5.0 headphones with 30hr battery life." },
  "2": { name: "Smart Watch", price: 3999, desc: "Fitness tracker with heart rate monitor, GPS, and 7 days battery." },
  "3": { name: "USB-C Hub", price: 1299, desc: "7-in-1 USB-C hub with HDMI 4K, USB 3.0, and SD card reader." },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id ?? ""];

  if (!product) {
    return (
      <div>
        <h2>Product not found</h2>
        <Link to="/products">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p className="price">₹{product.price}</p>
      <p>{product.desc}</p>
      <Link to="/products">← Back to Products</Link>
    </div>
  );
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    const list = files["/components/ProductList.tsx"] ?? ""
    const detail = files["/components/ProductDetail.tsx"] ?? ""

    return [
      { label: "Layout mein Outlet hai", passed: /<Outlet/.test(app) },
      { label: "Index route hai (Route index)", passed: /<Route\s+index/.test(app) },
      { label: "/products route hai", passed: /products/.test(app) },
      { label: "Dynamic route /products/:id hai", passed: /products\/:id/.test(app) },
      { label: "* catch-all route hai", passed: /path="\*"/.test(app) || /path='\*'/.test(app) },
      { label: "ProductList mein dynamic link hai (p.id)", passed: /\$\{?\s*p\.id\s*\}?/.test(list) },
      { label: "ProductDetail mein useParams hai", passed: /useParams/.test(detail) },
      { label: "ProductDetail mein guard hai (!product)", passed: /!\s*product/.test(detail) },
    ]
  },
}

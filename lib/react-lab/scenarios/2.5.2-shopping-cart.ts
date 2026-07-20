import type { ReactScenario } from "../types"

export const SHOPPING_CART_LAB: ReactScenario = {
  id: "2.5.2-shopping-cart",
  title: "2.5.2: Shopping Cart — Lift State Up",
  description: "ProductList aur CartSummary ko same cart state share karo",
  instructions: `## Problem: Cart count update nahi ho raha

Ek simple shopping cart hai. ProductList mein "Add to Cart" buttons hain, aur CartSummary mein total count dikhta hai. Lekin abhi dono ka apna-apna state hai — add karne par count update nahi hota.

### Step 1 — Problem dekho
\`CartSummary\` mein hardcoded "0 items" hai. ProductList mein add karne par woh change nahi hota. ❌

### Step 2 — State App mein banao
\`App\` mein \`cartItems\` state banao — ek string array (product names store karega):
\`\`\`ts
const [cartItems, setCartItems] = useState<string[]>([]);
\`\`\`

### Step 3 — Props do dono components ko
**CartSummary** ko \`itemCount\` prop do — \`cartItems.length\` pass karo.

**ProductList** ko \`onAddToCart\` callback do — product name parameter lega, \`setCartItems\` mein push karega.

### Step 4 — Verify
"Add to Cart" click karo → CartSummary ka count update ho raha hai? ✅

### Bonus — Remove from cart
CartSummary mein har item ke saath "✕" button do jo cart se hata de. \`onRemove\` callback App mein banao.
  `,

  hints: [
    "App mein: `const [cartItems, setCartItems] = useState<string[]>([])`",
    "Add: `onAddToCart={(name) => setCartItems(prev => [...prev, name])}`",
    "Remove: `onRemove={(name) => setCartItems(prev => prev.filter(item => item !== name))}`",
    "CartSummary: `itemCount={cartItems.length}` and map through cartItems to show list",
  ],

  starterFiles: {
    "/data.ts": `export const products = [
  { id: 1, name: "React Mug", price: 12 },
  { id: 2, name: "Dev Sticker Pack", price: 5 },
  { id: 3, name: "TypeScript Tote", price: 15 },
  { id: 4, name: "Node.js Cap", price: 10 },
];`,
    "/App.tsx": `import { useState } from "react";
import { products } from "./data";

// TODO: CartSummary ko items count chahiye — prop do
function CartSummary() {
  return (
    <div className="cart">
      <h3>Cart</h3>
      <p className="cart-count">0 items</p>
      {/* TODO: Show list of items with ✕ remove button */}
    </div>
  );
}

// TODO: ProductList ko onAddToCart callback chahiye
function ProductList() {
  return (
    <div className="products">
      <h3>Products</h3>
      {products.map((p) => (
        <div key={p.id} className="product">
          <span>{p.name} — \${p.price}</span>
          <button className="add-btn">+ Add</button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  // TODO: cartItems state banao + onAddToCart / onRemove callbacks

  return (
    <div className="app">
      <h1>Store</h1>
      <div className="layout">
        <ProductList />
        <CartSummary />
      </div>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
}
.app { max-width: 600px; margin: 0 auto; }
.layout { display: flex; gap: 2rem; align-items: flex-start; }
.products, .cart {
  flex: 1;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1rem;
  background: #161b22;
}
h3 { margin: 0 0 0.75rem; font-size: 0.95rem; }
.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #21262d;
  font-size: 0.85rem;
}
.product:last-child { border-bottom: none; }
.add-btn {
  background: #238636;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}
.add-btn:hover { background: #2ea043; }
.cart-count { font-size: 0.85rem; color: #8b949e; }
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.85rem;
}
.remove-btn {
  background: transparent;
  border: 1px solid #30363d;
  color: #ff7b72;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.remove-btn:hover { background: #ff7b721a; }`,
  },

  solutionFiles: {
    "/data.ts": `export const products = [
  { id: 1, name: "React Mug", price: 12 },
  { id: 2, name: "Dev Sticker Pack", price: 5 },
  { id: 3, name: "TypeScript Tote", price: 15 },
  { id: 4, name: "Node.js Cap", price: 10 },
];`,
    "/App.tsx": `import { useState } from "react";
import { products } from "./data";

function CartSummary({ itemCount, items, onRemove }: { itemCount: number; items: string[]; onRemove: (name: string) => void }) {
  return (
    <div className="cart">
      <h3>Cart</h3>
      <p className="cart-count">{itemCount} items</p>
      {items.map((name, i) => (
        <div key={i} className="cart-item">
          <span>{name}</span>
          <button className="remove-btn" onClick={() => onRemove(name)}>✕</button>
        </div>
      ))}
    </div>
  );
}

function ProductList({ onAddToCart }: { onAddToCart: (name: string) => void }) {
  return (
    <div className="products">
      <h3>Products</h3>
      {products.map((p) => (
        <div key={p.id} className="product">
          <span>{p.name} — \${p.price}</span>
          <button className="add-btn" onClick={() => onAddToCart(p.name)}>+ Add</button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState<string[]>([]);

  return (
    <div className="app">
      <h1>Store</h1>
      <div className="layout">
        <ProductList onAddToCart={(name) => setCartItems(prev => [...prev, name])} />
        <CartSummary itemCount={cartItems.length} items={cartItems} onRemove={(name) => setCartItems(prev => prev.filter(item => item !== name))} />
      </div>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
}
.app { max-width: 600px; margin: 0 auto; }
.layout { display: flex; gap: 2rem; align-items: flex-start; }
.products, .cart {
  flex: 1;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1rem;
  background: #161b22;
}
h3 { margin: 0 0 0.75rem; font-size: 0.95rem; }
.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #21262d;
  font-size: 0.85rem;
}
.product:last-child { border-bottom: none; }
.add-btn {
  background: #238636;
  color: white;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}
.add-btn:hover { background: #2ea043; }
.cart-count { font-size: 0.85rem; color: #8b949e; }
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.85rem;
}
.remove-btn {
  background: transparent;
  border: 1px solid #30363d;
  color: #ff7b72;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.remove-btn:hover { background: #ff7b721a; }`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "App mein cartItems state hai (string[])", passed: /cartItems/.test(app) && /useState/.test(app.split("export default function App")[1] ?? "") },
      { label: "CartSummary itemCount prop receive kar raha hai", passed: /itemCount/.test(app) },
      { label: "CartSummary items array show kar raha hai", passed: /\{items\.map/.test(app) || /\{cartItems\.map/.test(app) },
      { label: "ProductList onAddToCart callback receive kar raha hai", passed: /onAddToCart/.test(app) },
      { label: "Add button onClick mein function hai", passed: /onClick\s*=\s*\{\(?\s*\)?\s*=>/.test(app.split("ProductList")[1]?.split("return")[1] ?? app) || /onClick\s*=\s*\{\(?\s*\)?\s*=>/.test(app) },
      { label: "Remove button exists", passed: /remove|✕/.test(app) },
    ]
  },
}

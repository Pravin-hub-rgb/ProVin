import type { ReactScenario } from "../types"

export const LISTS_LAB: ReactScenario = {
  id: "1.11-lists-keys",
  title: "1.11: Lists, Keys aur TypeScript Arrays",
  description: "Practice rendering lists, using keys, and typed arrays",
  instructions: `## Shopping List

Build a shopping list app that demonstrates list rendering and array operations.

### Requirements:
1. \`interface Item { id: number; name: string; quantity: number }\`
2. Show all items in a list using \`.map()\`
3. Add a form to add new items (name + quantity)
4. Click item to toggle "bought" status (add \`bought?: boolean\` to Item)
5. Filter: **All** | **To Buy** | **Bought**

### Array Operations to Practice:
- \`.map()\` — render list / toggle items
- \`.filter()\` — delete / filter items
- \`...spread\` — add new items
- \`key={item.id}\` — correct key usage

### Tips:
- Never use array index as key
- \`quantity\` should be \`number\`, use \`type="number"\` input
  `,

  hints: [
    "Never use array index as key — use a unique `id` property",
    "`quantity` should be `number`, use `type=\"number\"` on the input",
    "Toggle bought: `items.map(i => i.id === id ? { ...i, bought: !i.bought } : i)`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

// TODO: Item interface banao jisme id, name, quantity ho aur bought optional ho

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addItem = () => {
    if (name.trim() === "") return;
    // TODO: Add new item
    setName("");
    setQuantity(1);
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} />
        <button onClick={addItem}>Add</button>
      </div>
      {/* TODO: Render items with .map() */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #2d2d44;
  color: #e0e0e0;
}
input {
  padding: 0.4rem 0.6rem; font-size: 0.9rem;
  border: 1px solid #555; border-radius: 6px; background: #3d3d55; color: white;
  margin-right: 0.5rem;
}
input[type="number"] { width: 60px; }
button {
  padding: 0.4rem 0.8rem; border: none; border-radius: 6px;
  cursor: pointer; background: #6c63ff; color: white;
}
.item {
  display: flex; align-items: center; gap: 0.75rem;
  background: #3d3d55; padding: 0.6rem 1rem; border-radius: 8px;
  margin-bottom: 0.4rem; cursor: pointer;
}
.item.bought { opacity: 0.5; text-decoration: line-through; }
.badge {
  background: #6c63ff; padding: 0.15rem 0.5rem; border-radius: 12px;
  font-size: 0.75rem;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

interface Item {
  id: number;
  name: string;
  quantity: number;
  bought?: boolean;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [filter, setFilter] = useState<"all" | "tobuy" | "bought">("all");

  const addItem = () => {
    if (name.trim() === "") return;
    setItems([...items, { id: Date.now(), name, quantity, bought: false }]);
    setName("");
    setQuantity(1);
  };

  const toggleBought = (id: number) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, bought: !item.bought } : item
    ));
  };

  const filtered = items.filter((item) => {
    if (filter === "tobuy") return !item.bought;
    if (filter === "bought") return item.bought;
    return true;
  });

  return (
    <div>
      <h1>Shopping List</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} />
        <button onClick={addItem}>Add</button>
      </div>
      <div style={{ margin: "1rem 0" }}>
        {(["all", "tobuy", "bought"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ background: filter === f ? "#6c63ff" : "#555", marginRight: "0.5rem" }}>
            {f === "tobuy" ? "To Buy" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filtered.map((item) => (
        <div key={item.id} className={\`item \${item.bought ? "bought" : ""}\`} onClick={() => toggleBought(item.id)}>
          <span style={{ flex: 1 }}>{item.name}</span>
          <span className="badge">x{item.quantity}</span>
          <span>{item.bought ? "✓" : "○"}</span>
        </div>
      ))}
      {items.length === 0 && <p style={{ color: "#888" }}>Add some items to your list!</p>}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #2d2d44;
  color: #e0e0e0;
}
input {
  padding: 0.4rem 0.6rem; font-size: 0.9rem;
  border: 1px solid #555; border-radius: 6px; background: #3d3d55; color: white;
  margin-right: 0.5rem;
}
input[type="number"] { width: 60px; }
button {
  padding: 0.4rem 0.8rem; border: none; border-radius: 6px;
  cursor: pointer; background: #6c63ff; color: white;
}
.item {
  display: flex; align-items: center; gap: 0.75rem;
  background: #3d3d55; padding: 0.6rem 1rem; border-radius: 8px;
  margin-bottom: 0.4rem; cursor: pointer;
}
.item.bought { opacity: 0.5; text-decoration: line-through; }
.badge {
  background: #6c63ff; padding: 0.15rem 0.5rem; border-radius: 12px;
  font-size: 0.75rem;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Item interface with id, name, quantity", passed: /interface\s+Item\s*\{[\s\S]*id[\s\S]*name[\s\S]*quantity[\s\S]*\}/.test(app) },
      { label: ".map() used to render list", passed: /\.map\s*\(/.test(app) },
      { label: "key prop on list items", passed: /\bkey\s*=\s*\{/.test(app) },
      { label: "Add form with name and quantity inputs", passed: /<input[^>]*name/.test(app) && /<input[^>]*quantity/.test(app) },
      { label: "Toggle bought status on click", passed: /bought/.test(app) && /onClick/.test(app) },
      { label: "Filter buttons", passed: /("all"|'all')/.test(app) && /("bought"|'bought'|"tobuy"|'tobuy')/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

import type { ReactScenario } from "../types"

export const CONDITIONAL_LAB: ReactScenario = {
  id: "1.10-conditional",
  title: "1.10: Conditional Rendering aur Filter",
  description: "Practice conditional rendering with toggle and filter patterns",
  instructions: `## Flagged Items — Toggle & Filter

Extend the list app with toggle flag and filtering.

### Requirements:
1. \`interface Item { id: number; text: string; flagged: boolean }\`
2. Each item has a flag button — click to toggle \`flagged\`
3. Flagged items show with bold text and a star icon
4. Add filter buttons: **All** | **Flagged** | **Unflagged**
5. Show count: "Flagged: X / Total: Y"

### Hints:
- Toggle: \`.map()\` + spread: \`{...item, flagged: !item.flagged}\`
- Filter: \`.filter()\` based on current filter state
- Union type for filter: \`"all" | "flagged" | "unflagged"\`
  `,

  hints: [
    "Toggle: `.map()` + spread: `{...item, flagged: !item.flagged}`",
    "Filter: `.filter()` based on current filter state",
    "Union type for filter: `\"all\" | \"flagged\" | \"unflagged\"`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

// TODO: Item interface banao — id, text, flagged

type FilterStatus = "all" | "flagged" | "unflagged";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const addItem = () => {
    if (input.trim() === "") return;
    // TODO: Add new item with flagged: false
    setItems([...items, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  // TODO: Add toggleFlag function

  // TODO: Filter items based on current filter

  return (
    <div>
      <h1>Flagged Items</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add an item..." />
        <button onClick={addItem}>Add</button>
      </div>
      {/* TODO: Add filter buttons (All / Flagged / Unflagged) */}
      {/* TODO: Render items with flag button + text + delete */}
      {/* TODO: Show item count */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #f0f2f5;
}
input { padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; }
button {
  padding: 0.4rem 0.8rem; font-size: 0.85rem; border: none; border-radius: 6px;
  cursor: pointer; background: #4a90d9; color: white; margin: 0.25rem;
}
.item-row {
  display: flex; align-items: center; gap: 0.5rem;
  background: white; padding: 0.6rem 1rem; border-radius: 8px;
  margin-bottom: 0.4rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.filters { margin: 1rem 0; }
.filters button.active { background: #2c5f8a; }
.star-btn {
  background: none; border: 1px solid #ccc; border-radius: 4px;
  cursor: pointer; padding: 2px 8px; font-size: 1rem;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

interface Item {
  id: number;
  text: string;
  flagged: boolean;
}

type FilterStatus = "all" | "flagged" | "unflagged";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const addItem = () => {
    if (input.trim() === "") return;
    setItems([...items, { id: Date.now(), text: input, flagged: false }]);
    setInput("");
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const toggleFlag = (id: number) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, flagged: !item.flagged } : item
    ));
  };

  const filteredItems = items.filter((item) => {
    if (filter === "flagged") return item.flagged;
    if (filter === "unflagged") return !item.flagged;
    return true;
  });

  return (
    <div>
      <h1>Flagged Items</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add an item..." />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="filters">
        {(["all", "flagged", "unflagged"] as FilterStatus[]).map((f) => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filteredItems.length === 0 ? (
        <p style={{ color: "#888" }}>No items found.</p>
      ) : (
        filteredItems.map((item) => (
          <div key={item.id} className="item-row">
            <button className="star-btn" onClick={() => toggleFlag(item.id)}>
              {item.flagged ? "★" : "☆"}
            </button>
            <span style={{ fontWeight: item.flagged ? "bold" : "normal", flex: 1 }}>
              {item.text}
            </span>
            <button onClick={() => deleteItem(item.id)} style={{ background: "#e74c3c" }}>Delete</button>
          </div>
        ))
      )}
      <p style={{ color: "#888", marginTop: "1rem" }}>
        Flagged: {items.filter((i) => i.flagged).length} / {items.length} items
      </p>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #f0f2f5;
}
input { padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; }
button {
  padding: 0.4rem 0.8rem; font-size: 0.85rem; border: none; border-radius: 6px;
  cursor: pointer; background: #4a90d9; color: white; margin: 0.25rem;
}
.item-row {
  display: flex; align-items: center; gap: 0.5rem;
  background: white; padding: 0.6rem 1rem; border-radius: 8px;
  margin-bottom: 0.4rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.filters { margin: 1rem 0; }
.filters button.active { background: #2c5f8a; }
.star-btn {
  background: none; border: 1px solid #ccc; border-radius: 4px;
  cursor: pointer; padding: 2px 8px; font-size: 1rem;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Item interface with flagged", passed: /interface\s+Item\s*\{[\s\S]*id[\s\S]*text[\s\S]*flagged[\s\S]*\}/.test(app) },
      { label: "Star button for flag toggle", passed: /[★☆]/.test(app) || /toggleFlag/.test(app) },
      { label: "Conditional style (bold for flagged)", passed: /fontWeight[\s\S]*flagged/.test(app) || /bold[\s\S]*flagged/.test(app) },
      { label: "Filter buttons (All / Flagged / Unflagged)", passed: /("all"|'all')/.test(app) && /("flagged"|'flagged')/.test(app) && /("unflagged"|'unflagged')/.test(app) },
      { label: "Item count shown", passed: /flagged[\s\S]*\.length/.test(app) || /Filtered[\s\S]*\.length/.test(app) },
      { label: "Spread operator for toggle", passed: /\.\.\.item|\.\.\.i/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

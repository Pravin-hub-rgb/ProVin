import type { ReactScenario } from "../types"

export const CONDITIONAL_LAB: ReactScenario = {
  id: "1.11-conditional",
  title: "1.11: Conditional Rendering aur Filter",
  description: "Practice conditional rendering with toggle and filter patterns",
  instructions: `## To-Do — Toggle & Filter

Extend the list app with a done/not-done toggle and filtering.

### Requirements:
1. \`interface Item { id: number; text: string; completed: boolean }\`
2. Each item has a checkbox button — click to toggle \`completed\`
3. Completed items show with strikethrough text and a checked box
4. Add filter buttons: **All** | **Active** | **Completed**
5. Show count: "Completed: X / Total: Y"

### Hints:
- Toggle: \`.map()\` + spread: \`{...item, completed: !item.completed}\`
- Filter: \`.filter()\` based on current filter state
- Union type for filter: \`"all" | "active" | "completed"\`
  `,

  hints: [
    "Toggle: `.map()` + spread: `{...item, completed: !item.completed}`",
    "Filter: `.filter()` based on current filter state",
    "Union type for filter: `\"all\" | \"active\" | \"completed\"`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

// TODO: Item interface banao — id, text, completed

type FilterStatus = "all" | "active" | "completed";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const addItem = () => {
    if (input.trim() === "") return;
    // TODO: Add new item with completed: false
    setItems([...items, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  // TODO: Add toggleComplete function

  // TODO: Filter items based on current filter

  return (
    <div>
      <h1>To-Do</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add an item..." />
        <button onClick={addItem}>Add</button>
      </div>
      {/* TODO: Add filter buttons (All / Active / Completed) */}
      {/* TODO: Render items with checkbox button + text + delete */}
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
.check-btn {
  background: none; border: 1px solid #ccc; border-radius: 4px;
  cursor: pointer; padding: 2px 8px; font-size: 1rem;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

type FilterStatus = "all" | "active" | "completed";

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const addItem = () => {
    if (input.trim() === "") return;
    setItems([...items, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const toggleComplete = (id: number) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "active") return !item.completed;
    return true;
  });

  return (
    <div>
      <h1>To-Do</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add an item..." />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="filters">
        {(["all", "active", "completed"] as FilterStatus[]).map((f) => (
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
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
              style={{ width: "18px", height: "18px", cursor: "pointer", marginRight: "8px", accentColor: item.completed ? "#28a745" : "#ccc" }}
            />
            <span style={{ textDecoration: item.completed ? "line-through" : "none", color: item.completed ? "#999" : "#000", flex: 1 }}>
              {item.text}
            </span>
            <button onClick={() => deleteItem(item.id)} style={{ background: "#e74c3c" }}>Delete</button>
          </div>
        ))
      )}
      <p style={{ color: "#888", marginTop: "1rem" }}>
        Completed: {items.filter((i) => i.completed).length} / {items.length} items
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
.check-btn {
  background: none; border: 1px solid #ccc; border-radius: 4px;
  cursor: pointer; padding: 2px 8px; font-size: 1rem;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Item interface with completed", passed: /interface\s+Item\s*\{[\s\S]*id[\s\S]*text[\s\S]*completed[\s\S]*\}/.test(app) },
      { label: "Checkbox input for complete toggle", passed: /type="checkbox"/.test(app) || /toggleComplete/.test(app) },
      { label: "Conditional style (strikethrough for completed)", passed: /textDecoration[\s\S]*completed/.test(app) || /line-through[\s\S]*completed/.test(app) },
      { label: "Filter buttons (All / Active / Completed)", passed: /("all"|'all')/.test(app) && /("active"|'active')/.test(app) && /("completed"|'completed')/.test(app) },
      { label: "Item count shown", passed: /completed[\s\S]*\.length/.test(app) || /Filtered[\s\S]*\.length/.test(app) },
      { label: "Spread operator for toggle", passed: /\.\.\.item|\.\.\.i/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

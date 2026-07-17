import type { ReactScenario } from "../types"

export const TODO_BASIC_LAB: ReactScenario = {
  id: "1.9-array-state",
  title: "1.9: Array State aur List Rendering",
  description: "Practice array state with add and delete items",
  instructions: `## List App: Add & Delete Items

Ek app banayenge jisme user items add aur delete kar sake — using \`useState<string[]>\`.

### Kya Banayenge?

- Input field + "Add" button → naya item list mein add ho
- Items neeche list mein dikhe — har item ke saath "Delete" button
- Empty state: "No items yet" jab koi item na ho

### Requirements:
1. \`useState<string[]>([])\` — array state with explicit generic
2. \`useState("")\` — controlled input ke liye
3. \`addItem\` function — spread operator se add karo, \`.push()\` kabhi nahi
4. \`deleteItem\` function — \`.filter()\` se remove karo
5. \`.map()\` se items render karo — har item pe Delete button
6. Empty state dikhao jab list khali ho

### Tips:
- Immutability rule: naya array reference do, purane ko mutate mat karo
- \`setItems([...items, newItem])\` — spread to add
- \`setItems(items.filter((_, i) => i !== index))\` — filter to remove
- Conditional rendering: \`items.length === 0 ? ... : ...\`
  `,

  hints: [
    "State: `useState<string[]>([])` + `useState(\"\")`",
    "Add: `setItems([...items, input.trim()])` — never `.push()`",
    "Delete: `setItems(items.filter((_, i) => i !== index))`",
    "Empty state: `items.length === 0 ? <p>No items...</p> : items.map(...)`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  // TODO 1: items state banao — useState<string[]>([]) — explicit generic do

  // TODO 2: input state banao — useState("") — controlled input ke liye

  // TODO 3: addItem function banao — input.trim() check karo,
  //          spread se items mein add karo, input clear karo

  // TODO 4: deleteItem function banao — (index: number) parameter lo,
  //          filter se index wala item remove karo

  return (
    <div>
      <h1>List App</h1>
      {/* TODO 5: Input field + Add button — input state ke saath controlled */}
      {/* TODO 6: .map() se items render karo — har item ke saath Delete button */}
      {/* TODO 7: Empty state — items.length === 0 ? "No items yet" : items.map(...) */}
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
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
  margin-left: 0.5rem;
}
button:hover { opacity: 0.9; }
.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() === "") return;
    setItems([...items, input.trim()]);
    setInput("");
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>List App</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter an item..."
        />
        <button onClick={addItem}>Add</button>
      </div>
      {items.length === 0 ? (
        <p style={{ color: "#888" }}>No items yet. Add one above!</p>
      ) : (
        items.map((item, index) => (
          <div key={index} className="item-row">
            <span>{item}</span>
            <button onClick={() => deleteItem(index)} style={{ background: "#e74c3c" }}>Delete</button>
          </div>
        ))
      )}
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
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
  margin-left: 0.5rem;
}
button:hover { opacity: 0.9; }
.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "useState<string[]> for array", passed: /useState\s*<\s*string\s*\[\s*\]\s*>/.test(app) || /useState\s*<\s*Array\s*<\s*string\s*>\s*>/.test(app) },
      { label: ".map() used to render items", passed: /\.map\s*\(/.test(app) },
      { label: "Delete button for each item", passed: /Delete/.test(app) },
      { label: "Add item with input + button", passed: /<input/.test(app) && /onClick\s*=\s*\{[\s\S]*addItem/.test(app) },
      { label: "Empty state message", passed: /(No items|length\s*===\s*0|length\s*<=\s*0)/.test(app) },
      { label: "Spread operator for adding", passed: /\.\.\.items/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

import type { ReactScenario } from "../types"

export const USESTATE_COUNTER_LAB: ReactScenario = {
  id: "1.7.1-usestate-counter",
  title: "1.7.1: Simple Counter — useState Basics",
  description: "Practice useState hook — create state, display it, update with buttons",
  instructions: `## Counter with useState

Build a counter component using the \`useState\` hook.

### Requirements:
1. Import \`useState\` from \`"react"\`
2. Create a state variable \`count\` with initial value \`0\`
3. Display the count in an \`<h2>\` — use \`{count}\`
4. Add three buttons:
   - **+1** — increments count by 1
   - **-1** — decrements count by 1 (don't go below 0)
   - **Reset** — resets count to 0
5. Export App as default — use \`export default function App\`

### Expected Output:
Teeno buttons kaam karte hain. Count display update hota hai. -1 button 0 se neeche nahi jaata.
  `,

  hints: [
    "`const [count, setCount] = useState(0)` — TypeScript automatically infers number",
    "`onClick={() => setCount(count + 1)}` for +1 button",
    "For -1: `setCount(count > 0 ? count - 1 : 0)` — prevent going below 0",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  // TODO: Create count state with initial value 0

  return (
    <div className="counter">
      <h2>Count: {/* TODO: Show count here */}</h2>
      {/* TODO: Add +1 button */}
      {/* TODO: Add -1 button */}
      {/* TODO: Add Reset button */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a2e;
  color: white;
}
.counter {
  text-align: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
button {
  margin: 0.5rem;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #0f3460;
  color: white;
  transition: 0.2s;
}
button:hover {
  background: #1a5276;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a2e;
  color: white;
}
.counter {
  text-align: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
button {
  margin: 0.5rem;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #0f3460;
  color: white;
  transition: 0.2s;
}
button:hover {
  background: #1a5276;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "useState imported from react", passed: /import\s+\{\s*useState\s*\}\s+from/.test(app) },
      { label: "count state declared with initial value 0", passed: /useState\s*\(\s*0\s*\)/.test(app) },
      { label: "Count displayed in JSX", passed: /\{count\}/.test(app) },
      { label: "+1 button with onClick", passed: /onClick\s*=\s*\{[\s\S]*count\s*\+\s*1[\s\S]*\}/.test(app) },
      { label: "-1 button with onClick (no negative)", passed: /onClick\s*=\s*\{[\s\S]*count\s*>\s*0[\s\S]*\}/.test(app) || /onClick\s*=\s*\{[\s\S]*count\s*-\s*1[\s\S]*\}[\s\S]*setCount\s*\(\s*0\s*\)/.test(app) },
      { label: "Reset button with onClick", passed: /onClick\s*=\s*\{[\s\S]*setCount\s*\(\s*0\s*\)[\s\S]*\}/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

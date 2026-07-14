import type { ReactScenario } from "../types"

export const USESTATE_LAB: ReactScenario = {
  id: "1.7-usestate",
  title: "1.7: useState aur Event Handling",
  description: "Practice useState hook with a counter component",
  instructions: `## Counter with useState

Build a counter component that uses the \`useState\` hook.

### Requirements:
1. Import \`useState\` from \`"react"\`
2. Create a state variable \`count\` with initial value \`0\`
3. Display the count in an \`<h2>\`
4. Add three buttons:
   - **+1** — increments count
   - **-1** — decrements count (don't go below 0)
   - **Reset** — resets to 0

### Stretch Goal (optional):
Add an input field to set the count to a specific value.
  `,

  hints: [
    "`const [count, setCount] = useState<number>(0)`",
    "`onClick={() => setCount(count + 1)}` for +1 button",
    "For -1: `setCount(count > 0 ? count - 1 : 0)` to stay above 0",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  // TODO: Create count state with initial value 0

  return (
    <div className="counter">
      <h2>Count: {/* TODO: Show count here */}</h2>
      {/* TODO: Add buttons */}
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
  const [count, setCount] = useState<number>(0);

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
      { label: "count state variable declared", passed: /useState\s*<.*>\s*\(\s*0\s*\)|useState\s*\(\s*0\s*\)/.test(app) },
      { label: "Count displayed in JSX", passed: /\{count\}/.test(app) },
      { label: "+1 button with onClick", passed: /onClick\s*=\s*\{[\s\S]*count\s*\+\s*1[\s\S]*\}/.test(app) },
      { label: "-1 button with onClick", passed: /onClick\s*=\s*\{[\s\S]*count\s*-\s*1[\s\S]*\}/.test(app) || /onClick\s*=\s*\{[\s\S]*count\s*>\s*0/.test(app) },
      { label: "Reset button with onClick", passed: /onClick\s*=\s*\{[\s\S]*setCount\s*\(\s*0\s*\)[\s\S]*\}/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

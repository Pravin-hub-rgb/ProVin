import type { ReactScenario } from "../types"

export const COMBINED_FORM_LAB: ReactScenario = {
  id: "1.8.4-combined-form",
  title: "1.8.4: Combined — Form with Generic Types",
  description: "Combine explicit useState<T> and ChangeEvent<T> in a form",
  instructions: "## Combined Practice: Form with Generic Types\n\
\n\
1.8.2 mein \`useState<string | null>(null)\` aur \`useState<string[]>([])\` practice kiya. 1.8.3 mein \`ChangeEvent<HTMLInputElement>\` practice kiya. Ab dono ko ek saath use karenge — ek simple form jisme sare generic types lagenge.\n\
\n\
### Kya Banayenge?\n\
Do input fields hain — ek name ke liye, ek age ke liye. Dono ka state alag-alag tarike se type kiya gaya hai:\n\
- \`useState(0)\` — **inference** (TypeScript automatically figure out karega)\n\
- \`useState<string>(\"\")` — **explicit generic** (hum TypeScript ko bata rahe hain)\n\
\n\
### Requirements:\n\
1. \`useState(0)\` se count state banao — TypeScript infer karega number\n\
2. \`useState<string>(\"\")` se name state banao — explicit generic diya\n\
3. Dono inputs ke liye event handler banao — \`React.ChangeEvent<HTMLInputElement>\` type ke saath\n\
4. Name handler mein \`setName(e.target.value)\` call karo\n\
5. Age handler mein \`parseInt\` + \`isNaN\` validation karo — agal numeric value ignore ho\n\
6. Display section mein dono values dikhao\n\
\n\
### Expected Output:\n\
Name input mein type karo — \"Name: [text]\" live update ho.\n\
Age input mein number type karo — \"Age: [number]\" dikhe. Non-numeric ignore ho.\n\
  ",

  hints: [
    "Inference: `const [count, setCount] = useState(0)` — TypeScript ko number type infer kar leta hai",
    "Explicit: `const [name, setName] = useState<string>(\"\")` — humne <string> bataya",
    "Event type: `(e: React.ChangeEvent<HTMLInputElement>) => ...`",
    "Age validation: `const num = parseInt(e.target.value, 10); if (!isNaN(num)) setCount(num);`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  // TODO: count state banao — initial value 0 do (TypeScript inference se type lega)

  // TODO: name state banao — explicit generic ke saath (initial value empty string)

  // TODO: handleNameChange — ChangeEvent type + setName

  // TODO: handleAgeChange — ChangeEvent type + parseInt + isNaN + setCount

  return (
    <div className="container">
      <h1>Explicit vs Inference</h1>
      <div>
        <label>Name (explicit):</label>
        {/* TODO: input — type="text", value + onChange */}
        <input type="text" placeholder="Enter name..." />
      </div>
      <div>
        <label>Age (inference):</label>
        {/* TODO: input — type="number", value + onChange */}
        <input type="number" placeholder="Enter age..." />
      </div>
      <div className="display">
        {/* TODO: Name aur Age yahan dikhao */}
      </div>
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
.container {
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  min-width: 350px;
}
label {
  display: block;
  font-size: 0.8rem;
  color: #8b949e;
  margin-bottom: 0.25rem;
}
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 0.75rem;
  background: #1a1a2e;
  color: white;
  box-sizing: border-box;
}
.display {
  margin-top: 1rem;
  padding: 1rem;
  background: #0f3460;
  border-radius: 8px;
}
.display p {
  margin: 0.3rem 0;
  font-size: 1.1rem;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num)) {
      setCount(num);
    }
  };

  return (
    <div className="container">
      <h1>Explicit vs Inference</h1>
      <div>
        <label>Name (explicit):</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name..."
        />
      </div>
      <div>
        <label>Age (inference):</label>
        <input
          type="number"
          value={count === 0 ? "" : count}
          onChange={handleAgeChange}
          placeholder="Enter age..."
        />
      </div>
      <div className="display">
        <p>Name: {name}</p>
        <p>Age: {count}</p>
      </div>
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
.container {
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  min-width: 350px;
}
label {
  display: block;
  font-size: 0.8rem;
  color: #8b949e;
  margin-bottom: 0.25rem;
}
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  width: 100%;
  margin-bottom: 0.75rem;
  background: #1a1a2e;
  color: white;
  box-sizing: border-box;
}
.display {
  margin-top: 1rem;
  padding: 1rem;
  background: #0f3460;
  border-radius: 8px;
}
.display p {
  margin: 0.3rem 0;
  font-size: 1.1rem;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "count state with inference (useState(0))", passed: /useState\s*\(\s*0\s*\)/.test(app) },
      { label: "name state with explicit generic (useState<string>)", passed: /useState\s*<\s*string\s*>/.test(app) },
      { label: "handleNameChange with ChangeEvent type", passed: /React\.ChangeEvent\s*<\s*HTMLInputElement\s*>/.test(app) },
      { label: "handleAgeChange with parseInt + isNaN", passed: /parseInt.*10.*isNaN/.test(app) || /isNaN.*parseInt/.test(app) },
      { label: "Name displayed in JSX", passed: /\{name\}/.test(app) },
      { label: "Count displayed in JSX", passed: /\{count\}/.test(app) },
      { label: "Input has value and onChange", passed: /value\s*=\s*\{[\s\S]*onChange\s*=\s*\{/.test(app) || /onChange\s*=\s*\{[\s\S]*value\s*=\s*\{/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

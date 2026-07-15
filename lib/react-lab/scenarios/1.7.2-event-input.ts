import type { ReactScenario } from "../types"

export const EVENT_INPUT_LAB: ReactScenario = {
  id: "1.7.2-event-input",
  title: "1.7.2: Event Typing aur Controlled Input",
  description: "Practice onChange event, TypeScript event types, and controlled input pattern",
  instructions: `## Counter with Input

1.7.1 ke Counter mein ek input field add karo jo user ko specific count set karne de.

### Requirements:
1. **inputValue state** — \`useState("")\` (initial empty string)
2. **input field** — \`type="number"\`, \`value={inputValue}\`, \`onChange\` ke saath
3. **onChange handler** — \`event: React.ChangeEvent<HTMLInputElement>\` type ke saath
4. **handler** — \`setInputValue(event.target.value)\` kare
5. **Set button** — input value ko parse kare (\`parseInt\`), validate kare (\`isNaN\`), \`setCount\` kare, input clear kare

### Expected Output:
Input mein "25" type karo, Set dabao → count 25 dikhe. "+1" dabao → 26. "abc" type karo → kuch nahi hota (invalid number).
  `,

  hints: [
    "Naya state: \`const [inputValue, setInputValue] = useState(\"\")\`",
    "Handler type: \`const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)\`",
    "Set button: \`parseInt(inputValue, 10)\` + \`!isNaN(num)\` check + \`setInputValue(\"\")\` clear",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  // TODO: inputValue state banayein

  // TODO: handleChange function — event type + setInputValue

  // TODO: setFromInput function — parseInt, validate, setCount, clear

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <div className="input-group">
        {/* TODO: input field — value + onChange */}
        {/* TODO: Set button */}
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
.counter {
  text-align: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.input-group {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  width: 150px;
  background: #1a1a2e;
  color: white;
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
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const setFromInput = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      setCount(num);
      setInputValue("");
    }
  };

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <div className="input-group">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Set count..."
        />
        <button onClick={setFromInput}>Set</button>
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
.counter {
  text-align: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.input-group {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  width: 150px;
  background: #1a1a2e;
  color: white;
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
      { label: "inputValue state declared", passed: /inputValue/.test(app) && /useState\s*\(\s*""\s*\)/.test(app) },
      { label: "handleChange with ChangeEvent type", passed: /React\.ChangeEvent<HTMLInputElement>/.test(app) },
      { label: "handleChange calls setInputValue", passed: /setInputValue\s*\(/.test(app) },
      { label: "Input has value and onChange", passed: /value=\{inputValue\}[\s\S]*onChange=\{handleChange\}/.test(app) || /onChange=\{handleChange\}[\s\S]*value=\{inputValue\}/.test(app) },
      { label: "setFromInput uses parseInt", passed: /parseInt/.test(app) },
      { label: "setFromInput validates with isNaN", passed: /!?\s*isNaN/.test(app) },
      { label: "setFromInput calls setCount + clears input", passed: /setCount\s*\([\s\S]*setInputValue\s*\(\s*""\s*\)/.test(app) || /setInputValue\s*\(\s*""\s*\)[\s\S]*setCount/.test(app) },
    ]
  },
}

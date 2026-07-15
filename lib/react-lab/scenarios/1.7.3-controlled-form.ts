import type { ReactScenario } from "../types"

export const CONTROLLED_FORM_LAB: ReactScenario = {
  id: "1.7.3-controlled-form",
  title: "1.7.3: Controlled Form with Callback",
  description: "Practice controlled inputs, callback props, and separate component files",
  instructions: `## GreetingForm — Separate Component File + Callback

Ek \`GreetingForm\` component alag file mein banana hai jo user ka naam leta hai aur submit par parent ko callback ke through bhejta hai.

### Files:
- \`/components/GreetingForm.tsx\` — component + props interface
- \`/App.tsx\` — GreetingForm import karo aur use karo

### Requirements (components/GreetingForm.tsx):
1. GreetingFormProps interface banao — ek callback prop jo string parameter le aur void return kare
2. GreetingForm component banao jo props accept kare
3. Ek state variable banao jo input value store kare
4. **Controlled input** — value state se lo, onChange par update karo, proper event type do
5. **Submit handler** — trim karo, empty check karo, callback call karo, input clear karo
6. Component ko default export karo

### Requirements (App.tsx):
1. GreetingForm ko components/ folder se import karo
2. GreetingForm render karo with onSubmit prop — alert dikhao
3. App component ko default export karo

### Expected Output:
Input mein "Vin" type karo, Submit dabao → "Hello, Vincent!" alert dikhe. Input clear ho jaye. Empty submit → kuch nahi hota.
  `,

  hints: [
    "Interface: \`interface GreetingFormProps { onSubmit: (name: string) => void }\`",
    "Handler: \`const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)\`",
    "Submit: \`name.trim() !== \"\"\` + \`onSubmit(name)\` + \`setName(\"\")\`",
    "Export: \`export default GreetingForm\` — alag file hai, export zaroori hai!",
    "App mein import: \`import GreetingForm from \"./components/GreetingForm\"\`",
  ],

  starterFiles: {
    "/components/GreetingForm.tsx": `import { useState } from "react";

// TODO: GreetingFormProps interface banao
// TODO: onSubmit prop banao — ek string leta hai, kuch return nahi karta

// TODO: GreetingForm component banao — state, controlled input, submit handler, default export

function GreetingForm(props: GreetingFormProps) {
  return (
    <div>
      {/* TODO: input field — value + onChange */}
      {/* TODO: Submit button */}
    </div>
  );
}

// TODO: default export`,
    "/App.tsx": `// TODO: GreetingForm import karo "./components/GreetingForm" se

export default function App() {
  const handleGreeting = (name: string) => {
    alert(\`Hello, \${name}!\`);
  };

  return (
    <div className="container">
      <h1>Greeting App</h1>
      {/* TODO: GreetingForm with onSubmit prop */}
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
  text-align: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  width: 200px;
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
  background: #e94560;
  color: white;
  transition: 0.2s;
}
button:hover {
  background: #c73e54;
}`,
  },
  solutionFiles: {
    "/components/GreetingForm.tsx": `import { useState } from "react";

interface GreetingFormProps {
  onSubmit: (name: string) => void;
}

function GreetingForm({ onSubmit }: GreetingFormProps) {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim() !== "") {
      onSubmit(name);
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default GreetingForm;`,
    "/App.tsx": `import GreetingForm from "./components/GreetingForm";

export default function App() {
  const handleGreeting = (name: string) => {
    alert(\`Hello, \${name}!\`);
  };

  return (
    <div className="container">
      <h1>Greeting App</h1>
      <GreetingForm onSubmit={handleGreeting} />
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
  text-align: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  width: 200px;
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
  background: #e94560;
  color: white;
  transition: 0.2s;
}
button:hover {
  background: #c73e54;
}`,
  },

  check: (files) => {
    const greeting = files["/components/GreetingForm.tsx"] ?? ""
    const app = files["/App.tsx"] ?? ""
    return [
      // GreetingForm.tsx checks
      { label: "GreetingFormProps interface with onSubmit callback", passed: /interface\s+GreetingFormProps[\s\S]*onSubmit\s*:\s*\(name:\s*string\)\s*=>\s*void/.test(greeting) },
      { label: "GreetingForm function component defined", passed: /function\s+GreetingForm/.test(greeting) },
      { label: "State declared with useState", passed: /useState\s*\(\s*""\s*\)/.test(greeting) },
      { label: "Controlled input with value + onChange", passed: /value=\{[\w]+\}[\s\S]*onChange\s*=\s*\{/.test(greeting) || /onChange\s*=\s*\{[\s\S]*value=\{[\w]+\}/.test(greeting) },
      { label: "Submit handler with trim + empty check", passed: /\.trim\(\s*\)\s*!==\s*""/.test(greeting) },
      { label: "Submit calls onSubmit + clears input", passed: /onSubmit\s*\([\w]+\)[\s\S]*\w+\s*\(\s*""\s*\)/.test(greeting) || /\w+\s*\(\s*""\s*\)[\s\S]*onSubmit\s*\([\w]+\)/.test(greeting) },
      { label: "GreetingForm default exported", passed: /export\s+default\s+GreetingForm/.test(greeting) },

      // App.tsx checks
      { label: "GreetingForm imported from ./components/GreetingForm", passed: /import\s+GreetingForm\s+from\s+["']\.\/components\/GreetingForm["']/.test(app) },
      { label: "GreetingForm used with onSubmit prop", passed: /<GreetingForm\s+onSubmit\s*=\s*\{/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

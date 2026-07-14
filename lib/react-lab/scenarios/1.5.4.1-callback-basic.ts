import type { ReactScenario } from "../types"

export const CALLBACK_BASIC_LAB: ReactScenario = {
  id: "1.5.4.1-callback-basic",
  title: "1.5.4.1: Callback Basics",
  description: "Practice the simplest callback prop — function as prop, no interface yet",
  instructions: `## ClickButton — Sabse Simple Callback

Ek \`ClickButton\` component banana hai. Sirf ek prop leta hai: \`onClick\` jo ek function hai. Button ka text hardcoded hai "Click Me".

### Requirements:
1. \`function ClickButton({ onClick }: { onClick: () => void })\` — inline type, no interface
2. Button render karo with \`onClick={onClick}\`
3. App mein **2 ClickButtons** render karo — alag-alag callbacks ke saath

### Expected:
\`\`\`tsx
<ClickButton onClick={() => alert("First!")} />
<ClickButton onClick={() => alert("Second!")} />
\`\`\`
  `,

  hints: [
    "Inline type: `function ClickButton({ onClick }: { onClick: () => void })`",
    "Button: `<button onClick={onClick}>Click Me</button>`",
    "Usage: `<ClickButton onClick={() => alert('Hi!')} />`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: ClickButton component — inline type, no interface
function ClickButton(/* destructure onClick here */) {
  return (
    <div>
      {/* TODO: Render button with onClick */}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Simple Callback</h1>
      {/* TODO: ClickButton x2 with different callbacks */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #eef2f7;
}
button {
  margin: 0.5rem;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #2d7d46;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background: #236535;
}`,
  },

  solutionFiles: {
    "/App.tsx": `function ClickButton({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Simple Callback</h1>
      <ClickButton onClick={() => alert("First button clicked!")} />
      <ClickButton onClick={() => alert("Second button clicked!")} />
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #eef2f7;
}
button {
  margin: 0.5rem;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #2d7d46;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background: #236535;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "ClickButton function exists", passed: /function\s+ClickButton/.test(app) },
      { label: "onClick typed as () => void (inline)", passed: /onClick\s*:\s*\(\)\s*=>\s*void/.test(app) },
      { label: "Button rendered with onClick", passed: /<button\s+onClick\s*=\s*{?\s*onClick\s*}?/.test(app) },
      { label: "At least 2 ClickButton usages", passed: (app.match(/<ClickButton/g) ?? []).length >= 2 },
    ]
  },
}

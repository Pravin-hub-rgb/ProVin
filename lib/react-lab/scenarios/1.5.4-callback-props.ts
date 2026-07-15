import type { ReactScenario } from "../types"

export const CALLBACK_PROPS_LAB: ReactScenario = {
  id: "1.5.4-callback-props",
  title: "1.5.4: Callback Props",
  description: "Practice passing functions as props — callback props pattern",
  instructions: `## Alert Buttons with Callback

\`AlertButton\` component banana hai jo callback prop \`onAlert\` leta hai. Jab user button click kare, component parent ko notify karta hai.

### Requirements:
1. AlertButtonProps interface banao — label string, onAlert ek function jo kuch return na kare
2. AlertButton mein button render karo, click par onAlert call karo
3. App mein **3 AlertButtons** render karo — har ek alag label ke saath
4. Har button click par alert ya console.log dikhe

### Expected Output:
Teen buttons dikhenge — "Save", "Delete", "Edit". Har button ka alag alert.

### Stretch:
Callback ke saath parameter pass karo — onAlert ek string parameter le
  `,

  hints: [
    "Interface: `interface AlertButtonProps { label: string; onAlert: () => void }`",
    "Render: `<button onClick={onAlert}>{label}</button>`",
    "Usage: `<AlertButton label=\"Save\" onAlert={() => alert(\"Saved!\")} />`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: Define AlertButtonProps interface

function AlertButton(props: AlertButtonProps) {
  return (
    <div>
      {/* TODO: Render button with label and onClick */}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Callback Props Demo</h1>
      {/* TODO: AlertButton x3 with different labels and callbacks */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}
button {
  margin: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #4a90d9;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background: #357abd;
}`,
  },

  solutionFiles: {
    "/App.tsx": `interface AlertButtonProps {
  label: string;
  onAlert: () => void;
}

function AlertButton({ label, onAlert }: AlertButtonProps) {
  return (
    <div>
      <button onClick={onAlert}>{label}</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Callback Props Demo</h1>
      <AlertButton label="Save" onAlert={() => alert("Save clicked!")} />
      <AlertButton label="Delete" onAlert={() => alert("Delete clicked!")} />
      <AlertButton label="Edit" onAlert={() => alert("Edit clicked!")} />
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}
button {
  margin: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #4a90d9;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background: #357abd;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "AlertButtonProps interface defined", passed: /interface\s+AlertButtonProps/.test(app) },
      { label: "label: string in interface", passed: /label\s*:\s*string/.test(app) },
      { label: "onAlert callback in interface", passed: /onAlert\s*:\s*\(\)\s*=>\s*void/.test(app) },
      { label: "Destructuring used in AlertButton", passed: /\{[\s\S]*label[\s\S]*onAlert[\s\S]*\}:/.test(app) },
      { label: "onClick calls onAlert", passed: /onClick\s*=\s*\{?\s*onAlert\s*\}?/.test(app) },
      { label: "At least 3 AlertButton usages", passed: (app.match(/<AlertButton/g) ?? []).length >= 3 },
    ]
  },
}

import type { ReactScenario } from "../types"

export const ACCORDION_LAB: ReactScenario = {
  id: "2.5.1-accordion",
  title: "2.5.1: Accordion — Lift State Up",
  description: "Fix the accordion so only one panel opens at a time",
  instructions: `## Problem: Dono panels ek saath open ho rahe hain

Ek accordion hai — do panels. Sirf ek panel khulna chahiye. Lekin abhi dono ek saath open ho sakte hain.

### Step 1 — Problem discover karo
1. Panel 1 click karo → khul gaya ✅
2. Panel 2 click karo → woh bhi khul gaya ❌

Dono khul gaye. Kyunki **har Panel ka apna \`isActive\` state hai** — ek doosre ko pata nahi.

### Step 2 — State ko App mein lift karo
\`Panel\` se \`useState\` hatao. App mein ek state banao — \`activeIndex: number | null\` (null = koi nahi khula).

### Step 3 — Props do Panel ko
\`Panel\` ko do props do:
- \`isActive: boolean\` — kya yeh panel currently khula hai?
- \`onToggle: () => void\` — click karne par kya karna hai?

\`App\` mein: "agar activeIndex === index hai toh isActive = true, warna false."

### Step 4 — Verify
Ab Panel 1 click karo → khul gaya. Panel 2 click karo → Panel 1 band, Panel 2 khula. ✅ Sirf ek panel open rehta hai.

> **Hint:** null ka matlab "koi panel nahi khula" — dono band.`,

  hints: [
    "App mein `const [activeIndex, setActiveIndex] = useState<number | null>(null)` banao",
    "Panel ko prop do: `<Panel isActive={activeIndex === 0} onToggle={() => setActiveIndex(activeIndex === 0 ? null : 0)}>`",
    "Panel mein props receive karo: `function Panel({ isActive, onToggle, title, children })`",
    "Button ka `onClick` ab `{onToggle}` hoga, `{setIsActive(!isActive)}` nahi",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  // TODO: Remove useState from here — lift to App
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="panel">
      <button className="panel-btn" onClick={() => setIsActive(!isActive)}>
        {title}
        <span>{isActive ? "▲" : "▼"}</span>
      </button>
      {isActive && <div className="panel-body">{children}</div>}
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <h1>Accordion</h1>
      <Panel title="What is React?">
        React is a JavaScript library for building user interfaces.
      </Panel>
      <Panel title="What is Lifting State Up?">
        Moving state to a common parent so siblings can share data.
      </Panel>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
}
.app { max-width: 480px; margin: 0 auto; }
.panel {
  border: 1px solid #30363d;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}
.panel-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #161b22;
  border: none;
  color: #c9d1d9;
  font-size: 0.9rem;
  cursor: pointer;
}
.panel-btn:hover { background: #1c2333; }
.panel-body {
  padding: 0.75rem 1rem;
  border-top: 1px solid #30363d;
  font-size: 0.85rem;
  color: #8b949e;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

function Panel({ title, children, isActive, onToggle }: { title: string; children: React.ReactNode; isActive: boolean; onToggle: () => void }) {
  return (
    <div className="panel">
      <button className="panel-btn" onClick={onToggle}>
        {title}
        <span>{isActive ? "▲" : "▼"}</span>
      </button>
      {isActive && <div className="panel-body">{children}</div>}
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="app">
      <h1>Accordion</h1>
      <Panel
        title="What is React?"
        isActive={activeIndex === 0}
        onToggle={() => setActiveIndex(activeIndex === 0 ? null : 0)}
      >
        React is a JavaScript library for building user interfaces.
      </Panel>
      <Panel
        title="What is Lifting State Up?"
        isActive={activeIndex === 1}
        onToggle={() => setActiveIndex(activeIndex === 1 ? null : 1)}
      >
        Moving state to a common parent so siblings can share data.
      </Panel>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
}
.app { max-width: 480px; margin: 0 auto; }
.panel {
  border: 1px solid #30363d;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}
.panel-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #161b22;
  border: none;
  color: #c9d1d9;
  font-size: 0.9rem;
  cursor: pointer;
}
.panel-btn:hover { background: #1c2333; }
.panel-body {
  padding: 0.75rem 1rem;
  border-top: 1px solid #30363d;
  font-size: 0.85rem;
  color: #8b949e;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Panel mein useState nahi hai (state lifted)", passed: !/const\s+\[\s*\w+\s*,\s*\w+\s*\]\s*=\s*useState/.test(app.split("function Panel")[1]?.split("function")[0] ?? "") },
      { label: "App mein activeIndex state hai", passed: /activeIndex/.test(app) && /useState/.test(app.split("export default function App")[1] ?? "") },
      { label: "Panel ko isActive prop mil raha hai", passed: /isActive\s*=\s*\{activeIndex\s*===\s*\d+/.test(app) },
      { label: "Panel ko onToggle prop mil raha hai", passed: /onToggle\s*=\s*\{/.test(app) },
      { label: "Panel isActive prop use kar raha hai", passed: /\{isActive\s*\?\s*["']▲["']/.test(app) || /\{isActive\s*\?\s*<span/.test(app) },
      { label: "null support — dono band ho sakte hain", passed: /null/.test(app) },
    ]
  },
}

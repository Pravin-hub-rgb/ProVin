import type { ReactScenario } from "../types"

export const TYPED_EVENTS_LAB: ReactScenario = {
  id: "1.8.3-typed-events",
  title: "1.8.3: Mini-Project 2 — Typed Event Handlers",
  description: "Practice ChangeEvent<T> with input, textarea, and select elements — based on 1.8 doc Mini-Project 2",
  instructions: `## Practice: ChangeEvent Type for Different DOM Elements

\`handleChange\` mein \`(e) => ...\` likhte ho — lekin \`e\` ka type kya hai? \`React.ChangeEvent<HTMLInputElement>\` — generic type hai. \`<T>\` ki jagah DOM element ka type aata hai.

Is lab mein teen DOM elements ke event handlers banayenge — teeno ka \`ChangeEvent<T>\` type alag hai.

### Requirements:
1. **Input field** — \`React.ChangeEvent<HTMLInputElement>\` ke saath \`setText\`
2. **Textarea** — \`React.ChangeEvent<HTMLTextAreaElement>\` ke saath \`setBio\`
3. **Select dropdown** — \`React.ChangeEvent<HTMLSelectElement>\` ke saath \`setRole\`
4. Har element ke neeche current value display karo
5. Har handler ka type alag hai — lekin sab same \`ChangeEvent<T>\` pattern use karte hain

### Hints:
- Input: \`(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)\`
- Textarea: \`(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)\`
- Select: \`(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)\`
- \`<T>\` ki value DOM element ke hisaab se badalti hai — \`HTMLInputElement\`, \`HTMLTextAreaElement\`, \`HTMLSelectElement\`
  `,

  hints: [
    "Input → ChangeEvent<HTMLInputElement>",
    "Textarea → ChangeEvent<HTMLTextAreaElement>",
    "Select → ChangeEvent<HTMLSelectElement>",
    "Teno ka `.value` same hai — lekin TypeScript exact type enforce karta hai",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("user");

  // TODO 1: handleInput banao — ChangeEvent type ke saath (input field ke liye)
  // TODO 2: handleTextarea banao — ChangeEvent type ke saath (textarea ke liye)
  // TODO 3: handleSelect banao — ChangeEvent type ke saath (select dropdown ke liye)

  return (
    <div>
      <h2>ChangeEvent Type Practice</h2>

      <div>
        <h3>Input (ChangeEvent&lt;HTMLInputElement&gt;)</h3>
        {/* TODO: Input field with value + onChange */}
      </div>

      <div>
        <h3>Textarea (ChangeEvent&lt;HTMLTextAreaElement&gt;)</h3>
        {/* TODO: Textarea with value + onChange + rows */}
      </div>

      <div>
        <h3>Select (ChangeEvent&lt;HTMLSelectElement&gt;)</h3>
        {/* TODO: Select dropdown with value + onChange */}
      </div>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #1a1a2e;
  color: white;
}
input, textarea, select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  background: #16213e;
  color: white;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.25rem;
}
textarea {
  resize: vertical;
}
select {
  cursor: pointer;
}
h3 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #8b949e;
}
div {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #16213e;
  border-radius: 8px;
}
p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #d1d5db;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("user");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <h2>ChangeEvent Type Practice</h2>

      <div>
        <h3>Input (ChangeEvent&lt;HTMLInputElement&gt;)</h3>
        <input
          value={text}
          onChange={handleInput}
          placeholder="Type here..."
        />
        <p>Text: {text}</p>
      </div>

      <div>
        <h3>Textarea (ChangeEvent&lt;HTMLTextAreaElement&gt;)</h3>
        <textarea
          value={bio}
          onChange={handleTextarea}
          placeholder="Your bio..."
          rows={3}
        />
        <p>Bio: {bio}</p>
      </div>

      <div>
        <h3>Select (ChangeEvent&lt;HTMLSelectElement&gt;)</h3>
        <select value={role} onChange={handleSelect}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
        <p>Role: {role}</p>
      </div>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #1a1a2e;
  color: white;
}
input, textarea, select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  background: #16213e;
  color: white;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.25rem;
}
textarea {
  resize: vertical;
}
select {
  cursor: pointer;
}
h3 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #8b949e;
}
div {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #16213e;
  border-radius: 8px;
}
p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #d1d5db;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "handleInput with ChangeEvent<HTMLInputElement>", passed: /ChangeEvent\s*<\s*HTMLInputElement\s*>/.test(app) },
      { label: "handleTextarea with ChangeEvent<HTMLTextAreaElement>", passed: /ChangeEvent\s*<\s*HTMLTextAreaElement\s*>/.test(app) },
      { label: "handleSelect with ChangeEvent<HTMLSelectElement>", passed: /ChangeEvent\s*<\s*HTMLSelectElement\s*>/.test(app) },
      { label: "Input field with value + onChange", passed: /<input[\s\S]*value=\{text\}[\s\S]*onChange=\{handleInput\}/.test(app) },
      { label: "Textarea with value + onChange", passed: /<textarea[\s\S]*value=\{bio\}[\s\S]*onChange=\{handleTextarea\}/.test(app) },
      { label: "Select with value + onChange", passed: /<select[\s\S]*value=\{role\}[\s\S]*onChange=\{handleSelect\}/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

import type { ReactScenario } from "../types"

export const TYPED_EVENTS_LAB: ReactScenario = {
  id: "1.8.3-typed-events",
  title: "1.8.3: Mini-Project 2 — Recognizing the Generic Pattern",
  description: "Practice inline → extracted pattern: inline onChange infers, extracted needs explicit ChangeEvent<T> — based on 1.8 doc Mini-Project 2",
  instructions: `## Practice: Inline vs Extracted — ChangeEvent Type

Is lab mein inline \`onChange\` already likha hua hai — TypeScript auto-infer kar raha hai \`e\` ka type. Aapka kaam: har inline handler ko alag function mein extract karo + explicit \`ChangeEvent<T>\` type do.

### Flow:
1. **Inline approach (already given)** — \`onChange={(e) => setText(e.target.value)}\` — TypeScript infer kar raha hai \`e: ChangeEvent<HTMLInputElement>\`
2. **Extract karo** — Har inline handler ko ek named function mein nikaalo (e.g., \`handleInput\`)
3. **Explicit type do** — Extracted function ko \`ChangeEvent<T>\` type dena padega kyunki ab context lost hai

### Requirements:
1. \`handleInput\` banao — \`ChangeEvent<HTMLInputElement>\` type ke saath
2. \`handleTextarea\` banao — \`ChangeEvent<HTMLTextAreaElement>\` type ke saath
3. \`handleSelect\` banao — \`ChangeEvent<HTMLSelectElement>\` type ke saath
4. JSX mein \`onChange\` ko inline se extracted handler mein replace karo
5. Sab same \`ChangeEvent<T>\` pattern hain — bas \`T\` badalta hai

### Hints:
- Input: \`(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)\`
- Textarea: \`(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)\`
- Select: \`(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)\`
- Inline mein TypeScript auto-infer karta hai, extracted mein explicit dena padta hai — kyunki function declaration pe usage ka pata nahi hota
  `,

  hints: [
    "Input → ChangeEvent<HTMLInputElement>",
    "Textarea → ChangeEvent<HTMLTextAreaElement>",
    "Select → ChangeEvent<HTMLSelectElement>",
    "Inline onChange mein auto-infer hota hai — extracted mein explicit type do",
    "Extract karte waqt function parameter mein type daalo, JSX mein sirf function reference",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("user");

  // TODO: Inline onChange kaam kar raha hai (TypeScript auto-infer kar raha hai).
  //       Ab teeno inline handlers ko alag functions mein extract karo +
  //       explicit ChangeEvent<T> type do:
  //       - handleInput — ChangeEvent<HTMLInputElement>
  //       - handleTextarea — ChangeEvent<HTMLTextAreaElement>
  //       - handleSelect — ChangeEvent<HTMLSelectElement>

  return (
    <div>
      <h2>ChangeEvent Type Practice</h2>

      <div>
        <h3>Input (ChangeEvent&lt;HTMLInputElement&gt;)</h3>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
        />
        <p>Text: {text}</p>
      </div>

      <div>
        <h3>Textarea (ChangeEvent&lt;HTMLTextAreaElement&gt;)</h3>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Your bio..."
          rows={3}
        />
        <p>Bio: {bio}</p>
      </div>

      <div>
        <h3>Select (ChangeEvent&lt;HTMLSelectElement&gt;)</h3>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
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

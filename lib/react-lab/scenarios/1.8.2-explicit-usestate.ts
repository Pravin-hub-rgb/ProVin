import type { ReactScenario } from "../types"

export const EXPLICIT_USESTATE_LAB: ReactScenario = {
  id: "1.8.2-explicit-usestate",
  title: "1.8.2: Mini-Project 1 — Explicit Generics with useState",
  description: "Practice useState<T> — inference vs explicit (null, empty array) — based on 1.8 doc Mini-Project 1",
  instructions: `## Practice: Inference vs Explicit useState

1.7 mein \`useState(0)\` likha toh TypeScript infer kar gaya \`number\`. Lekin yeh sirf tab kaam karta hai jab initial value se type clear ho. Kya hoga jab \`useState(null)\` ya \`useState([])\` likhein? TypeScript confuse ho jata hai.

Is lab mein teen state variables banayenge — ek inference se, do explicit generic ke saath.

### Kya Banayenge?

| Section | State Type | Initial Value | UI |
|---------|-----------|---------------|-----|
| Name | \`string\` | \`""\` | Input + display text |
| Nickname | \`string \\| null\` | \`null\` | Input + "(not set)" jab empty |
| Tags | \`string[]\` | \`[]\` | Input + Add button + comma-separated list |

**Tags section ka flow:** User input mein type kare (e.g., "react") → Add button dabaye → tag list mein add ho → neeche "react, typescript" aise comma-separated dikhe. Empty state mein "(empty)" show ho.

### Requirements:
1. \`useState("")\` — **inference** (initial value "" se TypeScript \`string\` infer kar leta hai)
2. \`useState<string | null>(null)\` — **explicit** (null se inference sirf "null type" karega, isliye explicit do)
3. \`useState<string[]>([])\` — **explicit** ([] se inference "never[]" karega, isliye explicit do)
4. Har state ke liye input field + display
5. Nickname field: empty ho toh "(not set)" dikhao
6. Tags: input + Add button, button click par tag add ho, comma-separated display

### Hints:
- \`useState("")\` → TypeScript automatically infer karega \`string\`
- \`useState<string | null>(null)\` → explicit, kyunki null type clear nahi
- \`useState<string[]>([])\` → explicit, kyunki empty array type clear nahi
- Tags add: \`setTags([...tags, newTag])\` — spread operator
- Tags ke liye ek extra \`inputTag\` state rakhna (jo input field bind ho), Add button usse read karke \`tags\` array mein daal de
  `,

  hints: [
    "Inference: `useState(\"\")` → TypeScript automatically string infer karega",
    "Null initial: `useState<string | null>(null)` — baad mein string bhi assign kar sakte ho",
    "Empty array: `useState<string[]>([])` — string array hai, never[] nahi",
    "Tags add: `setTags([...tags, newTag])` — spread operator se naya array",
    "Tags section ke liye extra state `inputTag` rakhna jo input field se bind ho, Add button usse read kare",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  // TODO 1: Name state banao — initial value "" do, TypeScript inference se type lega

  // TODO 2: Nickname state banao — initial value null hai, explicit generic do (string ya null dono allowed)

  // TODO 3: Tags state banao — initial value empty array hai, explicit generic do (strings ka array)

  // TODO 4: inputTag state banao — initial value "" do, yeh input field ke value ko track karega

  // TODO 5: handleNameChange banao — event type ChangeEvent ke saath, setName call karo

  // TODO 6: handleNicknameChange banao — event type ChangeEvent ke saath.
  //          Agar value empty hai toh null set karo, nahi toh string

  // TODO 7: handleAddTag banao — inputTag.trim() check karo, agar empty nahi hai toh
  //          spread operator se tags array mein add karo, phir inputTag ko "" set karo

  return (
    <div>
      <h2>useState Type Practice</h2>

      <div>
        <h3>Inference (state = "")</h3>
        {/* TODO: Name input + display — user type kare, value neeche dikhe */}
      </div>

      <div>
        <h3>Explicit (state = string | null)</h3>
        {/* TODO: Nickname input + display — empty ho toh "(not set)" dikhao */}
      </div>

      <div>
        <h3>Explicit (state = string[])</h3>
        {/* TODO: Tags input (inputTag se bind) + Add button (handleAddTag call kare) + display (comma-separated, empty ho toh "(empty)") */}
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
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  background: #16213e;
  color: white;
  margin-right: 0.5rem;
}
button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
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
small {
  color: #6b7280;
  font-size: 0.8rem;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value || null);
  };

  const handleAddTag = () => {
    if (inputTag.trim() === "") return;
    setTags([...tags, inputTag.trim()]);
    setInputTag("");
  };

  return (
    <div>
      <h2>useState Type Practice</h2>

      <div>
        <h3>Inference (state = "")</h3>
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name..."
        />
        <p>Name: "{name}"</p>
        <small>Inferred type: string</small>
      </div>

      <div>
        <h3>Explicit (state = string | null)</h3>
        <input
          value={nickname ?? ""}
          onChange={handleNicknameChange}
          placeholder="Enter nickname..."
        />
        <p>Nickname: {nickname ?? "(not set)"}</p>
        <small>Explicit type: string | null</small>
      </div>

      <div>
        <h3>Explicit (state = string[])</h3>
        <input
          value={inputTag}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTag(e.target.value)}
          placeholder="Enter tag..."
        />
        <button onClick={handleAddTag}>Add Tag</button>
        <p>Tags: {tags.join(", ") || "(empty)"}</p>
        <small>Explicit type: string[]</small>
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
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #0f3460;
  border-radius: 6px;
  background: #16213e;
  color: white;
  margin-right: 0.5rem;
}
button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
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
small {
  color: #6b7280;
  font-size: 0.8rem;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "useState with inference (useState(\"\"))", passed: /useState\s*\(\s*""\s*\)/.test(app) },
      { label: "useState with explicit <string | null>", passed: /useState\s*<\s*string\s*\|\s*null\s*>/.test(app) },
      { label: "useState with explicit <string[]>", passed: /useState\s*<\s*string\s*\[\s*\]\s*>/.test(app) },
      { label: "ChangeEvent<HTMLInputElement> in handlers", passed: /React\.ChangeEvent\s*<\s*HTMLInputElement\s*>/.test(app) },
      { label: "Nickname shows (not set) when null", passed: /nickname\s*\?\?\s*/.test(app) || /not set/.test(app) },
      { label: "Spread operator for tags add", passed: /\.\.\.tags/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

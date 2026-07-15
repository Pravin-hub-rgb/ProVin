import type { ReactScenario } from "../types"

export const IMPORT_EXPORT_VALUES_LAB: ReactScenario = {
  id: "1.3.1-import-export-values",
  title: "1.3.1: Import / Export — Values aur Functions",
  description: "Practice named and default exports with simple values and functions",
  instructions: `## Export aur Import — Khud Likho

Teen files hain: \`data.ts\`, \`config.ts\`, \`utils.ts\`. Har file mein tumhe variables/functions likhne hain **aur export** karne hain. Phir \`App.tsx\` mein sab import karke \`console.log()\` se print karna hai.

### data.ts — Named Export (Variables)
name = "Vin", age = 25, isStudent = true — teen variables banao aur sabko named export karo

### config.ts — Default Export (String)
appTitle = "ProVin" variable banao aur iska default export karo

### utils.ts — Named Export (Functions)
greet(person: string) aur add(a: number, b: number) functions banao aur named export karo

### App.tsx — Import karo aur console.log karo
\`\`\`ts
// TODO: data.ts se name, age, isStudent import karo
// TODO: config.ts se default import karo
// TODO: utils.ts se greet aur add import karo
// console.log sabko
\`\`\`

### Expected Console Output:
Vin  
25  
true  
ProVin  
Hello, Vin!  
8  
  `,

  hints: [
    "Named export: `export const name = \"Vin\"`",
    "Default export: write `const x = ...` then `export default x`",
    "Named import: `import { name } from \"./data\"` — curly braces lagao",
    "Default import: `import anything from \"./config\"` — bina curly braces",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: data.ts se name, age, isStudent import karo — named import
// TODO: config.ts se default import karo
// TODO: utils.ts se greet aur add import karo — named import

export default function App() {
  // TODO: saare imported values ko console.log karo

  return <div>Check the browser console!</div>;
}`,
    "/data.ts": `// TODO: Teen variables named export karo
// ek string naam, ek number age, ek boolean student status`,
    "/config.ts": `// TODO: appTitle variable banao aur iska default export karo`,
    "/utils.ts": `// TODO: Do functions named export karo
// greet — ek string parameter le aur "Hello, ...!" return kare
// add — do numbers le aur unka sum return kare`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import { name, age, isStudent } from "./data";
import appName from "./config";
import { greet, add } from "./utils";

export default function App() {
  console.log(name);
  console.log(age);
  console.log(isStudent);
  console.log(appName);
  console.log(greet("Vin"));
  console.log(add(5, 3));

  return <div>Check the browser console!</div>;
}`,
    "/data.ts": `export const name = "Vin";
export const age = 25;
export const isStudent = true;`,
    "/config.ts": `const appTitle = "ProVin";
export default appTitle;`,
    "/utils.ts": `export function greet(person: string) {
  return \`Hello, \${person}!\`;
}

export function add(a: number, b: number) {
  return a + b;
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    const data = files["/data.ts"] ?? ""
    const config = files["/config.ts"] ?? ""
    const utils = files["/utils.ts"] ?? ""
    return [
      { label: "data.ts: name exported", passed: /export\s+(const|let|var)\s+name/.test(data) },
      { label: "data.ts: age exported", passed: /export\s+(const|let|var)\s+age/.test(data) },
      { label: "data.ts: isStudent exported", passed: /export\s+(const|let|var)\s+isStudent/.test(data) },
      { label: "config.ts: default export", passed: /export\s+default/.test(config) },
      { label: "utils.ts: greet function exported", passed: /export\s+function\s+greet/.test(utils) },
      { label: "utils.ts: add function exported", passed: /export\s+function\s+add/.test(utils) },
      { label: "App: named import from ./data", passed: /import\s+\{[^}]*name[^}]*\}\s+from\s+["'].\/data["']/.test(app) && /import\s+\{[^}]*age[^}]*\}\s+from\s+["'].\/data["']/.test(app) && /import\s+\{[^}]*isStudent[^}]*\}\s+from\s+["'].\/data["']/.test(app) },
      { label: "App: default import from ./config", passed: /import\s+(?!\{)\w+\s+from\s+["'].\/config["']/.test(app) },
      { label: "App: named import from ./utils", passed: /import\s+\{[^}]*greet[^}]*\}\s+from\s+["'].\/utils["']/.test(app) && /import\s+\{[^}]*add[^}]*\}\s+from\s+["'].\/utils["']/.test(app) },
      { label: "console.log used at least 3 times", passed: (app.match(/console\.log/g) ?? []).length >= 3 },
    ]
  },
}

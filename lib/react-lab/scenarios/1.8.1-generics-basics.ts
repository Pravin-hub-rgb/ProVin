import type { ReactScenario } from "../types"

export const GENERICS_BASICS_LAB: ReactScenario = {
  id: "1.8.1-generics-basics",
  title: "1.8.1: TypeScript Generics Basics",
  description: "Practice generic functions, type inference, and constraints",
  instructions: `## Generics Basics

TypeScript generics seekhne ka sabse achha tarika — khud generic functions likhna aur unhe different types ke saath use karna.

### Files:
- \`/utils.ts\` — generic functions yahan likho aur export karo
- \`/App.tsx\` — functions ko import karo, call karo, console.log karo

### Requirements (utils.ts):
1. **\`getFirst<T>\`** — ek generic function jo array ka pehla element return kare (ya undefined agar khali ho)
2. **\`wrapInArray<T>\`** — ek generic function jo ek value le aur usse array mein wrap kare
3. **\`getLength<T extends { length: number }>\`** — ek generic function jo object ki length property return kare
4. Sabhi functions ko named export karo

### Requirements (App.tsx):
1. Utils se sab functions import karo
2. \`getFirst\` ko teen baar call karo — number[], string[], boolean[] ke saath, results console.log karo
3. \`wrapInArray\` ko do baar call karo — number aur string ke saath, results console.log karo
4. \`getLength\` ko do baar call karo — string aur array ke saath, results console.log karo

### Expected Output:
Browser console mein kuch aisa dikhe:
\`\`\`
First number: 10
First string: hello
First boolean: true
Wrapped: [42]
Wrapped: ["hi"]
Length of "typescript": 10
Length of [1,2,3]: 3
\`\`\`
  `,

  hints: [
    "\`function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }\`",
    "\`function wrapInArray<T>(val: T): T[] { return [val]; }\`",
    "Constraint: \`function getLength<T extends { length: number }>(val: T): number { return val.length; }\`",
    "Console.log: \`console.log(\"First number:\", getFirst<number>([10, 20, 30]))\`",
    "TypeScript inference bhi kaam karega — \`getFirst([10, 20])\` mein T = number infer ho jayega",
  ],

  starterFiles: {
    "/utils.ts": `// TODO: Generic function banao — array ka pehla element return kare (ya undefined). T type parameter use karo

// TODO: Generic function banao — ek value le aur array mein wrap kare. T type parameter use karo

// TODO: Generic function banao jo sirf un types ko accept kare jinke paas length property ho — length return kare
`,
    "/App.tsx": `// TODO: utils se sab functions import karo

export default function App() {
  // TODO: getFirst call karo numbers, strings, aur booleans ke array ke saath — results console.log karo

  // TODO: wrapInArray call karo number aur string ke saath — results console.log karo

  // TODO: getLength call karo string aur array ke saath — results console.log karo

  return <div>Check the browser console!</div>;
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0d1117;
  color: #c9d1d9;
}`,
  },
  solutionFiles: {
    "/utils.ts": `export function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function wrapInArray<T>(val: T): T[] {
  return [val];
}

export function getLength<T extends { length: number }>(val: T): number {
  return val.length;
}`,
    "/App.tsx": `import { getFirst, wrapInArray, getLength } from "./utils";

export default function App() {
  const firstNum = getFirst<number>([10, 20, 30]);
  console.log("First number:", firstNum);

  const firstStr = getFirst<string>(["hello", "world"]);
  console.log("First string:", firstStr);

  const firstBool = getFirst<boolean>([true, false, true]);
  console.log("First boolean:", firstBool);

  const wrappedNum = wrapInArray<number>(42);
  console.log("Wrapped:", wrappedNum);

  const wrappedStr = wrapInArray<string>("hi");
  console.log("Wrapped:", wrappedStr);

  const strLen = getLength("typescript");
  console.log('Length of "typescript":', strLen);

  const arrLen = getLength([1, 2, 3]);
  console.log("Length of [1,2,3]:", arrLen);

  return <div>Check the browser console!</div>;
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0d1117;
  color: #c9d1d9;
}`,
  },

  check: (files) => {
    const utils = files["/utils.ts"] ?? ""
    const app = files["/App.tsx"] ?? ""
    return [
      // utils.ts checks
      { label: "getFirst<T> generic function", passed: /function\s+getFirst\s*<T>/.test(utils) },
      { label: "getFirst returns T | undefined", passed: /T\[\]\).*:\s*T\s*\|\s*undefined/.test(utils) || /=>\s*arr\[0\]/.test(utils) },
      { label: "wrapInArray<T> generic function", passed: /function\s+wrapInArray\s*<T>/.test(utils) || /export\s+function\s+wrapInArray/.test(utils) },
      { label: "wrapInArray returns T[]", passed: /val:\s*T\).*:\s*T\[\]/.test(utils) || /=>\s*\[val\]/.test(utils) },
      { label: "getLength<T extends { length: number }>", passed: /getLength\s*<T\s+extends\s+\{\s*length:\s*number\s*\}>/.test(utils) },
      { label: "getLength returns number", passed: /\):\s*number/.test(utils) },
      { label: "All functions named exported", passed: /export\s+function/.test(utils) },

      // App.tsx checks
      { label: "Functions imported from utils", passed: /import.*getFirst.*wrapInArray.*getLength.*from/.test(app) || /import.*from\s+["']\.\/utils["']/.test(app) },
      { label: "getFirst called with different types", passed: /getFirst</.test(app) && /getFirst/.test(app) },
      { label: "wrapInArray called", passed: /wrapInArray</.test(app) },
      { label: "getLength called", passed: /getLength/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

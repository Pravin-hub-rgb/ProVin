import type { ReactScenario } from "../types"

export const INTERFACE_LAB: ReactScenario = {
  id: "1.5.1-interface",
  title: "1.5.1: Interface (TypeScript)",
  description: "Practice defining and using TypeScript interfaces for data shapes",
  instructions: `## Interface Practice

Teen files hain — \`types.ts\`, \`App.tsx\`, \`helpers.ts\`. Tumhe interfaces define karni hain, export karni hain, aur use karni hain.

### types.ts — Interfaces Define Karo
\`\`\`ts
// User interface: name (string), age (number), email (string)
// Product interface: id (number), title (string), price (number), inStock (optional boolean)
\`\`\`

### helpers.ts — Interfaces Use Karo
\`\`\`ts
// createUser(name, age, email): User return kare
// formatProduct(product: Product): string return kare
\`\`\`

### App.tsx — Import Karke Use Karo
Dono files se import karo, users aur products banakar console.log karo.

### Expected Output:
Name: Vin, Age: 25  
Product: Laptop — $999  
  `,

  hints: [
    "Interface syntax: `interface User { name: string; age: number }`",
    "Optional: `inStock?: boolean`",
    "Named export: `export interface User { ... }`",
    "Import type: `import type { User } from \"./types\"`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: types.ts se User aur Product types import karo
// TODO: helpers.ts se createUser aur formatProduct import karo

export default function App() {
  // TODO: createUser call karo with name, age, email
  // TODO: formatProduct call karo with product data
  // console.log karo results

  return <div>Check the browser console!</div>;
}`,
    "/types.ts": `// TODO: User interface banao aur export karo
// isme name (string), age (number), email (string) hona chahiye

// TODO: Product interface banao aur export karo
// isme id (number), title (string), price (number) hona chahiye
// inStock optional boolean hona chahiye`,
    "/helpers.ts": `// TODO: types.ts se User aur Product types import karo

// TODO: createUser function banao jo name, age, email le aur User return kare

// TODO: formatProduct function banao jo Product le aur string return kare`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import type { User, Product } from "./types";
import { createUser, formatProduct } from "./helpers";

export default function App() {
  const user = createUser("Vin", 25, "vin@dev.com");
  console.log("Name:", user.name, "Age:", user.age);

  const laptop: Product = { id: 1, title: "Laptop", price: 999, inStock: true };
  console.log(formatProduct(laptop));

  return <div>Check the browser console!</div>;
}`,
    "/types.ts": `export interface User {
  name: string;
  age: number;
  email: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  inStock?: boolean;
}`,
    "/helpers.ts": `import type { User, Product } from "./types";

export function createUser(name: string, age: number, email: string): User {
  return { name, age, email };
}

export function formatProduct(product: Product): string {
  return \`\${product.title} — $\${product.price}\`;
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #0d1117;
  color: #c9d1d9;
}`,
  },

  check: (files) => {
    const types = files["/types.ts"] ?? ""
    const helpers = files["/helpers.ts"] ?? ""
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "User interface defined with name, age, email", passed: /interface\s+User[\s\S]*name[\s\S]*age[\s\S]*email/.test(types) },
      { label: "Product interface defined with id, title, price", passed: /interface\s+Product[\s\S]*id[\s\S]*title[\s\S]*price/.test(types) },
      { label: "inStock is optional (?)", passed: /inStock\??\s*[:?]\s*boolean/.test(types) },
      { label: "User interface exported", passed: /export\s+interface\s+User/.test(types) },
      { label: "Product interface exported", passed: /export\s+interface\s+Product/.test(types) },
      { label: "createUser function in helpers", passed: /function\s+createUser/.test(helpers) },
      { label: "formatProduct function in helpers", passed: /function\s+formatProduct/.test(helpers) },
      { label: "User and Product imported in App", passed: /import\s+type\s+\{[^}]*User[^}]*Product[^}]*\}\s+from/.test(app) },
    ]
  },
}

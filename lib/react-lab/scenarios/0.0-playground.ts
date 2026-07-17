import type { ReactScenario } from "../types"

export const PLAYGROUND_LAB: ReactScenario = {
  id: "0.0-playground",
  title: "🧪 Playground — Practice Karo",
  description: "Koi constraints nahi — jo man kare practice karo",
  instructions: `## 🧪 Playground

Koi constraints nahi, koi check nahi, koi solution nahi.

Jo man kare karo — files banao, code likho, preview dekho.

### Features
- \`+ New File\` button se naye components banao
- \`src/\` folder mein App.tsx aur styles hai
- Naye folders banao (jaise \`components/\`)
- Jo seekha hai woh repeat karo

> Yeh tumhara personal sandbox hai. Kuch bhi try karo.`,
  hints: [],
  starterFiles: {
    "/public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Playground</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    "/package.json": `{
  "name": "playground",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}`,
    "/tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`,
    "/index.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./src/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")!
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "/src/App.tsx": `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}`,
    "/src/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background: #f0f2f5;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
  margin-left: 0.5rem;
}
button:hover { opacity: 0.9; }
`,
  },
  solutionFiles: {},
  check: () => [],
}

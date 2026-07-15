import type { ReactScenario } from "../types"

export const CHILDREN_LAB: ReactScenario = {
  id: "1.6-children",
  title: "1.6: Children aur Composition Pattern",
  description: "Learn the children prop and component composition patterns",
  instructions: `## Card Layout Component

Create a reusable \`Card\` component that wraps content using the \`children\` prop.

### Requirements:
1. CardProps interface banao — children (React.ReactNode) required, title optional
2. Card component ek styled box render kare, children andar dikhe
3. Agar title diya hai toh h3 ke andar show karo
4. Card ko different content ke saath reuse karo

### Expected Output:
Ek Card title ke saath — "Notes" heading + content andar
Doosra Card bina title ke — sirf content andar
  `,

  hints: [
    "`children: React.ReactNode` allows any valid JSX content",
    "Conditional title: `{title && <h3>{title}</h3>}`",
    "Wrap content between opening and closing tags: `<Card>...</Card>`",
  ],

  starterFiles: {
    "/App.tsx": `import React from "react";

// TODO: CardProps interface banao
// TODO: CardProps mein children required hai, title optional hai

// TODO: Card component banao — <div className="card"> ke andar children render karo
// Agar title diya hai toh <h3> mein show karo

export default function App() {
  return (
    <div>
      <h1>Composition Demo</h1>
      {/* TODO: Card with title and content */}
      {/* TODO: Card without title */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #e8f4f8;
}
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  max-width: 400px;
}
.card h3 {
  margin-top: 0;
  border-bottom: 2px solid #4a90d9;
  padding-bottom: 0.5rem;
}`,
  },
  solutionFiles: {
    "/App.tsx": `import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Composition Demo</h1>
      <Card title="Notes">
        <p>This card has a title and some content inside.</p>
      </Card>
      <Card>
        <p>This card has no title, just content.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </Card>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #e8f4f8;
}
.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  max-width: 400px;
}
.card h3 {
  margin-top: 0;
  border-bottom: 2px solid #4a90d9;
  padding-bottom: 0.5rem;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "CardProps interface with children: React.ReactNode", passed: /children\s*:\s*React\.ReactNode/.test(app) },
      { label: "Optional title in CardProps", passed: /title\??\s*[:?]\s*string/.test(app) },
      { label: "Conditional title rendering", passed: /\{title\s*&&/.test(app) || /\{title\s*\?/.test(app) },
      { label: "Card wraps children in JSX", passed: /\{children\}/.test(app) },
      { label: "Card used with children content", passed: /<Card[^>]*>[\s\S]*<\/Card>/.test(app) },
      { label: "Card used without title", passed: /<Card>/.test(app) && /<Card\s+title=/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

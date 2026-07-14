import type { ReactScenario } from "../types"

export const CHILDREN_LAB: ReactScenario = {
  id: "1.4-children",
  title: "1.4: Children aur Composition Pattern",
  description: "Learn the children prop and component composition patterns",
  instructions: `## Card Layout Component

Create a reusable \`Card\` component that wraps content using the \`children\` prop.

### Requirements:
1. \`interface CardProps\` with \`children: React.ReactNode\` and optional \`title?: string\`
2. Card should render a styled box with the children inside
3. If title is provided, show it as \`<h3>\` at the top
4. Use the Card to wrap different content (text, lists, other components)

### Expected:
You should be able to write:
\`\`\`tsx
<Card title="Info">
  <p>Some content here</p>
</Card>
\`\`\`
  `,

  hints: [
    "`children: React.ReactNode` allows any valid JSX content",
    "Conditional title: `{title && <h3>{title}</h3>}`",
    "Wrap content between opening and closing tags: `<Card>...</Card>`",
  ],

  starterFiles: {
    "/App.tsx": `import React from "react";

// Create CardProps interface here

function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      {/* TODO: Show title if provided */}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Composition Demo</h1>
      {/* Use Card with title and content */}
      {/* Use Card without title */}
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

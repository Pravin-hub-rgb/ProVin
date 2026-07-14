import type { ReactScenario } from "../types"

export const PROPS_LAB: ReactScenario = {
  id: "1.3-props",
  title: "1.3: Props aur TypeScript Interface",
  description: "Practice passing props and optional properties with default values",
  instructions: `## Greeting Card Generator

Create a GreetingCard component that accepts props including an optional sender.

### Requirements:
1. \`interface GreetingCardProps\` with:
   - \`recipient\` (string, required)
   - \`message\` (string, required)
   - \`sender\` (string, optional)
2. If \`sender\` is provided, show "— senderName" at the bottom
3. If not provided, show nothing (or "— Anonymous")
4. Render at least 2 GreetingCards

### Tips:
- Optional prop: \`sender?: string\`
- Default value: \`{sender || "Anonymous"}\` or \`{sender && <p>— {sender}</p>}\`
  `,

  hints: [
    "Optional prop: `sender?: string`",
    "Conditional render: `{sender && <p>— {sender}</p>}`",
    "Default fallback: `{sender || \"Anonymous\"}`",
  ],

  starterFiles: {
    "/App.tsx": `// Create the interface here

function GreetingCard({ recipient, message, sender }: GreetingCardProps) {
  return (
    <div className="card">
      <h2>Hello, {recipient}!</h2>
      <p>{message}</p>
      {/* TODO: Show sender if provided */}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Greeting Cards</h1>
      {/* TODO: Add GreetingCards */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #fef9ef;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 400px;
}`,
  },
  solutionFiles: {
    "/App.tsx": `interface GreetingCardProps {
  recipient: string;
  message: string;
  sender?: string;
}

function GreetingCard({ recipient, message, sender }: GreetingCardProps) {
  return (
    <div className="card">
      <h2>Hello, {recipient}!</h2>
      <p>{message}</p>
      {sender && <p style={{ color: "#666", fontStyle: "italic" }}>— {sender}</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Greeting Cards</h1>
      <GreetingCard
        recipient="Vin"
        message="Happy Birthday!"
        sender="Priya"
      />
      <GreetingCard
        recipient="Team"
        message="Great work this quarter!"
      />
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #fef9ef;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 400px;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "GreetingCardProps interface defined", passed: /interface\s+GreetingCardProps/.test(app) },
      { label: "sender is optional (?)", passed: /sender\??\s*[:?]/.test(app) },
      { label: "Conditional render of sender", passed: /\{sender\s*(&&|\?\s*.*:)/.test(app) },
      { label: "At least 2 GreetingCard usages", passed: (app.match(/GreetingCard/g) ?? []).length >= 2 },
      { label: "recipient and message props used", passed: /\{recipient\}.*\{message\}|\{message\}.*\{recipient\}/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

import type { ReactScenario } from "../types"

export const OPTIONAL_PROPS_LAB: ReactScenario = {
  id: "1.5.3-optional-props",
  title: "1.5.3: Optional Props aur Destructuring",
  description: "Practice optional props, destructuring, and default values",
  instructions: `## Greeting Card with Optional Sender

\`GreetingCard\` component banana hai jo props leta hai — \`recipient\`, \`message\` required, \`sender\` optional.

### Requirements:
1. \`interface GreetingCardProps\` — \`recipient: string\`, \`message: string\`, \`sender?: string\`
2. **Destructuring** use karo params mein — \`{ recipient, message, sender }\`
3. Agar \`sender\` provided hai toh "— senderName" show karo
4. Agar \`sender\` nahi hai toh kuch mat dikhao
5. **2 GreetingCards** render karo — ek bina sender ke, ek sender ke saath

### Tips:
- Conditional render: \`{sender && <p>— {sender}</p>}\`
- Interface: \`interface GreetingCardProps { recipient: string; message: string; sender?: string; }\`
  `,

  hints: [
    "Optional: `sender?: string` in interface",
    "Destructure: `function GreetingCard({ recipient, message, sender }: GreetingCardProps)`",
    "Conditional: `{sender && <p>— {sender}</p>}`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: Define GreetingCardProps interface

function GreetingCard(/* destructure props here */) {
  return (
    <div className="card">
      <h2>Hello, {/* recipient */}!</h2>
      <p>{/* message */}</p>
      {/* TODO: Show sender if provided */}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Greetings</h1>
      {/* TODO: GreetingCard 1 — with sender */}
      {/* TODO: GreetingCard 2 — without sender */}
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
      <h1>Greetings</h1>
      <GreetingCard recipient="Vin" message="Happy Birthday!" sender="Priya" />
      <GreetingCard recipient="Team" message="Great work this week!" />
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
      { label: "recipient: string in interface", passed: /recipient\s*:\s*string/.test(app) },
      { label: "sender is optional (?)", passed: /sender\??\s*[:?]/.test(app) },
      { label: "Destructuring used in function params", passed: /\{[\s\S]*recipient[\s\S]*message[\s\S]*\}:/.test(app) },
      { label: "Conditional render of sender", passed: /\{sender\s*&&/.test(app) },
      { label: "At least 2 GreetingCard usages", passed: (app.match(/<GreetingCard/g) ?? []).length >= 2 },
    ]
  },
}

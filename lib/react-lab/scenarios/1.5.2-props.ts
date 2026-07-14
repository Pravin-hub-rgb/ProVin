import type { ReactScenario } from "../types"

export const PROPS_LAB: ReactScenario = {
  id: "1.5.2-props",
  title: "1.5.2: Props",
  description: "Practice passing props to components with typed interfaces",
  instructions: `## ProfileCard with Props

\`ProfileCard\` component hai jo props leta hai. Tumhe interface define karni hai, component ko props ke saath implement karna hai, aur App mein alag-alag data pass karna hai.

### Requirements:
1. \`interface ProfileCardProps\` define karo: \`name\` (string), \`role\` (string)
2. ProfileCard component ko props ke saath implement karo
3. Name \`<h3>\` mein dikhao, role \`<p>\` mein
4. App mein ProfileCard **3 baar** render karo — alag-alag name/role ke saath

### Expected Output:
Vin — React Developer  
Priya — Designer  
Raj — Backend Dev  
  `,

  hints: [
    "Interface: `interface ProfileCardProps { name: string; role: string }`",
    "Component: `function ProfileCard(props: ProfileCardProps)`",
    "Use `{props.name}` and `{props.role}` in JSX",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: Define ProfileCardProps interface

function ProfileCard(props: ProfileCardProps) {
  return (
    <div className="card">
      {/* TODO: Show name and role */}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      {/* TODO: ProfileCard x3 with different data */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  max-width: 300px;
}`,
  },

  solutionFiles: {
    "/App.tsx": `interface ProfileCardProps {
  name: string;
  role: string;
}

function ProfileCard(props: ProfileCardProps) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.role}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      <ProfileCard name="Vin" role="React Developer" />
      <ProfileCard name="Priya" role="Designer" />
      <ProfileCard name="Raj" role="Backend Dev" />
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  max-width: 300px;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "ProfileCardProps interface defined", passed: /interface\s+ProfileCardProps/.test(app) },
      { label: "name: string in interface", passed: /name\s*:\s*string/.test(app) },
      { label: "role: string in interface", passed: /role\s*:\s*string/.test(app) },
      { label: "ProfileCard function with typed props", passed: /function\s+ProfileCard\s*\(\s*props\s*:\s*ProfileCardProps/.test(app) },
      { label: "props.name used in JSX", passed: /\{props\.name\}/.test(app) },
      { label: "props.role used in JSX", passed: /\{props\.role\}/.test(app) },
      { label: "ProfileCard used 3 times with different data", passed: (app.match(/<ProfileCard/g) ?? []).length >= 3 },
      { label: "Different name values passed", passed: /name=["']/.test(app) && (app.match(/name=/g) ?? []).length >= 2 },
    ]
  },
}

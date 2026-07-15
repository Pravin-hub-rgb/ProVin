import type { ReactScenario } from "../types"

export const COMPONENTS_LAB: ReactScenario = {
  id: "1.2-components",
  title: "1.2: Pehla Component",
  description: "Create and reuse a basic React component in a single file",
  instructions: `## Your First Component

Create a component called \`ProfileCard\` inside \`App.tsx\` and use it multiple times.

### Requirements:
1. ProfileCard nam ka component function banao jo JSX return kare
2. Andar do variables banao — name string, role string
3. Name h2 ke andar dikhao, role p ke andar dikhao
4. Component par JSX.Element return type lagao
5. <ProfileCard /> ko **teen baar** render karo App ke andar
6. Saara code App.tsx mein hi likho — alag file nahi

### Example Output:
**My Team**  
Vin  
React Developer  
Vin  
React Developer  
Vin  
React Developer  

### Tips:
- Function name must start with a capital letter: \`ProfileCard\` not \`profileCard\`
- Place ProfileCard ABOVE the App function
- JSX.Element is the return type for React components
  `,

  hints: [
    "Function: `function ProfileCard(): JSX.Element { return <div>...</div> }`",
    "Variables: `const name = \"Vin\"; const role = \"React Developer\";`",
    "Use three times: `<ProfileCard /><ProfileCard /><ProfileCard />`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: ProfileCard component yahan banao
// capital letter function, JSX.Element return type use karo
// andar do variables banao — naam aur role
// <h2> mein naam dikhao, <p> mein role

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      {/* TODO: ProfileCard teen baar render karo */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}`,
  },

  solutionFiles: {
    "/App.tsx": `function ProfileCard(): JSX.Element {
  const name = "Vin";
  const role = "React Developer";

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
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
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "ProfileCard function defined", passed: /function\s+ProfileCard/.test(app) },
      { label: "Capital letter component name", passed: /function\s+[A-Z]/.test(app) },
      { label: "JSX.Element return type", passed: /:\s*JSX\.Element/.test(app) },
      { label: "name variable declared", passed: /\bname\s*(:?\s*string)?\s*=/.test(app) },
      { label: "role variable declared", passed: /\brole\s*(:?\s*string)?\s*=/.test(app) },
      { label: "{name} used in JSX", passed: /\{name\}/.test(app) },
      { label: "{role} used in JSX", passed: /\{role\}/.test(app) },
      { label: "ProfileCard used at least 3 times", passed: (app.match(/<ProfileCard/g) ?? []).length >= 3 },
      { label: "No props/imports (1.2 is basics only)", passed: !/interface\s+\w+Props/.test(app) && !/import\s+/.test(app) },
    ]
  },
}

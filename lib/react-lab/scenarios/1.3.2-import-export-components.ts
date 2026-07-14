import type { ReactScenario } from "../types"

export const IMPORT_EXPORT_COMPONENTS_LAB: ReactScenario = {
  id: "1.3.2-import-export-components",
  title: "1.3.2: Import / Export — React Components",
  description: "Practice default and named exports with React components",
  instructions: `## Export + Import Components

Teen files hain. Components ka code likha hai par **export nahi kiya**. Tumhe export karna hai aur App mein import karke render karna hai.

### ProfileCard.tsx
Ek simple component hai — hardcoded naam aur role dikhata hai. Isko **default export** karo.

### MemberBadge.tsx
Ek simple component hai — naam aur role dikhata hai. Isko **named export** karo (export function).

### App.tsx
Dono components import karo. ProfileCard **do baar** render karo aur MemberBadge **do baar**.

### Expected Output:
Vin — React Developer  
Vin — React Developer  
Priya — Designer  
Priya — Designer  
  `,

  hints: [
    "Default export: file ke bottom mein `export default ProfileCard;`",
    "Named export: `export function MemberBadge(...)`",
    "Default import: `import ProfileCard from \"./ProfileCard\"`",
    "Named import: `import { MemberBadge } from \"./MemberBadge\"`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: ProfileCard default import karo
// TODO: MemberBadge named import karo

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      {/* TODO: ProfileCard x2 render karo */}
      {/* TODO: MemberBadge x2 render karo */}
    </div>
  );
}`,
    "/ProfileCard.tsx": `function ProfileCard() {
  return <h3>Vin — React Developer</h3>;
}

// TODO: ProfileCard ko default export karo`,
    "/MemberBadge.tsx": `function MemberBadge() {
  return <h3>Priya — Designer</h3>;
}

// TODO: MemberBadge ko named export karo`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import ProfileCard from "./ProfileCard";
import { MemberBadge } from "./MemberBadge";

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      <ProfileCard />
      <ProfileCard />
      <MemberBadge />
      <MemberBadge />
    </div>
  );
}`,
    "/ProfileCard.tsx": `function ProfileCard() {
  return <h3>Vin — React Developer</h3>;
}

export default ProfileCard;`,
    "/MemberBadge.tsx": `export function MemberBadge() {
  return <h3>Priya — Designer</h3>;
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    const pc = files["/ProfileCard.tsx"] ?? ""
    const mb = files["/MemberBadge.tsx"] ?? ""
    return [
      { label: "ProfileCard.tsx: default export kiya", passed: /export\s+default\s+ProfileCard/.test(pc) },
      { label: "MemberBadge.tsx: named export kiya", passed: /export\s+function\s+MemberBadge/.test(mb) },
      { label: "App: ProfileCard default import", passed: /import\s+ProfileCard\s+from/.test(app) },
      { label: "App: MemberBadge named import", passed: /import\s+\{[^}]*MemberBadge[^}]*\}\s+from/.test(app) },
      { label: "Two ProfileCard rendered", passed: (app.match(/<ProfileCard/g) ?? []).length >= 2 },
      { label: "Two MemberBadge rendered", passed: (app.match(/<MemberBadge/g) ?? []).length >= 2 },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

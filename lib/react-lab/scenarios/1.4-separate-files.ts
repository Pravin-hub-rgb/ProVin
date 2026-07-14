import type { ReactScenario } from "../types"

export const SEPARATE_FILES_LAB: ReactScenario = {
  id: "1.4-separate-files",
  title: "1.4: Separate Component Files",
  description: "Practice organizing components into separate files and importing them",
  instructions: `## Components in Separate Files

Teen files hain — \`ProfileCard.tsx\`, \`MemberBadge.tsx\`, \`App.tsx\`. Dono components ka code likha hai lekin **export nahi kiya** aur abhi \`App.tsx\` mein ek saath hai. Tumhe:

1. \`ProfileCard.tsx\` mein component **default export** karo
2. \`MemberBadge.tsx\` mein component **named export** karo
3. \`App.tsx\` mein dono ko **components/ folder se import** karo
4. ProfileCard 2 baar render karo
5. MemberBadge 2 baar render karo

Import path yeh hoga: \`"./components/ProfileCard"\` aur \`"./components/MemberBadge"\`

### Expected Output:
Vin — React Developer  
Vin — React Developer  
Priya — Designer  
Priya — Designer  
  `,

  hints: [
    "Default export: `export default ProfileCard;`",
    "Named export: `export function MemberBadge(...)`",
    "Import path with folder: `import ProfileCard from \"./components/ProfileCard\"`",
    "Named import: `import { MemberBadge } from \"./components/MemberBadge\"`",
  ],

  starterFiles: {
    "/App.tsx": `// TODO: ProfileCard ko components/ se default import karo
// TODO: MemberBadge ko components/ se named import karo

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      {/* TODO: ProfileCard x2 render karo */}
      {/* TODO: MemberBadge x2 render karo */}
    </div>
  );
}`,
    "/components/ProfileCard.tsx": `function ProfileCard() {
  return <h3>Vin — React Developer</h3>;
}

// TODO: ProfileCard ko default export karo`,
    "/components/MemberBadge.tsx": `function MemberBadge() {
  return <h3>Priya — Designer</h3>;
}

// TODO: MemberBadge ko named export karo`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}`,
  },

  solutionFiles: {
    "/App.tsx": `import ProfileCard from "./components/ProfileCard";
import { MemberBadge } from "./components/MemberBadge";

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
    "/components/ProfileCard.tsx": `function ProfileCard() {
  return <h3>Vin — React Developer</h3>;
}

export default ProfileCard;`,
    "/components/MemberBadge.tsx": `export function MemberBadge() {
  return <h3>Priya — Designer</h3>;
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f0f4f8;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    const pc = files["/components/ProfileCard.tsx"] ?? ""
    const mb = files["/components/MemberBadge.tsx"] ?? ""
    return [
      { label: "ProfileCard.tsx: default export", passed: /export\s+default\s+ProfileCard/.test(pc) },
      { label: "MemberBadge.tsx: named export", passed: /export\s+function\s+MemberBadge/.test(mb) },
      { label: "App: ProfileCard default import from components/", passed: /import\s+ProfileCard\s+from\s+["'].\/components\/ProfileCard["']/.test(app) },
      { label: "App: MemberBadge named import from components/", passed: /import\s+\{[^}]*MemberBadge[^}]*\}\s+from\s+["'].\/components\/MemberBadge["']/.test(app) },
      { label: "Two ProfileCard rendered", passed: (app.match(/<ProfileCard/g) ?? []).length >= 2 },
      { label: "Two MemberBadge rendered", passed: (app.match(/<MemberBadge/g) ?? []).length >= 2 },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

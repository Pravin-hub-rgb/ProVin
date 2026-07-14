import type { ReactScenario } from "../types"

export const COMPONENTS_LAB: ReactScenario = {
  id: "1.2-components",
  title: "1.2: Pehla Component aur TypeScript Basics",
  description: "Create reusable components with TypeScript typing",
  instructions: `## Two Components — Guided + Scratch

Create TWO components: ProfileCard (guided) and MemberBadge (from scratch).

### ProfileCard (guided — you just fill the body)
1. \`ProfileCardProps\` interface and function shell are given below
2. Inside the return, display \`{name}\` in \`<h3>\` and \`{role}\` in \`<p>\`
3. Render two \`<ProfileCard>\` in App with different data

### MemberBadge (create from scratch!)
4. Define \`interface MemberBadgeProps\` with: \`name\` (string), \`role\` (string), \`isLead\` (optional boolean)
5. Create \`function MemberBadge\` that destructures the props
6. Show \`{name}\` with " ⭐ Lead" if \`isLead\` is true, plus \`{role}\` below
7. Render two \`<MemberBadge>\` in App — one with \`isLead\`, one without

### Example Output:
**Vin** — React Developer  
**Priya** — Designer  
**Raj ⭐ Lead** — Manager  
**Neha** — Intern  
  `,

  hints: [
    "ProfileCard: `{name}` and `{role}` inside `<h3>` and `<p>`",
    "MemberBadge: `interface MemberBadgeProps { name: string; role: string; isLead?: boolean }`",
    "Conditional: `{isLead && \"⭐ Lead\"}` to show only when true",
  ],

  starterFiles: {
    "/App.tsx": `interface ProfileCardProps {
  name: string;
  role: string;
}

function ProfileCard({ name, role }: ProfileCardProps) {
  return (
    <div className="card">
      {/* TODO: Display name and role */}
    </div>
  );
}

// TODO: Create MemberBadge component from scratch
// - Define MemberBadgeProps interface
// - Create the function
// - Show name, role, and "⭐ Lead" if isLead is true

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      {/* TODO: ProfileCard x2 */}
      {/* TODO: MemberBadge x2 (one with isLead) */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}
.card, .badge {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.badge { border-left: 4px solid #6c63ff; }
.lead { color: #d4a017; font-weight: bold; }`,
  },
  solutionFiles: {
    "/App.tsx": `interface ProfileCardProps {
  name: string;
  role: string;
}

function ProfileCard({ name, role }: ProfileCardProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

interface MemberBadgeProps {
  name: string;
  role: string;
  isLead?: boolean;
}

function MemberBadge({ name, role, isLead }: MemberBadgeProps) {
  return (
    <div className="badge">
      <h3>{name} {isLead && <span className="lead">⭐ Lead</span>}</h3>
      <p>{role}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>My Team</h1>
      <ProfileCard name="Vin" role="React Developer" />
      <ProfileCard name="Priya" role="Designer" />
      <MemberBadge name="Raj" role="Manager" isLead />
      <MemberBadge name="Neha" role="Intern" />
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
  background: #f5f5f5;
}
.card, .badge {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.badge { border-left: 4px solid #6c63ff; }
.lead { color: #d4a017; font-weight: bold; }`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "ProfileCard renders name and role", passed: /\{name\}.*\{role\}|\{role\}.*\{name\}/.test(app) },
      { label: "Two ProfileCard components used", passed: (app.match(/<ProfileCard/g) ?? []).length >= 2 },
      { label: "MemberBadge component created", passed: /function\s+MemberBadge/.test(app) },
      { label: "MemberBadgeProps interface with optional isLead", passed: /interface\s+MemberBadgeProps[\s\S]*isLead/.test(app) },
      { label: "MemberBadge renders name and role", passed: /\{name\}.*\{role\}|\{role\}.*\{name\}/.test(app.replace(/ProfileCard/g, "")) },
      { label: "Two MemberBadge components used", passed: (app.match(/<MemberBadge/g) ?? []).length >= 2 },
      { label: "One MemberBadge has isLead prop", passed: /isLead/.test(app) },
    ]
  },
}

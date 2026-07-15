import type { ReactScenario } from "../types"

export const JSX_LAB: ReactScenario = {
  id: "1.1-jsx",
  title: "1.1: JSX Kya Hai",
  description: "Practice JSX syntax, expressions, and conditional rendering",
  instructions: `## JSX Expressions

Write JSX directly inside App() to display a user's profile.

### Requirements:
1. App() ke andar teen variables banao — name (string), age (number), isStudent (boolean)
2. Name h2 tag mein dikhao JSX expression se
3. Age p tag mein dikhao
4. Ternary operator use karo — isStudent true hai toh "Student" dikhao, nahi toh "Working"
5. Sab kuch ek div mein wrap karo jiska className "profile" ho

### Example Output:
Browser mein kuch aisa dikhna chahiye:
- **Vin**
- Age: 25
- Status: Student
  `,

  hints: [
    "JSX expressions use single curly braces: `{variable}`",
    "Ternary: `{condition ? \"value1\" : \"value2\"}`",
    "Don't forget: `className` not `class`",
  ],

  starterFiles: {
    "/App.tsx": `export default function App() {
  // TODO: Create variables here

  return (
    <div className="profile">
      <h1>My Profile</h1>
      {/* TODO: Add JSX expressions here */}
      <h2>Your name here</h2>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
}
.profile {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
}`,
  },

  solutionFiles: {
    "/App.tsx": `export default function App() {
  const name = "Vin";
  const age = 25;
  const isStudent = true;

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isStudent ? "Student" : "Working"}</p>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  padding: 2rem;
}
.profile {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "name variable declared", passed: /\bname\s*(:?\s*string)?\s*=/.test(app) },
      { label: "age variable declared", passed: /\bage\s*(:?\s*number)?\s*=/.test(app) },
      { label: "isStudent variable declared", passed: /\bisStudent\s*(:?\s*boolean)?\s*=/.test(app) },
      { label: "Uses {name} in JSX to display name", passed: /\{name\}/.test(app) },
      { label: "Uses {age} in JSX to display age", passed: /\{age\}/.test(app) },
      { label: "Ternary with isStudent for status", passed: /\{isStudent\s*\?/.test(app) },
      { label: "Uses className instead of class", passed: /className=/.test(app) && !/\sclass\s*=/.test(app) },
      { label: "No extra component functions (1.1 is JSX only)", passed: !/function\s+\w+\s*\(/.test(app.replace(/export\s+default\s+function\s+App/, "")) },
    ]
  },
}

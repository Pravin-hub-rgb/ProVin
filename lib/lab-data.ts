export interface LabSubject {
  id: string
  title: string
  description: string
  icon: string
  scenarioCount: number
}

export const labSubjects: LabSubject[] = [
  {
    id: "github",
    title: "Git & GitHub",
    description: "Practice branching, PRs, merges, and team workflows in a simulated environment.",
    icon: "",
    scenarioCount: 16,
  },
  {
    id: "agenticai",
    title: "Agentic AI",
    description: "Practice API calls, tool calling, and building AI agents in a simulated environment.",
    icon: "🤖",
    scenarioCount: 1,
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Write, fix, and run JavaScript code to master variables, functions, async, and more.",
    icon: "</>",
    scenarioCount: 1,
  },
  {
    id: "react",
    title: "React.js",
    description: "Build React components, manage state, handle events, and compose UIs in a live sandbox.",
    icon: "⚛️",
    scenarioCount: 9,
  },
]

export function getLabSubject(id: string): LabSubject | undefined {
  return labSubjects.find((s) => s.id === id)
}

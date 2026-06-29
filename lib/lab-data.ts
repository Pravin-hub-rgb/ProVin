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
    scenarioCount: 3,
  },
]

export function getLabSubject(id: string): LabSubject | undefined {
  return labSubjects.find((s) => s.id === id)
}

export interface CheckResult {
  label: string
  passed: boolean
}

export interface ReactScenario {
  id: string
  title: string
  description: string
  instructions: string
  hints: string[]
  starterFiles: Record<string, string>
  solutionFiles: Record<string, string>
  check: (files: Record<string, string>) => CheckResult[]
  dependencies?: Record<string, string>
  template?: "react-ts" | "react"
}

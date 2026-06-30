export interface Commit {
  hash: string
  message: string
  author: "dev-a" | "dev-b"
  timestamp: number
  parents: string[]
}

export interface LocalRepo {
  currentBranch: string
  branches: Record<string, string[]>
  allCommits: Record<string, Commit>
  staged: string[]
  workingDirChanges: string[]
  existingFiles: string[]
  ignoredPatterns: string[]
}

export interface OriginRepo {
  branches: Record<string, Commit[]>
}

export interface PRReview {
  author: "dev-a" | "dev-b"
  type: "comment" | "approve" | "request-changes"
  body: string
}

export interface PR {
  id: number
  title: string
  description: string
  author: "dev-a" | "dev-b"
  baseBranch: string
  compareBranch: string
  status: "open" | "approved" | "changes-requested" | "merged" | "closed"
  reviews: PRReview[]
}

export interface ScenarioState {
  currentStep: number
  id: string
}

export interface GitLabState {
  origin: OriginRepo
  localA: LocalRepo
  localB: LocalRepo
  prs: PR[]
  nextPrId: number
  scenario: ScenarioState
  mergeInProgress?: { source: string }
  conflictType?: "content" | "modify-delete" | "whitespace"
}

export type ParsedCommand =
  | { type: "add"; files: string[] }
  | { type: "add-all" }
  | { type: "commit"; message: string; amend?: boolean }
  | { type: "revert"; hash: string }
  | { type: "reset"; mode: "soft" | "mixed" | "hard"; ref: string }
  | { type: "push"; remote: string; branch: string; setUpstream?: boolean }
  | { type: "pull"; remote: string; branch: string }
  | { type: "branch"; name?: string; flag?: string; mergedBase?: string }
  | { type: "switch"; branch: string; create?: boolean }
  | { type: "checkout"; branch: string; create?: boolean }
  | { type: "delete-remote"; remote: string; branch: string }
  | { type: "merge"; source: string; strategy: "merge-commit" | "squash" | "rebase" }
  | { type: "status" }
  | { type: "log" }
  | { type: "tree" }
  | { type: "diff"; staged?: boolean }
  | { type: "clear" }
  | { type: "pr-create"; title: string; description: string }
  | { type: "pr-review"; action: "approve" | "request-changes"; body: string }
  | { type: "pr-merge"; strategy?: "merge-commit" | "squash" | "rebase" }
  | { type: "unknown"; raw: string }
  | { type: "error"; raw: string }
  | { type: "ignore" }

export interface CommandResult {
  lines: string[]
  advance?: boolean
}

export interface ScenarioStep {
  actor: "A" | "B"
  instruction: string
  match: (parsed: ParsedCommand) => boolean
  hints: [string, string, string]
  githubAction?: "create-pr" | "review-pr" | "merge-pr" | "resolve-conflict"
  getNextStep?: (state: GitLabState) => number
}

export interface Scenario {
  id: string
  phase: string
  title: string
  description: string
  steps: ScenarioStep[]
  setup?: (state: GitLabState) => GitLabState
}

export interface TerminalLine {
  text: string
  type: "cmd" | "output" | "info" | "error"
}

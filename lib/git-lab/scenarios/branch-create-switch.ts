import type { Scenario } from "../types"

export const BRANCH_CREATE_SWITCH: Scenario = {
  id: "branch-create-switch",
  phase: "1.3",
  title: "Creating and Switching Branches",
  description: "Practice creating branches with git branch, switching with git switch, and doing both in one command.",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: Date.now() - 3600000,
      parents: [] as string[],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.branches.main = [initCommit.hash]
    state.localA.currentBranch = "main"
    state.origin.branches.main = [initCommit]
    state.localA.existingFiles = ["README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "List all branches to see what exists",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Before creating anything new, see what branches already exist.",
        "Use git branch with no arguments to list all local branches. The current one has a * next to it.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Create a new branch called 'feature/nav'",
      match: (p) => p.type === "branch" && p.name === "feature/nav",
      hints: [
        "git branch <name> creates a new branch at the current commit. It does NOT switch to it.",
        "The branch is just a lightweight pointer. Run: git branch feature/nav",
        "Run: git branch feature/nav",
      ],
    },
    {
      actor: "A",
      instruction: "List branches again to confirm the new one exists",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Run git branch again. feature/nav should appear in the list while * stays on main.",
        "The new branch exists at the same commit as main. Both point to the same snapshot for now.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Switch to the 'feature/nav' branch",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "feature/nav" && !p.create,
      hints: [
        "Creating a branch doesn't move you onto it. Use git switch <name> to switch.",
        "git switch updates your working directory to match the branch you're moving to.",
        "Run: git switch feature/nav",
      ],
    },
    {
      actor: "A",
      instruction: "List branches to confirm you're now on feature/nav",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Run git branch. The * should now be next to feature/nav instead of main.",
        "The * tells you which branch is currently active — where new commits will land.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Create and switch to 'feature/header' in one command",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true && p.branch === "feature/header",
      hints: [
        "Creating then switching is so common Git has a shortcut: switch -c does both in one step.",
        "The -c flag means 'create'. Git creates the branch at your current commit then moves you onto it.",
        "Run: git switch -c feature/header",
      ],
    },
    {
      actor: "A",
      instruction: "List all branches one last time",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "You should now have three branches: main, feature/nav, and feature/header.",
        "The * marks your current branch. You went from 1 to 3 branches — exactly how real projects grow.",
        "Run: git branch",
      ],
    },
  ],
}

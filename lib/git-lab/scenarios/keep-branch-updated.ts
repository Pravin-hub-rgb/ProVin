import type { Scenario } from "../types"

export const KEEP_BRANCH_UPDATED: Scenario = {
  id: "keep-branch-updated",
  phase: "1.5",
  title: "Keeping Branch Up to Date with Main",
  description: "Your feature branch is behind main. Merge the latest changes into your branch to stay in sync.",
  setup: (state) => {
    const now = Date.now()
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: now - 7200000,
      parents: [] as string[],
    }
    const mainUpdate = {
      hash: "e5f6g7h",
      message: "Add navigation bar",
      author: "dev-a" as const,
      timestamp: now - 3600000,
      parents: [initCommit.hash],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[mainUpdate.hash] = mainUpdate
    state.localA.branches.main = [initCommit.hash, mainUpdate.hash]
    state.localA.branches["feature/nav"] = [initCommit.hash]
    state.localA.currentBranch = "feature/nav"
    state.localA.existingFiles = ["README.md", "index.html"]
    state.origin.branches.main = [initCommit, mainUpdate]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Check the log to see what commits are on your feature branch",
      match: (p) => p.type === "log",
      hints: [
        "See what commits exist on feature/nav before merging. You should only see the initial commit.",
        "git log lists commits in reverse chronological order. Compare this with main later.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Merge the latest main changes into your feature branch",
      match: (p) => p.type === "merge" && p.source === "main",
      hints: [
        "Your branch was created before main got updated. You need to bring main's new commits in.",
        "While on feature/nav, use git merge main to pull in commits that main has but your branch doesn't.",
        "Run: git merge main",
      ],
    },
    {
      actor: "A",
      instruction: "Verify the merge by checking the log again",
      match: (p) => p.type === "log",
      hints: [
        "Check that main's commits now appear in your branch's history. You should see the merge commit too.",
        "Your branch is now up to date with main — no conflicts, no divergence, just the latest code.",
        "Run: git log",
      ],
    },
  ],
}

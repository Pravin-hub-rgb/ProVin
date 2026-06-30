import type { Scenario } from "../types"

export const REVERT_COMMIT: Scenario = {
  id: "revert-commit",
  phase: "4.2",
  title: "git revert",
  description: "Revert a commit safely — creates a new undo commit automatically. No manual staging or committing needed.",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: Date.now() - 7200000,
      parents: [] as string[],
    }
    const badCommit = {
      hash: "e5f6g7h",
      message: "Add debug logging",
      author: "dev-a" as const,
      timestamp: Date.now() - 3600000,
      parents: [initCommit.hash],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[badCommit.hash] = badCommit
    state.localA.branches.main = [initCommit.hash, badCommit.hash]
    state.localA.currentBranch = "main"
    state.localA.staged = []
    state.localA.workingDirChanges = []
    state.localA.existingFiles = ["README.md"]
    state.origin.branches.main = [initCommit, badCommit]
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.currentBranch = "main"
    state.localB.staged = []
    state.localB.workingDirChanges = []
    state.localB.existingFiles = ["README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "View the commit history to see the two commits",
      match: (p) => p.type === "log",
      hints: [
        "See what commits exist. One of them ('Add debug logging') needs to be reverted.",
        "git log shows the commits in reverse order. Note the hash of the second commit e5f6g7h.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Revert the 'Add debug logging' commit (hash: e5f6g7h)",
      match: (p) => p.type === "revert" && p.hash === "e5f6g7h",
      hints: [
        "git revert creates a NEW commit that undoes the broken commit. Unlike reset, history stays intact.",
        "Revert creates the undo commit AUTOMATICALLY. No git add or git commit needed. It's one step.",
        "Run: git revert e5f6g7h",
      ],
    },
    {
      actor: "A",
      instruction: "View the log to see the revert commit that revert auto-created",
      match: (p) => p.type === "log",
      hints: [
        "Revert already created the commit — you didn't need to stage or commit manually. The new commit says 'Revert \"Add debug logging\"' and undoes all the changes from the bad commit.",
        "The original commit is still in history. Nothing was erased. Revert is safe for shared branches because it adds, never deletes.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Revert already committed locally. Push the commit so the team gets the fix",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "Revert created the commit automatically, but it's only on YOUR machine. Push it to origin so Junior Dev can pull it. git push is still your job — revert only saves you from typing git add + git commit.",
        "Think of it as: revert = git add + git commit (automatic). Push = still manual. Two separate things.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes to get the reverted code",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev reverted the bad commit and pushed. Pull to get the clean code.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

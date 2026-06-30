import type { Scenario } from "../types"

export const REVERT_COMMIT: Scenario = {
  id: "revert-commit",
  phase: "4.2",
  title: "git revert",
  description: "Revert a commit safely — creates a new commit that undoes the specified commit's changes.",
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
        "git revert <hash> creates a NEW commit that undoes the changes from the specified commit. Unlike reset, the history stays intact.",
        "This is the SAFE way to undo a commit — especially on shared branches where rewriting history would break your teammates' repos.",
        "Run: git revert e5f6g7h",
      ],
    },
    {
      actor: "A",
      instruction: "View the log again to see the new revert commit",
      match: (p) => p.type === "log",
      hints: [
        "After revert, the log should show a third commit that says 'Revert \"Add debug logging\"'.",
        "The original commit is still there — we didn't delete it. We added a new commit that undoes its changes. This is why revert is safe for shared branches.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Push the revert commit to the shared repository so the team gets the fix",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The revert commit is only local. Push it to origin so Junior Dev and the rest of the team get the fix.",
        "Use git push to upload your commits to the remote repository.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes to get the reverted code",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev reverted the bad commit and pushed. Pull to get the fix.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

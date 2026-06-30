import type { Scenario } from "../types"

export const AMEND_COMMIT: Scenario = {
  id: "amend-commit",
  phase: "4.4",
  title: "Amending Commits",
  description: "Fix the last commit's message using git commit --amend.",
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
    state.localA.staged = []
    state.localA.workingDirChanges = []
    state.localA.existingFiles = ["README.md"]
    state.origin.branches.main = [initCommit]
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
      instruction: "Check the log to see your current commit message",
      match: (p) => p.type === "log",
      hints: [
        "Look at the commit message. It says 'Initial commit' but we want something more descriptive.",
        "git log shows the commit with its message. We'll fix it with --amend.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Oops, the commit message is too vague. Amend it to be more descriptive",
      match: (p) => p.type === "commit" && p.amend === true,
      hints: [
        "git commit --amend replaces the last commit's message without creating a new commit.",
        "Unlike revert which adds a new commit, --amend rewrites the most recent commit. Only use it on commits that haven't been pushed yet.",
        "Run: git commit --amend -m 'Initial commit — setup project structure with README'",
      ],
    },
    {
      actor: "A",
      instruction: "Check the log again to confirm the message changed",
      match: (p) => p.type === "log",
      hints: [
        "The commit hash should be the same but the message should be updated to your new message.",
        "git log should now show your amended message. The original 'Initial commit' message is replaced — no new commit was created.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Push the amended commit to the shared repository so the team sees the corrected message",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The commit message is fixed. Push it to origin so Junior Dev can see the updated message.",
        "Use git push to upload your commits to the remote repository.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes to see the corrected commit message",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev amended the commit and pushed. Pull to see the updated commit message.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

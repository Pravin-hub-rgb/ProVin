import type { Scenario } from "../types"

export const DELETE_BRANCH: Scenario = {
  id: "delete-branch",
  phase: "2.6",
  title: "Deleting Branches After Merge",
  description: "After a feature branch is merged and pushed, clean it up from both GitHub (remote) and your local machine.",
  setup: (state) => {
    const now = Date.now()
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: now - 7200000,
      parents: [] as string[],
    }
    const featureCommit = {
      hash: "f8e7d6c",
      message: "Add contact form",
      author: "dev-a" as const,
      timestamp: now - 3600000,
      parents: [initCommit.hash],
    }
    // Local machine: both main and feature/done exist
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[featureCommit.hash] = featureCommit
    state.localA.branches.main = [initCommit.hash, featureCommit.hash]
    state.localA.branches["feature/done"] = [initCommit.hash, featureCommit.hash]
    state.localA.currentBranch = "main"
    state.localA.existingFiles = ["README.md", "contact.html"]

    // Remote (GitHub): the same branches exist there too
    state.origin.branches.main = [initCommit, featureCommit]
    state.origin.branches["feature/done"] = [initCommit, featureCommit]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "List ALL branches (local + remote) to see where feature/done lives",
      match: (p) => p.type === "branch" && p.flag === "-a",
      hints: [
        "Your branch exists in TWO places. Use git branch -a to see both at once.",
        "Local branches have no prefix. Remote branches show as remotes/origin/<name>. You'll see feature/done in both places.",
        "Run: git branch -a",
      ],
    },
    {
      actor: "A",
      instruction: "Check which remote branches are merged into main and safe to delete",
      match: (p) => p.type === "branch" && p.flag === "-r" && p.mergedBase === "main",
      hints: [
        "Use git branch -r --merged main to check which remote branches are safe to clean up on GitHub.",
        "feature/done is merged — it shows up in the list, meaning all its commits are already in main.",
        "Run: git branch -r --merged main",
      ],
    },
    {
      actor: "A",
      instruction: "Delete the remote branch feature/done from GitHub",
      match: (p) => p.type === "delete-remote" && p.branch === "feature/done",
      hints: [
        "The remote branch is on GitHub. Delete it with git push origin --delete.",
        "The --delete flag (or shorthand -d) tells GitHub to remove the branch ref. Watch the origin panel — it disappears.",
        "Run: git push origin --delete feature/done",
      ],
    },
    {
      actor: "A",
      instruction: "Delete the local branch feature/done",
      match: (p) => p.type === "branch" && p.flag === "-d" && p.name === "feature/done",
      hints: [
        "Now delete the local copy. The -d flag (short for --delete) safely refuses if the branch isn't fully merged.",
        "Since feature/done IS merged into main, git branch -d will clean it up.",
        "Run: git branch -d feature/done",
      ],
    },
    {
      actor: "A",
      instruction: "List local branches to confirm feature/done is gone",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Run git branch one more time. feature/done should be gone from your local list.",
        "Only main remains locally. The branch's commits still exist in main's history — you didn't lose any code.",
        "Run: git branch",
      ],
    },
  ],
}

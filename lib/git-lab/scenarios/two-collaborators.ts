import type { Scenario } from "../types"

export const TWO_COLLABORATORS: Scenario = {
  id: "two-collaborators",
  phase: "2.2",
  title: "Two Collaborators Workflow",
  description: "Senior Dev creates a file, commits, and pushes. Junior Dev pulls to see the change.",
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
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.origin.branches.main = [initCommit]
    state.localA.workingDirChanges = ["hello.txt"]
    state.localB.existingFiles = ["README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Stage the new file hello.txt so Git tracks it",
      match: (p) => (p.type === "add" && p.files.includes("hello.txt")) || p.type === "add-all",
      hints: [
        "hello.txt exists on disk but Git isn't tracking it yet. You need to tell Git to start watching it.",
        "Use git add to stage the file so it's ready to be committed.",
        "Run: git add hello.txt",
      ],
    },
    {
      actor: "A",
      instruction: "Commit your staged changes with a message",
      match: (p) => p.type === "commit",
      hints: [
        "The file is staged but not yet saved as a snapshot. Commit it to record it in Git's history.",
        "Use git commit -m with a message describing what you changed.",
        "Run: git commit -m 'Add hello from Senior Dev'",
      ],
    },
    {
      actor: "A",
      instruction: "Upload your commits to the shared repository",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "Your commit is only on your machine. Push it to GitHub so Junior Dev can see it.",
        "Use git push to upload your commits to the remote repository named origin.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Download the latest changes from the team repo",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev pushed a commit. Your local repo is behind — you need to download those changes.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

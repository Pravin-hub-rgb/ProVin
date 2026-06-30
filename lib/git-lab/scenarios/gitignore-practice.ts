import type { Scenario } from "../types"

export const GITIGNORE_PRACTICE: Scenario = {
  id: "gitignore-practice",
  phase: "5.4",
  title: ".gitignore Practice",
  description: "Learn how .gitignore hides generated/transient files from Git's view.",
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
    state.localA.workingDirChanges = [".gitignore", "debug.log", "app.tmp", "important.py"]
    state.localA.existingFiles = ["index.html"]
    state.origin.branches.main = [initCommit]
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.currentBranch = "main"
    state.localB.workingDirChanges = []
    state.localB.existingFiles = ["index.html"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Check what files are in the working directory",
      match: (p) => p.type === "status",
      hints: [
        "See what files are currently in your working directory. debug.log and app.tmp are generated files you don't want to commit.",
        "git status shows all modified/untracked files. Notice .gitignore is already created but its patterns aren't active yet.",
        "Run: git status",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the .gitignore file to activate its ignore patterns",
      match: (p) => p.type === "add" && p.files.includes(".gitignore"),
      hints: [
        ".gitignore contains patterns like *.log and *.tmp. Once we stage it, Git will start honoring those rules.",
        "Use git add .gitignore to stage it.",
        "Run: git add .gitignore",
      ],
    },
    {
      actor: "A",
      instruction: "Run status again — the ignored files should now be hidden",
      match: (p) => p.type === "status",
      hints: [
        "Now that .gitignore is active, debug.log and app.tmp should disappear from the 'Changes not staged' section.",
        "They should appear in a new 'Ignored files' section instead — Git knows about them but won't track them.",
        "Run: git status",
      ],
    },
    {
      actor: "A",
      instruction: "Stage important.py — the real source file you want to commit",
      match: (p) => (p.type === "add" && p.files.includes("important.py")) || p.type === "add-all",
      hints: [
        "debug.log and app.tmp are ignored, but important.py is a real source file that should be committed.",
        "Use git add important.py to stage it.",
        "Run: git add important.py",
      ],
    },
    {
      actor: "A",
      instruction: "Commit everything to save your work",
      match: (p) => p.type === "commit",
      hints: [
        "Both .gitignore and important.py are staged. Commit them together.",
        "Use git commit -m with a message describing both files.",
        "Run: git commit -m 'Add .gitignore and important.py'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the commit to the shared repository so the team gets the ignore rules",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The .gitignore rules and important.py are committed. Push to origin so Junior Dev can use them too.",
        "Use git push to upload your commits to the remote repository.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes to get the .gitignore and important.py files",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev added .gitignore rules and pushed. Pull to get the updated repository.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

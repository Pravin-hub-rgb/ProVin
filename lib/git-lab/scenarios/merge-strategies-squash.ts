import type { Scenario } from "../types"

export const MERGE_STRATEGIES_SQUASH: Scenario = {
  id: "merge-strategies-squash",
  phase: "2.5.2",
  title: "Squash Merge Strategy",
  description: "Create a feature branch, stage and commit your changes, push to GitHub, then merge using the squash and merge strategy that combines all commits into one.",
  setup: (state) => {
    const now = Date.now()
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: now - 7200000,
      parents: [] as string[],
    }
    state.origin.branches.main = [initCommit]
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.branches.main = [initCommit.hash]
    state.localA.branches["feature/navbar"] = [initCommit.hash]
    state.localA.currentBranch = "feature/navbar"
    state.localA.workingDirChanges = ["index.html", "style.css"]
    state.localA.staged = []
    state.localA.existingFiles = ["index.html", "style.css", "README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Check what files were changed on your branch",
      match: (p) => p.type === "status",
      hints: [
        "Use git status to see which files have been modified on your feature branch.",
        "This shows you what's unstaged and what's staged.",
        "Run: git status",
      ],
    },
    {
      actor: "A",
      instruction: "Stage both changed files",
      match: (p) => p.type === "add-all",
      hints: [
        "Stage the files so they're ready to be committed.",
        "Use git add . to stage all changes at once.",
        "Run: git add .",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the staged changes with a descriptive message",
      match: (p) => p.type === "commit",
      hints: [
        "Now that the files are staged, commit them with a message describing what changed.",
        "Use git commit -m with a message like 'Add navbar markup and styles'.",
        "Run: git commit -m \"Add navbar markup and styles\"",
      ],
    },
    {
      actor: "A",
      instruction: "Push your feature branch to GitHub with upstream tracking",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "Your commit is only on your local machine. Push it to GitHub to open a PR.",
        "Use git push -u origin to push a new branch for the first time.",
        "Run: git push -u origin feature/navbar",
      ],
    },
    {
      actor: "A",
      instruction: "Open a Pull Request on GitHub from feature/navbar into main",
      match: (p) => p.type === "pr-create",
      githubAction: "create-pr",
      hints: [
        "Open a PR so you can merge your feature branch using the squash strategy.",
        "Give the PR a title like 'Add navbar' and a brief description.",
        "Create the PR to proceed.",
      ],
      getNextStep: (s) => {
        const pr = s.prs[s.prs.length - 1]
        if (pr) {
          pr.reviews = [...pr.reviews, { author: "dev-a" as const, type: "approve" as const, body: "" }]
          pr.status = "approved"
        }
        return s.scenario.currentStep + 1
      },
    },
    {
      actor: "A",
      instruction: "Switch to main so the merge syncs to your local repo",
      match: (p) => p.type === "switch" && p.branch === "main",
      hints: [
        "You're on feature/navbar. Switch back to main so the merge result syncs to your local repo.",
        "Use git switch main to move to the base branch.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Merge the PR using 'Squash and merge' — your commit gets squashed into 1 on main",
      match: (p) => p.type === "pr-merge" && p.strategy === "squash",
      githubAction: "merge-pr",
      hints: [
        "Click the Merge Pull Request button. In the dropdown, pick 'Squash and merge'.",
        "Squash collapses your commit into a single squashed commit on main.",
        "Select 'Squash and merge', then click Merge Pull Request and Confirm.",
      ],
    },
    {
      actor: "A",
      instruction: "View the log to see the single squashed commit on top of initial commit",
      match: (p) => p.type === "log",
      hints: [
        "Instead of your original commit, you see 1 squashed commit on top of the initial commit.",
        "Use git log to see the clean history.",
        "Run: git log",
      ],
    },
  ],
}

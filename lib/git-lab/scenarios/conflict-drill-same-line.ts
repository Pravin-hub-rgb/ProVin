import type { Scenario } from "../types"

export const CONFLICT_DRILL_SAME_LINE: Scenario = {
  id: "conflict-drill-same-line",
  phase: "3.5.1",
  title: "Drill 1: Same-Line Conflict (CSS)",
  description: "A practice drill where both branches edit the same CSS property on the same line. Choose a side or combine both.",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: Date.now() - 7200000,
      parents: [] as string[],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.branches.main = [initCommit.hash]
    state.localA.currentBranch = "main"
    state.localA.existingFiles = ["style.css", "index.html"]
    state.origin.branches.main = [initCommit]
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.currentBranch = "main"
    state.localB.existingFiles = ["style.css", "index.html"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create and switch to a new branch called feature/update-styles",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true && p.branch === "feature/update-styles",
      hints: [
        "Create a branch to work on CSS changes.",
        "Use git switch -c.",
        "Run: git switch -c feature/update-styles",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the edited style.css on your feature branch",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      hints: [
        "style.css has been edited on this branch. Stage it.",
        "Use git add to mark it ready for commit.",
        "Run: git add style.css",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the styles change",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the staged CSS change.",
        "Use git commit -m with a message.",
        "Run: git commit -m 'Update button styles'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the feature branch to GitHub so the conflict can be resolved in the web editor",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "Your commit is only local. Push the branch to GitHub before switching away.",
        "Use git push -u origin to push a new branch for the first time.",
        "Run: git push -u origin feature/update-styles",
      ],
    },
    {
      actor: "A",
      instruction: "Switch back to main",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "main" && !p.create,
      hints: [
        "Go back to main to make CSS changes there too.",
        "Use git switch main.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Stage a different edit to style.css on main",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      hints: [
        "Edit the same CSS file on main to create a conflict.",
        "Stage the modified file.",
        "Run: git add style.css",
      ],
    },
    {
      actor: "A",
      instruction: "Commit on main",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the CSS edit on main.",
        "Use git commit -m.",
        "Run: git commit -m 'Fix style.css colors'",
      ],
    },
    {
      actor: "A",
      instruction: "Merge feature/update-styles into main — conflict expected",
      match: (p) => p.type === "merge" && p.source === "feature/update-styles",
      hints: [
        "Both branches changed style.css. Merge will detect the conflict.",
        "Use git merge to try combining branches.",
        "Run: git merge feature/update-styles",
      ],
    },
    {
      actor: "A",
      instruction: "Edit style.css to resolve the conflict, then stage it with git add",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      githubAction: "resolve-conflict",
      hints: [
        "The conflict editor shows both versions. Pick which one to keep, or combine both manually.",
        "Choose 'Keep mine', 'Keep theirs', or write a combined version in the conflict editor.",
        "Click 'Mark as Resolved' in the conflict editor to accept your choice and stage the file.",
      ],
    },
    {
      actor: "A",
      instruction: "Commit to complete the merge",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the merge to finalize the resolution.",
        "Use git commit with a message.",
        "Run: git commit -m 'Merge feature/update-styles'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the merged main to the shared repository so the team can see it",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The CSS conflict is resolved and committed. Push main to origin so Junior Dev can pull the latest.",
        "Use git push to upload your commits to the remote repository.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes from origin to sync with Senior Dev",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev pushed the resolved merge. Pull it to get the latest style changes.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

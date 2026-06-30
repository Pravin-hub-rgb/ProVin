import type { Scenario } from "../types"

export const CONFLICT_DRILL_WHITESPACE: Scenario = {
  id: "conflict-drill-whitespace",
  phase: "3.5.3",
  title: "Drill 3: Whitespace/Formatting Conflict",
  description: "Both branches reformatted the same file differently. Practice resolving a whitespace-only conflict.",
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
      instruction: "Create and switch to a new branch called feature/reformat",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true && p.branch === "feature/reformat",
      hints: [
        "Create a branch where you'll reformat style.css.",
        "Use git switch -c.",
        "Run: git switch -c feature/reformat",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the reformatted style.css on this branch",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      hints: [
        "style.css has been reformatted on this branch. Stage the changes.",
        "Use git add to mark the file ready for commit.",
        "Run: git add style.css",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the reformatted styles",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the reformatted CSS file.",
        "Use git commit -m with a descriptive message.",
        "Run: git commit -m 'Reformat style.css'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the feature branch to GitHub",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "Push the reformat branch to origin so it's visible to the team.",
        "Use git push -u origin for the first push.",
        "Run: git push -u origin feature/reformat",
      ],
    },
    {
      actor: "A",
      instruction: "Switch back to main",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "main" && !p.create,
      hints: [
        "Go back to main to reformat style.css differently.",
        "Use git switch main.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Stage a different reformatting of style.css on main",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      hints: [
        "style.css on main has been reformatted with different indentation. Stage it to create the conflict.",
        "Stage the modified style.css.",
        "Run: git add style.css",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the main reformatting",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the different reformatting on main.",
        "Use git commit -m.",
        "Run: git commit -m 'Reformat differently'",
      ],
    },
    {
      actor: "A",
      instruction: "Merge feature/reformat into main — expect a whitespace conflict",
      match: (p) => p.type === "merge" && p.source === "feature/reformat",
      hints: [
        "Both branches reformatted style.css with different whitespace. Merge will detect the conflict.",
        "Use git merge to combine the branches.",
        "Run: git merge feature/reformat",
      ],
    },
    {
      actor: "A",
      instruction: "Resolve the whitespace conflict — choose formatting or combine",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      githubAction: "resolve-conflict",
      hints: [
        "The conflict editor shows both formatting styles. Pick which one to keep, or combine both manually.",
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
        "Run: git commit -m 'Merge feature/reformat'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the merged main to the shared repository",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The merge is committed. Push main to origin so Junior Dev can pull the latest.",
        "Use git push to upload your commits.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes from origin to sync with Senior Dev",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev pushed the resolved merge. Pull it to get the latest changes.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

import type { Scenario } from "../types"

export const CONFLICT_GITHUB: Scenario = {
  id: "conflict-github",
  phase: "3.4",
  title: "Resolving Conflicts via GitHub Web Editor",
  description: "Same conflict scenario as 3.3, but resolve using GitHub's in-browser conflict editor.",
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
    state.localA.existingFiles = ["README.md"]
    state.origin.branches.main = [initCommit]
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.currentBranch = "main"
    state.localB.existingFiles = ["README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create and switch to a new branch called feature/update-readme",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true && p.branch === "feature/update-readme",
      hints: [
        "Make a branch to work on README changes.",
        "Use git switch -c to create and switch in one command.",
        "Run: git switch -c feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the edited README file on your feature branch",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      hints: [
        "You've edited README.md on this branch. Stage it.",
        "Use git add to mark the file as ready to commit.",
        "Run: git add README.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit on the feature branch",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the staged change with a message.",
        "Use git commit -m with a descriptive message.",
        "Run: git commit -m 'Update README for new feature'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the feature branch to GitHub so the conflict can be resolved in the web editor",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "Your commit is only local. Push the feature branch to GitHub so it's visible in the web editor.",
        "Use git push -u origin to push a new branch for the first time.",
        "Run: git push -u origin feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Switch back to main",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "main" && !p.create,
      hints: [
        "Go back to main to make edits there too.",
        "Use git switch to move back to main.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Stage a different edit to README.md on main",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      hints: [
        "Edit the SAME file on main to create the conflict.",
        "Stage the modified README with git add.",
        "Run: git add README.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the change on main",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the edit on main.",
        "Use git commit -m with a message.",
        "Run: git commit -m 'Fix README formatting'",
      ],
    },
    {
      actor: "A",
      instruction: "Merge feature/update-readme into main — this will trigger a conflict",
      match: (p) => p.type === "merge" && p.source === "feature/update-readme",
      hints: [
        "Both branches changed the same file. Merge will detect the conflict.",
        "Use git merge to try to combine branches.",
        "Run: git merge feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Resolve the conflict in GitHub's web conflict editor",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      githubAction: "resolve-conflict",
      hints: [
        "On GitHub.com, open the PR with the conflict and click 'Resolve conflicts'.",
        "The web editor shows the conflict with markers. Edit the file to pick the right content, then click 'Mark as resolved'.",
        "Click 'Mark as Resolved' in the modal to finalize your choice.",
      ],
    },
    {
      actor: "A",
      instruction: "Commit to complete the merge",
      match: (p) => p.type === "commit",
      hints: [
        "The conflict is resolved on GitHub. Now commit to complete the merge.",
        "Use git commit with a message.",
        "Run: git commit -m 'Merge feature/update-readme'",
      ],
    },
    {
      actor: "A",
      instruction: "Check the log to see the merge commit",
      match: (p) => p.type === "log",
      hints: [
        "The merge commit should appear with two parents — one from main, one from the feature branch.",
        "Both sets of changes are now in main. The conflict is fully resolved.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Push the merged main to the shared repository so the team can see it",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The conflict is resolved on GitHub and committed on main. Push it to origin so Junior Dev can sync.",
        "Use git push to upload your commits to the remote repository.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes from origin to sync with Senior Dev",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev pushed the merged main. Pull it to get the resolved code with both sets of changes.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

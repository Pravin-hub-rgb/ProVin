import type { Scenario } from "../types"

export const CONFLICT_LOCAL: Scenario = {
  id: "conflict-local",
  phase: "3.3",
  title: "Resolving Conflicts Locally",
  description: "Two branches edit the same file. Merge triggers a conflict. Resolve by staging and committing.",
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
        "Make a branch to work on README changes so main stays clean.",
        "Use git switch -c to create and switch in one command.",
        "Run: git switch -c feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the edited README file on your feature branch",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      hints: [
        "You've edited README.md on this branch. Stage it so Git tracks the change.",
        "Use git add to mark the file as ready to commit.",
        "Run: git add README.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit your changes on the feature branch",
      match: (p) => p.type === "commit",
      hints: [
        "The file is staged. Commit it with a message describing your change.",
        "Use git commit -m with a descriptive message.",
        "Run: git commit -m 'Update README for new feature'",
      ],
    },
    {
      actor: "A",
      instruction: "Switch back to the main branch",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "main" && !p.create,
      hints: [
        "Go back to main to make changes there too. This will create the conflict.",
        "Use git switch to move back to the existing main branch.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Stage a different edit to README.md on main",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      hints: [
        "Now edit the SAME file on main. This is what creates the conflict — two branches both changed the same file.",
        "Stage the modified README with git add.",
        "Run: git add README.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit your change on main",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the edit on main with a message about what you changed.",
        "Use git commit -m with a message.",
        "Run: git commit -m 'Fix README formatting'",
      ],
    },
    {
      actor: "A",
      instruction: "Merge feature/update-readme into main — this will trigger a conflict",
      match: (p) => p.type === "merge" && p.source === "feature/update-readme",
      hints: [
        "Your feature branch changed README.md AND main also changed it. Git can't decide which version wins — that's a conflict.",
        "Use git merge to try to combine the branches. Git will stop and ask you to resolve.",
        "Run: git merge feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Edit README.md to resolve the conflict, then stage it with git add",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      githubAction: "resolve-conflict",
      hints: [
        "The conflict editor shows both versions. Pick which one to keep — main's version or the feature branch's version.",
        "Choose 'Keep mine' or 'Keep theirs' in the conflict editor, then click 'Mark as Resolved' to stage the file.",
        "Click 'Mark as Resolved' in the conflict editor to accept your choice and stage the file.",
      ],
    },
    {
      actor: "A",
      instruction: "Commit to complete the merge",
      match: (p) => p.type === "commit",
      hints: [
        "Now that the conflict is resolved, commit to complete the merge. Git will create a merge commit with two parents.",
        "Use git commit with a message, or Git's default merge message will be used.",
        "Run: git commit -m 'Merge feature/update-readme'",
      ],
    },
    {
      actor: "A",
      instruction: "Check the log to see the merge commit",
      match: (p) => p.type === "log",
      hints: [
        "git log should show the merge commit with two parent commits — one from main, one from the feature branch.",
        "The conflict is resolved and the merge is complete. Both sets of changes are now in main.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Push the merged main to the shared repository so the team can see it",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The conflict is resolved and committed on main. Push it to origin so Junior Dev can pull the latest.",
        "Use git push to upload your commits to the remote repository.",
        "Run: git push origin main",
      ],
    },
    {
      actor: "B",
      instruction: "Pull the latest changes from origin to sync with Senior Dev",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Senior Dev pushed the merged main with the conflict resolved. Pull it to get the latest code.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
  ],
}

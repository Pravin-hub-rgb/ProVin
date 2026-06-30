import type { Scenario } from "../types"

export const CONFLICT_DRILL_MODIFY_DELETE: Scenario = {
  id: "conflict-drill-modify-delete",
  phase: "3.5.2",
  title: "Drill 2: Modify/Delete Conflict",
  description: "One branch deleted a file while the other modified it. Practice handling a modify/delete conflict.",
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
    state.localA.existingFiles = ["about.md", "index.html"]
    state.origin.branches.main = [initCommit]
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.currentBranch = "main"
    state.localB.existingFiles = ["about.md", "index.html"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create and switch to a new branch called feature/remove-file",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true && p.branch === "feature/remove-file",
      hints: [
        "Create a branch where you'll delete the about.md file.",
        "Use git switch -c.",
        "Run: git switch -c feature/remove-file",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the removal of about.md on this branch",
      match: (p) => (p.type === "add" && p.files.includes("about.md")) || p.type === "add-all",
      hints: [
        "about.md has been deleted. Stage the removal with git add.",
        "Staging a deletion is the same as staging a new file — use git add.",
        "Run: git add about.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the deletion of about.md",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the staged deletion.",
        "Use git commit -m with a descriptive message.",
        "Run: git commit -m 'Remove about.md'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the feature branch to GitHub",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "Push the deletion branch to origin so it's visible to the team.",
        "Use git push -u origin for the first push.",
        "Run: git push -u origin feature/remove-file",
      ],
    },
    {
      actor: "A",
      instruction: "Switch back to main",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "main" && !p.create,
      hints: [
        "Go back to main to make changes on the other side.",
        "Use git switch main.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Stage an edit to about.md on main (it still exists here)",
      match: (p) => (p.type === "add" && p.files.includes("about.md")) || p.type === "add-all",
      hints: [
        "about.md still exists on main. Edit it to create the divergence.",
        "Stage the modified about.md.",
        "Run: git add about.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit the modification on main",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the edit to about.md on main.",
        "Use git commit -m.",
        "Run: git commit -m 'Update about.md content'",
      ],
    },
    {
      actor: "A",
      instruction: "Merge feature/remove-file into main — expect a modify/delete conflict",
      match: (p) => p.type === "merge" && p.source === "feature/remove-file",
      hints: [
        "Main modified about.md while feature/remove-file deleted it. The merge will detect this.",
        "Use git merge to combine the branches.",
        "Run: git merge feature/remove-file",
      ],
    },
    {
      actor: "A",
      instruction: "Resolve the modify/delete conflict — keep the file or accept the deletion",
      match: (p) => (p.type === "add" && p.files.includes("about.md")) || p.type === "add-all",
      githubAction: "resolve-conflict",
      hints: [
        "The conflict editor shows that the file was deleted on one branch and modified on the other. Choose which to keep.",
        "Choose 'Keep this file' to preserve the modification, or 'Accept deletion' to remove it.",
        "Click 'Mark as Resolved' in the conflict editor to accept your choice and stage the result.",
      ],
    },
    {
      actor: "A",
      instruction: "Commit to complete the merge",
      match: (p) => p.type === "commit",
      hints: [
        "Commit the merge to finalize the resolution.",
        "Use git commit with a message.",
        "Run: git commit -m 'Merge feature/remove-file'",
      ],
    },
    {
      actor: "A",
      instruction: "Push the merged main to the shared repository",
      match: (p) => p.type === "push" && (!p.branch || p.branch === "main"),
      hints: [
        "The conflict is resolved and committed. Push main to origin so the team can see it.",
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

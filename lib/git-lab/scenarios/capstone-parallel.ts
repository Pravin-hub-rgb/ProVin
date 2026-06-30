import type { Scenario } from "../types"

export const CAPSTONE_PARALLEL: Scenario = {
  id: "capstone-parallel",
  phase: "6.3",
  title: "Capstone: Parallel Feature Development",
  description: "Two developers each create a feature branch, push, open PRs, review, and merge — a full team workflow simulation.",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit — project skeleton",
      author: "dev-a" as const,
      timestamp: Date.now() - 7200000,
      parents: [] as string[],
    }
    state.origin.branches.main = [initCommit]
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.branches.main = [initCommit.hash]
    state.localA.currentBranch = "main"
    state.localA.existingFiles = ["index.html", "style.css", "README.md"]
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.currentBranch = "main"
    state.localB.existingFiles = ["index.html", "style.css", "README.md"]
    return state
  },
  steps: [
    {
      actor: "B",
      instruction: "Create a feature branch for the links section",
      match: (p) =>
        (p.type === "switch" || p.type === "checkout") && p.create === true,
      hints: [
        "Create a separate branch to work on the links section so main stays clean.",
        "Use git switch -c to create and switch in one command.",
        "Run: git switch -c feature/links-section",
      ],
    },
    {
      actor: "B",
      instruction: "Stage your changes to index.html and style.css",
      match: (p) =>
        (p.type === "add" && (p.files.includes("index.html") || p.files.includes("style.css"))) || p.type === "add-all",
      hints: [
        "You've edited the links section files. Stage them so Git tracks the changes.",
        "Use git add to mark files as ready to commit.",
        "Run: git add index.html style.css",
      ],
    },
    {
      actor: "B",
      instruction: "Commit your work with a descriptive message",
      match: (p) => p.type === "commit",
      hints: [
        "The files are staged. Save a snapshot with a message describing what you built.",
        "Use git commit -m with a message about the links section.",
        "Run: git commit -m 'Add links section with social media cards'",
      ],
    },
    {
      actor: "B",
      instruction: "Push your branch to GitHub with upstream tracking",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "First push to a new branch needs -u so Git remembers where to push next time.",
        "Use git push -u origin <branch-name>.",
        "Run: git push -u origin feature/links-section",
      ],
    },
    {
      actor: "B",
      instruction: "Open a Pull Request for review",
      match: (p) => p.type === "pr-create",
      githubAction: "create-pr",
      hints: [
        "Your branch is on GitHub. Open a PR so the senior dev can review your changes.",
        "Fill in the PR title and description explaining what the links section does.",
        "Create the PR with a title like 'Add links section' and a brief description.",
      ],
    },
    {
      actor: "A",
      instruction: "Review Junior Dev's links section PR",
      match: (p) => p.type === "pr-review",
      githubAction: "review-pr",
      hints: [
        "Open the Pull Request that Junior Dev created. Review the changes.",
        "Check that the links section looks good and follows the project conventions.",
        "Approve the PR if everything looks good.",
      ],
    },
    {
      actor: "A",
      instruction: "Merge the approved PR into main",
      match: (p) => p.type === "pr-merge",
      githubAction: "merge-pr",
      hints: [
        "The PR is approved. Merge it into main to bring the links section into the project.",
        "Click 'Merge pull request' and confirm.",
        "Merge the PR to complete the first feature cycle.",
      ],
    },
    {
      actor: "A",
      instruction: "Create your own feature branch for the hero section",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true,
      hints: [
        "Your main branch is already synced after the merge. Just create a feature branch.",
        "Use git switch -c to create a branch for the hero section.",
        "Run: git switch -c feature/hero-section",
      ],
    },
    {
      actor: "A",
      instruction: "Stage your changes to index.html and style.css for the hero section",
      match: (p) =>
        (p.type === "add" && (p.files.includes("index.html") || p.files.includes("style.css"))) || p.type === "add-all",
      hints: [
        "You've edited index.html and style.css for the hero section. Stage them.",
        "Use git add to mark files ready for commit.",
        "Run: git add index.html style.css",
      ],
    },
    {
      actor: "A",
      instruction: "Commit your hero section work",
      match: (p) => p.type === "commit",
      hints: [
        "The hero section files are staged. Commit with a descriptive message.",
        "Use git commit -m with a message about what you added.",
        "Run: git commit -m 'Add hero section with avatar and tagline'",
      ],
    },
    {
      actor: "A",
      instruction: "Push your feature branch to GitHub",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "Push the hero feature branch with -u for the first time.",
        "Use git push -u origin <branch-name>.",
        "Run: git push -u origin feature/hero-section",
      ],
    },
    {
      actor: "A",
      instruction: "Open a Pull Request for the hero section",
      match: (p) => p.type === "pr-create",
      githubAction: "create-pr",
      hints: [
        "Create a PR for the hero section so Junior Dev can review it.",
        "Give the PR a clear title and description.",
        "Create the PR with a title like 'Add hero section'.",
      ],
    },
    {
      actor: "B",
      instruction: "Review Senior Dev's hero section PR and approve it",
      match: (p) => p.type === "pr-review",
      githubAction: "review-pr",
      hints: [
        "Senior Dev opened a PR for the hero section. Review the changes.",
        "Check that the hero section integrates well with the existing links section.",
        "Approve the PR if everything looks good.",
      ],
    },
    {
      actor: "B",
      instruction: "Merge the hero section PR into main",
      match: (p) => p.type === "pr-merge",
      githubAction: "merge-pr",
      hints: [
        "The hero section PR is approved. Merge it to complete the feature.",
        "Click 'Merge pull request' and confirm.",
        "Merge the PR to finalize the team workflow.",
      ],
    },
  ],
}

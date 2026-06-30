import type { Scenario } from "../types"

export const BRANCH_AND_PR: Scenario = {
  id: "branch-and-pr",
  phase: "2.3",
  title: "Full PR Workflow: Branch → Push → PR → Review → Merge",
  description: "Junior Dev pulls, branches, commits, pushes, and opens a PR. Senior Dev reviews, requests changes (or approves), then merges.",
  setup: (state) => {
    const now = Date.now()
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: now - 3600000,
      parents: [] as string[],
    }
    // Senior Dev pushed an update to main that Junior Dev hasn't pulled yet
    const seniorCommit = {
      hash: "e5f6g7h",
      message: "Add navigation menu and responsive layout",
      author: "dev-a" as const,
      timestamp: now - 1800000,
      parents: [initCommit.hash],
    }

    // Origin has both commits
    state.origin.branches.main = [initCommit, seniorCommit]

    // Senior Dev is in sync with origin
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[seniorCommit.hash] = seniorCommit
    state.localA.branches.main = [initCommit.hash, seniorCommit.hash]
    state.localA.existingFiles = ["index.html", "README.md"]

    // Junior Dev is one commit behind
    state.localB.allCommits[initCommit.hash] = initCommit
    state.localB.branches.main = [initCommit.hash]
    state.localB.existingFiles = ["index.html", "README.md"]
    return state
  },
  steps: [
    // 0 — pull main
    {
      actor: "B",
      instruction: "Sync your local main with the latest from the team",
      match: (p) => p.type === "pull" && (!p.branch || p.branch === "main"),
      hints: [
        "Before creating a branch, make sure main is up to date so you're branching off the latest code.",
        "Use git pull to fetch and merge the latest commits from origin.",
        "Run: git pull origin main",
      ],
    },
    // 1 — create branch
    {
      actor: "B",
      instruction: "Create a separate workspace for your feature",
      match: (p) =>
        (p.type === "switch" || p.type === "checkout") && p.create === true,
      hints: [
        "Never work directly on main. Create a separate branch for your feature so main stays clean.",
        "Use git switch -c to create and switch to a new branch in one command.",
        "Run: git switch -c feature/add-footer",
      ],
    },
    // 2 — stage
    {
      actor: "B",
      instruction: "Stage the edited index.html so Git tracks the change",
      match: (p) => (p.type === "add" && p.files.includes("index.html")) || p.type === "add-all",
      hints: [
        "You already edited index.html (that step is done for you). Now tell Git to include it in the next commit.",
        "Use git add to mark the modified file as ready to commit.",
        "Run: git add index.html",
      ],
    },
    // 3 — commit
    {
      actor: "B",
      instruction: "Save your work as a commit with a message",
      match: (p) => p.type === "commit",
      hints: [
        "The change is staged. Commit it to save a permanent snapshot with a description of what you did.",
        "Use git commit -m with a message that explains what you added or changed.",
        "Run: git commit -m 'Add footer with social links and copyright'",
      ],
    },
    // 4 — push -u
    {
      actor: "B",
      instruction: "Push your branch to GitHub and set up tracking",
      match: (p) => p.type === "push" && p.setUpstream === true,
      hints: [
        "The first push to a new branch needs -u so Git remembers where to push next time.",
        "Use git push -u origin <branch-name> to push and set the upstream tracking.",
        "Run: git push -u origin feature/add-footer",
      ],
    },
    // 5 — create PR (modal)
    {
      actor: "B",
      instruction: "Open a Pull Request on GitHub so Senior Dev can review your changes",
      match: (p) => p.type === "pr-create",
      githubAction: "create-pr",
      hints: [
        "Your branch is on GitHub. Now you need to open a PR so the team can review it before merging.",
        "On GitHub.com, click 'Compare & pull request', fill in the title and description, then click 'Create pull request'.",
        "Fill in the PR form with a descriptive title and explanation of your changes.",
      ],
    },
    // 6 — review (modal) — first round
    {
      actor: "A",
      instruction: "Review Junior Dev's pull request — approve or request changes",
      match: (p) => p.type === "pr-review",
      githubAction: "review-pr",
      hints: [
        "Go to the Pull Requests tab on GitHub. Open the PR Junior Dev created and review the changes.",
        "Click 'Files changed' to see the diff. Line-by-line review is the standard way to catch bugs.",
        "Submit your review — Approve if it's good, or Request Changes if something needs fixing.",
      ],
      getNextStep: (s) => {
        const pr = s.prs[s.prs.length - 1]
        return pr?.status === "approved" ? 9 : 7
      },
    },
    // 7 — fix and push (terminal)
    {
      actor: "B",
      instruction: "Address the review feedback, commit the fix, and push again",
      match: (p) => p.type === "push",
      hints: [
        "Senior Dev requested changes. Edit your files, stage them, commit, and push the fix back up.",
        "Make the changes, then git add, git commit, and git push to update the PR.",
        "Run: git add index.html && git commit -m 'fix: address review feedback' && git push",
      ],
      getNextStep: () => 8,
    },
    // 8 — re-review (modal) — second round (approve only)
    {
      actor: "A",
      instruction: "Junior Dev addressed the feedback — re-review and approve",
      match: (p) => p.type === "pr-review",
      githubAction: "review-pr",
      hints: [
        "Junior Dev pushed fixes. Check that the requested changes were addressed, then approve.",
        "Open the PR again, verify the new commits address your feedback.",
        "Click Approve to give the green light for merge.",
      ],
      getNextStep: () => 9,
    },
    // 9 — merge (modal)
    {
      actor: "A",
      instruction: "Merge the approved pull request into main",
      match: (p) => p.type === "pr-merge",
      githubAction: "merge-pr",
      hints: [
        "The PR is approved and has no conflicts. It's ready to merge into main.",
        "On GitHub, click 'Merge pull request' then 'Confirm merge'.",
        "Click Merge Pull Request to bring the feature branch changes into main.",
      ],
    },
  ],
}

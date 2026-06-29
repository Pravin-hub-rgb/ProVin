import type { Scenario } from "./types"

// ──────────────────────────────────────────────
// 2.2 — Two Collaborators Workflow
// Chapter flow: create repo (README) → clone both → A: add/commit/push → B: pull
// ──────────────────────────────────────────────
const TWO_COLLABORATORS: Scenario = {
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
      instruction: "Stage the new file so Git tracks it",
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

// ──────────────────────────────────────────────
// 2.3 — The Full Loop: Branch → Push → PR → Review → Approve → Merge
// Chapter flow: pull main → create branch → edit → commit → push -u → (PR on GitHub)
// ──────────────────────────────────────────────
const BRANCH_AND_PR: Scenario = {
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
      instruction: "Stage the edited file so Git tracks the change",
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

// ──────────────────────────────────────────────
// 2.5 — Merge Strategies
// Chapter flow: create branch → add + commit → switch to main → merge
// ──────────────────────────────────────────────
const MERGE_STRATEGIES: Scenario = {
  id: "merge-strategies",
  phase: "2.5",
  title: "Merge Strategies",
  description: "Senior Dev creates a feature branch, commits, then merges it into main.",
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
    state.origin.branches.main = [initCommit]
    state.localA.workingDirChanges = ["README.md"]
    state.localA.existingFiles = ["README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create a separate branch for your README changes",
      match: (p) =>
        (p.type === "switch" || p.type === "checkout") && p.create === true,
      hints: [
        "Create a branch to work on README changes without disturbing the main branch.",
        "Use git switch -c to create and switch to a new branch.",
        "Run: git switch -c feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Stage the modified file",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      hints: [
        "You modified README.md. Stage it so Git includes the change in the next commit.",
        "Use git add to mark the file as ready to commit.",
        "Run: git add README.md",
      ],
    },
    {
      actor: "A",
      instruction: "Commit your change with a message",
      match: (p) => p.type === "commit",
      hints: [
        "The file is staged. Save a snapshot with a message describing what you changed.",
        "Use git commit -m to commit with a descriptive message.",
        "Run: git commit -m 'Update README'",
      ],
    },
    {
      actor: "A",
      instruction: "Go back to the main branch",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "main",
      hints: [
        "To merge your feature branch in, you need to be on the main branch first.",
        "Use git switch (without -c) to move back to the existing main branch.",
        "Run: git switch main",
      ],
    },
    {
      actor: "A",
      instruction: "Bring your feature branch changes into main",
      match: (p) => p.type === "merge",
      hints: [
        "Your feature branch has changes that main doesn't have yet. Merge them in.",
        "Use git merge to combine the feature branch into your current branch (main).",
        "Run: git merge feature/update-readme",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 1.3 — Creating and Switching Branches
// Chapter flow: list → branch → list → switch → list → switch -c → list
// ──────────────────────────────────────────────
const BRANCH_CREATE_SWITCH: Scenario = {
  id: "branch-create-switch",
  phase: "1.3",
  title: "Creating and Switching Branches",
  description: "Practice creating branches with git branch, switching with git switch, and doing both in one command.",
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
    state.origin.branches.main = [initCommit]
    state.localA.existingFiles = ["README.md"]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "List all branches to see what exists",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Before creating anything new, see what branches already exist.",
        "Use git branch with no arguments to list all local branches. The current one has a * next to it.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Create a new branch called 'feature/nav'",
      match: (p) => p.type === "branch" && p.name === "feature/nav",
      hints: [
        "git branch <name> creates a new branch at the current commit. It does NOT switch to it.",
        "The branch is just a lightweight pointer. Run: git branch feature/nav",
        "Run: git branch feature/nav",
      ],
    },
    {
      actor: "A",
      instruction: "List branches again to confirm the new one exists",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Run git branch again. feature/nav should appear in the list while * stays on main.",
        "The new branch exists at the same commit as main. Both point to the same snapshot for now.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Switch to the 'feature/nav' branch",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.branch === "feature/nav" && !p.create,
      hints: [
        "Creating a branch doesn't move you onto it. Use git switch <name> to switch.",
        "git switch updates your working directory to match the branch you're moving to.",
        "Run: git switch feature/nav",
      ],
    },
    {
      actor: "A",
      instruction: "List branches to confirm you're now on feature/nav",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Run git branch. The * should now be next to feature/nav instead of main.",
        "The * tells you which branch is currently active — where new commits will land.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Create and switch to 'feature/header' in one command",
      match: (p) => (p.type === "switch" || p.type === "checkout") && p.create === true && p.branch === "feature/header",
      hints: [
        "Creating then switching is so common Git has a shortcut: switch -c does both in one step.",
        "The -c flag means 'create'. Git creates the branch at your current commit then moves you onto it.",
        "Run: git switch -c feature/header",
      ],
    },
    {
      actor: "A",
      instruction: "List all branches one last time",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "You should now have three branches: main, feature/nav, and feature/header.",
        "The * marks your current branch. You went from 1 to 3 branches — exactly how real projects grow.",
        "Run: git branch",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 1.5 — Keeping Branch Up to Date with Main
// Chapter flow: log → merge main → log
// ──────────────────────────────────────────────
const KEEP_BRANCH_UPDATED: Scenario = {
  id: "keep-branch-updated",
  phase: "1.5",
  title: "Keeping Branch Up to Date with Main",
  description: "Your feature branch is behind main. Merge the latest changes into your branch to stay in sync.",
  setup: (state) => {
    const now = Date.now()
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: now - 7200000,
      parents: [] as string[],
    }
    const mainUpdate = {
      hash: "e5f6g7h",
      message: "Add navigation bar",
      author: "dev-a" as const,
      timestamp: now - 3600000,
      parents: [initCommit.hash],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[mainUpdate.hash] = mainUpdate
    state.localA.branches.main = [initCommit.hash, mainUpdate.hash]
    state.localA.branches["feature/nav"] = [initCommit.hash]
    state.localA.currentBranch = "feature/nav"
    state.localA.existingFiles = ["README.md", "index.html"]
    state.origin.branches.main = [initCommit, mainUpdate]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Check the log to see what commits are on your feature branch",
      match: (p) => p.type === "log",
      hints: [
        "See what commits exist on feature/nav before merging. You should only see the initial commit.",
        "git log lists commits in reverse chronological order. Compare this with main later.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Merge the latest main changes into your feature branch",
      match: (p) => p.type === "merge" && p.source === "main",
      hints: [
        "Your branch was created before main got updated. You need to bring main's new commits in.",
        "While on feature/nav, use git merge main to pull in commits that main has but your branch doesn't.",
        "Run: git merge main",
      ],
    },
    {
      actor: "A",
      instruction: "Verify the merge by checking the log again",
      match: (p) => p.type === "log",
      hints: [
        "Check that main's commits now appear in your branch's history. You should see the merge commit too.",
        "Your branch is now up to date with main — no conflicts, no divergence, just the latest code.",
        "Run: git log",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 2.6 — Deleting Branches After Merge
// Chapter flow: list branches → -d merged → list again
// ──────────────────────────────────────────────
const DELETE_BRANCH: Scenario = {
  id: "delete-branch",
  phase: "2.6",
  title: "Deleting Branches After Merge",
  description: "After a feature branch is merged into main, clean up by deleting the branch locally.",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: Date.now() - 7200000,
      parents: [] as string[],
    }
    const featureCommit = {
      hash: "f8e7d6c",
      message: "Add contact form",
      author: "dev-a" as const,
      timestamp: Date.now() - 3600000,
      parents: [initCommit.hash],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[featureCommit.hash] = featureCommit
    state.localA.branches.main = [initCommit.hash, featureCommit.hash]
    state.localA.branches["feature/done"] = [initCommit.hash, featureCommit.hash]
    state.localA.currentBranch = "main"
    state.localA.existingFiles = ["README.md", "contact.html"]
    state.origin.branches.main = [initCommit, featureCommit]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "List branches to see what exists",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "After a branch is merged, it lingers locally. Check what branches you have.",
        "git branch lists all local branches. feature/done is still there even though it's already been merged into main.",
        "Run: git branch",
      ],
    },
    {
      actor: "A",
      instruction: "Delete the merged branch 'feature/done'",
      match: (p) => p.type === "branch" && p.flag === "-d" && p.name === "feature/done",
      hints: [
        "Once a branch is fully merged into main, it's safe to delete with git branch -d.",
        "The -d flag safely refuses to delete if the branch isn't fully merged. Since feature/done IS merged, it'll clean up.",
        "Run: git branch -d feature/done",
      ],
    },
    {
      actor: "A",
      instruction: "List branches to confirm the branch was deleted",
      match: (p) => p.type === "branch" && !p.name && !p.flag,
      hints: [
        "Run git branch one more time. feature/done should be gone.",
        "Only main remains. The branch is deleted but its commits still exist in main's history.",
        "Run: git branch",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 4.1 — git reset: Soft, Mixed, Hard
// Chapter flow: log → soft → status → mixed → status → hard → log
// ──────────────────────────────────────────────
const RESET_MODES: Scenario = {
  id: "reset-modes",
  phase: "4.1",
  title: "git reset: Soft, Mixed, Hard",
  description: "Practice all three git reset modes — soft (keep staged), mixed (unstage), and hard (discard all).",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: Date.now() - 7200000,
      parents: [] as string[],
    }
    const commit2 = {
      hash: "e5f6g7h",
      message: "Add README",
      author: "dev-a" as const,
      timestamp: Date.now() - 5400000,
      parents: [initCommit.hash],
    }
    const commit3 = {
      hash: "i8j9k10",
      message: "Add index page",
      author: "dev-a" as const,
      timestamp: Date.now() - 3600000,
      parents: [commit2.hash],
    }
    const commit4 = {
      hash: "l1m2n3o",
      message: "Add contact form",
      author: "dev-a" as const,
      timestamp: Date.now() - 1800000,
      parents: [commit3.hash],
    }
    for (const c of [initCommit, commit2, commit3, commit4]) {
      state.localA.allCommits[c.hash] = c
    }
    state.localA.branches.main = [initCommit.hash, commit2.hash, commit3.hash, commit4.hash]
    state.localA.currentBranch = "main"
    state.localA.staged = []
    state.localA.workingDirChanges = []
    state.localA.existingFiles = ["README.md", "index.html", "contact.html"]
    state.origin.branches.main = [initCommit, commit2, commit3, commit4]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "View the commit history to see all four commits",
      match: (p) => p.type === "log",
      hints: [
        "Start by seeing what commits you have. You should see 4 commits in the log.",
        "git log shows the full history of your current branch. Count the commits.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Soft reset back one commit — this moves the pointer but keeps files staged",
      match: (p) => p.type === "reset" && p.mode === "soft" && p.ref === "HEAD~1",
      hints: [
        "--soft moves the branch pointer back without touching staging or working files. The changes from the undone commit remain staged and ready to recommit.",
        "This is useful when you committed too early and want to refine before recommitting.",
        "Run: git reset --soft HEAD~1",
      ],
    },
    {
      actor: "A",
      instruction: "Run status to see the staged changes from the soft reset",
      match: (p) => p.type === "status",
      hints: [
        "After --soft, the files from the undone commit should still be staged and ready to recommit.",
        "git status shows what's in the staging area. You should see contact.html as staged.",
        "Run: git status",
      ],
    },
    {
      actor: "A",
      instruction: "Mixed reset back one commit — this unstages the changes (default mode)",
      match: (p) => p.type === "reset" && p.mode === "mixed" && p.ref === "HEAD~1",
      hints: [
        "--mixed is the default mode. It moves the branch pointer AND unstages the files. Changes still exist in the working directory.",
        "This is useful when you want to re-think what goes into the next commit — the changes are still there, just not staged.",
        "Run: git reset --mixed HEAD~1",
      ],
    },
    {
      actor: "A",
      instruction: "Run status to see changes are now unstaged but still present",
      match: (p) => p.type === "status",
      hints: [
        "After --mixed, files should be in the working directory (unstaged) but not in staging. They're still on disk, ready to be re-added.",
        "git status shows 'Changes not staged for commit' section — that's where your files should be.",
        "Run: git status",
      ],
    },
    {
      actor: "A",
      instruction: "Hard reset back one commit — this discards everything",
      match: (p) => p.type === "reset" && p.mode === "hard" && p.ref === "HEAD~1",
      hints: [
        "--hard moves the branch pointer and clears both staging AND working directory. All changes from the undone commits are gone.",
        "WARNING: In real projects, --hard is dangerous because changes are permanently discarded. Only use it when you're absolutely sure.",
        "Run: git reset --hard HEAD~1",
      ],
    },
    {
      actor: "A",
      instruction: "Check the log to confirm you're back at the initial commit",
      match: (p) => p.type === "log",
      hints: [
        "After three resets (HEAD~1 each time), you should be back at the initial commit with only 1 commit in the log.",
        "git log should show only 'Initial commit'. The other three commits were removed by the resets.",
        "Run: git log",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 4.2 — git revert
// Chapter flow: log → revert <hash> → log
// ──────────────────────────────────────────────
const REVERT_COMMIT: Scenario = {
  id: "revert-commit",
  phase: "4.2",
  title: "git revert",
  description: "Revert a commit safely — creates a new commit that undoes the specified commit's changes.",
  setup: (state) => {
    const initCommit = {
      hash: "a1b2c3d",
      message: "Initial commit",
      author: "dev-a" as const,
      timestamp: Date.now() - 7200000,
      parents: [] as string[],
    }
    const badCommit = {
      hash: "e5f6g7h",
      message: "Add debug logging",
      author: "dev-a" as const,
      timestamp: Date.now() - 3600000,
      parents: [initCommit.hash],
    }
    state.localA.allCommits[initCommit.hash] = initCommit
    state.localA.allCommits[badCommit.hash] = badCommit
    state.localA.branches.main = [initCommit.hash, badCommit.hash]
    state.localA.currentBranch = "main"
    state.localA.staged = []
    state.localA.workingDirChanges = []
    state.localA.existingFiles = ["README.md"]
    state.origin.branches.main = [initCommit, badCommit]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "View the commit history to see the two commits",
      match: (p) => p.type === "log",
      hints: [
        "See what commits exist. One of them ('Add debug logging') needs to be reverted.",
        "git log shows the commits in reverse order. Note the hash of the second commit e5f6g7h.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Revert the 'Add debug logging' commit (hash: e5f6g7h)",
      match: (p) => p.type === "revert" && p.hash === "e5f6g7h",
      hints: [
        "git revert <hash> creates a NEW commit that undoes the changes from the specified commit. Unlike reset, the history stays intact.",
        "This is the SAFE way to undo a commit — especially on shared branches where rewriting history would break your teammates' repos.",
        "Run: git revert e5f6g7h",
      ],
    },
    {
      actor: "A",
      instruction: "View the log again to see the new revert commit",
      match: (p) => p.type === "log",
      hints: [
        "After revert, the log should show a third commit that says 'Revert \"Add debug logging\"'.",
        "The original commit is still there — we didn't delete it. We added a new commit that undoes its changes. This is why revert is safe for shared branches.",
        "Run: git log",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 4.4 — Amending Commits
// Chapter flow: log → commit --amend → log
// ──────────────────────────────────────────────
const AMEND_COMMIT: Scenario = {
  id: "amend-commit",
  phase: "4.4",
  title: "Amending Commits",
  description: "Fix the last commit's message using git commit --amend.",
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
    state.localA.staged = []
    state.localA.workingDirChanges = []
    state.localA.existingFiles = ["README.md"]
    state.origin.branches.main = [initCommit]
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Check the log to see your current commit message",
      match: (p) => p.type === "log",
      hints: [
        "Look at the commit message. It says 'Initial commit' but we want something more descriptive.",
        "git log shows the commit with its message. We'll fix it with --amend.",
        "Run: git log",
      ],
    },
    {
      actor: "A",
      instruction: "Oops, the commit message is too vague. Amend it to be more descriptive",
      match: (p) => p.type === "commit" && p.amend === true,
      hints: [
        "git commit --amend replaces the last commit's message without creating a new commit.",
        "Unlike revert which adds a new commit, --amend rewrites the most recent commit. Only use it on commits that haven't been pushed yet.",
        "Run: git commit --amend -m 'Initial commit — setup project structure with README'",
      ],
    },
    {
      actor: "A",
      instruction: "Check the log again to confirm the message changed",
      match: (p) => p.type === "log",
      hints: [
        "The commit hash should be the same but the message should be updated to your new message.",
        "git log should now show your amended message. The original 'Initial commit' message is replaced — no new commit was created.",
        "Run: git log",
      ],
    },
  ],
}

// ──────────────────────────────────────────────
// 3.3 — Resolving Conflicts Locally
// Chapter flow: branch → edit → commit → main → edit → commit → merge conflict → resolve → merge commit
// ──────────────────────────────────────────────
const CONFLICT_LOCAL: Scenario = {
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
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create and switch to a new feature branch",
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
      instruction: "Merge the feature branch into main — this will trigger a conflict",
      match: (p) => p.type === "merge" && p.source === "feature/update-readme",
      hints: [
        "Your feature branch changed README.md AND main also changed it. Git can't decide which version wins — that's a conflict.",
        "Use git merge to try to combine the branches. Git will stop and ask you to resolve.",
        "Run: git merge feature/update-readme",
      ],
    },
    {
      actor: "A",
      instruction: "Mark the conflict as resolved by staging the file",
      match: (p) => (p.type === "add" && p.files.includes("README.md")) || p.type === "add-all",
      hints: [
        "In real Git, you'd edit the file to pick the right content. Here, staging the file tells Git you've resolved the conflict.",
        "Use git add README.md to mark the file as resolved.",
        "Run: git add README.md",
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
  ],
}

// ──────────────────────────────────────────────
// 3.4 — Resolving Conflicts via GitHub Web Editor
// Chapter flow: same as 3.3 but resolve via GitHub modal instead of git add
// ──────────────────────────────────────────────
const CONFLICT_GITHUB: Scenario = {
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
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create and switch to a new feature branch",
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
      instruction: "Merge the feature branch — this will trigger a conflict",
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
  ],
}

// ──────────────────────────────────────────────
// 3.5 — Practice Drill: Styles Conflict
// Chapter flow: same as 3.3 but with different file (style.css) for variety
// ──────────────────────────────────────────────
const CONFLICT_DRILL: Scenario = {
  id: "conflict-drill",
  phase: "3.5",
  title: "Practice Drill: Resolve a Styles Conflict",
  description: "Same conflict pattern as before, but with a different file type (CSS). Builds muscle memory.",
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
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Create and switch to a new branch for style updates",
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
      instruction: "Merge the feature branch — conflict expected",
      match: (p) => p.type === "merge" && p.source === "feature/update-styles",
      hints: [
        "Both branches changed style.css. Merge will detect the conflict.",
        "Use git merge to try combining branches.",
        "Run: git merge feature/update-styles",
      ],
    },
    {
      actor: "A",
      instruction: "Resolve the conflict by staging the file",
      match: (p) => (p.type === "add" && p.files.includes("style.css")) || p.type === "add-all",
      hints: [
        "Stage style.css to mark the conflict as resolved.",
        "Use git add style.css.",
        "Run: git add style.css",
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
  ],
}

// ──────────────────────────────────────────────
// 5.4 — .gitignore Practice
// Chapter flow: status (see all files) → stage .gitignore → status (ignored hidden) → commit
// ──────────────────────────────────────────────
const GITIGNORE_PRACTICE: Scenario = {
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
    return state
  },
  steps: [
    {
      actor: "A",
      instruction: "Check git status to see all files in the working directory",
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
      instruction: "Stage the important Python file",
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
  ],
}

// ──────────────────────────────────────────────
// 6.3 — Capstone: Parallel Feature Development
// Chapter flow: two devs each create features → PR → merge → cross-workflow
// ──────────────────────────────────────────────
const CAPSTONE_PARALLEL: Scenario = {
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
      instruction: "Stage your hero section changes",
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

export const scenarios: Scenario[] = [
  BRANCH_CREATE_SWITCH,
  KEEP_BRANCH_UPDATED,
  TWO_COLLABORATORS,
  BRANCH_AND_PR,
  MERGE_STRATEGIES,
  DELETE_BRANCH,
  RESET_MODES,
  REVERT_COMMIT,
  AMEND_COMMIT,
  CONFLICT_LOCAL,
  CONFLICT_GITHUB,
  CONFLICT_DRILL,
  GITIGNORE_PRACTICE,
  CAPSTONE_PARALLEL,
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id)
}

import type { Scenario } from "../types"

export const RESET_MODES: Scenario = {
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

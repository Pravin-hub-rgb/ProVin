import type { Subject } from "../coding-data";

export const gitgithubSubject: Subject = {
  id: "gitgithub",
  title: "Git & GitHub",
  description: "From solo commands to team workflow — Git, GitHub, PRs, conflicts, and recovery",
  lectures: [
    {
      id: "course-roadmap",
      title: "📋 Full Course Structure",
      path: "docs/coding/Git & Github/git-github-team-workflow-course.md",
    },
  ],
  phases: [
    {
      id: "phase0",
      title: "Phase 0 — The Mental Model (No Typing Yet)",
      openByDefault: true,
      lectures: [
        {
          id: "git-0.1",
          title: "0.1 What is Git vs GitHub?",
          path: "docs/coding/Git & Github/Phase 0 - The Mental Model (No Typing Yet)/0.1 What is Git vs GitHub.md",
        },
        {
          id: "git-0.2",
          title: "0.2 Local Repo vs Remote Repo vs origin",
          path: "docs/coding/Git & Github/Phase 0 - The Mental Model (No Typing Yet)/0.2 Local Repo vs Remote Repo vs origin.md",
        },
        {
          id: "git-0.3",
          title: "0.3 The Three Areas: Working Directory, Staging Area, Repository",
          path: "docs/coding/Git & Github/Phase 0 - The Mental Model (No Typing Yet)/0.3 The Three Areas Working Directory, Staging Area, Repository.md",
        },
        {
          id: "git-0.4",
          title: "0.4 fetch vs pull vs push — What's Really Happening",
          path: "docs/coding/Git & Github/Phase 0 - The Mental Model (No Typing Yet)/0.4 fetch vs pull vs push.md",
        },
        {
          id: "git-0.5",
          title: "0.5 Commit Anatomy and History",
          path: "docs/coding/Git & Github/Phase 0 - The Mental Model (No Typing Yet)/0.5 Commit Anatomy and History.md",
        },
      ],
    },
    {
      id: "phase1",
      title: "Phase 1 — Branching, Done Properly",
      openByDefault: false,
      lectures: [
        {
          id: "git-1.1",
          title: "1.1 Why Branches Exist in a Team",
          path: "docs/coding/Git & Github/Phase 1 - Branching, Done Properly/1.1 Why Branches Exist in a Team.md",
        },
        {
          id: "git-1.2",
          title: "1.2 Branch Naming Conventions",
          path: "docs/coding/Git & Github/Phase 1 - Branching, Done Properly/1.2 Branch Naming Conventions.md",
        },
        {
          id: "git-1.3",
          title: "1.3 Creating and Switching Branches",
          path: "docs/coding/Git & Github/Phase 1 - Branching, Done Properly/1.3 Creating and Switching Branches.md",
        },
        {
          id: "git-1.4",
          title: "1.4 Visualizing the Branch Graph",
          path: "docs/coding/Git & Github/Phase 1 - Branching, Done Properly/1.4 Visualizing the Branch Graph.md",
        },
        {
          id: "git-1.5",
          title: "1.5 Keeping Your Branch Up to Date with Main",
          path: "docs/coding/Git & Github/Phase 1 - Branching, Done Properly/1.5 Keeping Your Branch Up to Date with Main.md",
        },
      ],
    },
    {
      id: "phase2",
      title: "Phase 2 — The Pull Request Workflow (The Real \"Team\" Skill)",
      openByDefault: false,
      lectures: [
        {
          id: "git-2.1",
          title: "2.1 What is a Pull Request?",
          path: "docs/coding/Git & Github/Phase 2 - The Pull Request Workflow/2.1 What is a Pull Request, and Why Not Just Merge Locally.md",
        },
        {
          id: "git-2.2",
          title: "2.2 Setting Up Two Accounts as Collaborators",
          path: "docs/coding/Git & Github/Phase 2 - The Pull Request Workflow/2.2 Setting Up Two Accounts as Collaborators.md",
        },
        {
          id: "git-2.3",
          title: "2.3 The Full Loop: Push → Open PR → Review → Approve → Merge",
          path: "docs/coding/Git & Github/Phase 2 - The Pull Request Workflow/2.3 The Full Loop Push Branch → Open PR → Review → Approve → Merge.md",
        },
        {
          id: "git-2.4",
          title: "2.4 Code Review Etiquette",
          path: "docs/coding/Git & Github/Phase 2 - The Pull Request Workflow/2.4 Code Review Etiquette.md",
        },
        {
          id: "git-2.5",
          title: "2.5 Merge Strategies: Merge Commit vs Squash vs Rebase",
          path: "docs/coding/Git & Github/Phase 2 - The Pull Request Workflow/2.5 Merge Strategies Merge Commit vs Squash vs Rebase Merge.md",
        },
        {
          id: "git-2.6",
          title: "2.6 Deleting Branches After Merge",
          path: "docs/coding/Git & Github/Phase 2 - The Pull Request Workflow/2.6 Deleting Branches After Merge.md",
        },
      ],
    },
    {
      id: "phase3",
      title: "Phase 3 — Conflicts, On Purpose",
      openByDefault: false,
      lectures: [
        {
          id: "git-3.1",
          title: "3.1 What Actually Causes a Merge Conflict",
          path: "docs/coding/Git & Github/Phase 3 - Conflicts, On Purpose/3.1 What Actually Causes a Merge Conflict.md",
        },
        {
          id: "git-3.2",
          title: "3.2 Reading Conflict Markers",
          path: "docs/coding/Git & Github/Phase 3 - Conflicts, On Purpose/3.2 Reading Conflict Markers.md",
        },
        {
          id: "git-3.3",
          title: "3.3 Resolving Conflicts Locally",
          path: "docs/coding/Git & Github/Phase 3 - Conflicts, On Purpose/3.3 Resolving Conflicts Locally.md",
        },
        {
          id: "git-3.4",
          title: "3.4 Resolving Conflicts via the GitHub Web Editor",
          path: "docs/coding/Git & Github/Phase 3 - Conflicts, On Purpose/3.4 Resolving Conflicts via the GitHub Web Editor.md",
        },
        {
          id: "git-3.5",
          title: "3.5 Practice Drills: Three Conflict Scenarios",
          path: "docs/coding/Git & Github/Phase 3 - Conflicts, On Purpose/3.5 Practice Drills Three Conflict Scenarios.md",
        },
      ],
    },
    {
      id: "phase4",
      title: "Phase 4 — Undo & Recovery (Your Survival Kit)",
      openByDefault: false,
      lectures: [
        {
          id: "git-4.1",
          title: "4.1 git reset: Soft, Mixed, Hard",
          path: "docs/coding/Git & Github/Phase 4 - Undo and Recovery/4.1 git reset Soft, Mixed, Hard.md",
        },
        {
          id: "git-4.2",
          title: "4.2 git revert",
          path: "docs/coding/Git & Github/Phase 4 - Undo and Recovery/4.2 git revert.md",
        },
        {
          id: "git-4.3",
          title: "4.3 Recovering Lost Work via Reflog",
          path: "docs/coding/Git & Github/Phase 4 - Undo and Recovery/4.3 Recovering Lost Work via Reflog.md",
        },
        {
          id: "git-4.4",
          title: "4.4 Amending Commits",
          path: "docs/coding/Git & Github/Phase 4 - Undo and Recovery/4.4 Amending Commits.md",
        },
        {
          id: "git-4.5",
          title: "4.5 Undoing a Merge",
          path: "docs/coding/Git & Github/Phase 4 - Undo and Recovery/4.5 Undoing a Merge.md",
        },
      ],
    },
    {
      id: "phase5",
      title: "Phase 5 — GitHub Team Features (The Process Layer)",
      openByDefault: false,
      lectures: [
        {
          id: "git-5.1",
          title: "5.1 Issues and Linking PRs to Issues",
          path: "docs/coding/Git & Github/Phase 5 - GitHub Team Features/5.1 Issues and Linking PRs to Issues.md",
        },
        {
          id: "git-5.2",
          title: "5.2 Branch Protection Rules",
          path: "docs/coding/Git & Github/Phase 5 - GitHub Team Features/5.2 Branch Protection Rules.md",
        },
        {
          id: "git-5.3",
          title: "5.3 Status Checks (Lightweight Intro)",
          path: "docs/coding/Git & Github/Phase 5 - GitHub Team Features/5.3 Status Checks Lightweight Intro.md",
        },
        {
          id: "git-5.4",
          title: "5.4 .gitignore and README for Collaboration",
          path: "docs/coding/Git & Github/Phase 5 - GitHub Team Features/5.4 gitignore and README for Collaboration.md",
        },
        {
          id: "git-5.5",
          title: "5.5 Project Boards (Light Intro)",
          path: "docs/coding/Git & Github/Phase 5 - GitHub Team Features/5.5 Project Boards Light Intro.md",
        },
      ],
    },
    {
      id: "phase6",
      title: "Phase 6 — Capstone Project: Simulated 2-Person Team",
      openByDefault: false,
      lectures: [
        {
          id: "git-6.1",
          title: "6.1 Setup",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.1 Setup.md",
        },
        {
          id: "git-6.2",
          title: "6.2 Issue Planning",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.2 Issue Planning.md",
        },
        {
          id: "git-6.3",
          title: "6.3 Parallel Branch Work",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.3 Parallel Branch Work.md",
        },
        {
          id: "git-6.4",
          title: "6.4 Deliberate Conflict Point",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.4 Deliberate Conflict Point.md",
        },
        {
          id: "git-6.5",
          title: "6.5 Continue the Remaining Features",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.5 Continue the Remaining Features.md",
        },
        {
          id: "git-6.6",
          title: "6.6 Simulate a Mistake and Recovery",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.6 Simulate a Mistake and Recovery.md",
        },
        {
          id: "git-6.7",
          title: "6.7 Final Review of the Repo's Story",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.7 Final Review of the Repo Story.md",
        },
        {
          id: "git-6.8",
          title: "6.8 Optional Polish",
          path: "docs/coding/Git & Github/Phase 6 - Capstone Project/6.8 Optional Polish.md",
        },
      ],
    },
    {
      id: "phase7",
      title: "Phase 7 — Real World Git (Troubleshooting, Licenses, & More)",
      openByDefault: false,
      lectures: [
        {
          id: "git-7.1",
          title: "7.1 Troubleshooting Common Git Problems",
          path: "docs/coding/Git & Github/Phase 7 - Real World Git/7.1 Troubleshooting Common Git Problems.md",
        },
        {
          id: "git-7.2",
          title: "7.2 Open Source Licenses (MIT, GPL, Apache, etc.)",
          path: "docs/coding/Git & Github/Phase 7 - Real World Git/7.2 Open Source Licenses.md",
        },
      ],
    },
  ],
};

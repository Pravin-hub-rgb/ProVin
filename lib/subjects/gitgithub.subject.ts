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
  ],
};

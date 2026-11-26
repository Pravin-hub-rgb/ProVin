# Team Task Dashboard: Full Project Document

Frontend project brief, requirements, tech stack and build plan. Version 1.0

## 1. Project Overview

**Team Task Dashboard** is a web app where a manager (Admin) creates projects, breaks them into tasks and assigns them to team members (Employees). Employees move their tasks across a Kanban board as they work. The Admin sees live progress on a dashboard: what is done, what is stuck, what is overdue and who is overloaded.

**The core loop:** Admin assigns, Employee updates status, Admin tracks progress.

**Type of project:** Frontend-only single page app. No backend in v1. All data lives in the browser (Redux Toolkit + redux-persist saving to localStorage). Multiple users are simulated with seeded demo accounts.

**Why this project exists:** It is a portfolio and learning project built the way a real team would build it: requirements first, then design, then tickets, then code. It combines everything from the course: TypeScript, Redux Toolkit, routing with protected routes, Tailwind, testing, error handling and deployment.

## 2. Problem Statement and Goals

### The problem (client's words)

"We are a small team. Right now I assign work over chat and spreadsheets. Nobody knows what is stuck until someone complains. I want one place where I assign work, people update their own status, and I can see progress at a glance."

### Goals

- Give the Admin one place to create projects and assign tasks.
- Let each Employee see only their own work and update it quickly.
- Give the Admin an at-a-glance view of progress, overdue work and workload.
- Keep the app fast, accessible and usable on mobile.

### Non-goals for v1

- Real authentication, real multi-user sync or a backend.
- Email or push notifications.
- File attachments, time tracking, sprints or reports export.

## 3. Users and Roles

| Role | Who they are | What they can do |
| --- | --- | --- |
| **Admin** | Manager or team lead | Create, edit and delete projects. Create, edit, delete and assign tasks. See all tasks and the full dashboard. Manage team members (add or deactivate). |
| **Employee** | Team member | See only tasks assigned to them. Move their tasks across the board. Add comments on their tasks. See their own progress summary. |

**Important note on security:** In v1 roles are enforced in the UI only. Since there is no server, anyone who edits localStorage can bypass them. The README should say this honestly. It shows you understand that real authorization belongs on the backend.

## 4. Main User Flows

### Flow A: Admin creates and assigns work

1. Admin logs in and lands on the Dashboard.
2. Admin opens Projects and clicks New Project (name, description, deadline).
3. Inside the project, Admin clicks New Task (title, description, assignee, priority, due date).
4. The task appears in the To Do column and in the assignee's board.

### Flow B: Employee works on tasks

1. Employee logs in and lands on My Board.
2. Employee sees cards in To Do, In Progress, In Review and Done.
3. Employee drags a card to the next column (or uses a menu on touch and keyboard).
4. Employee opens a card to read details and add a comment.

### Flow C: Admin reviews progress

1. Admin opens the Dashboard.
2. Sees totals by status, overdue tasks, progress per project and tasks per person.
3. Clicks a project or person to drill into their tasks.

## 5. Functional Requirements

### 5.1 Authentication (simulated)

- FR-1: Login page with email and password.
- FR-2: Seeded demo accounts: one Admin and three Employees. Credentials shown on the login page for reviewers.
- FR-3: Session persists across refresh.
- FR-4: Logout clears the session.
- FR-5: Unauthenticated users are redirected to Login.

### 5.2 Role-based access

- FR-6: Admin-only routes (Dashboard, Projects management, Team) are blocked for Employees.
- FR-7: Employees only ever see tasks assigned to them.
- FR-8: Unauthorized access shows a clear "Not allowed" page, not a blank screen.

### 5.3 Projects (Admin)

- FR-9: Create, edit and delete projects (name, description, deadline).
- FR-10: Project list shows task counts and a progress bar.
- FR-11: Deleting a project asks for confirmation and removes its tasks.

### 5.4 Tasks

- FR-12: Create and edit tasks with title, description, project, assignee, priority (Low, Medium, High) and due date.
- FR-13: Statuses: To Do, In Progress, In Review, Done.
- FR-14: Overdue tasks (past due date and not Done) are clearly flagged.
- FR-15: Filter and search tasks by project, assignee, priority and text.
- FR-16: Admin can reassign a task.
- FR-17: Employees can change status and comment but cannot reassign or delete.

### 5.5 Kanban board

- FR-18: Columns for each status with task counts.
- FR-19: Drag and drop cards between columns.
- FR-20: Keyboard and touch alternative to drag and drop (accessibility requirement).
- FR-21: Admin can view any project's full board. Employees see their own board.

### 5.6 Dashboard (Admin)

- FR-22: Summary cards: total tasks, in progress, done, overdue.
- FR-23: Chart of tasks by status.
- FR-24: Progress per project (percent done).
- FR-25: Workload per employee (open tasks count).
- FR-26: List of overdue tasks with quick links.

### 5.7 Comments and activity

- FR-27: Users can comment on tasks they can see.
- FR-28: Each task shows a simple history (created, status changes, reassignment) with timestamps.

### 5.8 Extras (optional in v1)

- Dark mode saved in preferences.
- A "Daily quote" or similar widget using the generic `useFetch<T>` hook against a public API.

## 6. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| **Performance** | First load under 3 seconds on a normal connection. Routes lazy loaded. Lists memoized where it matters. |
| **Accessibility** | Semantic HTML, keyboard navigable, visible focus, labels on all inputs, WCAG AA contrast, drag and drop has a non-drag alternative. |
| **Responsiveness** | Works from 360px mobile up to desktop. Board scrolls horizontally on small screens. |
| **Reliability** | Error boundary around routes. Friendly empty, loading and error states. No white screens. |
| **Security (frontend scope)** | No secrets in the bundle. Only `VITE_` public values. User text rendered safely. Sanitize any HTML. |
| **Maintainability** | Strict TypeScript, no `any`. Consistent folder structure. Lint and format on commit. |
| **Browser support** | Latest Chrome, Edge, Firefox and Safari. |
| **Testing** | Unit tests for slices and selectors. Component tests for key flows. |

## 7. Tech Stack and Why

| Layer | Choice | Why |
| --- | --- | --- |
| Build tool | **Vite** | Fast dev server and builds, zero config. |
| UI library | **React 18/19** | Industry standard, what you have learned. |
| Language | **TypeScript (strict)** | Expected on real teams. Catches bugs early and documents the data model. |
| Global state | **Redux Toolkit** | Predictable state with slices, good for relational data like projects, tasks and users. |
| Persistence | **redux-persist** (localStorage) | Refresh-safe without a backend. Needs serializable-check middleware configured to ignore its actions. |
| Routing | **React Router** | Nested routes, protected and role-based routes, lazy loading. |
| Styling | **Tailwind CSS** | Fast, consistent and responsive. Install it at the start this time so you do not restyle later. |
| Drag and drop | **dnd-kit** | Actively maintained, accessible, keyboard support. Avoid `react-beautiful-dnd`, which is deprecated. |
| Charts | **Recharts** | Simple React chart components for the dashboard. |
| Forms | **React Hook Form + Zod** (optional) | Validation with typed schemas. Plain controlled forms are fine for v1 if you want fewer dependencies. |
| Animation | **Framer Motion** (light use) | Smooth card and modal transitions. Do not overdo it. |
| Testing | **Vitest + React Testing Library + jest-dom** | Fast tests that match Vite. |
| Deploy | **Vercel** | Free, simple, gives you the live link recruiters want. |

**Version note:** Check current versions and docs when you install. Library details change over time.

## 8. Data Model

Keep state **normalized**: store entities by id and reference them by id, instead of nesting. This makes updates simple and fast.

```ts
type Role = "admin" | "employee";
type Status = "todo" | "in_progress" | "in_review" | "done";
type Priority = "low" | "medium" | "high";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;   // demo only, never do this in real apps
  role: Role;
  active: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;   // ISO date
  createdBy: string;  // User id
  createdAt: string;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string | null;
  status: Status;
  priority: Priority;
  dueDate: string;    // ISO date
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  text: string;
  createdAt: string;
}

interface ActivityEntry {
  id: string;
  taskId: string;
  actorId: string;
  type: "created" | "status_changed" | "reassigned" | "edited";
  detail: string;
  createdAt: string;
}
```

**Relationships:** a Project has many Tasks. A Task belongs to one Project and one assignee. A Task has many Comments and ActivityEntries.

## 9. State Management Design

| Slice | Holds | Key actions |
| --- | --- | --- |
| `authSlice` | Current user id and login state | `login`, `logout` |
| `usersSlice` | Team members | `addUser`, `setUserActive` |
| `projectsSlice` | Projects | `addProject`, `updateProject`, `deleteProject` |
| `tasksSlice` | Tasks | `addTask`, `updateTask`, `moveTask`, `assignTask`, `deleteTask` |
| `commentsSlice` | Comments | `addComment` |
| `activitySlice` | History log | `logActivity` |
| `prefsSlice` | Theme and UI preferences | `setTheme` |

**Selectors** (in one file, memoized with `createSelector`): tasks by project, tasks by assignee, overdue tasks, counts by status, progress per project, workload per employee.

**Rule:** components read through selectors and write through dispatching actions. Business rules (who can do what) live in thin helper hooks, not scattered in components.

**Persistence:** persist everything except transient UI state. Add a version number so you can migrate data later.

## 10. Routes and Access

| Route | Page | Access |
| --- | --- | --- |
| `/login` | Login | Public |
| `/` | Redirects by role | Authenticated |
| `/dashboard` | Admin dashboard | Admin |
| `/projects` | Projects list | Admin |
| `/projects/:id` | Project board and details | Admin |
| `/my-board` | Employee's own Kanban board | Employee |
| `/tasks/:id` | Task detail (modal or page) | Admin or the assignee |
| `/team` | Team members | Admin |
| `*` | Not found | Public |

All pages except Login are lazy loaded. A `ProtectedRoute` checks login. A `RoleRoute` (or a `roles` prop) checks the role.

## 11. Folder Structure

```
team-task-dashboard/
├── src/
│   ├── app/               # store.ts, hooks.ts, router
│   ├── features/
│   │   ├── auth/          # slice, Login page, ProtectedRoute
│   │   ├── projects/      # slice, components, pages
│   │   ├── tasks/         # slice, board, task card, task form
│   │   ├── dashboard/     # charts, stat cards, selectors
│   │   └── team/          # users slice, team page
│   ├── components/        # shared UI: Button, Modal, Badge, EmptyState
│   ├── hooks/             # useFetch, useTheme, usePermissions
│   ├── types/             # shared types
│   ├── utils/             # dates, ids, seed data
│   ├── test/              # test setup
│   └── main.tsx
├── vitest.config.ts
└── package.json
```

This is organized **by feature** (everything about tasks in one place), which scales better than putting every component in one folder.

## 12. Scope: v1, Later, Never

### In v1

Two roles, seeded accounts, projects, tasks, Kanban board with drag and drop plus keyboard alternative, admin dashboard with charts, comments, activity log, filters and search, responsive UI, error boundary, tests, deploy.

### Later (v2 ideas)

- A real backend (Node or Supabase) with real auth and multi-user sync.
- An AI feature, such as summarizing project status or suggesting task breakdowns. This needs a small server or serverless function to protect the API key.
- Notifications, due-date reminders, file attachments.
- Export a progress report as PDF or CSV.

### Out of scope

Billing, integrations, full real-time collaboration, native mobile app.

## 13. Build Plan (Tickets)

Each ticket ends in something that runs and can be demoed.

| Ticket | Title | Outcome |
| --- | --- | --- |
| **TD-1** | Project setup | Vite, React, TypeScript, Tailwind, ESLint and Prettier, folder structure, dev server runs. |
| **TD-2** | Types and seed data | All types defined. Seed users, projects and tasks. |
| **TD-3** | Store | Slices, `configureStore`, redux-persist, typed hooks, selectors with unit tests. |
| **TD-4** | Auth and routing | Login, protected and role routes, lazy loading, not-found page, redirects by role. |
| **TD-5** | App layout | Navbar, sidebar, responsive shell, theme toggle. |
| **TD-6** | Projects module | List, create, edit, delete with confirmation. |
| **TD-7** | Tasks module | Task form, validation, assignment, filters and search. |
| **TD-8** | Kanban board | Columns, dnd-kit drag and drop, keyboard alternative, overdue flags. |
| **TD-9** | Task detail | Comments, activity history. |
| **TD-10** | Admin dashboard | Stat cards, charts, progress per project, workload per person. |
| **TD-11** | Polish | Loading, empty and error states, error boundary, light animations, accessibility pass. |
| **TD-12** | Testing | Slice and selector tests, component tests for login and task move. |
| **TD-13** | Deploy and docs | Vercel deploy, README with screenshots, architecture notes and honest limitations. |

## 14. Definition of Done (for every ticket)

- Works on mobile and desktop.
- No TypeScript errors, no `any`, no console errors.
- Loading, empty and error states handled.
- Keyboard usable.
- Relevant tests pass.
- Committed with a clear message.

## 15. Risks and How to Handle Them

| Risk | Mitigation |
| --- | --- |
| Scope creep and never finishing | Freeze v1 scope. New ideas go to the v2 list. |
| Drag and drop is tricky and not accessible | Use dnd-kit and always provide a menu-based "Move to" option. |
| redux-persist warnings and stale data | Configure serializable-check ignores. Version the persisted state. |
| Roles feel fake without a backend | State clearly in the README that this is a UI-level simulation, and describe how a backend would enforce it. |
| Normalized state gets messy | Keep selectors in one place and test them. |
| Getting stuck on styling | Build a few reusable UI components early and reuse them. |

## 16. How to Present It (Resume and Portfolio)

- **Live demo link** and **GitHub link** on your resume. Recruiters click them.
- README with: one-paragraph pitch, screenshots or a short GIF, demo login credentials, tech stack, architecture decisions, and an honest limitations section.
- A resume bullet that states outcomes, for example: "Built a role-based team task dashboard with Kanban board, normalized Redux Toolkit state, protected routes, accessible drag and drop and 80% test coverage on core logic." Only claim numbers that are true.
- Be ready to explain: why normalized state, why Redux Toolkit here, how roles work without a backend, and what you would change with a real server.

## 17. Next Step

From here the role-play can continue in three stages: the client walks through the brief and answers your questions, you write the user stories with acceptance criteria, and then you start TD-1. Tell me when you are ready to begin.

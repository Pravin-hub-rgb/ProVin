# Team Task Dashboard: Software Requirements Specification (SRS)

| | |
|---|---|
| **Version** | 0.1 (draft from client discovery meeting) |
| **Client** | Raj, manager of a small software services team (about 5 people) |
| **Prepared by** | Developer (you) |
| **Status** | Draft, pending client confirmation of the items in Section 11 |

---

## 1. Introduction

### 1.1 Purpose
This document describes what the Team Task Dashboard must do, based on the discovery meeting with the client. It is the agreement between client and developer on *what* will be built, before deciding *how*.

### 1.2 The problem (client's words)
"Right now I assign work over chat and spreadsheets. Nobody knows what is stuck until someone complains. I want one place where I assign work, people update their own status, and I can see progress at a glance."

### 1.3 Product summary
A Kanban-board web app. A manager (Admin) creates projects, breaks them into tasks and assigns them to team members (Employees). Employees move their own tasks across the board. The Admin tracks progress on a live dashboard.

**Core loop:** Admin assigns, Employee updates status, Admin tracks progress.

### 1.3 Goals
- Give the Admin one place to create projects and assign tasks.
- Let each Employee see only their own work and update it quickly.
- Give the Admin an at-a-glance view of progress, overdue work and workload.
- Keep the app fast, accessible and usable on mobile.

### 1.4 Non-goals (version 1)
- Real authentication, real multi-user sync, or a backend server.
- Email or push notifications (including telling an employee a project was deleted).
- File attachments, time tracking, sprints, report export.
- Enforcing task order (for example, "developer cannot start until designer finishes").
- Undo for deletions.

---

## 2. Glossary

| Term | Meaning |
|---|---|
| **Project** | A larger piece of work that groups tasks, for example "Medical Website Frontend". |
| **Task** | A single piece of work inside a project, for example "Design the layout". Belongs to one project and has one assignee. |
| **Assignee** | The employee a task is given to. |
| **Status** | The stage a task is in: To Do, In Progress, In Review, Done. |
| **Kanban board** | A board with one column per status; each task is a card. |
| **Overdue** | Due date is in the past and the task is not Done. This is a flag, not a status. |
| **Deactivate** | Switch a team member off without deleting them. |

---

## 3. Users and Roles

| Role | Who | Summary |
|---|---|---|
| **Admin** | Raj, the manager | Full control: projects, tasks, assignment, approval, dashboard, team. |
| **Employee** | Developers and designers | Sees only their own tasks, moves them within allowed steps, comments. |

### 3.1 Permission matrix

| Action | Admin | Employee |
|---|:---:|:---:|
| Log in / log out | Yes | Yes |
| Create, edit, delete projects | Yes | No |
| Create, edit, delete tasks | Yes | No |
| Assign or reassign a task | Yes | No |
| See all tasks in all projects | Yes | No |
| See only tasks assigned to them | n/a | Yes |
| Open any project's full board | Yes | No |
| Open their own board ("My Board") | n/a | Yes |
| Move task To Do to In Progress | Yes | Yes (own tasks) |
| Move task In Progress to In Review | Yes | Yes (own tasks) |
| Move task back one step | Yes | Yes (own tasks) |
| Move task In Review to **Done** | Yes | **No** |
| Send task from In Review back to In Progress | Yes | Yes (one step back) |
| Comment on a task they can see | Yes | Yes |
| View dashboard | Yes | No |
| View and manage team (add, deactivate) | Yes | No |
| View own progress summary | n/a | Yes |

---

## 4. Main User Flows

### Flow A: Admin creates and assigns work
1. Admin logs in and lands on the Dashboard.
2. Admin opens Projects and creates a New Project (name, description, deadline).
3. Inside the project, Admin creates a New Task (title, description, assignee, priority, due date).
4. The task appears in the **To Do** column of the project board and on the assignee's board.

### Flow B: Employee works on tasks
1. Employee logs in and lands on **My Board**.
2. They see their cards in To Do, In Progress, In Review and Done.
3. They move a card forward (drag, or a "Move to" menu for touch and keyboard).
4. They open a card to read details and add a comment, for example "blocked, waiting for the design".

### Flow C: Admin reviews progress
1. Admin opens the Dashboard.
2. Sees totals, status chart, project progress, workload per person and overdue tasks.
3. Clicks a project or a person to drill into their tasks.
4. Moves reviewed tasks to Done, or sends them back to In Progress.

---

## 5. Functional Requirements

### 5.1 Authentication (simulated)
- **FR-1:** Login page with email and password.
- **FR-2:** Seeded demo accounts: one Admin and three Employees. Credentials are shown on the login page for reviewers.
- **FR-3:** The session persists across page refresh.
- **FR-4:** A logout button clears the session.
- **FR-5:** Unauthenticated users who open any page are redirected to Login.
- **FR-6:** After login, the user is sent to the right screen for their role (Admin: Dashboard, Employee: My Board).

### 5.2 Role-based access
- **FR-7:** Admin-only pages (Dashboard, Projects, Team) are blocked for Employees.
- **FR-8:** Employees only ever see tasks assigned to them.
- **FR-9:** Unauthorized access shows a clear "Not allowed" page, never a blank screen.

### 5.3 Projects (Admin)
- **FR-10:** Create, edit and delete projects (name, description, deadline).
- **FR-11:** The project list shows, for each project: name, progress bar with percent done, task count ("6 of 10 done"), and the deadline. A close or passed deadline is highlighted (for example in red).
- **FR-12:** Project progress is **calculated** from its tasks: `done tasks / total tasks`. It is not stored separately. A project with all tasks Done is complete.
- **FR-13:** Deleting a project shows a clear confirmation ("This will delete the project and all its tasks. Are you sure?").
- **FR-14:** After confirmation, the project and **all** its tasks, comments and history are removed. The tasks disappear from every board, including employees'. No orphaned data remains.

### 5.4 Tasks
- **FR-15:** Create and edit tasks with: title, description, project, assignee, priority, due date.
- **FR-16:** Statuses, in order: **To Do, In Progress, In Review, Done**. A new task starts in To Do.
- **FR-17:** Overdue tasks (past due date and not Done) are flagged with a visible badge on the card, in the overdue list and in the dashboard count. This includes tasks sitting in In Review. The app never changes a task's status automatically.
- **FR-18:** Search tasks by text (matches title and description), updating instantly as the user types.
- **FR-19:** Filter tasks by project, assignee and priority. Filters can be combined. A "Clear filters" button resets everything.
- **FR-20:** Employees get search and priority filter across their own tasks only (no project or person filter).
- **FR-21:** When no tasks match, show a friendly "No tasks found" message.
- **FR-22:** Admin can reassign a task at any time.

### 5.5 Status movement rules
- **FR-23:** Employees can move their own tasks **forward** one step at a time: To Do to In Progress, In Progress to In Review.
- **FR-24:** Employees can move their own tasks **back one step** (for example In Progress to To Do, or In Review to In Progress).
- **FR-25:** Only the Admin can move a task from In Review to **Done** (approval).
- **FR-26:** Admin can send a task back from In Review to In Progress; the employee sees it return to their board.
- **FR-27:** Employees cannot create, delete or reassign tasks.

### 5.6 Kanban board
- **FR-28:** One column per status, each showing a task count.
- **FR-29:** Cards can be dragged between columns.
- **FR-30:** A non-drag alternative exists for touch and keyboard users (a "Move to" menu on each card).
- **FR-31:** A card shows: title, project label, priority, due date, assignee (Admin view) and an overdue badge when relevant.
- **FR-32:** Admin can open the full board of any project. Employees see only their own board, where the project appears as a **label** on the card, not as a page they can enter.
- **FR-33:** Moving a card updates the Admin dashboard numbers and project progress immediately.

### 5.7 Admin dashboard
- **FR-34:** Summary cards: total tasks, in progress, done, overdue.
- **FR-35:** A simple chart (bar or donut) of task count per status. No filters or date ranges in v1.
- **FR-36:** Progress per project: a compact row with name, progress bar with percent, "x of y done", deadline warning. Clicking a row opens that project's full board.
- **FR-37:** Workload per employee: number of open (not Done) tasks per person. Clicking a person opens a page showing only their tasks.
- **FR-38:** A list of overdue tasks, each linking to the task.

### 5.8 Task detail, comments and history
- **FR-39:** Opening a task shows its full details: description, assignee, who assigned it, priority, due date, comments and history.
- **FR-40:** Anyone who can see a task can add comments. Each comment shows author and timestamp.
- **FR-41:** Each task has a read-only history: created, status changes, reassignments, edits, each with who did it and when. History cannot be edited or deleted.

### 5.9 Team management (Admin)
- **FR-42:** Admin can add a team member.
- **FR-43:** Admin can **deactivate** a member instead of deleting them, so their old tasks, comments and history stay intact.

### 5.10 Optional extras (not required for v1)
- Dark mode, saved in preferences.
- A small "daily quote" widget fetched from a public API.

---

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Performance** | First load under 3 seconds on a normal connection. Pages are lazy loaded. |
| **Accessibility** | Semantic HTML, keyboard navigable, visible focus, labels on all inputs, WCAG AA contrast, non-drag alternative for moving cards. |
| **Responsiveness** | Works from 360px (mobile) up to desktop. The board scrolls horizontally on small screens. |
| **Reliability** | Error boundary around routes. Friendly loading, empty and error states. No white screens. |
| **Security (frontend scope)** | No secrets in the bundle. User text rendered safely. Any HTML is sanitized. |
| **Maintainability** | Strict TypeScript with no `any`. Consistent feature-based folder structure. |
| **Browser support** | Latest Chrome, Edge, Firefox and Safari. |
| **Testing** | Unit tests for state logic and selectors. Component tests for login and moving a task. |

---

## 7. Data Requirements

State is **normalized**: each entity is stored once, by id, and referenced by id elsewhere.

| Entity | Key fields |
|---|---|
| **User** | id, name, email, password (demo only), role (admin or employee), active |
| **Project** | id, name, description, deadline, createdBy, createdAt |
| **Task** | id, projectId, title, description, assigneeId, status, priority, dueDate, createdAt, updatedAt |
| **Comment** | id, taskId, authorId, text, createdAt |
| **ActivityEntry** | id, taskId, actorId, type (created, status_changed, reassigned, edited), detail, createdAt |

**Relationships:** a Project has many Tasks. A Task belongs to one Project and one assignee. A Task has many Comments and Activity entries.

**Derived, never stored:** project progress, project completion, overdue flag, counts per status, workload per employee.

---

## 8. Screens and Routes

| Route | Page | Access |
|---|---|---|
| `/login` | Login | Public |
| `/` | Redirects by role | Authenticated |
| `/dashboard` | Admin dashboard | Admin |
| `/projects` | Project list | Admin |
| `/projects/:id` | Project board and details | Admin |
| `/my-board` | Employee's own board | Employee |
| `/tasks/:id` | Task detail | Admin or the assignee |
| `/team` | Team members | Admin |
| `*` | Not found | Public |

The client asked to be able to share a link to a person's task view, so **drilling into an employee opens a page with its own address**, not just a popup.

---

## 9. Constraints and Assumptions

- Frontend-only single page app. All data lives in the browser (localStorage).
- Multiple users are simulated with seeded demo accounts on the same machine. Admin and employees do not see each other's changes live across different computers.
- Roles are enforced in the **UI only**. Anyone who edits browser storage can bypass them. Real authorization would need a backend. This limitation will be stated honestly in the README.
- Passwords are stored in plain text for demo purposes only, which must never be done in a real product.

---

## 10. Scope

| In v1 | Later (v2 ideas) | Out of scope |
|---|---|---|
| Two roles, seeded accounts, projects, tasks, Kanban with keyboard alternative, admin dashboard with chart, comments, history, search and filters, responsive UI, error handling, tests, deployment | Real backend and auth, multi-user sync, notifications and due-date reminders, file attachments, PDF/CSV export, AI project summaries | Billing, third-party integrations, full real-time collaboration, native mobile app |

---

## 11. Open Questions for the Client

These came up during discovery and should be confirmed with Raj before building:

1. **Approval rule:** Raj wants only the Admin to move tasks to Done. The original draft let employees change status freely. Confirm the stricter rule.
2. **Priority scale:** Low / Medium / High (draft) or a 1 to 5 number? Which does Raj prefer?
3. **Task order:** Confirm that tasks do not need to be done in a fixed sequence (for example design before development), and Raj simply sets due dates.
4. **Review stage:** Does Raj always do the review, or should a teammate sometimes be able to review?
5. **Deleted project notice:** Confirm that employees are not notified when a project is deleted (no notifications in v1).
6. **Team size:** Confirm the demo needs 1 Admin and 3 Employees.

---

## 12. Acceptance Criteria (Examples)

These examples show how requirements become testable. Full user stories come next.

- **FR-5:** Given I am not logged in, when I open `/dashboard`, then I am taken to the login page.
- **FR-9:** Given I am an Employee, when I open `/team`, then I see a "Not allowed" page.
- **FR-17:** Given a task is due yesterday and its status is In Review, then it shows an overdue badge and is counted in the dashboard's overdue total.
- **FR-25:** Given I am an Employee and my task is In Review, when I try to move it to Done, then it is not allowed.
- **FR-14:** Given a project with 5 tasks, when the Admin confirms deletion, then the project and all 5 tasks disappear from every board.
- **FR-33:** Given an Employee moves a task to In Review, when the Admin views the dashboard, then the In Review count has gone up by one.

---

## 13. Next Steps

1. Confirm Section 11 questions with the client.
2. Write user stories with acceptance criteria for each requirement.
3. Break the work into tickets (project setup, types and seed data, store, auth and routing, layout, projects, tasks, Kanban, task detail, dashboard, polish, testing, deploy).
4. Start TD-1: project setup.

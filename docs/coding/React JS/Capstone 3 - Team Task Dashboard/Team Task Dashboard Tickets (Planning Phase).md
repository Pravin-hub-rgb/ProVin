# Team Task Dashboard: Tickets (Planning Phase)

*The whole project broken into 13 small, ordered tickets. Each one has a goal, the work to do, and a checklist that says when it is finished.*

---

## 1. Where this fits

| Phase | Result |
| --- | --- |
| Requirements gathering | SRS |
| Design | Data Model, Tech Stack and State Design documents |
| **Planning** | **This document: the tickets** |
| Coding | Working app, one ticket at a time |

A **ticket** is one small, finishable piece of work. Real teams track tickets in tools like Jira or GitHub Issues. Working ticket by ticket stops a big project from feeling impossible: you only ever think about the next one.

**How to work a ticket:**

1. Read the goal and the acceptance criteria first.
2. Create a branch named after the ticket, for example `td-4-auth-routing`.
3. Build only what the ticket asks for.
4. Tick every item in the checklist and the Definition of Done.
5. Commit with a clear message, for example `TD-4: add login and role-based routes`.

---

## 2. Definition of Done (applies to every ticket)

A ticket is **not finished** until all of these are true:

- [ ] Works on a phone (360px wide) and on desktop.
- [ ] No TypeScript errors, and no use of `any`.
- [ ] No errors or warnings in the browser console.
- [ ] Loading, empty and error states are handled where relevant.
- [ ] Usable with the keyboard, with visible focus.
- [ ] Tests for the new logic pass.
- [ ] Committed with a clear message.

---

## 3. The plan at a glance

| # | Ticket | Depends on | Covers (SRS) |
| --- | --- | --- | --- |
| TD-1 | Project setup | none | Foundation |
| TD-2 | Types and seed data | TD-1 | Data model |
| TD-3 | Redux store and selectors | TD-2 | State design |
| TD-4 | Authentication and routing | TD-3 | FR-1 to FR-9 |
| TD-5 | App layout and navigation | TD-4 | Layout, responsive |
| TD-6 | Projects (Admin) | TD-5 | FR-10 to FR-14 |
| TD-7 | Tasks: create, edit, assign, filter | TD-6 | FR-15 to FR-22 |
| TD-8 | Kanban board | TD-7 | FR-23 to FR-33 |
| TD-9 | Task detail, comments and history | TD-8 | FR-39 to FR-41 |
| TD-10 | Admin dashboard | TD-8 | FR-34 to FR-38 |
| TD-11 | Team management | TD-5 | FR-42, FR-43 |
| TD-12 | Polish and accessibility | TD-6 to TD-11 | Non-functional |
| TD-13 | Testing, deploy and docs | all | Delivery |

TD-10 and TD-11 can be done in either order once their dependencies are finished.

---

## 4. The tickets

### TD-1: Project setup

**Goal:** an empty app that runs, with all tools installed and wired.

**Work:**

- Create the project with Vite, React and TypeScript.
- Turn on TypeScript strict mode.
- Install and configure Tailwind CSS.
- Install the libraries from the stack: Redux Toolkit, redux-persist, React Router, dnd-kit, Recharts, Framer Motion, React Hook Form, Zod.
- Install Vitest and React Testing Library, and set up the test command.
- Set up ESLint and Prettier.
- Create the feature-based folder structure.
- Initialize Git and make the first commit.

**Done when:**

- [ ] The dev server starts and shows a placeholder page.
- [ ] `npm run build` creates the `dist` folder without errors.
- [ ] A Tailwind class visibly changes the placeholder page.
- [ ] One sample test runs and passes.

---

### TD-2: Types and seed data

**Goal:** the data model written as TypeScript, plus demo data to work with.

**Work:**

- Write types for `User`, `Project`, `Task`, `Comment` and `ActivityEntry` (exactly the attributes in the Data Model document).
- Write the enums as union types: role, status, priority, activity type.
- Write the seed data: 1 admin, 3 employees, 2 or 3 projects, tasks in all four statuses, at least one overdue task, some comments and history.
- Write small helpers for ids (`nanoid`) and ISO dates.

**Done when:**

- [ ] Every entity has a type, and no `any` appears.
- [ ] Writing an invalid status (such as `"finished"`) shows a TypeScript error.
- [ ] Seed data satisfies the types with no errors.

---

### TD-3: Redux store and selectors

**Goal:** the pretend database, working and saved across refreshes.

**Work:**

- Create the seven slices from the State Design document: users, projects, tasks, comments, activity, auth, prefs.
- Use the normalized shape (`byId` and `allIds`).
- Configure redux-persist with a version number, and the serializable check.
- Load seed data on first run only.
- Write the selectors in one file (lookups, overdue, counts per status, project progress, workload, filtered tasks).
- Write the permission helpers (including `canMoveTask`).
- Write the multi-step thunks (create task, move task, reassign, edit, delete project and its cascade).

**Done when:**

- [ ] Data survives a page refresh.
- [ ] Unit tests cover the selectors (overdue, progress, counts, workload).
- [ ] Unit tests cover `canMoveTask`, including employee In Review to Done being refused.
- [ ] Deleting a project removes its tasks, comments and history.

---

### TD-4: Authentication and routing

**Goal:** log in, stay logged in, and see only what your role allows.

**Work:**

- Build the login page (email and password) with the demo accounts shown.
- Check credentials against the users slice, and block deactivated users.
- Store the session, and add a logout button.
- Set up all routes with lazy loading.
- Build `ProtectedRoute` (must be logged in) and `RoleRoute` (must have the role).
- Redirect after login by role: Admin to the dashboard, Employee to My Board.
- Build the "Not allowed" page and the not-found page.

**Done when:**

- [ ] A logged-out visitor opening any page is sent to login (FR-5).
- [ ] An employee typing `/team` sees "Not allowed" (FR-9).
- [ ] Refreshing the page keeps you logged in (FR-3).
- [ ] A deactivated user cannot log in.
- [ ] A test covers login success and failure.

---

### TD-5: App layout and navigation

**Goal:** the shared shell every page sits inside.

**Work:**

- Build the header, side or top navigation, and a content area.
- Show different menu links by role (Admin: Dashboard, Projects, Team. Employee: My Board).
- Show the current user's name and a logout button.
- Make it responsive: a collapsible menu on a phone.
- Add an error boundary around the routes.
- Add the dark mode toggle (optional extra), saved in prefs.
- Build shared pieces: button, modal, loading spinner, empty state.

**Done when:**

- [ ] The layout works from 360px up to desktop.
- [ ] The menu shows the right links for each role.
- [ ] A deliberately broken page shows a friendly error screen, not a white screen.

---

### TD-6: Projects (Admin)

**Goal:** the admin can manage projects.

**Work:**

- Build the project list: each row shows name, progress bar with percent, "x of y done", and the deadline (highlighted when close or passed).
- Build the create and edit project form (name, description, deadline) with Zod validation.
- Build delete with a clear confirmation: "This will delete the project and all its tasks. Are you sure?"
- Clicking a row opens the project page.

**Done when:**

- [ ] Create, edit and delete all work (FR-10).
- [ ] Progress is calculated from tasks and never stored (FR-12).
- [ ] Deleting needs confirmation, and removes the tasks, comments and history (FR-13, FR-14).
- [ ] An empty project list shows a friendly message.

---

### TD-7: Tasks: create, edit, assign, filter

**Goal:** the admin can create and manage tasks, and everyone can find them.

**Work:**

- Build the create and edit task form: title, description, project, assignee (can be empty), priority, due date.
- Validate with Zod (title required, due date must be valid).
- Support reassigning a task.
- Build instant search (title and description) and filters (project, assignee, priority) that combine, with a Clear filters button.
- Employees get search and the priority filter over their own tasks only.
- Show a friendly "No tasks found" message.

**Done when:**

- [ ] A new task always starts in To Do (FR-16).
- [ ] A task can be created without an assignee.
- [ ] Combined filters work, and Clear resets them.
- [ ] Each create, edit and reassign adds a history entry.

---

### TD-8: Kanban board

**Goal:** the board with four columns and safe card movement.

**Work:**

- Build four columns (To Do, In Progress, In Review, Done) with task counts.
- Build the task card: title, project label, priority, due date, assignee (admin view), overdue badge.
- Add dnd-kit drag and drop between columns.
- Add the "Move to" menu on each card for touch and keyboard users.
- Enforce the movement rules through `canMoveTask`: employees one step at a time on their own tasks, only the admin moves to Done.
- Show a clear message when a move is not allowed.
- Build the admin project board and the employee My Board.

**Done when:**

- [ ] Dragging and the "Move to" menu both work (FR-29, FR-30).
- [ ] An employee cannot move a task to Done (FR-25).
- [ ] An employee sees only their own tasks (FR-8).
- [ ] Every move adds a history entry.
- [ ] Overdue tasks show the badge, including ones in In Review (FR-17).
- [ ] A test covers moving a task.

---

### TD-9: Task detail, comments and history

**Goal:** open a task to read everything about it and talk about it.

**Work:**

- Build the task detail page or window: description, assignee, who assigned it, priority, due date.
- Build the comments list and the add comment box (author and time shown).
- Build the read-only history list from the activity entries.
- Allow access only to the admin or the task's assignee.

**Done when:**

- [ ] Anyone who can see the task can add a comment (FR-40).
- [ ] History shows created, status changes, reassignments and edits, with who and when (FR-41).
- [ ] History cannot be edited or deleted.
- [ ] Opening someone else's task as an employee shows "Not allowed".

---

### TD-10: Admin dashboard

**Goal:** Raj's at-a-glance view.

**Work:**

- Summary cards: total tasks, in progress, done, overdue.
- A Recharts chart of tasks per status.
- Project progress rows, each linking to its project board.
- Workload per employee, each linking to a page with that person's tasks.
- An overdue list, each item linking to the task.

**Done when:**

- [ ] All numbers come from selectors, not stored values.
- [ ] Moving a card on the board changes the dashboard numbers immediately (FR-33).
- [ ] The employee page has its own address, so the link can be shared.
- [ ] Empty data shows friendly messages, not broken charts.

---

### TD-11: Team management

**Goal:** the admin manages the team.

**Work:**

- Build the team list.
- Build the add member form (name, email, password, role) with validation and a unique email check.
- Build deactivate and reactivate (never delete).
- Show deactivated members clearly.

**Done when:**

- [ ] A new member can log in straight away.
- [ ] A deactivated member cannot log in, but their old tasks and comments still show correctly.
- [ ] Duplicate emails are refused with a clear message.

---

### TD-12: Polish and accessibility

**Goal:** make it feel finished and usable by everyone.

**Work:**

- Check keyboard use on every screen, with visible focus.
- Check colour contrast (WCAG AA) in light and dark mode.
- Add labels to all inputs and sensible page titles.
- Add light Framer Motion transitions (cards, modals), kept subtle.
- Check loading, empty and error states on every screen.
- Test on a 360px phone width.
- Make sure user-written text is shown safely.

**Done when:**

- [ ] Every screen can be used with the keyboard alone.
- [ ] No contrast problems are left.
- [ ] No console warnings.
- [ ] The app loads in under 3 seconds on a normal connection.

---

### TD-13: Testing, deploy and docs

**Goal:** prove it works, put it online, and explain it.

**Work:**

- Fill testing gaps: slices, selectors, permission helpers, login, moving a task.
- Deploy to Vercel and check the live link.
- Write the README: what it is, the live link, screenshots, demo logins, the stack, how to run it, and the honest limits.
- Include the honest limits: roles are enforced in the UI only, passwords are plain text for the demo, and there is no real backend.
- List the v2 ideas: real backend and auth, multi-user sync, notifications, attachments, export.

**Done when:**

- [ ] All tests pass.
- [ ] The live link works on a phone and a desktop.
- [ ] A stranger could run the project from the README alone.

---

## 5. Suggested rhythm

| Stage | Tickets | What you will have |
| --- | --- | --- |
| Foundation | TD-1 to TD-3 | Tools, types, and the pretend database |
| Access | TD-4, TD-5 | Login, roles and the app shell |
| Core features | TD-6 to TD-9 | Projects, tasks, board, detail |
| Insight | TD-10, TD-11 | Dashboard and team |
| Finish | TD-12, TD-13 | Polish, tests, live link |

---

## 6. Vocabulary from this document

| Word | Meaning |
| --- | --- |
| **Ticket** | One small, finishable piece of work |
| **Acceptance criteria** | The checklist that says a ticket is finished |
| **Definition of Done** | Rules every ticket must meet, whatever its content |
| **Branch** | A separate line of work in Git, so the main code stays safe |
| **Commit** | A saved snapshot of your work with a message |
| **Dependency** | A ticket that must be finished before another can start |

---

## 7. Next steps

1. Optionally write **user stories** for each ticket ("As an employee, I want to... so that...").
2. Open VS Code and start **TD-1: project setup**.

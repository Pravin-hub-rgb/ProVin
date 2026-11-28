# Team Task Dashboard: Tickets v2 (Vertical Slices)

*The build plan, reordered so that every ticket cuts through data, logic and screen, and ends with something you can see and click. This replaces the earlier layer-by-layer ticket plan.*

|  |  |
| --- | --- |
| **Version** | 2.2 |
| **Approach** | Vertical slicing, with just-in-time slices and installs |
| **Tickets** | 20 (TD-1 to TD-20) |
| **Deploys** | First deploy at TD-5; redeploy at each showable state |
| **Showable** | 1 after TD-5, 2 (MVP) after TD-13, 3 after TD-17, final after TD-20 |

---

## 1. Why vertical, in one minute

**Horizontal slicing** (the old plan) builds one whole layer at a time: all types, then the whole store, then the screens. Nothing is visible until late, and you work blind.

**Vertical slicing** (this plan) builds one small feature through all layers at once. Each slice has three parts:

| Part | Example for "login" |
| --- | --- |
| **Data** | `User` type, `users` slice, seed users |
| **Logic** | check email and password, store `currentUserId` |
| **Screen** | the login page |

Because every ticket ends with a screen, you can test it with your eyes. Slices and types are created **in the ticket whose screen first needs them**, never earlier.

---

## 2. The ordering rules

These rules produced the order below. Use the same rules for your next project.

1. **Walk the chain backwards.** Start from a feature, ask what it needs, then what that needs, until you hit the bottom. The bottom is built first.
2. **Every ticket ends with something visible.** If you cannot see or click the result, the ticket is cut wrongly.
3. **Read before write.** Show seeded data in a list first, then build the forms that create it. You trust the list before you add forms.
4. **Happy path before edge cases.** Make the normal flow work, then handle empty, error and rule-breaking cases.
5. **Just-in-time everything.** Install a library, create a slice or write a type only when the current ticket needs it.
6. **Core loop early.** The heart of the app (admin assigns, employee moves, admin sees) must work as soon as possible. That is the MVP.
7. **Extras late.** Search, filters, polish and dark mode never block the core.
8. **Extract when used twice.** Build a shared component (modal, empty state) the moment a second screen needs it, not before. Do not build a spinner or empty state before any screen uses it.
9. **Name tickets by the visible outcome.** The title should say what you will see, not just the area. This keeps the plan from reading like a phase list.
10. **The early tickets are a dependency chain, not a phase.** Users, login, guards and shell must exist before any feature can show, so they come first. Each one is still a vertical slice with its own screen.
11. **Grow history with each action.** There is no separate activity-log ticket. Log "created" when a task is created, "edited" and "reassigned" when those happen, and "moved" when a card moves. The history list appears as a read-only section on the task detail page once the first entry exists.
12. **Tests live in the ticket.** Every ticket writes the tests for its own logic. There is no end-of-project testing phase.
13. **Deploy early.** First deploy at TD-5, then redeploy at each showable state, so deploy problems surface early and Raj always has a live link.

---

## 3. The dependency chain

Walking backwards from the big features:

| Feature | Needs | Which needs |
| --- | --- | --- |
| Admin dashboard | tasks, projects, users, moving cards | task board, task slice |
| Kanban board | tasks with statuses, assignees, rules | task slice, users, login |
| Tasks | projects (a task stores `projectId`) | project slice |
| Projects | a logged-in admin | auth, roles |
| Roles and guards | knowing who is logged in | auth slice, users |
| Auth | users to check against | users slice, store |
| Store | a project that runs | setup |

Flip it, and the build order falls out: **setup, store and users, login, roles, shell, projects, tasks, board, then the rest.**

This order is forced by dependencies. It is not a phase plan: every step still ends with something you can see and click.

---

## 4. Milestones (showable states)

| Showable | After | What you can show |
| --- | --- | --- |
| **1: Walking skeleton** | TD-5 | Log in as admin or employee, land on the right page inside a real layout, refresh without losing the session. First Vercel deploy. |
| **2: MVP (core loop)** | TD-13 | Admin has projects and tasks; employee logs in, sees only their own board, moves a card with the menu; admin approves to Done. Rules enforced. Redeploy. |
| **3: Full admin view** | TD-17 | History, comments, search and filters, and the dashboard with charts. Redeploy. |
| **Final** | TD-20 | Team management, dark mode, final audit, tests, live link, README. Final deploy. |

At each showable state, show someone (a friend plays Raj) and collect **feedback** before building on. Redeploy to Vercel at each one.

---

## 5. Just-in-time installs

| Install | In ticket |
| --- | --- |
| Vite, React, TypeScript, Tailwind, Oxlint, Prettier | TD-1 |
| Redux Toolkit, react-redux, redux-persist, Vitest, React Testing Library | TD-2 |
| React Router, React Hook Form, Zod | TD-3 |
| dnd-kit | TD-14 |
| Recharts | TD-15 |
| Framer Motion | TD-19 |

---

## 6. The tickets

Each ticket lists: **Depends on**, **Builds** (data, logic, screen), **You will see** (the visual test) and **Done when**.

### TD-1: See a running app with Tailwind

**Depends on:** nothing.

**Builds:** Vite with React and TypeScript (strict mode, no `any`), Tailwind, Oxlint and Prettier, and a Git repository with a first commit. Feature folders are created just-in-time as tickets need them, never upfront and never empty.

**You will see:** a placeholder page styled with a Tailwind class.

**Done when:**

- [ ] The dev server runs.
- [ ] `npm run build` creates `dist` without errors.
- [ ] A Tailwind class visibly changes the placeholder page.

---

### TD-2: See seeded users survive a refresh

**Depends on:** TD-1.

**Builds:**

- *Data:* `User` type (role as a union of `admin` and `employee`), `users` slice stored as an object keyed by id, seed users (1 admin, 3 employees).
- *Logic:* store configured with redux-persist (version 1), `Provider` and `PersistGate`, selector `selectUserById`. Installs Redux Toolkit, react-redux, redux-persist, Vitest and React Testing Library here. **Loading spinner created here (first use), shown by `PersistGate` while persisted data loads.**
- *Screen:* a **temporary** page listing users from the store, with a temporary "add test user" button.

**You will see:** the four seeded users, and a test user that survives a refresh (proof that persistence works).

**Done when:**

- [ ] Seed data loads on first run only.
- [ ] Data survives a refresh.
- [ ] Vitest and React Testing Library installed, and one sample test passes.
- [ ] A unit test covers `selectUserById`.
- [ ] A spinner shows while persisted data loads (no blank flash).

**Watch out:** configure the serializable check to ignore redux-persist actions, or the console fills with warnings.

---

### TD-3: Log in and stay logged in

**Depends on:** TD-2.

**Builds:**

- *Data:* `auth` slice holding `currentUserId` (null when logged out).
- *Logic:* check email and password against users, refuse deactivated users, `selectCurrentUser`, login and logout actions. Installs React Router, React Hook Form and Zod here.
- *Screen:* login page (React Hook Form with a Zod rule, demo accounts shown on the page), a placeholder home reading "Hello, name (role)" with a logout button.

**You will see:** log in as each user, get a clear error for a wrong password, refresh and stay logged in, log out.

**Done when:**

- [ ] Wrong credentials show a friendly message (not a crash).
- [ ] A user with `active: false` cannot log in.
- [ ] Session survives refresh (FR-3).
- [ ] A test covers login success and failure.

**Watch out:** store only the user's **id** in `auth`, never a copy of the user. For the inactive-login test, create the inactive user inside the test; do not add one to seed data.

---

### TD-4: See role-based access in action

**Depends on:** TD-3.

**Builds:**

- *Logic:* `ProtectedRoute` (must be logged in), `RoleRoute` (must have the role), first version of `usePermissions` (is admin, is employee), redirect after login by role.
- *Screen:* placeholder `/dashboard` (admin) and `/my-board` (employee), a "Not allowed" page, a not-found page, lazy loading of pages.

**You will see:** an employee typing `/dashboard` gets "Not allowed"; a logged-out visitor is sent to login.

**Done when:**

- [ ] FR-5, FR-6, FR-7 and FR-9 behave as written.
- [ ] Route guard tests pass.

**Watch out:** hiding a link is not protection. The route check is the protection.

---

### TD-5: See the app shell (walking skeleton)

**Depends on:** TD-4.

**Builds:** header and navigation with links that depend on role, the user's name and a logout button, a responsive menu for 360px, and an error boundary around the routes. The temporary users page is deleted. **First deploy to Vercel here.**

**You will see:** the right menu for each role, a working phone layout, and a friendly error screen when a page is made to crash on purpose.

**Done when:**

- [ ] Works from 360px to desktop.
- [ ] No white screen on a crash.
- [ ] App is live on Vercel.

**Watch out:** single page apps need a rewrite rule on Vercel so refreshing on a deep link like `/dashboard` doesn't 404. Test by refreshing on a deep link after deploying.

**This is the walking skeleton: login to a role page inside a real layout.**

---

### TD-6: See seeded projects in a list

**Depends on:** TD-5.

**Builds:**

- *Data:* `Project` type, `projects` slice, 2 or 3 seeded projects.
- *Screen:* admin project list showing name, description and deadline (highlighted when close or passed), an empty state (empty-state component created here, first use), and rows that open a placeholder `/projects/:id` page.

**You will see:** the seeded projects in a list.

**Done when:**

- [ ] Only the admin can open the list.
- [ ] An empty list shows a friendly message.
- [ ] A test covers the empty state.

**Note:** progress shows as a placeholder until tasks exist (TD-8).

---

### TD-7: Create, edit and delete a project

**Depends on:** TD-6.

**Builds:** a reusable modal (first use; extracted when a second screen needs it), a project form (name required, valid deadline) using React Hook Form and Zod, create and edit actions (`createdBy` is the current user, plus `createdAt`), and delete with a clear confirmation.

**You will see:** create a project and watch it appear; edit it; delete it after the warning.

**Done when:**

- [ ] FR-10 and FR-13 behave as written.
- [ ] Invalid input shows a message under the field.
- [ ] A test covers create and edit.

**Watch out:** the project delete cascade is **incomplete on purpose**. Tasks do not exist yet. It grows in TD-11 and TD-16 (see section 7).

---

### TD-8: See tasks and progress on a project

**Depends on:** TD-7.

**Builds:**

- *Data:* `Task` type (status and priority unions), `tasks` slice, seed tasks covering all four statuses, one overdue, one unassigned and a spread across employees.
- *Logic:* selectors `selectTasksByProject`, `selectOverdueTasks`, `selectProjectProgress` (return 0 when a project has no tasks).
- *Screen:* the project page lists its tasks grouped by status (a plain list, not a board yet), the project list now shows real progress bars and "x of y done", and task rows get an overdue badge.

**You will see:** progress bars, task counts, and a red overdue badge.

**Done when:**

- [ ] Progress is calculated, never stored (FR-12).
- [ ] A task in Done is never overdue, one in Review past its date is.
- [ ] Selector tests cover overdue and progress, including the zero-task case.

---

### TD-9: Create a task

**Depends on:** TD-8.

**Builds:**

- *Data:* `ActivityEntry` type and `activity` slice, created here (first action that logs history).
- *Logic:* task form (title, description, assignee that may be empty, priority, due date) with validation; create always starts in To Do; a `createTask` action that updates tasks **and** adds an activity entry ("created") in one call; assignee dropdown hides deactivated users.
- *Screen:* create-task form, and a basic admin-only `/tasks/:id` detail page showing description, assignee, priority and due date, with a read-only history section that shows the "created" entry right after you create a task.

**You will see:** create a task and watch it appear; open its detail page and see a "created" line in the history section.

**Watch out:** `createTask` must update tasks **and** add an activity entry in one call. That is the first thunk-shaped action (multi-slice update); we'll work it out with the real code when we reach it.

**Done when:**

- [ ] A task can be created without an assignee.
- [ ] FR-15 and FR-16 behave as written.
- [ ] Creating a task adds a "created" history entry, visible on the detail page.
- [ ] A test covers task creation.

---

### TD-10: Edit and reassign a task

**Depends on:** TD-9.

**Builds:**

- *Logic:* edit form with the same fields, reassign action, and `editTask` / `reassignTask` actions that update the task **and** add an activity entry ("edited" / "reassigned") in one call.
- *Screen:* edit task form reachable from the detail page; reassign via the assignee dropdown.

**You will see:** edit a task's fields and reassign it; the detail page reflects the change.

**Done when:**

- [ ] FR-22 behaves as written.
- [ ] Editing or reassigning adds the matching history entry.
- [ ] A test covers edit and reassign.

---

### TD-11: Delete a task and grow the cascade

**Depends on:** TD-10.

**Builds:** delete task with confirmation; project delete now also deletes its tasks and their activity entries. `/tasks/:id` stays admin-only here.

**You will see:** delete a task; delete a project and watch its tasks (and their history) disappear.

**Done when:**

- [ ] Deleting a project leaves no orphan tasks (FR-14, partly).
- [ ] A test covers task deletion.

**Watch out:** the project delete cascade is still incomplete. Comments come in TD-16.

---

### TD-12: See the Kanban board (display only)

**Depends on:** TD-11.

**Builds:**

- *Logic:* selector `selectTasksByAssignee`, and `canSeeTask` added to the permission helper (an employee can only open their own task's `/tasks/:id`).
- *Screen:* four columns with counts, task cards (title, project label, priority, due date, assignee, overdue badge), the admin project board, the employee **My Board**, and `/tasks/:id` opened to the assignee with the `canSeeTask` check.

**You will see:** cards sitting in their columns; an employee sees only their own board and cannot open another employee's task by typing its address.

**Done when:**

- [ ] Four columns with counts render.
- [ ] Cards show every required field and the overdue badge.
- [ ] An employee never sees another employee's task, even by typing its address.
- [ ] A test covers `selectTasksByAssignee` and `canSeeTask`.

**Note:** movement and rules come in TD-13, where Demo 2 and the MVP happen.

---

### TD-13: Move a card with rules and "Move to" menu

**Depends on:** TD-12.

**Builds:**

- *Logic:* `canMoveTask` added to the permission helper (employees move their own tasks one step at a time, only the admin moves to Done, admin can send back), and a `moveTask` action that updates the task **and** adds an activity entry ("moved") in one call.
- *Screen:* a **"Move to" menu** on each card for touch and keyboard, a clear message when a move is refused. No drag library yet.

**You will see:** an employee moves a card forward, tries to move it to Done and is refused; the admin approves it.

**Done when:**

- [ ] FR-23 to FR-28 behave as written.
- [ ] Drag is not required yet; the "Move to" menu works.
- [ ] Moving a card adds a "moved" history entry.
- [ ] A test covers moving a task and the refused move.

---

### TD-14: Drag and drop with dnd-kit

**Depends on:** TD-13.

**Builds:** installs dnd-kit; drag and drop between columns wired to the same `moveTask` action and rules from TD-13.

**You will see:** drag a card between columns; refused moves still show the message.

**Done when:**

- [ ] FR-29 and FR-30 behave as written.
- [ ] Drag and the "Move to" menu both work.
- [ ] A test covers a drag move.

**Note:** drag is an enhancement on top of the MVP from TD-13. The core loop already works there.

---

### TD-15: See the admin dashboard

**Depends on:** TD-14 (needs moving cards to feel real).

**Builds:** Recharts installed here; summary cards (total, in progress, done, overdue), a chart of tasks per status, project progress rows linking to each project, workload per employee linking to a page at its own address (`/team/:userId`) showing only that person's tasks, and an overdue list linking to tasks. Every number comes from a selector.

**You will see:** move a card on the board, go to the dashboard, and watch the numbers change.

**Done when:**

- [ ] FR-33 to FR-38 behave as written.
- [ ] Empty data shows friendly messages, never a broken chart.
- [ ] A test covers the dashboard selectors.

---

### TD-16: Comments on a task

**Depends on:** TD-13.

**Builds:** `Comment` type, `comments` slice, a comment list and add box on the task detail page (author and time shown), visible to anyone who can see the task. Deleting a task or project also removes its comments.

**You will see:** an employee and the admin leave notes on the same task.

**Done when:**

- [ ] FR-40 behaves as written.
- [ ] Empty state shown when there are no comments.
- [ ] A test covers adding a comment.

---

### TD-17: Search and filters

**Depends on:** TD-16.

**Builds:** `selectFilteredTasks`, a filter bar with instant text search (title and description), project, assignee and priority filters that combine, a Clear filters button, a "No tasks found" message. Employees get search and the priority filter over their own tasks only.

**You will see:** type in the box and watch the board shrink; combine filters; clear them.

**Done when:**

- [ ] FR-18 to FR-21 behave as written.
- [ ] A test covers combined filters.

**Demo 3 happens here.**

---

### TD-18: Team management

**Depends on:** TD-5 (can swap with TD-15, TD-16 or TD-17).

**Builds:** the team list, an add member form (unique email check), deactivate and reactivate (never delete), and a clear mark on deactivated members.

**You will see:** add a member and log in as them; deactivate someone and watch their login fail while their old tasks stay intact.

**Done when:**

- [ ] FR-42 and FR-43 behave as written.
- [ ] Duplicate emails are refused with a clear message.
- [ ] A test covers add and deactivate.

---

### TD-19: Dark mode and final audit

**Depends on:** all features.

**Builds:** optional dark mode saved in a `prefs` slice, with a toggle in the shell; a final audit pass (keyboard use with visible focus, contrast WCAG AA, input labels and page titles, 360px phone check, safe rendering of user text, clean console). Light Framer Motion transitions installed here.

**You will see:** toggle dark mode and watch it persist; the final audit finds no issues.

**Done when:**

- [ ] Dark mode toggles and persists.
- [ ] No console warnings.
- [ ] First load is under 3 seconds.

---

### TD-20: Final deploy and docs

**Depends on:** all tickets.

**Builds:** final Vercel deploy, and the README: what it is, live link, screenshots, demo logins, stack, how to run it, and the honest limits (UI-only roles, plain-text demo passwords, no backend), plus the v2 ideas.

**Done when:**

- [ ] All tests pass (each written in its own ticket).
- [ ] The live link works on a phone and a desktop.
- [ ] A stranger can run the project from the README alone.

---

## 7. Planned rework checkpoints

Vertical slicing means you **revisit earlier code on purpose**. This is called refactoring, and it is normal, not a mistake. Here is every place it happens:

| Earlier code | Grows in | What changes |
| --- | --- | --- |
| Project delete (TD-7) | TD-11 and TD-16 | One delete action gradually also removes tasks and their history (TD-11), then comments (TD-16) |
| Progress placeholder (TD-6) | TD-8 | Replaced by the real `selectProjectProgress` |
| Permission helper (TD-4) | TD-12, TD-13 | `canSeeTask` added in TD-12, `canMoveTask` added in TD-13 |
| Admin-only task page (TD-9) | TD-12 | Opened to the assignee with the `canSeeTask` check |
| Plain task actions (TD-9, TD-10, TD-13) | same tickets | Each action logs its own history entry as it is built; no retrofit ticket |
| Temporary users page (TD-2) | TD-5 | Deleted |

Keep these small by keeping each slice small. Add the item to your dev log when you do the rework.

---

## 8. Scenarios we thought through

| Question | Answer |
| --- | --- |
| Why login before projects? | Everything sits behind login, and the role decides what you see |
| Why guards before the shell? | The navigation needs to know who is logged in and their role |
| Why four tickets before any feature screen? | Users, login, guards and shell are themselves vertical slices (each ends with a screen). They are a dependency chain, not a phase, and TD-5 is the walking skeleton |
| Why read before write? | Seed data lets you see real screens at once, and you trust the list before building forms |
| Why tasks read-only before task forms? | The board and progress need data to show; seeds give you that without forms |
| Why split task create, edit and delete? | One ticket covering form, edit, assign, delete, detail page and cascade is too big; each is its own visible slice |
| Why the board display before moving cards? | Read before write: you see the board before you wire movement |
| Why move rules before drag and drop? | Rules and the "Move to" menu work with no library; drag is an enhancement on top |
| Why history grows with each action? | A separate activity-log ticket is an infrastructure retrofit; logging where the action happens keeps slices vertical |
| Why the board before history and comments? | The board is the core loop, so it is the MVP. History and comments extend it |
| Why filters after comments? | Filters work on lists that already exist |
| Why the dashboard after the board? | Its numbers only mean something once cards can move |
| Why team management so late? | The seed team is enough to build everything else. Adding members is an edge feature |
| Why dark mode and audit at the end? | Dark mode is a visible slice, but it never blocks a feature; the audit is a final check, not a layer |
| Why deploy at TD-5 and at each demo? | Deploy problems surface early, and Raj always has a live link |
| Why tests in every ticket? | Saving tests for the end is a testing phase; each ticket proves its own logic |
| Which tickets can swap? | TD-15 with TD-18, and TD-16 with TD-17 |
| A ticket feels too big? | Split it along data, logic and screen, and ship the smaller part first |
| A requirement changes? | Add a new ticket. Do not rewrite finished ones silently |
| Stuck for hours? | Write the problem in the dev log, shrink the ticket, and move to a smaller piece |

---

## 9. Definition of Done (every ticket)

- [ ] Works on a phone (360px) and on desktop.
- [ ] No TypeScript errors, and no `any`.
- [ ] No errors or warnings in the console.
- [ ] Loading, empty and error states handled where relevant.
- [ ] Usable with the keyboard, with visible focus.
- [ ] Tests for the new logic pass (written in this ticket).
- [ ] A dev log entry written if anything went wrong or was learned.
- [ ] Committed with a clear message, for example `TD-9: add task create`.

---

## 10. Template for your next project

Copy this when you write tickets for another app:

1. List the **features** from the SRS.
2. For each, **walk the chain backwards** and write what it needs.
3. Put **setup** first, then the **thing everything depends on** (usually login and users).
4. Pick the **core loop** and make it the first demo.
5. Order the rest: **read before write**, extras last.
6. For each ticket write: Depends on, Builds (data, logic, screen), You will see, Done when.
7. List your **planned rework** so it never surprises you.
8. Name each ticket by the visible outcome, not the area, so the plan never reads like a phase list.
9. Grow shared concerns (history, tests) inside each ticket instead of retrofitting them at the end.
10. Deploy early and redeploy at each demo.

---

## 11. Vocabulary

| Word | Meaning |
| --- | --- |
| **Vertical slice** | One feature built through data, logic and screen |
| **Horizontal slice** | One whole layer built across all features |
| **Walking skeleton** | The thinnest end-to-end version that runs (here, login to a role page) |
| **MVP** | Minimum viable product: the smallest usable version |
| **Milestone / demo** | A point where something working can be shown |
| **Sprint** | A short work cycle that ends with a demo |
| **Just-in-time** | Build or install something only when needed |
| **Refactoring** | Improving earlier code without changing what it does |
| **Cascade** | One delete triggering related deletes |
| **Dependency** | Something that must exist before another thing can be built |
| **Happy path** | The normal flow where nothing goes wrong |

---

## 12. Next steps

1. Read the **Developer Process and Interview Guide** (the overview document).
2. Start a **dev log** file in the project.
3. Begin **TD-1**.
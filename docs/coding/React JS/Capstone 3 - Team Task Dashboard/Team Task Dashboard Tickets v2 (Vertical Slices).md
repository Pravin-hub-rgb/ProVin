# Team Task Dashboard: Tickets v2 (Vertical Slices)

*The build plan, reordered so that every ticket cuts through data, logic and screen, and ends with something you can see and click. This replaces the earlier layer-by-layer ticket plan.*

|  |  |
| --- | --- |
| **Version** | 2.0 |
| **Approach** | Vertical slicing, with just-in-time slices and installs |
| **Tickets** | 17 (TD-1 to TD-17) |
| **Demos** | Demo 1 after TD-5, Demo 2 (the MVP) after TD-10, Demo 3 after TD-14, final after TD-17 |

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
8. **Extract when used twice.** Build a shared component (modal, empty state) the moment a second screen needs it, not before.

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

---

## 4. Milestones (demo points)

| Demo | After | What you can show |
| --- | --- | --- |
| **Demo 1: Walking skeleton** | TD-5 | Log in as admin or employee, land on the right page inside a real layout, refresh without losing the session |
| **Demo 2: MVP (core loop)** | TD-10 | Admin has projects and tasks; employee logs in, sees only their own board, moves a card; admin approves to Done. Rules enforced |
| **Demo 3: Full admin view** | TD-14 | Add history, comments, search and filters, and the dashboard with charts |
| **Final** | TD-17 | Team management, polish, tests, live link, README |

At each demo, show someone (a friend plays Raj) and collect **feedback** before building on.

---

## 5. Just-in-time installs

| Install | In ticket |
| --- | --- |
| Vite, React, TypeScript, Tailwind, ESLint, Prettier, Vitest, React Testing Library | TD-1 |
| Redux Toolkit, react-redux, redux-persist | TD-2 |
| React Router, React Hook Form, Zod | TD-3 |
| dnd-kit | TD-10 |
| Recharts | TD-14 |
| Framer Motion | TD-16 |

---

## 6. The tickets

Each ticket lists: **Depends on**, **Builds** (data, logic, screen), **You will see** (the visual test) and **Done when**.

### TD-1: Project setup

**Depends on:** nothing.

**Builds:** Vite with React and TypeScript (strict mode, no `any`), Tailwind, ESLint and Prettier, Vitest with React Testing Library, the feature-based folders (`features`, `components`, `hooks`, `types`, `utils`), and a Git repository with a first commit.

**You will see:** a placeholder page styled with a Tailwind class.

**Done when:**

- [ ] The dev server runs.
- [ ] `npm run build` creates `dist` without errors.
- [ ] One sample test passes.

---

### TD-2: Store foundation and users

**Depends on:** TD-1.

**Builds:**

- *Data:* `User` type (role as a union of `admin` and `employee`), `users` slice stored as an object keyed by id, seed users (1 admin, 3 employees).
- *Logic:* store configured with redux-persist (version 1), `Provider` and `PersistGate`, selector `selectUserById`.
- *Screen:* a **temporary** page listing users from the store, with a temporary "add test user" button.

**You will see:** the four seeded users, and a test user that survives a refresh (proof that persistence works).

**Done when:**

- [ ] Seed data loads on first run only.
- [ ] Data survives a refresh.
- [ ] A unit test covers `selectUserById`.

**Watch out:** configure the serializable check to ignore redux-persist actions, or the console fills with warnings.

---

### TD-3: Login and session

**Depends on:** TD-2.

**Builds:**

- *Data:* `auth` slice holding `currentUserId` (null when logged out).
- *Logic:* check email and password against users, refuse deactivated users, `selectCurrentUser`, login and logout actions.
- *Screen:* login page (React Hook Form with a Zod rule, demo accounts shown on the page), a placeholder home reading "Hello, name (role)" with a logout button.

**You will see:** log in as each user, get a clear error for a wrong password, refresh and stay logged in, log out.

**Done when:**

- [ ] Wrong credentials show a friendly message (not a crash).
- [ ] A user with `active: false` cannot log in.
- [ ] Session survives refresh (FR-3).
- [ ] A test covers login success and failure.

**Watch out:** store only the user's **id** in `auth`, never a copy of the user.

---

### TD-4: Role-based access

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

### TD-5: App shell

**Depends on:** TD-4.

**Builds:** header and navigation with links that depend on role, the user's name and a logout button, a responsive menu for 360px, an error boundary around the routes, a loading spinner, and an empty-state component. The temporary users page is deleted.

**You will see:** the right menu for each role, a working phone layout, and a friendly error screen when a page is made to crash on purpose.

**Done when:**

- [ ] Works from 360px to desktop.
- [ ] No white screen on a crash.

**Demo 1 happens here.**

---

### TD-6: Projects, read only

**Depends on:** TD-5.

**Builds:**

- *Data:* `Project` type, `projects` slice, 2 or 3 seeded projects.
- *Screen:* admin project list showing name, description and deadline (highlighted when close or passed), an empty state, and rows that open a placeholder `/projects/:id` page.

**You will see:** the seeded projects in a list.

**Done when:**

- [ ] Only the admin can open the list.
- [ ] An empty list shows a friendly message.

**Note:** progress shows as a placeholder until tasks exist (TD-8).

---

### TD-7: Projects, create, edit, delete

**Depends on:** TD-6.

**Builds:** a reusable modal, a project form (name required, valid deadline) using React Hook Form and Zod, create and edit actions (`createdBy` is the current user, plus `createdAt`), and delete with a clear confirmation.

**You will see:** create a project and watch it appear; edit it; delete it after the warning.

**Done when:**

- [ ] FR-10 and FR-13 behave as written.
- [ ] Invalid input shows a message under the field.

**Watch out:** the project delete cascade is **incomplete on purpose**. Tasks do not exist yet. It grows in TD-9, TD-11 and TD-12 (see section 7).

---

### TD-8: Tasks, read only

**Depends on:** TD-7.

**Builds:**

- *Data:* `Task` type (status and priority unions), `tasks` slice, seed tasks covering all four statuses, one overdue, one unassigned and a spread across employees.
- *Logic:* selectors `selectTasksByProject`, `selectOverdueTasks`, `selectProjectProgress` (return 0 when a project has no tasks).
- *Screen:* the project page lists its tasks grouped by status (a plain list, not a board yet), the project list now shows real progress bars and "x of y done", and cards get an overdue badge.

**You will see:** progress bars, task counts, and a red overdue badge.

**Done when:**

- [ ] Progress is calculated, never stored (FR-12).
- [ ] A task in Done is never overdue, one in Review past its date is.
- [ ] Selector tests cover overdue and progress, including the zero-task case.

---

### TD-9: Task create, edit, assign, delete

**Depends on:** TD-8.

**Builds:** a task form (title, description, assignee that may be empty, priority, due date) with validation, create (always starts in To Do), edit, reassign, delete with confirmation, and a basic admin-only `/tasks/:id` detail page. The assignee dropdown hides deactivated users. **Project delete now also deletes its tasks.**

**You will see:** create, edit, assign and delete tasks, and a project delete that takes its tasks away.

**Done when:**

- [ ] A task can be created without an assignee.
- [ ] Deleting a project leaves no orphan tasks (FR-14, partly).
- [ ] FR-15, FR-16 and FR-22 behave as written.

---

### TD-10: Kanban board (the MVP)

**Depends on:** TD-9.

**Builds:**

- *Logic:* `canMoveTask` and `canSeeTask` added to the permission helper (employees move their own tasks one step at a time, only the admin moves to Done, admin can send back), `selectTasksByAssignee`.
- *Screen:* four columns with counts, task cards (title, project label, priority, due date, assignee, overdue badge), drag and drop with dnd-kit, a **"Move to" menu** for touch and keyboard, the admin project board, the employee **My Board**, a clear message when a move is refused, and `/tasks/:id` opened to the assignee with the `canSeeTask` check.

**You will see:** an employee moves a card forward, tries to move it to Done and is refused; the admin approves it.

**Done when:**

- [ ] FR-23 to FR-33 behave as written.
- [ ] An employee never sees another employee's task, even by typing its address.
- [ ] Drag and the "Move to" menu both work.
- [ ] A test covers moving a task and the refused move.

**Demo 2 happens here. This is the MVP.**

---

### TD-11: Activity log and history

**Depends on:** TD-10.

**Builds:**

- *Data:* `ActivityEntry` type, `activity` slice.
- *Logic:* thunks for the multi-step actions (create, edit, reassign, move task) that change the task **and** add a history entry in one call. The screens built in TD-9 and TD-10 are switched to call these thunks. Deleting a task or project now also removes its history.
- *Screen:* a read-only history section on the task detail page.

**You will see:** move a card, open the task, and see "who moved it from where to where, and when".

**Done when:**

- [ ] FR-41 behaves as written, and history cannot be edited.
- [ ] No action changes a task without adding an entry.

**Note:** this is the first planned rework (section 7).

---

### TD-12: Comments

**Depends on:** TD-11.

**Builds:** `Comment` type, `comments` slice, a comment list and add box on the task detail page (author and time shown), visible to anyone who can see the task. Deleting a task or project also removes its comments.

**You will see:** an employee and the admin leave notes on the same task.

**Done when:**

- [ ] FR-40 behaves as written.
- [ ] Empty state shown when there are no comments.

---

### TD-13: Search and filters

**Depends on:** TD-12.

**Builds:** `selectFilteredTasks`, a filter bar with instant text search (title and description), project, assignee and priority filters that combine, a Clear filters button, a "No tasks found" message. Employees get search and the priority filter over their own tasks only.

**You will see:** type in the box and watch the board shrink; combine filters; clear them.

**Done when:**

- [ ] FR-18 to FR-21 behave as written.
- [ ] A test covers combined filters.

---

### TD-14: Admin dashboard

**Depends on:** TD-10 (needs moving cards to feel real).

**Builds:** Recharts, summary cards (total, in progress, done, overdue), a chart of tasks per status, project progress rows linking to each project, workload per employee linking to a page at its own address (`/team/:userId`) showing only that person's tasks, and an overdue list linking to tasks. Every number comes from a selector.

**You will see:** move a card on the board, go to the dashboard, and watch the numbers change.

**Done when:**

- [ ] FR-33 to FR-38 behave as written.
- [ ] Empty data shows friendly messages, never a broken chart.

**Demo 3 happens here.**

---

### TD-15: Team management

**Depends on:** TD-5 (can swap with TD-14).

**Builds:** the team list, an add member form (unique email check), deactivate and reactivate (never delete), and a clear mark on deactivated members.

**You will see:** add a member and log in as them; deactivate someone and watch their login fail while their old tasks stay intact.

**Done when:**

- [ ] FR-42 and FR-43 behave as written.
- [ ] Duplicate emails are refused with a clear message.

---

### TD-16: Polish and accessibility

**Depends on:** all features.

**Builds:** keyboard pass on every screen with visible focus, contrast check (WCAG AA), input labels and page titles, light Framer Motion transitions, optional dark mode saved in a `prefs` slice, a pass over every loading, empty and error state, a 360px phone check, safe rendering of user text, and a clean console.

**Done when:**

- [ ] Every screen works with the keyboard alone.
- [ ] No console warnings.
- [ ] First load is under 3 seconds.

---

### TD-17: Testing, deploy and docs

**Depends on:** all tickets.

**Builds:** fill test gaps (slices, selectors, permission helpers, login, moving a task), deploy to Vercel, and write the README: what it is, live link, screenshots, demo logins, stack, how to run it, and the honest limits (UI-only roles, plain-text demo passwords, no backend), plus the v2 ideas.

**Done when:**

- [ ] All tests pass.
- [ ] The live link works on a phone and a desktop.
- [ ] A stranger can run the project from the README alone.

---

## 7. Planned rework checkpoints

Vertical slicing means you **revisit earlier code on purpose**. This is called refactoring, and it is normal, not a mistake. Here is every place it happens:

| Earlier code | Grows in | What changes |
| --- | --- | --- |
| Project delete (TD-7) | TD-9, TD-11, TD-12 | One delete action gradually also removes tasks, then history, then comments |
| Progress placeholder (TD-6) | TD-8 | Replaced by the real `selectProjectProgress` |
| Permission helper (TD-4) | TD-10 | `canMoveTask` and `canSeeTask` added |
| Admin-only task page (TD-9) | TD-10 | Opened to the assignee with the `canSeeTask` check |
| Plain dispatches in task screens (TD-9, TD-10) | TD-11 | Replaced by thunks that also log history |
| Temporary users page (TD-2) | TD-5 | Deleted |

Keep these small by keeping each slice small. Add the item to your dev log when you do the rework.

---

## 8. Scenarios we thought through

| Question | Answer |
| --- | --- |
| Why login before projects? | Everything sits behind login, and the role decides what you see |
| Why guards before the shell? | The navigation needs to know who is logged in and their role |
| Why read before write? | Seed data lets you see real screens at once, and you trust the list before building forms |
| Why tasks read-only before task forms? | The board and progress need data to show; seeds give you that without forms |
| Why the board before history and comments? | The board is the core loop, so it is the MVP. History and comments extend it |
| Why history before comments? | Thunks that log history are best introduced before more actions exist |
| Why filters after comments? | Filters work on lists that already exist |
| Why the dashboard after the board? | Its numbers only mean something once cards can move |
| Why team management so late? | The seed team is enough to build everything else. Adding members is an edge feature |
| Which tickets can swap? | TD-14 with TD-15, and TD-12 with TD-13 |
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
- [ ] Tests for new logic pass.
- [ ] A dev log entry written if anything went wrong or was learned.
- [ ] Committed with a clear message, for example `TD-9: add task create and edit`.

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

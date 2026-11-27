# Team Task Dashboard: State Design

*How the app's data is organized in Redux: the slices, the shape of each one, the actions that change them, the selectors that calculate answers, and the rules that guard every change.*

---

## 1. Where this fits

| Phase | Result |
| --- | --- |
| Requirements gathering | SRS |
| Design: data model | Data Model document (5 entities, 7 relationships) |
| Design: tech stack | Tech Stack document |
| **Design: state design** | **This document** |
| Planning | Tickets |
| Coding | Working app |

The data model says *what* we remember. The state design says *where it lives in the app and how it changes*. Since there is no backend, the Redux store is our pretend database.

---

## 2. The big picture

> **Slices store. Selectors calculate. Components read and dispatch.**

- **Slice:** one flat list of one kind of data, plus the actions that change it.
- **Action:** a described change, such as "move this task to In Review".
- **Selector:** a small function that calculates an answer from the stored data (overdue tasks, progress, counts).
- **Component:** a screen piece that reads through selectors and writes by dispatching actions. It never calculates business rules itself.

Five entities become five slices, plus two helper slices:

| Slice | Holds | Persisted? |
| --- | --- | --- |
| `users` | Team members | Yes |
| `projects` | Projects | Yes |
| `tasks` | Tasks | Yes |
| `comments` | Comments | Yes |
| `activity` | History log entries | Yes |
| `auth` | Who is logged in | Yes (so refresh keeps you logged in) |
| `prefs` | Theme and UI settings | Yes |

---

## 3. State shape (normalized)

Each entity is stored once, in its own flat list, linked only by ids. Every entity slice uses the same two-part shape:

- `byId`: an object where the key is the id and the value is the record, for fast lookup.
- `allIds`: an array of ids, to keep the order.

(Redux Toolkit's `createEntityAdapter` produces exactly this shape for us, so we do not hand-write it.)

**Example of the whole store:**

```ts
{
  users:    { byId: { u_1: {...}, u_2: {...} }, allIds: ['u_1','u_2'] },
  projects: { byId: { p_1: {...} }, allIds: ['p_1'] },
  tasks:    { byId: { t_1: {...}, t_2: {...} }, allIds: ['t_1','t_2'] },
  comments: { byId: {...}, allIds: [...] },
  activity: { byId: {...}, allIds: [...] },
  auth:     { currentUserId: 'u_1' },   // null when logged out
  prefs:    { theme: 'light' }
}
```

**Rules for the shape:**

1. Store each record once. Never copy a user's name into a task or comment; store the id and look it up.
2. Links are ids only: `projectId`, `assigneeId`, `taskId`, `createdBy`, `updatedBy`.
3. Dates are stored as ISO text, such as `2026-12-15` or `2026-12-15T09:30:00Z`.
4. Ids are generated with `nanoid()`, so they are unique without a counter.
5. **Never store derived data** (overdue, progress, counts). Selectors calculate it.

---

## 4. Slice by slice

### 4.1 `users` slice

| Action | What it does | Who may do it |
| --- | --- | --- |
| `userAdded` | Adds a team member | Admin |
| `userActiveSet` | Sets `active` to true or false (deactivate or reactivate) | Admin |

Users are never deleted, so old tasks and comments keep working.

### 4.2 `projects` slice

| Action | What it does | Who may do it |
| --- | --- | --- |
| `projectAdded` | Creates a project (name, description, deadline, `createdBy`) | Admin |
| `projectUpdated` | Edits name, description or deadline | Admin |
| `projectDeleted` | Deletes the project (and triggers the cascade in section 7) | Admin |

There is no `status` or progress field here.

### 4.3 `tasks` slice

The busiest slice.

| Action | What it does | Who may do it |
| --- | --- | --- |
| `taskAdded` | Creates a task, always with `status: 'todo'` | Admin |
| `taskUpdated` | Edits title, description, priority or due date | Admin |
| `taskAssigned` | Sets or changes `assigneeId` (can be null) | Admin |
| `taskStatusChanged` | Moves a task to a new status, if the rules allow | Admin, or the assignee (within limits) |
| `taskDeleted` | Deletes a task | Admin |

**Status movement rules** (checked in one shared helper, never repeated in components):

| Move | Employee (own task) | Admin |
| --- | :-: | :-: |
| To Do to In Progress | Yes | Yes |
| In Progress to In Review | Yes | Yes |
| Back one step (In Progress to To Do, In Review to In Progress) | Yes | Yes |
| In Review to **Done** | **No** | **Yes** |
| Done back to In Review or In Progress (send back) | No | Yes |
| Skipping steps (To Do straight to In Review) | No | Yes |

### 4.4 `comments` slice

| Action | What it does | Who may do it |
| --- | --- | --- |
| `commentAdded` | Adds a comment with `taskId`, `createdBy`, `text`, `createdAt` | Anyone who can see the task |

Comments are never edited or deleted in v1.

### 4.5 `activity` slice

| Action | What it does | Who may do it |
| --- | --- | --- |
| `activityLogged` | Adds a history line (`taskId`, `updatedBy`, `type`, `detail`, `createdAt`) | Created automatically, never by a screen directly |

History is append-only: no edit, no delete.

### 4.6 `auth` slice

| Action | What it does |
| --- | --- |
| `loggedIn` | Stores `currentUserId` after email and password are checked against `users` |
| `loggedOut` | Sets `currentUserId` to null |

Only the **id** is stored. The full user is looked up from `users`, so a name or role change shows up everywhere. A deactivated user (`active: false`) cannot log in.

### 4.7 `prefs` slice

| Action | What it does |
| --- | --- |
| `themeSet` | Switches between light and dark |

---

## 5. Selectors (the calculated answers)

All selectors live in one file. They use `createSelector`, which remembers its last answer and recalculates only when the underlying data changes.

**Basic lookups**

| Selector | Returns |
| --- | --- |
| `selectCurrentUser` | The logged-in user (looked up by `currentUserId`) |
| `selectTaskById(id)` | One task |
| `selectTasksByProject(projectId)` | Tasks whose `projectId` matches |
| `selectTasksByAssignee(userId)` | Tasks whose `assigneeId` matches |
| `selectCommentsByTask(taskId)` | Comments on a task, oldest first |
| `selectActivityByTask(taskId)` | History of a task, oldest first |

**Calculated answers (derived data)**

| Selector | How it is worked out |
| --- | --- |
| `selectOverdueTasks` | `dueDate` is in the past **and** `status` is not `done` |
| `selectCountsByStatus` | Group all tasks by `status` and count them |
| `selectProjectProgress(projectId)` | Done tasks divided by all tasks in that project, as a percent |
| `selectProjectIsComplete(projectId)` | All tasks of the project are `done` |
| `selectWorkloadByEmployee` | For each user, count tasks where `assigneeId` matches and status is not `done` |
| `selectDashboardTotals` | Total, in progress, done and overdue counts for the summary cards |
| `selectFilteredTasks(filters)` | Applies text search, project, assignee and priority filters together |

> An employee's version of any task list is always passed through `selectTasksByAssignee` first, so they can never receive anyone else's tasks.

---

## 6. Permissions (one place, not scattered)

Rules like "only the admin may move a task to Done" must live in **one shared helper**, not be copied into each component. We build a `usePermissions` hook, backed by plain functions that can be tested without any screen:

| Question | Answer based on |
| --- | --- |
| `canCreateProject`, `canDeleteProject`, `canCreateTask`, `canAssignTask` | Role is `admin` |
| `canSeeTask(task)` | Admin, or `task.assigneeId` equals current user |
| `canMoveTask(task, fromStatus, toStatus)` | The status movement table in section 4.3 |
| `canOpenDashboard`, `canManageTeam` | Role is `admin` |

Two layers use it:

1. **The UI** hides buttons and disables invalid drops, so people are not tempted.
2. **The action itself** (a thunk) checks again before changing state, so a bug in one screen cannot break a rule.

> Honest note for the README: with no backend, this is all UI-side. Anyone who edits browser storage can bypass it. Real enforcement belongs on a server.

---

## 7. Actions that touch more than one slice

Some user actions must change several slices at once. These are written as **thunks** (small functions that run several steps in order), so the rules stay in one place.

| User action | Steps |
| --- | --- |
| **Create task** | 1. `taskAdded` 2. `activityLogged` with type `created` |
| **Move task** | 1. Check `canMoveTask` 2. `taskStatusChanged` 3. `activityLogged` with type `status_changed` and detail such as "In Progress to In Review" |
| **Reassign task** | 1. `taskAssigned` 2. `activityLogged` with type `reassigned` and detail such as "Priya to Arjun" |
| **Edit task** | 1. `taskUpdated` 2. `activityLogged` with type `edited` |
| **Delete project** | 1. Find all tasks of the project 2. Delete their comments 3. Delete their activity entries 4. Delete the tasks 5. Delete the project |
| **Delete task** | 1. Delete its comments 2. Delete its activity entries 3. Delete the task |

The **delete project cascade** is how the SRS rule (FR-14) is kept: nothing is left pointing at something that no longer exists.

---

## 8. Persistence (redux-persist)

| Setting | Choice | Why |
| --- | --- | --- |
| Storage | Browser localStorage | No server, so the browser keeps the data |
| What to save | All seven slices | A refresh must keep data, login and theme |
| **Version number** | Stored with the data, starting at 1 | Lets us migrate old saved data when the shape changes later |
| Serializable check | Ignore redux-persist's own actions | Avoids false warnings in the console |
| Logout | Clears `auth` only, never the other data | Logging out must not wipe the database |

**Loading state:** while saved data is being read, the app shows a loading screen (the `PersistGate`), so there is never a flash of empty content.

---

## 9. Seed data (first run)

The first time the app opens, the store is filled with demo data so reviewers see a working app immediately:

- 1 admin and 3 employees (demo logins shown on the login page).
- 2 or 3 projects with a mix of tasks across all four statuses.
- At least one overdue task, some comments and history lines.

Seed data is written once. After that, saved data always wins.

---

## 10. A worked example: Priya moves a card

1. Priya drops the card "Design the layout" into In Review.
2. The board component calls the move thunk with the task id and the new status.
3. The thunk asks `canMoveTask`: Priya owns it, and In Progress to In Review is allowed. Yes.
4. `taskStatusChanged` updates that task's `status` in the `tasks` slice.
5. `activityLogged` adds the line: Priya, status changed, "In Progress to In Review", now.
6. redux-persist saves the new state.
7. Selectors recalculate: counts per status, project progress, overdue list.
8. Raj's dashboard and the project board re-draw with the new numbers.

Now the same move, but Priya tries In Review to Done: step 3 says no, the thunk stops, nothing changes, and the screen shows a clear message.

---

## 11. Vocabulary from this document

| Word | Meaning |
| --- | --- |
| **Store** | The single place Redux keeps all the data |
| **Slice** | One flat list of one kind of data plus its actions |
| **Action** | A described change, such as `taskAdded` |
| **Reducer** | The code inside a slice that applies an action to the data |
| **Thunk** | A function that performs several steps in order, such as changing two slices |
| **Selector** | A function that calculates an answer from the stored data |
| **Memoized** | Remembers its last answer and only recalculates when needed |
| **Cascade** | One deletion triggering other deletions, such as project then tasks then comments |
| **Append-only** | Entries can be added but never edited or deleted |
| **Seed data** | Demo data loaded the first time the app runs |
| **Migration** | Upgrading old saved data to a new shape |

---

## 12. Open questions

1. Should "Done back to In Progress" by the admin count as a normal status change in the history, or have its own label such as "sent back"?
2. Should logging in also record an activity entry? (Currently no, since history is only about tasks.)
3. Should the demo include one deactivated employee to show that case?

---

## 13. Next steps

1. Turn the work into **tickets** (TD-1 to TD-13).
2. Open VS Code and start **TD-1**: project setup.
3. When we reach the store ticket, this document is the blueprint.

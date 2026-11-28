# Team Task Dashboard: UI Design Guide (Wireframes and Screens)

*A friendly walkthrough of the design step we skipped: what it is, why it matters, the words people use, and exactly how to sketch the screens of this project before you code them.*

---

## 1. Where this step lives

So far you have done requirements, data design, tech stack, state design and tickets. One thing is missing: **what the screens look like**. That is the UI design step, and it belongs right **after the data model**.

Why after the data model? Because you need to know what information exists (tasks, projects, users) before you can decide where to show it.

| Phase | Question | Result |
| --- | --- | --- |
| Requirements | What do we build? | SRS |
| Data design | What do we remember? | Data Model |
| **UI design** | **What do the screens look like?** | **Wireframes (this guide)** |
| Tech design | Which tools, how is state organized? | Tech Stack, State Design |
| Planning | In what order? | Tickets |
| Coding | Build it | The app |

You already started coding, and that is fine. Because we build in vertical slices, you can catch up: **sketch each screen just before the ticket that builds it.** This guide shows you how.

---

## 2. UX and UI: two different questions

People say "UI/UX" as one word, but they are two ideas.

|  | UX (user experience) | UI (user interface) |
| --- | --- | --- |
| **Asks** | Is it easy to use? | Does it look good and clear? |
| **About** | Flow, steps, clicks, finding things | Layout, colors, fonts, buttons |
| **Example** | "How many clicks to move a task?" | "What color is the Done column?" |

The order of work is: **UX first** (the flow), then **layout** (wireframes), then **look** (colors and style).

---

## 3. The three levels of sketch

A design can be drawn at three levels of detail. Each one costs more time than the last.

| Level | What it is | Looks like | Cost |
| --- | --- | --- | --- |
| **Wireframe** | A rough black and white sketch of the layout: boxes and labels | Paper sketch, or grey boxes | Cheapest |
| **Mockup** | The wireframe with real colors, fonts and spacing | A picture of the finished screen | Medium |
| **Prototype** | A mockup you can click through, screen to screen | Clickable, but nothing really works behind it | Most expensive |

**An easy way to remember:** wireframe is the sketch, mockup is the sketch in color, prototype is the colored sketch you can tap through.

Note: in a prototype the buttons are usually still pictures linked together in a design tool like Figma. A button only becomes real when you build it in React.

**For this project:** wireframes are a must. Mockups and prototypes are optional extras, because Tailwind lets you go from wireframe to a styled screen quickly in code.

**Why wireframes come first:** changing a wireframe takes seconds. Changing a built screen takes hours.

---

## 4. User flows: the paths through your screens

A **user flow** is the path a person takes to get something done, written as a chain of screens. It shows you which screens you need and how they connect, before you sketch any of them.

Your SRS already contains three flows.

### Flow A: Admin creates and assigns work (Raj)

**Login** to **Dashboard** to **Projects** to **a Project board** to **New task** form to back on the **board** with the new card.

### Flow B: Employee works on tasks (Priya)

**Login** to **My Board**. From there, two branches:

- **Move a card** right on the board, by dragging it or using the "Move to" menu. No need to open the task.
- **Open a task** to read the details, add a comment, and see the history.

Note that an employee lands on **My Board**, not on the dashboard. The dashboard is the admin's summary screen.

### Flow C: Admin reviews progress (Raj)

**Login** to **Dashboard**. From there:

- Click a **project row** to open its board.
- Click an **employee** to see only their tasks.
- Click an **overdue task** to open it.
- Open a task that is **In Review** and move it to **Done**, or send it back.

### A good habit

Count the clicks. If a common job takes more than three or four, rethink it on paper. That is a UX fix that costs nothing.

---

## 5. The screen inventory

A **screen inventory** is a checklist of every screen in the app: its name, who can open it, and what it shows. Every stop in a user flow is a screen, so the flows build the list for you.

| # | Screen | Address | Who | What it shows |
| --- | --- | --- | --- | --- |
| 1 | **Login** | `/login` | Everyone | Email, password, button, error message, demo accounts |
| 2 | **Admin dashboard** | `/dashboard` | Admin | Summary cards, status chart, project progress, workload, overdue list |
| 3 | **Project list** | `/projects` | Admin | Project rows with progress, "New project" button |
| 4 | **Project board** | `/projects/:id` | Admin | Four columns of task cards for one project, "New task" button |
| 5 | **My Board** | `/my-board` | Employee | The same four columns, only their own tasks |
| 6 | **Task detail** | `/tasks/:id` | Admin, or the task's assignee | Details, history, comments, edit and move controls |
| 7 | **Team** | `/team` | Admin | Team list, add member, deactivate |
| 8 | **One person's tasks** | `/team/:userId` | Admin | Only that employee's tasks |
| 9 | **Not allowed** | shown in place | Anyone blocked | A clear message and a way back |
| 10 | **Not found** | `*` | Anyone | A friendly "page not found" |

**Things that appear on top of screens** (not full screens): the project form, the task form, delete confirmations, and the "Move to" menu.

**A useful discovery:** the Project board and My Board are almost the same screen with different data. You design the **board once** and reuse it. The same goes for the task card.

**Everything wrapped around the screens** is the **app shell**: the header with the app name, navigation links that change by role, the user's name, a logout button, and a menu that collapses on a phone.

---

## 6. What each wireframe must contain

This is your checklist, taken from the SRS. If a box is missing, a requirement is missing.

### The app shell

- App name or logo area.
- Navigation links: Admin sees Dashboard, Projects, Team. Employee sees My Board.
- The current user's name and a Logout button.
- On a 360px phone: a menu button that opens the links.

### Login

- Email field, password field, Login button.
- A place for an error message (wrong password, inactive account).
- The demo accounts listed, so reviewers can log in.

### Admin dashboard (top to bottom)

1. Four **summary cards**: total tasks, in progress, done, overdue.
2. A **chart** of tasks per status.
3. **Project rows**: name, progress bar, "6 of 10 done", deadline (highlighted when close or passed).
4. **Workload per employee**: name and number of open tasks, each one clickable.
5. An **overdue list**, each task clickable.

### Project list

- A "New project" button.
- One row per project: name, description, deadline, progress bar, "x of y done".
- An **empty state** for no projects.

### Board (project board and My Board)

- Four columns: **To Do, In Progress, In Review, Done**, each with a **count**.
- Task **cards** (see below).
- On the project board: a "New task" button.
- Later: a search box and filters.
- On a phone: columns scroll sideways.

### The task card

- Title.
- Project label.
- Priority.
- Due date.
- Assignee (admin view).
- An **overdue badge** when late.
- A **"Move to" menu** button (for touch and keyboard).

### Task detail

- Title, description, assignee, who assigned it, priority, due date, status.
- Admin controls: edit, reassign, delete.
- Move controls, shown according to the rules.
- A **history** section (read-only).
- A **comments** section with an add box.

### Team

- A list of members with a mark for inactive ones.
- "Add member" form.
- Deactivate and reactivate buttons.

### Not allowed and Not found

- One clear sentence and a button back to a safe page.

---

## 7. How to sketch a wireframe

You do not need a design tool. Paper is perfect.

### Step by step

1. **Pick one screen** from the inventory.
2. **Draw the outline:** a tall rectangle for a phone and a wide one for a desktop. Start with the **phone** (360px), because it forces you to keep only what matters.
3. **Block it out:** big rectangles for the main areas (header, content, footer).
4. **Add the pieces:** smaller boxes for cards, lists and buttons. A box with an X through it means "an image or chart goes here".
5. **Label everything** in plain words, like "Login button" or "Task title". No colors, no fancy lettering.
6. **Add notes with arrows:** "clicking this opens the task", "only admin sees this".
7. **Check it** against the checklist in section 6 and the SRS.
8. **Photograph it** and keep it in your project folder (for example `design/`).

### Draw the four "states" too

A screen is not one picture. Sketch a small version of each situation:

| State | Example |
| --- | --- |
| **Normal** | The board with cards |
| **Empty** | "No tasks yet" message |
| **Loading** | A spinner while saved data loads |
| **Error or blocked** | "Not allowed", or a wrong password message |

The SRS asks for these states, and they are easy to forget when you code.

### Tools

| Tool | Good for |
| --- | --- |
| **Pen and paper** | The fastest start. Best for you right now |
| **Excalidraw** | Free, runs in the browser, hand-drawn look |
| **Figma** | Free plan; wireframes, mockups and prototypes in one place |

---

## 8. Shared design rules (decide once, reuse everywhere)

A few decisions apply to every screen. Deciding them once keeps the app consistent and saves time in every ticket. These are sometimes called **design tokens** when they are written down.

| Rule | Decide | Why |
| --- | --- | --- |
| **Status colors** | One color for each of the four statuses | So a column is recognized at a glance |
| **Priority** | Low, Medium, High, shown as a word plus a style | Never color alone |
| **Overdue** | Red, **plus** an icon and the word "Overdue" | Color alone is not accessible |
| **Spacing** | One scale (for example 4, 8, 16, 24 pixels) | Tailwind already gives you this |
| **Card style** | Same border, radius and padding everywhere | One card component, reused |
| **Buttons** | Primary (main action), secondary, danger (delete) | Delete must look different |
| **Text** | Two or three sizes only | Keeps screens calm |
| **Phone layout** | Board columns scroll sideways | Matches the SRS (360px up) |

**Accessibility belongs in the design:** do not use color as the only signal, keep text readable (WCAG AA contrast), make buttons easy to tap, and always show where the keyboard focus is. That is why the card has a "Move to" menu as well as drag.

---

## 9. Two ways to work (and which we recommend)

|  | Design everything first | Design each screen before its ticket |
| --- | --- | --- |
| **How** | Sketch all 10 screens before more coding | Sketch one screen right before building it |
| **Good** | Consistent look; see the whole app early | Fits vertical slicing; less wasted work |
| **Risky** | Many sketches may change; slow start | Screens can drift apart if you do not share rules |

**Recommendation: a hybrid.**

1. **Now (about an hour):** write the **screen inventory** (section 5) and decide the **shared design rules** (section 8).
2. **Before each ticket:** sketch only that ticket's screen, using the shared rules.
3. **Add a "Design" line to each ticket:** "Wireframe for this screen done before coding."

This keeps the benefits of both: one consistent look, and no sketches that go stale.

### Which screen before which ticket

| Ticket | Sketch first |
| --- | --- |
| TD-3 Login | Login screen (with its error message) |
| TD-4 and TD-5 | App shell for both roles, Not allowed, Not found |
| TD-6 and TD-7 | Project list, project form, delete confirmation |
| TD-8 | Project page with tasks and progress |
| TD-9 to TD-11 | Task form, task detail with history |
| TD-12 to TD-14 | The board and the task card |
| TD-15 | Admin dashboard |
| TD-16 | Comments on the task detail |
| TD-17 | Search and filter bar |
| TD-18 | Team page |

(TD-1 and TD-2 need no sketch: TD-2's page is temporary.)

---

## 10. A checklist for each wireframe

Before you start coding a screen, ask:

- [ ] Does it have everything the SRS asks for on this screen?
- [ ] Can the person do their job in three or four clicks?
- [ ] Have I drawn the normal, empty, loading and error states?
- [ ] Does it work on a 360px phone?
- [ ] Does it follow the shared design rules?
- [ ] Is anything signaled by color alone?
- [ ] Is it clear who can see this, and what happens to everyone else?
- [ ] Did I write notes for what each click does?

---

## 11. Vocabulary

| Word | Meaning |
| --- | --- |
| **UX** | User experience: how easy it is to do things |
| **UI** | User interface: how it looks |
| **Wireframe** | A rough black and white layout sketch |
| **Mockup** | A wireframe with real colors and fonts |
| **Prototype** | A clickable mockup, with nothing real behind it |
| **User flow** | The chain of screens someone passes through to do a job |
| **Screen inventory** | A checklist of every screen, who can open it, what it shows |
| **App shell** | The header, navigation and frame around all screens |
| **Empty state** | What a screen shows when there is no data yet |
| **Design tokens** | The shared decisions: colors, spacing, text sizes |
| **Responsive** | Works on any screen width |
| **Mobile first** | Design for the phone first, then widen |
| **Accessibility (a11y)** | Usable by everyone, including keyboard and screen-reader users |

---

## 12. Your next steps

1. Take paper and sketch the **login screen** (phone size). Include the error state.
2. Sketch the **My Board** screen with four columns and one card.
3. Write down your **status colors** and **button types** in one short note.
4. Photograph your sketches and keep them in a `design/` folder in the project.
5. Then continue with **TD-2**, and use your sketches again when you reach TD-3.

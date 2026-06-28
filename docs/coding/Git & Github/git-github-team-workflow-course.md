# Git & GitHub for Team Work — A Practical Course for Vibe Coders

> **Who this is for:** You already know `git add`, `git commit`, `git push`, basic branch switching, and `git stash`. What you DON'T know is how a team actually uses Git — PRs, conflicts, review, recovery, process. This course fixes exactly that gap.
>
> **How to use this:** Each phase has numbered sub-lectures (e.g. `1.1`, `1.2`). Each sub-lecture has: **What it is**, **Why it matters for teamwork**, **Commands**, **Practical exercise (using your 2-account/2-laptop setup)**, and **Good practices / common mistakes**.
>
> **Your setup:** Two GitHub accounts (call them `dev-A` and `dev-B`), two laptops/machines (or two folders on one machine cloned with different remotes — works fine too). You'll literally play both developers on a shared repo to simulate a real team. From Phase 2 onward, every exercise assumes this setup.

---

## Phase 0 — The Mental Model (No Typing Yet)

You're running commands without knowing what's actually happening. This phase fixes that. Read it once, properly, before touching the keyboard.

### 0.1 — What is Git vs GitHub (the actual difference)

**What it is:**
Git is a *program* that runs on your computer. It tracks changes to files over time — who changed what, when, and lets you go back to any point. It works completely offline. You could use Git your whole life and never touch GitHub.

GitHub is a *website/service* that hosts Git repositories online, so multiple people can push their work to one shared place. GitHub also adds team features on top of Git: Pull Requests, Issues, code review, permissions — none of which Git itself has. GitLab and Bitbucket are GitHub's competitors, doing the same job.

**Why it matters for teamwork:**
This distinction matters because half the "team workflow" stuff you're missing (PRs, reviews, issues) isn't a Git feature at all — it's a GitHub feature. Git is the engine, GitHub is the office building you all work in together.

**Commands:** None yet — this is pure understanding.

**Practical exercise:**
No exercise — just sit with this until it's obvious. Ask yourself: "if I deleted my GitHub account right now, would my local commits disappear?" (Answer: no. They live in `.git` on your machine.)

**Good practices / common mistakes:**
- Mistake: thinking `git push` "saves" your work to GitHub like a backup button. It does push to a remote, but understand it's syncing two separate full histories — yours and GitHub's copy.

---

### 0.2 — Local Repo vs Remote Repo vs `origin`

**What it is:**
Your **local repo** is the full Git history living on your machine in the hidden `.git` folder. A **remote repo** is a copy of that same history sitting somewhere else (usually GitHub's servers). `origin` is just the *default nickname* Git gives to the remote you cloned from — it's not a special keyword, just a label. You could rename it.

**Why it matters for teamwork:**
On a team, multiple people each have their own *local* copy, all pointing to the *same remote*. The remote is the single source of truth everyone syncs through. Understanding this stops you from panicking when your local branch and the remote branch say different things — they're literally two separate copies that need to be synced on purpose.

**Commands:**
```bash
git remote -v          # see what remote(s) you're connected to and their URLs
git remote add origin <url>   # connect a local repo to a remote (you'd use this if you init'd locally first)
```

**Practical exercise:**
Run `git remote -v` in any repo you already have. Notice it shows `origin` twice (fetch and push) — that's normal, they can technically point to different URLs but usually don't.

**Good practices / common mistakes:**
- Mistake: assuming "origin" always means GitHub. It just means "the remote I cloned from" — could be GitLab, Bitbucket, a private server, anything.

---

### 0.3 — The Three Areas: Working Directory, Staging Area, Repository

**What it is:**
This is the part most people who only memorize commands never actually understand. Git has **three zones**:

1. **Working Directory** — the actual files on your disk, as you see them in your editor.
2. **Staging Area (the "index")** — a holding zone where you put changes you're *about to* commit. `git add` moves changes here.
3. **Repository (local history)** — the permanent record. `git commit` takes what's in staging and locks it into history forever (well, until you deliberately rewrite it).

**Why it matters for teamwork:**
Staging exists so you can commit *part* of your changes, not everything blindly. On a team, you'll often have multiple unrelated changes in your working directory at once (a bug fix + a half-done feature) — staging lets you commit them as separate, clean commits instead of one giant messy commit. Clean commit history = teammates can actually understand what you did.

**Commands:**
```bash
git status              # shows what's in working dir vs staged vs untracked
git add <file>          # stage a specific file
git add -p              # stage in small chunks/hunks - very useful, learn this
git diff                # see unstaged changes
git diff --staged       # see what's staged and about to be committed
```

**Practical exercise:**
Edit two unrelated parts of a file (or two different files). Use `git add -p` to stage and commit them as two separate, clean commits instead of one `git add .` dump. Write a separate honest commit message for each.

**Good practices / common mistakes:**
- Mistake: always doing `git add .` blindly. It's fine for small personal projects, but on a team it leads to commits that bundle five unrelated changes together, making review and history useless.
- Good practice: one commit = one logical change. Future-you (and teammates) will thank you when bug-hunting via `git log`.

---

### 0.4 — `fetch` vs `pull` vs `push` — What's Really Happening

**What it is:**
- `git fetch` — downloads the latest data from the remote, but does **not** touch your working files or current branch. It just updates your local knowledge of "what does the remote look like now."
- `git pull` — is literally `git fetch` + `git merge` combined. It fetches AND immediately tries to merge the remote changes into your current branch.
- `git push` — uploads your local commits to the remote so others can see them.

**Why it matters for teamwork:**
This is the #1 source of "wait why did my code change on its own" confusion. `git pull` can trigger a merge (and a conflict!) without you expecting it, because it merges automatically. `git fetch` lets you look before you leap — see what changed remotely before deciding to merge it into your work.

**Commands:**
```bash
git fetch origin
git log origin/main --oneline   # peek at remote main without merging anything
git pull origin main             # fetch + merge in one step
git push origin <branch-name>
```

**Practical exercise:**
On your dev-A machine, make a small commit and push. On dev-B, run `git fetch` first and check `git log origin/main` — confirm you can SEE the new commit exists remotely without it touching your local branch yet. Then run `git pull` and watch it actually merge in.

**Good practices / common mistakes:**
- Good practice: in professional teams, many people deliberately `fetch` first, inspect, then `merge`/`rebase` manually instead of blind `pull` — gives you control over surprise conflicts.
- Mistake: pulling into a branch with uncommitted changes. Git will often block this or cause messy state — commit or stash first (you already know stash, good).

---

### 0.5 — Commit Anatomy and History

**What it is:**
Every commit has: a unique hash (SHA), an author, a timestamp, a message, and a pointer to its parent commit(s). This chain of parent pointers IS your project history — it's literally a linked list of snapshots.

**Why it matters for teamwork:**
Branches and merges are just different shapes this chain can take. Once you can *see* the chain (`git log --graph`), branching/merging/rebasing stop being abstract magic and become something you can literally look at.

**Commands:**
```bash
git log --oneline --graph --all --decorate
git show <commit-hash>     # see exactly what one commit changed
```

**Practical exercise:**
Run `git log --oneline --graph --all` on any repo with more than one branch. Stare at it. Identify where branches split off and where (if ever) they joined back.

**Good practices / common mistakes:**
- Good practice: alias this command since you'll run it constantly:
```bash
git config --global alias.tree "log --oneline --graph --all --decorate"
```
Now you can just type `git tree`.

---

## Phase 1 — Branching, Done Properly

### 1.1 — Why Branches Exist in a Team

**What it is:**
A branch is just a movable pointer to a commit, letting you work on a separate line of changes without touching `main`. `main` (or `master`) is the "official, working, deployable" version of the code.

**Why it matters for teamwork:**
If everyone commits straight to `main`, the official codebase becomes a live experiment — broken half the time. Branches let 5 people work on 5 different features simultaneously, in isolation, without stepping on each other, and only bring finished/reviewed work into `main`.

**Commands:** (conceptual lecture, commands come next)

**Practical exercise:**
None yet — just internalize: **never commit directly to main on a team project.** Every single piece of work gets its own branch, no matter how small.

**Good practices / common mistakes:**
- Mistake: treating branches as optional/only-for-big-features. Even a one-line typo fix gets its own branch in real teams (e.g. `fix/typo-header`).

---

### 1.2 — Branch Naming Conventions

**What it is:**
Teams agree on a naming pattern so anyone can tell what a branch is for at a glance. Common pattern: `<type>/<short-description>`.
- `feature/navbar`
- `fix/login-button-not-clickable`
- `chore/update-readme`
- `refactor/auth-service`

**Why it matters for teamwork:**
When there are 30 open branches, `feature/navbar` tells everyone instantly what it is; `vin-test-123` tells no one anything. This is one of the easiest "looks like a professional" wins.

**Practical exercise:**
For your capstone project (Phase 6), plan out branch names in advance using this convention before creating any of them.

**Good practices / common mistakes:**
- Mistake: branch names with spaces or special characters — stick to lowercase, hyphens, slashes.

---

### 1.3 — Creating and Switching Branches: The Real Commands

**What it is:**
You mentioned forgetting the command for switching branches. Here's the full toolkit:

```bash
git branch                      # list local branches
git branch -a                   # list local + remote branches
git switch <branch-name>        # switch to an existing branch (modern way)
git switch -c <new-branch>      # create AND switch to a new branch in one step
git checkout <branch-name>      # older command, still works, does same as switch (and more — checkout is multi-purpose, switch is the cleaner modern split)
```

**Why it matters for teamwork:**
`git switch -c` is what you'll type dozens of times a day on a real job — every new task starts with branching off the latest `main`.

**Practical exercise:**
```bash
git switch main
git pull origin main             # make sure main is up to date first!
git switch -c feature/navbar
```
Do this 3 times with 3 different fake feature names until it's muscle memory.

**Good practices / common mistakes:**
- **Critical good practice:** always `pull` the latest `main` BEFORE branching off it. Branching off a stale `main` is a common cause of unnecessary conflicts later.
- Mistake: branching off another half-finished feature branch instead of `main`, by accident, leading to messy unrelated commits in your new branch.

---

### 1.4 — Visualizing the Branch Graph

**What it is:**
Using the `git tree` alias from 0.5, watch how branches actually diverge and merge visually instead of imagining it.

**Why it matters for teamwork:**
On real projects with many branches, being able to quickly visualize "where did this branch fork from, has it been merged yet" is a daily survival skill, especially during cleanup.

**Commands:**
```bash
git tree     # (your alias)
git branch --merged main      # which branches are already fully merged into main (safe to delete)
git branch --no-merged main   # which ones are NOT merged yet (don't delete!)
```

**Practical exercise:**
Create 2-3 branches, commit something different on each, then run `git tree` after each step to watch the graph grow.

**Good practices / common mistakes:**
- Good practice: before deleting any branch, check `--merged` to be 100% sure its work is safely in `main`.

---

### 1.5 — Keeping Your Branch Up to Date with Main

**What it is:**
While you're working on `feature/navbar` for 3 days, your teammate merges 5 other things into `main`. Your branch is now "behind." You need to bring those updates into your branch before you eventually merge yours in — this hugely reduces conflict pain later.

**Commands:**
```bash
git switch feature/navbar
git fetch origin
git merge origin/main          # option A: merge main into your branch
# OR
git rebase origin/main         # option B: rebase your branch on top of main (cleaner history, advanced — we'll touch this lightly in Phase 4)
```

**Why it matters for teamwork:**
Long-lived branches that never sync with `main` become "conflict bombs" — by the time you try to merge, dozens of conflicts pile up at once. Syncing regularly means you resolve small conflicts often instead of one giant nightmare at the end.

**Practical exercise:**
On dev-A, push a commit to `main` via PR (we'll learn this properly in Phase 2 — for now just merge locally and push for this drill). On dev-B's feature branch, run `git fetch` + `git merge origin/main` and observe your branch updating.

**Good practices / common mistakes:**
- Good practice: sync with main at least once a day if your branch lives more than a day.

---

## Phase 2 — The Pull Request Workflow (The Real "Team" Skill)

This is the single most important phase for you. This is what you've genuinely never done.

### 2.1 — What is a Pull Request, and Why Not Just Merge Locally?

**What it is:**
A Pull Request (PR) is a GitHub feature (not a Git feature — remember 0.1) that says: "Hey, I have changes on this branch, I want them merged into `main`. Please review before that happens." Nothing merges automatically — a human approves it (or you, for solo learning, but on real teams someone else does).

**Why it matters for teamwork:**
This is the checkpoint that prevents broken/unreviewed code from reaching `main`. It's also where conversation happens — comments, suggestions, "hey this line looks wrong" — all visible in one place, linked to that exact code change forever.

**Practical exercise:**
None yet — next lecture sets up the actual environment.

**Good practices / common mistakes:**
- Mistake: merging your own PR without anyone (even simulated dev-B) looking at it, even in practice. Force yourself to go through the review step every single time during this course — that's the whole point of the 2-account setup.

---

### 2.2 — Setting Up Two Accounts as Collaborators

**What it is:**
For two GitHub accounts to work on one repo together, one needs to own the repo and add the other as a **Collaborator** (Settings → Collaborators → Add people).

**Practical exercise:**
1. On `dev-A`, create a new repo (call it `team-practice`), keep it simple — even just one `index.html`.
2. Go to Settings → Collaborators → invite `dev-B`'s username.
3. On `dev-B`'s GitHub, accept the invite.
4. Clone the repo on BOTH machines (each with their own account's Git credentials configured locally).

**Commands:**
```bash
git clone <repo-url>
git config user.name "dev-A"      # per-repo identity, not global, so it doesn't clash with your real identity
git config user.email "dev-a@example.com"
```

**Good practices / common mistakes:**
- Good practice: use per-repo `git config` (no `--global`) inside this practice repo specifically, so commits clearly show which "developer" made them — that's the whole point of the simulation.

---

### 2.3 — The Full Loop: Push Branch → Open PR → Review → Approve → Merge

**What it is:**
The complete real-world cycle:
```bash
# on dev-A
git switch -c feature/navbar
# make changes, edit index.html
git add .
git commit -m "Add navbar markup and basic styles"
git push -u origin feature/navbar
```
Then on GitHub.com: you'll see a banner "Compare & pull request" → click it → write a title/description → click "Create pull request."

Now switch hats: log in as `dev-B` on GitHub, open that PR, click "Files changed," read the diff, leave a comment or two, then "Review changes" → Approve. Back as `dev-A` (or whoever has merge rights), click "Merge pull request."

**Why it matters for teamwork:**
This entire loop — branch, push, PR, review, approve, merge — is THE daily rhythm of every software job using Git. Once this feels boring and automatic, you're basically there.

**Practical exercise:**
Do this full loop start to finish, for real, on `team-practice`. Don't skip the "leave a comment as dev-B" step even if the comment is trivial — get used to writing and receiving review comments.

**Good practices / common mistakes:**
- Good practice: write a clear PR description — what changed and why, not just "fixed stuff."
- Mistake: approving your own PR (GitHub usually even blocks this if you're not the PR author... but as repo owner you might still be able to — don't just because you can).

---

### 2.4 — Code Review Etiquette

**What it is:**
Real review comments are specific and constructive: "This loop could be a `.map()` instead" rather than "this is bad." There's also "Request changes" (blocks merge until fixed) vs "Comment" (just feedback) vs "Approve."

**Why it matters for teamwork:**
Bad review etiquette (vague, harsh, or rubber-stamp approvals) is one of the most common team friction points in real jobs. Knowing the *etiquette*, not just the button-clicking, is what makes you look senior even as a fresher.

**Practical exercise:**
As dev-B, leave at least one "Request changes" review on a PR with a real suggestion (e.g., "rename this variable" or "add a comment here"). As dev-A, make the fix, push to the same branch (no new PR needed — it updates automatically), and re-request review.

**Good practices / common mistakes:**
- Good practice: comment ON the line of code, not just generally — GitHub lets you click a specific line in the diff to comment.

---

### 2.5 — Merge Strategies: Merge Commit vs Squash vs Rebase Merge

**What it is:**
When you click merge on GitHub, there are 3 options:
- **Merge commit** — keeps all individual commits + adds one merge commit. Full history preserved.
- **Squash and merge** — combines ALL commits from the branch into ONE clean commit on `main`. Very popular for keeping `main`'s history readable.
- **Rebase and merge** — replays your branch's commits one by one on top of `main`, no merge commit at all, linear history.

**Why it matters for teamwork:**
Different teams have different preferences. Squash is extremely common because it keeps `main` history clean (one commit per feature) even if you made 15 messy "wip" commits along the way.

**Practical exercise:**
Do the same kind of small PR three times, merging once with each strategy, then run `git tree` on `main` after each to SEE the difference in resulting history shape.

**Good practices / common mistakes:**
- Good practice: ask early at a new job "what merge strategy do we use?" — it's a 2-second question that shows you know there's even a choice.

---

### 2.6 — Deleting Branches After Merge

**What it is:**
Once merged, a feature branch has done its job. GitHub offers a "Delete branch" button right after merge.

**Commands (local cleanup):**
```bash
git switch main
git pull origin main
git branch -d feature/navbar           # delete local branch (only works if merged)
git push origin --delete feature/navbar  # delete remote branch (if not auto-deleted by GitHub)
```

**Why it matters for teamwork:**
Repos with 200 stale branches are a real, annoying, common problem. Cleaning up is basic hygiene.

**Practical exercise:**
After your Phase 2 practice PRs, clean up every merged branch, locally and remotely.

**Good practices / common mistakes:**
- Mistake: using `-D` (force delete) on unmerged branches out of habit — you'll lose work. `-d` (lowercase) safely refuses if not merged; that safety is intentional, don't fight it without a real reason.

---

## Phase 3 — Conflicts, On Purpose

### 3.1 — What Actually Causes a Merge Conflict

**What it is:**
A conflict happens ONLY when two branches changed the **same lines** (or very close lines) of the **same file** differently. Git can auto-merge anything else just fine — most merges have zero conflicts. Conflicts are not random; they're specific and predictable once you understand this.

**Why it matters for teamwork:**
Understanding the *cause* removes the fear. You'll start predicting "oh, dev-B and I are both editing the navbar div, this WILL conflict" before it even happens.

**Practical exercise:**
None yet — pure theory, internalize it.

---

### 3.2 — Reading Conflict Markers

**What it is:**
When a conflict happens, Git inserts markers directly into the file:
```
<<<<<<< HEAD
your version of the line
=======
their version of the line
>>>>>>> feature/navbar
```
`HEAD` = your current branch's version. Below `=======` is the incoming branch's version.

**Why it matters for teamwork:**
This is the part that scares beginners the most purely because it LOOKS broken/scary. It's not — it's just Git asking "which of these two do you want, or do you want to write something new combining both?"

**Practical exercise:**
Deliberately cause one: on dev-A's branch, change line 5 of `index.html` to text X. On dev-B's branch (off the same starting point), change line 5 to text Y. Try merging dev-B's branch into dev-A's locally and read the resulting marker.

---

### 3.3 — Resolving Conflicts Locally

**What it is:**
You manually edit the file: delete the markers, keep whichever version (or a merged combination) you actually want, save, then:
```bash
git add <file>            # tells git "this conflict is resolved"
git commit                # completes the merge with a merge commit
```

**Why it matters for teamwork:**
This exact loop — edit, `add`, `commit` — is how 90% of real-world conflicts get resolved. No magic command auto-fixes it for you; Git deliberately leaves the decision to a human.

**Practical exercise:**
Resolve the conflict from 3.2 fully, three different ways across three drills: (a) keep your version, (b) keep theirs, (c) manually combine both into something new.

**Good practices / common mistakes:**
- Mistake: leaving the `<<<<<<<` markers in the file by accident after "resolving" — always re-read the whole file before `git add`.
- Good practice: when unsure which version is "right," talk to the other person (in real life) — don't guess silently.

---

### 3.4 — Resolving Conflicts via the GitHub Web Editor

**What it is:**
For simple conflicts, GitHub's PR page shows a "Resolve conflicts" button that opens a lightweight web editor right in the browser — no local pulling needed.

**Why it matters for teamwork:**
Convenient for small/quick fixes, especially from mobile or someone else's machine. But it only works for conflicts simple enough that GitHub feels safe letting you edit in-browser.

**Practical exercise:**
Recreate the 3.2 conflict scenario but this time resolve it through the actual GitHub PR's web conflict editor instead of locally.

**Good practices / common mistakes:**
- Good practice: for anything beyond trivial, still pull locally and resolve in your real editor where you can run/test the code before pushing the fix.

---

### 3.5 — Practice Drills: Three Conflict Scenarios

Run all three with your dev-A/dev-B setup until none of them feel scary:

1. **Same-line text conflict** — both edit literal text on the same line (covered above).
2. **One edits, one deletes** — dev-A edits a line, dev-B deletes the entire file or that section. Git will tell you "deleted in branch X, modified in branch Y" — different flavor of conflict, different resolution choice (keep, delete, or modify-then-keep).
3. **Whitespace/formatting conflict** — one dev reformats indentation while the other changes actual logic on the same lines. Annoyingly common in real teams; teaches you why formatting tools (prettier, etc.) matter — same formatter for everyone avoids this entirely.

---

## Phase 4 — Undo & Recovery (Your Survival Kit)

### 4.1 — `git reset`: Soft, Mixed, Hard

**What it is:**
`reset` moves your branch pointer backward to an earlier commit. Three modes control what happens to your *files*:
- `--soft` — moves the pointer back, keeps all changes staged. Use when you want to redo a commit message or recombine commits.
- `--mixed` (default) — moves pointer back, unstages changes but keeps them in your working directory.
- `--hard` — moves pointer back AND deletes the changes entirely. Dangerous, but sometimes exactly what you want.

```bash
git reset --soft HEAD~1     # undo last commit, keep changes staged
git reset --mixed HEAD~1    # undo last commit, keep changes unstaged
git reset --hard HEAD~1     # undo last commit, DELETE the changes
```

**Why it matters for teamwork:**
Critical rule: **never `reset --hard` (or rewrite history at all) on a branch others have already pulled** — it rewrites history and creates chaos for anyone who already has the old version. Only safe on your own unpushed/unshared work.

**Practical exercise:**
Make 2 dummy commits on a throwaway branch. Try all three reset modes (on copies, or just redo) and observe the difference in `git status` after each.

---

### 4.2 — `git revert`

**What it is:**
Instead of erasing a commit from history, `revert` creates a NEW commit that undoes the changes of an earlier one. History stays intact and honest — you can see "this thing happened, and then this other commit undid it."

```bash
git revert <commit-hash>
```

**Why it matters for teamwork:**
This is the **safe, team-friendly** way to undo something that's already been pushed/merged and others may have pulled. Never `reset --hard` shared history — `revert` instead.

**Practical exercise:**
Merge a PR with a deliberate "bug," then revert that merge commit via GitHub's PR page (there's a "Revert" button) or via CLI. Confirm the bug is gone but history shows both events.

**Good practices / common mistakes:**
- Golden rule to memorize: **reset for your own unpushed work, revert for anything already shared.**

---

### 4.3 — Recovering "Lost" Work via Reflog

**What it is:**
`git reflog` is Git's secret safety net — it logs every single place `HEAD` has pointed to, even commits that seem "deleted" after a hard reset or a branch deletion. Almost nothing in Git is truly gone for ~30-90 days by default.

```bash
git reflog
git checkout <hash-from-reflog>          # go look at it
git switch -c recovered-branch <hash>    # rescue it into a real branch
```

**Why it matters for teamwork:**
This is the command that saves you from "I deleted my branch / hard-reset and lost 3 hours of work" panic. Genuinely one of the most valuable things to know.

**Practical exercise:**
Make a commit, then `git reset --hard` it away on purpose. Panic for dramatic effect. Then use `reflog` to find and recover it into a new branch.

---

### 4.4 — Amending Commits

**What it is:**
`git commit --amend` lets you fix the most recent commit — change its message, or add forgotten files to it — without creating a brand new separate commit.

```bash
git commit --amend -m "Better commit message"
git add forgotten-file.txt && git commit --amend --no-edit
```

**Why it matters for teamwork:**
Keeps history clean instead of littering it with "oops forgot a file" / "typo fix" follow-up commits.

**Good practices / common mistakes:**
- **Critical rule:** only amend commits that haven't been pushed yet (or that are on your own branch nobody else has pulled). Amending a pushed/shared commit rewrites history others already have — causes the same chaos as a hard reset on shared work.

---

### 4.5 — Undoing a Merge

**What it is:**
If a merge just happened locally and you haven't pushed yet:
```bash
git reset --hard HEAD~1     # if it was a simple merge commit and nothing else happened after
```
If it's already pushed/shared, use `git revert -m 1 <merge-commit-hash>` to safely revert the entire merge as a new commit.

**Why it matters for teamwork:**
Bad merges happen (wrong branch merged, merged too early before review). Knowing the safe-vs-unsafe undo path here is exactly the kind of "real team developer" knowledge you're trying to build.

**Practical exercise:**
Merge a throwaway branch into another throwaway `main` copy, then practice both undo paths (local-unshared vs already-shared-revert).

---

## Phase 5 — GitHub Team Features (The Process Layer)

### 5.1 — Issues, and Linking PRs to Issues

**What it is:**
A GitHub **Issue** is a tracked task/bug/idea — a ticket. You can link a PR to an issue using keywords in the PR description like `Closes #12`, which auto-closes that issue when the PR merges.

**Why it matters for teamwork:**
This is how real teams track "what needs doing" and connect the eventual code change back to the original request — full traceability from idea → code.

**Practical exercise:**
On `team-practice`, create 3 issues (e.g. "Add footer," "Fix navbar spacing," "Add favicon"). For each, create a branch, do the work, open a PR with `Closes #<number>` in the description, and watch the issue auto-close on merge.

---

### 5.2 — Branch Protection Rules

**What it is:**
Settings → Branches → Add rule for `main`. You can require: PRs before merging (no direct pushes), at least one approval, passing status checks, etc.

**Why it matters for teamwork:**
This is what *enforces* good behavior instead of relying on humans remembering not to push straight to `main`. Virtually every real company repo has this turned on.

**Practical exercise:**
Turn on "Require a pull request before merging" and "Require approvals: 1" on `team-practice`'s `main`. Try to push directly to `main` and watch GitHub block it. Confirm a PR now literally cannot merge until dev-B approves.

---

### 5.3 — Status Checks (Lightweight Intro)

**What it is:**
Automated checks (tests, linters) that must pass before a PR can merge — shown as green checkmarks or red X's right on the PR. Real setup uses GitHub Actions (CI/CD) — out of scope for this course, but you should at least recognize the concept.

**Why it matters for teamwork:**
Knowing this exists (even without building CI yourself yet) means you won't be confused when a job's PR has a "checks" tab with automated tests.

**Practical exercise:**
Just read about it for now — optionally, if curious later, add a trivial GitHub Action that just echoes "tests passed" on every PR, purely to see the green check appear.

---

### 5.4 — `.gitignore` and `README.md` for Collaboration

**What it is:**
`.gitignore` tells Git which files/folders to never track (node_modules, .env, build outputs). `README.md` is the front door of any repo — setup instructions, what the project does, how to contribute.

**Why it matters for teamwork:**
Committing `node_modules` or secret `.env` files is an extremely common beginner mistake that causes real pain (huge repos, leaked secrets). A good README is what lets a new teammate (or future-you) get a project running without asking you anything.

**Practical exercise:**
Add a proper `.gitignore` and a real README to `team-practice` with setup steps, as if onboarding a new teammate who's never seen the project.

**Good practices / common mistakes:**
- Critical: if you ever accidentally commit a secret/API key, changing it later isn't enough — it's in history forever unless you do special history-rewriting (a topic for when it actually happens, not now). Prevention via `.gitignore` from day one is the real fix.

---

### 5.5 — Project Boards (Light Intro)

**What it is:**
A Kanban-style board (To Do / In Progress / Done) built into GitHub, linkable to your Issues.

**Why it matters for teamwork:**
Useful to recognize in interviews/jobs even if you don't build deep workflows with it now — many teams plan sprints this way.

**Practical exercise:**
Create one board for `team-practice`, drop your 3 issues from 5.1 onto it, and move them across columns as you complete them.

---

## Phase 6 — Capstone Project: Simulated 2-Person Team, Start to Finish

**Goal:** Produce one small, real HTML project, built exactly the way a 2-person team would, using everything from Phases 1–5. By the end you'll have a repo whose *history itself* proves you know team workflow — genuinely useful to link/show in an interview.

### Project: A simple personal "Link-in-bio" style landing page
Plain HTML/CSS/JS, no framework needed — keeps focus on Git/GitHub, not on coding difficulty.

**Pages/sections:** Hero with name + tagline, a few links (socials/projects), a simple footer, one small JS interaction (e.g. dark/light toggle).

### Capstone Step-by-Step Plan

**6.1 — Setup**
- `dev-A` creates the repo `bio-link-capstone`, adds `dev-B` as collaborator.
- Turn ON branch protection on `main` immediately (Phase 5.2) — force yourselves to use PRs from commit #1.
- `dev-A` creates initial skeleton (`index.html`, `style.css`, `script.js`, basic `.gitignore`, `README.md`) via a PR — even the very first commit goes through PR + review, no exceptions.

**6.2 — Issue Planning**
Create issues for each chunk of work, e.g.:
- `#1 Build hero section`
- `#2 Build links section`
- `#3 Build footer`
- `#4 Add dark/light toggle`
- `#5 Style responsive layout for mobile`

Assign roughly half to "dev-A" and half to "dev-B" conceptually (even though it's you on both).

**6.3 — Parallel Branch Work**
- `dev-A` branches `feature/hero-section` off latest `main`, builds it, opens PR, links `Closes #1`.
- `dev-B` branches `feature/links-section` off latest `main` AT THE SAME TIME (before #1 merges) — this sets up a natural future conflict/sync point on purpose.
- Review each other's PRs properly (real comments), merge using squash strategy (Phase 2.5).

**6.4 — Deliberate Conflict Point**
Before merging `feature/links-section`, sync it with the now-updated `main` (Phase 1.5) — since both branches likely touched `index.html`'s structure, you should hit a real conflict here. Resolve it properly (Phase 3.3), don't dodge it by avoiding overlapping files.

**6.5 — Continue the Remaining Features**
Repeat the branch → PR → review → merge → sync loop for issues #3, #4, #5. By now this should start feeling repetitive in a *good* way — that's the muscle memory forming.

**6.6 — Simulate a Mistake and Recovery**
On purpose: merge a PR that has an obvious tiny bug (e.g., wrong color value). Once merged into `main`, use `git revert` (Phase 4.2) through GitHub's PR revert button to undo it properly, instead of editing it away quietly. This proves you can handle "oops, that broke something" the professional way.

**6.7 — Final Review of the Repo's Story**
Run `git tree` (your alias) on the finished `main`. You should be able to look at the graph and actually narrate the whole story: "this is where dev-A and dev-B worked in parallel, here's the conflict point, here's the revert." If you can narrate your own repo's history out loud, you've actually learned this — not just typed commands.

**6.8 — Optional Polish**
Add a project board (5.5), tidy the README with setup instructions a stranger could follow, delete all merged branches (2.6).

---

## Quick Reference: Commands You'll Use Constantly

```bash
git switch -c <branch>             # new branch
git switch <branch>                # change branch
git status                         # what's going on right now
git add -p                         # stage thoughtfully
git commit -m "message"            # commit
git push -u origin <branch>        # push new branch first time
git push                           # push after that
git fetch origin                   # check remote without merging
git pull origin main               # fetch + merge main
git tree                           # (your alias) visualize history
git branch --merged main           # safe-to-delete branches
git stash / git stash pop          # you already know this one
git reset --soft|--mixed|--hard HEAD~1   # undo locally, unpushed only
git revert <hash>                  # undo safely, even if shared
git reflog                         # recover "lost" work
```

---

## How You'll Know You're Actually Done

You're done with this course not when you've read every section, but when:
- You branch off latest `main` automatically, without thinking about it.
- A merge conflict makes you mildly annoyed, not panicked.
- You can explain to someone else why `reset` and `revert` are different and when to use which.
- You've actually clicked "Approve" and "Request changes" as a reviewer, not just as an author.
- You can look at `git tree` output on a real repo and tell its story.

Good luck, and genuinely — most working developers never deliberately practiced conflicts like this. You'll walk into team Git situations more prepared than a lot of people with actual "experience" on their resume.

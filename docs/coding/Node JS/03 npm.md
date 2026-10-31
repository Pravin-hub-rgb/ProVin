In the previous file we saw that you can split your own code into modules. But one real question remains — **do you have to write packages like React Router, Express, zod yourself?** Imagine if every project needed routing written from scratch, form validation built from scratch — a project would take 2 months and everyone's code would be different.

Solution? **Use packages other developers have built — without writing them yourself.** And the manager that downloads them is **npm** (Node Package Manager).

## What Is npm — In One Line

**npm** is a package manager — an online registry (library) plus a command-line tool that downloads, installs, and updates ready-made code packages.

Think of a **mega kitchen warehouse** where every kind of ready-made ingredient is available. You don't have to make pasta yourself to make pasta — you get ready pasta from the warehouse. npm is that warehouse for JavaScript packages.

## Starting a Project — `npm init`

Every new Node project starts with `npm init`:

```bash
npm init -y
```

`-y` means "yes, go with default answers" — otherwise npm asks questions (project name, version, description). This command creates a **`package.json`** file.

**`package.json` is the project's identity card** — name, version, dependencies, scripts, all of it. It looks something like this:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

## Installing a Package — `npm install`

Now install a package. Example: a **date formatting library** `date-fns`:

```bash
npm install date-fns
```

What happened?
1. The package was downloaded from the npm registry
2. The code landed in the `node_modules/` folder
3. An entry was added to `dependencies` in `package.json`
4. `package-lock.json` was created (a record of exact versions)

Now use it in code:

```javascript
// app.js
import { format } from 'date-fns';

console.log(format(new Date(), 'dd MMM yyyy'));  // 07 Aug 2026
```

**Notice:** `import { format } from 'date-fns'` — without `./`! Because `date-fns` is not your own file, it's a **package** (comes from node_modules). Here the `./` rule flips — relative file = `./`, package = direct name.

## Dependencies vs DevDependencies

There are two kinds of packages:

```bash
npm install express              # dependency — needed in production too
npm install -D nodemon           # devDependency — only in development
```

| | `dependencies` | `devDependencies` |
|---|---|---|
| How to install | `npm install express` | `npm install -D nodemon` |
| What it is | Needed to run the app | Development tools only |
| Examples | express, react, zod | nodemon, typescript, eslint |
| Production | Installed | Not installed |

**Why the example:** `express` is your server — it runs in production too. `nodemon` only restarts the server on file changes during dev — no use in production.

## `node_modules` — Where the Code Goes

Package code is downloaded into the **`node_modules/`** folder by `npm install`. This folder:

- Is **never committed to Git** — it has thousands of files (sometimes 100MB+)
- Goes in `.gitignore`
- **Why it's safe:** anyone can recreate the exact packages from `package.json` + `package-lock.json` with `npm install`

```gitignore
# .gitignore
node_modules
```

**Real relevance:** When you create a Next.js project (`create-next-app`), it sets up package.json, node_modules, and all dependencies for you. React Router, Tailwind, zod — all of them come via npm. You've used `npm install <package>` throughout the React course — now you know what happens behind it.

## Scripts — Shortcutting Your Commands

The `scripts` section in `package.json` lets you create shortcuts for commands:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

```bash
npm run dev     # runs nodemon index.js
npm start       # runs node index.js
```

**`npm start`** and **`npm run dev`** — these are the same commands you use in Next.js as `npm run dev`/`npm run build`. Every framework defines its own scripts in package.json.

## Common Mistakes

- ❌ Committing `node_modules` to Git — it's a huge folder and packages can be recreated from package.json. Put it in `.gitignore`.
- ❌ Running the project without `npm install` — if node_modules is missing, run `npm install` first.
- ❌ Wrong package name (`datefns` without the dash) — npm throws "not found". Check the correct name in the registry.
- ❌ Installing a production package with `-D` — anything needed at runtime belongs in `dependencies`.
- ❌ Deleting `package-lock.json` — it locks exact versions. Keep it for reproducibility.

## In Your Own Words

1. What does npm do?

<details>
<summary>Sample Answer</summary>

**Answer:** npm is a package manager — a registry + tool that downloads, installs, and updates ready-made JavaScript packages. `npm install <package>` brings a dependency into your project.

</details>

2. What is the role of `package.json`?

<details>
<summary>Sample Answer</summary>

**Answer:** It's the project's identity card — name, version, dependencies (which packages), and scripts (commands like npm run dev). npm uses it to know what to install.

</details>

3. Why don't we commit `node_modules` to Git?

<details>
<summary>Sample Answer</summary>

**Answer:** Because it's a huge folder of thousands of files, and anyone can recreate it by running `npm install` using `package.json` + `package-lock.json`. Committing it just bloats the repo for no benefit.

</details>

4. What's the difference between `dependencies` and `devDependencies`?

<details>
<summary>Sample Answer</summary>

**Answer:** `dependencies` are needed to run the app in production (express, react). `devDependencies` are development-only tools (nodemon, typescript) that aren't installed in production. Add a devDependency with `npm install -D`.

</details>

## What It Is NOT

⚠️ **npm comes with Node — you don't install it separately.** Installing Node brings npm along. Check the version with `npm -v`.

⚠️ **Deleting `node_modules` is safe (if it's in `.gitignore`).** `npm install` recreates it. "Delete node_modules and reinstall" is a common trick to fix old problems.

⚠️ **npm is NOT only "installing dependencies".** Scripts (npm run), package management, versioning, publishing — all of that is npm's job. Everything you did with `npm install` in the React course was npm.

⚠️ **Manually editing `package.json` isn't wrong, but be careful.** Adding/removing dependencies via npm commands is safest — npm keeps the lock file in sync.

---

Now you have a path to packages. But one more important thing remains — **Node is single-threaded, so how does it handle so many requests at once?** That's the **Event Loop** — the most important concept to understand. Next topic. Let's go.
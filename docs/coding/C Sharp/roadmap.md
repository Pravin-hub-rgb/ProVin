The project is complete — endpoints, search, validation, errors. Last file: running it, testing everything, connecting to React, and writing the README. This is the polish that makes a project truly complete — run it, test it, document it: only when all three are done is it a "project".

# Run, Test and README

## First: Clean Build and Run

```bash
dotnet build          # 0 errors?
dotnet run
```

The terminal will show a URL — `http://localhost:5231` (the port may differ). Open Swagger at `/swagger` — run all 6 endpoints one by one with **Try it out**.

## Test Checklist — Every Case via Postman/Swagger

Copy this checklist — it works for every project:

**Happy path (everything correct):**
```
GET    /api/books             → 200, items array + total
GET    /api/books/1           → 200, book object
POST   /api/books (valid body) → 201 + Location header
PUT    /api/books/1 (body)    → 200
DELETE /api/books/2           → 204
```

**Edge cases (look for these in every test):**
```
GET    /api/books/999          → 404 { "error": "Book not found" }
POST   /api/books {empty body} → 400 (validation — Title required)
POST   /api/books {price: -5}  → 400 (Range validation)
GET    /api/books?page=0&pageSize=999 → page=1, pageSize=50 (clamp works)
GET    /api/books/search?q=clean       → only matching ones
DELETE /api/books/999          → 404
```

**Wrong body (tomorrow's format):**
```
PUT /api/books/1 { "name": "wrong-field" } → 400 — DTO not created
```

Note the response for each case — you can put this table in the README too.

## Connecting to React (the 5.5 Flow — For Real Now)

In your React app at `http://localhost:3000`:

```javascript
const API = import.meta.env.VITE_API_URL;   // http://localhost:5231

export async function fetchBooks(page = 1) {
  const res = await fetch(`${API}/api/books?page=${page}&pageSize=10`);
  if (!res.ok) throw new Error("Failed to load books");
  return res.json();       // { page, pageSize, total, items }
}

export async function addBook(book) {
  const res = await fetch(`${API}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);     // structured error — from 6.3
  }
  return res.json();
}
```

**The most common first problem:** CORS. Restart the API after a policy change, and check that `WithOrigins` has the right React URL (`http://localhost:3000`) — port included.

## README — How the Project Looks on GitHub

`README.md` (project root):

```markdown
# Library Management API

ASP.NET Core Web API + Entity Framework Core (SQLite) — books CRUD,
search, pagination and structured error handling.

## Tech Stack
- C# / .NET 8 — ASP.NET Core Web API
- Entity Framework Core + SQLite (SQL Server compatible)
- OpenAPI/Swagger (testing)

## Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET    | /api/books?page=&pageSize= | List + pagination |
| GET    | /api/books/search?q=&genre=&maxPrice= | Search/filter |
| GET    | /api/books/{id} | Get one (404) |
| POST   | /api/books | Create (201) |
| PUT    | /api/books/{id} | Update |
| DELETE | /api/books/{id} | Delete (204) |

## Run
dotnet tool install --global dotnet-ef
dotnet ef database update
dotnet run
Swagger: /swagger

## Features
- Validation (DataAnnotations → 400)
- Structured errors `{ error, field }`
- CORS (React frontend ready)
- Pagination with Skip/Take + pageSize clamp
- DTOs (CreateBookDto / BookDto) — mass-assignment safe

## React frontend
VITE_API_URL=http://localhost:5231
```

The README is the project's first face. **Endpoints table + run steps + features** — a developer understands the project in 30 seconds.

## Push to Git

```bash
git init
# check .gitignore: bin/, obj/, *.db
git add .
git commit -m "Library Management API — ASP.NET Core + EF Core"
gh repo create library-api --public --source=. --push   # or manually via GitHub
```

## The 30-Second Project Pitch

> "I built a Library Management API on ASP.NET Core. I used EF Core + SQLite, with CRUD plus search and pagination. Validation is via DataAnnotations, errors come back as structured JSON (`{error, field}`), and DTOs prevent mass-assignment. CORS is enabled so my React frontend can call it. I tested with Swagger and Postman — 404/400 edge cases covered."

Those 4 lines tell the whole story of the project in one place — anyone you show it to understands it in a minute.

## What's Next (When You Have Time)

1. **Add JWT auth** (5.4) — `/api/login` + `.RequireAuthorization()`
2. **Switch to SQL Server** (`UseSqlServer` + connection string) — production setup
3. **xUnit tests** — service-layer tests via `dotnet new xunit`
4. **Docker** — deploy via `Dockerfile`

But for now: project complete, running locally, README ready. **Course done!**

## In Your Own Words

1. Why `201` for POST `/api/books` and `200` for GET — why different, and what does the `Location` header say?

<details>
<summary>Sample Jawab</summary>

**Jawab:** 201 = "a new thing was created" (POST's success), 200 = general OK (GET/PUT). The Location header carries the new resource's URL (`/api/books/3`) — the client learns where that resource can now be found. These are REST conventions — tooling relies on them.

</details>

2. List 4 edge cases that every CRUD API must cover.

<details>
<summary>Sample Jawab</summary>

**Jawab:** (1) Not found → 404 structured error, (2) Bad/missing body → 400 validation, (3) Extreme inputs (`page=0`, `pageSize=99999`) → clamp/sanitize, (4) Wrong method/route → 404/405. Alongside the happy path (200/201), these 4 are essential in every complete API.

</details>

3. Why is the `res.ok` check and reading `err.error` essential in React's `addBook`?

<details>
<summary>Sample Jawab</summary>

**Jawab:** `fetch` doesn't throw on 400/404 — only `res.ok` tells you it failed. Reading the backend's structured `{error}` lets you show the user the right message (the validation message); otherwise the UI shows a generic "failed" or ignores the response.

</details>

4. What goes in a README and why is it important?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Tech stack, endpoints table, run steps (`dotnet ef update`, `dotnet run`), features list. Important because a developer understands the project in 30 seconds — cloning and running must be possible. A good README makes the project feel usable.

</details>
", filePath: "C:\Users\Pravin\Desktop\main\ProVin\docs\coding\C Sharp\Module 6 - Project Library API\6.4 Run Test aur README.md"}
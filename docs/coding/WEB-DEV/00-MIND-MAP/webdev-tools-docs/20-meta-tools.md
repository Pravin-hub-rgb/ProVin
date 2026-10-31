# 20 — Meta Tools: TypeScript, tRPC, Zod, Monorepos, Package Managers

> Umbrella: Meta Tools
> Job: Type safety, full-stack APIs, code organization, package management
> These tools don't fit into one category — they work across the whole stack

---

## TypeScript
**Tag: 🟢 Industry Standard | Learn ASAP**

```
What it is: JavaScript + Types — define the type of variables beforehand
When to use: Almost every production project — default in 2024

Why important:
  → Typos → Compile-time error (not runtime)
  → Better autocomplete
  → Safe refactoring
  → Easy to understand code in a team

Code feel:
  // JavaScript — no type safety
  function addToCart(item) { ... }
  addToCart(123)  // Mistake — passed a number, no error

  // TypeScript — type safe
  interface CartItem { id: number; name: string; price: number }
  function addToCart(item: CartItem) { ... }
  addToCart(123)  // ❌ Error at compile time — "number is not CartItem"

Real app:
  → Almost every serious Indian startup uses TypeScript
  → Next.js .tsx files — TypeScript by default

With Zod:
  → Zod schema → TypeScript type automatically
  → Same types on frontend + backend

In India: Almost mandatory for new projects after 2022
Beginners: Learn JavaScript first → then TypeScript (1-2 months later)
```

---

## tRPC
**Tag: 🟢 End-to-end Type Safety | Next.js + TypeScript**

```
What it is: API layer — type-safe RPC calls between frontend and backend
When to use:
  → TypeScript project
  → Frontend and backend in the same codebase (monorepo or Next.js)
  → Don't want to write REST endpoints manually

What it solves:
  REST API problem:
    Backend: POST /api/orders returns an Order type
    Frontend: Has to guess what comes back — types maintained manually

  tRPC:
    Define a procedure in the backend → frontend automatically knows the types
    No manual API contract — the type system handles it

Code feel:
  // Server
  const appRouter = router({
    createOrder: procedure
      .input(z.object({ address: z.string() }))
      .mutation(async ({ input, ctx }) => {
        return await createOrder(ctx.userId, input.address)
      })
  })

  // Client — fully typed, no API docs needed
  const order = await trpc.createOrder.mutate({ address: '123 MG Road' })
  // TypeScript knows the order's type automatically

Real app example:
  → T3 Stack: Next.js + tRPC + Prisma + Tailwind + NextAuth — popular combo
  → Internal tools, SaaS dashboards

When NOT to use:
  → Building a public API (third parties will use it) → REST or GraphQL
  → Separate mobile app → REST is better
  → tRPC is only for same-codebase frontend-backend

In India: Popular among T3 Stack users — growing
```

---

## OpenAPI / Swagger
**Tag: 🟢 API Documentation | REST standard**

```
What it is: REST API documentation format — auto-generate docs
When to use:
  → Public API
  → Multiple teams use the same API
  → Need to document the API contract

Code feel:
  // Zod-to-OpenAPI or manual
  /**
   * @openapi
   * /api/products:
   *   get:
   *     summary: Get all products
   *     responses:
   *       200:
   *         description: Product list
   */

Swagger UI:
  → Interactive documentation at /api-docs
  → Teams can test the API without Postman

Difference from tRPC:
  → OpenAPI: Public REST APIs, multiple clients
  → tRPC: Internal, TypeScript-only, same codebase
```

---

## Monorepos

```
What it is: Multiple projects in one repository
When needed:
  → Web app + Mobile app + Shared components
  → Multiple microservices
  → Shared types/utilities across projects
```

### Turborepo
**Tag: 🟢 Most Popular | Vercel**

```
What it is: Monorepo build system — fast builds, caching
When to use: Multiple Next.js apps, shared packages

Structure:
  /apps
    /web          → shopkaro.com
    /admin        → admin.shopkaro.com
    /mobile       → React Native
  /packages
    /ui           → Shared components
    /types        → Shared TypeScript types
    /config       → Shared configs
```

### Nx
**Tag: 🟢 Enterprise Monorepo | More features**

```
What it is: Enterprise monorepo tool — code generation, dependency graph
When to use: Large teams, complex monorepo

Difference from Turborepo: More features, more complex
```

---

## Package Managers

---

### npm
**Tag: 🟢 Default | Always available**

```
What it is: Node.js's default package manager
When to use: Simple projects, default is fine

Cons: Slower than alternatives, larger node_modules
```

---

### pnpm
**Tag: 🟢 Recommended | Fast | Disk efficient**

```
What it is: Fast, disk-efficient package manager
When to use: Almost always — better than npm

Pros:
  → 2x faster than npm
  → Disk space: shares packages → less total space
  → Monorepos: pnpm workspaces built-in

In India: Growing — especially monorepo users
```

---

### Yarn
**Tag: 🟡 Older npm alternative | Declining**

```
Status: pnpm took its popularity — avoid in new projects
Existing: Yarn codebase present → leave it
```

---

### Bun
**Tag: 🟢 All-in-one | Fastest | New**

```
What it is: JavaScript runtime + package manager + bundler — all in one
Runtime: Node.js alternative — 3x faster
Package manager: Faster than pnpm too

When to use:
  → Speed is critical
  → Using Elysia framework
  → Experimenting

Status: 1.0 released — being used in production
Cons: Smaller ecosystem — some Node.js-specific packages don't work on Bun

In India: Experimental projects — watch it
```

---

## Complete Series Summary — Look Once

```
FRONTEND:
  State:       Zustand (new) | Redux Toolkit (enterprise) | Context (stable)
  Styling:     Tailwind (new) | CSS Modules (safe) | SCSS (design system)
  Components:  shadcn/ui (new) | MUI (enterprise) | Ant Design (B2B)
  Forms:       React Hook Form + Zod
  HTTP:        React Query + Axios (or fetch)
  Animation:   Framer Motion (UI) | GSAP (marketing)
  Framework:   Next.js (almost always)

BACKEND:
  Framework:   Next.js API routes (simple) | Hono/Fastify (dedicated) | NestJS (enterprise)
  ORM:         Prisma (default) | Drizzle (edge) | Mongoose (MongoDB)
  Real-time:   Socket.io (two-way) | SSE (one-way) | Pusher (serverless)
  Email:       Resend (new) | SendGrid (enterprise)
  Queue:       Inngest (serverless) | BullMQ (self-hosted)
  Storage:     Cloudinary (images) | S3 (enterprise) | Uploadthing (Next.js)

DATABASE:
  SQL:         PostgreSQL (default) | MySQL (legacy/WordPress)
  Hosted:      Neon (serverless) | Supabase (all-in-one)
  NoSQL:       MongoDB (flexible) | Redis (cache/queue)
  Search:      Algolia (managed) | Typesense (self-host) | Postgres FTS (simple)

AUTH:          NextAuth (Next.js) | Clerk (fast) | Better Auth (new)

TESTING:       Vitest + RTL (unit) | Playwright (E2E) | MSW (mocking)

DEVOPS:
  Hosting:     Vercel (Next.js) | Railway (full backend) | AWS (enterprise)
  CI/CD:       GitHub Actions
  Monitoring:  Sentry (errors) | PostHog (analytics)

META:          TypeScript (always) | tRPC (internal APIs) | pnpm (package manager)
```

---

This is the entire web dev world — every tool's name, umbrella, and when to use it. 🎯

# 08 — Backend Frameworks: Express, Fastify, Hono, NestJS

> Umbrella: Backend → Frameworks
> Purpose: HTTP server — receive requests, process them, respond
> Note: If using Next.js → use API routes, separate backend is optional

---

## When You Need a Separate Backend Framework

```
Next.js API routes are enough when:
  → One team, one codebase
  → Simple to medium complexity
  → App like ShopKaro

When you need a separate backend framework:
  → Multiple frontends (web + mobile) use the same API
  → Microservices architecture
  → Backend team is separate
  → Need more control than Next.js provides
```

---

## Tools

---

### Express.js
**Tag: 🟡 Legacy | Most Known | Huge ecosystem**

```
What it is: Minimal, unopinionated Node.js framework — most popular 2015-2022
When to use:
  → Existing Express codebase
  → For learning — concepts become clear
  → Need many Express-specific libraries

When NOT to use:
  → New project — Fastify or Hono better for performance
  → TypeScript-first project — NestJS or Hono better

Real app example:
  → Older Zomato backend (hypothetically)
  → Majority of Indian startups 2015-2022
  → Half of npm packages have Express examples

Code feel:
  const express = require('express')
  const app = express()

  app.get('/products', async (req, res) => {
    const products = await db.find()
    res.json(products)
  })

  app.listen(3000)

Cons:
  → Slow compared to Fastify/Hono
  → TypeScript setup manual
  → No structure — you decide everything

In India: Found in many old projects — still taught in bootcamps
```

---

### Fastify
**Tag: 🟢 Express Alternative | Fast | TypeScript-friendly**

```
What it is: Like Express but 2x fast, better TypeScript support
When to use:
  → New Node.js backend, don't want Express
  → Performance matters
  → TypeScript project

Difference from Express:
  → 2x faster than Express (benchmarks)
  → Schema-based validation built-in (Zod/JSON Schema)
  → Better plugin system
  → Cleaner TypeScript support

Real app example:
  → Mid-large Indian startups migrating from Express
  → Mercurius (GraphQL on Fastify) — used by Nearform

Code feel:
  const fastify = require('fastify')()

  fastify.get('/products', async (request, reply) => {
    return await getProducts()  // Automatically JSON serialized
  })

In India: Growing — Express in old projects, Fastify or Hono in new ones
```

---

### Hono
**Tag: 🟢 Modern | Edge-ready | TypeScript-first | Growing Fast**

```
What it is: Ultra-fast, lightweight web framework — multiple runtimes (Node, Deno, Bun, Edge)
When to use:
  → New backend, TypeScript project
  → Edge functions (Cloudflare Workers)
  → Want modern stack
  → Using Bun runtime

Special: Runs on Cloudflare Workers too — edge deployment
TypeScript: First-class support — types everywhere

Real app example:
  → API on Cloudflare Workers
  → Modern startups' new services
  → Bun + Hono → Very fast backend

Code feel:
  import { Hono } from 'hono'
  const app = new Hono()

  app.get('/products', async (c) => {
    const products = await getProducts()
    return c.json(products)
  })

  export default app

Difference from Express:
  → Hono: Multi-runtime, TypeScript-first, smaller
  → Express: Node.js only, CommonJS, older

In India: Being adopted in new projects — especially Cloudflare/edge users
```

---

### NestJS
**Tag: 🟢 Enterprise | TypeScript | Angular-like structure**

```
What it is: Opinionated TypeScript framework — decorators, modules, DI like Angular
When to use:
  → Large enterprise backend
  → Large team — need to enforce structure
  → Angular background
  → Microservices

Difference from Express/Fastify:
  → NestJS: Opinionated — structure decided beforehand
  → Express: Unopinionated — you decide structure
  → NestJS: More boilerplate but consistent
  → NestJS internally uses Express or Fastify

Real app example:
  → Large Indian product companies
  → Fintech backends
  → Companies with multiple backend developers

Code feel:
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
      return this.productsService.findAll()
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
      return this.productsService.create(createProductDto)
    }
  }

When NOT to use:
  → Small team, small project — overkill
  → No Angular background — steep learning curve

In India: Growing in enterprise — Infosys, TCS type companies + funded startups
```

---

### Elysia
**Tag: 🔵 Bun runtime | Ultra fast | New**

```
What it is: Framework optimized for Bun — extreme performance
When to use:
  → Using Bun runtime
  → Maximum performance needed

Status: New — small ecosystem, use carefully in production
What is Bun: Node.js alternative — JavaScript runtime, package manager, bundler all in one
```

---

### Koa
**Tag: 🟡 Express successor (same team) | Older**

```
What it is: Express's creators built this — modern async support
Status: Better than Express in 2018 — now replaced by Fastify/Hono
When to use: Existing Koa codebase
```

---

## Quick Decision

```
Need a backend separate from Next.js?
  ↓
TypeScript project?
  → Yes → Hono or Fastify or NestJS
  → No → Express (but learn TypeScript)

Team size?
  → Small team, startup → Hono or Fastify
  → Large team, enterprise → NestJS

Edge/Cloudflare deployment?
  → Hono (practically the only choice)

Existing codebase?
  → Use whatever's there — no need to rewrite
```

---

## India Reality

```
Bootcamp / Learning:           Express (most tutorials)
Startup (new 2024):            Hono or Fastify or Next.js API routes
Mid-size company:              Express or Fastify
Enterprise:                    NestJS
Microservices:                 NestJS or Hono per service
```

---

## Next Doc

`09-backend-orm.md` — ORMs — Prisma, Drizzle, Sequelize, TypeORM — all ways to talk to the database, when raw SQL, when ORM, when which ORM.

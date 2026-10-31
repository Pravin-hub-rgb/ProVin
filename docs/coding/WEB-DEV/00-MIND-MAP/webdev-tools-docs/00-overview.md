# 00 — The Complete Map: The World of Web Dev

> This doc is a **master index**.
> Hear any tool's name — find its bucket and category here.
> For details, go to the docs after each tool.

---

## Buckets — The World of Web Dev

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND        │  BACKEND         │  DATABASE         │
│  What user sees  │  Server logic    │  Data store       │
├─────────────────────────────────────────────────────────┤
│  AUTH            │  TESTING         │  DEVOPS / INFRA   │
│  Identity        │  Quality check   │  Deploy + Monitor │
├─────────────────────────────────────────────────────────┤
│  META TOOLS                                             │
│  Type safety, validation, monorepos                     │
└─────────────────────────────────────────────────────────┘
```

---

## FRONTEND

### State Management
| Tool | Tag | Doc |
|------|-----|-----|
| Zustand | 🟢 Most Popular 2024 | 01 |
| Redux Toolkit | 🟡 Enterprise / Legacy | 01 |
| Jotai | 🔵 Lightweight / Atomic | 01 |
| MobX | 🟠 Reactive / OOP | 01 |
| Recoil | 🔴 Deprecated | 01 |
| XState | 🔵 Complex Logic / Niche | 01 |
| React Context | 🟢 Built-in / Simple | 01 |
| Valtio | 🔵 Proxy-based | 01 |

### Styling
| Tool | Tag | Doc |
|------|-----|-----|
| Tailwind CSS | 🟢 Most Popular 2024 | 02 |
| CSS Modules | 🟢 Built-in / Safe | 02 |
| Styled Components | 🟡 Legacy CSS-in-JS | 02 |
| Emotion | 🟡 CSS-in-JS | 02 |
| Sass/SCSS | 🟢 Classic | 02 |
| Vanilla CSS | 🟢 Always valid | 02 |

### Component Libraries (UI Kits)
| Tool | Tag | Doc |
|------|-----|-----|
| shadcn/ui | 🟢 Most Popular 2024 | 03 |
| Radix UI | 🟢 Headless / Accessible | 03 |
| Material UI (MUI) | 🟡 Enterprise / Google Style | 03 |
| Ant Design | 🟡 Enterprise / Admin panels | 03 |
| Chakra UI | 🟡 Developer Friendly | 03 |
| Mantine | 🟢 Growing | 03 |
| DaisyUI | 🟢 Tailwind-based | 03 |
| Headless UI | 🟢 Tailwind team | 03 |

### Form Handling + Validation
| Tool | Tag | Doc |
|------|-----|-----|
| React Hook Form | 🟢 Most Popular | 04 |
| Zod | 🟢 Most Popular Validator | 04 |
| Yup | 🟡 Older, still common | 04 |
| Formik | 🟡 Legacy | 04 |
| Valibot | 🔵 Lightweight / New | 04 |
| Joi | 🟡 Backend-first validator | 04 |

### HTTP Client (API Calls)
| Tool | Tag | Doc |
|------|-----|-----|
| fetch (native) | 🟢 Built-in | 05 |
| Axios | 🟢 Most Popular | 05 |
| React Query / TanStack | 🟢 Server State Standard | 05 |
| SWR | 🟢 Vercel / Lightweight | 05 |
| ky | 🔵 Fetch wrapper / Lightweight | 05 |

### Animation
| Tool | Tag | Doc |
|------|-----|-----|
| Framer Motion | 🟢 Most Popular React | 06 |
| GSAP | 🟢 Complex Animations | 06 |
| CSS Animations | 🟢 Simple cases | 06 |
| React Spring | 🟡 Physics-based | 06 |
| Lottie | 🔵 After Effects files | 06 |

### Meta Frameworks (Full Stack)
| Tool | Tag | Doc |
|------|-----|-----|
| Next.js | 🟢 Industry Standard | 07 |
| Remix | 🟢 Growing / Web standards | 07 |
| Nuxt.js | 🟢 Vue ecosystem | 07 |
| SvelteKit | 🔵 Svelte ecosystem | 07 |
| Astro | 🟢 Content sites | 07 |
| TanStack Start | 🔵 New / Growing | 07 |

---

## BACKEND

### Frameworks
| Tool | Tag | Doc |
|------|-----|-----|
| Express.js | 🟡 Legacy / Most Known | 08 |
| Fastify | 🟢 Express alternative, fast | 08 |
| Hono | 🟢 Modern / Edge ready | 08 |
| NestJS | 🟢 Enterprise / TypeScript | 08 |
| Elysia | 🔵 Bun runtime | 08 |
| Koa | 🟡 Express-like, older | 08 |

### ORM (Talking to the Database)
| Tool | Tag | Doc |
|------|-----|-----|
| Prisma | 🟢 Most Popular / TypeScript | 09 |
| Drizzle | 🟢 Growing / Lightweight | 09 |
| Sequelize | 🟡 Legacy | 09 |
| TypeORM | 🟡 Legacy / NestJS common | 09 |
| Mongoose | 🟢 MongoDB standard | 09 |
| Kysely | 🔵 SQL query builder | 09 |

### Real-time
| Tool | Tag | Doc |
|------|-----|-----|
| Socket.io | 🟢 Most Popular WebSocket | 10 |
| Pusher | 🟢 Managed / Easy | 10 |
| Ably | 🟢 Enterprise real-time | 10 |
| WebSocket (native) | 🟢 Built-in | 10 |
| SSE (Server-Sent Events) | 🟢 One-way, simple | 10 |
| Partykit | 🔵 New / Cloudflare | 10 |

### Email
| Tool | Tag | Doc |
|------|-----|-----|
| Resend | 🟢 Most Popular 2024 | 11 |
| Nodemailer | 🟡 Classic / Self-hosted | 11 |
| SendGrid | 🟢 Enterprise | 11 |
| Postmark | 🟢 Transactional | 11 |
| AWS SES | 🟢 Cheap at scale | 11 |

### Background Jobs / Queues
| Tool | Tag | Doc |
|------|-----|-----|
| BullMQ | 🟢 Most Popular (Redis-based) | 12 |
| Inngest | 🟢 Managed / Serverless friendly | 12 |
| Trigger.dev | 🟢 Modern / TypeScript | 12 |
| Agenda | 🟡 MongoDB-based | 12 |
| node-cron | 🟢 Simple cron jobs | 12 |

### File Upload / Storage
| Tool | Tag | Doc |
|------|-----|-----|
| Cloudinary | 🟢 Images / Video / Transform | 13 |
| AWS S3 | 🟢 Enterprise standard | 13 |
| Uploadthing | 🟢 Next.js friendly | 13 |
| Supabase Storage | 🟢 Supabase users | 13 |
| Cloudflare R2 | 🟢 Cheap S3 alternative | 13 |

---

## DATABASE

### SQL (Relational)
| Tool | Tag | Doc |
|------|-----|-----|
| PostgreSQL | 🟢 Industry Standard | 14 |
| MySQL | 🟢 Legacy / WordPress | 14 |
| SQLite | 🟢 Local / Small apps | 14 |
| PlanetScale | 🟡 MySQL serverless | 14 |
| Neon | 🟢 PostgreSQL serverless | 14 |
| Supabase | 🟢 PostgreSQL + extras | 14 |
| Turso | 🔵 SQLite at edge | 14 |

### NoSQL
| Tool | Tag | Doc |
|------|-----|-----|
| MongoDB | 🟢 Most Popular NoSQL | 15 |
| Redis | 🟢 Cache / Sessions / Queues | 15 |
| DynamoDB | 🟢 AWS / Enterprise | 15 |
| Firestore | 🟢 Firebase / Google | 15 |
| Cassandra | 🟡 Large scale / Complex | 15 |

### Search
| Tool | Tag | Doc |
|------|-----|-----|
| Algolia | 🟢 Managed / Fast | 16 |
| Elasticsearch | 🟡 Self-hosted / Powerful | 16 |
| Typesense | 🟢 Open source Algolia | 16 |
| MeiliSearch | 🟢 Easy self-host | 16 |
| Postgres Full Text | 🟢 Already have Postgres | 16 |

---

## AUTH

| Tool | Tag | Doc |
|------|-----|-----|
| NextAuth / Auth.js | 🟢 Next.js standard | 17 |
| Clerk | 🟢 Fastest setup / UI included | 17 |
| Lucia | 🟢 Lightweight / DIY | 17 |
| Passport.js | 🟡 Express classic | 17 |
| Supabase Auth | 🟢 Supabase users | 17 |
| Firebase Auth | 🟢 Google ecosystem | 17 |
| Auth0 | 🟢 Enterprise | 17 |
| Kinde | 🟢 Growing / Simple | 17 |
| Better Auth | 🟢 New / TypeScript-first | 17 |

---

## TESTING

| Tool | Tag | Doc |
|------|-----|-----|
| Vitest | 🟢 Unit / Most Popular 2024 | 18 |
| Jest | 🟡 Unit / Legacy standard | 18 |
| React Testing Library | 🟢 Component testing | 18 |
| Playwright | 🟢 E2E / Industry standard | 18 |
| Cypress | 🟡 E2E / Older | 18 |
| MSW (Mock Service Worker) | 🟢 API mocking | 18 |
| Storybook | 🟢 Component development | 18 |

---

## DEVOPS / INFRA

### Hosting / Deploy
| Tool | Tag | Doc |
|------|-----|-----|
| Vercel | 🟢 Next.js standard | 19 |
| Netlify | 🟢 Frontend / JAMstack | 19 |
| Railway | 🟢 Full stack / Simple | 19 |
| Render | 🟢 Heroku alternative | 19 |
| AWS | 🟢 Enterprise standard | 19 |
| Fly.io | 🟢 Containers / Global | 19 |
| Cloudflare Pages | 🟢 Edge / Fast | 19 |
| Digital Ocean | 🟢 Simple VPS | 19 |

### CI/CD
| Tool | Tag | Doc |
|------|-----|-----|
| GitHub Actions | 🟢 Most Popular | 20 |
| GitLab CI | 🟢 GitLab users | 20 |
| CircleCI | 🟡 Older | 20 |

### Monitoring / Logging
| Tool | Tag | Doc |
|------|-----|-----|
| Sentry | 🟢 Error tracking standard | 20 |
| DataDog | 🟡 Enterprise APM | 20 |
| LogRocket | 🟢 Frontend sessions | 20 |
| PostHog | 🟢 Analytics + Feature flags | 20 |
| Axiom | 🟢 Logs / Vercel friendly | 20 |

---

## META TOOLS

### Type Safety + Validation
| Tool | Tag | Doc |
|------|-----|-----|
| TypeScript | 🟢 Industry Standard | 21 |
| Zod | 🟢 Runtime validation | 21 |
| Yup | 🟡 Older validator | 21 |
| Valibot | 🔵 Tiny / Growing | 21 |

### Full Stack Type Safety
| Tool | Tag | Doc |
|------|-----|-----|
| tRPC | 🟢 End-to-end type safe API | 21 |
| OpenAPI / Swagger | 🟢 API documentation | 21 |
| GraphQL Codegen | 🟢 GraphQL + TypeScript | 21 |

### Monorepo
| Tool | Tag | Doc |
|------|-----|-----|
| Turborepo | 🟢 Most Popular | 22 |
| Nx | 🟢 Enterprise | 22 |
| pnpm workspaces | 🟢 Simple monorepo | 22 |

### Package Managers
| Tool | Tag | Doc |
|------|-----|-----|
| npm | 🟢 Default | 22 |
| pnpm | 🟢 Faster / Disk efficient | 22 |
| yarn | 🟡 Older alternative | 22 |
| bun | 🟢 Fastest / New | 22 |

---

## What the Tags Mean

```
🟢 Recommended / Popular / Use it
🟡 Legacy / Old / Found in existing projects
🔵 Niche / Specific use case / Explore
🔴 Avoid / Deprecated
```

---

---

## 🎬 **The Complete Flow — A Website's Story**

> This section explains how **all the tools work together** — through a real user journey.

### **Scene: User clicked "Add to Cart"**

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. USER INTERFACE (Frontend - React/Next.js)                       │
│     └─ User clicked "Add to Cart"                                   │
│     └─ onClick handler → Zustand store updated                      │
│     └─ Cart state change → UI re-render (React.memo optimized)       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  2. STATE MANAGEMENT (Zustand/Context)                              │
│     └─ Cart items array updated                                     │
│     └─ Global state change → Navbar, Cart page, all updated         │
│     └─ Persisted to LocalStorage (Zustand middleware)               │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  3. SERVER STATE (React Query)                                      │
│     └─ Sync cart data with server                                   │
│     └─ Optimistic update → UI updates instantly                     │
│     └─ Background API call → Saved on server                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  4. API CALL (Axios/fetch + tRPC)                                   │
│     └─ POST /api/cart { productId, quantity }                       │
│     └─ tRPC → End-to-end type safety                                │
│     └─ Zod validation → Input validated                             │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  5. AUTH CHECK (NextAuth/JWT/Cookie)                                │
│     └─ Cookie sent with request                                     │
│     └─ JWT verified → User authenticated                            │
│     └─ Session data extracted → User ID obtained                    │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  6. BACKEND LOGIC (Express/Next.js API)                             │
│     └─ Controller: addToCart(userId, productId, quantity)           │
│     └─ Business logic: Stock check, price calculation                │
│     └─ Prisma: Database query built                                 │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  7. DATABASE (PostgreSQL/MongoDB)                                   │
│     └─ Prisma: INSERT INTO cart_items (user_id, product_id, qty)    │
│     └─ Transaction: Stock update + Cart insert (atomic)             │
│     └─ Response: { success: true, cart: [...] }                     │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  8. CACHE (Redis)                                                   │
│     └─ Cart count cache updated                                     │
│     └─ Ready for next request                                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│  9. RESPONSE BACK TO FRONTEND                                       │
│     └─ React Query: Cache update, components re-render              │
│     └─ Zustand: Cart state final update                             │
│     └─ UI: Cart badge count update, toast notification              │
└─────────────────────────────────────────────────────────────────────┘
```

---

### **Meaning of Each Concept — With Real Examples**

#### **1. State Management (Zustand/Context)**
```
Meaning: The app's "memory" system.

Example:
- 3 items in cart → This is STATE
- User is logged in → This is STATE
- Modal is open → This is STATE

Zustand: Global state manager — accessible across the whole app
Context: Simple global state — built-in React feature

In ShopKaro:
- Zustand: Cart items, user info, theme
- Context: Theme, language
- useState: Search input, modal open/close
```

#### **2. Server State (React Query)**
```
Meaning: Data that came from the server — which can change anytime.

Example:
- Products list → Came from server (can change anytime)
- User profile → Came from server (user can update)
- Order history → Came from server (new orders can arrive)

React Query:
- Fetches data
- Caches it
- Auto-revalidates (on window focus)
- Gives optimistic updates

In ShopKaro:
- Products list → via React Query
- User profile → via React Query
- Cart data → React Query + Zustand (hybrid)
```

#### **3. API (REST/tRPC/GraphQL)**
```
Meaning: The way frontend and backend talk to each other.

Example:
- GET /api/products → Fetch products
- POST /api/cart → Add to cart
- PUT /api/user → Update user

REST: Standard HTTP methods (GET, POST, PUT, DELETE)
tRPC: End-to-end type safe — like TypeScript functions
GraphQL: Ask for exact data — no over/under fetching

In ShopKaro:
- Products: REST API
- Cart: tRPC (for type safety)
- Search: GraphQL (for complex queries)
```

#### **4. Database (PostgreSQL/MongoDB)**
```
Meaning: Where data is stored permanently.

Example:
- Users table: id, name, email, password
- Products table: id, name, price, stock
- Orders table: id, user_id, total, status

PostgreSQL: SQL database — structured data, relations
MongoDB: NoSQL database — flexible schema, documents

In ShopKaro:
- PostgreSQL: Users, orders, products (structured)
- Redis: Cart count cache, sessions (fast access)
```

#### **5. ORM (Prisma/Drizzle)**
```
Meaning: An easy way to talk to the database — no need to write raw SQL.

Example:
// Raw SQL:
SELECT * FROM users WHERE id = 1;

// Prisma:
const user = await prisma.user.findUnique({ where: { id: 1 } });

Prisma: Type-safe, auto-complete, migrations
Drizzle: Lightweight, SQL-like, fast

In ShopKaro:
- Prisma: Main ORM — users, products, orders
- Drizzle: Simple queries — cache, logs
```

#### **6. Auth (NextAuth/JWT/Cookie)**
```
Meaning: Verifying who the user is.

Example:
- User logged in → Password verified
- JWT token created → Stored in cookie
- Token verified on every request

NextAuth: Complete auth solution — Google, GitHub, email
JWT: Token-based auth — stateless
Cookie: Stored in browser — sent automatically

In ShopKaro:
- NextAuth: Google, email login
- JWT: API authentication
- Cookie: To maintain the session
```

#### **7. Caching (Browser/CDN/Server)**
```
Meaning: Don't redo the same work — save time.

Example:
- Browser cache: Images, CSS, JS files
- CDN cache: Static assets (images, videos)
- Server cache: Database query results (Redis)

In ShopKaro:
- Browser: Product images cache
- CDN: Product images, videos
- Redis: Cart count, popular products
```

#### **8. Testing (Vitest/Playwright)**
```
Meaning: Verifying that code works correctly.

Example:
- Unit test: Is the function returning the right value?
- Integration test: Is the API giving the right response?
- E2E test: Is the user flow working correctly?

Vitest: Unit tests — fast, TypeScript support
Playwright: E2E tests — browser automation

In ShopKaro:
- Vitest: Utility functions, hooks
- React Testing Library: Components
- Playwright: Checkout flow, login flow
```

#### **9. DevOps (Vercel/GitHub Actions)**
```
Meaning: Taking code live and maintaining it.

Example:
- GitHub push → Build → Deploy → Live
- Error occurred → Sentry alert → Fix

Vercel: Hosting — automatic deploy
GitHub Actions: CI/CD — tests, build, deploy
Sentry: Error tracking — real-time alerts

In ShopKaro:
- Vercel: Frontend hosting
- Railway: Backend hosting
- GitHub Actions: Tests + Deploy pipeline
- Sentry: Error tracking
```

---

### **Quick Reference — Which Tool Where**

```
┌─────────────────────────────────────────────────────────────────────┐
│  USER CLICKED                                                       │
│  ↓                                                                  │
│  React Component (onClick handler)                                  │
│  ↓                                                                  │
│  Zustand Store Update (cart state)                                  │
│  ↓                                                                  │
│  UI Re-render (React.memo optimized)                                 │
│  ↓                                                                  │
│  React Query (optimistic update)                                    │
│  ↓                                                                  │
│  API Call (tRPC/REST)                                               │
│  ↓                                                                  │
│  Auth Check (JWT/Cookie verify)                                     │
│  ↓                                                                  │
│  Backend Controller (business logic)                                │
│  ↓                                                                  │
│  Prisma (database query)                                            │
│  ↓                                                                  │
│  PostgreSQL (data save)                                             │
│  ↓                                                                  │
│  Redis (cache update)                                               │
│  ↓                                                                  │
│  Response back to frontend                                          │
│  ↓                                                                  │
│  React Query (cache update)                                         │
│  ↓                                                                  │
│  Zustand (state sync)                                               │
│  ↓                                                                  │
│  UI Update (toast, badge count)                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Web Servers (Apache / Nginx)

These traditional web servers didn't appear in the overview because managed hosting handles them automatically today. But they're very important for interviews.

| Apache HTTP Server | Nginx |
|--------------------|-------|
| 🟡 Legacy / Since 1995 | 🟢 Modern / 2004 |
| Process based architecture | Event driven architecture |
| Gets slow under high load | 10x faster under high concurrency |
| .htaccess support | No .htaccess |
| Easy to configure | A bit tricky |
| Most popular for WordPress, PHP | Now industry standard everywhere |

✅ **What they actually do:**
- Accept requests on port 80 / 443
- Act as reverse proxy — forward requests to your application
- Handle SSL Certificates
- Serve static files
- Load balancing, rate limiting, gzip compression — all of it

✅ **Why you don't see them today:**
Vercel, Railway, Netlify, Render, Fly.io — Nginx runs behind all of them, but you never see it. Everything is managed automatically.

✅ **Industry Standard 2024:**
No new developer manually sets up Nginx anymore. Everyone uses managed hosting. But interviews ask about it, so you should have the basic idea.

---

## Next Doc

`01-frontend-state.md` — All state management tools in depth — Redux, Zustand, Jotai, MobX — with examples from apps like Zomato, Amazon, Swiggy.

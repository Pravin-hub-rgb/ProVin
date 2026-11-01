# The Skeleton — Anatomy of Any Full Stack Web App

> This is the map. Every full stack web app that has ever existed — whether it's Instagram, a college project, or Amazon — has these same parts. The tools change. The parts don't.
>
> Use this to understand a new project OR to plan one from scratch.

---

## 1. FRONTEND
*Everything the user sees and touches. Runs in the browser.*

- **UI Layer** — The visual components: buttons, forms, pages, modals, cards
- **Routing** — How the user moves between pages (Home → Product → Cart → Checkout)
- **State** — Data that lives in memory while the user is on the site (logged-in user, cart contents, what tab is open)
- **Styling** — How everything looks (colors, layout, spacing, fonts)
- **Forms** — Collecting input from the user and validating it before sending
- **Data Fetching** — How the frontend asks the backend for data and what it does while waiting
- **Error Handling** — What the user sees when something goes wrong (404, network error, server down)

---

## 2. COMMUNICATION LAYER
*The bridge between frontend and backend. How the two sides talk to each other.*

- **API** — The set of agreed URLs and formats the frontend uses to talk to the backend
  - **REST** — Each URL does one specific thing (most common)
  - **GraphQL** — One URL, you describe exactly what data you want
  - **RPC (tRPC etc.)** — Call backend functions directly like they're local
- **HTTP Methods** — The "verbs" of the conversation (GET = fetch, POST = create, PUT = update, DELETE = remove)
- **Request** — What the frontend sends (URL, method, headers, body data)
- **Response** — What the backend sends back (status code, data, error message)
- **Headers** — Metadata attached to every request/response (content type, auth token, cookies)
- **CORS** — The browser's security rule: frontend can only talk to backends it's allowed to
- **Status Codes** — The shorthand result of every request (200 OK, 404 Not Found, 401 Unauthorized, 500 Server Error)

---

## 3. MIDDLEWARE
*Code that runs on every single request before it reaches its destination. The gatekeeper layer.*

- **Authentication Check** — Is this user logged in? Do they have a valid token/session?
- **Authorization Check** — Are they ALLOWED to do what they're asking? (logged in ≠ has permission)
- **Rate Limiting** — Blocking users who are making too many requests too fast
- **Logging** — Recording what requests came in, when, from where
- **Request Validation** — Is the incoming data the right shape before it even reaches the handler?
- **Redirects** — Sending the user somewhere else based on their state (not logged in → go to /login)
- **CORS Handling** — Deciding which frontend origins are allowed to talk to this backend

---

## 4. BACKEND
*The brain. Business logic lives here. Runs on a server, never seen by the user.*

- **Route Handlers** — Functions that respond to specific API requests
- **Business Logic** — The actual rules of your app (calculate price, check stock, process order)
- **Validation** — Verifying incoming data is correct and safe before trusting it
- **Error Handling** — Catching failures and sending back meaningful error responses
- **Background Jobs** — Tasks that happen outside the request cycle (send email, resize image, generate report)
- **File Handling** — Receiving uploaded files and deciding where to store them
- **Third-party Integrations** — Talking to external services (payment gateway, email provider, SMS service)
- **Webhooks** — Receiving notifications from external services when something happens on their end

---

## 5. AUTHENTICATION & SESSIONS
*Answering the question: who is this person, and are they who they say they are?*

- **Registration** — Creating a new account (collect info, hash password, save to DB)
- **Login** — Verifying identity (check password hash, issue a token or session)
- **Password Hashing** — Storing passwords safely so even if DB leaks, passwords aren't exposed
- **Session** — Server-side record that a user is logged in (stored in DB or memory)
- **Token (JWT)** — A self-contained signed packet the client holds that proves who they are
- **Cookies** — Where the session ID or token is stored in the browser
- **OAuth** — Logging in via a third party (Google, GitHub, Facebook) — "Login with Google"
- **Logout** — Destroying the session or invalidating the token
- **Password Reset** — Verify identity via email, allow new password
- **Protected Routes** — Pages/endpoints that require login to access

---

## 6. AUTHORIZATION
*Authentication says WHO you are. Authorization says WHAT you're allowed to do.*

- **Roles** — Categories of users with different permissions (user, admin, moderator, guest)
- **Permissions** — Specific actions a role can or cannot do (can_delete, can_publish, can_view_dashboard)
- **Resource Ownership** — Can this user access THIS specific resource? (your order, not someone else's)
- **Row-Level Security** — Database-level rules that filter data based on who's asking

---

## 7. DATABASE
*The permanent memory. Everything that needs to survive a server restart lives here.*

- **Schema / Data Model** — The structure: what tables/collections exist, what fields they have, how they relate
- **Relationships** — How data connects (a user HAS MANY orders, an order BELONGS TO a user)
- **Queries** — Reading data (find all orders for user X, find product by ID)
- **Mutations** — Writing data (create, update, delete)
- **Migrations** — Changing the database structure over time without losing data
- **Indexes** — Making specific queries fast by pre-sorting data (like a book's index)
- **Transactions** — Grouping multiple operations so they either ALL succeed or ALL fail (critical for payments)
- **Connection Pooling** — Managing multiple simultaneous connections to the database efficiently
- **ORM** — A tool that lets you write code instead of raw SQL to talk to the database

---

## 8. FILE & MEDIA STORAGE
*The database stores text and numbers. Files (images, videos, PDFs) live somewhere else.*

- **Upload Handling** — Receiving a file from the user on the backend
- **Object Storage** — Where files actually live (a separate storage service, not the database)
- **CDN** — Serving files from servers close to the user so they load fast
- **Presigned URLs** — Letting the browser upload directly to storage without going through your server
- **File Validation** — Checking file type, size, and safety before storing

---

## 9. REAL-TIME
*Features where the server pushes updates to the client without the client asking.*

- **WebSockets** — A persistent two-way connection between browser and server
- **Server-Sent Events (SSE)** — One-way push from server to browser
- **Polling** — Browser repeatedly asks "anything new?" on a timer (simpler but less efficient)
- **Pub/Sub** — A messaging pattern where events are published and subscribers receive them

---

## 10. EMAIL & NOTIFICATIONS
*Communicating with users outside the browser.*

- **Transactional Email** — Automated emails triggered by actions (welcome email, order confirmed, password reset)
- **Email Templates** — Pre-designed HTML email layouts
- **Push Notifications** — Browser or mobile notifications
- **SMS** — Text message notifications

---

## 11. CACHING
*Storing results of expensive operations so you don't have to repeat them.*

- **In-memory Cache** — Ultra-fast storage for frequently accessed data (Redis etc.)
- **HTTP Caching** — Browser caches responses so it doesn't re-fetch the same data
- **CDN Caching** — Static assets cached at edge servers globally
- **Database Query Cache** — Storing results of slow DB queries

---

## 12. SECURITY
*Protecting the app and its users from attacks.*

- **Input Sanitization** — Cleaning user input to prevent injections
- **SQL Injection Prevention** — Parameterized queries so users can't inject SQL
- **XSS (Cross-Site Scripting)** — Preventing malicious scripts being injected into your pages
- **CSRF (Cross-Site Request Forgery)** — Preventing other websites from making requests on behalf of your users
- **HTTPS / SSL** — Encrypting all traffic between browser and server
- **Environment Variables** — Keeping secrets (API keys, DB passwords) out of the codebase
- **Rate Limiting** — Preventing brute force and abuse

---

## 13. DEPLOYMENT & INFRASTRUCTURE
*Where the app lives and how it gets there.*

- **Hosting** — The server(s) where your app runs
- **Build Process** — Converting your source code into something a server can run
- **Environment** — Development (your machine) vs Staging (test server) vs Production (real users)
- **CI/CD Pipeline** — Automated process: push code → tests run → app deploys
- **Domain & DNS** — The address users type and how it points to your server
- **SSL Certificate** — HTTPS, so traffic is encrypted
- **Reverse Proxy** — A gatekeeper server (NGINX etc.) that sits in front of your app
- **Process Manager** — Keeping the app running and restarting it if it crashes
- **Logs & Monitoring** — Tracking errors, performance, and usage in production
- **Scaling** — Handling more users (horizontal = more servers, vertical = bigger server)

---

## THE MAP AT A GLANCE

```
USER
 │
 ▼
FRONTEND ──────────── UI, Routing, State, Forms, Data Fetching
 │
 │ (HTTP Request)
 ▼
COMMUNICATION ──────── API (REST/GraphQL/RPC), Headers, CORS
 │
 ▼
MIDDLEWARE ─────────── Auth Check, Rate Limit, Logging, Validation
 │
 ▼
BACKEND ────────────── Route Handlers, Business Logic, Integrations
 │
 ├──► AUTHENTICATION ── Login, Sessions, Tokens, OAuth
 │
 ├──► AUTHORIZATION ─── Roles, Permissions, Ownership
 │
 ├──► DATABASE ──────── Schema, Queries, Transactions, ORM
 │
 ├──► FILE STORAGE ──── Upload, CDN, Object Storage
 │
 ├──► CACHE ─────────── Redis, CDN, HTTP Cache
 │
 └──► BACKGROUND JOBS ─ Email, Notifications, Processing
 │
 ▼
RESPONSE ───────────── Status Code + Data → back to Frontend
 │
 ▼
FRONTEND UPDATES ────── UI re-renders with new data
 │
 ▼
USER SEES THE RESULT
```

---

> **How to use this doc:**
> - Starting a new project? Go category by category and decide what you need.
> - Reading an old codebase? Use each category as a checklist — find where that project handles each one.
> - Confused about a concept? Go to Doc 2 for the same structure with real-world examples.
# 23 — API: What Is It

> Database umbrella complete — PostgreSQL, Prisma, Models.
> Now the fifth big umbrella — **API Design**.
> How do frontend and backend talk to each other?

---

## What Is an API

**API (Application Programming Interface)** — a set of rules that says how frontend asks the server for data.

Priya is browsing products:

```
Browser → "I need products" → Server
Server → Fetches from DB → "Here are the products" → Browser
Browser → Shows on screen
```

This conversation happens through the API. API is a **contract** — frontend knows where to send the request, server knows what to return.

---

## What's Inside the API Umbrella

```
API DESIGN
│
├── REST → Most common way — Doc 24
├── GraphQL → REST's alternative — Doc 25
└── ShopKaro endpoints → Doc 26
```

---

## HTTP Methods — Request Types

API requests come in different types:

| Method | Meaning | Example |
|--------|---------|---------|
| `GET` | Ask for data | Give me products list |
| `POST` | Create new data | Create new order |
| `PUT` | Replace entire data | Update profile |
| `PATCH` | Update some fields | Change order status |
| `DELETE` | Delete | Remove cart item |

---

## HTTP Status Codes — Response Types

Server sends a number along with the response:

| Code | Meaning | When |
|------|---------|------|
| `200` | OK | Request successful |
| `201` | Created | New resource created |
| `400` | Bad Request | Something wrong in request |
| `401` | Unauthorized | Not logged in |
| `403` | Forbidden | No permission |
| `404` | Not Found | Resource not found |
| `500` | Server Error | Something broke server-side |

---

## A Simple API Call — In ShopKaro

```javascript
// Frontend — Priya wants products
const response = await fetch('/api/products')
const products = await response.json()

// Backend — Server responds
// /app/api/products/route.js
export async function GET() {
  const products = await prisma.product.findMany()
  return Response.json(products, { status: 200 })
}
```

---

## Next Doc

`24-api-rest.md` — **REST** — the most common API style. How to design ShopKaro's REST endpoints — naming conventions, structure — we'll understand.
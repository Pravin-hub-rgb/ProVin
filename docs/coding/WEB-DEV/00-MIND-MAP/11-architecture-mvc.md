# 11 — MVC: Splitting Code Into Three Parts

> In the previous doc we saw the overview of the Architecture umbrella.
> Now the first pattern — **MVC**.
> You'll hear this name a lot — understand it straight once.

---

## What Is MVC

MVC stands for **Model-View-Controller** — dividing code into three responsibilities.

| Part | Job | In ShopKaro |
|------|------|---------------|
| **Model** | Data — what gets stored, how it gets fetched | Product, User, Order (Prisma) |
| **View** | UI — what the user sees | React components, pages |
| **Controller** | Logic — a request came, what should happen | API routes |

---

## An Order Placement Example

Priya clicks "Place Order." What happens?

### View — Button Click
```jsx
// /app/checkout/page.jsx
// UI only — no logic

function CheckoutPage() {
  async function handleOrder() {
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ cartItems, address })
    })
  }

  return <button onClick={handleOrder}>Place Order</button>
}
```

The View's job is only this — the user did something, tell the API.

---

### Controller — Handle the Request
```javascript
// /app/api/orders/route.js
// A request came — decide what to do

export async function POST(req) {
  // 1. Is the user logged in?
  const session = await getSession()
  if (!session) return Response.json({ error: "Please login" }, { status: 401 })

  // 2. Get the data
  const { cartItems, address } = await req.json()

  // 3. Call the Model — do the actual work
  const order = await createOrder(session.userId, cartItems, address)

  // 4. Send the response
  return Response.json({ orderId: order.id })
}
```

The Controller's job is to be the **traffic police** — a request came, decide where it goes. Don't do the data work yourself.

---

### Model — The Actual Data Work
```javascript
// /lib/orders.js
// Only data logic — no HTTP, no request, no response

export async function createOrder(userId, cartItems, address) {
  // Talk to the database
  const order = await prisma.order.create({
    data: {
      userId,
      address,
      status: 'pending',
      items: {
        create: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
    }
  })

  return order
}
```

The Model's job is **only data.** No UI, no request handling.

---

## Why This Separation Matters

**Scenario:** Tomorrow you also need to build a mobile app for ShopKaro.

```
Without MVC:
For mobile → rewrite all the logic again :(

With MVC:
For mobile → use the same /api/orders, only the View is different :)
```

**Scenario:** There's a bug in order creation.

```
Without MVC:
Where's the bug? → search the whole app :(

With MVC:
Data bug → /lib/orders.js
UI bug → /app/checkout/page.jsx
Request bug → /app/api/orders/route.js
:)
```

---

## Where Exactly Is MVC in Next.js

```
VIEW       → /app/(pages)/         React pages and components
CONTROLLER → /app/api/             API route handlers
MODEL      → /lib/                 Business logic + DB queries
             /prisma/schema.prisma  Define the data structure
```

---

## Important Note

MVC is a **concept** — not a strict rule. Next.js itself isn't an MVC framework. But you can apply this pattern — and you should.

In real projects this won't be perfectly clean — there's some overlap. Don't worry if everything doesn't fit perfectly.

---

## Summary

| | |
|--|--|
| **Model** | Data work — database queries, business logic |
| **View** | UI work — React components |
| **Controller** | Request handling — API routes |
| **Benefit** | Bugs are easy to find, code gets reused |

---

## Next Doc

`12-architecture-folder.md` — From theory to practice now. What will **ShopKaro's actual folder structure** look like — every folder's name, why it's there, what goes inside it. This is also a reference doc — you'll use it while building the project.
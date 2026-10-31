# 25 — GraphQL: REST's Alternative

> Previous doc covered REST — ShopKaro will use this.
> Now **GraphQL** — knowing the concept is important, you'll find it in many places.

---

## What GraphQL Solves

REST had one problem — over-fetching and under-fetching.

In GraphQL, **frontend decides** exactly what it needs:

```graphql
# REST: GET /api/products/123
# Returns entire product — whether you need it or not

# GraphQL: ask for only what you need
query {
  product(id: 123) {
    name
    price
  }
}

# Response — only this, nothing extra:
{
  "data": {
    "product": {
      "name": "Nike Shoes",
      "price": 2999
    }
  }
}
```

---

## REST vs GraphQL — Quick Comparison

| | REST | GraphQL |
|--|------|---------|
| Endpoints | Many separate endpoints | One endpoint (`/api/graphql`) |
| Data control | Server decides | Client decides |
| Over-fetching | Yes | No |
| Learning curve | Low | High |
| Caching | Easy (HTTP cache) | Complex |
| Best for | Simple CRUD apps | Complex, data-heavy apps |

---

## Multiple Things In One GraphQL Request

```graphql
# In one request: User + their orders + products in each order
query {
  user(id: 1) {
    name
    email
    orders {
      id
      status
      items {
        product {
          name
          price
        }
        quantity
      }
    }
  }
}
```

In REST this would be 3 separate requests:
1. `GET /api/users/1`
2. `GET /api/orders?userId=1`
3. `GET /api/orders/1/items`

---

## Should ShopKaro Use GraphQL?

**No — REST is enough for ShopKaro v1.**

GraphQL is useful when:
- Very complex data relationships exist
- Multiple clients (web, mobile) need different data
- Team is large, frontend/backend work separately

For ShopKaro:
- Simple CRUD operations
- One client (web app)
- Goal is learning — master REST first

Knowing the **concept** of GraphQL was necessary — it's asked in job interviews and you'll encounter it in other projects.

---

## Next Doc

`26-api-shopkaro.md` — All of ShopKaro's **endpoints in one place** — complete reference. Method, URL, request body, and response for every endpoint.
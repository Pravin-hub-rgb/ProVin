# 🗄️ Phase 4: Topic 19 - API Design — REST vs GraphQL

> **Interview Question:** "What's the difference between REST and GraphQL? When should you use REST and when GraphQL? What are Next.js Server Actions? How are they different from traditional APIs?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"REST = Fixed items on a restaurant menu. You get what you order. GraphQL = You can make your own food, take only what you want."**

REST = Standardized, predictable, reliable
GraphQL = Flexible, customizable, powerful

---

## 💡 Beginner-Friendly Explanation (Restaurant Analogy)

```
🍽️ REST API:
You went to a restaurant. The menu has fixed items:
- Full Thali: Poori, Sabzi, Dal, Rice, Salad, Sweet, Papad
- You only want Poori and Sabzi, but you have to take the full thali. All the extra items come along. You pay extra, it takes extra time.

🍳 GraphQL API:
You went to a restaurant. They tell you "say what you want and we'll make it."
- You say: "I only want Poori, Sabzi, and Rice."
- Only those 3 items come. Nothing extra. Less time, less cost.

⚡ Server Actions:
Now you're at home. You're telling the chef directly on your phone "make two rotis." He delivers at your door in 2 minutes. No waiter, no order slip, no menu. Direct work.
```

✅ **REST Problem:** Overfetching and Underfetching
✅ **GraphQL Solution:** Take exactly the data you want
✅ **Server Actions Solution:** No API needed anymore, just call a function directly

---

## 📊 Side by Side Comparison

| 🕰️ REST | 🎨 GraphQL | ⚡ Server Actions |
|--------|-----------|-------------------|
| Endpoints based | Query based | Function based |
| `GET /api/users` | `query { users { name email } }` | `async function getUsers()` |
| Fixed response structure | Client decides what data it wants | Server decides |
| Multiple endpoints for multiple resources | Single endpoint `/graphql` | No endpoints |
| HTTP Methods: GET POST PUT DELETE | Always POST | Normal function calls |
| Status codes: 200 404 500 | Always 200 OK | Normal exceptions |
| Around since 2006 | Around since 2015 | Next.js 13, 2023 |
| All clients support | Requires GraphQL client | Next.js App Router only |

---

## 🚨 REST's Problems

### Problem 1: Overfetching
You only want the user's name but you get the entire user object.

```tsx
// ❌ REST: 50 fields are coming, we only need 1
fetch('/api/users/1')
  .then(res => res.json())
  .then(user => {
    // id, name, email, password_hash, created_at, updated_at, last_login, address, phone, 40 more fields...
    console.log(user.name) // We only wanted this!
  })
```

### Problem 2: Underfetching
If you want the user's posts along with the user, you have to make 2 separate calls.

```tsx
// ❌ REST: 2 API calls
const user = await fetch('/api/users/1').then(res => res.json())
const posts = await fetch(`/api/users/${user.id}/posts`).then(res => res.json())
```

### Problem 3: N+1 Problem
If you need posts for 100 users, you have to make 101 API calls.

```tsx
// ❌ REST: 1 + 100 = 101 API calls
const users = await fetch('/api/users').then(res => res.json())

for (const user of users) {
  const posts = await fetch(`/api/users/${user.id}/posts`).then(res => res.json())
}
```

---

## ✨ How GraphQL Solves These Problems

### ✅ No Overfetching
Ask for only the fields you want, and only those come.

```graphql
query {
  user(id: 1) {
    name
  }
}
```

✅ **Response:**
```json
{
  "data": {
    "user": {
      "name": "John Doe"
    }
  }
}
```

### ✅ No Underfetching
Get user + posts in a single query.

```graphql
query {
  user(id: 1) {
    name
    email
    posts {
      title
      createdAt
    }
  }
}
```

✅ **Both came in a single API call!**

### ✅ No N+1 Problem
100 users + all their posts in one query.

```graphql
query {
  users {
    id
    name
    posts {
      title
    }
  }
}
```

✅ **Only 1 API call!**

---

## ⚠️ GraphQL's Problems

GraphQL isn't perfect. It has its own issues:

### ❌ Problem 1: N+1 moved to the server
The client asked for 100 users + all their posts in one query. Now the server has to make 101 database queries.

### ❌ Problem 2: Complexity Management
The client can ask for data nested 1000 levels deep. The server has to manually set limits.

### ❌ Problem 3: Caching is hard
In REST, each endpoint has its own cache. In GraphQL there's a single endpoint, so caching becomes complex.

### ❌ Problem 4: Learning Curve
REST is simple — anyone understands it. In GraphQL you have to learn schema, resolvers, mutations, subscriptions, dataloader, all of it.

### ❌ Problem 5: File Uploads are hard
File uploads in GraphQL are much harder compared to REST.

---

## 🎯 When Should You Use Which?

| Scenario | ✅ Best Choice |
|----------|----------------|
| Simple CRUD app, public API, mobile apps | REST |
| Complex dashboard, social media, admin panel | GraphQL |
| Next.js App Router, client-server communication | Server Actions |
| Public API for third-party developers | REST |
| Internal tools, your own app only | GraphQL |
| Performance-critical mobile app | GraphQL |
| Simple website, blog, e-commerce | REST |

> **Interview Answer:** "Neither REST nor GraphQL is the best. Each has its own use case. It depends on the use case which one is better."

---

## ⚡ Next.js Server Actions

This is a new concept from Next.js 13. You don't even need to build an API anymore.

```tsx
'use server'

// ✅ This function runs directly on the server
// You can call it directly from the client
// No API endpoint, no fetch, no route
async function createUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')

  // Direct database call!
  await db.user.create({ data: { name, email } })

  revalidatePath('/users')
  redirect('/users')
}
```

Use directly on the client side:

```tsx
// ✅ Client component
export default function CreateUserForm() {
  return (
    <form action={createUser}>
      <input name="name" />
      <input name="email" />
      <button type="submit">Create User</button>
    </form>
  )
}
```

✅ **No API, no fetch, no route, no endpoint.**
Just an async function. That's a Server Action.

---

## 📋 Server Actions vs Traditional APIs

| Traditional REST API | Next.js Server Actions |
|-----------------------|-------------------------|
| Separate route file | Function in the same file |
| `app/api/users/route.ts` | `async function createUser()` |
| Make a fetch call from client | Direct function call |
| Request Response cycle | Direct function arguments |
| Manual validation | Use Zod or any validation |
| Status codes | Normal JS exceptions |
| Any client can call | Only your Next.js app can call |
| Public API | Internal app communication |

✅ **Advantages of Server Actions:**
- Very simple
- Zero boilerplate
- Type-safe
- Automatic revalidation
- Progressive enhancement
- Works even with JavaScript disabled

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Using GraphQL everywhere
GraphQL isn't for everything. For simple CRUD, REST is 10x better.

### ❌ Mistake 2: Using Server Actions everywhere
Server Actions are only for your Next.js app. If you need an API for other clients, don't use Server Actions.

### ❌ Mistake 3: Not solving the N+1 problem in GraphQL
If you're using GraphQL and not using dataloader, you're making it even slower than REST.

### ❌ Mistake 4: Building REST incorrectly
If you design each endpoint differently while building REST, it becomes bad too.

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What's the main difference between REST and GraphQL?"

**Answer:** "Sir, REST is endpoint-based, GraphQL is query-based. In REST the server decides what data to send. In GraphQL the client decides what data it wants. REST has overfetching and underfetching. GraphQL doesn't have this problem, but it has its own issues like N+1, caching complexity, and learning curve."

### Q: "When should you use REST and when GraphQL?"

**Answer:** "When it's simple CRUD, a public API, or third-party developers will use it — REST is best. When there's complex nested data, it's your own internal app, and the client asks for different data every time — GraphQL is better."

### Q: "What are the disadvantages of GraphQL?"

**Answer:** "GraphQL has these disadvantages:
1.  N+1 problem moves to the server
2.  Caching is harder compared to REST
3.  Learning curve is higher
4.  Complexity management is needed
5.  File uploads are hard"

### Q: "What are Next.js Server Actions?"

**Answer:** "Server Actions is a new feature from Next.js 13. Now we don't even need to build an API. We create an async function on the server and call it directly from the client. No endpoint, no fetch, no route. Just a direct function call. This works only in Next.js App Router."

### Q: "What did we do before Server Actions?"

**Answer:** "Earlier we used to create a separate API endpoint for every function. Make a fetch call from the client. Handle the response. Now everything happens automatically."

### Q: "When should you NOT use Server Actions?"

**Answer:** "When you need a public API, or other clients and third-party developers will use it — don't use Server Actions. Use them only when your entire stack is Next.js and only your own app will use it."

### Q: "Which would you choose in production?"

**Answer:** "I always follow this order:
1.  First try Server Actions if it's Next.js
2.  If that doesn't work, use REST
3.  If REST doesn't solve it, there's too much nested data — use GraphQL"

### Q: "What's your approach to API design?"

**Answer:** "I always choose the simplest solution. First try REST. Only go to GraphQL when REST has a problem. Now that Next.js is here, I prefer Server Actions for internal operations."

---

## ✅ **Key Takeaways**

1.  REST = Simple, reliable, standard, cache friendly
2.  GraphQL = Flexible, no overfetching, single endpoint
3.  Server Actions = No API, just a function call, Next.js only
4.  None of them is the best — each has its own use case
5.  Always try the simplest solution first
6.  Use GraphQL only when you know you need it
7.  Server Actions is now the default choice in Next.js for internal operations

> **Final Tip:** Always say this line in an interview: "Today 90% of apps are completed with REST alone. Only 10% of complex apps actually need GraphQL. People use GraphQL without needing it, just for the trend."
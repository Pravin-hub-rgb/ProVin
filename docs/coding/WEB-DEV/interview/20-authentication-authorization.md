# 🗄️ Phase 4: Topic 20 - Authentication & Authorization

> **Interview Question:** "What's the difference between Authentication and Authorization? Which is better, JWT or Sessions? Why are httpOnly cookies safer? How does NextAuth work?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"Authentication = Who are you? Authorization = What can you do?"**

First you prove your identity, then based on that it's decided what you can access.

---

## 💡 Beginner-Friendly Explanation (Office Analogy)

```
🏢 Office Scene:

🔐 Authentication:
You arrived at the office gate. The guard stops you. You show your ID card. The guard checks whether you're an employee of this company. If yes, he lets you in.

✅ This is Authentication — verifying who you are.

🔑 Authorization:
Now you're inside. You're going to the HR room. The guard there stops you. You're an employee, but you don't have permission to enter the HR room. You can only go up to your own cubicle.

✅ This is Authorization — checking what you can do.

🍪 httpOnly Cookie:
Your ID card is with the guard. You don't keep it with yourself. Whenever you go anywhere, the guard recognizes you. You can't modify it yourself. It can't be stolen either.
```

---

## 📊 JWT vs Sessions

| 🍪 Session Based Authentication | 🎫 JWT Token Based Authentication |
|---------------------------------|-----------------------------------|
| Session is stored on the server in database or memory | Nothing is stored on the server. All data is encoded in the token |
| User only keeps the session id | User keeps the entire token |
| Server checks the database on every request | Server only verifies the signature on every request |
| Logout is easy — just delete the session | Logout is hard — token keeps working until it expires |
| Hard to scale | Easy to scale |
| Old way | Modern way |
| Most secure | Secure, but proper implementation is necessary |

---

## 🔒 Why Are httpOnly Cookies Safer?

This is the most important point about security.

```
❌ Normal Cookie / LocalStorage:
JavaScript can access it.
If there's an XSS attack on the site, the hacker can steal the entire token.
After that he can take control of your entire account.

✅ httpOnly Cookie:
JavaScript can't access it at all.
Only the browser sends it automatically with the request.
Even if an XSS attack happens, the token can't be stolen.
No JS code can see it, no one can modify it.
```

✅ **Security Level:**
1.  ✅ httpOnly Secure SameSite Cookie = 99% safe
2.  ⚠️ Normal Cookie = Medium safe
3.  ❌ LocalStorage = 0% safe

> **Interview Tip:** Always say that we always use httpOnly cookies for storing tokens. Never LocalStorage.

---

## 🚨 Common Authentication Mistakes

### ❌ Mistake 1: Storing JWT in localStorage
```tsx
// ❌ SUPER DANGEROUS! If you're still doing this, stop now
localStorage.setItem('token', token)
```
The entire account gets hacked via XSS attack.

### ❌ Mistake 2: Storing sensitive data in JWT
```tsx
// ❌ WRONG! JWT is encoded, not encrypted
const token = jwt.sign({ email: 'a@b.com', password: '123456' }, secret)
```
Anyone can decode the token and see all the data. Never put any secret in JWT.

### ❌ Mistake 3: Not setting JWT expiry time
```tsx
// ❌ WRONG! This token will never expire
const token = jwt.sign({ id: user.id }, secret)
```
Never set expiry more than 15 minutes. Use refresh tokens.

### ❌ Mistake 4: Not doing authorization
Don't just check that the user is logged in. Also check whether they have permission to access that resource.

---

## ⚡ NextAuth / Auth.js Deep Dive

NextAuth (now called Auth.js) is the most popular authentication library for Next.js.

### ✅ What NextAuth does automatically:
1.  Sets httpOnly cookies
2.  CSRF protection
3.  Both JWT and session options
4.  1000+ providers (Google, Github, Facebook etc)
5.  Automatic refresh token rotation
6.  Secure by default
7.  Edge Runtime support

### 📝 Basic NextAuth Example

```tsx
// ✅ auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Find user from database
        const user = await db.user.findUnique({ where: { email: credentials.email } })

        if (!user) return null

        // Verify password
        const valid = await bcrypt.compare(credentials.password, user.password)

        return valid ? user : null
      }
    })
  ]
})
```

Use directly in a Server Component:

```tsx
// ✅ Server Component
export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return <div>Welcome {session.user.name}</div>
}
```

Use in middleware too:

```tsx
// ✅ middleware.ts
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

✅ **Everything is automatic.** You never have to manually set a cookie, never generate a JWT, never think about security. It does everything correctly.

---

## 🎭 Common Authorization Patterns

### 1. Role Based Access Control (RBAC)
The most common pattern. Assign a role to the user: user, admin, superadmin.

```tsx
async function DashboardPage() {
  const session = await auth()

  if (session.user.role !== 'admin') {
    return <div>You are not authorized to view this page</div>
  }

  return <div>Admin Dashboard</div>
}
```

### 2. Resource Ownership Check
Only the owner can edit their own data.

```tsx
async function EditPostPage({ params }) {
  const session = await auth()
  const post = await db.post.findUnique({ where: { id: params.id } })

  if (post.authorId !== session.user.id) {
    return <div>You can only edit your own posts</div>
  }

  return <EditPostForm post={post} />
}
```

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What's the difference between Authentication and Authorization?"

**Answer:** "Sir, Authentication confirms who you are. Authorization confirms what you can do. First authentication happens, then authorization. Without authentication, authorization has no meaning."

### Q: "Which is better, JWT or Sessions?"

**Answer:** "Both are better in their own places. Sessions are secure but hard to scale. JWT is easy to scale but proper implementation is necessary. These days mostly JWT is used, but always stored in httpOnly cookies."

### Q: "Why are httpOnly cookies so safe?"

**Answer:** "httpOnly cookies can never be accessed by JavaScript. Only the browser sends them with the request. Even if an XSS attack happens, the hacker can't steal the token. This is the safest way for authentication."

### Q: "Why is storing a token in localStorage wrong?"

**Answer:** "Any JavaScript code can access LocalStorage. If there's any XSS vulnerability on the site, the hacker can steal the entire token. After that he can take control of the entire account. That's why you should never store a token in localStorage."

### Q: "What should you store in JWT and what not?"

**Answer:** "Store only public data like user id, email, role in JWT. Never store password, API keys, or any secret in JWT. JWT is encoded, not encrypted. Anyone can decode it and see all the data."

### Q: "What advantages does NextAuth provide?"

**Answer:** "NextAuth does everything automatically. It always uses httpOnly cookies, there's CSRF protection, it automatically rotates refresh tokens, there are 1000+ providers. You never have to think about security. It does everything correctly."

### Q: "How long should JWT expiry time be?"

**Answer:** "Access token expiry should always be short — not more than 15 minutes. Refresh token can be a bit longer — 7 days. If the access token expires, get a new access token using the refresh token."

### Q: "How do you logout with JWT?"

**Answer:** "JWT is stateless so logout is a bit tricky. The best way is to maintain a blacklist on the server. Or store the refresh token in the database and delete it when logging out."

---

## ✅ **Key Takeaways**

1.  Authentication = Who are you? Authorization = What can you do?
2.  Always use httpOnly secure sameSite cookies for storing tokens
3.  Never ever store tokens in localStorage
4.  JWT is not encrypted, it is only encoded
5.  Keep access token expiry short (15 min)
6.  Use NextAuth / Auth.js — don't roll your own auth
7.  Always do authorization check after authentication
8.  Never trust client side validation — always recheck on the server

> **Final Tip:** Always say this line in an interview: "Authentication is the most common place where developers mess up security. 90% of hacks are due to bad auth implementation. That's why you should never build your own auth — use a standard library."
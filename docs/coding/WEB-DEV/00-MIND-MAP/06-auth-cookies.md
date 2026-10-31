# 06 — Cookies: How the Browser and Server Talk

> In the previous doc we saw JWT — an alternative to sessions.
> Now we'll understand how a Session ID or JWT **gets delivered to the browser** — **Cookies**.

---

## What Is a Cookie

A cookie is a **small piece of data stored in the browser.**

The most important thing — a cookie is **automatically** sent to the server with every request. You don't have to do anything manually.

```
Server → sets the cookie → Browser saves it
Browser → automatically sends the cookie with every request → Server
```

---

## How a Cookie Gets Set

The server sends a header in the response:

```
Set-Cookie: sessionId=a3f9b2c1; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

On seeing this, the browser automatically saves the cookie.

---

## Important Cookie Settings

These settings matter a lot for security:

### HttpOnly
```
Set-Cookie: sessionId=abc; HttpOnly
```

`HttpOnly` means — **JavaScript can't read the cookie.**

```javascript
// If the cookie is HttpOnly, this won't work
document.cookie  // → "" (empty)
```

Why is this needed? — If someone injects malicious JavaScript (XSS attack), they can't steal the cookie.

**In ShopKaro, the session cookie is always HttpOnly.**

---

### Secure
```
Set-Cookie: sessionId=abc; Secure
```

`Secure` means — **send the cookie only over HTTPS.** Not over HTTP.

In development, HTTP is used — so `Secure` is applied only in production.

---

### SameSite
```
Set-Cookie: sessionId=abc; SameSite=Strict
```

`SameSite` protects against CSRF attacks (when another website makes requests on your behalf).

| Value | Meaning |
|-------|---------|
| `Strict` | Cookie is sent only with same-site requests |
| `Lax` | Same site + top-level navigation (links) |
| `None` | Sent everywhere — `Secure` is also required |

**In ShopKaro → `SameSite=Lax`** (common default, works well)

---

### Max-Age / Expires
```
Set-Cookie: sessionId=abc; Max-Age=604800
```

`Max-Age` is in seconds — how long until the cookie expires.

`604800` = 7 days (7 × 24 × 60 × 60)

If this isn't set → **Session cookie** — gets deleted when the browser closes.

---

## Cookie Setup in ShopKaro

`iron-session` handles this automatically — you just configure it once:

```javascript
// /lib/session.js

export const sessionOptions = {
  password: process.env.SESSION_SECRET,  // Strong secret — in env variable
  cookieName: "shopkaro-session",
  cookieOptions: {
    httpOnly: true,           // JavaScript can't read it
    secure: process.env.NODE_ENV === "production",  // HTTPS only in production
    sameSite: "lax",          // CSRF protection
    maxAge: 60 * 60 * 24 * 7  // 7 days
  }
}
```

That's it — configure once, `iron-session` handles the rest.

---

## Cookie vs localStorage — When to Use Which?

This confuses a lot of people — get it clear:

| | Cookie | localStorage |
|--|--------|-------------|
| Sent automatically with request | Yes ✓ | No — must add manually |
| Readable by JavaScript | Depends (HttpOnly) | Yes |
| Can be set by server | Yes | No |
| Expiry | Can be set | Manual clear |
| Security | Better (HttpOnly) | Vulnerable to XSS |

**For session/auth → always use Cookie** (the HttpOnly kind)

**For non-sensitive data** (theme preference, language) → localStorage is fine

---

## One Thing to Keep in Mind

Cookies cause a lot of confusion because:
- Marketing cookies are different (tracking, ads)
- Auth cookies are different

We're only talking about **auth cookies** — the ones that store the session or JWT.

---

## Summary

| | |
|--|--|
| **What is a cookie** | Data stored in the browser, auto-sent with requests |
| **HttpOnly** | Protects from JavaScript — always on for auth |
| **Secure** | HTTPS only — turn on in production |
| **SameSite** | CSRF protection |
| **In ShopKaro** | Handled automatically by iron-session |

---

## Next Doc

`07-auth-oauth.md` — Not in ShopKaro v1, but the concept is essential — **OAuth**. How does "Login with Google" work? Your app never gets your Google password. We'll understand how.
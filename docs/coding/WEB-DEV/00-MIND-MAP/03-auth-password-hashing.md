# 03 — Password Hashing: What Is bcrypt

> In the previous doc we saw the Authentication umbrella.
> Now the first concept inside it — **Password Hashing**.
> How will Priya's password be stored in the database?

---

## Problem — What Happens If You Store Passwords in Plain Text?

Imagine your database gets hacked. If you stored passwords in plain text:

```
email              | password
-------------------|----------
priya@gmail.com    | mypassword123
rahul@gmail.com    | iloveshopping
```

Now the hacker has **everyone's passwords.** And since people reuse the same password in many places — the hacker has unlocked everything from one breach.

This happens in real life — even with big companies.

---

## Solution — Hashing

Hashing is a process that converts a password into a **random-looking string** that **cannot be reversed.**

```
"mypassword123"  →  bcrypt  →  "$2b$10$xK9mN3pQ..."
```

This `$2b$10$xK9mN3pQ...` string is what gets stored in the database — not the original password.

**Key point:** Hashing is **one-way**. Meaning:
- Password → Hash: Possible ✓
- Hash → Password: Not possible ✗

---

## Hashing vs Encryption — The Difference

These two are different:

| | Hashing | Encryption |
|--|---------|------------|
| Direction | One-way (can't reverse) | Two-way (can be decrypted) |
| Use case | Passwords | Data that needs to be read later |
| Example | bcrypt | AES |

For passwords, **use hashing** — not encryption. Because if you can decrypt it, so can a hacker.

---

## What Is bcrypt

bcrypt is a popular **password hashing algorithm**. It was built specifically for passwords.

A few special things about bcrypt:

### 1. Salt

bcrypt automatically adds a random "salt" — meaning the same password for two different users produces a different hash:

```
Priya:  "password123"  →  "$2b$10$abc..."
Rahul:  "password123"  →  "$2b$10$xyz..."
```

Both have the same password, but the hash is different. This means a hacker can't use "rainbow tables."

### 2. Cost Factor (Slowness)

bcrypt is **intentionally slow.** This isn't a bug — it's a feature.

```javascript
const saltRounds = 10  // Cost factor
```

`saltRounds = 10` means bcrypt processes 2^10 = 1024 times. On today's computers this takes ~100ms.

100ms is fine for you. But for a hacker trying **lakhs of passwords** — this becomes impractical.

---

## bcrypt in ShopKaro — How It'll Be Used

### At Signup — Hash the Password:

```javascript
import bcrypt from 'bcrypt'

// User submitted the form
const { email, password } = req.body

// Hash it — never store plain text
const saltRounds = 10
const hashedPassword = await bcrypt.hash(password, saltRounds)

// Save to the database
await prisma.user.create({
  data: {
    email: email,
    password: hashedPassword  // storing the hash, not the original password
  }
})
```

### At Login — Compare the Password:

```javascript
// User provided email + password
const { email, password } = req.body

// Find the user in the database
const user = await prisma.user.findUnique({
  where: { email: email }
})

// Compare the password
const isMatch = await bcrypt.compare(password, user.password)
// bcrypt.compare → compares the plain text password against the hash

if (isMatch) {
  // Login successful
} else {
  // Wrong password
}
```

`bcrypt.compare` does the magic — it **re-hashes the plain text password** and compares it against the stored hash. You can never extract the original password from a hash — compare does the work internally.

---

## What the Database Will Look Like

```
id  | email              | password
----|--------------------|---------
1   | priya@gmail.com    | $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh9i
2   | rahul@gmail.com    | $2b$10$Ks3Vz7YhB4mR2pL9sJdTwuWQeXnNa5c8vFgH1iOzPtMqKjRlCbEdu
```

Even if this database gets hacked — the hacker only gets hashes. Not the original passwords.

---

## Summary

| | |
|--|--|
| **What bcrypt does** | Password → irreversible hash |
| **Why salt** | Same password, different hash |
| **Why slow** | Impractical for hackers |
| **When in ShopKaro** | Hash at signup, compare at login |

---

## Next Doc

`04-auth-sessions.md` — Okay, Priya has logged in. How does the server **keep knowing** she's logged in? She shouldn't have to enter her password on every page — that's where Sessions come in.
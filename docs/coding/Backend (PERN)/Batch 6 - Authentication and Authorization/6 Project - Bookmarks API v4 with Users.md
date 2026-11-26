# Doc 6 Project — Bookmarks API v4 with Users

---

## Where We Left Off

Batch 6 lessons (6.1-6.11) are complete. Now the project: Bookmarks API v4 with users. This is the upgrade of PRJ5 with authentication and authorization.

---

## Problem — Can You Build a Secured, Multi-User API?

The upgrade of PRJ5. Users, passwords, tokens, and permissions.

**Auth endpoints:** register, login, refresh, logout, change-password, and `GET /me`.

**Tokens:** short-lived access token (`jose`), rotating refresh token in an httpOnly cookie, hashed in the database, with reuse detection.

**Passwords:** Argon2id, with a generic login error.

**Authorization:** every bookmark belongs to a user, and every query is scoped to the current user. One admin-only route demonstrates roles.

**Layers kept:** auth lives in its own feature folder with controller, service and repository, with the middleware shared.

**Migrations:** `User`, refresh-token table, and the ownership foreign key on bookmarks, all committed.

**Proof:** a written test script (API client collection) showing that user A cannot see, edit or delete user B's bookmarks, that an expired access token is refused, and that a reused refresh token revokes the family.

**Write-up:** a README section on the auth design: why these token lifetimes, why hashed refresh tokens, what attacks were considered.

**Done when:** Two registered users each see only their own bookmarks. Tokens expire and renew correctly. Logout makes the refresh token unusable. He can draw the full auth flow from memory and defend each choice.

## What It Is NOT

- This is **not** tested — that is Batch 8.
- This is **not** deployed — that is Batch 10.
- This is **not** rate-limited — that is Batch 7.

---

## Common Mistakes

- Storing passwords in plain text or fast hash.
- Returning password hash in response.
- Different error messages for unknown email vs wrong password.
- Access tokens that never expire.
- Checking auth but forgetting ownership (most common real-world bug).
- Putting access token in `localStorage` without understanding risk.
- Forgetting that cookies with credentials change CORS setup.

---

## Try It Yourself

1. Build the Bookmarks API v4 with users.
2. Test: user A cannot see/edit/delete user B's bookmarks.
3. Test: expired access token refused, reused refresh token revokes family.
4. Write the README auth design section.

## Summary

- Bookmarks API v4: secured, multi-user.
- Auth endpoints: register, login, refresh, logout, change-password, /me.
- Tokens: short-lived access + rotating refresh (httpOnly cookie, hashed).
- Passwords: Argon2id.
- Authorization: ownership filtering + roles.

## Next Step

Batch 6 is complete. Next: Batch 7 — Security Hardening and Logging (deferred to a later pass).

---

## Cheat Sheet (Quick Recall)

- The upgrade of PRJ5.
- Auth endpoints: register, login, refresh, logout, change-password, and `GET /me`.
- Tokens: short-lived access token (`jose`), rotating refresh token in an httpOnly cookie, hashed in the database, with reuse detection.
- Passwords: Argon2id, with a generic login error.
- Authorization: every bookmark belongs to a user, and every query is scoped to the current user. One admin-only route demonstrates roles.
- Layers kept: auth lives in its own feature folder with controller, service and repository, with the middleware shared.
- Migrations: `User`, refresh-token table, and the ownership foreign key on bookmarks, all committed.
- Proof: a written test script (API client collection) showing that user A cannot see, edit or delete user B's bookmarks, that an expired access token is refused, and that a reused refresh token revokes the family.
- Write-up: a README section on the auth design: why these token lifetimes, why hashed refresh tokens, what attacks were considered.
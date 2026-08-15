# 4.4 "Hamare Database Mein Kya Store Hoga" — Confusion Fix

## Problem
User ko 3 conceptual confusions hain (no refactor needed):
1. "5 users bina store kiye, remember kaise rakhega?" — identity (GitHub) vs session (JWT) ka fark
2. "Store kya karre? User id toh store kar he rahe honge." — do storage types (session cookie vs user data)
3. "Identity GitHub pe hai toh app ko kaise pata chalega?" — login pe OAuth, har request pe JWT cookie

## Fix (single edit)
File: `docs/coding/Next JS/Batch 4 - Authentication & Protected Access/4.4 Auth.js — Next.js ka Auth Shortcut.md`
Section (lines 108-112): `### Hamare Database Mein Kya Store Hoga? (Answer: Abhi Kuch Nahi)`
→ rename + rewrite as `### Hamare Database Mein Kya Store Hoga? — Teen Confusions, Ek Saath`

New content structure:
1. **Identity vs Session** — identity GitHub ke paas (5 users ka account GitHub pe), session JWT cookie se
2. **Do Storage Types table** — Session (JWT cookie) vs User data (profiles.json / DB)
3. **Teen cheezon ka combination** — identity = GitHub OAuth, session = JWT cookie, user data = profiles.json abhi / DB Batch 5
4. Mention: Member Dashboard `profiles.json` mein store karta hai (4.5.4 `getProfileByEmail`/`saveProfile`)

## Verify
- `tsc --noEmit` clean
- `test-next` untouched
- Koi reorder nahi, roadmap/subject.ts unchanged

# Batch 4 Auth Fix — OAuth/JWT Confusion Clear Karne Ka Plan

## Problem (user ke hisaab se)
- "OAuth mein O kya hai" — kabhi explain nahi hua
- OAuth flow palle nahi padha — do alag tokens distinguish nahi hua
- "Hamare DB mein kya store hoga? id? token?" — kabhi answer nahi mila
- "Har request mein wahi token ghoomta hai?" — GitHub access token vs session JWT confusion
- "JWT kya hai?" — 4.1 mein sirf passing mention, 4.4 mein ~10 line section; koi real discussion nahi
- User chahta hai WEB-DEV mind-map 04/05/06 jaise teaching style (problem → concept → code)

## Files to Edit

### 1. `docs/coding/Next JS/Batch 4 - Authentication & Protected Access/4.1 Cookies aur Sessions — Auth ka Foundation.md`
- Line 89 (passing JWT mention) → proper section: **"JWT — Session Ka Doosra Pattern"**
- Content: JWT = self-contained signed token, 3 parts (header/payload/signature) with example token,
  payload readable par tamper-proof, signature check (no record lookup), sensitive data mat daalo.
- **"4.2 mein JWT kyun nahi use kiya"** — record-wala session pehle seekhna tha (revocation), JWT
  statelessness ke liye; order 4.2 (record khud banao) → 4.4 (JWT ready-made). Comparison 4.4.4 mein.

### 2. `4.4 Auth.js — Next.js ka Auth Shortcut.md`
- **"OAuth mein 'O' kya hai"** — OAuth = Open Authorization, "Open" = open standard (koi company ka private nahi).
- **"Do Alag Tokens"** section (flow ke baad):
  - GitHub access token — ek baar milta hai (callback), sirf profile fetch ke liye, short-lived, GitHub↔App. Har request mein nahi jaata.
  - Session JWT cookie — Auth.js login ke baad banata hai, isme session data signed, HAR request mein browser↔server jaati hai (httpOnly+secure).
- **"Hamare DB mein kya store hoga?"** — is demo mein kuch nahi (no DB; session JWT mein, profile GitHub se live). Real app mein user row tab store hota hai jab app-specific data chahiye (Batch 5).
- **"JWT Strategy" section expand** → full JWT deep-dive: 3 parts, signature, self-contained → no lookup. (WEB-DEV 05 style, batch voice.)

### 3. `4.4.1 Auth.js + GitHub OAuth — Login Demo v2.md`
- Test step (cookie `authjs.session-token`) pe ek clarification line: yeh session JWT hai, GitHub access token NAHI.

### 4. `4.4.4 Summary — Manual vs OAuth.md`
- JWT vs server session table ke paas ek line: two-token distinction (GitHub access token ek baar vs session JWT per-request).

## Constraints
- Hinglish dost-to-dost, no real-life analogies
- Natural flow (no sudden bullet blocks without transitions)
- Full accumulating file style, `// NEW` markers (jahan applicable)
- No file renames → roadmap/subject.ts titles unchanged
- NEVER touch `test-next`
- Verify: `tsc --noEmit`, roadmap titles unchanged, test-next untouched

## Status
- Awaiting Plan Mode exit to execute edits.

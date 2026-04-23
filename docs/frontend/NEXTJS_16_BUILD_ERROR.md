# ✅ Next.js 16 Build Error: /api/notes prerender failed

This one is brand new. Everyone who upgrades to Next.js 16 will hit this. No one tells you about this.

---

## 🚨 Imagine this:

✅ You run `npm run dev`
✅ Everything works perfectly
✅ No errors, no warnings
✅ You spent 3 days building everything
✅ You are ready to deploy

Then you run `npm run build`

```
Error occurred prerendering page "/api/notes".
Error: Route /api/notes with `dynamic = "error"` couldn't be rendered statically because it used `request.url`.
```

💀 Build fails. For no reason.

---

## 💡 What the actual fuck just happened.

This is Next.js 16 new default behaviour.

Before Next.js 16:
✅ API routes defaulted to dynamic
✅ They just worked. Always.

Next.js 16:
🔴 **All routes default to static now.**
🔴 Next.js will try to prerender EVERYTHING at build time. Even API routes.
🔴 If you use literally anything dynamic like `request.url` it will crash the build.

And they didn't tell anyone.

---

## 🔍 What actually happens

You wrote this:
```ts
// This was perfectly fine in Next.js 15
export async function GET(request: Request) {
  const url = new URL(request.url)
}
```

✅ Dev mode: works perfectly
❌ Build mode: crashes completely

Next.js says:
> **"You told me I could prerender this route statically."**
>
> **"But then you used request.url. That is dynamic. That only exists at request time."**
>
> **"I don't know what to do. I give up. Build failed."**

---

## ✅ The Fix

One single line. That is it.

Add this at the top of your API route:

```ts
// Tell Next.js this route should run dynamically at request time
export const dynamic = 'force-dynamic'
```

That is literally the entire fix.

---

## 🚨 The trap everyone falls into

You probably had this:
```ts
// This was the old recommended way
export const dynamic = 'force-static'
```

This will **never work** for any API route that reads anything from the request. Not query params, not headers, not method, not url. Nothing.

Any route that accepts any input at all cannot be static.

---

## 📚 The new rules for Next.js 16

| Route type | What to use |
|---|---|
| ✅ Pure static page that never changes | `force-static` |
| ✅ API route that accepts any input | `force-dynamic` |
| ✅ Any page that reads cookies/headers/search params | `force-dynamic` |

---

## 💡 Important Notes:

- This is not a bug. This is intentional new behaviour.
- This will break literally every existing Next.js project that has API routes.
- You will not see this error in dev mode at all. It will only appear at build time.
- There is no warning. There is no hint. It just fails.
- Vercel themselves have not updated most of their own documentation yet.

---

---

## 🚨 Next Level Error: force-dynamic cannot be used with output: export

If you are doing static export with:
```
output: 'export'
```

You will get this next error:
```
export const dynamic = "force-dynamic" on page "/api/notes" cannot be used with "output: export".
```

✅ Yes. For static HTML export you cannot have any dynamic API routes at all. They are completely incompatible.

✅ This is by design. Static export means 100% static files. No server. No runtime. Nothing.

### ✅ The fix for static export:

You have two options:

#### Option 1: Remove `output: 'export'`
If you are deploying to Vercel / Netlify / any proper host that supports functions: remove that line completely. It is not needed.

#### Option 2: Read all markdown files at build time
If you actually need true static export:
✅ Move all the notes reading logic out of the API route
✅ Read all markdown files at build time
✅ Bundle them directly into the client bundle
✅ Remove the API route completely

There is no middle ground. This is intentional.

---

## ✅ Full Final Solution

If you are not doing static export:
```ts
export const dynamic = 'force-dynamic'
```

If you are doing static export:
✅ Remove the API route entirely. You cannot use it.

---

## ✅ That is all.

This is every single possible error you will hit with this. This is the complete guide.

This is the fix that 90% of developers upgrading to Next.js 16 will need, and no one is talking about it.

# 34 — CDN: Delivering Static Files Fast

> Previous doc covered browser storage.
> Now **CDN** — Content Delivery Network.

---

## Problem — All Requests to One Server

ShopKaro's server is in Mumbai.

Priya in Mumbai → Request → Mumbai server → Fast ✓
Rahul in Delhi → Request → Mumbai server → A bit slow
Anita in New York → Request → Mumbai server → Very slow ✗

Images, JS files, CSS — all of these have to be sent to every user. Can be slow for users worldwide.

---

## Solution — CDN

**CDN (Content Delivery Network)** — there are servers in many places around the world. Static files are copied everywhere. The user gets files from their **nearest server**.

```
Without CDN:
Anita (New York) → Mumbai server → Image (slow)

With CDN:
Anita (New York) → New York CDN server → Image (fast)
```

---

## What the CDN Caches

**Static files** — things that don't change often:
- Product images
- JavaScript bundles
- CSS files
- Fonts

**Dynamic data** (API responses) — CDN usually doesn't cache these. That comes from the server.

---

## CDN in ShopKaro — Automatic

Good news — **if you deploy on Vercel, the CDN is automatic.**

Vercel is globally distributed — Next.js static files are automatically served via CDN. You don't need to do anything extra.

For product images — you can use **Cloudinary or AWS S3 + CloudFront**:

```jsx
// Next.js Image component — automatic optimization + CDN
import Image from 'next/image'

function ProductCard({ product }) {
  return (
    <Image
      src={product.imageUrl}
      alt={product.name}
      width={300}
      height={300}
      // Next.js automatically:
      // - Converts to WebP format
      // - Resizes based on device
      // - Lazy loads
      // - Serves from CDN (on Vercel)
    />
  )
}
```

---

## CDN vs Browser Cache — Difference

| | CDN | Browser Cache |
|--|-----|---------------|
| Where | Near the server (network level) | In the user's browser |
| For whom | All users | Only that user |
| Control | You control it | Browser controls it |

---

## Summary

| | |
|--|--|
| **What is CDN** | Distribute files globally — serve from the nearest server |
| **In ShopKaro** | Automatic on Vercel, Next/Image for images |
| **What gets cached** | Images, JS, CSS — static files |

---

## Next Doc

`35-caching-server.md` — **Server-side caching** — saving database results so the DB isn't hit repeatedly. The Redis concept and built-in caching in Next.js.

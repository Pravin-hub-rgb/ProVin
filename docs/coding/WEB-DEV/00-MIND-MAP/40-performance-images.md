# 40 — Images: The Easiest Performance Win

> Previous doc gave an overview of the Performance umbrella.
> Now **Image Optimization** — the quickest and highest-impact improvement.

---

## Why Images Are So Slow

```
Original product photo (from camera): 3MB PNG
Priya viewing it on mobile at 300x300px
She downloads 3MB just for a 300px image → Waste!
```

Fix:
- Send an image of the right size (300px image for 300px display)
- Use WebP format (~30% smaller than PNG/JPG)
- Lazy load (only load what's on screen)

---

## Next.js Image Component — Everything Automatic

Next.js's `<Image>` component does all of this automatically:

```jsx
import Image from 'next/image'

// ❌ Regular img tag — no optimization
<img src="/products/nike-shoes.jpg" alt="Nike Shoes" />

// ✓ Next.js Image — everything optimized
<Image
  src="/products/nike-shoes.jpg"
  alt="Nike Shoes"
  width={300}
  height={300}
  // Automatically:
  // → Converts to WebP
  // → Sends correctly sized image (small on mobile, large on desktop)
  // → Lazy loads (loads when on screen)
  // → Shows placeholder until loaded
/>
```

---

## In ShopKaro's Product Card

```jsx
// /components/ProductCard.jsx
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div style={{ position: 'relative', height: '250px' }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill                    // Fill the parent div
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
          // sizes → tells browser how big the image needs to be
          // Mobile: full width, Desktop: one third width
          priority={false}        // false = lazy load (default)
          // For homepage hero image use priority={true}
        />
      </div>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
    </div>
  )
}
```

---

## External Images — next.config.js

If images are on another server (Cloudinary, S3):

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  // Allow Cloudinary images
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',    // S3 images
      }
    ]
  }
}
```

---

## Hero Image — Priority Loading

The homepage hero banner is **above the fold** (visible immediately on screen). Don't lazy load it:

```jsx
<Image
  src="/hero-banner.jpg"
  alt="ShopKaro Sale"
  width={1200}
  height={400}
  priority={true}  // Load immediately — no lazy loading
/>
```

---

## Summary

| | |
|--|--|
| **Next Image** | Automatic WebP, resize, lazy load |
| **sizes prop** | Tells browser how big an image is needed |
| **priority** | For hero images — load immediately |
| **External images** | Allow in next.config.js |

---

## Next Doc

`41-performance-loading.md` — **Lazy Loading and Skeleton Screens** — how to make page loading feel fast without actually speeding it up.

# 13 — File Storage: Cloudinary, S3, Uploadthing, Supabase Storage

> Umbrella: Backend → File Upload / Storage
> Job: Store images, documents, videos — not in the database, in dedicated storage
> Example: ShopKaro product images, Swiggy restaurant photos

---

## Why We Don't Store Images in the Database

```
Database: For structured data — text, numbers, relationships
File storage: For binary files — images, PDFs, videos

Store image in database:
  → Database gets slow
  → Backups get complex
  → CDN can't serve it

In file storage:
  → Store only the URL in the database: "https://cdn.shopkaro.com/products/shoes.jpg"
  → Actual file lives on file storage
  → Fast serve via CDN
```

---

## Tools

---

### Cloudinary
**Tag: 🟢 Images + Video | Transform | Most Popular for media**

```
What it is: Media management platform — store + transform + deliver
When to use:
  → Image/video heavy app
  → On-the-fly image transformation needed
  → E-commerce product images

Special — On-the-fly transforms:
  Resize, crop, change format from the URL itself:
  Original: https://res.cloudinary.com/demo/image/upload/shoes.jpg
  Resized:  https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill/shoes.jpg
  WebP:     https://res.cloudinary.com/demo/image/upload/f_auto/shoes.jpg

Real app example:
  → Swiggy: Restaurant photos — different sizes for listing vs detail page
  → Zomato: Food photos — thumbnail and full size from the same image
  → ShopKaro: Product images — main image, thumbnail, zoom

Code feel (upload):
  import { v2 as cloudinary } from 'cloudinary'

  const result = await cloudinary.uploader.upload(file, {
    folder: 'products',
    transformation: [{ width: 800, height: 800, crop: 'fill' }]
  })
  // result.secure_url → store this in the database

Free tier: 25GB storage, 25GB bandwidth/month — plenty to start

Cons:
  → Vendor lock-in
  → Expensive at large scale

In India: Popular in e-commerce, food delivery, media apps
```

---

### AWS S3
**Tag: 🟢 Enterprise Standard | Cheapest at Scale**

```
What it is: Amazon's object storage — industry standard
When to use:
  → Already using the AWS ecosystem
  → Very high scale
  → Any file type — images, PDFs, videos, backups, code

S3 + CloudFront (CDN):
  → S3: Store (cheap)
  → CloudFront: Serve fast globally
  → This combo is the enterprise standard

Real app example:
  → Flipkart, Amazon India: Product images (S3 + CloudFront)
  → Zomato, Swiggy at scale
  → IRCTC: Ticket PDFs

Code feel:
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

  await s3.send(new PutObjectCommand({
    Bucket: 'shopkaro-images',
    Key: `products/${filename}`,
    Body: fileBuffer,
    ContentType: 'image/jpeg'
  }))
  // URL: https://shopkaro-images.s3.amazonaws.com/products/shoes.jpg

Cons:
  → Complex setup — IAM roles, policies, CORS all manual
  → No built-in image transformation (need CloudFront + Lambda@Edge)

In India: Large companies on AWS
```

---

### Uploadthing
**Tag: 🟢 Next.js friendly | Simple | Growing**

```
What it is: File upload service — built specifically for Next.js simplicity
When to use:
  → Next.js project
  → Don't want S3 setup complexity
  → Simple file upload needed quickly

Code feel:
  // Route handler
  const ourFileRouter = {
    productImage: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ file }) => {
        await prisma.product.update({
          data: { imageUrl: file.url }
        })
      })
  }

  // Frontend — drag and drop ready
  <UploadButton endpoint="productImage" />

Difference from Cloudinary:
  → Uploadthing: Simple upload, no transformations
  → Cloudinary: Upload + transform + optimize

Free tier: 2GB storage — plenty for small projects

In India: Growing — popular in the Next.js community
```

---

### Supabase Storage
**Tag: 🟢 Supabase users | Simple**

```
What it is: Supabase's file storage — S3 compatible
When to use:
  → Already using Supabase (database, auth)
  → Want everything on one platform

Supabase = PostgreSQL + Auth + Storage + Realtime — all in one
If you use Supabase → keep storage there too

Free tier: 1GB storage
```

---

### Cloudflare R2
**Tag: 🟢 S3 Alternative | No egress fees | Cheap**

```
What it is: S3-like storage — but no egress fees (data download is free)
When to use:
  → S3 bill is too high because of egress
  → Cloudflare ecosystem
  → Cost optimization needed

Difference from S3:
  → R2: Zero egress fees — download data, pay nothing
  → S3: Egress fees — pay for data download (expensive at scale)
  → R2: S3-compatible API — same code works

Real app example:
  → High-traffic sites serving images
  → Video streaming platforms

In India: Growing — especially cost-conscious startups
```

---

## Quick Decision

```
Image-heavy app, need transformation?
  → Cloudinary

Next.js, simple upload quickly?
  → Uploadthing

Enterprise, AWS ecosystem?
  → S3 + CloudFront

Already using Supabase?
  → Supabase Storage

Cost optimization, migrating from S3?
  → Cloudflare R2
```

---

## ShopKaro Plan

```
V1: Uploadthing or Cloudinary (simpler setup)
V2 (more users): Cloudinary (image optimization important)
Enterprise: S3 + CloudFront
```

---

## Next Doc

`14-database-sql.md` — SQL Databases — PostgreSQL, MySQL, SQLite, Neon, Supabase — which database when, hosted vs managed, what's popular in India.

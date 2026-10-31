# 16 — Search: Algolia, Typesense, Elasticsearch, MeiliSearch

> Umbrella: Database → Search
> Job: Fast full-text search — "Nike shoes size 10" → Relevant results instantly

---

## The Problem with Normal Database Search

```sql
-- In PostgreSQL:
SELECT * FROM products WHERE name LIKE '%nike shoes%'
-- Slow on large data, no relevance ranking, no typo tolerance
```

Search engines provide:
- Typo tolerance ("nkie shoes" → "nike shoes")
- Relevance ranking
- Faceted search (filter by brand, price, size simultaneously)
- Fast — milliseconds

---

### Algolia
**Tag: 🟢 Most Popular Managed Search | Best DX | Expensive**

```
What it is: Managed search — fast, feature-rich, easy setup
When to use:
  → E-commerce search (most common use case)
  → Don't want to manage infra
  → Instant search results needed

Real app example:
  → Nykaa: Product search with facets (brand, price, rating)
  → Myntra: Fashion search
  → Zomato: Restaurant + dish search

Code feel:
  const { hits } = await algolia.search('nike shoes', {
    filters: 'category:footwear AND price < 5000',
    hitsPerPage: 12
  })

Cons: Expensive at scale — pay per search
In India: Standard in e-commerce
```

---

### Typesense
**Tag: 🟢 Open-source Algolia | Self-host | Growing**

```
What it is: Like Algolia — but open-source, self-hosted
When to use:
  → Algolia bill is too high
  → Can self-host

Difference from Algolia: Open-source, cheaper, slightly fewer features
```

---

### Elasticsearch
**Tag: 🟡 Powerful | Complex | Enterprise**

```
What it is: Most powerful search engine — logs, analytics, search
When to use:
  → Complex search requirements
  → Log analytics (ELK stack)
  → Large scale, dedicated team

Complex setup — Algolia or Typesense is better for small teams
In India: Large enterprises, log analytics
```

---

### MeiliSearch
**Tag: 🟢 Easy Self-host | Growing**

```
What it is: Simple, fast self-hosted search
When to use:
  → Like Typesense — easy self-host
  → Internal tools, docs search
```

---

### PostgreSQL Full-Text Search
**Tag: 🟢 Already have it | Good enough for many cases**

```
When to use:
  → Already using PostgreSQL
  → Search requirements are basic
  → No extra infra needed

ShopKaro V1: PostgreSQL full-text search is enough
ShopKaro V2 (more products): Algolia or Typesense

Code feel:
  -- PostgreSQL
  SELECT * FROM products
  WHERE to_tsvector('english', name || ' ' || description)
    @@ plainto_tsquery('nike shoes')
```

---

## Next Doc

`17-auth-libraries.md` — Auth Libraries — NextAuth, Clerk, Lucia, Auth0, Better Auth.

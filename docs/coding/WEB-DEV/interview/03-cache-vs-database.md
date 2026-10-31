# 🌐 Phase 1: Topic 3 - Cache vs Database Dilemma

> **Interview Question:** "If cache is so fast, why not store everything in cache? Why do we need a database?"

---

## 💡 Beginner-Friendly Explanation (The "Restaurant Kitchen" Analogy)

Imagine you have a **restaurant**:

**Database = Kitchen (Store Room)**
- All raw material is stored here (vegetables, spices, ingredients)
- Everything must be fetched from here
- A bit slow (you have to go to the store room)
- But it's **permanent storage** — all data lives here

**Cache = Counter (Ready-to-serve area)**
- Items that get ordered repeatedly are kept ready at the counter
- Customer gets served instantly
- Very fast (picked up from the counter)
- But **limited space** — only popular items can be kept

### What's the Problem?

> The interviewer asks: "Bro, serving from the counter is so fast! Why do we need a kitchen? Just keep everything at the counter!"

**Answer:** There's **limited space** at the counter! You can't keep all raw material at the counter. And some things must be fetched **fresh** from the kitchen.

**Real-world example:**
- **Cache (Redis/Memcached):** 64GB RAM = ₹50,000/month
- **Database (MySQL/PostgreSQL):** 1TB SSD = ₹5,000/month

Cache is **expensive**, Database is **cheap**. That's why both are needed!

### Why It Matters (Real Impact)

```
Without Cache:
User → Database → Query → Disk Read → Response
         ↓
      Slow (100-500ms), load on database

With Cache:
User → Cache → Memory Read → Response
         ↓
      Fast (1-10ms), less load on database
```

**Real-world impact:**
- **Twitter:** Must handle 1 million requests/sec
- **Amazon:** 100ms delay = 1% sales loss
- **Facebook:** Maintains 99%+ cache hit rate

---

## 🛠️ How to Control It (Caching Strategies)

Now let's understand how to use **cache and database together**:

### 1. Cache-Aside (Lazy Loading) — Most Common

**How it works:**
1. First check the cache
2. If cache miss, fetch from database
3. After fetching, store in cache
4. Next time it comes from cache

```
User Request
    ↓
Check Cache → Hit? → Return data
    ↓ Miss
Query Database
    ↓
Store in Cache
    ↓
Return data
```

**Use Case:** Most web applications (blogs, e-commerce, social media)

### 2. Write-Through Cache

**How it works:**
1. Write data to cache first
2. Cache automatically writes to database too
3. Data always stays consistent

```
Write Request
    ↓
Write to Cache
    ↓
Cache writes to Database
    ↓
Return success
```

**Use Case:** Banking, financial systems (where data consistency is critical)

### 3. Write-Back (Write-Behind) Cache

**How it works:**
1. Write data to cache first
2. Cache writes to database after a few seconds (in batch)
3. Fast writes, but risk of data loss

```
Write Request
    ↓
Write to Cache
    ↓
Return success immediately
    ↓
(After few seconds)
Cache writes to Database in batch
```

**Use Case:** Social media likes, counters (where a little delay is acceptable)

### 4. Refresh-Ahead Cache

**How it works:**
1. Refresh before cache expiration
2. User never gets stale data
3. Best for predictable load patterns

```
Cache about to expire
    ↓
Background process refreshes it
    ↓
User always gets fresh data
```

**Use Case:** Stock prices, news feeds (where freshness is critical)

---

## 🔧 Code Examples — Practical Implementation

### Example 1: Cache-Aside Pattern with Redis

**What we're doing:** A simple Node.js application using Redis cache for user data.

```javascript
// What we're doing:
// 1. First check Redis cache
// 2. If cache miss, fetch from database
// 3. After fetching, store in cache

const redis = require('redis');
const mysql = require('mysql2/promise');

// Redis client setup
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp'
});

// User fetch function with cache-aside pattern
async function getUser(userId) {
  // Step 1: Generate cache key
  const cacheKey = `user:${userId}`;

  // Step 2: Check cache first
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit!');
    return JSON.parse(cachedData);
  }

  // Step 3: Cache miss - fetch from database
  console.log('Cache miss - fetching from database');
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );

  if (rows.length === 0) {
    return null; // User not found
  }

  const user = rows[0];

  // Step 4: Store in cache (for 5 minutes)
  await redisClient.setEx(cacheKey, 300, JSON.stringify(user));

  return user;
}

// User update function - cache invalidation is necessary
async function updateUser(userId, updates) {
  // Step 1: Update in database
  await db.execute(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [updates.name, updates.email, userId]
  );

  // Step 2: Invalidate cache (delete it)
  const cacheKey = `user:${userId}`;
  await redisClient.del(cacheKey);

  // Step 3: Next time cache miss happens, fresh data gets fetched
  return { success: true };
}

// Usage
app.get('/user/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});

app.put('/user/:id', async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  res.json(result);
});
```

**Key Points:**
- `setEx(key, seconds, value)` — sets key for specified seconds
- `get(key)` — fetches cached value
- `del(key)` — invalidates cache
- Database query runs on cache miss
- Cache invalidation is necessary after update

---

### Example 2: Write-Through Cache with Redis

**What we're doing:** Write data to cache first, then cache syncs to database.

```javascript
// What we're doing:
// 1. Write request comes in
// 2. First write to cache
// 3. Cache also writes to database automatically
// 4. Data always stays consistent

class WriteThroughCache {
  constructor(redisClient, dbConnection) {
    this.redis = redisClient;
    this.db = dbConnection;
  }

  // Write operation
  async set(key, value, ttl = 300) {
    // Step 1: Write to cache
    await this.redis.setEx(key, ttl, JSON.stringify(value));

    // Step 2: Also write to database (sync)
    await this.writeToDatabase(key, value);

    console.log(`Write-through: ${key} saved to cache and database`);
    return true;
  }

  // Database write helper
  async writeToDatabase(key, value) {
    // Extract table and ID from key
    // Example: "user:123" -> table: users, id: 123
    const [type, id] = key.split(':');

    // Upsert operation (insert or update)
    await this.db.execute(
      `INSERT INTO ${type}s (id, data) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE data = ?`,
      [id, JSON.stringify(value), JSON.stringify(value)]
    );
  }

  // Read operation (same as cache-aside)
  async get(key) {
    // Check cache
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    // Cache miss - fetch from database
    const [type, id] = key.split(':');
    const [rows] = await this.db.execute(
      `SELECT * FROM ${type}s WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    // Store in cache
    const value = rows[0].data;
    await this.redis.setEx(key, 300, value);

    return JSON.parse(value);
  }
}

// Usage
const cache = new WriteThroughCache(redisClient, db);

// Write - syncs to both places
await cache.set('product:456', { name: 'Laptop', price: 999 });

// Read - first cache, then database
const product = await cache.get('product:456');
```

**Key Points:**
- Write always happens in both places (cache + database)
- Data consistency is guaranteed
- Write latency is higher (must write in both places)
- Read is fast (comes from cache)

---

### Example 3: Cache Invalidation Strategies

**What we're doing:** How to invalidate cache in different scenarios.

```javascript
// Strategy 1: Time-based Expiration (TTL)
// Simple - set expiry time for every item
await redisClient.setEx('user:123', 300, userData); // 5 minutes

// Strategy 2: Event-based Invalidation
// When data changes, delete cache
async function updateUser(userId, updates) {
  // Database update
  await db.execute('UPDATE users SET ? WHERE id = ?', [updates, userId]);

  // Cache invalidate
  await redisClient.del(`user:${userId}`);

  // Related caches also invalidate
  await redisClient.del(`user:${userId}:profile`);
  await redisClient.del(`user:${userId}:settings`);
}

// Strategy 3: Cache-aside with Stale-While-Revalidate
// Show old data, refresh in background
async function getProductWithSWR(productId) {
  const cacheKey = `product:${productId}`;

  // Check cache
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    const data = JSON.parse(cached);

    // If data is stale (near expiry), refresh in background
    const ttl = await redisClient.ttl(cacheKey);
    if (ttl < 60) { // Last 1 minute of TTL
      // Background refresh (non-blocking)
      refreshProductInCache(productId).catch(console.error);
    }

    return data;
  }

  // Cache miss - fresh fetch
  return await fetchProductFromDb(productId);
}

// Strategy 4: Tag-based Invalidation
// Invalidate related items in a group
async function invalidateByTag(tag) {
  // Find all keys related to this tag
  const keys = await redisClient.keys(`product:tag:${tag}:*`);

  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}

// Usage: When "electronics" category gets updated
await invalidateByTag('electronics');
```

**Key Points:**
- **TTL:** Simple, but risk of stale data
- **Event-based:** Accurate, but complex
- **Stale-While-Revalidate:** Balance of fast + fresh
- **Tag-based:** Useful for bulk invalidation

---

## ⚠️ Common Pitfalls & Solutions

### Problem 1: Cache Stampede (Thundering Herd)

**Theory — What Is It?**

Cache Stampede (or Thundering Herd) happens when a **very popular cache key expires**. As soon as the key expires, all requests wanting that data attack the database simultaneously.

**Why it happens:**
- Suppose a popular product (like iPhone) data was in cache
- Cache expired (TTL ran out)
- 1000 users are viewing that product simultaneously
- All 1000 requests get cache miss
- All 1000 requests query the database simultaneously
- Database overload → crash!

**Real-world example:**
- **Flash sale** — iPhone at ₹1, 1 lakh users simultaneously
- **Breaking news** — Celebrity death news, 10 lakh users simultaneously
- **Cricket score** — India vs Pakistan match, 50 lakh users simultaneously

**Impact:**
- Database CPU hits 100%
- Response time 100ms → 10 seconds
- Other queries also slow down
- Website can go down

**Scenario:** Cache expired, and 1000 requests hit the database simultaneously!

```
Cache expires
    ↓
1000 requests arrive simultaneously
    ↓
All 1000 hit database (no cache protection)
    ↓
Database overload → Crash!
```

**Solution (Theory):**

We use two methods to prevent Cache Stampede:

**Solution 1: Distributed Lock (Mutex Pattern)**

**Concept:** Only ONE request queries the database, the rest wait.

**How it works:**
1. **Lock Key Create:** Create a corresponding lock key for every cache key (`lock:product:123`)
2. **Atomic Lock Acquisition:** Use Redis `SET ... NX` command which is an atomic operation
   - `NX` (Not eXists) — sets only if key doesn't exist
   - `EX 10` — lock auto-expires after 10 seconds (deadlock prevention)
3. **Single Database Query:** The request that acquires the lock queries the database
4. **Cache Population:** Fetches data from database and stores in cache
5. **Lock Release:** Deletes the lock in `finally` block (success or error)
6. **Other Requests Wait:** Requests that don't get the lock wait briefly and retry
   - On retry, cache might already be populated!

**Why This Works:**
- **Atomicity:** `SET ... NX` is atomic — no race condition
- **Timeout:** `EX 10` ensures lock always releases (handles system crash too)
- **Efficiency:** Out of 1000 requests, only 1 queries the database
- **Safety:** `try/finally` ensures lock release even on errors

**Solution 2: Probabilistic Early Expiration (Jitter)**

**Concept:** Not all items expire at the same time — refresh starts at random times before expiry.

**How it works:**
1. **TTL Check:** Every request checks TTL (`redisClient.ttl(cacheKey)`)
2. **Random Threshold:** Generate 0-60 second random threshold
3. **Early Refresh:** If TTL is below threshold, start refresh in background
4. **Non-blocking:** Refresh happens in background, user doesn't wait
5. **Distribution:** Each item's refresh time will differ (random distribution)

**Why This Works:**
- **No Synchronization:** Not all items expire together
- **Load Distribution:** Database queries distributed over time
- **Proactive:** Refresh before expiration, user doesn't even get stale data
- **Simple:** No locks, no complex coordination

**Solution:**
```javascript
// Solution 1: Lock mechanism (Mutex)
// What we're doing: Only ONE request queries database, rest wait
async function getProductWithLock(productId) {
  const cacheKey = `product:${productId}`;
  const lockKey = `lock:${cacheKey}`;

  // Step 1: Check cache
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Step 2: Try to acquire lock
  // SET key value EX seconds NX = Set if Not eXists, expire after 10 seconds
  // Only first request gets the lock (NX succeeds)
  const lockAcquired = await redisClient.set(lockKey, '1', 'EX', 10, 'NX');

  if (lockAcquired) {
    // Got the lock! I'll query the database
    try {
      // Step 3: Fetch from database
      const product = await fetchFromDb(productId);

      // Step 4: Store in cache
      await redisClient.setEx(cacheKey, 300, JSON.stringify(product));

      return product;
    } finally {
      // Step 5: Release lock (so next requests can get it)
      await redisClient.del(lockKey);
    }
  } else {
    // Didn't get lock - another request is querying database
    // Wait a bit and retry (or cached data might be available)
    await sleep(100); // Wait 100ms
    return await getProductWithLock(productId); // Retry
  }
}

// Solution 2: Probabilistic early expiration (Jitter)
// What we're doing: Not all items expire at same time
// Start refresh at random times before
const ttl = await redisClient.ttl(cacheKey); // Check remaining time
const randomThreshold = Math.random() * 60; // 0-60 seconds random
if (ttl < randomThreshold) {
  // TTL is low, start refresh in background
  refreshInBackground(productId).catch(console.error);
}
```

**Key Points:**
- **Lock mechanism** — `SET lockKey '1' EX 10 NX` is an atomic operation
- **NX flag** — Only sets if key does NOT exist (atomic compare-and-set)
- **EX 10** — Lock auto-releases after 10 seconds (deadlock prevention)
- **try/finally** — Lock release is necessary, whether error occurs or not
- **Probabilistic refresh** — Refresh at random times before, not all expire together

### Problem 2: Cache Penetration

**Theory — What Is It?**

Cache Penetration happens when a **non-existent key is queried repeatedly**. Since the key doesn't exist, cache miss happens, and database query runs every time — which is useless!

**Why it happens:**
- Suppose a user queries `product:999999` which doesn't exist
- Cache miss (key isn't in cache)
- Database query → NULL result
- Next user queries the same key → cache miss again → database query again
- Hacker can overload database by intentionally querying non-existent keys!

**Real-world example:**
- **Malicious attacks** — Hacker tries random IDs (1, 2, 3... 1000000)
- **Deleted products** — Product deleted, but URL still accessible
- **Typos** — User typed wrong URL (`/product/12345` instead of `/product/1234`)

**Impact:**
- Unnecessary load on database
- Response time increase
- Potential DDoS attack vector

**Scenario:** Non-existent keys queried repeatedly, cache miss happens, load on database.

**Solution (Theory):**

We use two methods to prevent Cache Penetration:

**Solution 1: Bloom Filter**

**Concept:** First check if the key exists or not, without querying the database.

**How it works:**
1. **Bloom Filter Setup:** A probabilistic data structure that tells whether a key exists or not
2. **Insertion:** Whenever a product is added to database, add its ID to Bloom Filter
3. **Query Check:** Before every request, check Bloom Filter
   - If Bloom Filter says "NO" → Key definitely doesn't exist → Don't query database
   - If Bloom Filter says "YES" → Key might exist (false positive possible) → Query database
4. **Memory Efficient:** Bloom Filter takes very little memory (millions of keys in KB/MB)

**Why This Works:**
- **No False Negatives:** If Bloom Filter says "NO", the key definitely doesn't exist
- **Memory Efficient:** Millions of keys in little memory
- **Fast:** O(k) time complexity (k = hash functions)
- **Prevents Useless Queries:** Non-existent keys rejected immediately

**Solution 2: Cache Null Values**

**Concept:** If a key doesn't exist, cache its NULL result too (with short TTL).

**How it works:**
1. **Database Query:** Query the first time
2. **NULL Check:** If result is NULL, store in cache (5 minute TTL)
3. **Subsequent Queries:** Next time NULL comes from cache, no database query
4. **Auto-expire:** After 5 minutes cache expires, check again (if product was added, it'll be found)

**Why This Works:**
- **Simple:** No complex data structure needed
- **Effective:** Same non-existent key doesn't query database repeatedly
- **Self-healing:** Auto-refreshes after TTL (if product was added, it'll be found)
- **Trade-off:** Some memory wasted (NULL values in cache), but acceptable

**Solution:**
```javascript
// Solution: Use Bloom Filter
async function getProductWithBloom(productId) {
  // First check if product exists at all
  const exists = await bloomFilter.exists(`product:${productId}`);
  if (!exists) {
    return null; // Don't even query database
  }

  // Normal cache-aside logic
  return await getProduct(productId);
}

// Solution 2: Cache null values (with short TTL)
async function getProduct(productId) {
  const cacheKey = `product:${productId}`;

  const cached = await redisClient.get(cacheKey);
  if (cached !== null) { // null can also be cached
    return cached === 'NULL' ? null : JSON.parse(cached);
  }

  // Database query
  const product = await fetchFromDb(productId);

  if (!product) {
    // Cache null value (for 5 minutes)
    await redisClient.setEx(cacheKey, 300, 'NULL');
    return null;
  }

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));
  return product;
}
```

---

### Problem 3: Cache Avalanche

**Theory — What Is It?**

Cache Avalanche happens when **many cache keys expire at the same time**. This causes sudden load on database because all expired keys must be refreshed simultaneously.

**Why it happens:**
- Suppose we cached 10,000 products for 1 hour
- All TTLs set at same time (e.g., cached at 12:00 PM, expire at 1:00 PM)
- At 1:00 PM all 10,000 keys expire together
- 10,000 database queries run simultaneously
- Database overload → crash!

**Real-world example:**
- **Batch cache updates** — all products refresh at midnight
- **Scheduled jobs** — cache refreshes every hour, all at once
- **System restart** — cache cleared, all keys must reload

**Impact:**
- Sudden database load spike
- Response time 100ms → 10 seconds
- Potential database crash
- Website downtime

**Scenario:** All keys expire together, sudden load on database.

**Solution (Theory):**

**Solution: Random TTL with Jitter**

**Concept:** Keep TTL of all keys slightly different, so they don't expire together.

**How it works:**
1. **Base TTL:** Decide a base TTL (e.g., 3600 seconds = 1 hour)
2. **Jitter Add:** Add random variation to TTL of every key (±20%)
   - Formula: `randomTTL = baseTTL + (random * jitter * 2 - jitter)`
   - Example: baseTTL=3600, jitter=0.2 → randomTTL = 2880 to 4320 seconds
3. **Distribution:** Each key's expiry time will be different (random distribution)
4. **Load Spreading:** Database queries distributed over time

**Why This Works:**
- **No Synchronization:** Not all keys expire together
- **Load Distribution:** Database queries spread over time (not all at once)
- **Simple:** Just add random variation to TTL
- **Effective:** Prevents sudden load spikes

**Example Calculation:**
```
100 items, all base TTL = 3600 seconds (1 hour)

Without Jitter:
- All cached at 1:00 PM
- All expire at 2:00 PM
- 100 queries at 2:00 PM exactly → Database overload!

With Jitter (±20%):
- Item 1: 2880 seconds (48 minutes) → expires 1:48 PM
- Item 2: 3150 seconds (52.5 minutes) → expires 1:52 PM
- Item 3: 3600 seconds (60 minutes) → expires 2:00 PM
- Item 4: 4050 seconds (67.5 minutes) → expires 2:07 PM
- Item 5: 4320 seconds (72 minutes) → expires 2:12 PM
- ... (spread over 24 minutes)

Result: Queries spread over 24 minutes instead of all at once!
```

**Solution:**
```javascript
// Solution: Add random TTL
async function setWithJitter(key, value, baseTTL) {
  // Add random variation to base TTL (±20%)
  const jitter = baseTTL * 0.2;
  const randomTTL = baseTTL + (Math.random() * jitter * 2 - jitter);

  await redisClient.setEx(key, Math.floor(randomTTL), JSON.stringify(value));
}

// Example: 100 items, all base TTL = 3600 seconds
// With jitter: 2880-4320 seconds (random distribution)
// So all items won't expire together
```

---

### Problem 4: Data Inconsistency

**Theory — What Is It?**

Data Inconsistency happens when **cache and database have different data**. It confuses the user — which data is correct?

**Why it happens:**
- **Scenario 1: Cache not invalidated after update**
  - Database updated (name: "John" → "Jane")
  - Cache still has old data (name: "John")
  - User sees old data!

- **Scenario 2: Cache updated, database update failed**
  - New data in cache
  - Database update failed (network error, etc.)
  - Mismatch between cache and database!

- **Scenario 3: Concurrent updates**
  - Request 1: Database update (name: "John" → "Jane")
  - Request 2: Cache read (still "John")
  - Request 1: Cache invalidate
  - Request 2: Cache miss → fetch "Jane" from database → store in cache
  - Result: Race condition!

**Real-world example:**
- **E-commerce** — Product price ₹999 in database, ₹1999 in cache
- **Banking** — Account balance ₹10,000 in database, ₹5,000 in cache
- **Social media** — User name changed, but old name still shows on profile

**Impact:**
- User confusion
- Wrong decisions (price mismatch)
- Data corruption
- Trust loss

**Scenario:** Cache and database have different data.

**Solution (Theory):**

We use two methods to handle Data Inconsistency:

**Solution 1: Write-Through Pattern**

**Concept:** Write data to cache first, and cache automatically syncs to database.

**How it works:**
1. **Write Request:** Application sends write request to cache
2. **Cache Write:** Cache stores the data
3. **Database Sync:** Cache also writes to database (synchronously)
4. **Consistency:** Same data in both places — consistency guaranteed!

**Why This Works:**
- **Strong Consistency:** Cache and database always in sync
- **Simple:** Application only interacts with cache
- **Reliable:** Cache handles database sync

**Trade-offs:**
- **Write Latency:** Write is slow (must write in both places)
- **Availability:** If database is down, write fails

**Solution 2: Eventual Consistency with Background Sync**

**Concept:** Update database, and update cache in background (asynchronously).

**How it works:**
1. **Database Update:** First update database (synchronously)
2. **Return Success:** Return success response to user
3. **Background Cache Update:** Update cache asynchronously
4. **Retry Logic:** If cache update fails, retry

**Why This Works:**
- **Fast Writes:** User gets response immediately
- **Eventual Consistency:** Cache updates after a short delay
- **Fault Tolerant:** Even if cache update fails, database is safe

**Trade-offs:**
- **Temporary Inconsistency:** For a few seconds, cache and database can differ
- **Complexity:** Retry logic, error handling needed

**Solution:**
```javascript
// Solution 1: Use write-through pattern (already shown above)

// Solution 2: Eventual consistency with background sync
async function updateUserWithSync(userId, updates) {
  // Database update (synchronous)
  await db.execute('UPDATE users SET ? WHERE id = ?', [updates, userId]);

  // Cache update (background/async)
  updateUserCacheInBackground(userId);

  return { success: true };
}

async function updateUserCacheInBackground(userId) {
  try {
    // Update in background after a short delay
    setTimeout(async () => {
      const user = await fetchUserFromDb(userId);
      await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(user));
    }, 1000);
  } catch (error) {
    console.error('Cache sync failed:', error);
    // Retry logic or alert system
  }
}
```

---

## 🌍 Related Concepts (Context)

### 📊 When to Use Cache vs Database?

| Scenario | Use Cache | Use Database | Why |
|----------|-----------|--------------|-----|
| **Read-heavy** (blogs, news) | ✅ Yes | ❌ No | Fast reads, less DB load |
| **Write-heavy** (logs, analytics) | ❌ No | ✅ Yes | Consistency important |
| **Session data** | ✅ Yes | ❌ No | Fast access, can be lost |
| **Financial transactions** | ❌ No | ✅ Yes | ACID compliance needed |
| **Product catalog** | ✅ Yes (with DB) | ✅ Yes | Read fast, write consistent |
| **Real-time analytics** | ✅ Yes (with DB) | ✅ Yes | Cache for speed, DB for accuracy |

### 🗄️ Database Types & Caching

**SQL Databases (MySQL, PostgreSQL):**
- Structured data, ACID compliance
- Cache: Query results, frequently accessed rows
- Example: User profiles, orders

**NoSQL Databases (MongoDB, Cassandra):**
- Unstructured data, horizontal scaling
- Cache: Document-level caching, hot data
- Example: Product catalogs, user activity

**In-Memory Databases (Redis, Memcached):**
- Ultra-fast, volatile storage
- Use as cache layer, not primary storage
- Example: Session store, leaderboards

### 🔄 Cache Hierarchy (Multi-Level Caching)

```
User Request
    ↓
L1 Cache (CPU Cache) - Fastest, smallest
    ↓ Miss
L2 Cache (RAM - Redis) - Fast, medium
    ↓ Miss
L3 Cache (Database Buffer Pool) - Slower, large
    ↓ Miss
L4 Storage (Database on Disk) - Slowest, unlimited
    ↓
Return Data (and populate caches)
```

**Real-world example:**
- **L1:** CPU cache (nanoseconds)
- **L2:** Redis/Memcached (milliseconds)
- **L3:** Database buffer pool (milliseconds)
- **L4:** Database on SSD/HDD (seconds)

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "If cache is so fast, why not store everything in cache?"

**Answer:** "Sir, cache is definitely fast, but it's **expensive** and has **limited capacity**. Redis 64GB RAM costs ₹50,000/month, while 1TB database storage costs ₹5,000/month. That's why we cache only **frequently accessed data**, and keep the rest in the database. Using cache-aside pattern, we balance both."

### Q: "What's the difference between cache-aside and write-through?"

**Answer:** "In cache-aside, the application first checks cache, and on cache miss fetches from database. In write-through, the write operation happens in cache first, and cache automatically syncs to database. Cache-aside is fast for reads, write-through guarantees data consistency."

### Q: "How do you handle cache invalidation?"

**Answer:** "We use multiple strategies: 1) **TTL-based** — set expiry time for every item, 2) **Event-based** — delete cache when data changes, 3) **Tag-based** — invalidate related items as a group. The choice depends on consistency requirements."

### Q: "What is cache stampede and how do you prevent it?"

**Answer:** "Cache stampede happens when a popular cache key expires and thousands of requests hit the database simultaneously. To prevent it, we use a **locking mechanism** (only one request queries the database), or **probabilistic early expiration** (start refresh at random times before)."

### Q: "Redis vs Memcached — which is better?"

**Answer:** "Redis provides advanced features — data persistence, complex data structures (lists, sets, sorted sets), pub/sub messaging. Memcached is simpler — just key-value store, but multi-threaded and can handle large objects. We use Redis when advanced features are needed, Memcached when simple high-throughput caching is needed."

### Q: "What's the relationship between database sharding and caching?"

**Answer:** "Database sharding is a way to scale horizontally — distributing data across multiple servers. Caching works together with sharding — there can be a separate cache layer per shard, or a distributed cache (Redis Cluster) can be used. Both together scale the system."

---

## 📝 Quick Reference (Summary)

### Caching Strategies Comparison:

| Strategy | Read Speed | Write Speed | Consistency | Use Case |
|----------|------------|-------------|-------------|----------|
| **Cache-Aside** | Fast | Normal | Eventual | Most web apps |
| **Write-Through** | Fast | Slow | Strong | Banking, finance |
| **Write-Back** | Fast | Very Fast | Eventual | Social media, counters |
| **Refresh-Ahead** | Fast | Normal | Strong | Stock prices, news |

### Cache vs Database Decision Matrix:

| Factor | Cache (Redis) | Database (MySQL) |
|--------|---------------|------------------|
| **Speed** | 1-10ms | 100-500ms |
| **Cost per GB** | ₹800/month | ₹5/month |
| **Max Size** | 64GB (typical) | 1TB+ |
| **Persistence** | Optional (RDB/AOF) | Always |
| **Data Model** | Key-value, structures | Tables, relations |
| **Best For** | Hot data, sessions | Cold data, transactions |

### Common Pitfalls & Solutions:

| Problem | Cause | Solution |
|---------|-------|----------|
| **Cache Stampede** | Popular key expires | Locking, probabilistic refresh |
| **Cache Penetration** | Non-existent keys queried | Bloom filter, cache nulls |
| **Cache Avalanche** | Many keys expire together | Random TTL with jitter |
| **Data Inconsistency** | Cache-DB sync issues | Write-through, event-based invalidation |

### Key Takeaways:

| Concept | Key Point |
|---------|-----------|
| **Cache is expensive** | Use only for hot data |
| **Database is source of truth** | Cache can be invalidated |
| **Choose right strategy** | Depends on read/write ratio |
| **Plan for failures** | Cache miss, stampede, avalanche |
| **Monitor metrics** | Hit rate, latency, memory usage |

---

## 🚀 Next Steps

Now you're ready for **Topic 4: The Request Lifecycle**! This topic explains exactly what happens when you enter a URL in the browser — from DNS lookup to response rendering.

---

> **Pro Tip:** When discussing cache vs database in an interview, always mention **cost** and **scale** — "Cache is expensive, so we use it only for hot data" — this shows you understand practical trade-offs! 💡

---

## 📚 Appendix: TTL (Time-To-Live) Explained

### What Is TTL?

**TTL (Time-To-Live)** is a setting that tells how long data stored in cache stays **valid**. After TTL expires, data becomes **stale** and fresh data gets fetched from server on next request.

### Why Is TTL Important?

1. **Data Freshness:** Ensures user doesn't see old data
2. **Memory Management:** Old data gets deleted automatically
3. **Load Distribution:** Not all keys expire together (if TTL is random)
4. **Storage Cost:** Less memory used (old data auto-deleted)

### How to Set TTL?

**In Redis:**
```javascript
// setEx = Set with Expiry (in seconds)
await redisClient.setEx('user:123', 3600, JSON.stringify(userData));
// 3600 seconds = 1 hour

// SET with EX (alternative syntax)
await redisClient.set('user:123', JSON.stringify(userData), { EX: 3600 });

// EXPIRE (set TTL on existing key)
await redisClient.expire('user:123', 3600);
```

**Common TTL Values:**
| Data Type | Recommended TTL | Why |
|-----------|-----------------|-----|
| **Static assets** (CSS, JS) | 1 year (31536000s) | Rarely change, versioned |
| **Product catalog** | 1 hour (3600s) | Prices change occasionally |
| **User profile** | 5-30 minutes (300-1800s) | Can change, but not critical |
| **Session data** | 24 hours (86400s) | Based on user activity |
| **API responses** | 1-5 minutes (60-300s) | Frequently changing |
| **NULL values** | 5 minutes (300s) | Prevent penetration, but short |

### TTL Selection Strategy

**Factors to consider:**
1. **Data Change Frequency:**
   - Static data → Long TTL (hours/days)
   - Dynamic data → Short TTL (minutes)

2. **Consistency Requirements:**
   - High consistency → Short TTL
   - Eventual consistency → Long TTL

3. **Database Load:**
   - High DB load → Longer TTL (fewer queries)
   - Low DB load → Shorter TTL (fresher data)

4. **User Experience:**
   - Critical data (prices, balance) → Short TTL
   - Non-critical data (descriptions, images) → Long TTL

### TTL vs No Expiration

| Approach | Pros | Cons | Use Case |
|----------|------|------|----------|
| **With TTL** | Auto cleanup, fresh data | More DB queries | Most applications |
| **No Expiration** | Less DB load | Stale data forever, memory bloat | Static reference data |

### TTL Best Practices

1. **Add Jitter:** Add random variation to prevent avalanche
   ```javascript
   const baseTTL = 3600;
   const jitter = baseTTL * 0.2; // ±20%
   const randomTTL = baseTTL + (Math.random() * jitter * 2 - jitter);
   await redisClient.setEx(key, randomTTL, value);
   ```

2. **Monitor Hit Rate:** Adjust TTL based on cache hit/miss ratio
   ```javascript
   // High miss rate? Increase TTL
   // High stale data complaints? Decrease TTL
   ```

3. **Layered TTL:** Different TTL for different data types
   ```javascript
   // Hot data (frequently accessed)
   await redisClient.setEx('product:popular:123', 300, data); // 5 min

   // Cold data (rarely accessed)
   await redisClient.setEx('product:old:456', 86400, data); // 24 hours
   ```

4. **TTL for NULL values:** Short TTL for non-existent keys
   ```javascript
   // Prevent cache penetration
   await redisClient.setEx('product:999999', 300, 'NULL'); // 5 min
   ```

### TTL Monitoring

**Key metrics to track:**
- **Cache Hit Rate:** (Hits / Total Requests) × 100
  - Target: 80-95% for most applications
- **Average TTL:** Average time keys stay in cache
- **Eviction Rate:** How often keys are removed before TTL (memory pressure)
- **Stale Data Complaints:** User reports of outdated data

### Common TTL Mistakes

1. **TTL too short:** Database overload, no caching benefit
2. **TTL too long:** Stale data, user complaints
3. **Same TTL for everything:** No optimization for different data types
4. **No jitter:** Cache avalanche risk
5. **Forgetting NULL caching:** Cache penetration vulnerability

---

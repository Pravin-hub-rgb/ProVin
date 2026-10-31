# 🗄️ Phase 4: Topic 23 - Handling Missing Data & Schema Migrations

> **Interview Question:** "How do you handle missing values in the database in production? How do you do schema migrations without downtime? What approach do you follow?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"While building a new room in your house, you build it while people are still living there. Nobody moves out. Similarly, schema migrations have to be done while the system is live, without downtime."**

The production database never shuts down. You have to make changes while it's running.

---

## 💡 Beginner-Friendly Explanation (House Renovation Analogy)

```
🏠 Changing the house:

❌ Wrong way:
Shut down the house completely. Make everyone leave. Change the whole house in 1 day. Then let people back in. The house stays closed for 24 hours. Everyone gets upset.

✅ Right way:
1.  First build the new wall on the side while people are still inside
2.  Shift everyone to the new section
3.  Then remove the old section
4.  The house was never closed. Nobody even noticed the change.

⚡ Database Migration:
Exactly the same thing. In production you have to do 0 downtime migration. You can never shut down the database. Users keep coming continuously.
```

---

## 🎯 Missing Data Handling Strategies

When you add a new column, the old rows don't have a value in it. These are missing values.

### ✅ Strategy 1: Set a Default Value
Simplest and best approach.

```sql
-- ✅ Best way
ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT '' NOT NULL;
```

✅ **Pros:**
- No missing values
- No application change needed
- All existing queries keep working

❌ **Cons:**
- Every new column needs a sensible default

---

### ✅ Strategy 2: Backfill Data
If no default is available, update the old rows in the background.

```sql
-- Step 1: Add column as nullable
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Step 2: Update all old rows via background job
UPDATE users SET phone = '' WHERE phone IS NULL;

-- Step 3: Now make the column NOT NULL
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

✅ **Pros:**
- No default needed
- Can be done at slow speed without load

❌ **Cons:**
- Takes some time

---

### ✅ Strategy 3: Application Level Handling
Check in the application — if it's null, show a default.

```tsx
function UserProfile(user) {
  // ✅ If phone isn't there, show default
  return <div>Phone: {user.phone || 'Not provided'}</div>
}
```

✅ **Pros:**
- No change in database
- Fastest to implement

❌ **Cons:**
- Have to check everywhere
- If you forget, a bug appears

---

## 🚨 Never Do These Mistakes

### ❌ Mistake 1: Add a new column as NOT NULL without a default
```sql
-- ❌ SUPER DANGEROUS! This will lock the entire database in production
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;
```

On a table with 1 crore rows this query will hold the lock for 10 minutes. The entire site goes down.

### ❌ Mistake 2: Run ALTER TABLE on a big table at peak time
Never run a migration at 12 noon. Run it at 2 AM when traffic is low.

### ❌ Mistake 3: Make all changes at once
Don't add 10 columns at once. Do them one by one. Monitor after each change.

### ❌ Mistake 4: No rollback plan after migration
If something goes wrong, how do you go back? Always keep a rollback script ready.

---

## 📋 Zero Downtime Migration Steps

This is the industry standard pattern every company follows:

```
✅ STEP 1: Add new column as nullable
- No existing code is affected
- Everything works just like before

✅ STEP 2: Update application code to write to both old and new column
- New entries now go to both places
- Old column is still used for reads

✅ STEP 3: Backfill all old rows into the new column
- Copy old data into the new column via background job
- Do it slowly so there's no load

✅ STEP 4: Update application to read from the new column
- Now everything happens from the new column
- Old column is no longer used

✅ STEP 5: Delete the old column
- Now the old column can be deleted
- The entire migration is complete

✅ RESULT: The app never went down! No user even knew something changed.
```

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "How do you handle missing values in production?"

**Answer:** "Sir, for handling missing values we always follow 3 steps: first add the new column as nullable, then backfill via background job, then make it not null. We never add a not null column without a default in production."

### Q: "How do you do zero downtime schema migration?"

**Answer:** "For zero downtime migration we follow a multi-step approach. First add the new column, then write to both places, then backfill the old data, then read from the new one, and finally delete the old column. The app never goes down in this."

### Q: "Have you ever brought production down with a migration?"

**Answer:** "Yes, in the initial days. Once I added a not null column without a default on a table with 80 lakh rows. The entire site was down for 15 minutes. After that I never do that."

### Q: "How do you backfill without load?"

**Answer:** "We always do backfill in batches. Update 1000 rows at once, then wait 1 second. This way no load comes on the database. Everything runs in the background."

### Q: "Which default value should you keep?"

**Answer:** "Always keep a sensible default. Empty string for strings, 0 for numbers, false for booleans. Never keep NULL as a valid value. NULL means unknown, not empty."

### Q: "When do you run a migration in production?"

**Answer:** "Always at the lowest traffic time. We run migrations at 2 AM. At that time only 5% of users are there. If something goes wrong, the impact is less."

### Q: "How do you alter a large table?"

**Answer:** "We don't directly alter large tables. We create a new table, copy the data, then rename. No lock happens in this. GitHub and Instagram also use this approach."

### Q: "What do you check before a migration?"

**Answer:** "Before migration we test everything on staging. We keep the rollback script ready. We keep monitoring open. We inform everyone that the migration is running."

---

## ✅ **Key Takeaways**

1.  Never add a NOT NULL column without a default in production
2.  Do every migration in multiple steps for zero downtime
3.  Always backfill in batches at slow speed
4.  Always run migration at the lowest traffic time
5.  Always keep rollback script ready
6.  Never make more than one change at a time
7.  Don't use NULL as an actual value
8.  Monitor for 1 hour after every migration

> **Final Tip:** Always say this line in an interview: "A production database is a running train. You're changing the wheels while it's moving. You can never stop the train."
# 🗄️ Phase 4: Topic 22 - Database Indexing

> **Interview Question:** "What is a database index? Why do queries become fast with an index? What are the trade-offs of an index? When should you add an index and when not?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"Index = The index page at the back of a book. Before finding any chapter, you look at the index page. You don't have to read the whole book page by page."**

Add an index → Query becomes 1000x faster
Add too many indexes → Writes become 10x slower

---

## 💡 Beginner-Friendly Explanation (Book Analogy)

```
📖 Book Example:

❌ Without Index:
You need to find the "React" chapter. You start from the first page and check page by page. If it's a 500-page book, you have to look at 500 pages. Takes 1 minute.

✅ With Index:
There's an index page at the back of the book. It says "React = Page 342". You go directly to page 342. Done in 1 second.

⚠️ Trade-off:
Now if you add a new chapter, you have to update the index page at the back too. With every new chapter the index has to be updated. That's why writes become slow.
```

✅ **Same thing in the database:**
- Without Index = Full Table Scan (check every row)
- With Index = Go directly to that row

---

## 📊 How Index Works Internally

An index is a separate data structure stored in sorted order.

```
❌ Normal Table Storage (Unordered):
ID  | Name    | Email
1   | Amit    | a@a.com
5   | Raj     | r@r.com
3   | Priya   | p@p.com
2   | Sumit   | s@s.com
4   | Neha    | n@n.com

✅ Index on Name (Sorted):
Name    | Row Pointer
Amit    → 1
Neha    → 4
Priya   → 3
Raj     → 5
Sumit   → 2
```

When you run `SELECT * FROM users WHERE name = 'Priya'`:
1.  Binary search in the index O(log n)
2.  Go directly to Priya's pointer
3.  Return the row

✅ Even with 10 lakh rows, only 20 comparisons are needed.

---

## ⚖️ Trade-offs of an Index

✅ **Advantages:**
1.  Read queries become 10x to 1000x faster
2.  Sorting and grouping also become fast
3.  Unique constraint prevents duplicate entries
4.  Join operations become very fast

❌ **Disadvantages:**
1.  Write operations become slow (INSERT UPDATE DELETE)
2.  Extra disk space is used
3.  With too many indexes, database memory consumption increases
4.  Every write requires updating all indexes

> **Rule of Thumb:** Don't put more than 5 indexes on 1 table.

---

## 🎯 When Should You Add an Index?

✅ **Add an index in these cases:**
1.  Columns that are used often in the WHERE clause
2.  Columns used in ORDER BY or GROUP BY
3.  Columns used in JOIN
4.  Columns with unique values
5.  Always put an index on foreign keys

❌ **Don't add an index in these cases:**
1.  Small tables (less than 1000 rows)
2.  Columns rarely used in queries
3.  Columns with too many duplicate values (gender, status etc)
4.  Columns that are very frequently updated
5.  Text and long string columns

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Putting an index on every column
If you put an index on every column, your writes become very slow. Every insert would have to update 10 indexes.

### ❌ Mistake 2: Order matters in composite index
```sql
-- ✅ If you use both name and age in your query
CREATE INDEX idx_name_age ON users(name, age)

-- ❌ This works only for name or name+age
-- ❌ It won't work for age alone
```

In an index, order should always be equality columns first, then range columns.

### ❌ Mistake 3: Adding extra columns to the index
Only add those columns to the index that are used in the query. Don't add extra columns.

### ❌ Mistake 4: Putting a separate index on the primary key
An index is automatically created on the primary key. Don't put a separate one on it.

---

## 📝 Common Index Types

| Index Type | Use Case |
|------------|----------|
| Single Column | Simple queries |
| Composite Index | Multiple columns in WHERE clause |
| Unique Index | No duplicate values wanted |
| Full Text Index | Search queries |
| Partial Index | Index for only some rows |

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What is a database index?"

**Answer:** "Sir, an index is a data structure that we put on a column in the database. It's like the index page of a book. Queries become very fast because you don't have to scan the whole table. You go directly to that row."

### Q: "Why does a query become fast with an index?"

**Answer:** "Without an index the database checks every row one by one — full table scan. With an index it's stored in sorted order so binary search can be done. O(n) becomes O(log n). Even in 1 million rows, the result comes in just 20 steps."

### Q: "What are the disadvantages of an index?"

**Answer:** "The disadvantages of an index are:
1.  Write operations become slow — INSERT UPDATE DELETE
2.  Extra disk space is used
3.  The index has to be updated with every write
4.  Memory consumption increases with too many indexes"

### Q: "How many indexes should be on one table?"

**Answer:** "Maximum 5 to 6 indexes should be on one table. Don't put more than that. With every index, read becomes fast but write becomes slow. You have to maintain the balance."

### Q: "Why does order matter in a composite index?"

**Answer:** "A composite index works left to right. If you created an index on (name, age), it will work for name or name+age queries. It won't work for age alone. That's why order is very important."

### Q: "What's the difference between primary key and index?"

**Answer:** "The primary key is automatically a unique index. There can be only one primary key per table. But there can be many indexes. The primary key can never be null, an index can be null."

### Q: "When does a query not become fast even with an index?"

**Answer:** "When the table is small — less than 1000 rows — full table scan is faster than the index. When there are too many duplicate values in the column, the index doesn't work well. When you've created the index in the wrong order, it won't work either."

### Q: "How do you optimize indexes in production?"

**Answer:** "In production I first run the EXPLAIN query to see where full table scan is happening. I add an index there. Every 3 months I delete unused indexes. I never put an index on every column."

---

## ✅ **Key Takeaways**

1.  Index = Index page of a book, makes queries 1000x faster
2.  For every index you have to sacrifice write speed
3.  Maximum 5 indexes per table
4.  Order is very important in composite index
5.  Don't add index on small tables
6.  Always add index on foreign keys
7.  Never put index on every column just because of a trend
8.  Always verify with EXPLAIN query whether the index is working

> **Final Tip:** Always say this line in an interview: "Index is not a silver bullet. It's a trade-off. You sacrifice write speed for read speed. The biggest mistake is that people put index everywhere."
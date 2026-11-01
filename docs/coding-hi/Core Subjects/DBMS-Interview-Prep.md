# DBMS — Interview Prep (Deep Dive)

> Target: Full-stack developer roles, Gurgaon, 5–30 LPA range
> Context: Tum already Postgres/Supabase + Prisma use kar rahe ho DukaanOS mein — jahan bhi possible hai, wahi schema example ke roop mein use karna, cram nahi karna.

---

## 1. Basics — DBMS vs RDBMS

**DBMS**: Koi bhi software jo data store/manage karta hai (files ke roop mein bhi ho sakta hai — jaise MS Access).

**RDBMS**: Data ko **tables** (rows + columns) mein store karta hai, aur tables ke beech **relationships** define kar sakta hai (foreign keys ke through). Postgres, MySQL, SQL Server — sab RDBMS hain.

**Key difference interview mein poochte hain**: RDBMS mein data **normalized** hota hai aur **ACID** properties follow karta hai. Plain DBMS mein ye guarantee nahi hota.

### Keys (bahut common question)

| Key | Matlab |
|---|---|
| **Primary Key** | Table mein har row ko uniquely identify karta hai. Null nahi ho sakta. |
| **Foreign Key** | Ek table ka column jo dusre table ke primary key ko reference karta hai — relationship banata hai. |
| **Candidate Key** | Wo columns jo primary key ban sakte the (unique + not null) but nahi bane. |
| **Composite Key** | Do ya zyada columns milke primary key banate hain (jab akela column unique nahi hai). |

**DukaanOS example soch ke bolo**: `products` table mein `product_id` primary key hai. `orders` table mein `product_id` foreign key hoga jo `products.product_id` ko reference karega.

**Interview tip**: Interviewer jab "keys explain karo" bole, to seedha definition mat bolo — ek chhota example do (jaise upar wala). Ye "cram kiya hai" vs "samajh hai" mein difference dikhata hai.

---

## 2. Normalization (Sabse zyada poocha jaata hai)

**Kyun karte hain?** Data duplication (redundancy) hataane ke liye, aur update/insert/delete anomalies avoid karne ke liye.

**Anomaly ka matlab**: Agar ek customer ka naam 5 jagah repeat ho raha hai table mein, aur uska naam change karna hai, to sab 5 jagah update karna padega — miss ho gaya to data inconsistent ho jayega. Normalization isse rokta hai.

### 1NF (First Normal Form)
- Har column mein **atomic** (single, indivisible) value honi chahiye.
- Repeating groups nahi hone chahiye.

❌ Bad: `phone_numbers` column mein `"9876543210, 9998887776"` (comma-separated)
✅ Good: Alag `customer_phones` table banao, ek row per phone number.

### 2NF (Second Normal Form)
- Pehle 1NF follow karna chahiye.
- **Partial dependency** nahi honi chahiye — matlab, agar composite primary key hai (jaise `order_id + product_id`), to har non-key column **poore** composite key pe depend karna chahiye, sirf ek part pe nahi.

❌ Bad: `order_items` table mein composite key `(order_id, product_id)` hai, but `product_name` sirf `product_id` pe depend karta hai — ye partial dependency hai.
✅ Fix: `product_name` ko `products` table mein alag rakho, `order_items` mein sirf `product_id` reference karo.

### 3NF (Third Normal Form)
- Pehle 2NF follow karna chahiye.
- **Transitive dependency** nahi honi chahiye — matlab non-key column dusre non-key column pe depend nahi karni chahiye.

❌ Bad: `orders` table mein `customer_id`, `customer_city`, `customer_pincode` — yahan `customer_city` `customer_pincode` pe depend karta hai (transitive), dono `customer_id` pe nahi seedha.
✅ Fix: Customer details ko alag `customers` table mein rakho.

### BCNF (Boyce-Codd Normal Form)
- 3NF ka stricter version — jab table mein **multiple overlapping candidate keys** hote hain, tab edge cases handle karta hai.
- Interview mein sirf "3NF se strict hai, rare edge cases ke liye" bolna kaafi hai — deep dive zaroori nahi full-stack role ke liye.

**Practical exercise**: Apna DukaanOS Prisma schema kholo, aur khud se pucho — "kya koi table mein repeated/derivable data hai jo alag table mein honi chahiye?" Ye tumhe real normalization thinking sikhayega, ratne se nahi.

**Common interview question**: *"Denormalization kab karte ho?"* — Answer: Jab read performance critical ho aur joins bahut expensive ho rahe hon (jaise analytics dashboards, reporting), tab intentionally thoda duplication allow karte hain speed ke liye. Trade-off hai: read fast, write/update thoda complex.

---

## 3. Joins (Har interview mein poochte hain — practical bhi hai)

Socho do tables: `customers` (customer_id, name) aur `orders` (order_id, customer_id, amount).

| Join Type | Kya karta hai |
|---|---|
| **INNER JOIN** | Sirf wo rows jinke match dono tables mein hain. |
| **LEFT JOIN** | Left table ke **saare** rows, right table se match mila to data, nahi to NULL. |
| **RIGHT JOIN** | LEFT ka opposite — right table ke saare rows. |
| **FULL OUTER JOIN** | Dono tables ke saare rows, match ho ya na ho. |
| **SELF JOIN** | Ek table ka apne aap se join (jaise employee-manager hierarchy, jahan manager_id bhi employee_id hi hai). |

```sql
-- Example: Har customer ke saath unke orders (agar hain)
SELECT customers.name, orders.amount
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```

**Common gotcha question**: *"LEFT JOIN mein agar customer ka koi order nahi hai to kya hoga?"* — `orders.amount` NULL aayega, but customer ki row phir bhi dikhegi.

**DukaanOS angle**: Jab tum kirana POS mein "sabhi products dikhao chahe stock mein hon ya na hon" — ye LEFT JOIN ka classic use case hai (`products` LEFT JOIN `inventory`).

---

## 4. Indexing

**Kya hai**: Ek data structure (mostly B-Tree) jo specific columns pe query lookup ko fast banata hai — bina index ke database ko **har row** check karni padti hai (full table scan), index ke saath directly jump kar sakta hai.

**Kyun fast hai (intuition, deep math zaroori nahi)**: Socho ek phone book — agar names alphabetically sorted hain (index), to "Sharma" dhundna fast hai. Agar random order mein hain, to har naam check karna padega.

**Kab lagate ho**:
- Columns jo baar-baar `WHERE`, `JOIN`, ya `ORDER BY` mein use hote hain.
- Foreign keys pe generally index lagana chahiye.

**Kab NAHI lagana chahiye** (ye interview mein bhi poochte hain, samajhdaari dikhata hai):
- Chhoti tables pe (index ka overhead fayde se zyada ho sakta hai).
- Columns jo baar-baar update hote hain — kyunki har INSERT/UPDATE pe index bhi update karna padta hai, isse **write speed slow** ho jaati hai.
- **Trade-off yaad rakho**: Index read fast karta hai, but write (insert/update/delete) thoda slow kar deta hai.

**DukaanOS example**: `products` table mein `barcode` column pe index hoga (kyunki voice billing mein baar-baar barcode se lookup hota hai) — fast lookup chahiye.

---

## 5. Transactions + ACID

**Transaction**: Ek ya zyada database operations ka group jo **ek unit** ke roop mein treat hota hai — ya to sab complete honge, ya koi nahi (all-or-nothing).

**Real example**: Bank transfer — account A se paisa katna aur account B mein add karna. Agar A se kat gaya but B mein add hote hote system crash ho gaya — paisa gayab! Transaction isse rokta hai: dono steps ek saath commit hote hain, ya dono rollback ho jaate hain.

### ACID

| Property | Matlab |
|---|---|
| **Atomicity** | Sab steps complete honge, ya koi nahi. Partial execution nahi hoga. |
| **Consistency** | Transaction ke pehle aur baad database ek valid state mein rahega (rules/constraints follow honge). |
| **Isolation** | Do transactions simultaneously chal rahe hon to ek doosre ko interfere nahi karenge. |
| **Durability** | Ek baar commit ho gaya to permanent hai — system crash ho bhi jaaye to data safe rahega. |

**DukaanOS example**: Jab ek sale hoti hai — inventory count kam hona aur sales record create hona — ye dono ek transaction mein hone chahiye. Agar inventory update ho gaya but sales record fail ho gaya, data inconsistent ho jayega.

```sql
BEGIN TRANSACTION;
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 101;
INSERT INTO sales (product_id, amount) VALUES (101, 50);
COMMIT;
```

### Isolation Levels (basic samajh, deep nahi)

| Level | Kya rokta hai |
|---|---|
| **Read Uncommitted** | Kuch nahi — dirty reads possible (dusre transaction ka uncommitted data bhi dikh sakta hai). |
| **Read Committed** | Sirf committed data dikhega (Postgres ka default). |
| **Repeatable Read** | Same transaction ke andar same query baar-baar chalao to same result milega. |
| **Serializable** | Sabse strict — transactions bilkul sequentially chal rahe jaise treat hote hain. |

**Interview tip**: Agar deep isolation level questions aayein, "Postgres default Read Committed hai, aur zyada strict isolation chahiye to Serializable use karte hain, but performance trade-off hota hai" — itna kaafi hai full-stack role ke liye.

---

## 6. SQL vs NoSQL

| | SQL (Postgres, MySQL) | NoSQL (MongoDB, DynamoDB) |
|---|---|---|
| Structure | Fixed schema (tables, columns) | Flexible schema (documents, key-value) |
| Relationships | Strong (joins, foreign keys) | Weak/manual (embed ya reference) |
| Best for | Structured data, complex queries, transactions | Rapidly changing schema, huge scale, simple queries |
| Scaling | Vertically (mostly) | Horizontally (easily) |

**Kab kaunsa**: Agar data structured hai aur relationships important hain (jaise DukaanOS ka inventory-orders-customers) — SQL better. Agar schema baar-baar change hoga ya bahut zyada unstructured data hai (jaise logs, user activity feed) — NoSQL better.

**Interview mein honest answer dena**: "Mera use case (kirana POS) structured hai — inventory, orders, customers ke beech clear relationships hain, isliye maine Postgres choose kiya" — ye real reasoning dikhata hai, textbook answer nahi.

---

## Quick Revision Checklist (before interview)

- [ ] Primary key, Foreign key, Composite key ka difference + example
- [ ] 1NF, 2NF, 3NF — ek line mein har ek explain kar sakte ho + example
- [ ] Denormalization kyun karte hain
- [ ] 4 types ke joins + kab kaunsa
- [ ] Index kya hai, kyun fast hai, kab NAHI lagana
- [ ] ACID ke 4 letters + real example (jaise bank transfer ya apna DukaanOS sale flow)
- [ ] Isolation levels — sirf naam + one-liner
- [ ] SQL vs NoSQL — apne use case ke saath justify kar sakte ho

---

## Practice Approach

1. Har topic padhne ke baad, apne DukaanOS schema (Prisma) khol ke socho — "yahan ye concept kaise apply hota hai?"
2. Google karo: "DBMS interview questions for full stack developer" — 15-20 common questions milenge, unhe apne words mein answer likhne ki practice karo (bolke bhi practice karo, likhke bhi).
3. Jab confident ho, mujhe bolna — mock Q&A round kar sakte hain isi format mein.

**Next subject jab ready ho**: OOP, phir CN, phir OS — same depth ke saath.

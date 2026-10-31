# ⚛️ Phase 2: Topic 11 - useMemo & useCallback

> **Interview Question:** "What's the difference between useMemo and useCallback? What does 'expensive calculation' mean? Does React know a calculation is expensive? When should you use them, and when not?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"useMemo memoizes values, useCallback memoizes functions. Both are purely for performance optimization — you don't need to use them everywhere."**

### **Most Important Thing — Why Do They Matter?**

```
On every render in React:
1. The component function executes again
2. All variables are recreated
3. All functions are recreated

Problem:
- Expensive calculations run on every render (performance issue)
- Functions are recreated on every render (child components re-render)

Solution:
- useMemo → Cache expensive calculations
- useCallback → Cache functions

But React doesn't know any of this internally — you have to tell it manually!
```

---

## 💡 **Beginner-Friendly Explanation**

### 🧮 **useMemo = Remembering the Calculator's Result**

```
Imagine you're solving a complex math problem:

❌ **Without useMemo:**
   - Solve the same problem every time
   - 2 + 2 = 4 (first time)
   - 2 + 2 = 4 (second time) — SAME calculation again!
   - 2 + 2 = 4 (third time) — SAME calculation again!
   - Wasted time!

✅ **With useMemo:**
   - Solve it once → remember the result
   - Second time → fetch result from memory (no calculation)
   - Third time → fetch result from memory (no calculation)
   - Time saved!

But remember:
- Only remember it when the numbers change
- If the numbers change, solve it again
```

### 📦 **useCallback = Remembering a Function's Reference**

```
Imagine you have a tool:

❌ **Without useCallback:**
   - Buy a new tool every time
   - Day 1: Bought a hammer (₹500)
   - Day 2: Bought a hammer (₹500) — SAME tool!
   - Day 3: Bought a hammer (₹500) — SAME tool!
   - Wasted money!

✅ **With useCallback:**
   - First time: Buy the hammer → remember it
   - Second time: Use the same old hammer
   - Third time: Use the same old hammer
   - Money saved!

But remember:
- Only remember it when the need doesn't change
- If the need changes, buy a new tool
```

---

## 🔄 **useMemo — Memoizing Values**

### **Syntax:**
```javascript
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return result;
}, [dependencies]);
```

### **Example 1: Expensive Calculation**
```javascript
// ❌ WRONG — Expensive calculation on every render
function UserList({ users }) {
  // This calculation runs on every render!
  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
  const filteredUsers = users.filter(user => user.isActive);

  return (
    <div>
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// Problem:
// 1. users array is the same, but the calculation runs on every render
// 2. sort() and filter() are expensive operations (O(n log n) + O(n))
// 3. With 1000 users, that's ~1500 operations per render!
// 4. Performance issue!
```

### **Example 2: With useMemo**

```javascript
// ✅ CORRECT — Memoize the calculation
function UserList({ users }) {
  const sortedUsers = useMemo(() => {
    console.log("Sorting users...");  // Only when users change
    return users.sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);  // ← Only when users array changes

  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");  // Only when users change
    return users.filter(user => user.isActive);
  }, [users]);  // ← Only when users array changes

  return (
    <div>
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// How it works:
// 1. First render: sort() + filter() execute
// 2. Second render (if users same): Cached result used
// 3. Third render (if users same): Cached result used
// 4. When users change: sort() + filter() execute again
```

### **Example 3: Derived State**

```javascript
// ✅ CORRECT — Calculating derived state
function ShoppingCart({ items }) {
  const [quantity, setQuantity] = useState(1);

  // ❌ WRONG — Calculation on every render
  // const totalPrice = items.reduce((sum, item) => sum + (item.price * quantity), 0);

  // ✅ CORRECT — With useMemo
  const totalPrice = useMemo(() => {
    console.log("Calculating total...");
    return items.reduce((sum, item) => sum + (item.price * quantity), 0);
  }, [items, quantity]);  // ← When items OR quantity changes

  return (
    <div>
      <p>Total: ${totalPrice}</p>
      <button onClick={() => setQuantity(quantity + 1)}>Increase</button>
    </div>
  );
}
```

---

## 🔄 **useCallback — Memoizing Functions**

### **Syntax:**

```javascript
const memoizedFunction = useCallback(() => {
  // Function logic
}, [dependencies]);
```

### **Example 1: Child Component Re-render Problem**

```javascript
// ❌ WRONG — A new function is created on every render
function Parent() {
  const [count, setCount] = useState(0);

  // A NEW function is created on every render!
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />  // ← New function on every render!
    </div>
  );
}

function Child({ onClick }) {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click me</button>;
}

// Problem:
// 1. Parent renders → handleClick is a NEW function
// 2. Child receives a new function prop → Child re-renders
// 3. Parent renders again → handleClick is a NEW function
// 4. Child receives a new function prop → Child re-renders
// 5. Infinite re-renders! (if Child also setState)
```

### **Example 2: With useCallback**

```javascript
// ✅ CORRECT — Memoize the function
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ With useCallback — Function reference stays the SAME
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);  // ← Empty array — function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />  // ← Same function reference!
    </div>
  );
}

// Child with React.memo:
const Child = React.memo(({ onClick }) => {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click me</button>;
});

// How it works:
// 1. Parent renders → handleClick has SAME function reference
// 2. Child receives same function prop → Child does NOT re-render
// 3. Parent renders again → handleClick has SAME function reference
// 4. Child receives same function prop → Child does NOT re-render
// ✅ Performance optimized!
```

### **Example 3: useCallback with Dependencies**

```javascript
// ✅ CORRECT — With dependencies
function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  // ✅ useCallback — new function only when searchTerm changes
  const fetchResults = useCallback(async () => {
    const data = await searchAPI(searchTerm);
    setResults(data);
  }, [searchTerm]);  // ← When searchTerm changes

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div>
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}

// How it works:
// 1. First render: fetchResults created (searchTerm = "")
// 2. searchTerm changed: fetchResults recreated (searchTerm = "React")
// 3. searchTerm changed: fetchResults recreated (searchTerm = "Vue")
// 4. searchTerm same: fetchResults used SAME function reference
```

---

## ⚖️ **useMemo vs useCallback — What's the Difference?**

### **Comparison Table:**

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│                     │      useMemo        │    useCallback      │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ What it memoizes    │    VALUES           │    FUNCTIONS        │
│                     │   (calculation)     │   (function ref)    │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Returns             │   memoizedValue     │   memoizedFunction  │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Use case            │   Expensive         │   Function          │
│                     │   calculations      │   references        │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ Example             │   sort(), filter(), │   onClick handlers, │
│                     │   reduce()          │   API call functions│
└─────────────────────┴─────────────────────┴─────────────────────┘
```

### **Code Comparison:**

```javascript
// useMemo — Memoizes the VALUE
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);  // ← Must RETURN a value
}, [data]);

// useCallback — Memoizes the FUNCTION
const handleClick = useCallback(() => {
  heavyCalculation(data);  // ← Function logic, no return needed
}, [data]);

// They are equivalent:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

### **Real Example:**

```javascript
function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  // useMemo — CALCULATE the value
  const userStats = useMemo(() => {
    return calculateStats(user);  // ← Value returned
  }, [user]);

  // useCallback — MEMOIZE the function
  const fetchUserStats = useCallback(() => {
    const stats = calculateStats(user);  // ← Function logic
    setStats(stats);
  }, [user]);

  return (
    <div>
      <p>Stats: {JSON.stringify(userStats)}</p>
      <button onClick={fetchUserStats}>Refresh Stats</button>
    </div>
  );
}
```

---

## 🤔 **What Does "Expensive Calculation" Mean?**

### **React Doesn't Know a Calculation Is Expensive!**

```
React internally:
- Only does reference comparison (===)
- Does NOT know what calculation you're doing
- Does NOT know whether your function is expensive or cheap

It's our responsibility:
- We decide which calculations are expensive
- We decide which calculations to memoize
```

### **Which Calculations Are Expensive?**

```javascript
// ✅ Expensive Calculations (memoize these):

// 1. Array sorting (O(n log n))
const sorted = useMemo(() => {
  return items.sort((a, b) => a.value - b.value);
}, [items]);

// 2. Array filtering + mapping (O(n) + O(n))
const filtered = useMemo(() => {
  return items.filter(item => item.active).map(item => item.name);
}, [items]);

// 3. Array reducing (O(n))
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);

// 4. String operations (O(n))
const formatted = useMemo(() => {
  return items.map(item => item.name.toUpperCase()).join(", ");
}, [items]);

// 5. Complex object transformations
const transformed = useMemo(() => {
  return items.map(item => ({
    ...item,
    processed: true,
    timestamp: new Date().toISOString()
  }));
}, [items]);

// 6. API data processing
const processedData = useMemo(() => {
  return apiResponse.data.map(item => transformItem(item));
}, [apiResponse]);
```

```javascript
// ❌ Cheap Calculations (don't memoize):

// 1. Simple arithmetic
const sum = a + b;  // No need to memoize!

// 2. Simple string concatenation
const fullName = firstName + " " + lastName;  // No need to memoize!

// 3. Simple object creation
const config = { theme: "dark", lang: "en" };  // No need to memoize!

// 4. Simple array access
const firstItem = items[0];  // No need to memoize!

// 5. Simple boolean checks
const isActive = user.status === "active";  // No need to memoize!
```

### **Rule of Thumb:**

```
Memoize when:
1. The calculation is O(n) or more complex (sort, filter, reduce, map)
2. The data is large (100+ items)
3. The calculation runs on every render
4. You can see a performance issue

Don't memoize when:
1. The calculation is O(1) (simple arithmetic, string concat)
2. The data is small (< 10 items)
3. The calculation only runs occasionally
4. There's no performance issue

Remember:
- Memoization has overhead too (memory + dependency tracking)
- Using useMemo/useCallback everywhere can WORSEN performance!
```

---

## ⚠️ **When Should You Use Them, and When Not?**

### **✅ You Should Use Them:**

```javascript
// 1. Expensive calculations
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// 2. Functions passed to optimized child components
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);
return <MemoizedButton onClick={handleClick} />;

// 3. Functions in dependency arrays
const fetchData = useCallback(async () => {
  const data = await api.get();
  setData(data);
}, []);
useEffect(() => {
  fetchData();
}, [fetchData]);

// 4. Objects/Arrays passed as props
const config = useMemo(() => ({
  theme: "dark",
  language: "en"
}), []);
return <Child config={config} />;
```

### **❌ You Should Not Use Them:**

```javascript
// 1. Simple calculations
const sum = useMemo(() => a + b, [a, b]);  // ❌ Overkill!
const sum = a + b;  // ✅ Correct

// 2. Functions that never reach a child
const handleClick = useCallback(() => {  // ❌ Overkill!
  console.log("Clicked!");
}, []);
// ✅ Works fine without useCallback

// 3. New values on every render
const result = useMemo(() => {
  return Math.random();  // ❌ New value on every render!
}, []);

// 4. Where there's no performance issue
const items = useMemo(() => [1, 2, 3], []);  // ❌ Small array!
const items = [1, 2, 3];  // ✅ Correct
```

---

## 🎯 **Common Patterns — Best Practices**

### **Pattern 1: Expensive List Processing**

```javascript
// ✅ CORRECT — Processing a list
function UserList({ users, filter, sortBy }) {
  const processedUsers = useMemo(() => {
    let result = users;

    // Filter
    if (filter) {
      result = result.filter(user => user.role === filter);
    }

    // Sort
    if (sortBy) {
      result = result.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    return result;
  }, [users, filter, sortBy]);

  return (
    <div>
      {processedUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### **Pattern 2: Event Handlers with Dependencies**

```javascript
// ✅ CORRECT — Memoizing event handlers
function Form({ onSubmit, initialValues }) {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = useCallback(() => {
    onSubmit(values);
  }, [values, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### **Pattern 3: API Call Functions**

```javascript
// ✅ CORRECT — Memoizing API call functions
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    const data = await fetchUserAPI(userId);
    setUser(data);
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <div>{user?.name}</div>;
}
```

### **Pattern 4: Derived State from Props**

```javascript
// ✅ CORRECT — Calculating derived state from props
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    return product.price * quantity * (1 - product.discount);
  }, [product.price, quantity, product.discount]);

  return (
    <div>
      <p>Price: ${totalPrice}</p>
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />
    </div>
  );
}
```

---

## 🎙️ **Interview Articulation**

### **Q: "What's the difference between useMemo and useCallback?"**

**Answer:** "useMemo and useCallback are both memoization hooks, but they memoize different things:

- **useMemo** memoizes VALUES — it caches the result of expensive calculations
- **useCallback** memoizes FUNCTIONS — it caches function references

Example:
```javascript
// useMemo — returns a VALUE
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// useCallback — returns a FUNCTION
const handleClick = useCallback(() => {
  heavyCalculation(data);
}, [data]);

// Technically equivalent:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

We use useMemo when we want to cache the result of an expensive calculation. We use useCallback when we want to keep a function reference stable (for example, when passing it to child components)."

### **Q: "What does 'expensive calculation' mean? Does React know a calculation is expensive?"**

**Answer:** "React does NOT know internally whether a calculation is expensive. React only does reference comparison (`===`); it doesn't look at calculation complexity. It's our responsibility to decide which calculations are expensive.

Expensive calculations include:
- Array sorting (O(n log n))
- Array filtering + mapping (O(n) + O(n))
- Array reducing (O(n))
- Complex object transformations
- String operations on large data

Cheap calculations include:
- Simple arithmetic (a + b)
- Simple string concatenation
- Simple object/array access

React has to be told manually which calculations to memoize. That's why we use useMemo/useCallback."

### **Q: "When should you use useMemo/useCallback, and when not?"**

**Answer:** "You should use useMemo/useCallback when:

1. **Expensive calculations** — sort(), filter(), reduce(), map() on large data
2. **Functions passed to optimized child components** — with React.memo
3. **Functions in dependency arrays** — inside useEffect
4. **Objects/Arrays passed as props** — so child components don't re-render

You should NOT use them when:

1. **Simple calculations** — a + b, string concat
2. **Functions that never reach a child**
3. **New values on every render** — Math.random()
4. **Where there's no performance issue**

Remember: Memoization has overhead too (memory + dependency tracking). Using it everywhere can WORSEN performance. Use it only where there's an actual performance benefit."

### **Q: "Why is useCallback necessary? Can we just use useMemo?"**

**Answer:** "useCallback is necessary because functions are recreated on every render. If you pass a function to a child component, the child re-renders every time because it receives a new function reference.

useCallback caches the function reference so the child component receives the same reference and doesn't re-render.

Technically, you could use useMemo:
```javascript
// useCallback:
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);

// Equivalent with useMemo:
const handleClick = useMemo(() => () => {
  console.log("Clicked!");
}, []);
```

But useCallback is more readable and specifically designed for functions. So useCallback is better for functions."

---

## 📝 **Quick Reference**

### **useMemo vs useCallback:**

```javascript
// useMemo — Memoizes the VALUE
const value = useMemo(() => calculation(), [deps]);

// useCallback — Memoizes the FUNCTION
const fn = useCallback(() => { /* logic */ }, [deps]);

// Equivalent:
// useCallback(fn, deps) === useMemo(() => fn, deps)
```

### **When to Use:**

```
✅ USE:
- Expensive calculations (sort, filter, reduce, map)
- Functions passed to React.memo child components
- Functions in dependency arrays
- Objects/Arrays passed as props

❌ DON'T USE:
- Simple calculations (a + b)
- Functions that don't reach a child
- New values on every render
- Where there's no performance issue
```

### **Expensive Calculations:**

```javascript
// ✅ Memoize:
- items.sort()
- items.filter()
- items.reduce()
- items.map()
- Complex object transformations
- API data processing

// ❌ Don't memoize:
- a + b
- firstName + " " + lastName
- items[0]
- user.status === "active"
```

### **Best Practices:**

```
1. Profile first, then optimize
2. Memoization has overhead too
3. Use it only where there's an actual benefit
4. Define the dependencies array correctly
5. Avoid stale closures (pass correct dependencies)
```

---

> **Pro Tip:** When discussing useMemo/useCallback in an interview, always mention that **"React doesn't know internally"**. This demonstrates that you don't just use hooks — you understand their internal workings too! 🎯

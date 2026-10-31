# ⚛️ Phase 2: Topic 12 - React.memo

> **Interview Question:** "What's the difference between React.memo and useMemo? How does component-level memoization work? When should you use React.memo, and when not?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"React.memo is used for component-level memoization, and it's different from useMemo because useMemo memoizes values, while React.memo memoizes the entire component. Both are purely for performance optimization — you don't need to use them everywhere."**

### **Most Important Thing — Why Do They Matter?**

```
On every render in React:
1. The component function executes again
2. All child components re-render
3. All props are re-evaluated

Problem:
- Expensive components re-render on every render (performance issue)
- Child components re-render unnecessarily (performance issue)
- Props are the same, but components still re-render

Solution:
- React.memo → Cache components
- useMemo → Cache values
- useCallback → Cache functions

But React doesn't know any of this internally — you have to tell it manually!
```

---

## 💡 **Beginner-Friendly Explanation**

### 🎨 **React.memo = Avoiding an Expensive Painting**

```
Imagine you're making an expensive painting:

❌ **Without React.memo:**
   - Make a new painting every time
   - Day 1: Made an expensive painting (₹5000)
   - Day 2: Made an expensive painting (₹5000) — SAME painting!
   - Day 3: Made an expensive painting (₹5000) — SAME painting!
   - Wasted money!

✅ **With React.memo:**
   - First time: Make the expensive painting → remember it
   - Second time: Show the same old painting (no new painting)
   - Third time: Show the same old painting (no new painting)
   - Money saved!

But remember:
- Only remember it when the colors change
- If the colors change, make a new painting
```

### 📦 **useMemo vs React.memo — What's the Difference?**

```
useMemo = Remembering the Calculator's Result
React.memo = Avoiding an Expensive Painting

useMemo: "This calculation is expensive, remember the result"
React.memo: "This component is expensive, avoid re-rendering"
```

---

## 🔄 **React.memo — Memoizing Components**

### **Syntax:**

```javascript
const MemoizedComponent = React.memo(Component, areEqual);
```

### **Example 1: Simple React.memo Usage**

```javascript
// ❌ WRONG — Expensive component re-renders on every render
function Parent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState
```

---

> Note: The source file ends here.
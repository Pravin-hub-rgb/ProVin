# ⚛️ Phase 2: Topic 8 - Rules of Hooks & Fiber Architecture

> **Interview Question:** "Why must Hooks be called at top-level? Why not inside loops/conditions? How does React's internal linked-list system work?"

---

## 🚨 **The Golden Rule — Understand This First!**

> **"Always call Hooks at the top level — never call them inside loops, conditions, or nested functions."**

### **Most Important Point — Why?**

```
React must know BEFORE EVERY RENDER:
- How many hooks are there?
- Which hooks are there?
- Which hook is where?

Why? Because React needs to:
1. Create hooks on first render
2. Reuse the same hooks on subsequent renders

If hook count or order changes:
- React matches state to wrong hook
- State goes to wrong place
- Bug becomes hard to fix

That's why React needs THE SAME HOOKS, IN SAME ORDER, on EVERY RENDER!
```

---

## 💡 **Beginner-Friendly Explanation**

### 🎒 **Hooks — Backpack System**

```
Imagine you have a backpack where you keep items:

Render 1:
┌─────────────────────────────────────┐
│ Backpack (State)                    │
│ 1. useState → [count, setCount]     │
│ 2. useState → [name, setName]       │
│ 3. useEffect → (effect function)    │
└─────────────────────────────────────┘

React knows:
- First item = count state
- Second item = name state
- Third item = effect

If you call hook inside a condition:
- React gets confused
- "Which item is which?" unknown
- State matches to wrong hook!
```

### 🔗 **Linked-List — Chain System**

```
React hooks are connected like a chain (linked-list):

┌──────────┐    ┌──────────┐    ┌──────────┐
│ Hook 1   │───▶│ Hook 2   │───▶│ Hook 3   │
│ useState │    │ useState │    │ useEffect│
└──────────┘    └──────────┘    └──────────┘
   (count)         (name)        (effect)

Every render:
- React traverses hooks in same order
- If order changes → chain breaks!
- State matches to wrong place!
```

---

## 🤔 **What Does "Call" Mean? — Important Clarification**

```
When we say "calling a hook", we mean:

const [count, setCount] = useState(0);  // ← This IS "calling"

Here `useState(0)` is a function call.
When React component renders:
1. Component function executes (top to bottom)
2. Each line executes
3. When `useState()` comes, it gets CALLED (executed)

"Call" = Execute a function
"Define" = Declare a variable

Here both happen:
- `useState(0)` is CALLED (function executes)
- `count` and `setCount` are DEFINED (variables declared)

Problem occurs when `useState()` is NOT called at all!
```

---

## ⚠️ **Hook Inside Condition — Exact Problem**

```javascript
function Counter({ showCount }) {
  const [count, setCount] = useState(0);  // Hook 1 - ALWAYS called

  if (showCount) {
    const [name, setName] = useState('');  // Hook 2 - called ONLY when showCount = true
  }

  const [age, setAge] = useState(0);  // Hook 2 or 3?
}

// RENDER 1: showCount = true
// Line 1 executes: useState(0) CALLED → Hook 1 (count)
// Line 2 executes: if (true) → ENTERED
// Line 3 executes: useState('') CALLED → Hook 2 (name)
// Line 4 executes: useState(0) CALLED → Hook 3 (age)
// Result: count=Hook1, name=Hook2, age=Hook3 ✅

// RENDER 2: showCount = false
// Line 1 executes: useState(0) CALLED → Hook 1 (count)
// Line 2 executes: if (false) → NOT ENTERED
// Line 3 executes: useState(0) CALLED → Hook 2 (age) ← PROBLEM!
// Result: count=Hook1, age=Hook2 ❌

// React thinks: "Hook 2 was name, now how is it age?"
// State mismatch! name's state went to age!
```

**Reason:** Code inside condition **doesn't execute** when condition is false. So `useState()` is **not called**. React doesn't even know there was a hook there.

---

## ⚠️ **Hook Inside Loop — Exact Problem**

```javascript
function List({ items }) {
  const [count, setCount] = useState(0);  // Hook 1 - ALWAYS called once

  for (let i = 0; i < items.length; i++) {
    const [item, setItem] = useState('');  // Hook 2 - called items.length TIMES!
  }
}

// RENDER 1: items = ['a', 'b', 'c'] (length = 3)
// Line 1 executes: useState(0) CALLED → Hook 1 (count)
// Loop executes:
//   i=0: useState('') CALLED → Hook 2
//   i=1: useState('') CALLED → Hook 3
//   i=2: useState('') CALLED → Hook 4
// Total: 4 hooks ✅

// RENDER 2: items = ['a', 'b', 'c', 'd', 'e'] (length = 5)
// Line 1 executes: useState(0) CALLED → Hook 1 (count)
// Loop executes:
//   i=0: useState('') CALLED → Hook 2
//   i=1: useState('') CALLED → Hook 3
//   i=2: useState('') CALLED → Hook 4
//   i=3: useState('') CALLED → Hook 5 ← NEW!
//   i=4: useState('') CALLED → Hook 6 ← NEW!
// Total: 6 hooks ❌

// React thinks: "There were 4 hooks before, now how are there 6?"
// Old hooks' state mismatches with new hooks!
```

**Reason:** Hook inside loop gets **called multiple times**. A new hook is added in every iteration. If items length changes, hook count changes too.

---

## 🔄 **Why Top-Level Only? — The Technical Reason**

### **React's Internal System:**

```javascript
// React internally stores hooks:
const fiberNode = {
  memoizedState: null,  // Linked-list head

  // Linked-list structure:
  // {
  //   memoizedState: hook1,
  //   next: {
  //     memoizedState: hook2,
  //     next: {
  //       memoizedState: hook3,
  //       next: null
  //     }
  //   }
  // }
};
```

### **How React Tracks Hooks:**

```javascript
// React internally:
let currentHook = null;
let hookIndex = 0;

function useState(initialValue) {
  // React finds hook from current index
  const hook = getCurrentHook(hookIndex);

  // If hook not found (first render), create it
  if (!hook) {
    const newHook = {
      memoizedState: initialValue,
      queue: [],
      next: null
    };
    // Add to linked-list
    addHook(newHook);
    return [newHook.memoizedState, setState];
  }

  // If hook found (subsequent renders), use it
  hookIndex++;  // Move to next hook
  return [hook.memoizedState, setState];
}
```

---

## ❌ **Wrong Examples — Never Do These**

### **Example 1: Hook Inside Condition**

```javascript
// ❌ WRONG — Hook inside condition
function Counter({ showCount }) {
  const [count, setCount] = useState(0);  // Hook 1

  if (showCount) {
    const [name, setName] = useState('');  // ❌ Hook 2 (sometimes called)
  }

  const [age, setAge] = useState(0);  // Hook 2 or 3? Confusion!

  return <div>{count}</div>;
}

// Problem:
// Render 1 (showCount = true):
//   Hook 1: count
//   Hook 2: name (inside condition)
//   Hook 3: age
//
// Render 2 (showCount = false):
//   Hook 1: count
//   Hook 2: age (because name hook wasn't called!)
//   ❌ State mismatch!
```

### **Example 2: Hook Inside Loop**

```javascript
// ❌ WRONG — Hook inside loop
function List({ items }) {
  const [count, setCount] = useState(0);

  for (let i = 0; i < items.length; i++) {
    const [itemState, setItemState] = useState('');  // ❌ New hook in every iteration!
  }

  return <div>{count}</div>;
}

// Problem:
// If items.length = 3:
//   Hook 1: count
//   Hook 2: itemState (i=0)
//   Hook 3: itemState (i=1)
//   Hook 4: itemState (i=2)
//
// Next render (items.length = 5):
//   Hook 1: count
//   Hook 2: itemState (i=0)
//   Hook 3: itemState (i=1)
//   Hook 4: itemState (i=2)
//   Hook 5: itemState (i=3)  ← New hook!
//   Hook 6: itemState (i=4)  ← New hook!
//   ❌ State mismatch!
```

### **Example 3: Hook Inside Nested Function**

```javascript
// ❌ WRONG — Hook inside nested function
function Form() {
  const [count, setCount] = useState(0);

  const handleSubmit = () => {
    const [name, setName] = useState('');  // ❌ Inside nested function!
  };

  return <form onSubmit={handleSubmit}>{count}</form>;
}

// Problem:
// Render 1: Hook 1: count (handleSubmit not called, so name hook not called)
// Render 2: Hook 1: count (now handleSubmit called, so name hook called)
// ❌ Hook order changed!
```

---

## ✅ **Right Examples — Always Do These**

### **Example 1: Hook at Top-Level**

```javascript
// ✅ RIGHT — All hooks at top-level
function Counter({ showCount }) {
  const [count, setCount] = useState(0);  // Hook 1
  const [name, setName] = useState('');   // Hook 2
  const [age, setAge] = useState(0);      // Hook 3

  // Use state inside condition, not hook
  const displayName = showCount ? name : 'Hidden';

  return <div>{count} - {displayName}</div>;
}

// Every render same order:
// Hook 1: count
// Hook 2: name
// Hook 3: age
// ✅ Consistent!
```

### **Example 2: Conditional Hook Usage (Custom Hook)**

```javascript
// ✅ RIGHT — Condition inside custom hook, but hook at top-level
function useConditionalEffect(condition, effect) {
  // Hook at top-level
  useEffect(() => {
    // Run effect inside condition
    if (condition) {
      effect();
    }
  }, [condition, effect]);  // Dependencies
}

// Usage:
function Component({ showNotification }) {
  useConditionalEffect(showNotification, () => {
    alert('Notification!');
  });

  return <div>...</div>;
}

// Hook called at top-level, condition only in logic
// ✅ Consistent!
```

### **Example 3: Dynamic Hooks (useMemo/useCallback)**

```javascript
// ✅ RIGHT — useMemo/useCallback for dynamic values
function List({ items }) {
  const [count, setCount] = useState(0);

  // useMemo at top-level, dynamic calculation
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }));
  }, [items]);

  return <div>{count}</div>;
}

// Hook at top-level, calculation dynamic
// ✅ Consistent!
```

---

## 🔧 **Fiber Architecture — React's Internal System**

### **Why Are We Talking About Fiber Here?**

```
First we understood why hooks must be at top-level.
Now the question is — how does React internally track hooks?

Answer: **Fiber Architecture**

React creates a Fiber node for each component,
and stores hooks' linked-list inside that Fiber node.

So to understand hooks, you must understand Fiber.
```

### **What Is Fiber? — The Complete Picture**

```
Fiber is React 16+ internal data structure that:

1. **Represents Component Tree**
   - One Fiber node per component
   - Maintains parent-child relationships
   - Links sibling components

2. **Stores Hooks**
   - `memoizedState` property holds hooks' linked-list
   - useState, useEffect, etc. all stored here
   - Same hooks accessed on every render

3. **Performs Reconciliation (Diffing)**
   - Compares previous render vs current render
   - Stores two versions in `alternate` property
   - Decides what changed, what to update

4. **Priority-Based Rendering**
   - Tracks priority via `lanes` property
   - Important updates (user interaction) first
   - Less important updates (data fetching) later
```

### **Fiber Analogy — Restaurant Management**

```
🍽️ **Restaurant Scenario:**

🏗️ **Component Tree = Restaurant Layout**
   - Kitchen, dining area, counter (components)
   - Who sits where (component hierarchy)

📋 **Fiber = Order Ticket for Each Table**
   - Table number (component type)
   - Order details (props)
   - Special requests (state/hooks)
   - Order status (rendered, pending, updated)

🔄 **Reconciliation = Kitchen Process**
   - What was ordered before? (previous render)
   - What's ordered now? (current render)
   - What changed? (new items, removed items)
   - What to cook? (re-render)

⚡ **Priority-Based Rendering = Waiter's Job**
   - VIP customer → High priority (serve immediately)
   - Regular customer → Normal priority (serve later)
   - Takeaway order → Low priority (serve last)
```

### **Fiber Node Structure — Detailed Explanation**

```javascript
// React creates a Fiber node for each component internally:
const fiberNode = {
  // ==================== COMPONENT INFO ====================
  type: 'function',           // Component type (function/class/HostComponent)
  elementType: Counter,       // Component function reference
  key: null,                  // React key (used in lists)

  // ==================== STATE & EFFECTS ====================
  memoizedState: null,        // Linked-list head (hooks stored here)
  memoizedProps: null,        // Last rendered props (for comparison)
  stateNode: null,            // Class component instance or DOM element

  // ==================== TREE STRUCTURE ====================
  return: null,               // Parent fiber (component above)
  child: null,                // First child fiber (first child component)
  sibling: null,              // Next sibling fiber (next sibling component)

  // ==================== RECONCILIATION ====================
  pendingProps: null,         // New props (just arrived)
  alternate: null,            // Work-in-progress vs current (two versions)
                              // React maintains two trees:
                              // - Current tree (showing on screen)
                              // - Work-in-progress tree (next render)

  // ==================== PRIORITY ====================
  lanes: null,                // Priority lanes (which work has priority)
  childLanes: null,           // Children's priority

  // ==================== SIDE EFFECTS ====================
  flags: null,                // What changes? (placement, update, deletion)
  subtreeFlags: null,         // Children's changes
  deletions: null,            // Which children will be deleted
};
```

### **Why Fiber? — Problem & Solution**

```
❌ **Old System (Stack Reconciler - React 15 and before):**

   Problem:
   - React rendered entire component tree at once
   - Render was synchronous — once started, couldn't stop until complete
   - If tree was large (1000+ components), UI froze
   - User interaction couldn't be handled
   - Example: Rendering 1000 components, user clicks → freeze!

   Technical Issue:
   - Depended on JavaScript call stack recursion
   - Can't pause/resume recursion
   - Once render started → must complete

✅ **New System (Fiber Reconciler - React 16+):**

   Solution:
   - React renders in small chunks (incremental rendering)
   - Traverses Fiber nodes like linked-list
   - Can pause/resume in between
   - Can handle user interaction
   - Important updates processed first

   Technical Implementation:
   - Linked-list structure (no need for recursion)
   - `alternate` property maintains two trees
   - Work loop provides pause/resume capability
   - `lanes` property manages priority
```

### **Fiber's Work Loop — How React Renders**

```javascript
// React's rendering process happens in two phases:

// ==================== PHASE 1: RENDER PHASE ====================
// (Can be paused, resumed, and deprioritized)

// 1. React starts work loop
while (thereIsWork) {
  // 2. Pick next priority work
  const nextUnit = getNextUnitOfWork();

  // 3. Check — is there higher priority work?
  if (higherPriorityWork) {
    // 4. Pause current work, go to higher priority
    yield; // Pause here!
    continue;
  }

  // 5. Process current unit
  const completed = performUnitOfWork(nextUnit);

  // 6. Decide next unit
  scheduleWork(completed);
}

// ==================== PHASE 2: COMMIT PHASE ====================
// (Cannot be interrupted — must complete)

// 1. Render phase complete
// 2. Now apply DOM updates
commitRoot();

// Example Scenario:
// User clicked → High priority update
// Data fetch completed → Low priority update
// React first handles click (pauses render phase)
// Then updates data (resumes later)
```

### **Fiber and Hooks — The Connection**

```javascript
// How hooks are stored inside Fiber node:
fiberNode.memoizedState = {
  // Hook 1: useState
  memoizedState: 0,           // State value (count)
  baseState: 0,               // Base state (before update queue)
  queue: null,                // Update queue (setState calls)
  next: {                     // Next node in linked-list

    // Hook 2: useState
    memoizedState: '',        // State value (name)
    baseState: '',
    queue: null,
    next: {

      // Hook 3: useEffect
      memoizedState: {        // Effect object
        create: () => { /* ... */ },
        destroy: undefined,
        deps: []
      },
      baseState: null,
      queue: null,
      next: null              // End of list
    }
  }
};

// Every render:
// 1. React starts from first hook
// 2. Traverses linked-list
// 3. Updates state of each hook
// 4. Moves to next hook (hookIndex++)
// 5. Stops at end
```

---

## 🎯 **Rules of Hooks — Complete List**

### **Rule 1: Only Call Hooks at the Top Level**

```javascript
// ✅ RIGHT
function Component() {
  const [state, setState] = useState(0);  // Top-level
  useEffect(() => { /* ... */ });         // Top-level
  return <div>{state}</div>;
}

// ❌ WRONG
function Component() {
  if (condition) {
    const [state, setState] = useState(0);  // ❌ Inside condition
  }
  return <div>{state}</div>;
}
```

### **Rule 2: Only Call Hooks from React Functions**

```javascript
// ✅ RIGHT
function Component() {
  const [state, setState] = useState(0);  // React function
  return <div>{state}</div>;
}

// ✅ RIGHT (Custom Hook)
function useCustomHook() {
  const [state, setState] = useState(0);  // Custom hook (starts with "use")
  return state;
}

// ❌ WRONG
function regularFunction() {
  const [state, setState] = useState(0);  // ❌ Regular JavaScript function
  return state;
}
```

---

## 🎙️ **Interview Articulation**

### **Q: "Why must Hooks be at top-level? Why not inside loops/conditions?"**

**Answer:** "React stores hooks in a **linked-list**. On every render, React traverses hooks in the same order. If you call a hook inside a condition or loop, the order changes — React gets confused about which state matches which hook.

Example:
- Render 1: Hook 1 (count), Hook 2 (name - inside condition), Hook 3 (age)
- Render 2: Hook 1 (count), Hook 2 (age - because name hook wasn't called!)
- ❌ State mismatch!

That's why hooks must always be called at top-level — so the same order is maintained on every render."

### **Q: "How does React's internal linked-list system work?"**

**Answer:** "React internally creates a **Fiber node** for each component. The Fiber node has a `memoizedState` property that is the head of hooks' linked-list.

When you call a hook:
1. React traverses the linked-list from current index
2. If hook not found (first render), creates new hook and adds to linked-list
3. If hook found (subsequent renders), uses existing hook
4. Hook index increments, moves to next hook

That's why order must be maintained — if order changes, React matches state to wrong hook."

### **Q: "What is Fiber architecture?"**

**Answer:** "Fiber is React's internal data structure that:
1. **Represents component tree** (parent-child-sibling relationships)
2. **Stores hooks** (linked-list in `memoizedState` property)
3. **Performs reconciliation** (`alternate` property compares previous vs current)
4. **Priority-based rendering** (`lanes` property tracks priority)

Fiber architecture allows React to:
- **Incremental rendering** — render in small chunks (pause/resume capability)
- **Priority-based updates** — important updates first (user interaction > data fetching)
- **Concurrent mode** — manage multiple updates together

Example:
- User clicked → High priority → React pauses render to handle click
- Data fetch completed → Low priority → React updates later"

### **Q: "What to keep in mind when creating custom hooks?"**

**Answer:** "When creating custom hooks:
1. **Name must start with 'use'** — so React knows it's a hook
2. **Call hooks at top-level** — same rules apply inside custom hooks
3. **Provide correct dependencies array** — in `useEffect`, `useMemo`, `useCallback`
4. **Encapsulate state** — manage state inside custom hook
5. **Structure return values properly** — return object or array

Example:
```javascript
function useCounter(initialValue = 0) {
  // Hooks at top-level
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Properly structured return
  return {
    count,
    increment,
    decrement
  };
}
```"

---

## 📝 **Quick Reference**

### **Rules of Hooks:**

```
✅ DO:
- Call hooks at top level
- Call from React functions or custom hooks
- Maintain same order on every render

❌ DON'T:
- Call inside loops
- Call inside conditions
- Call inside nested functions
- Call inside regular JavaScript functions
```

### **Fiber Node Key Properties:**

```
Fiber Node:
- type: Component type
- memoizedState: Hooks linked-list
- return: Parent
- child: First child
- sibling: Next sibling
- pendingProps: New props
- memoizedProps: Old props
- alternate: WIP vs current
- lanes: Priority
```

### **Hooks Linked-List:**

```
memoizedState:
├─ Hook 1: useState (count)
│  ├─ memoizedState: 0
│  ├─ queue: []
│  └─ next: Hook 2
│
├─ Hook 2: useState (name)
│  ├─ memoizedState: ''
│  ├─ queue: []
│  └─ next: Hook 3
│
└─ Hook 3: useEffect
   ├─ memoizedState: { effect }
   ├─ queue: null
   └─ next: null
```

### **Fiber Benefits:**

```
✅ Incremental Rendering — render in small chunks
✅ Priority-Based Updates — important work first
✅ Concurrent Mode — manage multiple updates
✅ Pause/Resume — handle user interaction in between
```

---

> **Pro Tip:** When discussing hooks in an interview, always mention **linked-list**. This demonstrates that you don't just use hooks, you understand their internal implementation too! 🎯

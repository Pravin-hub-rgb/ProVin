# ✅ React 19 Warning: setState inside useEffect

This is brand new. Almost no one knows about this.

---

## 🚨 Imagine this:

You are eating dinner.

✅ You take 1 bite.
✅ Then immediately stand up and walk away.
✅ Then come back and sit down again.
✅ Then take 1 bite.
✅ Then stand up again.
✅ Then sit down again.

✅ This works. But it is stupid.

This is exactly what you are doing.

---

## 🔍 What you are doing:

```tsx
useEffect(() => {
  setActiveTab(savedTab)
}, [])
```

✅ This is what happens:

1.  React says: "Okay lets render this page."
2.  You render everything with Dashboard.
3.  React says: "Good. Done."
4.  You tap React on the shoulder: "Wait actually make it Coding."
5.  React throws everything away and renders everything AGAIN.

✅ You just made React do **twice the work for no reason**.

This is a **CASCADING RENDER**.

---

## 💡 React 19 is not mad. It is just disappointed.

React is saying:
> **"Dude. Just tell me before we start eating. Don't make me stand up and sit down again."**

---

## 🎯 The Correct Fix

✅ Tell React: "This update is not urgent. You can finish eating first."

```tsx
useEffect(() => {
  const saved = localStorage.getItem('activeTab') as Tab

  if (saved) {
    // ✅ Tell React this can wait. Don't drop everything.
    startTransition(() => {
      setActiveTab(saved)
    })
  }
}, [])
```

That is it. That is the whole fix. One extra function.

---

## ✅ That is all.

You don't need useDeferredValue. You don't need any other magic.

Just wrap `setState()` inside `startTransition()` inside useEffect.

That makes the warning go away. That makes React happy. That makes everything fast.

---

## 📚 The only rule you need to remember:

✅ **If you call setState inside useEffect → always wrap it in startTransition().**

That is it. Nothing else.

This is the entire new rule in React 19.
# React Dumb Component Pattern - Navbar Example

This is the single most important, most commonly used pattern in all of React. Once you understand this you will never be confused again.

---

## ✅ What you are looking at

This navbar is 100% perfect. This is exactly how every React component should be written.

```
✅ Navbar has NO state
✅ Navbar has NO logic
✅ Navbar makes NO decisions
✅ Navbar does NOT control anything
```

It is a **dumb presentation component**. It just draws what it is told to draw and tells you when things happen.

---

## 🎯 Full Exact Data Flow

### 🔹 Step 1: Parent (page.tsx) holds all state

```tsx
// page.tsx is the source of truth
const [activeTab, setActiveTab] = useState<Tab>("Dashboard")
```

Parent gives navbar **two things**:
- Current active tab value
- A function to call when user clicks something

```tsx
<Navbar 
  activeTab={activeTab} 
  onTabChange={setActiveTab} 
/>
```

---

### 🔹 Step 2: Navbar receives props

Navbar has **zero idea** what `onTabChange` actually does. It just knows it is a function it should call when buttons are pressed.

```tsx
export function Navbar({ activeTab, onTabChange }: NavbarProps) {
```

Navbar just loops over strings and renders buttons:
```tsx
const tabs: Tab[] = ["Dashboard", "Coding", "Trading"]
```

---

### 🔹 Step 3: User clicks button

When you click "Coding":
```tsx
onClick={() => onTabChange(tab)}
```

✅ Navbar calls: `onTabChange("Coding")`

✅ Navbar does NOT know what happens next. It's done. It forgets about it immediately.

---

### 🔹 Step 4: Parent updates state

Because parent **handed `setActiveTab` to navbar**:
```tsx
onTabChange={setActiveTab}
```

When navbar calls `onTabChange("Coding")` it is **LITERALLY CALLING `setActiveTab("Coding")`**

---

### 🔹 Step 5: Parent tells navbar what to show

State updates, entire app re-renders:
```tsx
activeTab = "Coding"
```

New value is passed back down to navbar:
```tsx
<Navbar activeTab="Coding" onTabChange={setActiveTab} />
```

---

### 🔹 Step 6: Navbar shows active state

Navbar just compares:
```tsx
${activeTab === tab 
  ? "blue active style" 
  : "normal style"
}
```

Navbar highlights the Coding button.

---

## 🎯 This is React

| TV Remote Analogy |
|---|
| 📺 TV = Parent component (page.tsx) |
| 🎮 Remote = Navbar |
| ✅ Remote never changes the channel |
| ✅ Remote just sends signal: "Button 5 pressed" |
| ✅ TV changes channel |
| ✅ TV sends signal back: "Now on channel 5" |
| ✅ Remote lights up button 5 |

---

## ✅ The most important rule

**The child never owns the state. It just borrows it.**

Navbar is just a remote control. It has buttons. It tells you when someone pressed them. It shows you what light to turn on.

That is all it does. That is all it should ever do.

This is how 90% of all components in good React codebases are written. This pattern is everything.
import type { ReactScenario } from "../types"

export const CONDITIONAL_LAB: ReactScenario = {
  id: "1.7-conditional",
  title: "1.7: Conditional Rendering aur Filter",
  description: "Practice conditional rendering with toggle and filter patterns",
  instructions: `## Task Toggle & Filter

Extend the To-Do app with task completion and filtering.

### Requirements:
1. Add \`completed: boolean\` to the \`Task\` type
2. Each task gets a checkbox — checked = completed
3. Complete tasks show with line-through style
4. Add filter buttons: **All** | **Active** | **Completed**
5. Show task count: "X items left"

### Hints:
- Toggle: \`.map()\` + spread: \`{...task, completed: !task.completed}\`
- Filter: \`.filter()\` based on current filter state
- Union type for filter: \`"all" | "active" | "completed"\`
  `,

  hints: [
    "Toggle: `.map()` + spread: `{...task, completed: !task.completed}`",
    "Filter: `.filter()` based on current filter state",
    "Union type for filter: `\"all\" | \"active\" | \"completed\"`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

// TODO: Add completed to Task type
interface Task {
  id: number;
  text: string;
}

type FilterStatus = "all" | "active" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const addTask = () => {
    if (input.trim() === "") return;
    // TODO: Set completed: false
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // TODO: Add toggleTask function

  // TODO: Filter tasks based on current filter

  return (
    <div>
      <h1>To-Do App</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a task..." />
        <button onClick={addTask}>Add</button>
      </div>
      {/* TODO: Add filter buttons (All / Active / Completed) */}
      {/* TODO: Render filtered tasks with checkbox + text + delete */}
      {/* TODO: Show task count */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #f0f2f5;
}
input { padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; }
button {
  padding: 0.4rem 0.8rem; font-size: 0.85rem; border: none; border-radius: 6px;
  cursor: pointer; background: #4a90d9; color: white; margin: 0.25rem;
}
.task-row {
  display: flex; align-items: center; gap: 0.5rem;
  background: white; padding: 0.6rem 1rem; border-radius: 8px;
  margin-bottom: 0.4rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.filters { margin: 1rem 0; }
.filters button.active { background: #2c5f8a; }`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterStatus = "all" | "active" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div>
      <h1>To-Do App</h1>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a task..." />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filters">
        {(["all", "active", "completed"] as FilterStatus[]).map((f) => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filteredTasks.length === 0 ? (
        <p style={{ color: "#888" }}>No tasks.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-row">
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
            <span style={{ textDecoration: task.completed ? "line-through" : "none", opacity: task.completed ? 0.6 : 1, flex: 1 }}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ background: "#e74c3c" }}>Delete</button>
          </div>
        ))
      )}
      <p style={{ color: "#888", marginTop: "1rem" }}>
        {tasks.filter((t) => !t.completed).length} / {tasks.length} items left
      </p>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #f0f2f5;
}
input { padding: 0.5rem; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; }
button {
  padding: 0.4rem 0.8rem; font-size: 0.85rem; border: none; border-radius: 6px;
  cursor: pointer; background: #4a90d9; color: white; margin: 0.25rem;
}
.task-row {
  display: flex; align-items: center; gap: 0.5rem;
  background: white; padding: 0.6rem 1rem; border-radius: 8px;
  margin-bottom: 0.4rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.filters { margin: 1rem 0; }
.filters button.active { background: #2c5f8a; }`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "completed: boolean in Task type", passed: /completed\s*[:?]\s*boolean/.test(app) },
      { label: "Checkbox for toggle", passed: /<input[^>]*type\s*=\s*["']checkbox["']/.test(app) || /toggleTask/.test(app) },
      { label: "Line-through for completed tasks", passed: /line-through/.test(app) },
      { label: "Filter buttons (All / Active / Completed)", passed: /filter/.test(app) && /("all"|'all')/.test(app) && /("active"|'active')/.test(app) && /("completed"|'completed')/.test(app) },
      { label: "Task count shown", passed: /(items left|count|length)/.test(app) && /\{[\s\S]*\.(length|filter)/.test(app) },
      { label: "Spread operator for toggle", passed: /\.\.\.task|\.\.\.t/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

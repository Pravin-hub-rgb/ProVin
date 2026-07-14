import type { ReactScenario } from "../types"

export const TODO_POLISH_LAB: ReactScenario = {
  id: "1.11-todo-polish",
  title: "1.11: To-Do App Complete Polish",
  description: "Build the complete polished To-Do app with all features",
  instructions: `## Complete To-Do App

Build a fully functional To-Do app with all features from the batch.

### Requirements:
1. Task type with: \`id\`, \`text\`, \`completed\`
2. Add task (with input validation — no empty tasks)
3. Toggle complete (checkbox)
4. Delete task
5. Filter: All / Active / Completed
6. "X items left" counter
7. "Clear Completed" button — removes all completed tasks
8. Show "No tasks yet" when empty

### Structure:
You can put everything in \`App.tsx\` or split into components:
- \`TaskInput\` — input + add button
- \`TaskItem\` — single task with checkbox + text + delete
- \`TaskList\` — renders filtered tasks
- \`FilterBar\` — filter buttons

This combines everything you learned in Batch 1.
  `,

  hints: [
    "Split UI into components: TaskInput, TaskItem, TaskList, FilterBar",
    "Clear Completed: `tasks.filter(t => !t.completed)`",
    "Use `onKeyDown` on input to add task on Enter key press",
  ],

  starterFiles: {
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

  // TODO: Add task
  // TODO: Delete task
  // TODO: Toggle task
  // TODO: Clear completed
  // TODO: Filter logic

  return (
    <div className="todo-app">
      <h1>✓ To-Do App</h1>
      {/* Task Input */}
      {/* Filter Bar */}
      {/* Task List */}
      {/* Footer with count + Clear Completed */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
}
.todo-app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}
h1 { margin-top: 0; color: #333; font-size: 1.5rem; }
input {
  padding: 0.6rem; font-size: 0.95rem; border: 1px solid #ddd;
  border-radius: 6px; flex: 1; width: 100%; box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem; font-size: 0.85rem; border: none;
  border-radius: 6px; cursor: pointer; background: #667eea; color: white;
}
button:hover { opacity: 0.9; }
.task-row {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 0; border-bottom: 1px solid #eee;
}`,
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

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="todo-app">
      <h1>✓ To-Do App</h1>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task..." />
        <button onClick={addTask}>Add</button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {(["all", "active", "completed"] as FilterStatus[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ background: filter === f ? "#667eea" : "#ccc", flex: 1 }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {filteredTasks.length === 0 ? (
        <p style={{ color: "#999", textAlign: "center" }}>No tasks to show.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="task-row">
            <input type="checkbox" checked={task.completed}
              onChange={() => toggleTask(task.id)} />
            <span style={{
              flex: 1,
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.5 : 1,
              color: task.completed ? "#999" : "#333"
            }}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}
              style={{ background: "#e74c3c", padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>✕</button>
          </div>
        ))
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", color: "#888", fontSize: "0.85rem" }}>
        <span>{activeCount} / {tasks.length} items left</span>
        {tasks.some((t) => t.completed) && (
          <button onClick={clearCompleted} style={{ background: "transparent", color: "#e74c3c", padding: 0, fontSize: "0.85rem" }}>
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
}
.todo-app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}
h1 { margin-top: 0; color: #333; font-size: 1.5rem; }
input {
  padding: 0.6rem; font-size: 0.95rem; border: 1px solid #ddd;
  border-radius: 6px; flex: 1; width: 100%; box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem; font-size: 0.85rem; border: none;
  border-radius: 6px; cursor: pointer; background: #667eea; color: white;
}
button:hover { opacity: 0.9; }
.task-row {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 0; border-bottom: 1px solid #eee;
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Task interface with completed", passed: /interface\s+Task\s*\{[\s\S]*id[\s\S]*text[\s\S]*completed[\s\S]*\}/.test(app) },
      { label: "Add task with validation (no empty)", passed: /(trim|length)\s*(===|==|>|<|!)/.test(app) && /addTask/.test(app) },
      { label: "Toggle complete (checkbox)", passed: /type\s*=\s*["']checkbox["']/.test(app) || /toggleTask/.test(app) },
      { label: "Delete task button", passed: /deleteTask/.test(app) },
      { label: "Filter buttons (All / Active / Completed)", passed: /("all"|'all')/.test(app) && /("active"|'active')/.test(app) && /("completed"|'completed')/.test(app) },
      { label: "Clear Completed button", passed: /clearCompleted|Clear\s*Completed/.test(app) },
      { label: "Items left counter", passed: /items\s*left/.test(app) },
      { label: "Empty state when no tasks", passed: /(No tasks|length\s*===\s*0|length\s*<=\s*0)/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

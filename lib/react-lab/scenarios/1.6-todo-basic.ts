import type { ReactScenario } from "../types"

export const TODO_BASIC_LAB: ReactScenario = {
  id: "1.6-todo-basic",
  title: "1.6: To-Do App v1 — Tasks Add, Show, Delete",
  description: "Build a basic to-do list with add and delete functionality",
  instructions: `## To-Do App v1: Add & Delete Tasks

Create a to-do list app that lets users add and remove tasks.

### Requirements:
1. Define a \`Task\` type: \`{ id: number; text: string }\`
2. Use \`useState<Task[]>\` to store the list of tasks
3. Render tasks using \`.map()\` with \`key={task.id}\`
4. Each task should have a "Delete" button
5. Show "No tasks yet" when the list is empty

### Tips:
- Use \`Date.now()\` for unique IDs
- For delete: \`.filter()\` creates a new array
- State must be immutable — never use \`.push()\`
  `,

  hints: [
    "Use `Date.now()` for unique IDs",
    "For delete: `tasks.filter(task => task.id !== id)` creates a new array",
    "Never mutate state — use spread: `[...tasks, newTask]` instead of `.push()`",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

// Define Task type here

export default function App() {
  const [tasks, setTasks] = useState</* TODO */>([]);

  const addTask = (text: string) => {
    // TODO: Create new task and add to array
  };

  const deleteTask = (id: number) => {
    // TODO: Filter out the task with this id
  };

  return (
    <div>
      <h1>To-Do App</h1>
      {/* TODO: Add input + Add button */}
      {/* TODO: Render task list */}
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
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
  margin-left: 0.5rem;
}
button:hover { opacity: 0.9; }
.task-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

interface Task {
  id: number;
  text: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask: Task = { id: Date.now(), text: input };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      {tasks.length === 0 ? (
        <p style={{ color: "#888" }}>No tasks yet. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-row">
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} style={{ background: "#e74c3c" }}>Delete</button>
          </div>
        ))
      )}
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
input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #4a90d9;
  color: white;
  margin-left: 0.5rem;
}
button:hover { opacity: 0.9; }
.task-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Task interface defined with id and text", passed: /interface\s+Task\s*\{[\s\S]*id[\s\S]*text[\s\S]*\}/.test(app) },
      { label: "useState<Task[]> for task list", passed: /useState\s*<Task\[\]>\s*\(/.test(app) || /useState\s*<\s*Task\s*\[\]\s*>\s*\(/.test(app) },
      { label: ".map() used with key prop", passed: /\.map\s*\(/.test(app) && /\bkey\s*=\s*\{/.test(app) },
      { label: "Delete button for each task", passed: /Delete/.test(app) || /deleteTask/.test(app) },
      { label: "Add task with input + button", passed: /<input/.test(app) && /onClick\s*=\s*\{[\s\S]*addTask/.test(app) },
      { label: "Empty state message", passed: /(No tasks|length\s*===\s*0|length\s*<=\s*0)/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

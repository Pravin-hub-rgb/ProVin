"use client"

import { useState } from "react"

interface Task {
  id: number
  text: string
  completed: boolean
}

type FilterStatus = "all" | "active" | "completed"

export function ToDoDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build a project", completed: true },
    { id: 3, text: "Master TypeScript", completed: false },
    { id: 4, text: "Deploy to production", completed: false },
  ])
  const [inputText, setInputText] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")

  const handleAdd = () => {
    if (inputText.trim() === "") return
    setTasks([...tasks, { id: Date.now(), text: inputText.trim(), completed: false }])
    setInputText("")
  }

  const handleToggle = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleClearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed))
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed
    if (filter === "completed") return t.completed
    return true
  })

  const remainingCount = tasks.filter((t) => !t.completed).length

  return (
    <div className="border border-border rounded-xl p-5 bg-card shadow-soft dark:shadow-navy">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        ✨ To-Do App — Live Demo
      </h3>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-1 mb-4">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === f
                ? "bg-primary/15 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-1.5 mb-4 min-h-[100px]">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            {filter === "all"
              ? "No tasks yet. Add one above!"
              : filter === "active"
                ? "All tasks are done!"
                : "No completed tasks yet."}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
                className="w-4 h-4 accent-primary rounded border-border"
              />
              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-card-foreground"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-xs text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-destructive/10"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {remainingCount} / {tasks.length} items left
        </span>
        {tasks.some((t) => t.completed) && (
          <button
            onClick={handleClearCompleted}
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  )
}

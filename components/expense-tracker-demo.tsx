"use client"

import { useState } from "react"

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
}

const initialExpenses: Expense[] = [
  { id: "1", title: "Chai", amount: 20, category: "Food", date: "2026-08-25T10:00:00.000Z" },
  { id: "2", title: "Bus fare", amount: 50, category: "Travel", date: "2026-08-25T11:00:00.000Z" },
  { id: "3", title: "Lunch", amount: 120, category: "Food", date: "2026-08-25T13:00:00.000Z" },
]

const initialCategories = ["Food", "Travel", "Shopping", "Bills", "Other"]

export function ExpenseTrackerDemo() {
  const [page, setPage] = useState<"expenses" | "categories" | "summary">("expenses")
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [filter, setFilter] = useState("All")
  const [input, setInput] = useState("")
  const [amount, setAmount] = useState("")
  const [cat, setCat] = useState("")
  const [rate, setRate] = useState<number | null>(92.89)
  const [rateStatus, setRateStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("succeeded")
  const [newCat, setNewCat] = useState("")
  const [catError, setCatError] = useState("")

  const filtered = filter === "All" ? expenses : expenses.filter((e) => e.category === filter)
  const totalAmount = filtered.reduce((sum, e) => sum + e.amount, 0)
  const rupeeTotal = rate === null ? "N/A" : `₹${(totalAmount * rate).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`

  const rateText =
    rateStatus === "loading" ? "Fetching rate." :
    rateStatus === "failed" || rate === null ? "N/A" :
    `1 USD = ₹${rate.toFixed(2)}`

  const handleAdd = () => {
    if (!input.trim() || !amount) return
    setExpenses([...expenses, {
      id: crypto.randomUUID(),
      title: input.trim(),
      amount: Number(amount),
      category: cat || categories[0],
      date: new Date().toISOString(),
    }])
    setInput("")
    setAmount("")
  }

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const handleRetry = () => {
    setRateStatus("loading")
    setTimeout(() => { setRate(92.89); setRateStatus("succeeded") }, 1000)
  }

  const handleAddCategory = () => {
    const trimmed = newCat.trim()
    if (!trimmed) { setCatError("Name is required"); return }
    if (categories.includes(trimmed)) { setCatError("Already exists"); return }
    setCategories([...categories, trimmed])
    setNewCat("")
    setCatError("")
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg min-h-screen">
        <nav className="flex gap-3 border-b border-slate-200 pb-4 mb-6 px-6 pt-6">
          <button onClick={() => setPage("expenses")} className={page === "expenses" ? "text-emerald-600 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md text-xs font-medium border block" : "text-slate-500 border-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border block transition-colors"}>Expenses</button>
          <button onClick={() => setPage("categories")} className={page === "categories" ? "text-emerald-600 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md text-xs font-medium border block" : "text-slate-500 border-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border block transition-colors"}>Categories</button>
          <button onClick={() => setPage("summary")} className={page === "summary" ? "text-emerald-600 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md text-xs font-medium border block" : "text-slate-500 border-transparent hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border block transition-colors"}>Summary</button>
        </nav>

        <div className="px-6 pb-6">
          {page === "expenses" && (
            <div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-slate-500 text-xs mb-1">Total</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-medium">${totalAmount.toFixed(2)}</span>
                    <span className="text-slate-500 text-sm">{rupeeTotal}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 flex items-baseline gap-2">
                  {rateText}
                  {rateStatus === "failed" && (
                    <button onClick={handleRetry} className="px-2 py-1 rounded border border-slate-300 bg-white text-slate-600 text-xs hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer">Retry</button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                <form onSubmit={(e) => { e.preventDefault(); handleAdd() }} className="flex gap-2 flex-1 flex-wrap">
                  <input type="text" placeholder="Title, e.g. Bus fare" value={input} onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="number" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-24 px-3 py-2 border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <select value={cat} onChange={(e) => setCat(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="">Category ?</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button type="submit" className="flex-shrink-0 border border-slate-200 rounded cursor-pointer px-4 py-2 text-sm bg-slate-100 text-slate-700 whitespace-nowrap hover:bg-slate-200">Add</button>
                </form>
              </div>
              <p className="text-slate-400 text-xs -mt-2 mb-4">Inline error under form: empty title, or amount not above 0</p>

              <div className="flex gap-2 flex-wrap mb-3">
                {["All", ...categories].map((c) => (
                  <button key={c} onClick={() => setFilter(c)}
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${filter === c ? "bg-emerald-600 text-white border-none" : "border border-slate-300 text-slate-500"}`}>
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {filtered.length === 0 ? (
                  <p className="text-slate-500 text-sm">
                    {expenses.length === 0 ? "No expenses yet. Add one above." : `No ${filter} expenses.`}
                  </p>
                ) : (
                  filtered.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between gap-3 p-3 border border-slate-200 rounded bg-slate-50 mb-2">
                      <div>
                        <div className="text-slate-500 text-xs">{exp.category}</div>
                        <div className="font-medium text-sm">{exp.title}</div>
                        <div className="text-slate-500 text-xs">{new Date(exp.date).toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                      </div>
                      <div className="font-medium text-sm">${exp.amount}</div>
                      <button onClick={() => handleDelete(exp.id)} className="flex-shrink-0 border border-slate-200 rounded px-4 py-2 text-sm bg-slate-100 text-slate-700 whitespace-nowrap hover:bg-slate-200">Delete</button>
                    </div>
                  ))
                )}
              </div>
              <p className="text-slate-400 text-xs mt-2">Empty state: "No expenses for Food. Add one above." — Newest first</p>

              <div className="text-sm text-slate-600 mt-2">Total: {expenses.length} expenses, ${expenses.reduce((s, e) => s + e.amount, 0)}</div>
            </div>
          )}

          {page === "categories" && (
            <div className="bg-slate-50 min-h-screen p-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <h2 className="text-xl font-bold text-slate-800">Add Category</h2>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleAddCategory() }} className="mb-6">
                  <input type="text" placeholder="e.g. Food, Transport" value={newCat} onChange={(e) => { setNewCat(e.target.value); setCatError("") }}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400 mb-3" />
                  {catError && <p className="text-red-500 text-sm mt-1 mb-3">{catError}</p>}
                  <button type="submit" className="w-full px-4 py-2 border border-emerald-600 bg-emerald-600 text-white rounded font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400">Add Category</button>
                </form>
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Categories ({categories.length})</h3>
                  <ul className="space-y-2">
                    {categories.length === 0 ? (
                      <li className="px-3 py-2 text-slate-400 text-sm italic">No categories yet</li>
                    ) : (
                      categories.map((c) => (
                        <li key={c} className="flex items-center justify-between px-3 py-2 border border-slate-200 rounded bg-slate-50 text-slate-700">
                          <span>{c}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {page === "summary" && (
            <div className="bg-slate-50 min-h-screen p-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold text-slate-800 mb-4">Summary</h1>
                <ul className="divide-y divide-slate-200">
                  {categories.map((name) => {
                    const catExpenses = expenses.filter((e) => e.category.toLowerCase() === name.toLowerCase())
                    const catTotal = catExpenses.reduce((sum, e) => sum + e.amount, 0)
                    if (catTotal === 0) return null
                    return (
                      <li key={name} className="py-3 flex justify-between text-sm">
                        <span className="text-slate-700">{name}</span>
                        <span className="font-medium text-slate-900">${catTotal.toFixed(2)}</span>
                        <span className="text-slate-500">
                          {rate === null ? "N/A" : `₹${(catTotal * (rate || 0)).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                        </span>
                      </li>
                    )
                  })}
                  <li className="py-3 flex justify-between text-sm font-bold border-t border-slate-200 mt-2 pt-3">
                    <span className="text-slate-700">Total</span>
                    <span className="font-medium text-slate-900">${expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}</span>
                    <span className="text-slate-500">
                      {rate === null ? "N/A" : `₹${(expenses.reduce((s, e) => s + e.amount, 0) * (rate || 0)).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                    </span>
                  </li>
                </ul>
                {expenses.length === 0 && (
                  <li className="py-3 text-sm text-slate-400 italic">No expenses yet.</li>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
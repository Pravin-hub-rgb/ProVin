"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-muted animate-pulse" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg
        bg-gradient-to-br from-primary/10 to-primary/5
        border border-border/50
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        group"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 
        dark:-rotate-90 dark:scale-0 
        text-amber-500 group-hover:text-amber-600" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 
        dark:rotate-0 dark:scale-100 
        text-indigo-400 group-hover:text-indigo-300" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

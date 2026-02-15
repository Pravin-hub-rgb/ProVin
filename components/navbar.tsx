"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Zap } from "lucide-react"

type Tab = "Dashboard" | "Coding" | "Trading"

interface NavbarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs: Tab[] = ["Dashboard", "Coding", "Trading"]

  return (
    <nav className="sticky top-0 z-50 w-full h-14 
      bg-background/80 backdrop-blur-xl 
      border-b border-border/50
      shadow-sm">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left Section: Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
              <div className="relative flex items-center justify-center w-8 h-8 
                bg-gradient-to-br from-primary to-primary/80 
                rounded-lg shadow-lg">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <span className="font-semibold text-sm tracking-tight">
              ProVin
            </span>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                  ${activeTab === tab 
                    ? "bg-primary/15 text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Section: Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

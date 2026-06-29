"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Zap, LayoutDashboard, Code2, Wallet, LayoutGrid, FlaskConical } from "lucide-react"

type Tab = "Dashboard" | "Coding" | "Finance" | "General"

interface NavbarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "Coding", label: "Coding", icon: <Code2 className="w-5 h-5" /> },
  { id: "Finance", label: "Finance", icon: <Wallet className="w-5 h-5" /> },
  { id: "General", label: "General", icon: <LayoutGrid className="w-5 h-5" /> },
]

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <>
      {/* Top navbar — desktop + mobile (tabs hidden on mobile) */}
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

            {/* Center: Navigation Links (desktop only) */}
            <div className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                    ${activeTab === tab.id 
                      ? "bg-primary/15 text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Section: Git Lab + Theme Toggle */}
            <div className="flex items-center gap-2">
              <a
                href="/lab"
                className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                  text-muted-foreground hover:text-foreground hover:bg-accent/50"
              >
                <FlaskConical className="w-4 h-4" />
                <span className="hidden sm:inline">Lab</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom tab bar — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Flat bar background */}
        <div className="absolute bottom-0 left-0 right-0 h-14
          bg-background/90 backdrop-blur-xl
          border-t border-border/50" />
        {/* Tabs */}
        <div className="relative flex items-start justify-around"
          style={{ height: '60px', paddingBottom: 'env(safe-area-inset-bottom, 4px)' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center"
                style={{ width: '72px' }}
              >
                {/* Tab circle */}
                <div className={`relative flex items-center justify-center transition-all duration-500 ease-out
                  rounded-full
                  ${isActive
                    ? 'w-12 h-12 -translate-y-2 bg-gradient-to-br from-primary via-primary to-primary/90 shadow-lg shadow-primary/30 ring-2 ring-primary/20'
                    : 'w-10 h-10 translate-y-1 bg-transparent'
                  }`}>
                  <div className={`transition-all duration-500
                    ${isActive
                      ? 'text-primary-foreground scale-110'
                      : 'text-foreground/30'
                    }`}>
                    {tab.icon}
                  </div>
                </div>
              </button>
            )
          })}
          {/* Lab link */}
          <a
            href="/lab"
            className="relative flex flex-col items-center"
            style={{ width: '72px' }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 translate-y-1 rounded-full bg-transparent text-foreground/30 hover:text-foreground/60 transition-colors">
              <FlaskConical className="w-5 h-5" />
            </div>
          </a>
        </div>
      </nav>
    </>
  )
}

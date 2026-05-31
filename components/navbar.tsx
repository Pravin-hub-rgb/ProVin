"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Zap, LayoutDashboard, Code2, Wallet } from "lucide-react"

type Tab = "Dashboard" | "Coding" | "Finance"

interface NavbarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "Coding", label: "Coding", icon: <Code2 className="w-5 h-5" /> },
  { id: "Finance", label: "Finance", icon: <Wallet className="w-5 h-5" /> },
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

            {/* Right Section: Theme Toggle */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom tab bar — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 6px)' }}>
        <div className="mx-4">
          <div className="relative flex items-end justify-around h-[68px] px-2 pb-1.5
            bg-background/80 backdrop-blur-2xl
            rounded-2xl border border-border/40
            shadow-[0_-4px_24px_rgba(0,0,0,0.06)]
            dark:shadow-[0_-4px_24px_rgba(0,0,0,0.25)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-out
                    ${isActive ? '-translate-y-2' : 'translate-y-0'}`}
                  style={{ width: '68px' }}
                >
                  {isActive && (
                    <span className="absolute -inset-x-1 -inset-y-2 bg-gradient-to-b from-primary to-primary/85 
                      rounded-2xl shadow-lg shadow-primary/30 border border-primary/20
                      transition-all duration-500" />
                  )}
                  <span className={`relative z-10 transition-all duration-500
                    ${isActive 
                      ? 'text-primary-foreground scale-110' 
                      : 'text-muted-foreground/50'
                    }`}>
                    {tab.icon}
                  </span>
                  <span className={`relative z-10 transition-all duration-500 leading-none
                    ${isActive
                      ? 'text-[10px] font-bold text-primary-foreground/90'
                      : 'text-[10px] font-semibold text-muted-foreground/50'
                    }`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}

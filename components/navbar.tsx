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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-3 pointer-events-none">
        <div className="pointer-events-auto mx-5 w-full max-w-sm">
          <div className="relative flex items-center justify-around h-16 px-2
            bg-background/80 backdrop-blur-2xl
            rounded-2xl border border-border/40
            shadow-[0_-4px_24px_rgba(0,0,0,0.06)] 
            dark:shadow-[0_-4px_24px_rgba(0,0,0,0.25)]
            before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.04] before:to-transparent
            before:pointer-events-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative flex flex-col items-center justify-center gap-0.5 w-full h-full"
                >
                  {isActive && (
                    <span className="absolute inset-y-2 inset-x-3 bg-primary/12 rounded-xl border border-primary/10 shadow-sm shadow-primary/5" />
                  )}
                  <span className={`relative z-10 transition-all duration-300
                    ${isActive
                      ? "text-primary scale-110 -translate-y-0.5"
                      : "text-muted-foreground/50 scale-100 translate-y-0"
                    }`}>
                    {tab.icon}
                  </span>
                  <span className={`relative z-10 text-[10px] font-semibold leading-none transition-all duration-300
                    ${isActive ? "text-primary opacity-100" : "text-muted-foreground/50 opacity-60"}`}>
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

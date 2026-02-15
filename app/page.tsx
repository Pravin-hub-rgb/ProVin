"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import CodingPage from "./coding/page"

type Tab = "Dashboard" | "Coding" | "Trading"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard")

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="min-h-[calc(100vh-3.5rem)]">
        {activeTab === "Dashboard" && (
          <div className="min-h-[calc(100vh-3.5rem)] bg-background transition-colors duration-500 flex items-center justify-center">
            <div className="text-center px-4">
              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-muted-foreground text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-4">
                  Welcome to
                </span>
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r 
                    from-foreground via-foreground to-foreground/70 
                    dark:from-white dark:via-blue-100 dark:to-blue-300">
                    Project Vin
                  </span>
                  {/* Decorative underline */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/50" viewBox="0 0 300 12" preserveAspectRatio="none">
                    <path d="M0,8 Q150,0 300,8" stroke="currentColor" strokeWidth="3" fill="none" className="animate-pulse" />
                  </svg>
                </span>
                <span className="block mt-2 sm:mt-4">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground">
                    ({""}
                    <span className="font-bold bg-clip-text text-transparent 
                      bg-gradient-to-r from-primary to-blue-500">
                      ProVin
                    </span>
                    {")"})
                  </span>
                </span>
              </h1>
            </div>
          </div>
        )}

        {activeTab === "Coding" && <CodingPage />}

        {activeTab === "Trading" && (
          <div className="min-h-[calc(100vh-3.5rem)] bg-background transition-colors duration-500 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r 
                  from-foreground via-foreground to-foreground/70 
                  dark:from-white dark:via-purple-100 dark:to-purple-300">
                  Trading
                </span>
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                Your trading dashboard will appear here.
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

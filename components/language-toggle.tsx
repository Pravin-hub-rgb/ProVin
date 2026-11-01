"use client"

import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "hi" : "en")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-md transition-all duration-200
        text-muted-foreground hover:text-foreground hover:bg-accent/50"
      title={language === "en" ? "Switch to Hinglish" : "Switch to English"}
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline">{language === "en" ? "EN" : "HI"}</span>
    </button>
  )
}

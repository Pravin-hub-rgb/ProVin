"use client"

import { useState } from "react"

function GymNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white rounded-t-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">💪 GymPro</div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a className="hover:text-blue-400 transition-colors cursor-pointer">Home</a>
          <a className="hover:text-blue-400 transition-colors cursor-pointer">Features</a>
          <a className="hover:text-blue-400 transition-colors cursor-pointer">Pricing</a>
          <a className="hover:text-blue-400 transition-colors cursor-pointer">Contact</a>
        </div>
        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 flex flex-col gap-3 text-sm">
          <a className="hover:text-blue-400 cursor-pointer">Home</a>
          <a className="hover:text-blue-400 cursor-pointer">Features</a>
          <a className="hover:text-blue-400 cursor-pointer">Pricing</a>
          <a className="hover:text-blue-400 cursor-pointer">Contact</a>
        </div>
      )}
    </nav>
  )
}

function GymHero() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          Transform Your <span className="text-blue-500">Body</span>
        </h1>
        <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto mb-6">
          Join the best gym in town. Personal training, group classes, and nutrition plans — all under one roof.
        </p>
        <div className="flex gap-3 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
            Get Started
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

function GymFeatures() {
  const features = [
    { title: "Personal Training", desc: "One-on-one sessions with expert trainers.", icon: "🏋️" },
    { title: "Group Classes", desc: "Yoga, Zumba, HIIT, and more.", icon: "👥" },
    { title: "Nutrition Plans", desc: "Personalized meal plans from certified nutritionists.", icon: "🥗" },
  ]

  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          Why Choose <span className="text-blue-600">GymPro</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-base font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GymFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-5 rounded-b-lg">
      <div className="max-w-6xl mx-auto px-4 text-center text-xs">
        <p className="text-sm font-bold text-white mb-1">💪 GymPro</p>
        <p>&copy; 2025 GymPro. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-3">
          <a className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
          <a className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export function GymDemo() {
  return (
    <div className="border border-border rounded-xl shadow-soft dark:shadow-navy overflow-hidden">
      <div className="bg-muted/50 px-4 py-2 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">🏋️ Gym Landing Page — Live Demo</span>
      </div>
      <div className="font-sans text-xs md:text-sm">
        <GymNavbar />
        <GymHero />
        <GymFeatures />
        <GymFooter />
      </div>
    </div>
  )
}

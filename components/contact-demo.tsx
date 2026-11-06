"use client"

import { useState } from "react"

interface Contact {
  id: number
  name: string
  phone: string
  email?: string
  category: "family" | "friends" | "work"
  favorite: boolean
}

type CategoryFilter = "all" | "family" | "friends" | "work"

export function ContactDemo() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "Amit Sharma", phone: "+91 98765 43210", email: "amit@example.com", category: "friends", favorite: true },
    { id: 2, name: "Priya Verma", phone: "+91 91234 56789", category: "family", favorite: true },
    { id: 3, name: "Rahul Khanna", phone: "+91 99887 76655", email: "rahul.k@example.com", category: "work", favorite: false },
    { id: 4, name: "Sneha Gupta", phone: "+91 90909 11223", category: "work", favorite: false },
  ])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState<Contact["category"]>("friends")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<CategoryFilter>("all")

  const handleAdd = () => {
    if (name.trim() === "" || phone.trim() === "") return
    setContacts([
      ...contacts,
      {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        category,
        favorite: false,
      },
    ])
    setName("")
    setPhone("")
    setEmail("")
    setCategory("friends")
  }

  const toggleFavorite = (id: number) =>
    setContacts(contacts.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)))

  const handleDelete = (id: number) =>
    setContacts(contacts.filter((c) => c.id !== id))

  const visible = contacts.filter((c) => {
    const matchesCategory = filter === "all" || c.category === filter
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const favoriteCount = contacts.filter((c) => c.favorite).length

  return (
    <div className="border border-border rounded-xl p-5 bg-card shadow-soft dark:shadow-navy">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        📒 Contact Book — Live Demo
      </h3>

      {/* Add form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          className="px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone *"
          className="px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          className="px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Contact["category"])}
          className="px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Category"
        >
          <option value="friends">Friends</option>
          <option value="family">Family</option>
          <option value="work">Work</option>
        </select>
      </div>
      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity mb-4"
      >
        Add Contact
      </button>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-3"
        aria-label="Search contacts"
      />

      {/* Category filter */}
      <div className="flex gap-1 mb-3">
        {(["all", "family", "friends", "work"] as const).map((f) => (
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

      {/* Contact list */}
      <div className="space-y-1.5 mb-3 min-h-[120px]">
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            {search ? "No contacts match your search." : "No contacts yet — add one above!"}
          </p>
        ) : (
          visible.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <button
                onClick={() => toggleFavorite(contact.id)}
                aria-pressed={contact.favorite}
                aria-label={contact.favorite ? `Unfavorite ${contact.name}` : `Favorite ${contact.name}`}
                className="text-lg leading-none hover:scale-110 transition-transform"
              >
                {contact.favorite ? "⭐" : "☆"}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground truncate">{contact.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {contact.phone}{contact.email ? ` · ${contact.email}` : ""}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                {contact.category}
              </span>
              <button
                onClick={() => handleDelete(contact.id)}
                className="text-xs text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded hover:bg-destructive/10"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
        <span>
          {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} · {favoriteCount} ⭐ favorite
        </span>
        <span>{visible.length} shown</span>
      </div>
    </div>
  )
}

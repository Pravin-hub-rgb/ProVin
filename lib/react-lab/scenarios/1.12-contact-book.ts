import type { ReactScenario } from "../types"

export const CONTACT_BOOK_LAB: ReactScenario = {
  id: "1.12-contact-book",
  title: "1.12: Final Project — Contact Book",
  description: "Build the complete Contact Book app with all features from the batch",
  instructions: `## Complete Contact Book

Build a fully functional Contact Book with all features from the batch.

### Requirements:
1. Contact type with: \`id\`, \`name\`, \`phone\`, optional \`email\`, \`category\`, \`favorite\`
2. Add contact (with validation — name and phone required)
3. Toggle favorite (star)
4. Delete contact
5. Search by name
6. Filter by category: All / Family / Work / Friend
7. "X contacts" counter
8. "Clear All" button — removes all contacts
9. Show "No contacts yet" when empty

### Structure:
You can put everything in \`App.tsx\` or split into components:
- \`ContactForm\` — inputs + add button
- \`ContactCard\` — single contact with star + details + delete
- \`ContactList\` — renders filtered contacts
- \`SearchBar\` — search input
- \`FilterBar\` — category filter buttons

This combines everything you learned in Batch 1.
  `,

  hints: [
    "Split UI into components: ContactForm, ContactCard, ContactList, SearchBar, FilterBar",
    "Clear All: `setContacts([])`",
    "Use `onKeyDown` on input to add contact on Enter key press",
    "Optional email: `email?: string` with `{contact.email && ...}` guard",
  ],

  starterFiles: {
    "/App.tsx": `import { useState } from "react";

type Category = "family" | "work" | "friend";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  category: Category;
  favorite: boolean;
}

type CategoryFilter = "all" | Category;

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  // TODO: Add contact
  // TODO: Delete contact
  // TODO: Toggle favorite
  // TODO: Clear all
  // TODO: Filter logic (search + category)

  return (
    <div className="contact-app">
      <h1>📇 Contact Book</h1>
      {/* Contact Form */}
      {/* Search Bar */}
      {/* Filter Bar */}
      {/* Contact List */}
      {/* Footer with count + Clear All */}
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
}
.contact-app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}
h1 { margin-top: 0; color: #333; font-size: 1.5rem; }
input, select {
  padding: 0.6rem; font-size: 0.95rem; border: 1px solid #ddd;
  border-radius: 6px; flex: 1; width: 100%; box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem; font-size: 0.85rem; border: none;
  border-radius: 6px; cursor: pointer; background: #4a90d9; color: white;
}
button:hover { opacity: 0.9; }
.contact-row {
  display: flex; align-items: flex-start; gap: 0.5rem;
  padding: 0.6rem 0; border-bottom: 1px solid #eee;
}
.contact-row .details { flex: 1; }
.contact-row .name { font-weight: bold; }
.contact-row .meta { font-size: 0.85rem; color: #666; }
`,
  },
  solutionFiles: {
    "/App.tsx": `import { useState } from "react";

type Category = "family" | "work" | "friend";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  category: Category;
  favorite: boolean;
}

type CategoryFilter = "all" | Category;

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Category>("friend");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const addContact = () => {
    if (name.trim() === "" || phone.trim() === "") return;
    setContacts([...contacts, {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() === "" ? undefined : email.trim(),
      category,
      favorite: false,
    }]);
    setName("");
    setPhone("");
    setEmail("");
    setCategory("friend");
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setContacts(contacts.map((c) =>
      c.id === id ? { ...c, favorite: !c.favorite } : c
    ));
  };

  const clearAll = () => {
    setContacts([]);
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="contact-app">
      <h1>📇 Contact Book</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input value={name} onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addContact()}
          placeholder="Name (required)" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addContact()}
          placeholder="Phone (required)" />
        <input value={email} onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addContact()}
          placeholder="Email (optional)" />
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option value="family">Family</option>
          <option value="work">Work</option>
          <option value="friend">Friend</option>
        </select>
        <button onClick={addContact}>Add</button>
      </div>

      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..." style={{ marginBottom: "1rem" }} />

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {(["all", "family", "work", "friend"] as CategoryFilter[]).map((f) => (
          <button key={f} onClick={() => setCategoryFilter(f)}
            style={{ background: categoryFilter === f ? "#4a90d9" : "#ccc", flex: 1 }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredContacts.length === 0 ? (
        <p style={{ color: "#999", textAlign: "center" }}>No contacts found.</p>
      ) : (
        filteredContacts.map((contact) => (
          <div key={contact.id} className="contact-row">
            <button onClick={() => toggleFavorite(contact.id)}
              style={{ background: "none", border: "none", color: contact.favorite ? "#f1c40f" : "#ccc", fontSize: "1.2rem", padding: 0 }}>
              {contact.favorite ? "★" : "☆"}
            </button>
            <div className="details">
              <div className="name">{contact.name}</div>
              <div className="meta">📞 {contact.phone}</div>
              {contact.email && <div className="meta">✉️ {contact.email}</div>}
              <div className="meta">[{contact.category}]</div>
            </div>
            <button onClick={() => deleteContact(contact.id)}
              style={{ background: "#e74c3c", padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>✕</button>
          </div>
        ))
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", color: "#888", fontSize: "0.85rem" }}>
        <span>{contacts.length} contact{contacts.length !== 1 ? "s" : ""}</span>
        {contacts.length > 0 && (
          <button onClick={clearAll} style={{ background: "transparent", color: "#e74c3c", padding: 0, fontSize: "0.85rem" }}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}`,
    "/styles.css": `body {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
}
.contact-app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}
h1 { margin-top: 0; color: #333; font-size: 1.5rem; }
input, select {
  padding: 0.6rem; font-size: 0.95rem; border: 1px solid #ddd;
  border-radius: 6px; flex: 1; width: 100%; box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem; font-size: 0.85rem; border: none;
  border-radius: 6px; cursor: pointer; background: #4a90d9; color: white;
}
button:hover { opacity: 0.9; }
.contact-row {
  display: flex; align-items: flex-start; gap: 0.5rem;
  padding: 0.6rem 0; border-bottom: 1px solid #eee;
}
.contact-row .details { flex: 1; }
.contact-row .name { font-weight: bold; }
.contact-row .meta { font-size: 0.85rem; color: #666; }
`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    return [
      { label: "Contact interface with optional email", passed: /interface\s+Contact\s*\{[\s\S]*id[\s\S]*name[\s\S]*phone[\s\S]*email\?[\s\S]*category[\s\S]*favorite[\s\S]*\}/.test(app) },
      { label: "Add contact with validation (no empty name/phone)", passed: /(trim|length)\s*(===|==|>|<|!)/.test(app) && /addContact/.test(app) },
      { label: "Toggle favorite (star)", passed: /toggleFavorite/.test(app) },
      { label: "Delete contact button", passed: /deleteContact/.test(app) },
      { label: "Search by name", passed: /search/i.test(app) && /includes/.test(app) },
      { label: "Filter buttons (All / Family / Work / Friend)", passed: /("all"|'all')/.test(app) && /("family"|'family')/.test(app) && /("work"|'work')/.test(app) && /("friend"|'friend')/.test(app) },
      { label: "Clear All button", passed: /clearAll|Clear\s*All/.test(app) },
      { label: "Contacts counter", passed: /contact/i.test(app) && /length/.test(app) },
      { label: "Empty state when no contacts", passed: /(No contacts|length\s*===\s*0|length\s*<=\s*0)/.test(app) },
      { label: "Optional email guard (&&)", passed: /contact\.email\s*&&/.test(app) || /email\s*&&/.test(app) },
      { label: "App component exported", passed: /export\s+default\s+function\s+App/.test(app) },
    ]
  },
}

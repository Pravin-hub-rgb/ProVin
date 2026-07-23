import type { ReactScenario } from "../types"

export const CONTEXT_API_LAB: ReactScenario = {
  id: "2.6-context-api",
  title: "2.6: Context API — Language Switcher",
  description: "Prop drilling se bacho — Context API se language switch karo",
  instructions: `## Problem: Har file mein props pass karne pad rahe hain!

**Component tree:**

> **App** (language state)  
> → **MainContent** (language + onToggle receive, aage pass)  
> → → **Header** (language prop)  
> → → **Greeting** (language prop)  
> → → **LanguageToggle** (language + onToggle props)

**MainContent** ko \`language\` se koi matlab nahi, lekin phir bhi usse \`language\` aur \`onToggle\` props lene pad rahe hain — sirf aage children tak pahunchane ke liye. Aur har component file mein bhi props define karne pad rahe hain. Yeh **prop drilling** hai.

Tumhara kaam: is poori chain ko **Context API** se replace karo.

### Step 1 — Context File

\`/contexts/LanguageContext.tsx\` file edit karo jisme:

> \`type Language = "en" | "hi"\`
> \`interface LanguageContextValue\` — \`language\` + \`setLanguage\`
> \`const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)\`

Sab kuch export karna — doosri files import karengi.

### Step 2 — \`useLanguage()\` Hook

Same file mein:

\`\`\`ts
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
\`\`\`

### Step 3 — \`LanguageProvider\` Component

Same file mein. State rakho (\`useState<Language>("en")\`), children ko \`<LanguageContext>\` mein wrap karo.

### Step 4 — App.tsx fix karo

- \`LanguageProvider\` import karo
- App se \`useState\` hata do, \`language\` state hatao
- Sab kuch \`<LanguageProvider>\` mein wrap karo
- \`MainContent\` ko props mat do

### Step 5 — Components fix karo

Har component file mein:
- \`useLanguage\` import karo
- Props hatao, \`useLanguage()\` se values lo

\`\`\`ts
// components/Header.tsx — solution
import { useLanguage } from "../contexts/LanguageContext";
export default function Header() {
  const { language } = useLanguage();
  return <h1 className="header">{texts[language].title}</h1>;
}
\`\`\`

### Output

**English:** 🌐 Language Switcher • 👋 Welcome! • [Switch to Hindi]
**Hindi:** 🌐 भाषा चयनकर्ता • 👋 स्वागत है! • [अंग्रेज़ी पर स्विच करें]
  `,

  hints: [
    "Sabse pehle /contexts/LanguageContext.tsx banao — createContext, useLanguage, LanguageProvider",
    "LanguageProvider mein: const [language, setLanguage] = useState<Language>(\"en\")",
    "App.tsx se language state hatao aur <LanguageProvider> wrap karo",
    "Har component mein props hatao aur useLanguage() lagao",
  ],

  starterFiles: {
    "/contexts/LanguageContext.tsx": `// TODO: createContext, useLanguage hook, LanguageProvider — sab yahan banega
`,
    "/index.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "/App.tsx": `import { useState } from "react";
import MainContent from "./components/MainContent";

type Language = "en" | "hi";

const texts: Record<string, { title: string; welcome: string; desc: string; btn: string }> = {
  en: { title: "🌐 Language Switcher", welcome: "👋 Welcome!", desc: "This text changes based on the selected language.", btn: "Switch to Hindi" },
  hi: { title: "🌐 भाषा चयनकर्ता", welcome: "👋 स्वागत है!", desc: "यह टेक्स्ट चयनित भाषा के अनुसार बदलता है।", btn: "अंग्रेज़ी पर स्विच करें" },
};

export { texts };
export type { Language };

export default function App() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div className="app">
      <MainContent language={language} onToggle={() => setLanguage(p => (p === "en" ? "hi" : "en"))} />
    </div>
  );
}`,
    "/components/MainContent.tsx": `import Header from "./Header";
import Greeting from "./Greeting";
import LanguageToggle from "./LanguageToggle";
import type { Language } from "../App";

export default function MainContent({ language, onToggle }: { language: Language; onToggle: () => void }) {
  return (
    <div className="main-content">
      <Header language={language} />
      <Greeting language={language} />
      <LanguageToggle language={language} onToggle={onToggle} />
    </div>
  );
}`,
    "/components/Header.tsx": `import { texts } from "../App";
import type { Language } from "../App";

export default function Header({ language }: { language: Language }) {
  return <h1 className="header">{texts[language].title}</h1>;
}`,
    "/components/Greeting.tsx": `import { texts } from "../App";
import type { Language } from "../App";

export default function Greeting({ language }: { language: Language }) {
  return (
    <div className="greeting">
      <h2>{texts[language].welcome}</h2>
      <p>{texts[language].desc}</p>
    </div>
  );
}`,
    "/components/LanguageToggle.tsx": `import { texts } from "../App";
import type { Language } from "../App";

export default function LanguageToggle({ language, onToggle }: { language: Language; onToggle: () => void }) {
  return (
    <button className="toggle-btn" onClick={onToggle}>
      {texts[language].btn}
    </button>
  );
}`,
    "/styles.css": `body { font-family: system-ui, sans-serif; padding: 2rem; background: #0d1117; color: #c9d1d9; max-width: 500px; margin: 0 auto; }
.app { display: flex; flex-direction: column; gap: 1rem; }
.main-content { display: flex; flex-direction: column; gap: 1rem; }
.header { font-size: 1.5rem; margin: 0; }
.greeting { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1rem; }
.greeting h2 { margin: 0 0 0.5rem; }
.greeting p { margin: 0; color: #8b949e; }
.toggle-btn { background: #238636; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 1rem; }
.toggle-btn:hover { background: #2ea043; }`,
  },

  solutionFiles: {
    "/index.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "/contexts/LanguageContext.tsx": `import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en");
  return (
    <LanguageContext value={{ language, setLanguage }}>
      {children}
    </LanguageContext>
  );
}`,
    "/App.tsx": `import { LanguageProvider } from "./contexts/LanguageContext";
import MainContent from "./components/MainContent";

type Language = "en" | "hi";

const texts: Record<string, { title: string; welcome: string; desc: string; btn: string }> = {
  en: { title: "🌐 Language Switcher", welcome: "👋 Welcome!", desc: "This text changes based on the selected language.", btn: "Switch to Hindi" },
  hi: { title: "🌐 भाषा चयनकर्ता", welcome: "👋 स्वागत है!", desc: "यह टेक्स्ट चयनित भाषा के अनुसार बदलता है।", btn: "अंग्रेज़ी पर स्विच करें" },
};

export { texts };
export type { Language };

export default function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <MainContent />
      </div>
    </LanguageProvider>
  );
}`,
    "/components/MainContent.tsx": `import Header from "./Header";
import Greeting from "./Greeting";
import LanguageToggle from "./LanguageToggle";

export default function MainContent() {
  return (
    <div className="main-content">
      <Header />
      <Greeting />
      <LanguageToggle />
    </div>
  );
}`,
    "/components/Header.tsx": `import { useLanguage } from "../contexts/LanguageContext";
import { texts } from "../App";

export default function Header() {
  const { language } = useLanguage();
  return <h1 className="header">{texts[language].title}</h1>;
}`,
    "/components/Greeting.tsx": `import { useLanguage } from "../contexts/LanguageContext";
import { texts } from "../App";

export default function Greeting() {
  const { language } = useLanguage();
  return (
    <div className="greeting">
      <h2>{texts[language].welcome}</h2>
      <p>{texts[language].desc}</p>
    </div>
  );
}`,
    "/components/LanguageToggle.tsx": `import { useLanguage } from "../contexts/LanguageContext";
import { texts } from "../App";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button className="toggle-btn" onClick={() => setLanguage(language === "en" ? "hi" : "en")}>
      {texts[language].btn}
    </button>
  );
}`,
    "/styles.css": `body { font-family: system-ui, sans-serif; padding: 2rem; background: #0d1117; color: #c9d1d9; max-width: 500px; margin: 0 auto; }
.app { display: flex; flex-direction: column; gap: 1rem; }
.main-content { display: flex; flex-direction: column; gap: 1rem; }
.header { font-size: 1.5rem; margin: 0; }
.greeting { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1rem; }
.greeting h2 { margin: 0 0 0.5rem; }
.greeting p { margin: 0; color: #8b949e; }
.toggle-btn { background: #238636; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 1rem; }
.toggle-btn:hover { background: #2ea043; }`,
  },

  check: (files) => {
    const app = files["/App.tsx"] ?? ""
    const header = files["/components/Header.tsx"] ?? ""
    const greeting = files["/components/Greeting.tsx"] ?? ""
    const toggle = files["/components/LanguageToggle.tsx"] ?? ""
    const mainContent = files["/components/MainContent.tsx"] ?? ""
    const ctx = files["/contexts/LanguageContext.tsx"] ?? ""
    return [
      { label: "LanguageContext.tsx exists aur createContext use karta hai", passed: /createContext/.test(ctx) },
      { label: "useLanguage custom hook hai with guard pattern", passed: /useLanguage/.test(ctx) && /throw/.test(ctx) },
      { label: "LanguageProvider component exists", passed: /LanguageProvider/.test(ctx) },
      { label: "App.tsx LanguageProvider use kar raha hai", passed: /LanguageProvider/.test(app) },
      { label: "MainContent mein koi props nahi", passed: !/language=\{|onToggle=/.test(mainContent) },
      { label: "Header useLanguage() use kar raha hai, props nahi", passed: /useLanguage/.test(header) && !/language}:/.test(header) },
      { label: "Greeting useLanguage() use kar raha hai, props nahi", passed: /useLanguage/.test(greeting) && !/language}:/.test(greeting) },
      { label: "LanguageToggle useLanguage() use kar raha hai", passed: /useLanguage/.test(toggle) },
    ]
  },
}
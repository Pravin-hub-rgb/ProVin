# 🌐 Phase 1: Topic 6 - CORS (Cross-Origin Resource Sharing)

> **Interview Question:** "What is CORS? Why does the browser block cross-origin API calls? What is a preflight request? How do we fix CORS errors?"

---

## 🚨 **The Golden Rule of CORS — Understand This First!**

> **"By default, ALL cross-origin requests are BLOCKED by the browser. The server must explicitly ALLOW them."**

This is the browser's **security-by-default** approach. Imagine a building where:
- **Default:** No one from outside can enter (block)
- **Opt-in:** Security guard must be given a list: "Allow these people in"

---

## 💡 Beginner-Friendly Explanation (Web Dev Context)

```
Your setup:
- Frontend: http://localhost:3000 (React app)
- Backend: http://localhost:5000 (Node.js API)

You made a fetch call:
fetch('http://localhost:5000/api/users')

Browser blocked it! ❌
Console error:
"Access to fetch at 'http://localhost:5000/api/users' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present."
```

**Why did this happen?** Because of the browser's **Same-Origin Policy** — and the server **didn't explicitly allow it**!

### 🔒 **Same-Origin Policy — Browser's Security Guard**

The browser says:
> "Every website (origin) is a separate **secure zone**. One website's JavaScript cannot access another website's resources — unless that other website explicitly gives permission."

**What is an Origin?**
```
Origin = Protocol + Domain + Port

Examples:
- https://example.com        → Origin: https://example.com
- https://example.com:3000   → Origin: https://example.com:3000 (different port = different origin!)
- http://example.com         → Origin: http://example.com (different protocol = different origin!)
- https://api.example.com    → Origin: https://api.example.com (different subdomain = different origin!)
```

### ✅ **Same-Origin vs ❌ Cross-Origin**

```
✅ SAME-ORIGIN (No restriction):
- https://example.com/page1 → https://example.com/page2
- https://example.com:3000/app → https://example.com:3000/api

❌ CROSS-ORIGIN (CORS applies):
- http://localhost:3000 → http://localhost:5000 (different port)
- https://frontend.com → https://api.backend.com (different domain)
- https://example.com → http://example.com (different protocol - HTTPS vs HTTP)
- https://example.com → https://api.example.com (different subdomain)
```

### 🛂 **CORS — Visa Policy Analogy**

Imagine every **country** (origin) has its own **border security**:

- **Same-Origin:** You're in your own country — go anywhere, no restriction
- **Cross-Origin:** To enter another country, you need a **visa** (CORS headers)
- **Preflight Request:** Before applying for visa, get **confirmation** from embassy
- **CORS Headers:** Visa stamp that goes on your passport (response)

---

## 📊 Technical Deep Dive — CORS Flow

### 🔄 **How CORS Works — Step by Step (The Conversation)**

Imagine a **real scenario**:

```
🖥️  Setup:
- User is visiting: https://abc.com (Frontend)
- ABC.com needs data from: https://xyz.com/api/data (Backend API)

Now let's see how the browser works...
```

---

#### **Step 1: Browser's Security Check**

```
👤 User (on abc.com): "I need data from xyz.com!"
     ↓ calls fetch('https://xyz.com/api/data')

🛡️  Browser: "STOP! 🚨
     You're from abc.com, and you're requesting xyz.com?
     This is a CROSS-ORIGIN request!
     I need to first check if this is safe..."

     *Browser checks its list:*
     - abc.com origin: https://abc.com
     - xyz.com origin: https://xyz.com
     - BOTH ARE DIFFERENT! → Cross-origin confirmed! ❌
```

---

#### **Step 2: Browser Decides Request Type**

```
🛡️  Browser: "Now let's see if this request is 'SIMPLE' or 'COMPLEX'..."

     📋 Browser's Checklist:
     ┌─────────────────────────────────────────────────────┐
     │ What is the method?                                  │
     │   → GET? → ✅ Simple                                 │
     │   → POST? → ✅ Simple (sometimes)                    │
     │   → PUT/DELETE/PATCH? → ❌ Complex (Preflight!)      │
     │                                                      │
     │ What are the headers?                                │
     │   → Only Accept, Content-Language? → ✅ Simple       │
     │   → Authorization header? → ❌ Complex (Preflight!)  │
     │   → Custom headers? → ❌ Complex (Preflight!)        │
     │                                                      │
     │ What is Content-Type?                                │
     │   → text/plain? → ✅ Simple                          │
     │   → application/json? → ❌ Complex (Preflight!)      │
     └─────────────────────────────────────────────────────┘
```

---

#### **Step 3a: Simple Request Flow (No Preflight)**

```
If request is SIMPLE (GET with simple headers):

🛡️  Browser: "OK, this is a simple request. I'll send it directly,
              but I'll definitely add the Origin header."

     ┌──────────────────────────────────────────────────────┐
     │ 📤 Browser → xyz.com (Server):                       │
     │                                                      │
     │   GET /api/data HTTP/1.1                             │
     │   Host: xyz.com                                      │
     │   Origin: https://abc.com     ← Browser added this!  │
     └──────────────────────────────────────────────────────┘

🖥️  xyz.com (Server): "Hmm, request coming from abc.com.
                       Should I give a response?
                       Yes, I need to allow abc.com."

     ┌──────────────────────────────────────────────────────┐
     │ 📥 xyz.com → Browser:                                │
     │                                                      │
     │   HTTP/1.1 200 OK                                    │
     │   Access-Control-Allow-Origin: https://abc.com       │
     │   (Server gave permission!)                          │
     │   { "data": "Hello from xyz.com" }                   │
     └──────────────────────────────────────────────────────┘

🛡️  Browser: "Server sent 'Access-Control-Allow-Origin: https://abc.com'
              header. Perfect! Give response to abc.com."

     ┌──────────────────────────────────────────────────────┐
     │ 📥 Browser → abc.com (Your JavaScript):              │
     │                                                      │
     │   Here, got the response!                            │
     │   { "data": "Hello from xyz.com" }                   │
     └──────────────────────────────────────────────────────┘
```

---

#### **Step 3b: Preflight Request Flow (Complex Request)**

```
If request is COMPLEX (POST with JSON + Authorization):

🛡️  Browser: "This is a complex request! First get PERMISSION
              from server. I'll send an OPTIONS request first."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔔 PHASE 1: PREFLIGHT (Getting Permission)

     ┌──────────────────────────────────────────────────────┐
     │ 📤 Browser → xyz.com (OPTIONS Request):              │
     │                                                      │
     │   OPTIONS /api/data HTTP/1.1                         │
     │   Host: xyz.com                                      │
     │   Origin: https://abc.com                            │
     │   Access-Control-Request-Method: POST                │
     │   Access-Control-Request-Headers: Content-Type,      │
     │                                    Authorization     │
     │                                                      │
     │   *Translation:* "Hey xyz.com, a POST request        │
     │   is coming from abc.com with Content-Type           │
     │   and Authorization headers. Will you allow?"        │
     └──────────────────────────────────────────────────────┘

🖥️  xyz.com (Server): "Hmm, abc.com wants to POST
                       with custom headers. Let me check
                       my CORS policy..."

     ┌──────────────────────────────────────────────────────┐
     │ 📥 xyz.com → Browser (Preflight Response):           │
     │                                                      │
     │   HTTP/1.1 204 No Content                            │
     │   Access-Control-Allow-Origin: https://abc.com       │
     │   Access-Control-Allow-Methods: GET, POST, PUT       │
     │   Access-Control-Allow-Headers: Content-Type,        │
     │                                  Authorization       │
     │   Access-Control-Max-Age: 86400                      │
     │                                                      │
     │   *Translation:* "Yes bro, allowed!                  │
     │   POST is allowed, your headers are allowed too.     │
     │   And yes, remember this answer for 24 hours        │
     │   (max-age=86400), don't ask again and again!"      │
     └──────────────────────────────────────────────────────┘

🛡️  Browser: "Server gave permission! Now I can send
              the actual request."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔔 PHASE 2: ACTUAL REQUEST (Real Work)

     ┌──────────────────────────────────────────────────────┐
     │ 📤 Browser → xyz.com (Actual POST Request):          │
     │                                                      │
     │   POST /api/data HTTP/1.1                            │
     │   Host: xyz.com                                      │
     │   Origin: https://abc.com                            │
     │   Content-Type: application/json                     │
     │   Authorization: Bearer token123                     │
     │                                                      │
     │   { "name": "John", "email": "john@example.com" }    │
     └──────────────────────────────────────────────────────┘

🖥️  xyz.com (Server): "Got it, processing and sending response."

     ┌──────────────────────────────────────────────────────┐
     │ 📥 xyz.com → Browser:                                │
     │                                                      │
     │   HTTP/1.1 201 Created                               │
     │   Access-Control-Allow-Origin: https://abc.com       │
     │   { "message": "User created successfully" }         │
     └──────────────────────────────────────────────────────┘

🛡️  Browser: "Response has CORS headers, all valid.
              Give it to abc.com."

     ┌──────────────────────────────────────────────────────┐
     │ 📥 Browser → abc.com (Your JavaScript):              │
     │                                                      │
     │   Here, got the response!                            │
     │   { "message": "User created successfully" }         │
     └──────────────────────────────────────────────────────┘
```

---

#### **Step 4: Browser Final Check (Response Validation)**

```
Whenever browser gets response from server:

🛡️  Browser: "Got the response, but I need to check
              if server gave CORS permission..."

     🔍 Browser's Final Checklist:
     ┌─────────────────────────────────────────────────────┐
     │ ✅ Is 'Access-Control-Allow-Origin' header present? │
     │    → Yes, and value is https://abc.com? → PASS      │
     │    → No? → FAIL ❌ (Block!)                         │
     │    → '*' and credentials mode? → FAIL ❌            │
     │                                                     │
     │ ✅ Is the requested method allowed?                 │
     │    → Server allowed? → PASS                         │
     │    → Not allowed? → FAIL ❌ (Block!)                │
     │                                                     │
     │ ✅ Are the requested headers allowed?               │
     │    → Server allowed? → PASS                         │
     │    → Not allowed? → FAIL ❌ (Block!)                │
     └─────────────────────────────────────────────────────┘

     If ALL PASS → Response given to JavaScript ✅
     If ANY FAIL → Browser blocks it ❌

     Console error:
     "Access to fetch at 'https://xyz.com/api/data' from origin
     'https://abc.com' has been blocked by CORS policy:
     No 'Access-Control-Allow-Origin' header is present."
```

---

### 📊 **Visual Summary — CORS Decision Tree**

```
                         User calls fetch()
                                   │
                                   ▼
                     Browser: "Is this cross-origin?"
                                   │
                     ┌─────────────┴─────────────┐
                     │                           │
                  NO (Same Origin)           YES (Cross Origin)
                     │                           │
                     ▼                           ▼
             Direct Request ✅         Browser: "Simple or Complex?"
                                               │
                               ┌───────────────┴───────────────┐
                               │                               │
                         SIMPLE REQUEST                 COMPLEX REQUEST
                               │                               │
                               ▼                               ▼
                     Send directly +               First send OPTIONS
                     Origin header                 (Preflight)
                               │                               │
                               │                               ▼
                               │                    Get permission from server
                               │                               │
                               │                               ▼
                               │                    Server allowed?
                               │                               │
                               │                    ┌──────────┴──────────┐
                               │                    │                     │
                               │                   YES                   NO
                               │                    │                     │
                               │                    ▼                     ▼
                               │            Send actual request    BLOCK ❌
                               │                    │
                               └────────┬───────────┘
                                        │
                                        ▼
                         Server response arrives
                                        │
                                        ▼
                     Browser: "Check CORS headers"
                                        │
                               ┌────────┴────────┐
                               │                 │
                            PASS              FAIL
                               │                 │
                               ▼                 ▼
                     Response received ✅   BLOCK ❌
```

### 📝 **CORS Headers — Complete Reference**

#### **Request Headers (Browser → Server):**

| Header | Purpose | Example |
|--------|---------|---------|
| `Origin` | Source origin of request | `Origin: https://frontend.com` |
| `Access-Control-Request-Method` | In preflight: which method will be used | `Access-Control-Request-Method: POST` |
| `Access-Control-Request-Headers` | In preflight: which headers will be used | `Access-Control-Request-Headers: Content-Type, Authorization` |

#### **Response Headers (Server → Browser):**

| Header | Purpose | Example |
|--------|---------|---------|
| `Access-Control-Allow-Origin` | Which origins are allowed | `Access-Control-Allow-Origin: https://frontend.com` or `*` |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed | `Access-Control-Allow-Methods: GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Which headers are allowed | `Access-Control-Allow-Headers: Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | Are cookies/credentials allowed? | `Access-Control-Allow-Credentials: true` |
| `Access-Control-Expose-Headers` | Which headers can be exposed to client | `Access-Control-Expose-Headers: X-Custom-Header` |
| `Access-Control-Max-Age` | How long preflight response is cached | `Access-Control-Max-Age: 86400` (24 hours) |

---

## 🎯 Simple Request vs Preflight Request

### ✅ **Simple Request (No Preflight)**

Browser sends **direct request** — doesn't send OPTIONS first.

**Conditions (all must be fulfilled):**

1. **Method:** Only `GET`, `HEAD`, or `POST`
2. **Headers:** Only "simple headers" allowed:
   - `Accept`
   - `Accept-Language`
   - `Content-Language`
   - `Content-Type` (with restrictions)
3. **Content-Type:** Only these values:
   - `application/x-www-form-urlencoded`
   - `multipart/form-data`
   - `text/plain`

**Example — Simple Request:**
```javascript
// ✅ SIMPLE REQUEST (no preflight)
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});

// ✅ SIMPLE REQUEST (POST with simple Content-Type)
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: 'name=John'
});
```

### ⚠️ **Preflight Required Request**

Browser sends **OPTIONS request first** (preflight), then actual request.

**When is preflight required?**

1. **Method:** `PUT`, `DELETE`, `PATCH`, or any non-simple method
2. **Headers:** Custom headers (like `Authorization`, `X-Custom-Header`)
3. **Content-Type:** `application/json`, `application/xml`, etc.

**Example — Preflight Required:**
```javascript
// ❌ PREFLIGHT REQUIRED (custom header: Authorization)
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // ❌ Non-simple Content-Type
    'Authorization': 'Bearer token123'   // ❌ Custom header
  },
  body: JSON.stringify({ name: 'John' })
});

// Browser first sends this (Preflight):
OPTIONS https://api.example.com/users
Origin: https://frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// Server only if it allows, then actual POST is sent
```

### 🔄 **Preflight Flow Diagram**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PREFLIGHT REQUEST FLOW                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Browser: "Is this a simple request?"                            │
│     ↓ NO (custom headers, non-simple method, etc.)                  │
│                                                                     │
│  2. Browser → Server: OPTIONS request (Preflight)                   │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │ OPTIONS /api/users HTTP/1.1                             │     │
│     │ Host: api.example.com                                   │     │
│     │ Origin: https://frontend.com                            │     │
│     │ Access-Control-Request-Method: POST                     │     │
│     │ Access-Control-Request-Headers: Content-Type, Auth      │     │
│     └─────────────────────────────────────────────────────────┘     │
│     ↓                                                                 │
│  3. Server: Check if this method and headers are allowed?           │
│     ↓                                                                 │
│  4. Server → Browser: Response with CORS headers                   │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │ HTTP/1.1 204 No Content                                 │     │
│     │ Access-Control-Allow-Origin: https://frontend.com       │     │
│     │ Access-Control-Allow-Methods: GET, POST, PUT, DELETE    │     │
│     │ Access-Control-Allow-Headers: Content-Type, Authorization│    │
│     │ Access-Control-Max-Age: 86400                           │     │
│     └─────────────────────────────────────────────────────────┘     │
│     ↓                                                                 │
│  5. Browser: "OK, server allowed it!"                               │
│     ↓                                                                 │
│  6. Browser → Server: Actual POST request                           │
│     ┌─────────────────────────────────────────────────────────┐     │
│     │ POST /api/users HTTP/1.1                                │     │
│     │ Origin: https://frontend.com                            │     │
│     │ Content-Type: application/json                          │     │
│     │ Authorization: Bearer token123                          │     │
│     └─────────────────────────────────────────────────────────┘     │
│     ↓                                                                 │
│  7. Server: Process request and send response                        │
│     ↓                                                                 │
│  8. Browser: Check response CORS headers, then give to client       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ **CORS Security Model — Real Attack Scenario**

### **Browser Environment Sharing — The Vulnerability**

```
👤 User opened two tabs in browser (Chrome):
   Tab 1: https://bank.com (user logged in, session active)
   Tab 2: https://malicious.com (attacker's website)

🚨 Attack Attempt:
   malicious.com's JavaScript:

   fetch('https://bank.com/api/transfer?amount=10000&to=attacker-account', {
     method: 'POST',
     credentials: 'include'  // Send user's cookies!
   });
```

**Without CORS, what would happen:**
```
❌ If CORS didn't exist:
   → malicious.com's JavaScript sends request to bank.com
   → Browser automatically attaches user's bank.com cookies
   → bank.com server thinks legitimate user initiated transfer
   → ₹10,000 transferred to attacker's account! 😱
```

**With CORS, what happens:**
```
✅ With CORS:
   → Browser first asks bank.com server (preflight)
   → bank.com server: "I only allow https://bank.com and https://mobile.bank.com"
   → https://malicious.com is NOT allowed!
   → Browser BLOCKS the request ❌

   Console error:
   "Access to fetch at 'https://bank.com/api/transfer' from origin 'https://malicious.com'
    has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present."
```

### **Server-Side Whitelist — The Protection**

```javascript
// bank.com server's CORS policy:
app.use(cors({
  origin: [
    'https://bank.com',           // Main website
    'https://mobile.bank.com',    // Mobile website
    'https://admin.bank.com'      // Admin panel
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// When request comes from malicious.com:
// Server checks: "is 'https://malicious.com' in whitelist?"
// NO! → Server doesn't send CORS headers → Browser blocks it
```

### **Preflight's Role — Getting Permission First**

```
For complex request (POST with custom headers):

🔔 PHASE 1: Preflight (Getting Permission)
   Browser → bank.com (OPTIONS):
   "Hey bank.com, a POST request is coming from malicious.com
    with Authorization header. Will you allow?"

   bank.com → Browser:
   "NO! I only allow these origins:
    - https://bank.com
    - https://mobile.bank.com
    - https://admin.bank.com

    malicious.com is NOT allowed!"

   Browser → malicious.com:
   "Server didn't give permission. BLOCKED!" ❌

🔔 PHASE 2: Actual Request (never sent)
   Browser doesn't even send the actual POST request!
```

---

## 📱 **CORS and Native Apps — What's the Difference?**

### **Browser vs Native Apps — Security Model Differs**

```
🌐 BROWSER (Chrome, Firefox, Safari):
   ┌─────────────────────────────────────────────────────────────┐
   │ • Multiple websites open in same browser                    │
   │ • User has bank.com in one tab, malicious.com in another    │
   │ • Without CORS, malicious.com could steal bank.com data     │
   │ • That's why CORS IS APPLIED — to protect the user         │
   └─────────────────────────────────────────────────────────────┘

📱 NATIVE APPS (Android/iOS):
   ┌─────────────────────────────────────────────────────────────┐
   │ • Each app has its own isolated/sandboxed environment       │
   │ • Amazon app separate, WhatsApp app separate — they can't   │
   │   access each other                                         │
   │ • Security review before upload to App Store/Play Store     │
   │ • App must explicitly request permissions                   │
   │ • User installing app = trusting it                         │
   │ • That's why CORS IS NOT NEEDED — app is already sandboxed  │
   └─────────────────────────────────────────────────────────────┘
```

### **Multi-Platform Architecture Example**

```
Company: TechCorp

Web Platforms (Browser-based — CORS APPLIES):
┌─────────────────────────────────────────────────────────────┐
│ 🌐 Main Website: https://www.techcorp.com (React)           │
│ 📱 Mobile Web: https://m.techcorp.com (React)               │
│ 🖥️ Admin Panel: https://admin.techcorp.com (React)          │
│                                                              │
│ These need to fetch from backend → CORS headers needed      │
│ Backend must explicitly allow:                              │
│   origin: ['https://www.techcorp.com',                      │
│            'https://m.techcorp.com',                         │
│            'https://admin.techcorp.com']                     │
└─────────────────────────────────────────────────────────────┘

Native Apps (Not browser — CORS DOES NOT APPLY):
┌─────────────────────────────────────────────────────────────┐
│ 📱 Android App: TechCorp (Java/Kotlin - Play Store)         │
│ 🍎 iOS App: TechCorp (Swift - App Store)                    │
│                                                              │
│ These apps use native HTTP clients (OkHttp,                │
│ URLSession) — not browser!                                  │
│ CORS is only a browser security feature                    │
│ These apps DON'T need CORS headers                          │
└─────────────────────────────────────────────────────────────┘

Backend API: https://api.techcorp.com
```

### **Exception: Apps with WebView**

```
⚠️ If app uses WebView (like React Native, Ionic, Cordova):
   ┌─────────────────────────────────────────────────────────────┐
   │ • React Native: uses fetch() → CORS APPLIES                │
   │ • Ionic/Cordova: uses WebView → CORS APPLIES               │
   │ • In these cases, backend must allow CORS                  │
   └─────────────────────────────────────────────────────────────┘

✅ Pure Native Apps (Java/Kotlin/Swift):
   ┌─────────────────────────────────────────────────────────────┐
   │ • Use native HTTP clients                                   │
   │ • No browser engine                                         │
   │ • CORS policy does NOT apply                                │
   │ • Backend doesn't need to send CORS headers                 │
   └─────────────────────────────────────────────────────────────┘
```

### **How Are Native Apps Secure Without CORS?**

```
Why native apps are secure without CORS:

1. 🏖️ App Sandboxing:
   - Each app is its own isolated process
   - App A can't access App B's data
   - Internet permission must be explicitly granted

2. 🛒 App Store Review:
   - Security review before upload to Play Store/App Store
   - Malicious apps get rejected
   - Code signing — developer is verified

3. 🔒 Certificate Pinning:
   - Native apps often use SSL/TLS certificate pinning
   - Only specific certificates are accepted
   - Protects against man-in-the-middle attacks

4. 👤 User Trust:
   - User installed app = trusted it
   - Downloaded from app store = verified developer
   - Not like browser where "any website can run"
```

---

## 🔧 Code Examples — Practical Implementation

### Example 1: CORS Error Demonstration

**What we're doing:** Fetching from frontend to backend and seeing CORS error:

```javascript
// Frontend (React app on http://localhost:3000)
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// ❌ Browser Console Error:
// Access to fetch at 'http://localhost:5000/api/users' from origin 'http://localhost:3000'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

// Why? Backend didn't send CORS headers!
```

---

### Example 2: Express Server with CORS Middleware

**What we're doing:** Using **cors middleware** on Express server:

```javascript
// Backend (Node.js/Express on http://localhost:5000)
const express = require('express');
const cors = require('cors');  // npm install cors
const app = express();

// ✅ OPTION 1: Allow all origins (for development)
app.use(cors());

// ✅ OPTION 2: Allow specific origin (for production)
app.use(cors({
  origin: 'https://frontend.com',  // Only this origin allowed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow cookies/credentials
  maxAge: 86400  // Preflight cached for 24 hours
}));

// ✅ OPTION 3: Allow multiple origins
const allowedOrigins = [
  'https://frontend.com',
  'https://admin.frontend.com',
  'http://localhost:3000'  // Development
];

app.use(cors({
  origin: function (origin, callback) {
    // origin can be null (non-browser requests, like curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API routes
app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

app.post('/api/users', (req, res) => {
  res.json({ message: 'User created' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

**Key Points:**
- `cors()` middleware automatically:
  - Adds `Access-Control-Allow-Origin` header
  - Handles OPTIONS requests
  - Provides preflight caching support

---

### Example 3: Manual CORS Headers (Without Middleware)

**What we're doing:** Setting CORS headers **manually**:

```javascript
const express = require('express');
const app = express();

// CORS middleware manually
app.use((req, res, next) => {
  // Allow frontend origin
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Allowed methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Allowed headers
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Allow credentials
  res.header('Access-Control-Allow-Credentials', 'true');

  // Preflight cache (24 hours)
  res.header('Access-Control-Max-Age', '86400');

  // Expose custom headers to client
  res.header('Access-Control-Expose-Headers', 'X-Custom-Header, X-Total-Count');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  // Can also send 204 No Content
  }

  next();
});

// API routes
app.get('/api/data', (req, res) => {
  res.json({ data: 'Hello World' });
});

app.listen(5000);
```

---

### Example 4: Preflight Handling in Express

**What we're doing:** Configuring CORS for **specific routes**:

```javascript
const express = require('express');
const app = express();

// ✅ Public endpoints - allow all
app.options('/api/public/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.sendStatus(200);
});

// ✅ Protected endpoints - specific origin only
app.options('/api/protected/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// ✅ Admin endpoints - admin origin only
app.options('/api/admin/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://admin.frontend.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Key');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Actual route handlers
app.get('/api/public/data', (req, res) => {
  res.json({ data: 'Public data' });
});

app.get('/api/protected/data', (req, res) => {
  res.json({ data: 'Protected data' });
});

app.get('/api/admin/stats', (req, res) => {
  res.json({ stats: { users: 100, revenue: 50000 } });
});

app.listen(5000);
```

---

### Example 5: Nginx CORS Configuration

**What we're doing:** Setting **global CORS headers** on Nginx reverse proxy:

```nginx
# /etc/nginx/sites-available/api

server {
    listen 80;
    server_name api.example.com;

    location / {
        # Proxy to backend
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # Add CORS headers
        add_header 'Access-Control-Allow-Origin' 'https://frontend.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-Requested-With' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Max-Age' '86400' always;
        add_header 'Access-Control-Expose-Headers' 'X-Custom-Header, X-Total-Count' always;

        # Handle preflight requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://frontend.com';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-Requested-With';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Max-Age' '86400';

            # Return 204 No Content for preflight
            return 204;
        }
    }
}
```

---

## ⚠️ Common CORS Errors & Solutions

### Error 1: No 'Access-Control-Allow-Origin' Header

**Error:**
```
Access to fetch at 'https://api.example.com/data' from origin 'https://frontend.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

**Cause:** Server didn't send CORS header.

**Solution:**
```javascript
// Enable CORS on server
app.use(cors({
  origin: 'https://frontend.com'
}));

// Or manually:
res.header('Access-Control-Allow-Origin', 'https://frontend.com');
```

---

### Error 2: Credentials Mode Mismatch

**Error:**
```
The value of the 'Access-Control-Allow-Credentials' header in the response is ''
which must be 'true' when the request's credentials mode is 'include'.
```

**Cause:** Frontend used `credentials: 'include'`, but server didn't send `Access-Control-Allow-Credentials: true`.

**Solution:**
```javascript
// Server:
app.use(cors({
  origin: 'https://frontend.com',
  credentials: true  // Will send Access-Control-Allow-Credentials: true
}));

// Frontend:
fetch('https://api.example.com/data', {
  credentials: 'include'  // Will send cookies
});
```

---

### Error 3: Wildcard (*) with Credentials

**Error:**
```
The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*'
when the request's credentials mode is 'include'.
```

**Cause:** `Access-Control-Allow-Origin: *` and `Access-Control-Allow-Credentials: true` can't be used together.

**Solution:**
```javascript
// ❌ WRONG
app.use(cors({
  origin: '*',        // ❌ Wildcard
  credentials: true   // ❌ Credentials
}));

// ✅ RIGHT
app.use(cors({
  origin: 'https://frontend.com',  // Specific origin
  credentials: true
}));
```

---

### Error 4: Preflight Not Handled

**Error:**
```
Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Credentials' header is present.
```

**Cause:** Server isn't handling OPTIONS request.

**Solution:**
```javascript
// Handle OPTIONS in Express
app.options('*', cors());  // For all routes

// Or specific route:
app.options('/api/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://frontend.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});
```

---

### Error 5: Redirect Causes CORS Error

**Error:**
```
Response redirected to 'https://api.example.com/login',
which has no 'Access-Control-Allow-Origin' header.
```

**Cause:** Server redirected (3xx), but redirect response didn't have CORS headers.

**Solution:**
```javascript
// Set CORS headers before redirect
app.get('/api/protected', (req, res) => {
  if (!req.user) {
    res.set('Access-Control-Allow-Origin', 'https://frontend.com');
    return res.redirect('/login');
  }
  res.json({ data: 'Protected' });
});
```

---

## 🔒 Security Best Practices

### ✅ **DO:**

1. **Allow Specific Origins:**
```javascript
// ✅ In production, specific origins
app.use(cors({
  origin: ['https://frontend.com', 'https://admin.frontend.com'],
  credentials: true
}));
```

2. **Cache Preflight:**
```javascript
// ✅ Preflight cached for 24 hours
app.use(cors({
  maxAge: 86400  // 24 hours
}));
```

3. **Limit Allowed Methods:**
```javascript
// ✅ Only allow necessary methods
app.use(cors({
  methods: ['GET', 'POST']  // Don't allow PUT, DELETE unless needed
}));
```

4. **Limit Allowed Headers:**
```javascript
// ✅ Only allow necessary headers
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### ❌ **DON'T:**

1. **Don't use Wildcard in production:**
```javascript
// ❌ WRONG (unless it's a public API)
app.use(cors({
  origin: '*'
}));
```

2. **Don't use Wildcard + Credentials:**
```javascript
// ❌ WRONG (will never work)
app.use(cors({
  origin: '*',
  credentials: true
}));
```

3. **Don't take origin from user input:**
```javascript
// ❌ WRONG (security risk!)
app.use(cors({
  origin: req.headers.origin  // Attacker can set their own origin
}));

// ✅ RIGHT (use whitelist)
const allowedOrigins = ['https://frontend.com'];
app.use(cors({
  origin: allowedOrigins.includes(req.headers.origin) ? req.headers.origin : false
}));
```

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What is CORS and why is it needed?"

**Answer:** "CORS (Cross-Origin Resource Sharing) is a security mechanism implemented by the browser. According to the **Same-Origin Policy**, one website's JavaScript cannot access another website's resources. CORS controls this — the server can explicitly allow which origins can access its resources. It's needed because it protects against **CSRF attacks** and data theft."

### Q: "What is a preflight request?"

**Answer:** "A preflight request is an **OPTIONS request** that the browser sends before the actual request. When a request isn't 'simple' (like custom headers, non-GET/POST methods, or `application/json` Content-Type), the browser first asks the server 'Will you allow this request?' If the server responds with `Access-Control-Allow-*` headers saying yes, only then does the browser send the actual request. This is for security so the server knows what kind of requests are coming."

### Q: "What's the difference between simple and preflighted request?"

**Answer:** "**Simple Request** is one where:
- Method: GET, HEAD, or POST
- Headers: Simple headers (Accept, Content-Language, etc.)
- Content-Type: `text/plain`, `multipart/form-data`, or `application/x-www-form-urlencoded`

In a simple request, browser sends **direct request**.

**Preflighted Request** doesn't meet simple request criteria. Browser sends **OPTIONS request first**, and only sends actual request after server's response."

### Q: "How do you debug and fix CORS errors?"

**Answer:** "To debug CORS errors:
1. Check **Network tab** in Browser DevTools
2. Look at **Preflight request** (OPTIONS) — did server respond?
3. Check **Response headers** — is `Access-Control-Allow-Origin` present?
4. Read **Console error** — it tells exactly what's missing

To fix:
- Enable CORS middleware on server (`cors` package in Express)
- Allow specific origins (avoid wildcard in production)
- Set `Access-Control-Allow-Credentials: true` for credentials
- Properly handle OPTIONS requests"

### Q: "Why can't you use `*` with `Access-Control-Allow-Credentials: true`?"

**Answer:** "For security reasons. `Access-Control-Allow-Credentials: true` means browser can send cookies and credentials in cross-origin requests. If we use `Access-Control-Allow-Origin: *`, **any website** could make authenticated requests — this is a security risk. That's why browser enforces that in credentials mode, there must be a specific origin, not wildcard."

### Q: "What's the difference between development and production CORS setup?"

**Answer:** "In **development**, we can allow flexibility with `origin: '*'` or `localhost:3000`. In **production**:
1. Allow **specific origins** (avoid wildcard)
2. **Limit allowed methods** (only necessary methods)
3. **Limit allowed headers**
4. **Enable preflight cache** (`maxAge`)
5. **Enable credentials** only if needed
6. **Manage origins** through environment variables"

---

## 📝 Quick Reference (Summary)

### CORS Headers Cheat Sheet:

| Header | Direction | Purpose |
|--------|-----------|---------|
| `Origin` | Request | Client's origin |
| `Access-Control-Request-Method` | Request (Preflight) | Which method will be used |
| `Access-Control-Request-Headers` | Request (Preflight) | Which headers will be used |
| `Access-Control-Allow-Origin` | Response | Which origins are allowed |
| `Access-Control-Allow-Methods` | Response | Which methods are allowed |
| `Access-Control-Allow-Headers` | Response | Which headers are allowed |
| `Access-Control-Allow-Credentials` | Response | Are cookies allowed? |
| `Access-Control-Max-Age` | Response | Preflight cache duration |
| `Access-Control-Expose-Headers` | Response | Which headers can be exposed |

### Simple Request Conditions:

```
✅ SIMPLE REQUEST (No Preflight):
- Method: GET, HEAD, POST
- Headers: Accept, Accept-Language, Content-Language, Content-Type
- Content-Type: text/plain, multipart/form-data, application/x-www-form-urlencoded

❌ PREFLIGHT REQUIRED:
- Method: PUT, DELETE, PATCH, etc.
- Headers: Authorization, X-Custom-Header, etc.
- Content-Type: application/json, application/xml, etc.
```

### Express CORS Setup:

```javascript
// Development (allow all)
app.use(cors());

// Production (specific origins)
app.use(cors({
  origin: ['https://frontend.com', 'https://admin.frontend.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));
```

### Security Checklist:

```
✅ DO:
- Allow specific origins (whitelist)
- Limit allowed methods
- Limit allowed headers
- Enable preflight cache
- Avoid wildcard in production

❌ DON'T:
- Use wildcard (*) with credentials
- Take origin from user input
- Allow all methods (only necessary ones)
- Forget to handle preflight
```

---

## 🎉 Phase 1 Complete!

**Congratulations!** You've completed all 6 topics of **Phase 1 — The Browser & Networking**:

1. ✅ Browser Caching & Cache Headers
2. ✅ Cache Busting
3. ✅ Cache vs Database Dilemma
4. ✅ The Request Lifecycle (URL to Response)
5. ✅ Web Storage & Security
6. ✅ CORS

Now you're ready for **Phase 2 — React (The View Layer)**! 🚀

---

> **Pro Tip:** When discussing CORS in an interview, always mention **real debugging experience** — "I checked the Network tab in browser DevTools, looked at the preflight request, and fixed it by adding CORS headers on the server." This shows you know practical debugging, not just theory! 🔧

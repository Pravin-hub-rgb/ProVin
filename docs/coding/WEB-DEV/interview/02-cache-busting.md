# 🌐 Phase 1: Topic 2 - Cache Busting

> **Interview Question:** "Deployed new code, but why is the old cache showing? How do we fix it?"

---

## 💡 Beginner-Friendly Explanation (The "New Edition" Problem)

Imagine you kept a **book** in your home drawer that stays **fresh for 1 year** (we learned this in Topic 1 — `max-age=31536000`). Now suppose a **new edition** of that book came out — some pages changed. But you still have the **old copy** in your drawer!

The browser faces the same problem. If we **cache a file for 1 year** and later need a **small change** in it (like a CSS color change), the user will see the **old color for 1 year**! 😱

**To solve this problem, we use — Cache Busting!**

---

## 🛠️ How Does Cache Busting Work? (The "Name Change" Trick)

Cache busting has a simple concept:

> **Just change the file's name!** The browser will think it's a **new file** and download the new one, abandoning the old cache.

```
Before: style.css → Browser caches for 1 year
After:  style.v2.css → Browser thinks it's a new file, downloads it!
```

### Real-World Example:

```html
<!-- Before (old cache will show) -->
<link rel="stylesheet" href="style.css">

<!-- After (new version will show) -->
<link rel="stylesheet" href="style.abc123.css">
```

For the browser, `style.css` and `style.abc123.css` are **two different files**. So it downloads `style.abc123.css` fresh, even if `style.css` is cached!

---

## 🎯 Cache Busting Techniques (3 Common Methods)

### 1. Version Number (Manual)

```html
<link rel="stylesheet" href="style.v2.css">
<link rel="stylesheet" href="style.v3.css">
```

**Problem:** Version must be changed manually every time. Error-prone.

### 2. Query Parameters

```html
<link rel="stylesheet" href="style.css?v=2">
<link rel="stylesheet" href="style.css?v=3">
```

**Problem:** Some older browsers and proxies ignore query parameters and serve the cached version.

### 3. Content Hash (Best Practice ✅)

```html
<link rel="stylesheet" href="style.abc123.css">  <!-- abc123 = hash of file content -->
<link rel="stylesheet" href="style.xyz789.css"> <!-- xyz789 = new hash after change -->
```

**Benefit:**
- **Automatic** — build tools (Webpack, Vite) generate it
- **Unique** — if content changes, hash changes too
- **Reliable** — all browsers and proxies respect it

---

## 🔧 How Build Tools Do It (Webpack/Vite Example)

### Webpack Configuration:

**What we're doing:** Configure Webpack so it automatically generates a **content hash** in filenames.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  // Entry point - your main JS file
  entry: './src/index.js',

  // Output configuration
  output: {
    // [name] = name of entry point (index)
    // [contenthash] = hash of file content (changes when content changes)
    // .js = extension
    filename: '[name].[contenthash].js',  // Output: index.abc123.js

    // For static assets (images, fonts)
    // [name] = original filename
    // [hash] = content hash
    // [ext] = original extension
    assetModuleFilename: 'images/[name].[hash][ext]',  // Output: images/logo.xyz789.png

    // All files go into dist/ folder
    path: path.resolve(__dirname, 'dist'),

    // Old files from previous build get deleted automatically
    clean: true
  },

  // CSS loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  // Process CSS
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource'  // Copy images with hash
      }
    ]
  }
};
```

**Output (After build):**
```
dist/
├── index.html              ← HTML file (no hash)
├── index.abc123.js         ← Hash auto-generated from content
├── style.xyz789.css        ← Hash auto-generated from content
└── images/
    └── logo.def456.png     ← Hash auto-generated from content
```

**Key Points:**
- `[contenthash]` — hash of file content, changes when content changes
- `[chunkhash]` — hash of chunk (for multiple entry points)
- `[hash]` — build hash (same hash for all files)
- `clean: true` — old files get deleted automatically

---

### Vite Configuration:

**What we're doing:** Configure Vite so it automatically generates **hashes** in assets.

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // React plugin (if using React)
import path from 'path';

export default defineConfig({
  // React support (if React project)
  plugins: [react()],

  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',

    // Rollup options (Vite uses Rollup internally)
    rollupOptions: {
      output: {
        // Pattern for JavaScript files
        entryFileNames: `assets/[name].[hash].js`,      // index.abc123.js
        chunkFileNames: `assets/[name].[hash].js`,      // vendor.xyz789.js

        // Pattern for CSS files
        assetFileNames: `assets/[name].[hash].[ext]`,   // style.def456.css, logo.ghi789.png
      }
    },

    // Generate source maps (for debugging)
    sourcemap: true,

    // Enable minification (to reduce file size)
    minify: 'terser',

    // Terser options (JavaScript minification)
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
      }
    }
  },

  // CSS options
  css: {
    // Use CSS modules (optional)
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
});
```

**Output (After build):**
```
dist/
├── index.html
├── assets/
│   ├── index.abc123.js      ← Main JavaScript file
│   ├── vendor.xyz789.js     ← Third-party libraries (React, etc.)
│   ├── style.def456.css     ← CSS file
│   └── logo.ghi789.png      ← Image file
└── assets/
    └── index.abc123.js.map  ← Source map (for debugging)
```

**Key Points:**
- `entryFileNames` — filename pattern for main entry point
- `chunkFileNames` — filename pattern for dynamic imports/chunks
- `assetFileNames` — filename pattern for static assets (CSS, images)
- `sourcemap: true` — generates source maps for debugging
- `minify: 'terser'` — minifies JavaScript

---

### Create React App (CRA) — Default Configuration

**What we're doing:** CRA is already configured — just understand how it works.

```javascript
// CRA automatically uses these patterns (no configuration needed):
// JavaScript files: static/js/main.[contenthash].js
// CSS files: static/css/main.[contenthash].css
// Images: static/media/logo.[hash].[ext]
```

**Output (After build):**
```
build/
├── index.html
├── static/
│   ├── js/
│   │   ├── main.abc123.js
│   │   └── main.abc123.js.map
│   ├── css/
│   │   ├── main.xyz789.css
│   │   └── main.xyz789.css.map
│   └── media/
│       └── logo.def456.png
└── favicon.ico
```

**Key Points:**
- CRA generates hashes automatically
- Source maps are also generated automatically
- No configuration needed — just `npm run build`

---

### HTML Generation — Replacing the Hash

**What we're doing:** Build tools automatically inject **hashed filenames** into the HTML file.

```html
<!-- Before Build (Source HTML) -->
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <!-- Build tool will replace this with hashed filename -->
</head>
<body>
  <div id="root"></div>
  <!-- Build tool will inject the script tag here -->
</body>
</html>
```

```html
<!-- After Build (Generated HTML) -->
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <!-- Hash auto-injected by build tool -->
  <link href="/static/css/main.xyz789.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <!-- Hash auto-injected by build tool -->
  <script src="/static/js/main.abc123.js"></script>
</body>
</html>
```

**How it happens:**
- **Webpack:** `HtmlWebpackPlugin` automatically generates HTML
- **Vite:** Built-in HTML handling with `index.html` as entry point
- **CRA:** Pre-configured `HtmlWebpackPlugin`

**Example with HtmlWebpackPlugin (Webpack):**
```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ... other config
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Source HTML
      filename: 'index.html',         // Output HTML
      inject: 'body',                 // Inject scripts at end of body
      minify: {
        removeComments: true,         // Remove comments
        collapseWhitespace: true      // Remove extra spaces
      }
    })
  ]
};
```

---

## 🎙️ Interview Articulation (How to Answer)

### Q: "What is cache busting? Why is it needed?"

**Answer:** "Sir, cache busting is a technique that ensures users don't see the old cached version after new code is deployed. We change the file name (like from `style.css` to `style.abc123.css`), so the browser treats it as a new file and downloads it. This is needed because we cache static assets long-term (up to 1 year), and if an urgent change is needed, users should see the latest version immediately."

### Q: "Content hash vs version number — which is better?"

**Answer:** "Content hash is more reliable. Version number must be changed manually and is error-prone. Content hash is generated automatically based on file content — if content changes, the hash changes too. Build tools like Webpack and Vite do this automatically."

### Q: "Can we use query parameters for cache busting?"

**Answer:** "Technically yes, but it's not best practice. Some older browsers and proxies ignore query parameters and serve the cached version. Filename-based cache busting (content hash) is more reliable."

### Q: "If only a small CSS change is needed, will the whole file be re-downloaded?"

**Answer:** "Yes, that's a limitation. But the benefit is a guarantee that users see the latest version. And since we use gzip/brotli compression, file size is quite small. The trade-off is worth it for consistency."

### Q: "How do you handle cache busting with a CDN?"

**Answer:** "Same approach works with CDN. We set `Cache-Control: public, max-age=31536000, immutable` for versioned assets. The CDN also caches them, and when we change the filename (hash changes), the CDN fetches the new version from the origin server."

---

## ⚠️ Common Pitfalls & Solutions

### Problem 1: HTML File Not Cached Properly

**Scenario:** JS/CSS filenames changed, but HTML still has old references!

```html
<!-- Old reference in HTML -->
<script src="app.abc123.js"></script>

<!-- New version deployed -->
<script src="app.xyz789.js"></script>
```

**Solution:** Don't cache HTML, or give it a **short cache**:

```http
Cache-Control: no-cache, must-revalidate
```

Or use **Server-Side Rendering** that generates fresh HTML every time.

### Problem 2: Old Cache Still Showing After Build

**Scenario:** Build succeeded, filenames changed, but CDN still serves old cache!

**Solution:**
1. **Purge CDN** (option available in Cloudflare, CloudFront)
2. **Use versioned URLs** that automatically force CDN to refresh
3. **Use cache invalidation** strategies

### Problem 3: Multiple Deployments

**Scenario:** Multiple deployments daily — new hash every time — cache never gets used!

**Solution:**
1. **Chunk splitting** — separate common code from changing code
2. **Long-term caching** only for stable libraries
3. **Short cache** for runtime code

---

## 📝 Quick Reference (Summary)

### Cache Busting Techniques:

| Technique | Example | Pros | Cons |
|-----------|---------|------|------|
| **Version Number** | `style.v2.css` | Simple | Manual, error prone |
| **Query Params** | `style.css?v=2` | Easy | Some proxies ignore |
| **Content Hash** | `style.abc123.css` | Automatic, reliable | Best practice ✅ |

### Build Tools Output:

| Tool | Filename Pattern | Example |
|------|------------------|---------|
| **Webpack** | `[name].[contenthash].js` | `app.abc123.js` |
| **Vite** | `assets/[name].[hash].js` | `assets/main.xyz789.js` |
| **Create React App** | `static/js/[name].[chunkhash].js` | `static/js/main.def456.js` |

### Recommended Headers:

| Resource | Cache-Control | Cache Busting |
|----------|---------------|---------------|
| **HTML** | `no-cache` | N/A (always fresh) |
| **JS/CSS (versioned)** | `public, max-age=31536000, immutable` | Content hash |
| **Images (versioned)** | `public, max-age=31536000, immutable` | Content hash |
| **API responses** | `private, no-cache` | N/A (dynamic) |

---

## 🚀 Next Steps

Now you're ready for **Topic 3: Cache vs Database Dilemma**! This is a favorite architecture question in interviews — "If cache is so fast, why not store everything in cache?"

---

> **Pro Tip:** When discussing cache busting in an interview, always mention the **build process** — "We use Webpack/Vite which automatically generates content hashes" — this shows you know practical implementation too! 💡

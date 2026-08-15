4.6.8 mein redirect practically kiya — URL badal ke `/login` bheja. Ab dusra tool: **`rewrite()`** — jisme URL **nahi badalta** aur content badal jaata hai. Pehli baar mein yeh odd lagega ("content change karo par URL wahi — kyun?"), par do real use-cases aaj milenge: **A/B testing** aur **maintenance page**. 4.6.7 mein rewrite ka overview tha — ab asli code.

---

## Rewrite Kya Hai — 30 Second Recap

```ts
NextResponse.rewrite(new URL("/home-v2", request.url))
```

Browser `/home` request karta hai → proxy isse `/home-v2` ke content pe bhejta hai → browser ko **wahi `/home` URL** dikhta hai, content home-v2 ka. Browser ko pata hi nahi chalta ki usne doosri jagah se content liya.

**Redirect se fark ek sentence mein:** redirect browser ko naya URL load karne bolta hai (URL badalta hai), rewrite server-side hi content swap karta hai (URL wahi).

---

## Step 1 — A/B Testing (Practical Use Case)

**Scenario:** Home page ka do versions hai — `/home` (purana) aur `/home-v2` (naya design). 50% users ko naya dikhana hai, 50% ko purana — test ke liye.

Do pages banao:

`app/home/page.tsx`:

```tsx
export default function Home() {
  return <h1>Home (V1 — purana)</h1>
}
```

`app/home-v2/page.tsx`:

```tsx
export default function HomeV2() {
  return <h1>Home V2 (naya design)</h1>
}
```

Ab proxy mein 50/50 split:

```ts
import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === "/home") {
    const showV2 = Math.random() < 0.5
    if (showV2) {
      return NextResponse.rewrite(new URL("/home-v2", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
```

- `Math.random() < 0.5` — 50% chance true (Math.random 0–1 ke beech random number deta hai — 3.x mein dekha tha).
- `showV2` true → rewrite `/home-v2` — content naya, URL wahi `/home`.
- false → `next()` — purana `/home` render.

**Test:** `/home` baar-baar refresh karo — kabhi "Home (V1)" kabhi "Home V2" — URL bar mein hamesha `/home` hi rahega.

> **Yahi rewrite ka point hai:** agar redirect use karte, toh browser URL `/home-v2` dikhata — user ko pata chalta ki naya version hai, aur analytics bias ho jaata. Rewrite se URL consistent — test clean.

---

## Step 2 — Maintenance Page (Dusra Use Case)

**Scenario:** Site under maintenance — sab requests ko maintenance page dikhana hai. Redirect use karo toh URL `/maintenance` ho jaata — aur user refresh pe wapas original URL pe jaake fail hoga. Rewrite se har URL pe maintenance content, URL wahi.

`app/maintenance/page.tsx`:

```tsx
export default function Maintenance() {
  return (
    <main>
      <h1>Site Under Maintenance</h1>
      <p>Kal wapas aana — kaam chal raha hai.</p>
    </main>
  )
}
```

`proxy.ts` (temporary — maintenance khatam pe hata do):

```ts
import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/maintenance", request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|maintenance).*)"],
}
```

**Notice karo matcher mein `maintenance` kyun?** — 4.6.8 wala loop rule: rewrite bhi **redirect jaisa hi loop** bana sakta hai — `/maintenance` ko bhi rewrite kar diya toh maintenance page khud maintenance pe... `.` matcher mein exclude karo jis URL pe rewrite kar rahe ho.

**Test:** koi bhi URL kholo — `/`, `/about`, `/dashboard` — sab pe maintenance page, sab URL wahi dikhega.

---

## Rewrite vs Redirect — Final Comparison

Ab dono practically ho gaye — table samajhne mein aasan:

| | Redirect | Rewrite |
|---|---|---|
| URL | **Badal jaata hai** | Wahi rehta hai |
| Browser ko pata chalta? | Ha (naya page load hota) | Nahi (content silently swap) |
| Status | 307 | 200 (normal) |
| Kab? | Login flow, route moved | A/B test, maintenance, content swap |
| Loop risk | Jis page pe redirect → matcher se exclude | **Same rule** |

---

## What It Is NOT

- **Rewrite = "hijack" nahi** — malintent nahi hai; legitimate use cases hain (A/B, maintenance). URL wahi rehna ka fayda hai — user ko consistent experience.
- **Rewrite sirf pages ke liye nahi** — kisi bhi route pe kaam karta hai. (4.6.14 mein geo blocking ke liye bhi use hoga.)
- **Rewrite = Server-Side Redirect (next.config `redirects()`) nahi** — woh config-level hai, build-time/request-time par alag taur pe; proxy rewrite request-time hai aur conditions logic se aati hai. Abhi scope se bahar — mention just in case.
- **`Math.random()` wala A/B production-ready nahi** — real A/B testing mein deterministic assignment chahiye (user ke liye consistent version — cookies/feature flags). Learning ke liye random theek hai, concept dikhata hai.

## Common Mistakes

- **Rewrite target ko matcher se exclude bhoolna** — `/maintenance` rewrite pe loop (4.6.8 ka wahi rule, rewrite ke saath bhi).
- **Redirect wali jagah rewrite use karna** — login flow mein URL badalna zaroori hai (user ko `/login` dikhna chahiye) — wahan rewrite galat hoga.
- **Rewrite ke baad bhi code continue karna** — `return` pehle se hai, `next()` unreachable na ho (4.6.8 wala return pattern).
- **A/B wala random `next()` fallback bhoolna** — agar `showV2` false pe kuch return na karo → hang. Har branch return.

## Nutshell

`NextResponse.rewrite(new URL("/target", request.url))` — URL wahi, content target route ka. A/B testing (50/50 split) aur maintenance page (sab pe rewrite) — do solid use cases. Rule: rewrite target ko matcher se exclude (loop). Redirect = URL badlo, rewrite = content badlo.

---

**In Your Own Words**

1. Rewrite mein URL kyun nahi badalta — A/B testing ke context mein yeh kyun important hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Rewrite server-side content swap hai — browser ko pata nahi chalta ki content `/home-v2` se aaya. A/B testing mein yeh zaroori hai: agar redirect use karte toh browser URL bar mein `/home-v2` dikhata — user jaanta ki naya version hai, jisse uska behavior/feedback biased ho sakta hai, aur analytics mein bhi ganda data aata. Rewrite se URL hamesha `/home` — user ko consistent experience, test data clean.

</details>

2. Maintenance page mein rewrite redirect se kyun better hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Redirect se browser `/maintenance` pe chala jaata — URL badal jaata. User wahan se wapas original URL type kare toh phir redirect... aur baad mein maintenance khatam hone pe bhi redirect hata nahi toh purane URLs pe wrong chizein. Rewrite se har URL pe maintenance content dikhta hai, URL wahi — user ko lagta hai site abhi bhi wahi hai bas andar maintenance hai. Cleaner + ek hi jagah (proxy) se toggle karke hatao.

</details>

3. Rewrite target ko matcher mein `|maintenance` se kyun exclude karte hain — kya loop hota hai?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Agar `/maintenance` pe bhi proxy ka rewrite chalta, toh `/maintenance` ki request khud `/maintenance` pe rewrite ho jaati — phir se proxy — phir se rewrite — infinite loop (4.6.8 wala same rule, rewrite ke saath bhi). Matcher mein exclude karne se target URL pe proxy chalta hi nahi — rewrite ek baar hota hai, loop nahi. Jis URL pe redirect/rewrite kar rahe ho, use hamesha exclude.

</details>

4. Redirect vs rewrite — kaunsa kab? Do decision rules do.

<details>
<summary>Show Answer</summary>

**Sample Answer:** Rule 1: User ko URL change **dikhaana** hai — jaise login flow (`/dashboard` → `/login`, user ko pata hona chahiye ki login pe hai) — redirect. Rule 2: Content **silently** change karna hai — URL wahi rehna chahiye (A/B test, maintenance) — rewrite. General hint: URL change user ko mile toh redirect, nahi toh rewrite. (Route permanently moved jaisi cheezein bhi redirect hain.)

</details>

5. `Math.random() < 0.5` wala A/B split production-ready kyun nahi — kya better hota?

<details>
<summary>Show Answer</summary>

**Sample Answer:** Random split har request pe decide karta hai — same user refresh pe kabhi V1 kabhi V2 dekh sakta hai, inconsistent experience + biased analytics. Production A/B deterministic assignment use karta hai — user ko cookie/feature flag se ek fixed version assign karo (user A hamesha V2), groups ko properly split karke track karo. Random sirf concept demo ke liye hai — asli split controlled + consistent hona chahiye.

</details>

---

Response banana complete — next, redirect, rewrite teeno practical ho gaye. Ab **response mein kuch aur add karna**: 4.6.10 mein `response.headers.set()` se custom headers (aur `cookies.set()`), phir **`headers()` API se Server Component mein usko read karna** — ek cheez jo pehle impossible thi: layout ko pathname ka pata chala.
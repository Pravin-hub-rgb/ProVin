# React Interview Questions & Concepts (2026) — 100 Q&A

Deep-researched, organized by topic. Har section basics se advanced/2026-level (React 19) tak jaata hai. Ratta mat maaro — concept samjho, phir apne words mein explain karna practice karo.

---

## 1. React Fundamentals

**1. React kya hai aur kyu use karte hain?**
React ek JavaScript library hai (framework nahi) jo Meta ne banaya, UI banane ke liye — component-based architecture ke through. Reusable components, declarative UI, aur Virtual DOM ki wajah se fast updates deta hai.

**2. Library vs Framework — React kaunsa hai?**
React library hai kyunki ye sirf UI layer handle karta hai — routing, state management, HTTP calls ke liye external tools (React Router, Redux, Axios) chahiye. Framework (jaise Angular) opinionated hota hai aur sab kuch built-in deta hai.

**3. Virtual DOM kya hai?**
Real DOM ka lightweight in-memory copy. State/props change hone par React pehle Virtual DOM update karta hai, phir previous version se diff (reconciliation) karke sirf changed parts real DOM mein update karta hai — isse expensive DOM operations kam hote hain.

**4. Reconciliation kya hai?**
Ye algorithm hai jisse React purane aur naye Virtual DOM tree ko compare karta hai (diffing) aur minimum operations mein real DOM ko sync karta hai. Same-type elements ko reuse karta hai, keys ke through list items ko track karta hai.

**5. React Fiber kya hai?**
React ka reconciliation engine (React 16 se). Rendering work ko chhote units mein todkar interruptible banata hai, jisse high-priority updates (jaise user input) low-priority updates (jaise data fetch render) ko block nahi karte — concurrent rendering ka foundation.

**6. JSX kya hai?**
JavaScript XML — HTML jaisi syntax jo JS ke andar likhi jaati hai. Babel isse `React.createElement()` calls mein compile karta hai. Browser JSX ko directly samajh nahi sakta.

**7. Ek component se multiple root elements kaise return karein?**
Fragment use karo: `<React.Fragment>` ya shorthand `<>...</>`. Ye extra DOM node add kiye bina multiple children group karta hai.

**8. Controlled vs Uncontrolled components?**
Controlled: form input ki value React state se control hoti hai (`value` + `onChange`). Uncontrolled: DOM khud value maintain karta hai, `ref` se access karte hain. Controlled predictable hote hain, uncontrolled simple/legacy code ke liye kaam aate hain.

**9. Keys list rendering mein kyu zaroori hain?**
Keys React ko batate hain ki list mein kaunsa item add/remove/reorder hua — isse reconciliation efficient hota hai aur wrong component state reuse nahi hota. Index ko key banana risky hai jab list reorder/filter ho sakti hai.

**10. Props vs State?**
Props: parent se child ko pass hone wale read-only inputs. State: component ke andar manage hone wala mutable data jo re-render trigger karta hai. Props immutable hote hain child ke perspective se, state mutable hota hai (via setter).

**11. Unidirectional data flow kya hai?**
React mein data sirf parent → child flow karta hai (props ke through). Child parent ka data directly modify nahi kar sakta — callback functions pass karke "lift state up" karte hain taaki child parent ko update trigger kar sake.

**12. React element vs component?**
Element ek plain object hai jo describe karta hai UI mein kya render hona chahiye (immutable, lightweight). Component ek function/class hai jo elements return karta hai — reusable blueprint.

**13. Synthetic Events kya hain?**
React ka cross-browser wrapper native DOM events ke upar, jo consistent API deta hai sab browsers mein. React 17+ mein events root container par attach hote hain (event delegation), document par nahi.

**14. React mein `key` prop se related common mistake?**
Array index ko key banana jab items reorder/add/delete ho sakte hain — isse stale state/UI bugs aate hain kyunki React wrong instance ko reuse kar leta hai. Stable unique ID use karo.

**15. dangerouslySetInnerHTML kya hai aur risk kya hai?**
Raw HTML string ko directly DOM mein inject karne ka tarika. XSS (cross-site scripting) attack ka risk hota hai agar user-generated content sanitize kiye bina render kiya jaaye.

---

## 2. Components, Props & Lifecycle

**16. Functional vs Class components?**
Functional: plain JS function jo JSX return karta hai, Hooks se state/lifecycle handle karta hai — modern standard. Class: ES6 class jo `render()` method aur lifecycle methods use karta hai — legacy approach, ab rarely likha jaata hai.

**17. Class component lifecycle phases kya hain?**
Mounting (`constructor`, `render`, `componentDidMount`), Updating (`shouldComponentUpdate`, `render`, `componentDidUpdate`), Unmounting (`componentWillUnmount`). `componentDidCatch` error handling ke liye.

**18. `useEffect` class lifecycle methods ko kaise replace karta hai?**
Empty dependency array `[]` ≈ `componentDidMount`. Dependency array mein values ≈ `componentDidUpdate` (un values ke change hone par). Return cleanup function ≈ `componentWillUnmount`.

**19. Props drilling kya hai aur iska solution?**
Jab props ko deeply nested components tak pass karna padta hai sirf intermediate components ke through pass-through karne ke liye. Solution: Context API, ya state management library (Redux, Zustand), ya component composition.

**20. Children prop kaise kaam karta hai?**
`props.children` automatically wo content hold karta hai jo component tags ke beech likha jaata hai — `<Wrapper><p>Hello</p></Wrapper>` mein `<p>` `children` ban jaata hai. Layout/wrapper components banane ke liye useful.

**21. defaultProps ka purpose?**
Prop na milne par fallback value deta hai. Functional components mein ab default parameter values (`function Comp({ name = "Guest" })`) more common hain kyunki `defaultProps` deprecated ho raha hai.

**22. PropTypes kya karta hai?**
Runtime type-checking library jo dev mode mein warn karti hai agar galat prop type pass ho. TypeScript is production mein zyada reliable alternative hai (compile-time checking).

**23. Pure Components kya hote hain?**
`React.PureComponent` (class) ya `React.memo` (function) — shallow comparison karke props/state same hone par re-render skip karte hain. Performance optimization ke liye, lekin deep/nested objects ke saath careful rehna padta hai.

**24. Higher-Order Component (HOC) kya hai?**
Function jo ek component leta hai aur enhanced component return karta hai — `withAuth(Component)` jaisa pattern. Logic reuse ke liye purana pattern, ab hooks/custom hooks isse replace kar chuke hain zyada tar cases mein.

**25. Render Props pattern kya hai?**
Component apna logic ek function prop ke through expose karta hai jo JSX return karti hai — `<DataProvider render={data => <UI data={data} />} />`. HOC ka alternative, ab custom hooks usually cleaner hote hain.

---

## 3. Hooks — Core

**26. useState kaise kaam karta hai?**
`const [state, setState] = useState(initial)` — current value aur updater function return karta hai. Setter call karne se re-render trigger hota hai; state updates asynchronous/batched ho sakte hain.

**27. Functional updates (`setState(prev => ...)`) kab use karein?**
Jab naya state purane state par depend karta ho, especially multiple updates ek saath ho rahi ho ya closures stale value capture kar sakte hon — functional form latest state guarantee karta hai.

**28. useEffect kya karta hai aur dependency array kaise kaam karta hai?**
Side effects (data fetching, subscriptions, DOM manipulation) render ke baad run karta hai. No array = har render pe chalta hai; `[]` = sirf mount pe; `[dep1, dep2]` = jab dependencies change hon tab chalta hai.

**29. useEffect cleanup function kab zaroori hai?**
Jab subscription, timer, event listener, ya socket connection setup kiya ho — memory leaks aur stale references avoid karne ke liye return statement mein cleanup dena chahiye.

**30. useEffect vs useLayoutEffect?**
`useEffect` browser paint hone ke baad asynchronously chalta hai. `useLayoutEffect` synchronously, paint se pehle chalta hai — DOM measurements (layout thrashing avoid karne) ke liye use hota hai jaha visible flicker avoid karna ho.

**31. useContext kya karta hai?**
Context se value directly consume karne deta hai bina `<Context.Consumer>` wrapper ke. Props drilling avoid karne ka clean tarika — theming, auth, locale jaise global data ke liye.

**32. useRef ke use cases?**
(a) DOM element ko directly access karna (`ref.current`), (b) mutable value store karna jo re-render trigger na kare (jaise interval ID, previous value track karna).

**33. useMemo kya karta hai?**
Expensive computation ka result memoize (cache) karta hai jab tak dependencies change na hon — unnecessary recalculation avoid karta hai render ke beech.

**34. useCallback kya karta hai?**
Function reference ko memoize karta hai — jab tak dependencies same hain, same function instance return karta hai. Child components ko unnecessary re-render se bachane ke liye useful (especially `React.memo` ke saath).

**35. useMemo vs useCallback mein difference?**
`useMemo` computed value memoize karta hai, `useCallback` function definition memoize karta hai. Actually `useCallback(fn, deps)` = `useMemo(() => fn, deps)` — same underlying mechanism.

**36. useReducer kab use karna chahiye?**
Jab state logic complex ho, multiple sub-values involve hon, ya next state previous state + action par depend kare — Redux jaise reducer pattern. `useState` ka scalable alternative complex state ke liye.

**37. Custom Hooks kya hote hain?**
`use` prefix wale functions jo built-in hooks compose karke reusable stateful logic banate hain (jaise `useFetch`, `useLocalStorage`). Logic reuse karte hain bina component hierarchy change kiye — HOC/render props ka modern replacement.

**38. Rules of Hooks kya hain?**
(1) Hooks sirf top level pe call karo — loops/conditions/nested functions ke andar nahi. (2) Hooks sirf React function components ya custom hooks ke andar call karo. Ye rules React ko hooks ka consistent call order track karne dete hain.

**39. useId hook ka purpose?**
Unique, stable IDs generate karta hai jo server aur client render ke beech match karein (SSR-safe) — form labels/accessibility attributes ke liye, `Math.random()` jaise approaches ko replace karta hai jo hydration mismatch cause karte the.

**40. useTransition kya karta hai?**
State update ko "non-urgent" (transition) mark karta hai taaki urgent updates (jaise typing) block na ho. `isPending` flag deta hai jisse loading UI dikha sakte ho jab tak transition complete na ho.

**41. useDeferredValue kya karta hai?**
Ek value ka "deferred" version deta hai jo lag ke saath update hota hai — expensive re-renders (jaise large list filtering) ko urgent UI updates se block hone se rokta hai.

---

## 4. State Management & Context

**42. Context API kab use karna chahiye vs Redux/Zustand?**
Context simple, infrequently-changing global data (theme, auth user, locale) ke liye achha hai. Frequent updates, complex state logic, ya devtools/middleware chahiye toh Redux/Zustand/Jotai jaisi library better hai — Context har consumer ko re-render karta hai on change.

**43. Context re-render performance problem kaise solve karein?**
Context ko split karo (alag-alag concerns ke liye alag providers), memoize karo provider value (`useMemo`), ya state management library use karo jo selective subscriptions support kare.

**44. Redux ka core flow kya hai?**
Single store → Actions (jo describe karte hain kya hua) → Reducers (pure functions jo naya state return karte hain) → Store update → Components re-render via `useSelector`/`connect`.

**45. Redux Toolkit (RTK) purane Redux se better kyu hai?**
Boilerplate kam karta hai — `createSlice`, built-in Immer (mutable-looking syntax se immutable updates), `configureStore` with sensible defaults, RTK Query for data fetching/caching.

**46. Prop drilling vs Context vs global state library — kab kya?**
2-3 levels tak props theek hain. Deeper/cross-cutting concerns ke liye Context. App-wide complex state, time-travel debugging, middleware chahiye toh Redux/Zustand jaisi library.

**47. Zustand ya Jotai jaise lightweight state managers Redux se kaise alag hain?**
Kam boilerplate, no providers mandatory (Zustand), atomic state model (Jotai), simpler API — bade apps mein bhi kaafi popular ho gaye hain 2026 tak kyunki Redux jitna ceremony nahi chahiye hota.

---

## 5. Performance Optimization

**48. React app ko re-renders se optimize kaise karein?**
`React.memo` for components, `useMemo`/`useCallback` for expensive values/functions, state ko sahi level pe rakho (colocate state), list virtualization, code splitting.

**49. Code Splitting kya hai aur kaise karte hain?**
App ka bundle chhote chunks mein todna jo on-demand load hon. `React.lazy(() => import('./Component'))` + `<Suspense>` se route/component-level splitting karte hain — initial load time kam hota hai.

**50. React.lazy aur Suspense kaise kaam karte hain saath mein?**
`React.lazy` dynamically import karta hai component ko. `<Suspense fallback={<Loader/>}>` uska wrapper hai jo loading state dikhata hai jab tak lazy component load nahi ho jaata.

**51. List virtualization kya hai?**
Sirf visible (viewport ke andar) items render karna instead of pura large list — `react-window`/`react-virtualized` jaisi libraries use hoti hain. Hazaaron rows wale tables/lists ke liye performance critical.

**52. Unnecessary re-renders kaise debug karein?**
React DevTools Profiler use karo (highlight updates), `why-did-you-render` library, ya console logs component render count ke saath. Common causes: inline object/array/function props, missing memoization, Context misuse.

**53. React Compiler (React 19) kya karta hai?**
Build-time tool jo automatically memoization (`useMemo`/`useCallback`/`React.memo` jaisa kaam) apply karta hai bina manually likhe — component code analyze karke smart re-render skipping generate karta hai, jisse manual memoization ki zaroorat kaafi kam ho jaati hai.

**54. Debouncing vs Throttling — React mein kab use karein?**
Debounce: rapid-fire events (search input typing) ke baad ek gap ke baad hi function chalao. Throttle: fixed interval par max ek baar chalao (scroll/resize events). Dono expensive operations (API calls, re-renders) limit karte hain.

**55. Concurrent Rendering ka fayda kya hai?**
React ko render work ko interrupt/pause/resume karne deta hai priority ke hisaab se — high-priority updates (input typing) low-priority updates (large list render) ko block nahi karte, UI responsive rehta hai.

---

## 6. Forms, Events & Refs

**56. Controlled form input ka basic pattern?**
`<input value={state} onChange={e => setState(e.target.value)} />` — value React state se aati hai, har keystroke pe state update hoti hai, jo re-render trigger karti hai.

**57. forwardRef kis liye hota hai?**
Parent component ko child ke andar ke DOM node/ref tak access dene ke liye jab child ek custom (non-DOM) component ho. `React.forwardRef((props, ref) => ...)`.

**58. useImperativeHandle kya karta hai?**
`forwardRef` ke saath use hota hai — parent ko sirf specific methods/properties expose karta hai (poora DOM node nahi), ref ke through custom "imperative API" banane ke liye.

**59. Event delegation React mein kaise implement hota hai?**
React 17+ mein sab events root DOM container par ek hi listener se attach hote hain (na ki document par), jo memory efficient hai aur multiple React versions ko same page pe coexist karne deta hai.

**60. e.preventDefault() aur e.stopPropagation() ka difference?**
`preventDefault()` browser ka default behavior rokta hai (jaise form submit pe page reload). `stopPropagation()` event ko parent elements tak bubble hone se rokta hai.

---

## 7. Error Handling & Testing

**61. Error Boundaries kya hain?**
Class components (`componentDidCatch`/`getDerivedStateFromError`) jo apne child tree mein JS errors catch karte hain aur fallback UI dikhate hain instead of poori app crash hone ke. Hooks se error boundary nahi ban sakta abhi tak.

**62. Error Boundaries kya catch NAHI karte?**
Event handlers ke errors, async code (setTimeout, promises), server-side rendering errors, aur error boundary khud ke andar ke errors — inke liye try/catch manually use karna padta hai.

**63. React Testing Library ki philosophy kya hai?**
"Test the way users use your app" — implementation details (internal state) test karne ke bajaye DOM output aur user interactions (`getByRole`, `fireEvent`) test karo, jisse tests refactor-resistant rehte hain.

**64. Jest vs React Testing Library — role kya hai dono ka?**
Jest test runner + assertion library hai (test files chalata hai, `expect()` deta hai). React Testing Library components ko render karne aur DOM query/interact karne ke utilities deti hai — dono saath use hote hain.

**65. Snapshot testing kya hai aur risk kya hai?**
Component output ko ek saved "snapshot" se compare karta hai. Risk: over-reliance se developers bina check kiye snapshots update karne lagte hain jab UI change ho — false confidence de sakta hai.

---

## 8. Routing (React Router)

**66. React Router mein client-side routing kaise kaam karti hai?**
Browser History API (`pushState`) use karke bina full page reload ke URL change karta hai aur matching component render karta hai — SPA navigation feel deta hai.

**67. `<Link>` vs `<a>` tag — difference kya hai routing mein?**
`<Link>` client-side navigation karta hai (page reload nahi), History API use karta hai. `<a>` full page reload trigger karta hai jo SPA state reset kar deta hai.

**68. Nested Routes aur `<Outlet>` kya hote hain?**
Nested routes parent layout ke andar child routes render karne dete hain. `<Outlet>` wo placeholder hai jaha matched child route render hoti hai parent layout ke andar.

**69. Dynamic/protected routes kaise implement karte hain?**
Dynamic: `path="/user/:id"` + `useParams()` se value read karo. Protected: wrapper component jo auth check kare aur agar unauthenticated ho toh `<Navigate to="/login" />` redirect kare.

---

## 9. React 19 & Modern Patterns

**70. Server Components (RSC) kya hain?**
Components jo server par render hote hain aur sirf resulting HTML/data client ko bhejte hain — client-side JS bundle chhota hota hai, direct backend/database access possible hota hai bina API layer ke. Interactivity (event handlers) inke andar nahi ho sakti.

**71. Server Components vs Client Components?**
Server Components (`'use server'` ya default in Next.js App Router) — no interactivity, no hooks, smaller bundle. Client Components (`'use client'`) — interactive, hooks/state/effects use kar sakte hain, browser mein hydrate hote hain.

**72. React 19 Actions kya hain?**
Async functions jo form submissions/mutations handle karte hain, automatically pending/error/optimistic states manage karte hain — `useActionState`, `useOptimistic` ke saath integrate hote hain, manual loading-state boilerplate khatam karte hain.

**73. useActionState hook kya karta hai?**
Form action ke result, pending state, aur error ko track karta hai ek hi hook mein — multiple `useState` (loading, error, data) ki zaroorat khatam karta hai.

**74. useOptimistic hook kya karta hai?**
Async action complete hone se pehle hi UI ko "predicted" final state dikhata hai (jaise like button turant fill ho jaana), action fail hone par automatically revert kar deta hai.

**75. `use` hook kya hai aur kaise alag hai baaki hooks se?**
Promise ya Context ko render ke andar read karne deta hai — Suspense ke saath integrate hota hai (promise resolve hone tak component suspend karta hai). Unlike other hooks, ye conditionally bhi call ho sakta hai (loops/if statements ke andar).

**76. Server Actions kya hote hain?**
`'use server'` directive wale async functions jo directly client se call ho sakte hain (form action ya event handler ke through) bina manually API route banaye — React RPC layer khud handle karta hai.

**77. Hydration kya hai?**
Server-rendered static HTML ko client-side par React "activate" karta hai — event listeners attach karke usse interactive banata hai bina dobara HTML render kiye. React 19 mein hydration mismatches better report hote hain aur partial/streaming hydration improve hui hai.

---

## 10. Architecture, Patterns & Miscellaneous

**78. Compound Components pattern kya hai?**
Multiple components jo saath mein kaam karte hain shared implicit state ke saath (jaise `<Select><Select.Option/></Select>`), usually Context ke through communicate karte hain — flexible, composable APIs banata hai.

**79. Container/Presentational pattern kya hai?**
Container components logic/data handle karte hain, presentational components sirf UI render karte hain (props leke). Hooks ke aane ke baad ye pattern kam strict follow hota hai, but concept (concerns separate karna) abhi bhi relevant hai.

**80. React mein memoization ke traps kya hain?**
Inline objects/arrays/functions har render pe naya reference banate hain, jisse `React.memo` fail ho jaata hai (shallow comparison). Over-memoization bhi bura hai — unnecessary complexity aur memory overhead add karta hai without real benefit.

**81. Composition vs Inheritance — React mein kya prefer karte hain?**
React composition prefer karta hai (children/props ke through behavior combine karna) inheritance ke bajaye — flexible, loosely-coupled components milte hain. Official React docs explicitly composition recommend karte hain.

**82. Portal kya hota hai React mein?**
`ReactDOM.createPortal(child, domNode)` — component ko parent DOM hierarchy se bahar kisi aur DOM node mein render karne deta hai (modals, tooltips) jabki React tree/event bubbling logically same rehta hai.

**83. Strict Mode kya karta hai?**
Development-only wrapper jo potential problems detect karne ke liye components ko double-render karta hai, deprecated APIs warn karta hai, aur side-effects ke liye extra checks lagata hai — production build mein koi effect nahi hota.

**84. Immutability React mein kyu important hai?**
State ko directly mutate karne se React change detect nahi kar pata (reference same rehta hai) — isliye naya object/array banakar update karna padta hai taaki re-render trigger ho aur predictable state history mile.

**85. `key` prop change karne se component ka kya hota hai?**
Agar key change ho jaaye, React usse completely naya component treat karta hai — purana unmount, naya mount hota hai (state reset ho jaata hai). Ye intentionally component "reset" karne ke liye trick use hoti hai.

**86. React mein memory leaks kaise hote hain aur kaise avoid karein?**
Unmounted component par state set karna, cleanup na kiye event listeners/timers/subscriptions — `useEffect` cleanup function se in sab ko properly unsubscribe/clear karo.

**87. Suspense sirf lazy loading ke liye hai ya aur bhi kuch?**
Sirf `React.lazy` nahi — data fetching (frameworks/libraries ke saath jo Suspense support karte hain), aur React 19 mein `use()` hook ke saath promises resolve karne ke liye bhi use hota hai.

**88. React mein "lifting state up" kab karna chahiye?**
Jab do ya zyada sibling components ko same data share/sync karna ho — state ko unke closest common parent mein move karo aur props/callbacks ke through pass karo.

**89. Batching kya hai React mein?**
Multiple `setState` calls ko ek single re-render mein combine karna performance ke liye. React 18+ mein automatic batching sab jagah hoti hai (promises, setTimeout, native event handlers ke andar bhi) — pehle sirf React event handlers mein hoti thi.

**90. React mein "single source of truth" principle kya hai?**
Har piece of state ka ek hi authoritative owner hona chahiye component tree mein — duplicate/derived state avoid karo, instead existing state se compute karo taaki data inconsistency na ho.

**91. Derived state anti-pattern kya hai?**
Props se state copy karna `useState` mein aur phir manually sync karna — bugs cause karta hai jab props change hote hain but state stale reh jaata hai. Better: seedha props se compute karo render ke time, ya `key` prop se component reset karo.

**92. React 19 mein ref cleanup functions kya hain?**
`ref` callback ab ek cleanup function return kar sakta hai (jaisa `useEffect` karta hai) jo tab chalti hai jab element unmount ho ya ref change ho — manual `current = null` assignment ki zaroorat khatam.

**93. Accessibility (a11y) React apps mein kaise ensure karte hain?**
Semantic HTML use karo, ARIA attributes jaha zaroori ho, keyboard navigation test karo, `useId` se label associations, aur tools jaise `eslint-plugin-jsx-a11y` / axe-core se automated checks.

**94. React app mein environment-specific config kaise handle karte hain?**
Build tool ke env variables (Vite: `import.meta.env`, CRA: `process.env.REACT_APP_*`), `.env` files, aur secrets ko kabhi bhi client bundle mein expose nahi karna (sensitive keys backend/server side hi rakho).

**95. TypeScript React ke saath kyu popular hai interview context mein?**
Compile-time type safety, better autocomplete/IDE support, props/state ke shape explicit hote hain, refactoring safer hoti hai large codebases mein. Interviewers senior roles mein TS familiarity expect karte hain.

**96. React mein "waterfall" data fetching problem kya hai?**
Jab nested components sequentially data fetch karte hain (parent ka fetch complete hone ke baad child fetch start hota hai) — total load time badh jaata hai. Solution: parallel fetching, Server Components, ya data-fetching libraries (React Query) jo request deduplication/parallelization handle karein.

**97. React Query / TanStack Query React state management se kaise alag hai?**
Ye "server state" (async, remote data) manage karta hai — caching, background refetching, stale-while-revalidate, deduplication built-in deta hai. Redux/Context "client state" (local UI state) ke liye better suited hain — dono complementary hain, competing nahi.

**98. React mein common performance anti-patterns kya hain?**
Render ke andar naya object/array/function banana (inline), bade lists bina virtualization ke render karna, unnecessary Context re-renders, deeply nested state jo poori tree re-render kare, missing `key`/wrong `key` strategy.

**99. Interview mein "React internals" question aane par kya cover karna chahiye?**
Fiber architecture (interruptible rendering), reconciliation/diffing algorithm (O(n) heuristic, type + key based), render vs commit phase separation, aur concurrent features (transitions, Suspense) ka high-level mental model.

**100. Senior React interview mein trade-off discuss karna kyu important hai?**
Interviewers "sahi jawab" se zyada dekhte hain ki candidate trade-offs samajhta hai ya nahi — jaise "useMemo kab zaroorat nahi" ya "Context kab Redux se better/worse hai". Blanket "best practice" bolna weak signal hai; context-aware reasoning strong signal hai.

---

### Bonus tip
Interview mein sirf definitions ratt kar mat jaana — har concept ke liye ek chhota real example ya "maine kab use kiya tha" story taiyar rakho. Ye dono junior aur senior interviews mein farak dalta hai.

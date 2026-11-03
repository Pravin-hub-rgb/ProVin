# React.js Course — Mermaid Flowchart

Copy the code below and paste it into [Mermaid Live Editor](https://mermaid.live) or any Mermaid-compatible viewer.

```mermaid
flowchart LR
    ROOT["React.js Course"]

    subgraph P2["Module 0 — How React Works Internally"]
        direction TB
        P2_0["0.0 What is React and How This Cour"]
        P2_1["0.1 Real DOM vs Virtual DOM"]
        P2_2["0.2 JSX Compilation"]
        P2_3["0.3 Reconciliation, Diffing, and We"]
        P2_4["0.4 Fiber Architecture (Light Level"]
        P2_5["0.5 Batching of State Updates"]
        P2_6["0.6 Synthetic Events"]
        P2_7["0.7 TypeScript Warm-up"]
        P2_8["0.7.5 React Versions — React 19, 18"]
    end

    subgraph P3["Batch 1 — Core Building Blocks"]
        direction TB
        P3_0["1.1 JSX Explained"]
        P3_1["1.2 First Component"]
        P3_2["1.3 Import / Export"]
        P3_3["1.4 Separate Component Files"]
        P3_4["1.5.1 Interface (TypeScript)"]
        P3_5["1.5.2 Props"]
        P3_6["1.5.3 Optional Props + Destructurin"]
        P3_7["1.5.4 Callback Props + Event Handli"]
        P3_8["1.6 Children + Composition Pattern"]
        P3_9["1.7 useState + Event Handling"]
        P3_10["1.8 TypeScript Generics"]
        P3_11["1.9 Array State + List Rendering"]
        P3_12["1.10 Conditional Rendering + Filter"]
        P3_13["1.11 Lists, Keys + TypeScript Array"]
    end

    subgraph P4["Batch 2 — Effects, Data & Refs"]
        direction TB
        P4_0["2.1 useEffect Basics"]
        P4_1["2.2 API Fetching with useEffect"]
        P4_2["2.3 TanStack React Query"]
        P4_3["2.4 useRef"]
        P4_4["2.5.0 Lifting State Up"]
        P4_5["2.6 Context API"]
    end

    subgraph P5["Batch 3 — Navigation & Access Control"]
        direction TB
        P5_0["3.1 React Router Basics"]
        P5_1["3.2 Dynamic Routes & Nested Routes"]
        P5_2["3.3 Protected Routes"]
    end

    subgraph P6["Batch 4 — Styling, Forms & Accessibility"]
        direction TB
        P6_0["4.1.1 Tailwind CSS and Responsive D"]
        P6_1["4.2.1 Accessibility (ARIA, Keyboard"]
        P6_2["4.2.2 Focus-Trap Pattern"]
        P6_3["4.2.3 Accessible Contact Form"]
        P6_4["4.3 Forms — Manual Controlled Input"]
        P6_5["4.4.1 React Hook Form — Basics"]
        P6_6["4.4.3 RHF — Built-in Validation"]
        P6_7["4.4.4 Zod — Introduction"]
        P6_8["4.4.5 Zod — Validation Rules"]
        P6_9["4.4.6 RHF + Zod — Complete Form"]
        P6_10["4.5.2 Product List — E-Commerce Sto"]
        P6_11["4.5.3 Product Card — E-Commerce Sto"]
        P6_12["4.5.4 Product Detail — E-Commerce S"]
        P6_13["4.5.5 Types and Shared Data — E-Com"]
        P6_14["4.5.6 Cart Context — E-Commerce Sto"]
        P6_15["4.5.7 Cart Drawer — E-Commerce Stor"]
        P6_16["4.5.8 Checkout — E-Commerce Store"]
        P6_17["4.5.9 Order Confirmation — E-Commer"]
    end

    subgraph P7["Batch 5 — Performance"]
        direction TB
        P7_0["5.1 React.memo — Avoiding Unnecessa"]
        P7_1["5.2 useMemo — Caching Expensive Cal"]
        P7_2["5.3 useCallback — Function Referenc"]
        P7_3["5.5 useReducer — Complex State Mana"]
        P7_4["5.6 Lazy Loading, Suspense and Code"]
        P7_5["5.9 Class Components — Side Note"]
    end

    subgraph P8["Batch 6 — Reusability & State Management"]
        direction TB
        P8_0["6.1 Custom Hooks Basics"]
        P8_1["6.2 Generic Custom Hooks (useFetch,"]
        P8_2["6.4 Zustand Introduction (with Type"]
    end

    subgraph P9["Batch 6.7 — Redux Toolkit (Enterprise) — Optional"]
        direction TB
        P9_0["6.7.0 What is RTK and Why — Why Aft"]
        P9_1["6.7.1 Redux Core — Store, Action, R"]
        P9_2["6.7.2 createSlice + configureStore "]
        P9_3["6.7.3 Provider + Typed Hooks — Conn"]
        P9_4["6.7.4 Async — createAsyncThunk"]
        P9_5["6.7.5.1 Expense Tracker — Planning "]
        P9_6["6.7.5.2 Expense Tracker — Hardcoded"]
        P9_7["6.7.5.3 Expense Tracker — Data Laye"]
        P9_8["6.7.5.4 Expense Tracker — Dynamic ("]
        P9_9["6.7.5.5 Expense Tracker — States, T"]
    end

    subgraph P10["Batch 7 — Production-Readiness"]
        direction TB
        P10_0["7.1 Error Boundaries"]
        P10_1["7.2 Security (XSS, env vars, safe r"]
        P10_2["7.3 Testing Setup (Vitest + RTL)"]
        P10_3["7.5 Build & Deploy"]
    end

    %% Phase sequencing
    ROOT --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P5
    P5 --> P6
    P6 --> P7
    P7 --> P8
    P8 --> P9
    P9 --> P10

    %% Sequential flow within each phase
    P2_0 --> P2_1 --> P2_2 --> P2_3 --> P2_4 --> P2_5 --> P2_6 --> P2_7 --> P2_8
    P3_0 --> P3_1 --> P3_2 --> P3_3 --> P3_4 --> P3_5 --> P3_6 --> P3_7 --> P3_8 --> P3_9 --> P3_10 --> P3_11 --> P3_12 --> P3_13
    P4_0 --> P4_1 --> P4_2 --> P4_3 --> P4_4 --> P4_5
    P5_0 --> P5_1 --> P5_2
    P6_0 --> P6_1 --> P6_2 --> P6_3 --> P6_4 --> P6_5 --> P6_6 --> P6_7 --> P6_8 --> P6_9 --> P6_10 --> P6_11 --> P6_12 --> P6_13 --> P6_14 --> P6_15 --> P6_16 --> P6_17
    P7_0 --> P7_1 --> P7_2 --> P7_3 --> P7_4 --> P7_5
    P8_0 --> P8_1 --> P8_2
    P9_0 --> P9_1 --> P9_2 --> P9_3 --> P9_4 --> P9_5 --> P9_6 --> P9_7 --> P9_8 --> P9_9
    P10_0 --> P10_1 --> P10_2 --> P10_3

```

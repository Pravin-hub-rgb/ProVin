# React.js Course — Mermaid Flowchart

Copy the code below and paste it into [Mermaid Live Editor](https://mermaid.live) or any Mermaid-compatible viewer.

```mermaid
flowchart LR
    ROOT["React.js Course"]

    subgraph P1["Module 0 — How React Works Internally"]
        direction TB
        P1_0["What is React"]
        P1_1["Real DOM vs Virtual DOM"]
        P1_2["JSX Compilation"]
        P1_3["Reconciliation, Diffing, and key Prop"]
        P1_4["Fiber Architecture"]
        P1_5["Batching of State Updates"]
        P1_6["Synthetic Events"]
        P1_7["TypeScript Warm-up"]
        P1_8["React Versions"]
    end

    subgraph P2["Batch 1 — Core Building Blocks"]
        direction TB
        P2_0["JSX"]
        P2_1["First Component"]
        P2_2["Import / Export"]
        P2_3["Separate Component Files"]
        P2_4["Interface"]
        P2_5["Props"]
        P2_6["Optional Props + Destructuring"]
        P2_7["Callback Props + Event Handling"]
        P2_8["Children + Composition Pattern"]
        P2_9["useState + Event Handling"]
        P2_10["TypeScript Generics"]
        P2_11["Array State + List Rendering"]
        P2_12["Lists, Keys + TypeScript Arrays"]
        P2_13["Conditional Rendering + Filter"]
    end

    subgraph P3["Batch 2 — Effects, Data & Refs"]
        direction TB
        P3_0["useEffect"]
        P3_1["API Fetching with useEffect"]
        P3_2["TanStack React Query"]
        P3_3["useRef"]
        P3_4["Lifting State Up"]
        P3_5["Context API"]
    end

    subgraph P4["Batch 3 — Navigation & Access Control"]
        direction TB
        P4_0["React Router"]
        P4_1["Dynamic Routes & Nested Routes"]
        P4_2["Protected Routes"]
    end

    subgraph P5["Batch 4 — Styling, Forms & Accessibility"]
        direction TB
        P5_0["Tailwind CSS and Responsive Design"]
        P5_1["Accessibility"]
        P5_2["Focus-Trap Pattern"]
        P5_3["Accessible Contact Form"]
        P5_4["Forms"]
        P5_5["React Hook Form"]
        P5_6["RHF"]
        P5_7["Zod"]
        P5_8["Zod"]
        P5_9["RHF + Zod"]
    end
    subgraph P45["Batch 4.5 — State Management"]
        direction TB
        P45_0["useReducer"]
        P45_1["E-Commerce Store"]
    end


    subgraph P6["Batch 5 — Performance"]
        direction TB
        P6_0["React.memo"]
        P6_1["useMemo"]
        P6_2["useCallback"]
        P6_4["Lazy Loading, Suspense and Code Splitting"]
        P6_5["Class Components"]
    end

    subgraph P7["Batch 6 — Reusability & State Management"]
        direction TB
        P7_0["Custom Hooks"]
        P7_1["Generic Custom Hooks"]
        P7_2["Zustand"]
    end

    subgraph P8["Batch 6.7 — Redux Toolkit (Enterprise) — Required"]
        direction TB
        P8_0["What is RTK and Why"]
        P8_1["Redux Core"]
        P8_2["createSlice + configureStore"]
        P8_3["Provider + Typed Hooks"]
        P8_4["Async"]
    end

    subgraph P9["Batch 7 — Production-Readiness"]
        direction TB
        P9_0["Error Boundaries"]
        P9_1["Security"]
        P9_2["Testing Setup"]
        P9_3["Build & Deploy"]
    end

    %% Phase sequencing
    ROOT --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P5
    P5 --> P45
    P45 --> P6
    P6 --> P7
    P7 --> P8
    P8 --> P9

    %% Sequential flow within each phase
    P1_0 --> P1_1 --> P1_2 --> P1_3 --> P1_4 --> P1_5 --> P1_6 --> P1_7 --> P1_8
    P2_0 --> P2_1 --> P2_2 --> P2_3 --> P2_4 --> P2_5 --> P2_6 --> P2_7 --> P2_8 --> P2_9 --> P2_10 --> P2_11 --> P2_12 --> P2_13
    P3_0 --> P3_1 --> P3_2 --> P3_3 --> P3_4 --> P3_5
    P4_0 --> P4_1 --> P4_2
    P5_0 --> P5_1 --> P5_2 --> P5_3 --> P5_4 --> P5_5 --> P5_6 --> P5_7 --> P5_8 --> P5_9
    P45_0 --> P45_1
    P6_0 --> P6_1 --> P6_2 --> P6_4 --> P6_5
    P7_0 --> P7_1 --> P7_2
    P8_0 --> P8_1 --> P8_2 --> P8_3 --> P8_4
    P9_0 --> P9_1 --> P9_2 --> P9_3

```

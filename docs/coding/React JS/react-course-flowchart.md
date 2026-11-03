# React.js Course — Mermaid Flowchart

Copy the code below and paste it into [Mermaid Live Editor](https://mermaid.live) or any Mermaid-compatible viewer.

```mermaid
flowchart LR
    ROOT["React.js Course"]

    subgraph P1["Module 0 — How React Works Internally"]
        direction TB
        P1_0["0.0 What is React"]
        P1_1["0.1 Real DOM vs Virtual DOM"]
        P1_2["0.2 JSX Compilation"]
        P1_3["0.3 Reconciliation & Diffing"]
        P1_4["0.4 Fiber Architecture"]
        P1_5["0.5 Batching State Updates"]
        P1_6["0.6 Synthetic Events"]
        P1_7["0.7 TypeScript Warm-up"]
        P1_8["0.7.5 React Versions"]
    end

    subgraph P2["Batch 1 — Core Building Blocks"]
        direction TB
        P2_0["1.1 JSX"]
        P2_1["1.2 Components"]
        P2_2["1.3 Import / Export"]
        P2_3["1.4 Component Files"]
        P2_4["1.5.1 Interface (TS)"]
        P2_5["1.5.2 Props"]
        P2_6["1.5.3 Optional Props + Destructuring"]
        P2_7["1.5.4 Callback Props + Events"]
        P2_8["1.6 Children + Composition"]
        P2_9["1.7 useState + Events"]
        P2_10["1.8 TS Generics"]
        P2_11["1.9 Array State + Lists"]
        P2_12["1.10 Conditional Rendering"]
        P2_13["1.11 Lists & Keys"]
    end

    subgraph P3["Batch 2 — Effects, Data & Refs"]
        direction TB
        P3_0["2.1 useEffect Basics"]
        P3_1["2.2 API Fetching"]
        P3_2["2.3 React Query"]
        P3_3["2.4 useRef"]
        P3_4["2.5.0 Lifting State Up"]
        P3_5["2.6 Context API"]
    end

    subgraph P4["Batch 3 — Navigation & Access Control"]
        direction TB
        P4_0["3.1 React Router"]
        P4_1["3.2 Dynamic & Nested Routes"]
        P4_2["3.3 Protected Routes"]
    end

    subgraph P5["Batch 4 — Styling, Forms & Accessibility"]
        direction TB
        P5_0["4.1.1 Tailwind CSS"]
        P5_1["4.2.1 Accessibility"]
        P5_2["4.2.2 Focus-Trap"]
        P5_3["4.2.3 Accessible Form"]
        P5_4["4.3 Forms"]
        P5_5["4.4.1 React Hook Form"]
        P5_6["4.4.3 RHF — Validation"]
        P5_7["4.4.4 Zod — Intro"]
        P5_8["4.4.5 Zod — Rules"]
        P5_9["4.4.6 RHF + Zod — Form"]
    end

    subgraph P6["Batch 5 — Performance"]
        direction TB
        P6_0["5.1 React.memo"]
        P6_1["5.2 useMemo"]
        P6_2["5.3 useCallback"]
        P6_3["5.5 useReducer"]
        P6_4["5.6 Lazy Loading & Suspense"]
        P6_5["5.9 Class Components"]
    end

    subgraph P7["Batch 6 — Reusability & State Management"]
        direction TB
        P7_0["6.1 Custom Hooks"]
        P7_1["6.2 Generic Hooks"]
        P7_2["6.4 Zustand"]
    end

    subgraph P8["Batch 6.7 — Redux Toolkit (Enterprise) — Optional"]
        direction TB
        P8_0["6.7.0 What is RTK & Why"]
        P8_1["6.7.1 Redux Core"]
        P8_2["6.7.2 createSlice + configureStore"]
        P8_3["6.7.3 Provider + Typed Hooks"]
        P8_4["6.7.4 Async Thunks"]
    end

    subgraph P9["Batch 7 — Production-Readiness"]
        direction TB
        P9_0["7.1 Error Boundaries"]
        P9_1["7.2 Security"]
        P9_2["7.3 Testing Setup"]
        P9_3["7.5 Build & Deploy"]
    end

    %% Phase sequencing
    ROOT --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P5
    P5 --> P6
    P6 --> P7
    P7 --> P8
    P8 --> P9

    %% Sequential flow within each phase
    P1_0 --> P1_1 --> P1_2 --> P1_3 --> P1_4 --> P1_5 --> P1_6 --> P1_7 --> P1_8
    P2_0 --> P2_1 --> P2_2 --> P2_3 --> P2_4 --> P2_5 --> P2_6 --> P2_7 --> P2_8 --> P2_9 --> P2_10 --> P2_11 --> P2_12 --> P2_13
    P3_0 --> P3_1 --> P3_2 --> P3_3 --> P3_4 --> P3_5
    P4_0 --> P4_1 --> P4_2
    P5_0 --> P5_1 --> P5_2 --> P5_3 --> P5_4 --> P5_5 --> P5_6 --> P5_7 --> P5_8 --> P5_9
    P6_0 --> P6_1 --> P6_2 --> P6_3 --> P6_4 --> P6_5
    P7_0 --> P7_1 --> P7_2
    P8_0 --> P8_1 --> P8_2 --> P8_3 --> P8_4
    P9_0 --> P9_1 --> P9_2 --> P9_3

```

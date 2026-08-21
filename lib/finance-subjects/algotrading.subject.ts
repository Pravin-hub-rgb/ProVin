import type { Subject } from "../finance-data";

export const algotradingSubject: Subject = {
  id: "algotrading",
  title: "Algo Trading",
  description: "Python se automated trading strategies — backtest, paper trade, live trade",
  lectures: [
    {
      id: "algotrading-roadmap",
      title: "📋 Algo Trading Course Roadmap",
      path: "docs/finance/Algo Trading/roadmap.md",
    },
  ],
  phases: [
    {
      id: "module1",
      title: "Module 1 — Introduction to Algorithmic Trading",
      openByDefault: true,
      lectures: [
        {
          id: "at-1.3",
          title: "1.3 Manual vs Automated Trading",
          path: "docs/finance/Algo Trading/Module 1 - Introduction to Algorithmic Trading/1.3 Manual vs Automated Trading.md",
        },
        {
          id: "at-1.4",
          title: "1.4 Overview of Exchanges, APIs and Data Providers",
          path: "docs/finance/Algo Trading/Module 1 - Introduction to Algorithmic Trading/1.4 Overview of Exchanges, APIs and Data Providers.md",
        },
        {
          id: "at-1.5",
          title: "1.5 Legal & Regulatory Framework (SEBI & Global Guidelines)",
          path: "docs/finance/Algo Trading/Module 1 - Introduction to Algorithmic Trading/1.5 Legal & Regulatory Framework (SEBI & Global Guidelines).md",
        },
      ],
    },
    {
      id: "module2",
      title: "Module 2 — Market Foundations & Quant Thinking",
      lectures: [
        {
          id: "at-2.1",
          title: "2.1 Understanding Market Microstructure",
          path: "docs/finance/Algo Trading/Module 2 - Market Foundations & Quant Thinking/2.1 Understanding Market Microstructure.md",
        },
        {
          id: "at-2.2",
          title: "2.2 Basics of Derivatives - Options and Futures",
          path: "docs/finance/Algo Trading/Module 2 - Market Foundations & Quant Thinking/2.2 Basics of Derivatives - Options and Futures.md",
        },
      ],
    },
    {
      id: "module3",
      title: "Module 3 — Python & Tools for Algo Trading",
      lectures: [],
    },
  ],
};

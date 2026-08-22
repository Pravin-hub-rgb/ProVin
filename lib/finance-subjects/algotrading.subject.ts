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
          id: "at-1.1",
          title: "1.1 What is Algorithmic Trading",
          path: "docs/finance/Algo Trading/Module 1 - Introduction to Algorithmic Trading/1.1 What is Algorithmic Trading.md",
        },
        {
          id: "at-1.2",
          title: "1.2 Evolution of Algo Trading in India & Crypto Markets",
          path: "docs/finance/Algo Trading/Module 1 - Introduction to Algorithmic Trading/1.2 Evolution of Algo Trading in India & Crypto Markets.md",
        },
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
      openByDefault: false,
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
        {
          id: "at-2.3",
          title: "2.3 Crypto Market Structure (with Bitcoin Example)",
          path: "docs/finance/Algo Trading/Module 2 - Market Foundations & Quant Thinking/2.3 Crypto Market Structure.md",
        },
        {
          id: "at-2.4",
          title: "2.4 Position Sizing, Risk & Leverage",
          path: "docs/finance/Algo Trading/Module 2 - Market Foundations & Quant Thinking/2.4 Position Sizing, Risk & Leverage.md",
        },
        {
          id: "at-2.5",
          title: "2.5 Statistical Thinking — Mean, Variance, Correlation & Distribution",
          path: "docs/finance/Algo Trading/Module 2 - Market Foundations & Quant Thinking/2.5 Statistical Thinking.md",
        },
      ],
    },
    {
      id: "module3",
      title: "Module 3 — Python & Tools for Algo Trading",
      lectures: [
        {
          id: "at-3.1",
          title: "3.1 Python Programming Fundamentals",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.1 Python Programming Fundamentals.md",
        },
        {
          id: "at-3.2",
          title: "3.2 Python Loops (while & for)",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.2 Python Loops.md",
        },
        {
          id: "at-3.3",
          title: "3.3 Python Functions",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.3 Python Functions.md",
        },
        {
          id: "at-3.4",
          title: "3.4 Python Errors & Debugging",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.4 Python Errors & Debugging.md",
        },
        {
          id: "at-3.5",
          title: "3.5 Python Modules & pip",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.5 Python Modules & pip.md",
        },
        {
          id: "at-3.6",
          title: "3.6 NumPy Library Basics",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.6 NumPy Library Basics.md",
        },
        {
          id: "at-3.7",
          title: "3.7 Pandas Library Basics",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.7 Pandas Library Basics.md",
        },
        {
          id: "at-3.8",
          title: "3.8 Data & API Overview (Historical Candlestick Data)",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.8 Data & API Overview.md",
        },
        {
          id: "at-3.9",
          title: "3.9 API Keys, Secrets & Access Tokens",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.9 API Keys Secrets & Access Tokens.md",
        },
        {
          id: "at-3.10",
          title: "3.10 Dhan API Historical Data Fetching",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.10 Dhan API Historical Data.md",
        },
        {
          id: "at-3.11",
          title: "3.11 Zerodha Kite Connect API",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.11 Zerodha Kite Connect API.md",
        },
        {
          id: "at-3.12",
          title: "3.12 Angel One SmartAPI Historical Data",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.12 Angel One SmartAPI Historical Data.md",
        },
        {
          id: "at-3.13",
          title: "3.13 Groww API Historical Data",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.13 Groww API Historical Data.md",
        },
        {
          id: "at-3.14",
          title: "3.14 Delta Exchange Crypto Data Fetching",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.14 Delta Exchange Crypto Data Fetching.md",
        },
        {
          id: "at-3.15",
          title: "3.15 Forex Data Fetching with MT5",
          path: "docs/finance/Algo Trading/Module 3 - Python & Tools for Algo Trading/3.15 Forex Data Fetching with MT5.md",
        },
      ],
    },
  ],
};

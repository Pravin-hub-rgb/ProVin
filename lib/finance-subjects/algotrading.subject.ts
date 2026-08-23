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
      openByDefault: false,
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
    {
      id: "module4",
      title: "Module 4 — Backtesting Foundations",
      openByDefault: false,
      lectures: [
        {
          id: "at-4.1",
          title: "4.1 Backtesting vs Forward Testing",
          path: "docs/finance/Algo Trading/Module 4 - Backtesting Foundations/4.1 Backtesting vs Forward Testing.md",
        },
        {
          id: "at-4.2",
          title: "4.2 Technical Indicators Primer",
          path: "docs/finance/Algo Trading/Module 4 - Backtesting Foundations/4.2 Technical Indicators Primer.md",
        },
        {
          id: "at-4.3",
          title: "4.3 Indicators in Python: TA-Lib & Pandas",
          path: "docs/finance/Algo Trading/Module 4 - Backtesting Foundations/4.3 Indicators in Python - TA-Lib & Pandas.md",
        },
        {
          id: "at-4.4",
          title: "4.4 First Backtest: EMA Crossover Strategy",
          path: "docs/finance/Algo Trading/Module 4 - Backtesting Foundations/4.4 First Backtest EMA Crossover.md",
        },
        {
          id: "at-4.5",
          title: "4.5 Backtest Code Deep Dive: Entry Logic & PnL",
          path: "docs/finance/Algo Trading/Module 4 - Backtesting Foundations/4.5 Backtest Code Deep Dive - Entry Logic & PnL.md",
        },
        {
          id: "at-4.6",
          title: "4.6 Backtest Performance Metrics",
          path: "docs/finance/Algo Trading/Module 4 - Backtesting Foundations/4.6 Backtest Performance Metrics.md",
        },
      ],
    },
    {
      id: "module5",
      title: "Module 5 — Strategy Design & Validation",
      openByDefault: false,
      lectures: [
        {
          id: "at-5.1",
          title: "5.1 Strategy Idea Generation & Hypothesis Building",
          path: "docs/finance/Algo Trading/Module 5 - Strategy Design & Validation/5.1 Strategy Idea Generation & Hypothesis Building.md",
        },
        {
          id: "at-5.2",
          title: "5.2 Selecting Time Frame: Intraday vs Swing",
          path: "docs/finance/Algo Trading/Module 5 - Strategy Design & Validation/5.2 Selecting Time Frame - Intraday vs Swing.md",
        },
        {
          id: "at-5.3",
          title: "5.3 Entry, Exit & Risk Rules",
          path: "docs/finance/Algo Trading/Module 5 - Strategy Design & Validation/5.3 Entry, Exit & Risk Rules.md",
        },
        {
          id: "at-5.4",
          title: "5.4 Optimization vs Curve Fitting & Walk Forward",
          path: "docs/finance/Algo Trading/Module 5 - Strategy Design & Validation/5.4 Optimization vs Curve Fitting & Walk Forward.md",
        },
        {
          id: "at-5.5",
          title: "5.5 Portfolio of Strategies & Diversification",
          path: "docs/finance/Algo Trading/Module 5 - Strategy Design & Validation/5.5 Portfolio of Strategies & Diversification.md",
        },
      ],
    },
    {
      id: "module6",
      title: "Module 6 — Backtest Case Studies",
      openByDefault: false,
      lectures: [
        {
          id: "at-6.1",
          title: "6.1 Case Study Roadmap: Markets & Strategies",
          path: "docs/finance/Algo Trading/Module 6 - Backtest Case Studies/6.1 Case Study Roadmap - Markets & Strategies.md",
        },
        {
          id: "at-6.2",
          title: "6.2 Opening Range Breakout (ORB) Backtest — Zerodha",
          path: "docs/finance/Algo Trading/Module 6 - Backtest Case Studies/6.2 ORB Strategy Backtest - Zerodha.md",
        },
        {
          id: "at-6.3",
          title: "6.3 Traffic Light Strategy Backtest — Angel One",
          path: "docs/finance/Algo Trading/Module 6 - Backtest Case Studies/6.3 Traffic Light Strategy Backtest - Angel One.md",
        },
      ],
    },
    {
      id: "module7",
      title: "Module 7 — Live Trading Bridge",
      openByDefault: false,
      lectures: [
        {
          id: "at-7.1",
          title: "7.1 Order Placement via APIs",
          path: "docs/finance/Algo Trading/Module 7 - Live Trading Bridge/7.1 Order Placement via APIs.md",
        },
        {
          id: "at-7.2",
          title: "7.2 Flask & Webhooks 101",
          path: "docs/finance/Algo Trading/Module 7 - Live Trading Bridge/7.2 Flask & Webhooks 101.md",
        },
        {
          id: "at-7.3",
          title: "7.3 Git, GitHub & Secrets Management",
          path: "docs/finance/Algo Trading/Module 7 - Live Trading Bridge/7.3 Git GitHub & Secrets Management.md",
        },
      ],
    },
    {
      id: "module8",
      title: "Module 8 — Algo Projects",
      openByDefault: false,
      lectures: [
        {
          id: "at-8.1",
          title: "8.1 Pine Script Basics for Options Algo",
          path: "docs/finance/Algo Trading/Module 8 - Algo Projects/8.1 Pine Script Basics for Options Algo.md",
        },
        {
          id: "at-8.2",
          title: "8.2 EMA Crossover Retest Strategy using AI",
          path: "docs/finance/Algo Trading/Module 8 - Algo Projects/8.2 EMA Crossover Retest Strategy using AI.md",
        },
        {
          id: "at-8.3",
          title: "8.3 Crypto Algo Project: Delta Exchange",
          path: "docs/finance/Algo Trading/Module 8 - Algo Projects/8.3 Crypto Algo Project - Delta Exchange.md",
        },
        {
          id: "at-8.4",
          title: "8.4 Reverse Trading System: MT5 + Flask",
          path: "docs/finance/Algo Trading/Module 8 - Algo Projects/8.4 Reverse Trading System - MT5.md",
        },
        {
          id: "at-8.5",
          title: "8.5 Local Algo Automation: Flask & Ngrok",
          path: "docs/finance/Algo Trading/Module 8 - Algo Projects/8.5 Local Algo Automation - Flask & Ngrok.md",
        },
        {
          id: "at-8.6",
          title: "8.6 Cloud Deployment: Render",
          path: "docs/finance/Algo Trading/Module 8 - Algo Projects/8.6 Cloud Deployment - Render.md",
        },
      ],
    },
    {
      id: "module9",
      title: "Module 9 — Advanced Smart Money Concepts (SMC)",
      openByDefault: false,
      lectures: [
        {
          id: "at-9.1",
          title: "9.1 SMC Intro: Institutional Soch",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.1 SMC Intro - Institutional Soch.md",
        },
        {
          id: "at-9.2",
          title: "9.2 Liquidity: Stops Ka Khel",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.2 Liquidity - Stops Ka Khel.md",
        },
        {
          id: "at-9.3",
          title: "9.3 Market Structure: BOS & CHoCH",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.3 Market Structure - BOS & CHoCH.md",
        },
        {
          id: "at-9.4",
          title: "9.4 Order Blocks",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.4 Order Blocks.md",
        },
        {
          id: "at-9.5",
          title: "9.5 Fair Value Gaps (FVG)",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.5 Fair Value Gaps - FVG.md",
        },
        {
          id: "at-9.6",
          title: "9.6 Premium/Discount Zones & OTE",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.6 Premium-Discount Zones & OTE.md",
        },
        {
          id: "at-9.7",
          title: "9.7 Full SMC Strategy + Python Detection",
          path: "docs/finance/Algo Trading/Module 9 - Advanced Smart Money Concepts/9.7 Full SMC Strategy + Python Detection.md",
        },
      ],
    },
  ],
};

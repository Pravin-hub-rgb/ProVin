import type { Subject } from "../coding-data";

export const careerSubject: Subject = {
  id: "career",
  title: "Career & Interview",
  description:
    "Time-free fullstack job plan — milestone ladder, hands-on concept labs, TradeStack + DukaanOS AI interview defense, resume draft.",
  lectures: [],
  phases: [
    {
      id: "career-map",
      title: "Career Master Map",
      openByDefault: true,
      lectures: [
        {
          id: "career-master-map",
          title: "READ ME First — Master Map & Decision Log",
          path: "docs/coding/Career/README.md",
        },
        {
          id: "career-focus-plan",
          title: "CAREER FOCUS PLAN — Milestone Ladder (M0-M13, Labs A-D)",
          path: "docs/coding/Career/CAREER-FOCUS-PLAN.md",
        },
        {
          id: "career-defense-kit",
          title: "TradeStack Defense Kit - Python Backend Interview Defense",
          path: "docs/coding/Career/TRADESTACK-DEFENSE-KIT.md",
        },
        {
          id: "career-ai-defense-kit",
          title: "DukaanOS AI Defense Kit - Voice Billing Interview Defense",
          path: "docs/coding/Career/DUKAANOS-AI-DEFENSE-KIT.md",
        },
        {
          id: "career-resume",
          title: "Resume Draft - DukaanOS + TradeStack (STAR Bullets)",
          path: "docs/coding/Career/RESUME-DRAFT.md",
        },
      ],
    },
    {
      id: "career-ground-floor-labs",
      title: "Ground-Floor Labs",
      openByDefault: false,
      lectures: [],
      groups: [
         {
          id: "career-lab-c",
          title: "Lab C — Simulated Feed + State Machine (TypeScript)",
          openByDefault: false,
          lectures: [
            {
              id: "career-lab-c-readme",
              title: "Read Me First",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/README.md",
            },
            {
              id: "career-lab-c-0",
              title: "0.0 Planning — What We're Building",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/0.0 Planning — What We Building.md",
            },
            {
              id: "career-lab-c-1-0",
              title: "1.0 Concept — Timers and setInterval",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/1.0 Concept — Timers and setInterval.md",
            },
            {
              id: "career-lab-c-1-1",
              title: "1.1 Syntax — Timer Setup",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/1.1 Syntax — Timer Setup.md",
            },
            {
              id: "career-lab-c-1-2",
              title: "1.2 Minimal Code — Basic Interval",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/1.2 Minimal Code — Basic Interval.md",
            },
            {
              id: "career-lab-c-1-3",
              title: "1.3 Build Up — Typed Feed Module",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/1.3 Build Up — Typed Feed Module.md",
            },
            {
              id: "career-lab-c-1-4",
              title: "1.4 Finalize — Pause Stop Controls",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/1.4 Finalize — Pause Stop Controls.md",
            },
            {
              id: "career-lab-c-2-0",
              title: "2.0 Concept — State Machines",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/2.0 Concept — State Machines.md",
            },
            {
              id: "career-lab-c-2-1",
              title: "2.1 Syntax — Transition Tables",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/2.1 Syntax — Transition Tables.md",
            },
            {
              id: "career-lab-c-2-2",
              title: "2.2 Minimal Code — Simple State Machine",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/2.2 Minimal Code — Simple State Machine.md",
            },
            {
              id: "career-lab-c-2-3",
              title: "2.3 Build Up — 4-State Position Machine",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/2.3 Build Up — 4-State Position Machine.md",
            },
            {
              id: "career-lab-c-2-4",
              title: "2.4 Testing — Verify Transitions",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/2.4 Testing — Verify Transitions.md",
            },
            {
              id: "career-lab-c-3-0",
              title: "3.0 Concept — Event Emitters",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/3.0 Concept — Event Emitters.md",
            },
            {
              id: "career-lab-c-3-1",
              title: "3.1 Syntax — EventEmitter TypeScript",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/3.1 Syntax — EventEmitter TypeScript.md",
            },
            {
              id: "career-lab-c-3-2",
              title: "3.2 Minimal Code — Basic EventEmitter",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/3.2 Minimal Code — Basic EventEmitter.md",
            },
            {
              id: "career-lab-c-3-3",
              title: "3.3 Build Up — Typed Feed Emitter",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/3.3 Build Up — Typed Feed Emitter.md",
            },
            {
              id: "career-lab-c-4-0",
              title: "4.0 Concept — Per-Symbol Routing",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/4.0 Concept — Per-Symbol Routing.md",
            },
            {
              id: "career-lab-c-4-1",
              title: "4.1 Syntax — Map-Based Subscription",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/4.1 Syntax — Map-Based Subscription.md",
            },
            {
              id: "career-lab-c-4-2",
              title: "4.2 Minimal Code — Route Ticks to Machines",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/4.2 Minimal Code — Route Ticks to Machines.md",
            },
            {
              id: "career-lab-c-5-0",
              title: "5.0 Concept — Disconnect and Reconnect",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/5.0 Concept — Disconnect and Reconnect.md",
            },
            {
              id: "career-lab-c-5-1",
              title: "5.1 Syntax — Pause Resume Implementation",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/5.1 Syntax — Pause Resume Implementation.md",
            },
            {
              id: "career-lab-c-5-2",
              title: "5.2 Build Up — Full Pause Resume Demo",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/5.2 Build Up — Full Pause Resume Demo.md",
            },
            {
              id: "career-lab-c-6-0",
              title: "6.0 Final Assembly — index.ts",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/6.0 Final Assembly — index.ts.md",
            },
            {
              id: "career-lab-c-7-0",
              title: "7.0 Testing — Verify Everything",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/7.0 Testing — Verify Everything.md",
            },
            {
              id: "career-lab-c-8-0",
              title: "8.0 Explain Out Loud — 90 Seconds",
              path: "docs/coding/Career/Labs/Lab C — Simulated Feed + State Machine (TS)/8.0 Explain Out Loud — 90 Seconds.md",
            },
          ],
        },
      ],
    },
  ],
};

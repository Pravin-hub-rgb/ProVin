import type { Subject } from "../general-data";

const BASE = "docs/general/engine";

export const engineSubject: Subject = {
  id: "engine",
  title: "Car Engines — From Steam to Spec Sheets",
  description:
    "A zero-assumption English course on how car engines work: the steam engine, the four-stroke and two-stroke cycles, fuel systems, flywheel, starter and clutch, cylinder layouts, the transmission, and how to read a real engine spec sheet.",
  lectures: [
    {
      id: "engine-0.0",
      title: "Course Roadmap",
      path: `${BASE}/00-course-roadmap.md`,
    },
  ],
  phases: [
    {
      id: "engine-phase-0",
      title: "Phase 0 - The Steam Engine",
      openByDefault: true,
      lectures: [
        {
          id: "engine-0.1",
          title: "The First Engine - Coal, Water and Steam",
          path: `${BASE}/Phase 0 - The Steam Engine/0.1 The First Engine - Coal, Water and Steam.md`,
        },
        {
          id: "engine-0.2",
          title: "The Cylinder and the Piston",
          path: `${BASE}/Phase 0 - The Steam Engine/0.2 The Cylinder and the Piston.md`,
        },
        {
          id: "engine-0.3",
          title: "From Push to Rotation - The Crankshaft",
          path: `${BASE}/Phase 0 - The Steam Engine/0.3 From Push to Rotation - The Crankshaft.md`,
        },
        {
          id: "engine-0.4",
          title: "The Valve Loop - How the Engine Runs Itself",
          path: `${BASE}/Phase 0 - The Steam Engine/0.4 The Valve Loop - How the Engine Runs Itself.md`,
        },
        {
          id: "engine-0.5",
          title: "Double-Acting Engines - Power on Every Stroke",
          path: `${BASE}/Phase 0 - The Steam Engine/0.5 Double-Acting Engines - Power on Every Stroke.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-0.6",
          title: "Quiz - The Steam Engine",
          path: `${BASE}/Phase 0 - The Steam Engine/0.6 Quiz - The Steam Engine.md`,
        },
      ],
    },
    {
      id: "engine-phase-1",
      title: "Phase 1 - The Four-Stroke Engine",
      openByDefault: false,
      lectures: [
        {
          id: "engine-1.1",
          title: "Why Burn Inside the Cylinder",
          path: `${BASE}/Phase 1 - The Four-Stroke Engine/1.1 Why Burn Inside the Cylinder.md`,
        },
        {
          id: "engine-1.2",
          title: "What a Stroke Is and the Four Jobs",
          path: `${BASE}/Phase 1 - The Four-Stroke Engine/1.2 What a Stroke Is and the Four Jobs.md`,
        },
        {
          id: "engine-1.3",
          title: "The Four Strokes One by One",
          path: `${BASE}/Phase 1 - The Four-Stroke Engine/1.3 The Four Strokes One by One.md`,
        },
        {
          id: "engine-1.4",
          title: "Crank Geometry - Two Turns per Cycle",
          path: `${BASE}/Phase 1 - The Four-Stroke Engine/1.4 Crank Geometry - Two Turns per Cycle.md`,
        },
        {
          id: "engine-1.5",
          title: "Valves and the Camshaft",
          path: `${BASE}/Phase 1 - The Four-Stroke Engine/1.5 Valves and the Camshaft.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-1.6",
          title: "Quiz - The Four-Stroke Engine",
          path: `${BASE}/Phase 1 - The Four-Stroke Engine/1.6 Quiz - The Four-Stroke Engine.md`,
        },
      ],
    },
    {
      id: "engine-phase-2",
      title: "Phase 2 - The Two-Stroke Engine",
      openByDefault: false,
      lectures: [
        {
          id: "engine-2.1",
          title: "The Goal - One Bang Every Rotation",
          path: `${BASE}/Phase 2 - The Two-Stroke Engine/2.1 The Goal - One Bang Every Rotation.md`,
        },
        {
          id: "engine-2.2",
          title: "Ports - The Piston Becomes the Valve",
          path: `${BASE}/Phase 2 - The Two-Stroke Engine/2.2 Ports - The Piston Becomes the Valve.md`,
        },
        {
          id: "engine-2.3",
          title: "The Crankcase and the Three Ports",
          path: `${BASE}/Phase 2 - The Two-Stroke Engine/2.3 The Crankcase and the Three Ports.md`,
        },
        {
          id: "engine-2.4",
          title: "The Two Strokes and Their Double Jobs",
          path: `${BASE}/Phase 2 - The Two-Stroke Engine/2.4 The Two Strokes and Their Double Jobs.md`,
        },
        {
          id: "engine-2.5",
          title: "Why Two-Strokes Waste Fuel and Where They Survive",
          path: `${BASE}/Phase 2 - The Two-Stroke Engine/2.5 Why Two-Strokes Waste Fuel and Where They Survive.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-2.6",
          title: "Quiz - The Two-Stroke Engine",
          path: `${BASE}/Phase 2 - The Two-Stroke Engine/2.6 Quiz - The Two-Stroke Engine.md`,
        },
      ],
    },
    {
      id: "engine-phase-3",
      title: "Phase 3 - Fuel Systems",
      openByDefault: false,
      lectures: [
        {
          id: "engine-3.1",
          title: "Petrol vs Diesel - Who Decides the Timing",
          path: `${BASE}/Phase 3 - Fuel Systems/3.1 Petrol vs Diesel - Who Decides the Timing.md`,
        },
        {
          id: "engine-3.2",
          title: "The Injector - Fuel as Fine Mist",
          path: `${BASE}/Phase 3 - Fuel Systems/3.2 The Injector - Fuel as Fine Mist.md`,
        },
        {
          id: "engine-3.3",
          title: "From Carburetor to Injector",
          path: `${BASE}/Phase 3 - Fuel Systems/3.3 From Carburetor to Injector.md`,
        },
        {
          id: "engine-3.4",
          title: "Diesel in Winter - Glow Plugs and Thick Fuel",
          path: `${BASE}/Phase 3 - Fuel Systems/3.4 Diesel in Winter - Glow Plugs and Thick Fuel.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-3.5",
          title: "Quiz - Fuel Systems",
          path: `${BASE}/Phase 3 - Fuel Systems/3.5 Quiz - Fuel Systems.md`,
        },
      ],
    },
    {
      id: "engine-phase-4",
      title: "Phase 4 - Flywheel, Starter and Clutch",
      openByDefault: false,
      lectures: [
        {
          id: "engine-4.1",
          title: "The Flywheel and Its Two Jobs",
          path: `${BASE}/Phase 4 - Flywheel Starter and Clutch/4.1 The Flywheel and Its Two Jobs.md`,
        },
        {
          id: "engine-4.2",
          title: "The Starter Motor - How the First Bang Happens",
          path: `${BASE}/Phase 4 - Flywheel Starter and Clutch/4.2 The Starter Motor - How the First Bang Happens.md`,
        },
        {
          id: "engine-4.3",
          title: "The Clutch - Connect and Disconnect",
          path: `${BASE}/Phase 4 - Flywheel Starter and Clutch/4.3 The Clutch - Connect and Disconnect.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-4.4",
          title: "Quiz - Flywheel, Starter and Clutch",
          path: `${BASE}/Phase 4 - Flywheel Starter and Clutch/4.4 Quiz - Flywheel, Starter and Clutch.md`,
        },
      ],
    },
    {
      id: "engine-phase-5",
      title: "Phase 5 - Cylinder Layouts",
      openByDefault: false,
      lectures: [
        {
          id: "engine-5.1",
          title: "Why One Cylinder Was Not Enough",
          path: `${BASE}/Phase 5 - Cylinder Layouts/5.1 Why One Cylinder Was Not Enough.md`,
        },
        {
          id: "engine-5.2",
          title: "Inline and V Engines",
          path: `${BASE}/Phase 5 - Cylinder Layouts/5.2 Inline and V Engines.md`,
        },
        {
          id: "engine-5.3",
          title: "Flat and Rotary Engines",
          path: `${BASE}/Phase 5 - Cylinder Layouts/5.3 Flat and Rotary Engines.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-5.4",
          title: "Quiz - Cylinder Layouts",
          path: `${BASE}/Phase 5 - Cylinder Layouts/5.4 Quiz - Cylinder Layouts.md`,
        },
      ],
    },
    {
      id: "engine-phase-6",
      title: "Phase 6 - Transmission",
      openByDefault: false,
      lectures: [
        {
          id: "engine-6.1",
          title: "The Gearbox Problem",
          path: `${BASE}/Phase 6 - Transmission/6.1 The Gearbox Problem.md`,
        },
        {
          id: "engine-6.2",
          title: "Inside the Gearbox - Shafts, Ratios and the Sliding Collar",
          path: `${BASE}/Phase 6 - Transmission/6.2 Inside the Gearbox - Shafts, Ratios and the Sliding Collar.md`,
        },
        {
          id: "engine-6.3",
          title: "Rev Matching",
          path: `${BASE}/Phase 6 - Transmission/6.3 Rev Matching.md`,
        },
        {
          id: "engine-6.4",
          title: "The Differential",
          path: `${BASE}/Phase 6 - Transmission/6.4 The Differential.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-6.5",
          title: "Quiz - Transmission",
          path: `${BASE}/Phase 6 - Transmission/6.5 Quiz - Transmission.md`,
        },
      ],
    },
    {
      id: "engine-phase-7",
      title: "Phase 7 - Reading the Spec Sheet",
      openByDefault: false,
      lectures: [
        {
          id: "engine-7.1",
          title: "What 1.5 Litre Means - Displacement",
          path: `${BASE}/Phase 7 - Reading the Spec Sheet/7.1 What 1.5 Litre Means - Displacement.md`,
        },
        {
          id: "engine-7.2",
          title: "Turbo - Power From the Exhaust",
          path: `${BASE}/Phase 7 - Reading the Spec Sheet/7.2 Turbo - Power From the Exhaust.md`,
        },
        {
          id: "engine-7.3",
          title: "RPM - Revs and the Tachometer",
          path: `${BASE}/Phase 7 - Reading the Spec Sheet/7.3 RPM - Revs and the Tachometer.md`,
        },
        {
          id: "engine-7.4",
          title: "Reading a Full Spec Sheet",
          path: `${BASE}/Phase 7 - Reading the Spec Sheet/7.4 Reading a Full Spec Sheet.md`,
        },
      ],
      quizzes: [
        {
          id: "quiz-7.5",
          title: "Quiz - Reading the Spec Sheet",
          path: `${BASE}/Phase 7 - Reading the Spec Sheet/7.5 Quiz - Reading the Spec Sheet.md`,
        },
      ],
    },
  ],
};

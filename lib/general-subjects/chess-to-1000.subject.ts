import type { Subject } from "../general-data";

export const chessSubject: Subject = {
  id: "chess-1000",
  title: "Chess 1000 — Basics Se 1000 Rating Tak",
  description: "A practical 10-week Hinglish rapid chess course for unrated beginners aiming for a stable 1000 rating",
  lectures: [
    {
      id: "chess-0.0",
      title: "Course Roadmap",
      path: "docs/general/chess-1000/00-course-roadmap.md",
    },
  ],
  phases: [
    {
      id: "chess-phase-0",
      title: "Phase 0 - Baseline, Plan and Study System",
      openByDefault: true,
      lectures: [
        {
          id: "chess-0.1",
          title: "1000 Rating Ka Matlab",
          path: "docs/general/chess-1000/Phase 0 - Baseline, Plan and Study System/0.1 1000 Rating Ka Matlab.md",
        },
        {
          id: "chess-0.2",
          title: "Baseline Test",
          path: "docs/general/chess-1000/Phase 0 - Baseline, Plan and Study System/0.2 Baseline Test.md",
        },
        {
          id: "chess-0.3",
          title: "Daily Routine aur Game Log",
          path: "docs/general/chess-1000/Phase 0 - Baseline, Plan and Study System/0.3 Daily Routine aur Game Log.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-0.3",
          title: "Quiz - Baseline and Study System",
          path: "docs/general/chess-1000/Phase 0 - Baseline, Plan and Study System/0.3 Quiz - Baseline and Study System.md",
        },
      ],
    },
    {
      id: "chess-phase-1",
      title: "Phase 1 - Tactical Vision",
      openByDefault: false,
      lectures: [
        {
          id: "chess-1.1",
          title: "Board Scan aur Blunder Check",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.1 Board Scan aur Blunder Check.md",
        },
        {
          id: "chess-1.2",
          title: "Fork, Pin aur Skewer",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.2 Fork, Pin aur Skewer.md",
        },
        {
          id: "chess-1.3",
          title: "Discovered aur Double Attack",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.3 Discovered aur Double Attack.md",
        },
        {
          id: "chess-1.4",
          title: "Back-Rank Attack aur Deflection",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.4 Back-Rank Attack aur Deflection.md",
        },
        {
          id: "chess-1.5",
          title: "Simple Checkmates aur Combinations",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.5 Simple Checkmates aur Combinations.md",
        },
        {
          id: "chess-1.6",
          title: "Exercise Pack",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.6 Exercise Pack.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-1.6",
          title: "Quiz - Tactical Vision",
          path: "docs/general/chess-1000/Phase 1 - Tactical Vision/1.6 Quiz - Tactical Vision.md",
        },
      ],
    },
    {
      id: "chess-phase-2",
      title: "Phase 2 - Calculation and Position Choice",
      openByDefault: false,
      lectures: [
        {
          id: "chess-2.1",
          title: "Candidate Moves Kaise Bante Hain",
          path: "docs/general/chess-1000/Phase 2 - Calculation and Position Choice/2.1 Candidate Moves Kaise Bante Hain.md",
        },
        {
          id: "chess-2.2",
          title: "Forcing Lines",
          path: "docs/general/chess-1000/Phase 2 - Calculation and Position Choice/2.2 Forcing Lines.md",
        },
        {
          id: "chess-2.3",
          title: "Move Se Pehle Safety Check",
          path: "docs/general/chess-1000/Phase 2 - Calculation and Position Choice/2.3 Move Se Pehle Safety Check.md",
        },
        {
          id: "chess-2.4",
          title: "Quiet Moves Ka Evaluation",
          path: "docs/general/chess-1000/Phase 2 - Calculation and Position Choice/2.4 Quiet Moves Ka Evaluation.md",
        },
        {
          id: "chess-2.5",
          title: "Exercise Pack",
          path: "docs/general/chess-1000/Phase 2 - Calculation and Position Choice/2.5 Exercise Pack.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-2.5",
          title: "Quiz - Calculation and Position Choice",
          path: "docs/general/chess-1000/Phase 2 - Calculation and Position Choice/2.5 Quiz - Calculation and Position Choice.md",
        },
      ],
    },
    {
      id: "chess-phase-3",
      title: "Phase 3 - Opening Fundamentals and Repertoire",
      openByDefault: false,
      lectures: [
        {
          id: "chess-3.1",
          title: "Openings Are Plans, Not Moves",
          path: "docs/general/chess-1000/Phase 3 - Opening Fundamentals and Repertoire/3.1 Openings Are Plans, Not Moves.md",
        },
        {
          id: "chess-3.2",
          title: "Development, Centre aur King Safety",
          path: "docs/general/chess-1000/Phase 3 - Opening Fundamentals and Repertoire/3.2 Development, Centre aur King Safety.md",
        },
        {
          id: "chess-3.3",
          title: "Pawn Structures aur Traps",
          path: "docs/general/chess-1000/Phase 3 - Opening Fundamentals and Repertoire/3.3 Pawn Structures aur Traps.md",
        },
        {
          id: "chess-3.4",
          title: "Small Repertoire for White and Black",
          path: "docs/general/chess-1000/Phase 3 - Opening Fundamentals and Repertoire/3.4 Small Repertoire for White and Black.md",
        },
        {
          id: "chess-3.5",
          title: "Exercise Pack",
          path: "docs/general/chess-1000/Phase 3 - Opening Fundamentals and Repertoire/3.5 Exercise Pack.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-3.5",
          title: "Quiz - Opening Fundamentals and Repertoire",
          path: "docs/general/chess-1000/Phase 3 - Opening Fundamentals and Repertoire/3.5 Quiz - Opening Fundamentals and Repertoire.md",
        },
      ],
    },
    {
      id: "chess-phase-4",
      title: "Phase 4 - Middlegame Plans",
      openByDefault: false,
      lectures: [
        {
          id: "chess-4.1",
          title: "Middlegame Plan Kaise Banayein",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.1 Middlegame Plan Kaise Banayein.md",
        },
        {
          id: "chess-4.2",
          title: "Pawn Breaks, Open Files aur Space",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.2 Pawn Breaks, Open Files aur Space.md",
        },
        {
          id: "chess-4.3",
          title: "Attack aur Defend",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.3 Attack aur Defend.md",
        },
        {
          id: "chess-4.4",
          title: "Simplify ya Pieces Badhaayein",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.4 Simplify ya Pieces Badhaayein.md",
        },
        {
          id: "chess-4.5",
          title: "Plan se Position tak",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.5 Plan se Position tak.md",
        },
        {
          id: "chess-4.6",
          title: "Exercise Pack",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.6 Exercise Pack.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-4.6",
          title: "Quiz - Middlegame Plans",
          path: "docs/general/chess-1000/Phase 4 - Middlegame Plans/4.6 Quiz - Middlegame Plans.md",
        },
      ],
    },
    {
      id: "chess-phase-5",
      title: "Phase 5 - Essential Endgames",
      openByDefault: false,
      lectures: [
        {
          id: "chess-5.1",
          title: "King Activity aur Basic Mating Technique",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.1 King Activity aur Basic Mating Technique.md",
        },
        {
          id: "chess-5.2",
          title: "King-Pawn Endings",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.2 King-Pawn Endings.md",
        },
        {
          id: "chess-5.3",
          title: "Opposition aur Key Squares",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.3 Opposition aur Key Squares.md",
        },
        {
          id: "chess-5.4",
          title: "Rook-Pawn Endings",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.4 Rook-Pawn Endings.md",
        },
        {
          id: "chess-5.5",
          title: "Trapped Pieces aur Common Endgame Traps",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.5 Trapped Pieces aur Common Endgame Traps.md",
        },
        {
          id: "chess-5.6",
          title: "Exercise Pack",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.6 Exercise Pack.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-5.6",
          title: "Quiz - Essential Endgames",
          path: "docs/general/chess-1000/Phase 5 - Essential Endgames/5.6 Quiz - Essential Endgames.md",
        },
      ],
    },
    {
      id: "chess-phase-6",
      title: "Phase 6 - Analysis, Clock and Tournament Improvement",
      openByDefault: false,
      lectures: [
        {
          id: "chess-6.1",
          title: "Game Analysis Without Engine",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.1 Game Analysis Without Engine.md",
        },
        {
          id: "chess-6.2",
          title: "Engine ko Coach ki Tarah Use Karna",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.2 Engine ko Coach ki Tarah Use Karna.md",
        },
        {
          id: "chess-6.3",
          title: "Blunders ko Fix karna",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.3 Blunders ko Fix karna.md",
        },
        {
          id: "chess-6.4",
          title: "10+0 Clock Routine",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.4 10+0 Clock Routine.md",
        },
        {
          id: "chess-6.5",
          title: "Tournament Routine and Recovery",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.5 Tournament Routine and Recovery.md",
        },
        {
          id: "chess-6.6",
          title: "Exercise Pack",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.6 Exercise Pack.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-6.6",
          title: "Quiz - Analysis, Clock and Tournament Improvement",
          path: "docs/general/chess-1000/Phase 6 - Analysis, Clock and Tournament Improvement/6.6 Quiz - Analysis, Clock and Tournament Improvement.md",
        },
      ],
    },
    {
      id: "chess-phase-7",
      title: "Phase 7 - The 1000 Rating Project",
      openByDefault: false,
      lectures: [
        {
          id: "chess-7.1",
          title: "Personal Improvement Plan",
          path: "docs/general/chess-1000/Phase 7 - The 1000 Rating Project/7.1 Personal Improvement Plan.md",
        },
        {
          id: "chess-7.2",
          title: "Ten-Game Training Block",
          path: "docs/general/chess-1000/Phase 7 - The 1000 Rating Project/7.2 Ten-Game Training Block.md",
        },
        {
          id: "chess-7.3",
          title: "Ten-Game Capstone",
          path: "docs/general/chess-1000/Phase 7 - The 1000 Rating Project/7.3 Ten-Game Capstone.md",
        },
        {
          id: "chess-7.4",
          title: "Final Review aur Next Plan",
          path: "docs/general/chess-1000/Phase 7 - The 1000 Rating Project/7.4 Final Review aur Next Plan.md",
        },
      ],
      quizzes: [
        {
          id: "quiz-7.4",
          title: "Quiz - Rating Readiness",
          path: "docs/general/chess-1000/Phase 7 - The 1000 Rating Project/7.4 Quiz - Rating Readiness.md",
        },
      ],
    },
  ],
};

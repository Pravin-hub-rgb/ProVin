/**
 * Type definitions and static data for coding subjects and lectures
 * This is the single source of truth for all course content
 */

export type Topic = {
  id: string;
  title: string;
  completed: boolean;
};

export type Phase = {
  phase: string;
  topics: Topic[];
};

export type Lecture = {
  id: string;
  title: string;
  path: string;
  isComponent?: boolean;
};

export type Subject = {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
  phases?: LectureGroup[];
  progress?: Phase[];
};

export type LectureGroup = {
  id: string;
  title: string;
  lectures: Lecture[];
  openByDefault?: boolean;
};

/**
 * All available coding subjects with their respective lecture content
 * Add new subjects and lectures here only
 */
export const subjects: Subject[] = [
  {
    id: "python",
    title: "Python",
    description: "Complete Python fundamentals",
    lectures: [
      {
        id: "lec1",
        title: "Lec 1 - Variables & Functions",
        path: "docs/coding/python/1 Lec variables & functions/notes.md",
      },
      {
        id: "lec2",
        title: "Lec 2 - Conditionals",
        path: "docs/coding/python/2 Lec/notes.md",
      },
      {
        id: "lec3",
        title: "Lec 3 - Loops",
        path: "docs/coding/python/3 Lec loops/notes.md",
      },
      {
        id: "lec4",
        title: "Lec 4 - Exceptions",
        path: "docs/coding/python/4 Lec Exceptions/notes.md",
      },
      {
        id: "lec5",
        title: "Lec 5 - Modules",
        path: "docs/coding/python/5 Lec Modules/notes.md",
      },
      {
        id: "lec6",
        title: "Lec 6 - Unit Testing",
        path: "docs/coding/python/6 Lec Unit Test/notes.md",
      },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "Fullstack React framework",
    lectures: [],
  },
  {
    id: "react",
    title: "React",
    description: "UI component library",
    lectures: [],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Complete JavaScript fundamentals for interviews",
    lectures: [
      {
        id: "roadmap",
        title: "📋 Complete JS Course Roadmap",
        path: "docs/coding/JS/js-course-roadmap.md",
      },
      {
        id: "checklist",
        title: "✅ Progress Checklist",
        path: "checklist",
        isComponent: true,
      },
    ],
    phases: [
      {
        id: "phase1",
        title: "Phase 1 — Foundations",
        openByDefault: true,
        lectures: [
          {
            id: "js-lec0",
            title: "0.0 Introduction to JavaScript",
            path: "docs/coding/JS/Phase 1 - Foundations/0.0 Introduction to JavaScript.md",
          },
          {
            id: "js-lec1",
            title: "1.1 var / let / const",
            path: "docs/coding/JS/Phase 1 - Foundations/1.1 var let const.md",
          },
          {
            id: "js-lec2",
            title: "1.2 Data Types",
            path: "docs/coding/JS/Phase 1 - Foundations/1.2 Data Types.md",
          },
          {
            id: "js-lec3",
            title: "1.3 Scope",
            path: "docs/coding/JS/Phase 1 - Foundations/1.3 Scope.md",
          },
          {
            id: "js-lec4",
            title: "1.4 Hoisting",
            path: "docs/coding/JS/Phase 1 - Foundations/1.4 Hoisting.md",
          },
          {
            id: "js-lec5",
            title: "1.5 Type Coercion & Equality",
            path: "docs/coding/JS/Phase 1 - Foundations/1.5 Type Coercion & Equality.md",
          },
          {
            id: "js-lec6",
            title: "1.6 Functions — All Forms",
            path: "docs/coding/JS/Phase 1 - Foundations/1.6 Functions — All Forms.md",
          },
          {
            id: "js-lec7",
            title: "1.7 Template Literals",
            path: "docs/coding/JS/Phase 1 - Foundations/1.7 Template Literals.md",
          }
        ]
      },
      {
        id: "phase2",
        title: "Phase 2 — Core Concepts",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec8",
            title: "2.1 Closures",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.1 Closures.md",
          },
          {
            id: "js-lec9",
            title: "2.2 `this` Keyword",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.2 this Keyword.md",
          },
          {
            id: "js-lec10",
            title: "2.3 call, apply, bind",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.3 call, apply, bind.md",
          },
          {
            id: "js-lec11",
            title: "2.4 Prototype & Prototype Chain",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.4 Prototype & Prototype Chain.md",
          },
          {
            id: "js-lec12",
            title: "2.5 Classes",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.5 Classes.md",
          },
          {
            id: "js-lec13",
            title: "2.6 IIFE",
            path: "docs/coding/JS/Phase 2 - Core Concepts/2.6 IIFE.md",
          }
        ]
      },
      {
        id: "phase3",
        title: "Phase 3 — Async JavaScript",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec14",
            title: "3.1 Synchronous vs Asynchronous",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.1 Synchronous vs Asynchronous.md",
          },
          {
            id: "js-lec15",
            title: "3.2 Event Loop",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.2 Event Loop.md",
          },
          {
            id: "js-lec16",
            title: "3.3 Callbacks",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.3 Callbacks.md",
          },
          {
            id: "js-lec17",
            title: "3.4 Promises",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.4 Promises.md",
          },
          {
            id: "js-lec18",
            title: "3.5 async / await",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.5 async await.md",
          },
          {
            id: "js-lec19",
            title: "3.6 Fetch API",
            path: "docs/coding/JS/Phase 3 - Async JavaScript/3.6 Fetch API.md",
          }
        ]
      },
      {
        id: "phase4",
        title: "Phase 4 — Arrays, Objects & Functional Patterns",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec20",
            title: "4.1 Array Methods",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.1 Array Methods.md",
          },
          {
            id: "js-lec21",
            title: "4.2 Destructuring",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.2 Destructuring.md",
          },
          {
            id: "js-lec22",
            title: "4.3 Spread & Rest Operator",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.3 Spread & Rest Operator.md",
          },
          {
            id: "js-lec23",
            title: "4.4 Higher Order Functions",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.4 Higher Order Functions.md",
          },
          {
            id: "js-lec24",
            title: "4.5 Memoization",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.5 Memoization.md",
          },
          {
            id: "js-lec25",
            title: "4.6 Currying",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.6 Currying.md",
          },
          {
            id: "js-lec26",
            title: "4.7 Pure Functions",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.7 Pure Functions.md",
          },
          {
            id: "js-lec27",
            title: "4.8 Optional Chaining & Nullish Coalescing",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.8 Optional Chaining & Nullish Coalescing.md",
          },
          {
            id: "js-lec28",
            title: "4.9 Short-circuit Evaluation",
            path: "docs/coding/JS/Phase 4 - Arrays Objects & Functional Patterns/4.9 Short-circuit Evaluation.md",
          }
        ]
      },
      {
        id: "phase5",
        title: "Phase 5 — DOM & Browser",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec29",
            title: "5.1 DOM Manipulation",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.1 DOM Manipulation.md",
          },
          {
            id: "js-lec30",
            title: "5.2 Events",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.2 Events.md",
          },
          {
            id: "js-lec31",
            title: "5.3 Event Bubbling",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.3 Event Bubbling.md",
          },
          {
            id: "js-lec32",
            title: "5.4 Event Delegation",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.4 Event Delegation.md",
          },
          {
            id: "js-lec33",
            title: "5.5 Debounce & Throttle",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.5 Debounce & Throttle.md",
          },
          {
            id: "js-lec34",
            title: "5.6 localStorage & sessionStorage",
            path: "docs/coding/JS/Phase 5 - DOM & Browser/5.6 localStorage & sessionStorage.md",
          }
        ]
      },
      {
        id: "phase6",
        title: "Phase 6 — Advanced Topics",
        openByDefault: false,
        lectures: [
          {
            id: "js-lec35",
            title: "6.1 Modules (import / export)",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.1 Modules import export.md",
          },
          {
            id: "js-lec36",
            title: "6.2 Error Handling",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.2 Error Handling.md",
          },
          {
            id: "js-lec37",
            title: "6.3 Design Patterns",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.3 Design Patterns.md",
          },
          {
            id: "js-lec38",
            title: "6.4 Memory & Performance",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.4 Memory & Performance.md",
          },
          {
            id: "js-lec39",
            title: "6.5 Generators",
            path: "docs/coding/JS/Phase 6 - Advanced Topics/6.5 Generators.md",
          }
        ]
      }
    ],
    progress: [
      {
        phase: "Phase 1 - Foundations",
        topics: [
          { id: "var-let-const", title: "var / let / const", completed: true },
          { id: "data-types", title: "Data Types", completed: true },
          { id: "scope", title: "Scope", completed: true },
          { id: "hoisting", title: "Hoisting", completed: false },
          {
            id: "type-coercion",
            title: "Type Coercion & Equality",
            completed: false,
          },
          { id: "functions", title: "Functions — All Forms", completed: false },
        ],
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Type safe JavaScript",
    lectures: [],
  },
] as const;

/**
 * Helper function to load markdown content from API endpoint
 */
export const loadMarkdownContent = async (
  filePath: string,
): Promise<string> => {
  try {
    const response = await fetch(
      `/api/notes?file=${encodeURIComponent(filePath)}`,
    );
    if (response.ok) {
      return await response.text();
    } else {
      return `# Error Loading Notes\n\nFailed to load: ${filePath}`;
    }
  } catch (error) {
    return `# Error Loading Notes\n\n${error instanceof Error ? error.message : "Unknown error"}`;
  }
};

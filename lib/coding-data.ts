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
  progress?: Phase[];
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
    progress: [
      {
        phase: "Phase 1 - Foundations",
        topics: [
          { id: "var-let-const", title: "var / let / const", completed: true },
          { id: "data-types", title: "Data Types", completed: false },
          { id: "scope", title: "Scope", completed: false },
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
];

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

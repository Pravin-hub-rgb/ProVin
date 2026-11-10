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
  quizzes?: Lecture[];
  openByDefault?: boolean;
  groups?: LectureGroup[];
};

/**
 * All available coding subjects with their respective lecture content
 * Add new subjects and lectures here only
 */
import { pythonSubject } from "./subjects/python.subject";
import { javascriptSubject } from "./subjects/javascript.subject";
import { webdevSubject } from "./subjects/webdev.subject";
import { iknowcomputersSubject } from "./subjects/iknowcomputers.subject";
import { agenticaiProSubject } from "./subjects/agenticai-pro.subject";
import { agenticaiSubject } from "./subjects/agenticai.subject";
import { gitgithubSubject } from "./subjects/gitgithub.subject";
import { reactSubject } from "./subjects/react.subject";
import { typescriptSubject } from "./subjects/typescript.subject";
import { nextjsSubject } from "./subjects/nextjs.subject";
import { nodejsSubject } from "./subjects/nodejs.subject";
import { dsaSubject } from "./subjects/dsa.subject";
import { coreSubjectsSubject } from "./subjects/coresubjects.subject";
import { csharpSubject } from "./subjects/csharp.subject";
import { careerSubject } from "./subjects/career.subject"
import { systemDesignSubject } from "./subjects/systemdesign.subject";

export const subjects: Subject[] = [
  pythonSubject,
  javascriptSubject,
  webdevSubject,
  iknowcomputersSubject,
  agenticaiProSubject,
  agenticaiSubject,
  gitgithubSubject,
  reactSubject,
  typescriptSubject,
  nextjsSubject,
  nodejsSubject,
  dsaSubject,
  coreSubjectsSubject,
  csharpSubject,
  careerSubject,
  systemDesignSubject,
];

/**
 * Helper function to load markdown content from API endpoint
 * When language is 'hi', tries the Hinglish version first (docs/coding-hi/),
 * falling back to English if the file doesn't exist.
 */
export const loadMarkdownContent = async (
  filePath: string,
  language: "en" | "hi" = "en",
): Promise<string> => {
  const tryPath = (p: string) => `/api/notes?file=${encodeURIComponent(p)}`

  const getHiPath = (p: string) => {
    return p
      .replace("docs/coding/", "docs/coding-hi/")
      .replace("docs/finance/", "docs/finance-hi/")
      .replace("docs/general/", "docs/general-hi/")
  }

  const targetPath = language === "hi" ? getHiPath(filePath) : filePath

  try {
    let response = await fetch(tryPath(targetPath))
    if (!response.ok && language === "hi" && targetPath !== filePath) {
      // Fallback to English if Hinglish version doesn't exist
      response = await fetch(tryPath(filePath))
    }
    if (response.ok) {
      return await response.text()
    } else {
      return `# Error Loading Notes\n\nFailed to load: ${filePath}`
    }
  } catch (error) {
    return `# Error Loading Notes\n\n${error instanceof Error ? error.message : "Unknown error"}`
  }
}

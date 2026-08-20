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

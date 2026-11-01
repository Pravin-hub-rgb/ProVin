export interface Lecture {
  id: string;
  title: string;
  path: string;
  isComponent?: boolean;
}

export interface Phase {
  id: string;
  title: string;
  openByDefault: boolean;
  lectures: Lecture[];
}

export interface ProgressTopic {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProgressPhase {
  phase: string;
  topics: ProgressTopic[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  lectures?: Lecture[];
  phases?: Phase[];
  progress?: ProgressPhase[];
}

export async function loadMarkdownContent(
  filePath: string,
  language: "en" | "hi" = "en",
): Promise<string> {
  const tryPath = (p: string) => `/api/notes?file=${encodeURIComponent(p)}`
  const targetPath = language === "hi" ? filePath.replace("docs/finance/", "docs/finance-hi/") : filePath
  try {
    let response = await fetch(tryPath(targetPath))
    if (!response.ok && language === "hi" && targetPath !== filePath) {
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

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

export async function loadMarkdownContent(path: string): Promise<string> {
  try {
    const res = await fetch(`/api/notes?file=${encodeURIComponent(path)}`);
    if (!res.ok) {
      throw new Error(`Failed to load ${path}`);
    }
    return await res.text();
  } catch (error) {
    console.error('Error loading markdown:', error);
    throw error;
  }
}
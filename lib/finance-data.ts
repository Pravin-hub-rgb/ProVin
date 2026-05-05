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
"use client";

import { Subject } from "@/lib/coding-data";

type Props = {
  subject: Subject;
};
export default function ProgressChecklist({ subject }: Props) {
  if (!subject.progress) return null;

  const totalTopics = subject.progress.reduce((total, phase) => {
    return total + phase.topics.length;
  }, 0);

  const completedTopics = subject.progress.reduce((total, phase) => {
    const completedInPhase = phase.topics.filter(
      (topic) => topic.completed,
    ).length;
    return total + completedInPhase;
  }, 0);
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100);
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
      </div>

      {/* Progress Bar */}
      <div className="mb-10 border border-border/50 rounded-lg p-6 bg-background/50">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {completedTopics} / {totalTopics} topics completed
          </span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>

        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Phases and Checkboxes */}
      <div className="space-y-6">
        {subject.progress.map((phase) => (
          <div
            key={phase.phase}
            className="border border-border/50 rounded-lg overflow-hidden"
          >
            <div className="px-5 py-4 bg-background/70 border-b border-border/50">
              <h3 className="font-medium">{phase.phase}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {phase.topics.length} topics
              </p>
            </div>

            <div className="p-4 space-y-1">
              {phase.topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md ${
                    topic.completed
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={topic.completed}
                    readOnly
                    className="w-4 h-4"
                  />

                  <span className="text-sm">{topic.title}</span>

                  {topic.completed && (
                    <span className="ml-auto text-xs">✓ Done</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

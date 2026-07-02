type LectureLike = { id: string }
type GroupLike = { lectures: LectureLike[]; groups?: GroupLike[] }
type SubjectLike = { lectures?: LectureLike[]; phases?: GroupLike[] }

function getAllLectureIds(subject: SubjectLike): string[] {
  const ids: string[] = []

  if (subject.lectures) {
    for (const lecture of subject.lectures) {
      ids.push(lecture.id)
    }
  }

  if (subject.phases) {
    for (const phase of subject.phases) {
      for (const lecture of phase.lectures) {
        ids.push(lecture.id)
      }
      if (phase.groups) {
        for (const group of phase.groups) {
          for (const lecture of group.lectures) {
            ids.push(lecture.id)
          }
          if (group.groups) {
            for (const subGroup of group.groups) {
              for (const lecture of subGroup.lectures) {
                ids.push(lecture.id)
              }
            }
          }
        }
      }
    }
  }

  return ids
}

export function getSubjectProgress(
  subject: SubjectLike,
  progressData: Record<string, boolean>,
): { completed: number; total: number; percent: number } {
  const allIds = getAllLectureIds(subject)
  const total = allIds.length
  if (total === 0) return { completed: 0, total: 0, percent: 0 }
  const completed = allIds.filter((id) => progressData[id] === true).length
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
  }
}

export type LectureLike = { id: string }
export type LectureGroupLike = {
  lectures?: LectureLike[]
  groups?: LectureGroupLike[]
}

export type SubjectLike = {
  lectures?: LectureLike[]
  phases?: LectureGroupLike[]
}

export function getDefaultLecture(subject: SubjectLike): LectureLike | null {
  if (subject.lectures && subject.lectures.length > 0) return subject.lectures[0]
  for (const phase of subject.phases ?? []) {
    const found = findInGroup(phase)
    if (found) return found
  }
  return null
}

function findInGroup(group: LectureGroupLike): LectureLike | null {
  if (group.lectures && group.lectures.length > 0) return group.lectures[0]
  for (const sub of group.groups ?? []) {
    const found = findInGroup(sub)
    if (found) return found
  }
  return null
}

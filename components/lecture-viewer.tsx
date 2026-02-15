"use client"

import { MarkdownViewer } from "./markdown-viewer"

interface LectureViewerProps {
  content: string
  theme?: 'light' | 'dark'
}

export function LectureViewer({ content, theme = 'light' }: LectureViewerProps) {
  return (
    <MarkdownViewer content={content} theme={theme} />
  )
}

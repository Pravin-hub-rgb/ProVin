"use client"

import { MarkdownHooks } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { ToDoDemo } from './todo-demo'

interface MarkdownViewerProps {
  content: string
  theme?: 'light' | 'dark'
}

export function MarkdownViewer({ content, theme = 'light' }: MarkdownViewerProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownHooks
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{ ...{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm" {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-muted/50 px-2 py-1 rounded text-sm" {...props}>
                {children}
              </code>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="border border-border/50">
                  {children}
                </table>
              </div>
            )
          },
          th({ children }) {
            return (
              <th className="border-b border-border/50 px-4 py-2 text-left bg-muted/50 font-semibold">
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className="border-b border-border/50 px-4 py-2">
                {children}
              </td>
            )
          },
          h1({ children }) {
            return (
              <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent">
                {children}
              </h1>
            )
          },
          h2({ children }) {
            return (
              <h2 className="text-3xl font-bold text-foreground mb-3 mt-8">
                {children}
              </h2>
            )
          },
          h3({ children }) {
            return (
              <h3 className="text-2xl font-semibold text-foreground mb-2 mt-6">
                {children}
              </h3>
            )
          },
          h4({ children }) {
            return (
              <h4 className="text-xl font-medium text-foreground mb-2 mt-4">
                {children}
              </h4>
            )
          },
          p({ children }) {
            return (
              <div className="text-foreground/80 leading-relaxed mb-4">
                {children}
              </div>
            )
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-outside pl-5 text-foreground/80 mb-4 space-y-1">
                {children}
              </ul>
            )
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-outside pl-5 text-foreground/80 mb-4 space-y-1">
                {children}
              </ol>
            )
          },
          li({ children }) {
            return (
              <li className="text-foreground/80">
                {children}
              </li>
            )
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary/50 pl-4 py-2 bg-muted/30 rounded-r-lg my-4 italic">
                {children}
              </blockquote>
            )
          },
          a({ href, children }) {
            return (
              <a 
                href={href} 
                className="text-primary hover:text-primary/80 underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            )
          },
          "todo-demo": ToDoDemo,
        } as Record<string, any>}}
      >
        {content}
      </MarkdownHooks>
    </div>
  )
}

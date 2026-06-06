"use client"

import { useState, useEffect } from 'react'
import { MarkdownHooks } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface MarkdownViewerProps {
  content: string
  theme?: 'light' | 'dark'
}

export function MarkdownViewer({ content, theme = 'light' }: MarkdownViewerProps) {
  // Debug: log content info
  useEffect(() => {
    console.log('[MarkdownViewer] content length:', content?.length, 'typeof:', typeof content)
  }, [content])

  return (
    <div>
      {/* TEST: hardcoded markdown to verify react-markdown works */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-8 p-4 border-2 border-red-500">
        <h3 className="text-lg font-bold text-red-500">TEST — this should render as formatted HTML:</h3>
        <MarkdownHooks remarkPlugins={[remarkGfm]}>
          {'# Hello\n\nThis is **bold** and *italic*.\n\n1. List item one\n2. List item two'}
        </MarkdownHooks>
      </div>

      {/* Debug: show content type and preview */}
      <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-xs font-mono">
        <div>content type: <strong>{typeof content}</strong></div>
        <div>content length: <strong>{content?.length}</strong></div>
        <div>starts with: <strong>{content?.substring(0, 50)}</strong></div>
        <div>ends with: <strong>{content?.substring(content.length - 30)}</strong></div>
        <div>JSON type: <strong>{JSON.stringify(typeof content)}</strong></div>
      </div>

      {/* Test2: content var with SIMPLE MarkdownHooks (no custom components, no rehypeRaw) */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-4 p-4 border-2 border-green-500">
        <h3 className="text-lg font-bold text-green-500">TEST2 — content var, NO custom components:</h3>
        <MarkdownHooks remarkPlugins={[remarkGfm]}>
          {content}
        </MarkdownHooks>
      </div>

      {/* Test3: content var with components but NO rehypeRaw */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-4 p-4 border-2 border-blue-500">
        <h3 className="text-lg font-bold text-blue-500">TEST3 — content var, WITH components, NO rehypeRaw:</h3>
        <MarkdownHooks
          remarkPlugins={[remarkGfm]}
          fallback={<div className="text-muted-foreground">Loading...</div>}
        >
          {content}
        </MarkdownHooks>
      </div>

      {/* Real content (original with key to force remount) */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownHooks
          key={content?.length || 0}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          fallback={<div className="text-muted-foreground">Loading markdown...</div>}
          components={{
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
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {children}
                </p>
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
            }
          }}
        >
          {content}
        </MarkdownHooks>
      </div>
    </div>
  )
}
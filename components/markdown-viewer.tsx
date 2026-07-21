"use client"

import { MarkdownHooks } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { visit } from 'unist-util-visit'
import { ToDoDemo } from './todo-demo'
import type { Element, Root } from 'hast'
import type { ComponentType } from 'react'

interface MarkdownViewerProps {
  content: string
  theme?: 'light' | 'dark'
}

const markdownComponents: Record<string, ComponentType<any> | string> = {
  code({ node, className, children, ...props }: { node?: Element; className?: string; children?: React.ReactNode; [key: string]: any }) {
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
  table({ children }: { children?: React.ReactNode }) {
    return (
      <div className="overflow-x-auto">
        <table className="border border-border/50">
          {children}
        </table>
      </div>
    )
  },
  th({ children }: { children?: React.ReactNode }) {
    return (
      <th className="border-b border-border/50 px-4 py-2 text-left bg-muted/50 font-semibold">
        {children}
      </th>
    )
  },
  td({ children }: { children?: React.ReactNode }) {
    return (
      <td className="border-b border-border/50 px-4 py-2">
        {children}
      </td>
    )
  },
  h1({ children }: { children?: React.ReactNode }) {
    return (
      <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent">
        {children}
      </h1>
    )
  },
  h2({ children }: { children?: React.ReactNode }) {
    return (
      <h2 className="text-3xl font-bold text-foreground mb-3 mt-8">
        {children}
      </h2>
    )
  },
  h3({ children }: { children?: React.ReactNode }) {
    return (
      <h3 className="text-2xl font-semibold text-foreground mb-2 mt-6">
        {children}
      </h3>
    )
  },
  h4({ children }: { children?: React.ReactNode }) {
    return (
      <h4 className="text-xl font-medium text-foreground mb-2 mt-4">
        {children}
      </h4>
    )
  },
  p({ children }: { children?: React.ReactNode }) {
    return (
      <div className="text-foreground/80 leading-relaxed mb-4">
        {children}
      </div>
    )
  },
  ul({ children }: { children?: React.ReactNode }) {
    return (
      <ul className="list-disc list-outside pl-5 text-foreground/80 mb-4 space-y-1">
        {children}
      </ul>
    )
  },
  ol({ children }: { children?: React.ReactNode }) {
    return (
      <ol className="list-decimal list-outside pl-5 text-foreground/80 mb-4 space-y-1">
        {children}
      </ol>
    )
  },
  li({ children }: { children?: React.ReactNode }) {
    return (
      <li className="text-foreground/80">
        {children}
      </li>
    )
  },
  blockquote({ children }: { children?: React.ReactNode }) {
    return (
      <blockquote className="border-l-4 border-primary/50 pl-4 py-2 bg-muted/30 rounded-r-lg my-4 italic">
        {children}
      </blockquote>
    )
  },
  a({ href, children }: { href?: string; children?: React.ReactNode }) {
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
}

function stripReactProps() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.properties) {
        delete node.properties.ref
        delete node.properties.key
      }
    })
  }
}

function escapeNonHtmlAngleBrackets(markdown: string): string {
  const codeBlocks: string[] = [];
  const noCodeBlocks = markdown.replace(/(```[\s\S]*?```)/g, (m) => {
    codeBlocks.push(m);
    return `\x00CB_${codeBlocks.length - 1}\x00`;
  });
  const inlines: string[] = [];
  const noInline = noCodeBlocks.replace(/(`[^`]*`)/g, (m) => {
    inlines.push(m);
    return `\x00IC_${inlines.length - 1}\x00`;
  });
  const escaped = noInline.replace(/<([^>]+)>/g, (match, inner) => {
    const tagName = inner.split(/\s+/)[0].replace(/^\//, '');
    if (/^[a-z][a-z0-9-]*$/.test(tagName) && !/[\[\]|<>]/.test(inner) && !/=\s*\{[^}]*\}/.test(inner)) return match;
    return `&lt;${inner}&gt;`;
  });
  const withInline = escaped.replace(/\x00IC_(\d+)\x00/g, (_, i) => inlines[+i]);
  return withInline.replace(/\x00CB_(\d+)\x00/g, (_, i) => codeBlocks[+i]);
}

export function MarkdownViewer({ content, theme = 'light' }: MarkdownViewerProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MarkdownHooks
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, stripReactProps]}
        components={markdownComponents}
      >
        {escapeNonHtmlAngleBrackets(content)}
      </MarkdownHooks>
    </div>
  )
}

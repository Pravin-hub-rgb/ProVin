"use server"

import fs from 'fs'
import path from 'path'

interface MarkdownReaderProps {
  filePath: string
}

export async function MarkdownReader({ filePath }: MarkdownReaderProps) {
  try {
    // Read the markdown file
    const fullPath = path.join(process.cwd(), filePath)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    return content
  } catch (error) {
    console.error('Error reading markdown file:', error)
    return `# Error Loading Notes

The notes file could not be loaded. Please check if the file exists at:

\`\`\`
${filePath}
\`\`\`

**Error Details:**
\`\`\`
${error instanceof Error ? error.message : 'Unknown error'}
\`\`\`

Please make sure the file path is correct and the file exists in your project.`
  }
}
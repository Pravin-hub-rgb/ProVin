import { NextResponse } from 'next/server'
import { readFile, access, constants } from 'fs/promises'
import { join, resolve } from 'path'

// Configure for static export - this route should be generated at build time
export const dynamic = 'force-static'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const file = url.searchParams.get('file')
  
  if (!file) {
    return NextResponse.json(
      { error: 'File parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Decode URL-encoded file path to handle spaces and special characters
    const decodedFilePath = decodeURIComponent(file)
    
    // Remove any leading slash from the file path
    const cleanFilePath = decodedFilePath.startsWith('/') ? decodedFilePath.slice(1) : decodedFilePath
    
    // Resolve the file path relative to the project root
    const filePath = join(process.cwd(), cleanFilePath)
    
    console.log('Original file parameter:', file)
    console.log('Decoded file path:', decodedFilePath)
    console.log('Clean file path:', cleanFilePath)
    console.log('Full file path:', filePath)
    
    // Validate that the file path is within the project directory (security check)
    const projectRoot = process.cwd()
    const resolvedPath = resolve(filePath)
    if (!resolvedPath.startsWith(projectRoot)) {
      console.error('Security violation: Attempted directory traversal')
      return NextResponse.json(
        { 
          error: 'Invalid file path',
          details: 'Access to files outside project directory is not allowed'
        },
        { status: 400 }
      )
    }
    
    // Check if file exists before attempting to read
    try {
      await access(filePath, constants.F_OK)
    } catch (accessError) {
      console.error('File does not exist:', filePath)
      return NextResponse.json(
        { 
          error: 'File not found',
          details: 'The requested file does not exist',
          filePath: cleanFilePath
        },
        { status: 404 }
      )
    }
    
    // Read the file content
    const content = await readFile(filePath, 'utf-8')
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown',
      },
    })
  } catch (error) {
    console.error('Error reading file:', error)
    
    return NextResponse.json(
      { 
        error: 'File could not be read',
        details: error instanceof Error ? error.message : 'Unknown error',
        filePath: file
      },
      { status: 500 }
    )
  }
}

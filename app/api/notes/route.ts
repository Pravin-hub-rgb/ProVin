import { NextResponse } from 'next/server'
import { readFile, writeFile, access, constants } from 'fs/promises'
import { join, resolve } from 'path'

// This API route needs to run dynamically at request time
export const dynamic = 'force-dynamic'

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
    
    // Validate that the file path is within the project directory
    const projectRoot = process.cwd()
    const resolvedPath = resolve(filePath)
    const resolvedRoot = resolve(projectRoot)
    
    if (!resolvedPath.startsWith(resolvedRoot)) {
      return NextResponse.json(
        { error: 'Access denied: file must be within project directory' },
        { status: 403 }
      )
    }
    
    // Check if file exists and is readable
    await access(filePath, constants.R_OK)
    
    // Read the file content
    const content = await readFile(filePath, 'utf-8')
    
    // Return the content as plain text
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { file, content } = body
    
    if (!file || content === undefined) {
      return NextResponse.json(
        { error: 'File and content parameters are required' },
        { status: 400 }
      )
    }
    
    // Decode URL-encoded file path
    const decodedFilePath = decodeURIComponent(file)
    const cleanFilePath = decodedFilePath.startsWith('/') ? decodedFilePath.slice(1) : decodedFilePath
    const filePath = join(process.cwd(), cleanFilePath)
    
    // Validate that the file path is within the project directory
    const projectRoot = process.cwd()
    const resolvedPath = resolve(filePath)
    const resolvedRoot = resolve(projectRoot)
    
    if (!resolvedPath.startsWith(resolvedRoot)) {
      return NextResponse.json(
        { error: 'Access denied: file must be within project directory' },
        { status: 403 }
      )
    }
    
    // Write the file
    await writeFile(filePath, content, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error writing file:', error)
    return NextResponse.json(
      { 
        error: 'File could not be written',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'posts.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { posts } = body;

    if (!Array.isArray(posts)) {
      return NextResponse.json(
        { error: 'Invalid posts data - expected an array' },
        { status: 400 }
      );
    }

    // Validate post structure
    const isValidPost = (post: any) => {
      return (
        typeof post.id === 'number' &&
        typeof post.title === 'string' &&
        typeof post.excerpt === 'string' &&
        typeof post.category === 'string' &&
        (!post.image || typeof post.image === 'string')
      );
    };

    if (!posts.every(isValidPost)) {
      return NextResponse.json(
        { error: 'Invalid post structure' },
        { status: 400 }
      );
    }

    await fs.writeFile(DATA_FILE, JSON.stringify({ posts }, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Posts saved successfully'
    });
  } catch (error) {
    // Log the full error details
    console.error('Error saving posts:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        error: 'Failed to save posts',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
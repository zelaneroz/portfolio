import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/lib/types';

const blogDataPath = path.join(process.cwd(), 'lib', 'blog-data.json');

function readBlogPosts(): BlogPost[] {
  try {
    const fileContent = fs.readFileSync(blogDataPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

function writeBlogPosts(posts: BlogPost[]): void {
  fs.writeFileSync(blogDataPath, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET() {
  try {
    const posts = readBlogPosts();
    // Sort by date descending (newest first)
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime()
    );
    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, date, image, content } = body;

    if (!title || !subtitle || !date || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const posts = readBlogPosts();
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      subtitle,
      date,
      image,
      content: content || '',
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    writeBlogPosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}


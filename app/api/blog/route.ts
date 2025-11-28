import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/lib/types';

const blogDataPath = path.join(process.cwd(), 'lib', 'blog-data.json');
const blogMarkdownDir = path.join(process.cwd(), 'lib', 'blog');

// Ensure blog directory exists
if (!fs.existsSync(blogMarkdownDir)) {
  fs.mkdirSync(blogMarkdownDir, { recursive: true });
}

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

function getNextMarkdownNumber(): string {
  const posts = readBlogPosts();
  if (posts.length === 0) return '01';
  
  // Find the highest number
  const numbers = posts
    .map(post => {
      const match = post.markdownFile?.match(/^(\d+)\.md$/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => n > 0);
  
  if (numbers.length === 0) return '01';
  
  const maxNum = Math.max(...numbers);
  const nextNum = maxNum + 1;
  return nextNum.toString().padStart(2, '0');
}

function readMarkdownFile(filename: string): string {
  try {
    const filePath = path.join(blogMarkdownDir, filename);
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return '';
  }
}

function writeMarkdownFile(filename: string, content: string): void {
  const filePath = path.join(blogMarkdownDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
}

export async function GET() {
  try {
    const posts = readBlogPosts();
    
    // Add markdown content to each post
    const postsWithContent = posts.map(post => {
      if (post.markdownFile) {
        return {
          ...post,
          content: readMarkdownFile(post.markdownFile),
        };
      }
      return post;
    });
    
    // Sort by date descending (newest first)
    const sortedPosts = postsWithContent.sort((a, b) => 
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

    // Generate markdown filename
    const markdownFile = `${getNextMarkdownNumber()}.md`;
    
    // Save markdown content to file
    writeMarkdownFile(markdownFile, content || '');

    const posts = readBlogPosts();
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      subtitle,
      date,
      image,
      markdownFile,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    writeBlogPosts(posts);

    return NextResponse.json({ ...newPost, content }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const blogImagesDir = path.join(process.cwd(), 'public', 'images', 'blog');

// Ensure directory exists
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name) || '.jpg';
    const filename = `${timestamp}${ext}`;
    const filePath = path.join(blogImagesDir, filename);

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/images/blog/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      url: imageUrl,
      filename: filename
    }, { status: 200 });

  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json({ 
      error: `Upload failed: ${error.message || 'Unknown error'}` 
    }, { status: 500 });
  }
}


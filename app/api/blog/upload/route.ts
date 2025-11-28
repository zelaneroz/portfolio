import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const blogImagesDir = path.join(process.cwd(), 'public', 'images', 'blog');

// Ensure directory exists
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
}

// Route configuration
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Upload endpoint called');
    
    // Check authentication
    const session = request.cookies.get('admin_session');
    console.log('Session check:', session?.value);
    if (!session || session.value !== 'authenticated') {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure directory exists
    if (!fs.existsSync(blogImagesDir)) {
      console.log('Creating blog images directory:', blogImagesDir);
      fs.mkdirSync(blogImagesDir, { recursive: true });
    }

    const formData = await request.formData();
    console.log('FormData received, keys:', Array.from(formData.keys()));
    
    const file = formData.get('file') as File | null;
    console.log('File received:', file ? { name: file.name, size: file.size, type: file.type } : 'null');

    if (!file) {
      console.log('No file in FormData');
      return NextResponse.json({ error: 'No file provided in request' }, { status: 400 });
    }

    if (file.size === 0) {
      console.log('File is empty');
      return NextResponse.json({ error: 'File is empty' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    console.log('File type:', file.type);
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF` 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.name) || '.jpg';
    const filename = `${timestamp}${ext}`;
    const filePath = path.join(blogImagesDir, filename);
    console.log('Saving to:', filePath);

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Buffer size:', buffer.length);

    // Write file
    try {
      fs.writeFileSync(filePath, buffer);
      console.log('File written successfully');
    } catch (writeError: any) {
      console.error('Write error:', writeError);
      return NextResponse.json({ 
        error: `Failed to write file: ${writeError.message}` 
      }, { status: 500 });
    }

    const imageUrl = `/images/blog/${filename}`;
    console.log('Upload successful, URL:', imageUrl);
    
    return NextResponse.json({ 
      success: true, 
      url: imageUrl,
      filename: filename
    }, { status: 200 });

  } catch (error: any) {
    console.error('Image upload error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ 
      error: `Upload failed: ${error.message || 'Unknown error'}`,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}


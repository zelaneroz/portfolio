import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'lib', 'projects-data.json');

function readData(): any[] {
  try {
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

function writeData(items: any[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf8');
}

export async function GET() {
  try {
    const items = readData();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, img, description, tech, github } = body;

    if (!title || !img || !description || !tech) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const items = readData();
    const newItem = {
      title,
      img,
      description,
      tech,
      github: github || "",
    };

    items.push(newItem);
    writeData(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'lib', 'work-data.json');

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
    return NextResponse.json({ error: 'Failed to fetch work items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { logo, company, position, location, dates, bullets, tags, category } = body;

    if (!logo || !company || !position || !dates || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const items = readData();
    // Get the highest ID and add 1
    const maxId = items.length > 0 ? Math.max(...items.map((item: any) => item.id || 0)) : 0;
    
    const newItem = {
      id: maxId + 1,
      logo,
      company,
      position,
      location: location || "",
      dates,
      bullets: bullets || [],
      tags: tags || [],
      category,
    };

    items.push(newItem);
    writeData(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create work item' }, { status: 500 });
  }
}


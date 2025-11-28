# Backend Architecture Overview

## System Architecture

```
┌─────────────┐
│   Client    │ (Admin Dashboard / Blog Page)
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────┐
│      Next.js API Routes         │
│   (app/api/*/route.ts)          │
├─────────────────────────────────┤
│  1. Authentication Check        │
│  2. Request Validation          │
│  3. File System Operations      │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│      JSON Data Storage          │
│      (lib/*-data.json)          │
└─────────────────────────────────┘
```

## Authentication Flow

### 1. Login (`/api/admin/login`)
```
POST /api/admin/login
Body: { password: "admin123" }
       ↓
Check password (env var or default)
       ↓
If valid → Set cookie: admin_session = "authenticated"
       ↓
Return: { success: true }
```

**Cookie Properties:**
- `httpOnly: true` - JavaScript can't access (security)
- `secure: true` in production - HTTPS only
- `maxAge: 24 hours` - Expires after 1 day
- `sameSite: 'lax'` - CSRF protection

### 2. Check Auth (`/api/admin/check`)
```
GET /api/admin/check
       ↓
Read cookie: admin_session
       ↓
Return: { authenticated: true/false }
```

### 3. Logout (`/api/admin/logout`)
```
POST /api/admin/logout
       ↓
Delete cookie: admin_session
       ↓
Return: { success: true }
```

## Data Management Flow

### Example: Creating a Blog Post

```
1. Admin fills form → Clicks "Create Blog Post"
       ↓
2. POST /api/blog
   Headers: Cookie: admin_session=authenticated
   Body: { title, subtitle, date, image, content }
       ↓
3. API Route checks authentication:
   - Read cookie from request
   - If not authenticated → Return 401 Unauthorized
       ↓
4. Validate request data:
   - Check required fields (title, subtitle, date, image)
   - If missing → Return 400 Bad Request
       ↓
5. Read existing data:
   - fs.readFileSync('lib/blog-data.json')
   - Parse JSON → Array of blog posts
       ↓
6. Create new post:
   - Generate unique ID (timestamp)
   - Add createdAt timestamp
   - Push to array
       ↓
7. Write back to file:
   - JSON.stringify(posts, null, 2) - Pretty format
   - fs.writeFileSync('lib/blog-data.json')
       ↓
8. Return success:
   - Status: 201 Created
   - Body: New blog post object
```

### Example: Reading Blog Posts

```
1. Blog page loads → useEffect fetches data
       ↓
2. GET /api/blog
   (No authentication needed - public endpoint)
       ↓
3. API Route:
   - Read file: fs.readFileSync('lib/blog-data.json')
   - Parse JSON
   - Sort by date (newest first)
       ↓
4. Return data:
   - Status: 200 OK
   - Body: Array of blog posts
```

## API Route Structure

All CRUD routes follow this pattern:

```typescript
// GET - Read data (public)
export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '...' }, { status: 500 });
  }
}

// POST - Create data (protected)
export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate request
    const body = await request.json();
    if (!body.requiredField) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 3. Read existing data
    const items = readData();

    // 4. Add new item
    const newItem = { ...body, id: Date.now() };
    items.push(newItem);

    // 5. Write back to file
    writeData(items);

    // 6. Return success
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '...' }, { status: 500 });
  }
}
```

## File System Operations

### Helper Functions Pattern

```typescript
// Path to data file
const dataPath = path.join(process.cwd(), 'lib', 'data.json');

// Read data
function readData(): Item[] {
  try {
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return []; // Return empty array if file doesn't exist
  }
}

// Write data
function writeData(items: Item[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf8');
  // Pretty format with 2-space indentation
}
```

## Security Features

1. **Cookie-based Authentication**
   - Session stored in httpOnly cookie
   - Can't be accessed by client-side JavaScript
   - Automatically sent with requests

2. **Password Protection**
   - Environment variable: `ADMIN_PASSWORD`
   - Default fallback: `admin123` (change in production!)

3. **Request Validation**
   - All POST requests require authentication
   - Required fields are validated
   - Type checking before saving

4. **Error Handling**
   - Try-catch blocks around all operations
   - Proper HTTP status codes
   - Error messages for debugging

## Current Limitations & Future Improvements

### Current (Simple) Approach:
- ✅ File-based storage (easy to manage)
- ✅ Cookie-based sessions
- ✅ Simple password auth

### Production Improvements Needed:
1. **Database Migration**
   - Move from JSON files to real database (PostgreSQL, MongoDB)
   - Better for concurrent writes
   - Query capabilities

2. **Enhanced Security**
   - Password hashing (bcrypt)
   - JWT tokens instead of simple cookies
   - Rate limiting
   - CSRF tokens

3. **Additional Features**
   - PUT/DELETE routes (update/delete items)
   - Image upload functionality
   - Data validation schemas (Zod)
   - Error logging

4. **Performance**
   - Caching layer (Redis)
   - Database indexes
   - Pagination for large datasets

## API Endpoints Summary

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/admin/login` | POST | No | Authenticate admin |
| `/api/admin/check` | GET | No | Check auth status |
| `/api/admin/logout` | POST | No | Logout admin |
| `/api/blog` | GET | No | Get all blog posts |
| `/api/blog` | POST | Yes | Create blog post |
| `/api/fieldnotes` | GET | No | Get all field notes |
| `/api/fieldnotes` | POST | Yes | Create field note |
| `/api/projects` | GET | No | Get all projects |
| `/api/projects` | POST | Yes | Create project |
| `/api/work` | GET | No | Get all work items |
| `/api/work` | POST | Yes | Create work item |

## Request/Response Examples

### Login Request
```http
POST /api/admin/login
Content-Type: application/json

{
  "password": "admin123"
}
```

### Login Response (Success)
```json
{
  "success": true
}
Set-Cookie: admin_session=authenticated; HttpOnly; Max-Age=86400
```

### Create Blog Post Request
```http
POST /api/blog
Content-Type: application/json
Cookie: admin_session=authenticated

{
  "title": "My New Post",
  "subtitle": "A great post",
  "date": "2025-01-15",
  "image": "/images/blog/post.jpg",
  "content": "Blog content here..."
}
```

### Create Blog Post Response (Success)
```json
{
  "id": "1705276800000",
  "title": "My New Post",
  "subtitle": "A great post",
  "date": "2025-01-15",
  "image": "/images/blog/post.jpg",
  "content": "Blog content here...",
  "createdAt": "2025-01-15T12:00:00.000Z"
}
```


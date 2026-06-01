# API Documentation - NxtBuild

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**
- `name`: 2-100 characters
- `email`: Valid email format
- `password`: Min 8 characters, must contain uppercase, lowercase, and numbers

**Response (201):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

---

### Login
**POST** `/auth/login`

Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Get Current User
**GET** `/auth/me`

Requires authentication.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Logout
**POST** `/auth/logout`

Requires authentication.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

## Project Endpoints

### Get All Projects
**GET** `/projects`

Requires authentication.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "project_id",
      "title": "My Portfolio",
      "description": "Personal portfolio website",
      "code": "<html>...</html>",
      "messages": [],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Project
**POST** `/projects`

Requires authentication.

**Request Body:**
```json
{
  "title": "My New Project"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "project_id",
    "title": "My New Project",
    "code": "",
    "messages": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get Project
**GET** `/projects/:id`

Requires authentication.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "project_id",
    "title": "My Portfolio",
    "code": "<html>...</html>",
    "messages": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update Project
**PUT** `/projects/:id`

Requires authentication.

**Request Body:**
```json
{
  "title": "Updated Project Title",
  "code": "<html>...</html>",
  "description": "Project description"
}
```

**Validation Rules:**
- `title`: 1-200 characters
- `code`: Must be string
- `description`: Max 1000 characters

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "project_id",
    "title": "Updated Project Title",
    "code": "<html>...</html>"
  }
}
```

---

### Delete Project
**DELETE** `/projects/:id`

Requires authentication.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Project deleted"
  }
}
```

---

## Generation Endpoints

### Generate Code
**POST** `/generation/:projectId`

Generates HTML/CSS/JS code using AI based on prompt.

**Request Body:**
```json
{
  "projectId": "project_id",
  "prompt": "Create a modern landing page for a SaaS product with pricing"
}
```

**Validation Rules:**
- `projectId`: Required
- `prompt`: 5-5000 characters

**Response (200):**
```json
{
  "success": true,
  "data": {
    "code": "<!DOCTYPE html>...",
    "message": "Code generated successfully",
    "updatedProject": {
      "id": "project_id",
      "code": "<!DOCTYPE html>...",
      "messages": [
        {
          "role": "user",
          "content": "Create a modern landing page...",
          "timestamp": "2024-01-15T10:30:00Z"
        },
        {
          "role": "assistant",
          "content": "Here's your generated code...",
          "timestamp": "2024-01-15T10:30:05Z"
        }
      ]
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "prompt",
      "message": "Prompt must be between 5 and 5000 characters"
    }
  ]
}
```

---

## Error Codes

| Code | Message | Explanation |
|------|---------|-------------|
| 400 | Bad Request | Invalid input or validation failed |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | User doesn't have permission |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Window**: 15 minutes
- **Max Requests**: 100 per window per IP

Rate limit headers included in response:
```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1642252800
```

---

## Example Requests

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"SecurePass123"}'

# Get Projects
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>"

# Generate Code
curl -X POST http://localhost:5000/api/generation/project_id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"project_id","prompt":"Create a landing page"}'
```

### Using JavaScript/Fetch
```javascript
// Register
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});
const data = await response.json();
console.log(data);
```

---

## Best Practices

1. **Always include Authorization header** for protected endpoints
2. **Validate input** before sending to API
3. **Handle errors** gracefully in your client
4. **Use pagination** for large datasets
5. **Cache responses** when appropriate
6. **Implement retry logic** for failed requests
7. **Log API errors** for debugging

---

## Security

- All endpoints use HTTPS in production
- Sensitive data is encrypted
- Rate limiting prevents abuse
- Input is validated and sanitized
- XSS and SQL injection protections enabled


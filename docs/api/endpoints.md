# API Documentation

Base URL: `http://localhost:4000/api/v1`

## Authentication

All protected routes require a valid JWT token sent via HTTP-only cookie.

### User Routes

#### Register User
```http
POST /user/register
Content-Type: multipart/form-data

Body:
- fullName: string
- email: string
- password: string
- phone: string
- aboutMe: string
- portfolioURL: string
- githubURL: string
- linkedInURL: string
- avatar: file
- resume: file
```

#### Login
```http
POST /user/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "token": "jwt_token"
}
```

#### Logout
```http
GET /user/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Get User Profile
```http
GET /user/me
Authorization: Required

Response:
{
  "success": true,
  "user": { ... }
}
```

#### Update Profile
```http
PUT /user/update/profile
Authorization: Required
Content-Type: application/json

Body:
{
  "fullName": "Updated Name",
  "email": "newemail@example.com",
  ...
}
```

#### Update Password
```http
PUT /user/update/password
Authorization: Required
Content-Type: application/json

Body:
{
  "currentPassword": "oldpass",
  "newPassword": "newpass",
  "confirmNewPassword": "newpass"
}
```

### Project Routes

#### Get All Projects
```http
GET /project/getall

Response:
{
  "success": true,
  "projects": [ ... ]
}
```

#### Add Project
```http
POST /project/add
Authorization: Required
Content-Type: multipart/form-data

Body:
- title: string
- description: string
- gitRepoLink: string
- projectLink: string
- technologies: string
- stack: string
- deployed: string
- projectBanner: file
```

#### Update Project
```http
PUT /project/update/:id
Authorization: Required
Content-Type: multipart/form-data
```

#### Delete Project
```http
DELETE /project/delete/:id
Authorization: Required

Response:
{
  "success": true,
  "message": "Project deleted"
}
```

### Skill Routes

#### Get All Skills
```http
GET /skill/getall

Response:
{
  "success": true,
  "skills": [ ... ]
}
```

#### Add Skill
```http
POST /skill/add
Authorization: Required
Content-Type: multipart/form-data

Body:
- title: string
- proficiency: number
- svg: file
```

#### Update Skill
```http
PUT /skill/update/:id
Authorization: Required
```

#### Delete Skill
```http
DELETE /skill/delete/:id
Authorization: Required
```

### Timeline Routes

#### Get All Timeline Entries
```http
GET /timeline/getall

Response:
{
  "success": true,
  "timelines": [ ... ]
}
```

#### Add Timeline Entry
```http
POST /timeline/add
Authorization: Required
Content-Type: application/json

Body:
{
  "title": "Education/Job Title",
  "description": "Description",
  "from": "2020",
  "to": "2024"
}
```

#### Delete Timeline Entry
```http
DELETE /timeline/delete/:id
Authorization: Required
```

### Software Application Routes

#### Get All Applications
```http
GET /softwareapplication/getall

Response:
{
  "success": true,
  "softwareApplications": [ ... ]
}
```

#### Add Application
```http
POST /softwareapplication/add
Authorization: Required
Content-Type: multipart/form-data

Body:
- name: string
- svg: file
```

#### Delete Application
```http
DELETE /softwareapplication/delete/:id
Authorization: Required
```

### Message Routes

#### Send Message
```http
POST /message/send
Content-Type: application/json

Body:
{
  "senderName": "John Doe",
  "subject": "Inquiry",
  "message": "Message content"
}
```

#### Get All Messages
```http
GET /message/getall
Authorization: Required

Response:
{
  "success": true,
  "messages": [ ... ]
}
```

#### Delete Message
```http
DELETE /message/delete/:id
Authorization: Required
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

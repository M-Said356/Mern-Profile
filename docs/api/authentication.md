# Authentication

Authentication and authorization documentation for the MERN Portfolio API.

## Overview

The application uses JWT (JSON Web Tokens) for authentication with HTTP-only cookies.

## Authentication Flow

```
┌──────┐         ┌──────────┐         ┌──────────┐
│Client│         │  Backend │         │ Database │
└──┬───┘         └────┬─────┘         └────┬─────┘
   │                  │                     │
   │ POST /login      │                     │
   ├─────────────────>│                     │
   │                  │ Verify credentials  │
   │                  ├────────────────────>│
   │                  │<────────────────────┤
   │                  │ Generate JWT        │
   │                  │                     │
   │ Set-Cookie: JWT  │                     │
   │<─────────────────┤                     │
   │                  │                     │
   │ GET /protected   │                     │
   ├─────────────────>│                     │
   │ Cookie: JWT      │ Verify JWT          │
   │                  │                     │
   │ Response         │                     │
   │<─────────────────┤                     │
```

## Login

### Request

```http
POST /api/v1/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "fullName": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## JWT Token

### Token Structure

```
Header.Payload.Signature
```

### Payload

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Token Storage

- Stored in HTTP-only cookie
- Not accessible via JavaScript
- Secure flag in production
- SameSite attribute set

## Protected Routes

### Middleware

```javascript
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login to access this resource'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};
```

## Logout

```http
GET /api/v1/user/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Security Best Practices

- Use HTTPS in production
- Strong JWT secret (32+ characters)
- Short token expiration (7 days)
- HTTP-only cookies
- CSRF protection
- Rate limiting on auth endpoints
- Password hashing with bcrypt

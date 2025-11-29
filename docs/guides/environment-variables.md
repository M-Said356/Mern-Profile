# Environment Variables

Complete guide to configuring environment variables.

## Backend Environment Variables

Location: `backend/.env`

### Required Variables

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/portfolio

# JWT Configuration
JWT_SECRET_KEY=your_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
```

### Variable Descriptions

#### PORT
- **Type:** Number
- **Default:** 4000
- **Description:** Port for backend server

#### NODE_ENV
- **Type:** String
- **Values:** `development`, `production`, `test`
- **Description:** Application environment

#### MONGO_URI
- **Type:** String
- **Format:** `mongodb://[username:password@]host[:port]/database`
- **Description:** MongoDB connection string

#### JWT_SECRET_KEY
- **Type:** String
- **Description:** Secret key for JWT signing
- **Security:** Use a strong, random string (32+ characters)

#### JWT_EXPIRE
- **Type:** String
- **Format:** `7d`, `24h`, `60m`
- **Description:** JWT token expiration time

#### COOKIE_EXPIRE
- **Type:** Number
- **Description:** Cookie expiration in days

#### CLOUDINARY_*
- **Description:** Cloudinary credentials for file uploads
- **Get from:** https://cloudinary.com/console

## Frontend Environment Variables

### Dashboard (.env)

```env
VITE_API_URL=http://localhost:4000/api/v1
```

### Portfolio (.env)

```env
VITE_API_URL=http://localhost:4000/api/v1
```

## Production Configuration

### Backend Production

```env
PORT=4000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET_KEY=<strong-random-secret>
CLOUDINARY_CLOUD_NAME=prod_cloud_name
CLOUDINARY_API_KEY=prod_api_key
CLOUDINARY_API_SECRET=prod_api_secret
FRONTEND_URL=https://yourportfolio.com
DASHBOARD_URL=https://admin.yourportfolio.com
```

### Security Best Practices

1. **Never commit .env files** to version control
2. **Use strong secrets** (generate with crypto)
3. **Different credentials** for each environment
4. **Rotate secrets** regularly
5. **Use environment-specific** values

## Generating Secrets

### JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using the Tool

```bash
node tools/generate-env.js
```

## Validation

Validate your environment variables:

```bash
node tools/env-validator.js
```

## Docker Environment

For Docker deployments, use `.devops/.env`:

```env
MONGO_URI=mongodb://mongodb:27017/portfolio
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=secure_password
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Kubernetes Secrets

For Kubernetes, create secrets:

```bash
kubectl create secret generic app-secrets \
  --from-literal=mongo-uri='your_mongo_uri' \
  --from-literal=jwt-secret='your_jwt_secret' \
  --from-literal=cloudinary-name='your_cloud_name' \
  --from-literal=cloudinary-key='your_api_key' \
  --from-literal=cloudinary-secret='your_api_secret'
```

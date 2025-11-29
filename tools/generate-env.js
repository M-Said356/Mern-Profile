const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envTemplate = `# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/portfolio

# JWT Configuration
JWT_SECRET_KEY=${crypto.randomBytes(32).toString('hex')}
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs
FRONTEND_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001
`;

const envPath = path.join(__dirname, '../backend/.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Skipping...');
  process.exit(0);
}

fs.writeFileSync(envPath, envTemplate);
console.log('✅ Generated backend/.env file with random JWT secret');
console.log('⚠️  Please update Cloudinary credentials!');

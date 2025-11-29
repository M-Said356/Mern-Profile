const fs = require('fs');
const path = require('path');

const requiredEnvVars = {
  backend: [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET_KEY',
    'JWT_EXPIRE',
    'COOKIE_EXPIRE',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ]
};

function validateEnv(envPath, requiredVars) {
  if (!fs.existsSync(envPath)) {
    console.error(`❌ ${envPath} not found!`);
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0].trim());

  const missing = requiredVars.filter(v => !envVars.includes(v));

  if (missing.length > 0) {
    console.error(`❌ Missing environment variables in ${envPath}:`);
    missing.forEach(v => console.error(`   - ${v}`));
    return false;
  }

  console.log(`✅ ${envPath} is valid`);
  return true;
}

console.log('🔍 Validating environment variables...\n');

const backendEnv = path.join(__dirname, '../backend/.env');
const isValid = validateEnv(backendEnv, requiredEnvVars.backend);

if (isValid) {
  console.log('\n✅ All environment variables are configured correctly!');
  process.exit(0);
} else {
  console.log('\n❌ Environment validation failed!');
  process.exit(1);
}

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKUP_DIR = path.join(__dirname, '../backups');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);

// Create backup directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

console.log('🗄️  Starting database backup...');
console.log(`📁 Backup location: ${backupPath}`);

const command = `mongodump --uri="${MONGO_URI}" --out="${backupPath}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
  
  if (stderr) {
    console.error('⚠️  Warning:', stderr);
  }
  
  console.log('✅ Backup completed successfully!');
  console.log(stdout);
});

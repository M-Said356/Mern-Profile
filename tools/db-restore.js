const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKUP_DIR = path.join(__dirname, '../backups');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

// Get the latest backup
const backups = fs.readdirSync(BACKUP_DIR)
  .filter(file => file.startsWith('backup-'))
  .sort()
  .reverse();

if (backups.length === 0) {
  console.error('❌ No backups found!');
  process.exit(1);
}

const latestBackup = path.join(BACKUP_DIR, backups[0]);

console.log('🔄 Starting database restore...');
console.log(`📁 Restoring from: ${latestBackup}`);

const command = `mongorestore --uri="${MONGO_URI}" --drop "${latestBackup}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Restore failed:', error.message);
    process.exit(1);
  }
  
  if (stderr) {
    console.error('⚠️  Warning:', stderr);
  }
  
  console.log('✅ Restore completed successfully!');
  console.log(stdout);
});

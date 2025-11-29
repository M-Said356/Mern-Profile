# MERN Portfolio with Admin Panel

A full-stack portfolio application with an admin dashboard built using the MERN stack.

## 🚀 Project Structure

```
├── backend/          # Node.js + Express API
├── dashboard/        # React Admin Dashboard
├── portfolio/        # React Portfolio Frontend
├── .github/          # GitHub Actions CI/CD workflows
├── .devops/          # Docker, Kubernetes, Nginx configs
├── scripts/          # Build, deploy, and test scripts
└── tools/            # Utility scripts
```

## 📋 Prerequisites

- Node.js 18+ or 20+
- MongoDB
- npm or yarn

## 🛠️ Quick Start

### Setup All Projects
```bash
# Windows
.\scripts\setup.ps1

# Linux/Mac
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Development

Run each service in separate terminals:

```bash
# Backend
cd backend && npm run dev

# Dashboard
cd dashboard && npm run dev

# Portfolio
cd portfolio && npm run dev
```

## 🐳 Docker Deployment

```bash
cd .devops
docker-compose up -d
```

## 📦 Build

```bash
# Windows
.\scripts\build.ps1

# Linux/Mac
./scripts/build.sh
```

## 🧪 Testing

```bash
# Windows
.\scripts\test.ps1

# Linux/Mac
./scripts/test.sh
```

## 🔧 Tools

- `tools/env-validator.js` - Validate environment variables
- `tools/health-check.js` - Check service health
- `tools/db-backup.js` - Backup MongoDB database
- `tools/db-restore.js` - Restore MongoDB database
- `tools/generate-env.js` - Generate .env template

## 📝 License

MIT

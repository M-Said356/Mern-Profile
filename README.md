<div align="center">

# 🚀 MERN Portfolio with Admin Panel

[![CI Pipeline](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/ci.yml/badge.svg)](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/ci.yml)
[![Docker Build](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/docker.yml/badge.svg)](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/docker.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)

**A modern, full-stack portfolio application with an admin dashboard built using the MERN stack**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 🎨 Frontend
- ⚡ **React 18** with Vite for blazing fast builds
- 🎨 **Tailwind CSS** for modern styling
- 🧩 **shadcn/ui** components
- 📱 Fully responsive design
- 🌙 Dark mode support

</td>
<td>

### ⚙️ Backend
- 🚀 **Node.js + Express** REST API
- 🗄️ **MongoDB** with Mongoose ODM
- 🔐 **JWT** authentication
- ☁️ **Cloudinary** file uploads
- 🛡️ Input validation & sanitization

</td>
</tr>
<tr>
<td>

### 🔧 DevOps
- 🐳 **Docker** & Docker Compose
- ☸️ **Kubernetes** ready
- 🔄 **GitHub Actions** CI/CD
- 📊 Health checks & monitoring
- 🔒 Security scanning

</td>
<td>

### 🛠️ Developer Tools
- 📝 Comprehensive documentation
- 🧪 Automated testing scripts
- 🔍 Environment validation
- 💾 Database backup/restore
- 📦 One-command setup

</td>
</tr>
</table>

---

## 🏗️ Project Structure

```
mern-profile/
├── 📁 backend/              # Node.js + Express API
│   ├── controller/          # Route controllers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middlewares
│   └── utils/              # Utility functions
│
├── 📁 dashboard/            # React Admin Dashboard
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── store/          # State management
│   └── public/             # Static assets
│
├── 📁 portfolio/            # React Portfolio Frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   └── pages/          # Route pages
│   └── public/             # Assets
│
├── 📁 .github/              # GitHub Actions & Templates
│   ├── workflows/          # CI/CD pipelines
│   └── ISSUE_TEMPLATE/     # Issue templates
│
├── 📁 .devops/              # DevOps Configuration
│   ├── docker/             # Dockerfiles
│   ├── kubernetes/         # K8s manifests
│   └── nginx/              # Nginx configs
│
├── 📁 scripts/              # Automation Scripts
│   ├── setup.*             # Project setup
│   ├── build.*             # Build scripts
│   ├── deploy.*            # Deployment
│   └── test.*              # Testing
│
├── 📁 tools/                # Utility Tools
│   ├── env-validator.js    # Env validation
│   ├── health-check.js     # Health monitoring
│   ├── db-backup.js        # Database backup
│   └── db-restore.js       # Database restore
│
├── 📁 docs/                 # Documentation
│   ├── guides/             # User guides
│   ├── api/                # API reference
│   ├── deployment/         # Deploy guides
│   └── development/        # Dev docs
│
└── 📁 tests/                # Test suites
    ├── unit/               # Unit tests
    ├── integration/        # Integration tests
    └── e2e/                # End-to-end tests
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18.x or 20.x | [nodejs.org](https://nodejs.org/) |
| MongoDB | 6.x or 7.x | [mongodb.com](https://www.mongodb.com/try/download/community) |
| npm | 9.x+ | Included with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Installation

```bash
# Clone the repository
git clone https://github.com/Mostafa-SAID7/Mern-Profile.git
cd Mern-Profile

# Install all dependencies (Windows)
.\scripts\setup.ps1

# Install all dependencies (Linux/Mac)
chmod +x scripts/setup.sh && ./scripts/setup.sh

# Generate environment configuration
node tools/generate-env.js

# Configure your .env file
# Edit backend/.env with your credentials
```

### Development

```bash
# Terminal 1 - Backend API
cd backend && npm run dev

# Terminal 2 - Admin Dashboard
cd dashboard && npm run dev

# Terminal 3 - Portfolio Frontend
cd portfolio && npm run dev
```

**Access the applications:**
- 🌐 Portfolio: http://localhost:3000
- 🎛️ Dashboard: http://localhost:3001
- 🔌 Backend API: http://localhost:4000

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) folder:

| Document | Description |
|----------|-------------|
| [📖 Getting Started](./docs/guides/getting-started.md) | Complete setup and installation guide |
| [🏛️ Architecture](./docs/development/architecture.md) | System design and architecture overview |
| [🔌 API Reference](./docs/api/endpoints.md) | Complete API endpoint documentation |
| [🚀 Deployment Guide](./docs/deployment/overview.md) | Deploy to various platforms |
| [🐳 Docker Guide](./docs/deployment/docker.md) | Docker and containerization |
| [☸️ Kubernetes Guide](./docs/deployment/kubernetes.md) | Kubernetes deployment |
| [⚙️ Environment Variables](./docs/guides/environment-variables.md) | Configuration reference |
| [🗄️ Database Schema](./docs/api/database-schema.md) | MongoDB schema documentation |
| [🤝 Contributing](./docs/guides/contributing.md) | Contribution guidelines |
| [🔧 Troubleshooting](./docs/guides/troubleshooting.md) | Common issues and solutions |

---

## 🚢 Deployment

### Quick Deploy Options

<table>
<tr>
<td align="center" width="33%">

#### 🐳 Docker
```bash
cd .devops
docker-compose up -d
```
[Docker Guide →](./docs/deployment/docker.md)

</td>
<td align="center" width="33%">

#### ☸️ Kubernetes
```bash
kubectl apply -f .devops/kubernetes/
```
[K8s Guide →](./docs/deployment/kubernetes.md)

</td>
<td align="center" width="33%">

#### ▲ Vercel
```bash
vercel --prod
```
[Vercel Guide →](./docs/deployment/vercel.md)

</td>
</tr>
</table>

### Platform-Specific Guides

- **Vercel** - [Deployment Guide](./docs/deployment/vercel.md)
- **Heroku** - [Deployment Guide](./docs/deployment/overview.md#heroku-backend)
- **Railway** - [Deployment Guide](./docs/deployment/overview.md#railway-full-stack)
- **DigitalOcean** - [Deployment Guide](./docs/deployment/overview.md#digitalocean-app-platform)
- **AWS** - [Deployment Guide](./docs/deployment/aws.md)
- **Azure** - [Deployment Guide](./docs/deployment/azure.md)

---

## 🧪 Testing

```bash
# Run all tests (Windows)
.\scripts\test.ps1

# Run all tests (Linux/Mac)
./scripts/test.sh

# Run specific tests
cd backend && npm test
cd dashboard && npm test
cd portfolio && npm test
```

---

## 🛠️ Built With

### Core Technologies

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</p>

### Additional Technologies

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

---

## 🔧 Utility Tools

| Tool | Description | Usage |
|------|-------------|-------|
| 🔍 **env-validator** | Validate environment variables | `node tools/env-validator.js` |
| 🏥 **health-check** | Check service health status | `node tools/health-check.js` |
| 💾 **db-backup** | Backup MongoDB database | `node tools/db-backup.js` |
| 🔄 **db-restore** | Restore MongoDB database | `node tools/db-restore.js` |
| ⚙️ **generate-env** | Generate .env template | `node tools/generate-env.js` |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/guides/contributing.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mostafa SAID**

- GitHub: [@Mostafa-SAID7](https://github.com/Mostafa-SAID7)
- Repository: [Mern-Profile](https://github.com/Mostafa-SAID7/Mern-Profile)

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**[⬆ Back to Top](#-mern-portfolio-with-admin-panel)**

Made with ❤️ using the MERN Stack

</div>

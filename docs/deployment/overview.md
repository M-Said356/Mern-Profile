# Deployment Guide

This guide covers various deployment options for the MERN Portfolio application.

## Table of Contents

1. [Docker Deployment](#docker-deployment)
2. [Kubernetes Deployment](#kubernetes-deployment)
3. [Traditional Deployment](#traditional-deployment)
4. [Cloud Platforms](#cloud-platforms)

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Quick Start

1. **Configure Environment Variables**

Create `.devops/.env` file:
```bash
cp .devops/.env.example .devops/.env
```

Edit the file with your credentials.

2. **Build and Run**

```bash
cd .devops
docker-compose up -d --build
```

3. **Verify Deployment**

```bash
docker-compose ps
```

Access the applications:
- Backend: http://localhost:4000
- Dashboard: http://localhost:3001
- Portfolio: http://localhost:3000

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f [service_name]
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, GKE, EKS, AKS)
- kubectl installed and configured

### Deploy to Kubernetes

1. **Create Secrets**

```bash
kubectl create secret generic app-secrets \
  --from-literal=mongo-uri='your_mongo_uri' \
  --from-literal=jwt-secret='your_jwt_secret'
```

2. **Deploy Backend**

```bash
kubectl apply -f .devops/kubernetes/backend-deployment.yml
```

3. **Deploy Frontend**

```bash
kubectl apply -f .devops/kubernetes/frontend-deployment.yml
```

4. **Check Status**

```bash
kubectl get pods
kubectl get services
```

### Scale Deployment

```bash
kubectl scale deployment backend --replicas=3
kubectl scale deployment portfolio --replicas=3
```

## Traditional Deployment

### Backend Deployment (VPS/Dedicated Server)

1. **Install Dependencies**

```bash
cd backend
npm ci --production
```

2. **Configure Environment**

Create `.env` file with production values.

3. **Use Process Manager**

```bash
npm install -g pm2
pm2 start server.js --name "portfolio-backend"
pm2 save
pm2 startup
```

### Frontend Deployment

1. **Build Applications**

```bash
# Dashboard
cd dashboard
npm run build

# Portfolio
cd ../portfolio
npm run build
```

2. **Serve with Nginx**

Copy build files to web server:
```bash
cp -r dashboard/dist /var/www/dashboard
cp -r portfolio/dist /var/www/portfolio
```

Configure Nginx (see `.devops/nginx/` for configs).

## Cloud Platforms

### Vercel (Frontend)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy Dashboard**

```bash
cd dashboard
vercel --prod
```

3. **Deploy Portfolio**

```bash
cd portfolio
vercel --prod
```

### Heroku (Backend)

1. **Create Heroku App**

```bash
heroku create mern-portfolio-api
```

2. **Set Environment Variables**

```bash
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_jwt_secret
```

3. **Deploy**

```bash
git subtree push --prefix backend heroku main
```

### Railway (Full Stack)

1. Create new project on Railway
2. Connect GitHub repository
3. Configure environment variables
4. Deploy automatically on push

### DigitalOcean App Platform

1. Create new app from GitHub
2. Configure build settings:
   - Backend: `npm install && npm start`
   - Frontend: `npm install && npm run build`
3. Set environment variables
4. Deploy

## CI/CD with GitHub Actions

The project includes GitHub Actions workflows:

- **CI Pipeline** (`.github/workflows/ci.yml`)
  - Runs on push/PR
  - Tests and builds all components

- **CD Pipeline** (`.github/workflows/cd.yml`)
  - Deploys on push to main
  - Customize with your deployment commands

- **Docker Build** (`.github/workflows/docker.yml`)
  - Builds and pushes Docker images
  - Publishes to GitHub Container Registry

## Health Checks

After deployment, verify services:

```bash
node tools/health-check.js
```

## Monitoring

Consider adding:
- **Application Monitoring:** New Relic, Datadog
- **Error Tracking:** Sentry
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Log Management:** Loggly, Papertrail

## Backup Strategy

### Database Backup

```bash
node tools/db-backup.js
```

Schedule regular backups with cron:
```bash
0 2 * * * cd /path/to/project && node tools/db-backup.js
```

### Restore Database

```bash
node tools/db-restore.js
```

## Security Checklist

- [ ] Use HTTPS/SSL certificates
- [ ] Set secure environment variables
- [ ] Enable CORS with specific origins
- [ ] Implement rate limiting
- [ ] Use security headers (Helmet.js)
- [ ] Keep dependencies updated
- [ ] Regular security audits (`npm audit`)
- [ ] Backup database regularly
- [ ] Monitor application logs
- [ ] Use strong JWT secrets

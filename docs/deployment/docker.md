# Docker Guide

Complete guide for using Docker with the MERN Portfolio project.

## Docker Architecture

```
┌─────────────────────────────────────────────────┐
│              Docker Compose                     │
├─────────────┬─────────────┬─────────────────────┤
│  Backend    │  Dashboard  │  Portfolio          │
│  Container  │  Container  │  Container          │
│  Port: 4000 │  Port: 3001 │  Port: 3000         │
└─────────────┴─────────────┴─────────────────────┘
                    │
                    ▼
         ┌──────────────────┐
         │    MongoDB       │
         │    Container     │
         │  Port: 27017     │
         └──────────────────┘
```

## Dockerfiles

### Backend Dockerfile

Location: `.devops/docker/backend.Dockerfile`

Features:
- Multi-stage build
- Production dependencies only
- Health check included
- Optimized for Node.js

### Frontend Dockerfiles

Locations:
- `.devops/docker/dashboard.Dockerfile`
- `.devops/docker/portfolio.Dockerfile`

Features:
- Multi-stage build (builder + nginx)
- Optimized production build
- Nginx for serving static files
- Custom nginx configuration

## Docker Compose

### Services

1. **Backend**
   - Node.js API server
   - Connects to MongoDB
   - Environment variables from `.env`

2. **Dashboard**
   - React admin panel
   - Nginx web server
   - Built from source

3. **Portfolio**
   - React portfolio site
   - Nginx web server
   - Built from source

4. **MongoDB**
   - Database service
   - Persistent volume
   - Root credentials

### Networks

All services communicate via `app-network` bridge network.

### Volumes

- `mongodb-data`: Persistent MongoDB storage

## Usage

### Start All Services

```bash
cd .devops
docker-compose up -d
```

### Start Specific Service

```bash
docker-compose up -d backend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Volumes

```bash
docker-compose down -v
```

### Rebuild Services

```bash
docker-compose up -d --build
```

### Scale Services

```bash
docker-compose up -d --scale backend=3
```

## Individual Docker Commands

### Build Images

```bash
# Backend
docker build -f .devops/docker/backend.Dockerfile -t mern-portfolio-backend ./backend

# Dashboard
docker build -f .devops/docker/dashboard.Dockerfile -t mern-portfolio-dashboard ./dashboard

# Portfolio
docker build -f .devops/docker/portfolio.Dockerfile -t mern-portfolio-portfolio ./portfolio
```

### Run Containers

```bash
# Backend
docker run -d -p 4000:4000 --name backend \
  -e MONGO_URI=mongodb://mongodb:27017/portfolio \
  mern-portfolio-backend

# Dashboard
docker run -d -p 3001:80 --name dashboard mern-portfolio-dashboard

# Portfolio
docker run -d -p 3000:80 --name portfolio mern-portfolio-portfolio
```

### Execute Commands in Container

```bash
docker exec -it backend sh
```

### View Container Stats

```bash
docker stats
```

## Environment Variables

Create `.devops/.env` file:

```env
# MongoDB
MONGO_URI=mongodb://mongodb:27017/portfolio
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=secure_password

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Docker Best Practices

### Image Optimization

1. **Use Alpine Images**
   ```dockerfile
   FROM node:20-alpine
   ```

2. **Multi-stage Builds**
   ```dockerfile
   FROM node:20-alpine AS builder
   # Build stage
   FROM nginx:alpine
   # Production stage
   ```

3. **Layer Caching**
   ```dockerfile
   COPY package*.json ./
   RUN npm ci
   COPY . .
   ```

### Security

1. **Don't Run as Root**
   ```dockerfile
   USER node
   ```

2. **Scan Images**
   ```bash
   docker scan mern-portfolio-backend
   ```

3. **Use Secrets**
   ```bash
   docker secret create mongo_password password.txt
   ```

### Health Checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:4000/health')"
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs backend

# Check container status
docker ps -a
```

### Network Issues

```bash
# Inspect network
docker network inspect devops_app-network

# Test connectivity
docker exec backend ping mongodb
```

### Volume Issues

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect devops_mongodb-data

# Remove unused volumes
docker volume prune
```

### Clean Up

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove everything
docker system prune -a --volumes
```

## Production Considerations

1. **Use Docker Secrets** for sensitive data
2. **Implement logging** with Docker logging drivers
3. **Set resource limits**:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```
4. **Use health checks** for all services
5. **Implement restart policies**:
   ```yaml
   restart: unless-stopped
   ```
6. **Regular image updates** and security patches
7. **Monitor container metrics** with Prometheus/Grafana

## Docker Hub Publishing

### Tag Image

```bash
docker tag mern-portfolio-backend username/mern-portfolio-backend:latest
```

### Push to Docker Hub

```bash
docker login
docker push username/mern-portfolio-backend:latest
```

### Pull from Docker Hub

```bash
docker pull username/mern-portfolio-backend:latest
```

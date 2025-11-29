#!/bin/bash

echo "🚀 Deploying MERN Portfolio..."

# Build projects
./scripts/build.sh

# Deploy using docker-compose
echo "🐳 Starting Docker containers..."
cd .devops
docker-compose up -d --build

echo "✅ Deployment complete!"
echo "Backend: http://localhost:4000"
echo "Dashboard: http://localhost:3001"
echo "Portfolio: http://localhost:3000"

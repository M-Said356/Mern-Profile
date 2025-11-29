# Azure Deployment Guide

Deploy MERN Portfolio to Microsoft Azure.

## Architecture

- Azure App Service for backend
- Azure Static Web Apps for frontend
- Azure Cosmos DB or MongoDB Atlas

## Prerequisites

- Azure account
- Azure CLI installed

## Deploy Backend to App Service

### 1. Create App Service

```bash
# Login
az login

# Create resource group
az group create --name mern-portfolio-rg --location eastus

# Create App Service plan
az appservice plan create \
  --name mern-portfolio-plan \
  --resource-group mern-portfolio-rg \
  --sku B1 --is-linux

# Create web app
az webapp create \
  --resource-group mern-portfolio-rg \
  --plan mern-portfolio-plan \
  --name mern-portfolio-api \
  --runtime "NODE|20-lts"
```

### 2. Configure Environment

```bash
az webapp config appsettings set \
  --resource-group mern-portfolio-rg \
  --name mern-portfolio-api \
  --settings \
    MONGO_URI="your_mongo_uri" \
    JWT_SECRET="your_secret"
```

### 3. Deploy Code

```bash
cd backend
az webapp up \
  --resource-group mern-portfolio-rg \
  --name mern-portfolio-api
```

## Deploy Frontend to Static Web Apps

### 1. Create Static Web App

```bash
az staticwebapp create \
  --name mern-portfolio-frontend \
  --resource-group mern-portfolio-rg \
  --source https://github.com/Mostafa-SAID7/Mern-Profile \
  --location eastus \
  --branch main \
  --app-location "/portfolio" \
  --output-location "dist"
```

### 2. Configure Build

Create `staticwebapp.config.json`:

```json
{
  "routes": [
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ]
}
```

## Monitoring

- Application Insights
- Azure Monitor
- Log Analytics

## Cost Optimization

- Use Free tier for development
- Auto-scaling policies
- Azure Cost Management

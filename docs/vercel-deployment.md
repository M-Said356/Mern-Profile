# Vercel Deployment Guide

Complete guide for deploying the MERN Portfolio to Vercel.

## Overview

Vercel is ideal for deploying the frontend applications (Portfolio and Dashboard). For the backend, you can either:
1. Deploy backend to Vercel (serverless)
2. Deploy backend elsewhere (Heroku, Railway, etc.)

## Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- Vercel CLI installed: `npm install -g vercel`
- GitHub repository connected to Vercel

## Deployment Strategy

```
┌─────────────────────────────────────────┐
│         Vercel Platform                 │
├─────────────────────────────────────────┤
│  Portfolio    │  Dashboard  │  Backend  │
│  (Frontend)   │  (Frontend) │  (API)    │
│  vercel.app   │  vercel.app │ vercel.app│
└─────────────────────────────────────────┘
```

## Deploy Portfolio (Frontend)

### Method 1: Vercel CLI

```bash
cd portfolio

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Method 2: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `portfolio`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/v1
   ```
5. Click "Deploy"

### Method 3: GitHub Integration (Recommended)

1. Connect repository to Vercel
2. Create `portfolio/vercel.json`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. Push to GitHub - auto-deploys!

## Deploy Dashboard (Frontend)

Same process as Portfolio:

```bash
cd dashboard
vercel --prod
```

Or configure in Vercel Dashboard:
- **Root Directory:** `dashboard`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  ```
  VITE_API_URL=https://your-backend-url.vercel.app/api/v1
  ```

## Deploy Backend (API)

### Option 1: Vercel Serverless

Create `vercel.json` in root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

Deploy:
```bash
vercel --prod
```

Add environment variables in Vercel Dashboard:
- `MONGO_URI`
- `JWT_SECRET_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL`
- `DASHBOARD_URL`

### Option 2: External Backend

Deploy backend to:
- **Railway:** [railway.app](https://railway.app)
- **Heroku:** [heroku.com](https://heroku.com)
- **Render:** [render.com](https://render.com)

Then update frontend environment variables with backend URL.

## Environment Variables

### Portfolio Environment Variables

```env
VITE_API_URL=https://your-backend.vercel.app/api/v1
```

### Dashboard Environment Variables

```env
VITE_API_URL=https://your-backend.vercel.app/api/v1
```

### Backend Environment Variables

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-portfolio.vercel.app
DASHBOARD_URL=https://your-dashboard.vercel.app
NODE_ENV=production
```

## Custom Domains

### Add Custom Domain

1. Go to Project Settings → Domains
2. Add your domain: `yourdomain.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (up to 48 hours)

### Multiple Domains

- Portfolio: `yourdomain.com`
- Dashboard: `admin.yourdomain.com`
- Backend: `api.yourdomain.com`

## Automatic Deployments

### Production Branch

- Push to `main` → Auto-deploy to production

### Preview Deployments

- Push to any branch → Auto-deploy preview
- Pull requests get unique preview URLs

### Deployment Protection

Enable in Project Settings:
- Password protection
- Vercel Authentication
- IP allowlist

## Performance Optimization

### Enable Edge Network

Vercel automatically uses Edge Network for:
- Global CDN
- Automatic HTTPS
- DDoS protection

### Build Optimization

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### Caching Strategy

Vercel automatically caches:
- Static assets (1 year)
- Build outputs
- API responses (configurable)

## Monitoring

### Analytics

Enable Vercel Analytics:
```bash
npm install @vercel/analytics
```

```javascript
// Add to main component
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Logs

View logs in Vercel Dashboard:
- Real-time logs
- Function logs
- Build logs

## Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build

# Clear Vercel cache
vercel --force
```

### Environment Variables Not Working

1. Ensure variables are prefixed with `VITE_` for frontend
2. Redeploy after adding variables
3. Check variable names (case-sensitive)

### API CORS Issues

Update backend CORS configuration:
```javascript
const corsOptions = {
  origin: [
    'https://your-portfolio.vercel.app',
    'https://your-dashboard.vercel.app'
  ],
  credentials: true
};
```

### 404 on Refresh

Ensure `vercel.json` has rewrites:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## CI/CD Integration

### GitHub Actions + Vercel

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Cost Optimization

### Free Tier Limits

- 100 GB bandwidth/month
- 100 deployments/day
- Unlimited projects

### Pro Features

- Advanced analytics
- Team collaboration
- Priority support
- Custom deployment regions

## Best Practices

1. **Use Environment Variables** for all secrets
2. **Enable Preview Deployments** for testing
3. **Set up Custom Domains** for production
4. **Monitor Analytics** regularly
5. **Use Edge Functions** for API routes
6. **Enable Caching** for static assets
7. **Implement Error Tracking** (Sentry)
8. **Regular Security Audits**

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# List deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]

# Link local project
vercel link

# Pull environment variables
vercel env pull
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vercel GitHub Integration](https://vercel.com/docs/git)
- [Vercel Edge Functions](https://vercel.com/docs/functions)

# 🚀 Vercel Deployment Guide

Complete step-by-step guide to deploy MERN Portfolio to Vercel.

## 📋 Prerequisites

- ✅ Vercel CLI installed (`npm install -g vercel`)
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ GitHub repository connected
- ✅ MongoDB Atlas database (for backend)
- ✅ Cloudinary account (for file uploads)

---

## 🎯 Deployment Strategy

We'll deploy three separate applications:

1. **Portfolio** (Frontend) → `portfolio-yourname.vercel.app`
2. **Dashboard** (Admin Panel) → `dashboard-yourname.vercel.app`
3. **Backend** (API) → `api-yourname.vercel.app`

---

## 📦 Step 1: Deploy Portfolio (Frontend)

### Option A: Using Vercel CLI

```bash
# Navigate to portfolio folder
cd portfolio

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? mern-portfolio
# - Directory? ./
# - Override settings? No
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `portfolio`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/v1
   ```
5. Click **Deploy**

---

## 🎛️ Step 2: Deploy Dashboard (Admin Panel)

### Using Vercel CLI

```bash
# Navigate to dashboard folder
cd dashboard

# Deploy to production
vercel --prod

# Follow the prompts similar to portfolio
```

### Using Vercel Dashboard

1. Create new project
2. Import repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `dashboard`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/v1
   ```
5. Click **Deploy**

---

## 🔌 Step 3: Deploy Backend (API)

### Important: Backend Deployment Considerations

Vercel has limitations for backend deployments:
- ⚠️ Serverless functions (not long-running processes)
- ⚠️ 10-second execution timeout
- ⚠️ Limited for WebSocket connections

**Recommended:** Deploy backend to Railway, Render, or Heroku instead.

### If deploying to Vercel (Serverless):

```bash
# From root directory
vercel --prod

# This will use the root vercel.json configuration
```

### Environment Variables for Backend

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET_KEY=your_strong_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-portfolio.vercel.app
DASHBOARD_URL=https://your-dashboard.vercel.app
```

---

## 🔄 Alternative: Deploy Backend to Railway

Railway is better suited for Node.js backends:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up

# Add environment variables
railway variables set MONGO_URI="your_mongo_uri"
railway variables set JWT_SECRET_KEY="your_secret"
# ... add all other variables
```

---

## ⚙️ Step 4: Configure Environment Variables

### Portfolio Environment Variables

In Vercel Dashboard → Portfolio Project → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.vercel.app/api/v1
```

### Dashboard Environment Variables

In Vercel Dashboard → Dashboard Project → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.vercel.app/api/v1
```

### Backend Environment Variables

See Step 3 above for complete list.

---

## 🌐 Step 5: Custom Domains (Optional)

### Add Custom Domain

1. Go to Project Settings → Domains
2. Add your domain: `yourdomain.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Subdomain Configuration

- Portfolio: `yourdomain.com`
- Dashboard: `admin.yourdomain.com`
- Backend: `api.yourdomain.com`

---

## 🔍 Step 6: Verify Deployment

### Check Portfolio

```bash
curl https://your-portfolio.vercel.app
```

### Check Dashboard

```bash
curl https://your-dashboard.vercel.app
```

### Check Backend API

```bash
curl https://your-backend.vercel.app/api/v1/health
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Check build locally first
cd portfolio
npm run build

cd ../dashboard
npm run build
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

### 404 on Page Refresh

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

---

## 📊 Deployment Checklist

### Before Deployment

- [ ] MongoDB Atlas database created
- [ ] Cloudinary account set up
- [ ] Environment variables prepared
- [ ] Build tested locally
- [ ] Git repository up to date

### After Deployment

- [ ] Portfolio accessible
- [ ] Dashboard accessible
- [ ] Backend API responding
- [ ] Database connection working
- [ ] File uploads working (Cloudinary)
- [ ] Authentication working
- [ ] CORS configured correctly
- [ ] Custom domains configured (if applicable)

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## 📝 Useful Commands

```bash
# Login to Vercel
vercel login

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

---

## 🎯 Next Steps

1. ✅ Deploy all three applications
2. ✅ Configure environment variables
3. ✅ Test all functionality
4. ✅ Set up custom domains (optional)
5. ✅ Enable analytics (Vercel Analytics)
6. ✅ Set up monitoring

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Deployment Guide](./docs/deployment/vercel.md)

---

## 🆘 Need Help?

- 📖 [Vercel Support](https://vercel.com/support)
- 💬 [GitHub Discussions](https://github.com/Mostafa-SAID7/Mern-Profile/discussions)
- 📧 Contact: your-email@example.com

---

**Happy Deploying! 🚀**

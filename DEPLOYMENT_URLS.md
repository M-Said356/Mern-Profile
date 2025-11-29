# 🚀 Deployment URLs

## ✅ Successfully Deployed Applications

All three applications have been deployed to Vercel!

---

## 🌐 Live URLs

### 1. Portfolio (Frontend)
- **Production URL:** https://portfolio-htw79hcyq-mostafa-said7s-projects.vercel.app
- **Vercel Dashboard:** https://vercel.com/mostafa-said7s-projects/portfolio
- **Status:** ✅ Deployed

### 2. Dashboard (Admin Panel)
- **Production URL:** https://dashboard-rguxcyh6p-mostafa-said7s-projects.vercel.app
- **Vercel Dashboard:** https://vercel.com/mostafa-said7s-projects/dashboard
- **Status:** ✅ Deployed

### 3. Backend (API)
- **Production URL:** https://ms-portfolio-jbf94803b-mostafa-said7s-projects.vercel.app
- **Vercel Dashboard:** https://vercel.com/mostafa-said7s-projects/ms-portfolio
- **Status:** ✅ Deployed
- **Note:** ⚠️ Vercel has limitations for backend. Consider Railway/Render for production.

---

## 📝 Important Next Steps

### 1. Configure Environment Variables

#### For Portfolio
Go to: https://vercel.com/mostafa-said7s-projects/portfolio/settings/environment-variables

Add:
```
VITE_API_URL=https://ms-portfolio-jbf94803b-mostafa-said7s-projects.vercel.app/api/v1
```

#### For Dashboard
Go to: https://vercel.com/mostafa-said7s-projects/dashboard/settings/environment-variables

Add:
```
VITE_API_URL=https://ms-portfolio-jbf94803b-mostafa-said7s-projects.vercel.app/api/v1
```

#### For Backend
Go to: https://vercel.com/mostafa-said7s-projects/ms-portfolio/settings/environment-variables

Add all these variables:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET_KEY=your_strong_secret_key_minimum_32_characters
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://portfolio-htw79hcyq-mostafa-said7s-projects.vercel.app
DASHBOARD_URL=https://dashboard-rguxcyh6p-mostafa-said7s-projects.vercel.app
```

### 2. Redeploy After Adding Environment Variables

After adding environment variables, redeploy each application:

```bash
# Portfolio
cd portfolio
vercel --prod

# Dashboard
cd ../dashboard
vercel --prod

# Backend
cd ..
vercel --prod
```

### 3. Set Up MongoDB Atlas

If you haven't already:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist Vercel IPs (or use 0.0.0.0/0 for all IPs)
5. Get your connection string
6. Add it to backend environment variables

### 4. Set Up Cloudinary

If you haven't already:

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Get your credentials from dashboard
4. Add them to backend environment variables

### 5. Configure Custom Domains (Optional)

You can add custom domains for each application:

- Portfolio: `yourdomain.com`
- Dashboard: `admin.yourdomain.com`
- Backend: `api.yourdomain.com`

Go to each project's settings → Domains to add custom domains.

---

## 🔍 Testing Your Deployment

### Test Portfolio
```bash
curl https://portfolio-htw79hcyq-mostafa-said7s-projects.vercel.app
```

### Test Dashboard
```bash
curl https://dashboard-rguxcyh6p-mostafa-said7s-projects.vercel.app
```

### Test Backend API
```bash
curl https://ms-portfolio-jbf94803b-mostafa-said7s-projects.vercel.app/api/v1/health
```

---

## ⚠️ Important Notes

### Backend Limitations on Vercel

Vercel is optimized for serverless functions with these limitations:
- ⏱️ 10-second execution timeout
- 🚫 No long-running processes
- 🚫 Limited WebSocket support

**Recommendation:** For production backend, consider:
- 🚂 [Railway](https://railway.app) - Easy Node.js deployment
- 🎨 [Render](https://render.com) - Free tier available
- ☁️ [Heroku](https://heroku.com) - Established platform

### CORS Configuration

Update your backend CORS settings to include your Vercel URLs:

```javascript
const corsOptions = {
  origin: [
    'https://portfolio-htw79hcyq-mostafa-said7s-projects.vercel.app',
    'https://dashboard-rguxcyh6p-mostafa-said7s-projects.vercel.app'
  ],
  credentials: true
};
```

---

## 🔄 Continuous Deployment

Vercel is now connected to your GitHub repository. Any push to `main` branch will automatically deploy:

- **Push to main** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## 📊 Monitoring

Monitor your deployments:

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Analytics:** Enable Vercel Analytics in project settings
3. **Logs:** View real-time logs in Vercel dashboard

---

## 🆘 Troubleshooting

### If Portfolio/Dashboard Shows Errors

1. Check environment variables are set correctly
2. Ensure `VITE_API_URL` points to your backend
3. Check browser console for errors
4. Verify build completed successfully

### If Backend API Doesn't Respond

1. Check all environment variables are set
2. Verify MongoDB connection string is correct
3. Check Vercel function logs
4. Consider moving to Railway/Render

### If Authentication Doesn't Work

1. Verify JWT_SECRET_KEY is set
2. Check CORS configuration includes your frontend URLs
3. Ensure cookies are enabled
4. Check browser console for CORS errors

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Vercel Deployment Docs](./docs/deployment/vercel.md)
- [Troubleshooting Guide](./docs/guides/troubleshooting.md)

---

## ✅ Deployment Checklist

- [x] Portfolio deployed to Vercel
- [x] Dashboard deployed to Vercel
- [x] Backend deployed to Vercel
- [ ] Environment variables configured
- [ ] MongoDB Atlas set up
- [ ] Cloudinary configured
- [ ] Applications tested
- [ ] CORS configured
- [ ] Custom domains added (optional)

---

<div align="center">

**🎉 Congratulations on your deployment!**

For support, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

</div>

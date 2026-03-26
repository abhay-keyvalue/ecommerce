# 🚀 Deploy Frontend to Vercel

Quick guide to deploy your React frontend to Vercel.

---

## 📋 Prerequisites

✅ GitHub repository: https://github.com/abhay-keyvalue/ecommerce.git  
✅ Backend deployed: https://aavya-backend-jdli.onrender.com  
✅ Code is pushed to GitHub

---

## 🎯 Deployment Steps

### Step 1: Go to Vercel

1. Open: https://vercel.com/new
2. Sign in with GitHub (if not already)

### Step 2: Import Repository

1. Click **"Import Git Repository"**
2. Find `abhay-keyvalue/ecommerce` in the list
3. Click **"Import"**

### Step 3: Configure Project

**Important Settings:**

| Setting | Value |
|---------|-------|
| **Project Name** | `aavya-store` (or your choice) |
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` ⚠️ IMPORTANT |
| **Build Command** | `npm run build` (auto-detected) |
| **Output Directory** | `dist` (auto-detected) |
| **Install Command** | `npm install` (auto-detected) |

### Step 4: Add Environment Variables

Click **"Environment Variables"** section and add these:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://aavya-backend-jdli.onrender.com/api` |
| `VITE_AI_AGENT_URL` | `http://localhost:8000` (update later) |
| `VITE_ENV` | `production` |

**How to add:**
1. Enter variable name in "Key" field
2. Enter value in "Value" field
3. Click "Add" button
4. Repeat for all 3 variables

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see a success screen with your URL

---

## ✅ After Deployment

### 1. Get Your Vercel URL

You'll receive a URL like:
```
https://aavya-store.vercel.app
```

Or:
```
https://ecommerce-xyz123.vercel.app
```

### 2. Update Backend CORS

**IMPORTANT**: Update your backend to allow requests from Vercel:

1. Go to Render Dashboard
2. Click on `aavya-backend-jdli` service
3. Click **"Environment"** tab
4. Find `CORS_ORIGIN` variable
5. Change value from `*` to your Vercel URL:
   ```
   https://aavya-store.vercel.app
   ```
6. Click **"Save Changes"**
7. Wait for auto-redeploy (1-2 minutes)

### 3. Test Your Frontend

1. Open your Vercel URL
2. Should see the homepage with products
3. Click **"Login"**
4. Enter credentials:
   ```
   Email: test@aavya.com
   Password: Test@123
   ```
5. Should successfully login and see 53 products

---

## 🐛 Troubleshooting

### "CORS Error" in Browser Console

**Symptom**: 
```
Access to fetch at 'https://aavya-backend-jdli.onrender.com/api/products' 
from origin 'https://aavya-store.vercel.app' has been blocked by CORS policy
```

**Fix**: Update `CORS_ORIGIN` on Render (see Step 2 above)

### "Failed to Fetch" or Network Error

**Possible Causes**:
1. Backend is sleeping (free tier) - wait 30-60 seconds and retry
2. Wrong `VITE_API_URL` - check environment variables on Vercel
3. Backend is down - check Render dashboard

**Fix**:
```bash
# Test backend directly
curl https://aavya-backend-jdli.onrender.com/health
```

### Build Failed on Vercel

**Check**:
1. Root Directory is set to `frontend`
2. Framework Preset is `Vite`
3. All environment variables are added

### Products Not Showing

1. Check browser console for errors
2. Verify `VITE_API_URL` is correct
3. Test API directly:
   ```bash
   curl https://aavya-backend-jdli.onrender.com/api/products
   ```

---

## 🔄 Redeploy Frontend

If you need to redeploy after changes:

### Option 1: Auto-Deploy (Recommended)
```bash
git add .
git commit -m "Update frontend"
git push
```
Vercel auto-deploys on every push to main branch.

### Option 2: Manual Deploy
1. Go to Vercel Dashboard
2. Click on your project
3. Click **"Deployments"** tab
4. Click **"Redeploy"** on latest deployment

---

## 🎨 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `aavya.com`)
4. Follow DNS configuration instructions
5. Update `CORS_ORIGIN` on Render to new domain

---

## 📊 Deployment Checklist

- [ ] Import repository on Vercel
- [ ] Set Root Directory to `frontend`
- [ ] Add 3 environment variables
- [ ] Click Deploy
- [ ] Wait for build to complete
- [ ] Copy Vercel URL
- [ ] Update `CORS_ORIGIN` on Render backend
- [ ] Test login with `test@aavya.com` / `Test@123`
- [ ] Browse products (should see 53 items)

---

## 🔗 Quick Links

- **Deploy Now**: https://vercel.com/new
- **Your GitHub Repo**: https://github.com/abhay-keyvalue/ecommerce
- **Backend API**: https://aavya-backend-jdli.onrender.com/api
- **Render Dashboard**: https://dashboard.render.com/

---

## 📝 Environment Variables Reference

Copy-paste these into Vercel:

```
VITE_API_URL=https://aavya-backend-jdli.onrender.com/api
VITE_AI_AGENT_URL=http://localhost:8000
VITE_ENV=production
```

---

**Ready to deploy!** 🚀

Follow the steps above and your frontend will be live in 2-3 minutes!

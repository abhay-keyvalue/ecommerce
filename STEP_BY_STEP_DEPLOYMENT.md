# Step-by-Step Deployment Guide

Follow these steps in order to deploy your Aavya Ethnic Couture e-commerce platform.

---

## 🎯 Overview

We'll deploy:
1. **Database** on Neon (5 minutes)
2. **Backend** on Render (10 minutes)
3. **AI Agent** on Render (10 minutes)
4. **Frontend** on Vercel (5 minutes)

**Total Time**: ~30 minutes

---

## 📋 Before You Start

### Push Code to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "chore: add deployment configurations"
git push origin main
```

### Accounts Needed

- [ ] GitHub account (you already have this)
- [ ] Neon account → https://neon.tech
- [ ] Render account → https://render.com
- [ ] Vercel account → https://vercel.com
- [ ] Groq account → https://console.groq.com

---

## STEP 1: Setup Database (Neon) ⏱️ 5 min

### 1.1 Create Neon Account & Database

1. Go to **https://neon.tech**
2. Click **"Sign Up"** (use GitHub for easy login)
3. Click **"Create a project"**
4. Fill in:
   - **Project name**: `aavya-ecommerce`
   - **Region**: Select closest to you (e.g., US East, EU West)
   - **Postgres version**: 16 (default)
5. Click **"Create project"**

### 1.2 Get Database Credentials

1. On the project dashboard, you'll see **"Connection Details"**
2. Click **"Connection string"** tab
3. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 1.3 Parse Connection Details

From the connection string above, extract:

```
DB_HOST=ep-cool-name-123456.us-east-2.aws.neon.tech
DB_PORT=5432
DB_USER=username
DB_PASSWORD=password
DB_NAME=neondb
```

**Save these values** - you'll need them for backend and AI agent!

---

## STEP 2: Deploy Backend (Render) ⏱️ 10 min

### 2.1 Create Render Account

1. Go to **https://render.com**
2. Click **"Get Started"** (use GitHub for easy login)
3. Authorize Render to access your GitHub repositories

### 2.2 Create Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. Find and select your `ecommerce` repository
3. Click **"Connect"**

### 2.3 Configure Backend Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `aavya-backend` |
| **Region** | Oregon (US West) or closest |
| **Branch** | `main` |
| **Root Directory** | `oms-backend` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### 2.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add each of these (click "+ Add Environment Variable" for each):

```
NODE_ENV=production
PORT=3000
DB_HOST=<paste-from-neon>
DB_PORT=5432
DB_USER=<paste-from-neon>
DB_PASSWORD=<paste-from-neon>
DB_NAME=<paste-from-neon>
JWT_SECRET=<generate-below>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

**Generate JWT_SECRET**: Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste as JWT_SECRET value.

**Note**: We'll update CORS_ORIGIN after frontend deployment.

### 2.5 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Watch the logs - should see "Database connection initialized"
4. Once deployed, copy your backend URL:
   ```
   https://aavya-backend.onrender.com
   ```

### 2.6 Seed the Database

1. In Render dashboard, go to your `aavya-backend` service
2. Click **"Shell"** tab on the left
3. Run this command:
   ```bash
   npm run seed
   ```
4. You should see "Seeded: [product name]" for 42 products
5. Verify by visiting: `https://aavya-backend.onrender.com/api/products`

---

## STEP 3: Deploy AI Agent (Render) ⏱️ 10 min

### 3.1 Get Groq API Key

1. Go to **https://console.groq.com**
2. Sign up (free account)
3. Click **"API Keys"** in left sidebar
4. Click **"Create API Key"**
5. Name it: `aavya-production`
6. Copy the key (starts with `gsk_...`)
7. **Save it** - you won't see it again!

### 3.2 Create AI Agent Web Service

1. In Render, click **"New +"** → **"Web Service"**
2. Select your `ecommerce` repository
3. Click **"Connect"**

### 3.3 Configure AI Agent Service

| Setting | Value |
|---------|-------|
| **Name** | `aavya-ai-agent` |
| **Region** | Oregon (same as backend) |
| **Branch** | `main` |
| **Root Directory** | `ai-agent` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| **Plan** | Free |

### 3.4 Add Environment Variables

```
OPENAI_API_KEY=<paste-groq-api-key>
DB_HOST=<paste-from-neon>
DB_PORT=5432
DB_USER=<paste-from-neon>
DB_PASSWORD=<paste-from-neon>
DB_NAME=<paste-from-neon>
```

### 3.5 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your AI agent URL:
   ```
   https://aavya-ai-agent.onrender.com
   ```
4. Test it: Visit `https://aavya-ai-agent.onrender.com/health`
   - Should return: `{"status":"ok"}`

---

## STEP 4: Deploy Frontend (Vercel) ⏱️ 5 min

### 4.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"** (use GitHub)
3. Authorize Vercel

### 4.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your `ecommerce` repository
3. Click **"Import"**

### 4.3 Configure Project

Vercel will auto-detect Vite. Update these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 4.4 Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://aavya-backend.onrender.com/api
VITE_AI_AGENT_URL=https://aavya-ai-agent.onrender.com
VITE_ENV=production
```

**Replace** the URLs with your actual Render URLs from Steps 2 & 3!

### 4.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Once deployed, you'll get a URL like:
   ```
   https://aavya-store.vercel.app
   ```

---

## STEP 5: Update CORS Configuration ⏱️ 2 min

### 5.1 Update Backend CORS

1. Go to Render dashboard → `aavya-backend` service
2. Click **"Environment"** tab
3. Find `CORS_ORIGIN` variable
4. Update value to your Vercel URL:
   ```
   https://aavya-store.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will automatically redeploy

---

## STEP 6: Test Everything ⏱️ 5 min

### 6.1 Test Backend

Open in browser or use curl:
```bash
# Health check
curl https://aavya-backend.onrender.com/health

# Get products
curl https://aavya-backend.onrender.com/api/products
```

Should return JSON with 42 products.

### 6.2 Test AI Agent

```bash
curl https://aavya-ai-agent.onrender.com/health
```

Should return: `{"status":"ok"}`

### 6.3 Test Frontend

1. Visit your Vercel URL: `https://aavya-store.vercel.app`
2. **Check products load** - Should see 42 textile products
3. **Test AI chatbot**:
   - Click the chat bubble (bottom right)
   - Ask: "Show me silk sarees under 5000"
   - Should get intelligent response with products
4. **Check browser console** - No CORS errors

---

## 🎉 Success Checklist

- [ ] Frontend loads at Vercel URL
- [ ] Products display correctly (42 items)
- [ ] Product images load
- [ ] AI chatbot responds to queries
- [ ] No errors in browser console
- [ ] Backend health check returns OK
- [ ] AI agent health check returns OK

---

## 🚨 Troubleshooting

### Frontend shows "Failed to load products"

**Problem**: Backend not responding or CORS error

**Solutions**:
1. Check backend URL in Vercel environment variables
2. Verify backend is deployed and running on Render
3. Check CORS_ORIGIN in backend matches your Vercel URL
4. Wait 30 seconds (cold start) and refresh

### AI Chatbot shows "Connection error"

**Problem**: AI agent not responding

**Solutions**:
1. Check AI agent URL in Vercel environment variables
2. Verify AI agent is deployed on Render
3. Check Groq API key is valid
4. Wait 30 seconds (cold start) and try again

### Backend crashes on startup

**Problem**: Database connection failed

**Solutions**:
1. Verify Neon database credentials in Render
2. Check Neon database is active (not paused)
3. Ensure connection string includes `?sslmode=require`
4. Check Render logs for specific error

### Products not showing after seed

**Problem**: Seed command failed

**Solutions**:
1. Check Render Shell logs for errors
2. Verify database credentials
3. Try running seed again: `npm run seed`
4. Check Neon dashboard for data

---

## 📝 Save Your URLs

After deployment, save these URLs:

```
Frontend:  https://_____________________.vercel.app
Backend:   https://_____________________.onrender.com
AI Agent:  https://_____________________.onrender.com
Database:  ep-_____________________.neon.tech
```

---

## 🔄 Updating Your Deployment

### Auto-Deploy (Recommended)

Both Vercel and Render auto-deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "update: your changes"
git push origin main
```

- **Vercel**: Deploys in ~2 minutes
- **Render**: Deploys in ~5-10 minutes

### Manual Deploy

- **Vercel**: Dashboard → Deployments → "Redeploy"
- **Render**: Dashboard → "Manual Deploy" → "Deploy latest commit"

---

## 💰 Cost Summary

| Service | Free Tier Limits | Enough For |
|---------|------------------|------------|
| **Vercel** | 100GB bandwidth/month | ~10,000 visitors |
| **Render** | 750 hours/month (sleeps after 15 min) | Unlimited requests |
| **Neon** | 0.5GB storage | ~10,000 products |
| **Groq** | 100 requests/min | ~144,000 requests/day |

**Total**: $0/month 🎉

---

## 🚀 Going Live

### Custom Domain (Optional)

**Vercel (Frontend)**:
1. Buy domain from Namecheap/GoDaddy
2. Vercel Dashboard → Settings → Domains
3. Add your domain
4. Update DNS records as instructed

**Render (Backend)**:
1. Render Dashboard → Settings → Custom Domain
2. Add domain (e.g., api.yourdomain.com)
3. Update DNS records

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs

---

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Set up monitoring (optional)
3. ✅ Add custom domain (optional)
4. ✅ Share your live site!
5. ✅ Monitor usage and upgrade if needed

**Your e-commerce platform is now live! 🌸**

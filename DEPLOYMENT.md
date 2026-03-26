# Deployment Guide - Aavya Ethnic Couture

This guide will walk you through deploying your e-commerce platform for free using:
- **Vercel** for Frontend
- **Render** for Backend & AI Agent
- **Neon** for PostgreSQL Database

---

## Prerequisites

1. GitHub account (to push your code)
2. Vercel account (sign up at vercel.com)
3. Render account (sign up at render.com)
4. Neon account (sign up at neon.tech)
5. Groq API key (sign up at console.groq.com - free)

---

## Step 1: Setup Database (Neon PostgreSQL)

### 1.1 Create Neon Database

1. Go to https://neon.tech and sign up
2. Click **"Create a project"**
3. Name your project: `aavya-ecommerce`
4. Select region: Choose closest to you
5. Click **"Create project"**

### 1.2 Get Connection String

1. In your Neon dashboard, click **"Connection Details"**
2. Copy the **Connection string** (looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
3. Parse this into individual values:
   - **DB_HOST**: `ep-xxx.region.aws.neon.tech`
   - **DB_PORT**: `5432`
   - **DB_USER**: `username`
   - **DB_PASSWORD**: `password`
   - **DB_NAME**: `dbname`

---

## Step 2: Deploy Backend (Render)

### 2.1 Prepare Backend

1. Make sure your code is pushed to GitHub:
   ```bash
   git add .
   git commit -m "chore: add deployment configurations"
   git push origin main
   ```

### 2.2 Create Backend Service on Render

1. Go to https://render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `aavya-backend`
   - **Region**: Oregon (US West) or closest to you
   - **Root Directory**: `oms-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 2.3 Add Environment Variables

In the Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=3000
DB_HOST=<your-neon-host>
DB_PORT=5432
DB_USER=<your-neon-user>
DB_PASSWORD=<your-neon-password>
DB_NAME=<your-neon-dbname>
JWT_SECRET=<generate-random-string>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend.vercel.app
```

**Note**: For JWT_SECRET, generate a random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://aavya-backend.onrender.com`

### 2.5 Seed the Database

After deployment completes:
1. Go to your service → **Shell** tab
2. Run: `npm run seed`
3. Verify 42 products were seeded

---

## Step 3: Deploy AI Agent (Render)

### 3.1 Get Groq API Key

1. Go to https://console.groq.com
2. Sign up/Login
3. Go to **API Keys**
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk_...`)

### 3.2 Create AI Agent Service on Render

1. In Render, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `aavya-ai-agent`
   - **Region**: Oregon (same as backend for lower latency)
   - **Root Directory**: `ai-agent`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

### 3.3 Add Environment Variables

```
OPENAI_API_KEY=<your-groq-api-key>
DB_HOST=<your-neon-host>
DB_PORT=5432
DB_USER=<your-neon-user>
DB_PASSWORD=<your-neon-password>
DB_NAME=<your-neon-dbname>
```

### 3.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Copy your AI agent URL: `https://aavya-ai-agent.onrender.com`

---

## Step 4: Deploy Frontend (Vercel)

### 4.1 Create Vercel Project

1. Go to https://vercel.com and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 4.2 Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

```
VITE_API_URL=https://aavya-backend.onrender.com/api
VITE_AI_AGENT_URL=https://aavya-ai-agent.onrender.com
VITE_ENV=production
```

### 4.3 Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Your site will be live at: `https://your-project.vercel.app`

### 4.4 Update Backend CORS

1. Go back to Render → Backend service → **Environment**
2. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://your-project.vercel.app
   ```
3. Save and redeploy

---

## Step 5: Verify Deployment

### 5.1 Test Backend
```bash
curl https://aavya-backend.onrender.com/health
# Should return: {"status":"OK"}

curl https://aavya-backend.onrender.com/api/products
# Should return: Array of 42 products
```

### 5.2 Test AI Agent
```bash
curl https://aavya-ai-agent.onrender.com/health
# Should return: {"status":"ok"}
```

### 5.3 Test Frontend
1. Visit your Vercel URL
2. Products should load
3. Test the AI chatbot
4. Verify all features work

---

## Important Notes

### ⚠️ Render Free Tier Limitations

**Cold Starts**: Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Subsequent requests are fast
- **Solution**: Use a service like UptimeRobot to ping your API every 14 minutes

### 💡 Keep Services Awake (Optional)

Create a free UptimeRobot account:
1. Go to https://uptimerobot.com
2. Add monitors for:
   - `https://aavya-backend.onrender.com/health` (every 14 min)
   - `https://aavya-ai-agent.onrender.com/health` (every 14 min)

### 🔒 Security Recommendations

1. **Never commit `.env` files** (already in .gitignore ✅)
2. **Use strong JWT_SECRET** in production
3. **Update CORS_ORIGIN** to your actual Vercel domain
4. **Enable Vercel password protection** during development (optional)

---

## Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify all environment variables are set
- Ensure database connection string is correct

### TypeScript compilation errors during build
- The build command includes `--include=dev` to install TypeScript types
- `.npmrc` file ensures devDependencies are installed
- If still failing, check that all @types packages are in package.json

### Frontend can't connect to backend
- Check CORS settings in backend
- Verify `VITE_API_URL` in Vercel environment variables
- Check browser console for errors

### Database connection fails
- Verify Neon database is active
- Check connection string format
- Ensure `?sslmode=require` is in connection string

### AI Agent errors
- Verify Groq API key is valid
- Check Render logs for Python errors
- Ensure all dependencies in requirements.txt

---

## Updating Your Deployment

### Update Frontend
```bash
git add .
git commit -m "update: frontend changes"
git push origin main
```
Vercel auto-deploys on push!

### Update Backend/AI Agent
```bash
git add .
git commit -m "update: backend changes"
git push origin main
```
Render auto-deploys on push!

### Manual Redeploy
- **Vercel**: Dashboard → Deployments → Redeploy
- **Render**: Dashboard → Manual Deploy → Deploy latest commit

---

## Cost Breakdown

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| **Vercel** | 100GB bandwidth | Enough for ~10K visitors/month |
| **Render** | 750 hours/month per service | Sleeps after 15 min inactivity |
| **Neon** | 0.5GB storage | Enough for thousands of products |
| **Groq** | 100 requests/min | Very generous for free tier |

**Total Monthly Cost**: $0 🎉

---

## Next Steps

1. Follow Step 1 to create Neon database
2. Follow Step 2 to deploy backend
3. Follow Step 3 to deploy AI agent
4. Follow Step 4 to deploy frontend
5. Test everything works
6. Share your live URL!

Need help? Check the troubleshooting section or open an issue.

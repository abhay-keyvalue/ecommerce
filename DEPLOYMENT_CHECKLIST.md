# Deployment Checklist

Use this checklist to ensure you complete all deployment steps correctly.

## Pre-Deployment

- [ ] Code is committed to GitHub
- [ ] All tests pass locally
- [ ] Environment variables are documented
- [ ] `.gitignore` is configured (no secrets committed)

---

## 1. Database Setup (Neon)

- [ ] Create Neon account at https://neon.tech
- [ ] Create new project named "aavya-ecommerce"
- [ ] Copy connection string
- [ ] Parse connection details:
  - [ ] DB_HOST
  - [ ] DB_PORT
  - [ ] DB_USER
  - [ ] DB_PASSWORD
  - [ ] DB_NAME

---

## 2. Backend Deployment (Render)

- [ ] Create Render account at https://render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure service:
  - [ ] Name: `aavya-backend`
  - [ ] Root Directory: `oms-backend`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] NODE_ENV=production
  - [ ] PORT=3000
  - [ ] DB_HOST (from Neon)
  - [ ] DB_PORT=5432
  - [ ] DB_USER (from Neon)
  - [ ] DB_PASSWORD (from Neon)
  - [ ] DB_NAME (from Neon)
  - [ ] JWT_SECRET (generate random string)
  - [ ] JWT_EXPIRES_IN=7d
  - [ ] CORS_ORIGIN (will update after frontend deploy)
- [ ] Deploy and wait for completion
- [ ] Copy backend URL: `https://aavya-backend.onrender.com`
- [ ] Test health endpoint: `/health`
- [ ] Run seed command in Shell tab: `npm run seed`
- [ ] Verify products endpoint: `/api/products`

---

## 3. AI Agent Deployment (Render)

- [ ] Get Groq API key from https://console.groq.com
- [ ] Create new Web Service in Render
- [ ] Connect GitHub repository
- [ ] Configure service:
  - [ ] Name: `aavya-ai-agent`
  - [ ] Root Directory: `ai-agent`
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- [ ] Add environment variables:
  - [ ] OPENAI_API_KEY (Groq key)
  - [ ] DB_HOST (from Neon)
  - [ ] DB_PORT=5432
  - [ ] DB_USER (from Neon)
  - [ ] DB_PASSWORD (from Neon)
  - [ ] DB_NAME (from Neon)
- [ ] Deploy and wait for completion
- [ ] Copy AI agent URL: `https://aavya-ai-agent.onrender.com`
- [ ] Test health endpoint: `/health`

---

## 4. Frontend Deployment (Vercel)

- [ ] Create Vercel account at https://vercel.com
- [ ] Click "Add New Project"
- [ ] Import GitHub repository
- [ ] Configure:
  - [ ] Framework: Vite
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] Add environment variables:
  - [ ] VITE_API_URL (backend URL from step 2)
  - [ ] VITE_AI_AGENT_URL (AI agent URL from step 3)
  - [ ] VITE_ENV=production
- [ ] Deploy
- [ ] Copy frontend URL: `https://your-project.vercel.app`

---

## 5. Final Configuration

- [ ] Update backend CORS_ORIGIN with Vercel URL
- [ ] Redeploy backend on Render
- [ ] Test complete user flow:
  - [ ] Frontend loads
  - [ ] Products display correctly
  - [ ] AI chatbot responds
  - [ ] No CORS errors in browser console

---

## 6. Optional: Keep Services Awake

- [ ] Create UptimeRobot account (free)
- [ ] Add monitor for backend health endpoint (check every 14 min)
- [ ] Add monitor for AI agent health endpoint (check every 14 min)

---

## 7. Post-Deployment

- [ ] Add custom domain (optional)
- [ ] Set up monitoring/analytics
- [ ] Configure Vercel password protection (if needed)
- [ ] Document live URLs in README
- [ ] Share with users!

---

## URLs to Save

- **Frontend**: https://_____________________.vercel.app
- **Backend**: https://_____________________.onrender.com
- **AI Agent**: https://_____________________.onrender.com
- **Database**: ep-_____________________.neon.tech

---

## Quick Commands

Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Test Backend:
```bash
curl https://your-backend.onrender.com/health
curl https://your-backend.onrender.com/api/products
```

Test AI Agent:
```bash
curl https://your-ai-agent.onrender.com/health
```

---

**Estimated Total Time**: 30-45 minutes for complete deployment

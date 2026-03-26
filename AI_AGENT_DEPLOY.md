# 🤖 Deploy AI Agent to Render

Quick guide to deploy your FastAPI AI agent to Render.

---

## 📋 Prerequisites

✅ GitHub repository: https://github.com/abhay-keyvalue/ecommerce.git  
✅ Backend deployed: https://aavya-backend-jdli.onrender.com  
✅ Database seeded: 53 products, 1 user  
✅ Groq API key: Available in your `.env` file

---

## 🎯 Deployment Steps

### Step 1: Go to Render Dashboard

1. Open: https://dashboard.render.com/
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### Step 2: Connect Repository

1. Click **"Build and deploy from a Git repository"**
2. Click **"Connect account"** if GitHub not connected
3. Find and select: `abhay-keyvalue/ecommerce`
4. Click **"Connect"**

### Step 3: Configure Service

**Basic Settings:**

| Setting | Value |
|---------|-------|
| **Name** | `aavya-ai-agent` |
| **Region** | Oregon (US West) |
| **Branch** | `main` |
| **Root Directory** | `ai-agent` ⚠️ **IMPORTANT** |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

**Instance Type:**
- Select **"Free"** (first option)

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** for each:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | `<your-groq-api-key>` |
| `DB_HOST` | `<your-neon-host>` |
| `DB_PORT` | `5432` |
| `DB_USER` | `<your-neon-user>` |
| `DB_PASSWORD` | `<your-neon-password>` |
| `DB_NAME` | `<your-neon-database>` |

**Get your actual values from**: `RENDER_ENV_SETUP.md` or `NEON_CREDENTIALS.md`

### Step 5: Deploy

1. Click **"Create Web Service"** button at bottom
2. Wait 5-10 minutes for:
   - Build to complete
   - Dependencies to install
   - Service to start
3. You'll get a URL like: `https://aavya-ai-agent.onrender.com`

---

## ✅ After Deployment

### 1. Test AI Agent Health

```bash
curl https://aavya-ai-agent.onrender.com/health
```

Should return:
```json
{"status":"ok"}
```

### 2. Test Chat Endpoint

```bash
curl -X POST https://aavya-ai-agent.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Show me silk sarees"}
    ]
  }'
```

Should return AI response with product recommendations.

### 3. Update Frontend on Vercel

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Find `VITE_AI_AGENT_URL`
4. Update value to: `https://aavya-ai-agent.onrender.com`
5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"Redeploy"** on latest deployment

### 4. Test Chatbot on Frontend

1. Open your Vercel URL
2. Click the **chat icon** (bottom right)
3. Type: "Show me silk sarees"
4. Should get AI-powered product recommendations

---

## 🐛 Troubleshooting

### Build Failed

**Check Build Logs for**:

1. **"No such file or directory: requirements.txt"**
   - Fix: Ensure Root Directory is set to `ai-agent`

2. **"ERROR: Could not find a version that satisfies..."**
   - Fix: Python version mismatch
   - Add `runtime.txt` in `ai-agent/` folder:
     ```
     python-3.11
     ```

3. **"Module not found: app"**
   - Fix: Ensure `ai-agent/app/__init__.py` exists
   - Should be an empty file

### Service Won't Start

**Check Logs for**:

1. **"Database connection error"**
   - Verify all 6 DB environment variables are set
   - Check values match Neon credentials

2. **"OpenAI API key is missing"**
   - Verify `OPENAI_API_KEY` is set
   - Check it's your Groq API key (starts with `gsk_`)

3. **"Port already in use"**
   - Render automatically sets `$PORT`
   - Don't hardcode port in start command

### Chat Not Working

1. **Test health endpoint first**:
   ```bash
   curl https://aavya-ai-agent.onrender.com/health
   ```

2. **Check CORS**:
   - AI agent allows all origins (`*`)
   - Should work from any frontend

3. **Test with curl**:
   ```bash
   curl -X POST https://aavya-ai-agent.onrender.com/chat \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Hello"}]}'
   ```

---

## 📊 Deployment Checklist

- [ ] Go to Render Dashboard
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `ai-agent`
- [ ] Set Runtime to Python 3
- [ ] Add 6 environment variables
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 min)
- [ ] Test `/health` endpoint
- [ ] Test `/chat` endpoint
- [ ] Update `VITE_AI_AGENT_URL` on Vercel
- [ ] Redeploy frontend
- [ ] Test chatbot on website

---

## 🔧 Alternative: Deploy Using render.yaml

If you prefer using the Blueprint (render.yaml):

1. Go to Render Dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect repository: `abhay-keyvalue/ecommerce`
4. Select `ai-agent/render.yaml`
5. Add environment variables when prompted
6. Click **"Apply"**

**Note**: The render.yaml is already configured with correct settings.

---

## 📝 Environment Variables Reference

Get your actual credentials from `RENDER_ENV_SETUP.md` or `NEON_CREDENTIALS.md`:

```
OPENAI_API_KEY=<your-groq-api-key>
DB_HOST=<your-neon-host>
DB_PORT=5432
DB_USER=<your-neon-user>
DB_PASSWORD=<your-neon-password>
DB_NAME=<your-neon-database>
```

---

## 🎨 Update Frontend After AI Agent Deploys

Once you have your AI agent URL (e.g., `https://aavya-ai-agent.onrender.com`):

### Option 1: Update via Vercel Dashboard
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Update `VITE_AI_AGENT_URL` to your AI agent URL
3. Redeploy

### Option 2: Update Local and Push
```bash
# Update frontend/.env
echo "VITE_AI_AGENT_URL=https://aavya-ai-agent.onrender.com" >> frontend/.env

# Commit and push
git add frontend/.env
git commit -m "Update AI agent URL"
git push
```

Vercel will auto-deploy.

---

## 🧪 Test AI Agent Features

### 1. Product Search
```bash
curl -X POST https://aavya-ai-agent.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Show me silk sarees under 5000"}
    ]
  }'
```

### 2. Category Browse
```bash
curl -X POST https://aavya-ai-agent.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What lehengas do you have?"}
    ]
  }'
```

### 3. Fabric Filter
```bash
curl -X POST https://aavya-ai-agent.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Show cotton products"}
    ]
  }'
```

---

## 🔗 Quick Links

- **Deploy Now**: https://dashboard.render.com/create?type=web
- **GitHub Repo**: https://github.com/abhay-keyvalue/ecommerce
- **Backend API**: https://aavya-backend-jdli.onrender.com
- **Groq Console**: https://console.groq.com/keys

---

## ⚡ Performance Notes

**Free Tier Limitations:**
- Service sleeps after 15 min inactivity
- First request after sleep: 30-60 seconds
- Subsequent requests: Fast (<1 second)

**Optimization Tips:**
- Keep service warm with cron job (paid plans)
- Use smaller AI models for faster responses
- Cache common queries

---

## 🎯 What the AI Agent Does

1. **Natural Language Search**: "Show me silk sarees"
2. **Price Filtering**: "Products under 3000"
3. **Category Browse**: "What lehengas do you have?"
4. **Fabric Search**: "Show cotton products"
5. **Color Filter**: "Red sarees"
6. **General Questions**: "What's your return policy?"

**Powered by**:
- LangGraph (orchestration)
- LangChain (AI framework)
- Groq (Llama 3.1 8B model)
- PostgreSQL (product data)

---

**Ready to deploy!** 🚀

Go to Render and create your AI agent service now!

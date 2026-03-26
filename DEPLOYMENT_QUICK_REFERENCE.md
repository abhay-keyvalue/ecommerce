# Deployment Quick Reference Card

## 🔗 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | `https://[your-project].vercel.app` | User-facing website |
| **Backend** | `https://aavya-backend.onrender.com` | REST API |
| **AI Agent** | `https://aavya-ai-agent.onrender.com` | Chatbot AI |
| **Database** | `ep-[xxx].neon.tech` | PostgreSQL |

---

## 🔑 Environment Variables Cheat Sheet

### Backend (Render)
```bash
NODE_ENV=production
PORT=3000
DB_HOST=<from-neon>
DB_PORT=5432
DB_USER=<from-neon>
DB_PASSWORD=<from-neon>
DB_NAME=<from-neon>
JWT_SECRET=<generate-random>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=<your-vercel-url>
```

### AI Agent (Render)
```bash
OPENAI_API_KEY=<groq-key>
DB_HOST=<from-neon>
DB_PORT=5432
DB_USER=<from-neon>
DB_PASSWORD=<from-neon>
DB_NAME=<from-neon>
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://aavya-backend.onrender.com/api
VITE_AI_AGENT_URL=https://aavya-ai-agent.onrender.com
VITE_ENV=production
```

---

## 🛠️ Common Commands

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Endpoints
```bash
# Backend health
curl https://aavya-backend.onrender.com/health

# Get products
curl https://aavya-backend.onrender.com/api/products

# AI Agent health
curl https://aavya-ai-agent.onrender.com/health
```

### Seed Database (Render Shell)
```bash
npm run seed
```

### View Logs
- **Render**: Dashboard → Service → Logs tab
- **Vercel**: Dashboard → Deployments → Click deployment → Logs

---

## ⚡ Quick Deploy

```bash
# 1. Commit changes
git add .
git commit -m "update: changes"
git push origin main

# 2. Auto-deploys to Vercel & Render
# Wait 2-5 minutes

# 3. Verify
# Visit your Vercel URL
```

---

## 🐛 Quick Fixes

### CORS Error
```bash
# Update backend CORS_ORIGIN in Render
# Set to: https://your-project.vercel.app
```

### Cold Start Delay
```bash
# Set up UptimeRobot to ping every 14 min:
# https://aavya-backend.onrender.com/health
# https://aavya-ai-agent.onrender.com/health
```

### Database Connection Error
```bash
# Check Neon dashboard - database active?
# Verify all DB_* variables in Render
# Ensure ?sslmode=require in connection string
```

---

## 📱 Mobile Testing

Test on mobile devices:
- [ ] Products load correctly
- [ ] Images display properly
- [ ] Chatbot works on mobile
- [ ] Responsive design looks good

---

## 🎯 Performance Tips

1. **Images**: Use optimized images (WebP format)
2. **Caching**: Vercel automatically caches static assets
3. **CDN**: Vercel uses global CDN for fast loading
4. **Keep Awake**: Use UptimeRobot for Render services

---

## 📊 Monitoring

### Check Service Status
- **Render**: Dashboard shows "Live" status
- **Vercel**: Dashboard shows deployment status
- **Neon**: Dashboard shows database status

### Monitor Errors
- **Render Logs**: Real-time error tracking
- **Vercel Logs**: Deployment and runtime logs
- **Browser Console**: Frontend errors

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is random and strong
- [ ] CORS_ORIGIN is set to specific domain
- [ ] No `.env` files committed to git
- [ ] Groq API key kept secret
- [ ] Database password is strong

---

## 📈 When to Upgrade

**Upgrade Render ($7/month per service) when:**
- Cold starts annoy users
- Need 24/7 uptime
- Traffic increases significantly

**Upgrade Vercel ($20/month) when:**
- Exceed 100GB bandwidth
- Need team collaboration
- Want advanced analytics

**Upgrade Neon ($19/month) when:**
- Database exceeds 0.5GB
- Need more compute power
- Want point-in-time recovery

---

**Last Updated**: March 2026

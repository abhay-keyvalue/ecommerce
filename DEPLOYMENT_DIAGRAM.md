# Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│                     (Web Browsers)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │   React + Vite + Tailwind CSS                      │    │
│  │   - Product Catalog                                 │    │
│  │   - Shopping Cart                                   │    │
│  │   - AI Chatbot UI                                   │    │
│  │   URL: https://aavya-store.vercel.app              │    │
│  └────────────────────────────────────────────────────┘    │
└───────────────┬─────────────────────┬──────────────────────┘
                │                     │
                │ API Calls           │ Chat Requests
                ▼                     ▼
    ┌──────────────────┐    ┌──────────────────┐
    │  RENDER (Backend)│    │ RENDER (AI Agent)│
    │  ┌────────────┐  │    │  ┌────────────┐  │
    │  │ Node.js    │  │    │  │ FastAPI    │  │
    │  │ Express    │  │    │  │ LangGraph  │  │
    │  │ TypeORM    │  │    │  │ Groq API   │  │
    │  └────────────┘  │    │  └────────────┘  │
    │  Port: 3000      │    │  Port: 8000      │
    └────────┬─────────┘    └────────┬─────────┘
             │                       │
             │ SQL Queries           │ SQL Queries
             ▼                       ▼
    ┌─────────────────────────────────────┐
    │     NEON (PostgreSQL Database)      │
    │  ┌───────────────────────────────┐  │
    │  │  Tables:                      │  │
    │  │  - products (42 items)        │  │
    │  │  - orders                     │  │
    │  │  - users                      │  │
    │  │  - order_items                │  │
    │  └───────────────────────────────┘  │
    │  Always-on, Serverless              │
    └─────────────────────────────────────┘
```

## Request Flow Examples

### 1. User Browses Products
```
User → Vercel Frontend → Render Backend → Neon DB
                      ← Product Data ←
     ← Display Products ←
```

### 2. User Asks AI Chatbot
```
User: "Show me silk sarees under ₹5000"
  ↓
Vercel Frontend → Render AI Agent
                  ↓
                  Groq API (LLM)
                  ↓
                  search_products tool
                  ↓
                  Neon DB
                  ↓
                  Format Response
                  ↓
Vercel Frontend ← AI Response
  ↓
User sees: "I found 3 silk sarees..."
```

### 3. User Places Order
```
User → Vercel Frontend → Render Backend → Neon DB
                      ← Order Created ←
     ← Confirmation ←
```

## Service Details

| Service | Provider | Plan | Cost | Sleep? |
|---------|----------|------|------|--------|
| Frontend | Vercel | Free | $0 | No ❌ |
| Backend | Render | Free | $0 | Yes ⚠️ (15 min) |
| AI Agent | Render | Free | $0 | Yes ⚠️ (15 min) |
| Database | Neon | Free | $0 | No ❌ |
| AI Model | Groq | Free | $0 | No ❌ |

## Cold Start Impact

**What happens when services sleep:**

1. **First request after 15 min**: ~30 seconds delay
2. **Subsequent requests**: Normal speed (<100ms)
3. **User experience**: Loading spinner shows during wake-up

**Solutions:**
- Use UptimeRobot to ping every 14 minutes (keeps awake)
- Upgrade to Render paid plan ($7/month) for no sleep
- Accept cold starts (most users won't notice)

## Scaling Considerations

**When you outgrow free tier:**

1. **High Traffic** (>100K visitors/month):
   - Upgrade Vercel to Pro ($20/month)
   - Upgrade Render to Starter ($7/month each)

2. **Database Growth** (>0.5GB):
   - Upgrade Neon to Launch ($19/month)

3. **AI Usage** (>100 req/min):
   - Groq has generous limits, unlikely to hit
   - Consider caching common queries

## Security Notes

- All connections use HTTPS/SSL ✅
- Database requires SSL connection ✅
- CORS configured for your domain only ✅
- JWT tokens for authentication ✅
- Environment variables never exposed ✅

# Render Build Fix - TypeScript Errors

## Problem

When deploying to Render, you may encounter TypeScript compilation errors like:

```
error TS7016: Could not find a declaration file for module 'express'
error TS7016: Could not find a declaration file for module 'bcrypt'
```

## Root Cause

By default, Render runs `npm install --production` which skips `devDependencies`. However, TypeScript and type definitions (`@types/*`) are needed during the build process.

## Solution

We've implemented **three fixes** to resolve this:

### Fix 1: Updated Build Command

**File**: `oms-backend/render.yaml`

```yaml
buildCommand: npm install --include=dev && npm run build
```

The `--include=dev` flag ensures devDependencies (TypeScript, @types packages) are installed.

### Fix 2: Added .npmrc Configuration

**File**: `oms-backend/.npmrc`

```
production=false
```

This tells npm to always install devDependencies, even in production environments.

### Fix 3: Added reflect-metadata to Dependencies

**File**: `oms-backend/package.json`

```json
"dependencies": {
  "reflect-metadata": "^0.2.2"
}
```

TypeORM requires this at runtime, so it must be in dependencies.

## Verification

After these fixes, the build should succeed. You'll see:

```
==> Building...
> tsc
==> Build succeeded ✓
```

## If Still Failing

### Check 1: Verify Build Command in Render

1. Go to Render Dashboard → Your Service
2. Click **Settings** → **Build & Deploy**
3. Ensure Build Command is:
   ```
   npm install --include=dev && npm run build
   ```

### Check 2: Check .npmrc File

1. Verify `oms-backend/.npmrc` exists
2. Content should be:
   ```
   production=false
   ```

### Check 3: Clear Build Cache

1. In Render Dashboard → Your Service
2. Click **Manual Deploy**
3. Select **"Clear build cache & deploy"**

### Check 4: Verify package.json

Ensure all these are in `devDependencies`:
- `typescript`
- `@types/express`
- `@types/node`
- `@types/bcrypt`
- `@types/jsonwebtoken`
- `@types/cors`

## Alternative Solution (If Above Doesn't Work)

Move TypeScript and types to `dependencies`:

```json
"dependencies": {
  "typescript": "^5.9.3",
  "@types/express": "^5.0.6",
  "@types/node": "^25.5.0",
  "@types/bcrypt": "^6.0.0",
  "@types/jsonwebtoken": "^9.0.10",
  "@types/cors": "^2.8.19"
}
```

Then update build command back to:
```
npm install && npm run build
```

## Testing Locally

Before redeploying, test the build locally:

```bash
cd oms-backend

# Simulate production build
NODE_ENV=production npm install --include=dev
npm run build

# Should create dist/ folder with compiled JS
ls -la dist/
```

## After Fix

Once the build succeeds:
1. Backend will deploy successfully
2. Run seed command in Render Shell: `npm run seed`
3. Test endpoint: `https://aavya-backend.onrender.com/health`

---

## SSL Connection Error

### Problem

```
error: connection is insecure (try using `sslmode=require`)
```

### Solution

**Backend** (`oms-backend/src/config/database.ts`):
```typescript
ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
```

**AI Agent** (`ai-agent/app/db.py`):
```python
sslmode = 'require' if os.getenv('NODE_ENV') == 'production' or 'neon.tech' in DB_HOST else 'prefer'
```

This automatically enables SSL for production/cloud databases like Neon.

---

**Status**: ✅ Fixed in latest commit

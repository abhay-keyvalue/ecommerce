#!/bin/bash

echo "🔍 Pre-Deployment Checklist"
echo "================================"
echo ""

# Check if git repo is clean
if [[ -n $(git status -s) ]]; then
    echo "⚠️  WARNING: You have uncommitted changes"
    echo "   Run: git add . && git commit -m 'your message'"
    echo ""
else
    echo "✅ Git repository is clean"
fi

# Check if on main branch
current_branch=$(git branch --show-current)
if [[ "$current_branch" != "main" ]]; then
    echo "⚠️  WARNING: You're on branch '$current_branch', not 'main'"
    echo "   Run: git checkout main"
    echo ""
else
    echo "✅ On main branch"
fi

# Check if .env.example files exist
echo ""
echo "📝 Checking environment templates..."
if [[ -f "frontend/.env.example" ]]; then
    echo "✅ frontend/.env.example exists"
else
    echo "❌ frontend/.env.example missing"
fi

if [[ -f "oms-backend/.env.example" ]]; then
    echo "✅ oms-backend/.env.example exists"
else
    echo "❌ oms-backend/.env.example missing"
fi

if [[ -f "ai-agent/.env.example" ]]; then
    echo "✅ ai-agent/.env.example exists"
else
    echo "❌ ai-agent/.env.example missing"
fi

# Check if .env files are NOT committed
echo ""
echo "🔒 Checking security..."
if git ls-files | grep -q "\.env$"; then
    echo "⚠️  WARNING: .env files are tracked in git!"
    echo "   This is a security risk. Run: git rm --cached */.env"
else
    echo "✅ No .env files in git (secure)"
fi

# Check deployment config files
echo ""
echo "⚙️  Checking deployment configs..."
if [[ -f "frontend/vercel.json" ]]; then
    echo "✅ frontend/vercel.json exists"
else
    echo "❌ frontend/vercel.json missing"
fi

if [[ -f "oms-backend/render.yaml" ]]; then
    echo "✅ oms-backend/render.yaml exists"
else
    echo "❌ oms-backend/render.yaml missing"
fi

if [[ -f "ai-agent/render.yaml" ]]; then
    echo "✅ ai-agent/render.yaml exists"
else
    echo "❌ ai-agent/render.yaml missing"
fi

# Check if node_modules are ignored
echo ""
echo "📦 Checking .gitignore..."
if git ls-files | grep -q "node_modules"; then
    echo "⚠️  WARNING: node_modules are tracked in git"
    echo "   Run: git rm -r --cached */node_modules/"
else
    echo "✅ node_modules properly ignored"
fi

# Check package.json exists
echo ""
echo "📋 Checking package files..."
if [[ -f "package.json" ]]; then
    echo "✅ Root package.json exists"
else
    echo "❌ Root package.json missing"
fi

if [[ -f "frontend/package.json" ]]; then
    echo "✅ frontend/package.json exists"
else
    echo "❌ frontend/package.json missing"
fi

if [[ -f "oms-backend/package.json" ]]; then
    echo "✅ oms-backend/package.json exists"
else
    echo "❌ oms-backend/package.json missing"
fi

if [[ -f "ai-agent/requirements.txt" ]]; then
    echo "✅ ai-agent/requirements.txt exists"
else
    echo "❌ ai-agent/requirements.txt missing"
fi

echo ""
echo "================================"
echo "✨ Pre-deployment check complete!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Follow STEP_BY_STEP_DEPLOYMENT.md"
echo "3. Deploy to Vercel and Render"
echo ""

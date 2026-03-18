# Quick Start Guide - Aavya Ethnic Couture

## First Time Setup

```bash
# 1. Run the automated setup script
./setup.sh

# 2. Update database credentials in oms-backend/.env if needed

# 3. Start the database
npm run db:up

# 4. Seed the database with sample products
npm run seed
```

## Daily Development

```bash
# Start both frontend and backend together
npm run dev
```

This will start:
- Backend API on http://localhost:3000
- Frontend app on http://localhost:5173

Press `Ctrl+C` to stop both servers.

## Useful Commands

```bash
# Start only backend
npm run dev:backend

# Start only frontend  
npm run dev:frontend

# Stop database
npm run db:down

# Reset database (removes all data)
npm run db:reset

# Run tests
npm run test

# Build for production
npm run build
```

## Project URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/health

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# Restart database
npm run db:down
npm run db:up
```

### Port Already in Use
```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Reset Everything
```bash
# Stop database
npm run db:down

# Remove node_modules
rm -rf node_modules frontend/node_modules oms-backend/node_modules

# Reinstall
npm run install:all

# Start fresh
npm run db:up
npm run seed
npm run dev
```

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

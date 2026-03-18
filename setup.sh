#!/bin/bash

echo "🌸 Setting up Aavya Ethnic Couture E-Store..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd oms-backend

if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

echo "Installing backend dependencies..."
npm install

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up frontend..."
cd frontend

if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update oms-backend/.env with your database credentials"
echo "2. Start PostgreSQL: cd oms-backend && docker-compose up -d"
echo "3. Run database seeds: cd oms-backend && npm run seed"
echo "4. Start backend: cd oms-backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌸 Happy coding!"

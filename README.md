# Aavya Ethnic Couture - Women's Textile E-Store

A modern e-commerce platform for authentic Indian ethnic wear, featuring sarees, lehengas, suits, and accessories.

## Project Structure

```
ecommerce/
├── frontend/          # React + Vite + Tailwind CSS
├── oms-backend/       # Node.js + Express + TypeORM + PostgreSQL
├── ai-agent/          # FastAPI + LangGraph + Groq AI
└── README.md
```

## Features

- Browse curated collection of ethnic wear (42+ products)
- Product categories: Sarees, Lehengas, Suits, Kurtis, Accessories
- Detailed product information (fabric, color, stock)
- AI-powered shopping assistant chatbot
- Order management system
- Responsive design with elegant UI
- Real-time product search and recommendations

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion (animations)
- React Router
- Lucide React (icons)

### Backend
- Node.js
- Express
- TypeORM
- PostgreSQL
- TypeScript

### AI Agent
- FastAPI
- LangGraph
- LangChain
- Groq (Llama 3.1)
- Python

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn
- Docker (for PostgreSQL database)

### Quick Start (Recommended)

Run the automated setup script:
```bash
./setup.sh
```

Then start both frontend and backend together:
```bash
npm run dev
```

That's it! The frontend will run on `http://localhost:5173` and backend on `http://localhost:3000`

### Manual Setup

If you prefer to set up manually:

1. Install all dependencies:
```bash
npm run install:all
```

2. Create `.env` files from templates:
```bash
cp oms-backend/.env.example oms-backend/.env
cp frontend/.env.example frontend/.env
```

3. Update `oms-backend/.env` with your database credentials

4. Start PostgreSQL database:
```bash
npm run db:up
```

5. Seed the database:
```bash
npm run seed
```

6. Start both servers:
```bash
npm run dev
```

### Available Scripts

From the root directory:

- `npm run dev` - Start both frontend and backend concurrently
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build both frontend and backend
- `npm run install:all` - Install dependencies for both projects
- `npm run db:up` - Start PostgreSQL database
- `npm run db:down` - Stop PostgreSQL database
- `npm run db:reset` - Reset database (removes all data)
- `npm run seed` - Seed database with sample products
- `npm run test` - Run backend tests
- `npm run lint` - Run frontend linter
- `npm run setup` - Complete setup (install, start DB, seed)

### Individual Project Commands

**Backend** (`oms-backend/`):
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm test` - Run tests
- `npm run seed` - Seed database

**Frontend** (`frontend/`):
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Schema

### Products Table
- `id` - UUID (Primary Key)
- `name` - Product name
- `description` - Detailed description
- `price` - Decimal (10,2)
- `stock` - Integer
- `category` - Sarees, Lehengas, Suits, Kurtis, Accessories
- `fabric` - Silk, Cotton, Georgette, etc.
- `color` - Product color
- `image_url` - Product image URL
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Orders Table
- Order tracking and management
- Order items with product references

### Users Table
- User authentication and profiles

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

## Design System

### Color Palette
- Primary: Pink/Rose (#ec4899)
- Accent: Amber (#d97706)
- Background: Soft gradient (pink to peach)

### Typography
- Display Font: Playfair Display
- Body Font: Cormorant Garamond

### Brand Identity
- Name: Aavya Ethnic Couture
- Tagline: Timeless Elegance
- Focus: Authentic Indian craftsmanship

## Development

### Running Tests
```bash
# Backend tests
cd oms-backend
npm test

# Frontend tests (if configured)
cd frontend
npm test
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd oms-backend
npm run build
```

## Deployment

Ready to deploy your store? We've got you covered!

📚 **Deployment Guides**:
- [STEP_BY_STEP_DEPLOYMENT.md](./STEP_BY_STEP_DEPLOYMENT.md) - Complete walkthrough
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Checklist format
- [DEPLOYMENT_QUICK_REFERENCE.md](./DEPLOYMENT_QUICK_REFERENCE.md) - Quick commands
- [DEPLOYMENT_DIAGRAM.md](./DEPLOYMENT_DIAGRAM.md) - Architecture overview

**Hosting Stack** (All Free):
- Frontend: Vercel
- Backend: Render
- AI Agent: Render
- Database: Neon PostgreSQL

**Estimated Time**: 30 minutes for complete deployment

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

MIT License - feel free to use this project for your own purposes.

## Contact

For questions or support, please open an issue in the repository.

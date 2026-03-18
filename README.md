# Aavya Ethnic Couture - Women's Textile E-Store

A modern e-commerce platform for authentic Indian ethnic wear, featuring sarees, lehengas, suits, and accessories.

## Project Structure

```
ecommerce/
├── frontend/          # React + Vite + Tailwind CSS
├── oms-backend/       # Node.js + Express + TypeORM + PostgreSQL
└── README.md
```

## Features

- Browse curated collection of ethnic wear
- Product categories: Sarees, Lehengas, Suits, Kurtis, Accessories
- Detailed product information (fabric, color, stock)
- Order management system
- Responsive design with elegant UI

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

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd oms-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials

5. Start PostgreSQL database (using Docker):
```bash
docker-compose up -d
```

6. Run database migrations and seed data:
```bash
npm run seed
```

7. Start the development server:
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

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

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Contact

For questions or support, please open an issue in the repository.

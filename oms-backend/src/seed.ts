import 'dotenv/config';
import { AppDataSource } from './config/database';
import { Product } from './entities/Product';

const seedProducts = [
  { 
    name: 'Banarasi Silk Saree', 
    description: 'Exquisite handwoven Banarasi silk saree with intricate gold zari work. Perfect for weddings and special occasions.', 
    price: 8999.00, 
    stock: 15,
    category: 'Sarees',
    fabric: 'Pure Silk',
    color: 'Royal Blue',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'
  },
  { 
    name: 'Chanderi Cotton Saree', 
    description: 'Lightweight and elegant Chanderi cotton saree with traditional motifs. Ideal for daily wear and office.', 
    price: 2499.00, 
    stock: 30,
    category: 'Sarees',
    fabric: 'Chanderi Cotton',
    color: 'Pastel Pink',
    image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80'
  },
  { 
    name: 'Designer Lehenga Choli', 
    description: 'Stunning bridal lehenga with heavy embroidery and sequin work. Comes with matching choli and dupatta.', 
    price: 24999.00, 
    stock: 8,
    category: 'Lehengas',
    fabric: 'Velvet & Net',
    color: 'Maroon',
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80'
  },
  { 
    name: 'Anarkali Suit Set', 
    description: 'Graceful Anarkali suit with flared silhouette and delicate embroidery. Includes matching dupatta and churidar.', 
    price: 3999.00, 
    stock: 25,
    category: 'Suits',
    fabric: 'Georgette',
    color: 'Emerald Green',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'
  },
  { 
    name: 'Cotton Kurti', 
    description: 'Comfortable and stylish cotton kurti with block print design. Perfect for casual and everyday wear.', 
    price: 899.00, 
    stock: 50,
    category: 'Kurtis',
    fabric: 'Pure Cotton',
    color: 'White & Indigo',
    image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80'
  },
  { 
    name: 'Pashmina Shawl', 
    description: 'Luxurious handwoven Pashmina shawl from Kashmir. Incredibly soft and warm, perfect for winter elegance.', 
    price: 6499.00, 
    stock: 12,
    category: 'Accessories',
    fabric: 'Pashmina Wool',
    color: 'Cream',
    image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80'
  },
  { 
    name: 'Bandhani Dupatta', 
    description: 'Traditional Bandhani tie-dye dupatta from Rajasthan. Vibrant colors and authentic craftsmanship.', 
    price: 1299.00, 
    stock: 40,
    category: 'Accessories',
    fabric: 'Cotton Silk',
    color: 'Multi-color',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'
  },
  { 
    name: 'Silk Palazzo Set', 
    description: 'Contemporary silk palazzo with matching kurta. Modern design with traditional fabric for a fusion look.', 
    price: 4499.00, 
    stock: 20,
    category: 'Suits',
    fabric: 'Raw Silk',
    color: 'Mustard Yellow',
    image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80'
  },
  { 
    name: 'Kanjivaram Silk Saree', 
    description: 'Authentic Kanjivaram silk saree with temple border and rich pallu. A timeless piece for special celebrations.', 
    price: 15999.00, 
    stock: 10,
    category: 'Sarees',
    fabric: 'Kanjivaram Silk',
    color: 'Deep Purple',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'
  },
  { 
    name: 'Chikankari Kurta', 
    description: 'Elegant Lucknowi Chikankari embroidered kurta. Delicate handwork on premium cotton fabric.', 
    price: 1899.00, 
    stock: 35,
    category: 'Kurtis',
    fabric: 'Cotton',
    color: 'White',
    image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80'
  },
  { 
    name: 'Organza Saree', 
    description: 'Lightweight organza saree with floral prints and lace border. Perfect for summer occasions.', 
    price: 3499.00, 
    stock: 22,
    category: 'Sarees',
    fabric: 'Organza',
    color: 'Peach',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'
  },
  { 
    name: 'Embroidered Salwar Kameez', 
    description: 'Classic salwar kameez with intricate thread embroidery. Comfortable fit with elegant design.', 
    price: 2799.00, 
    stock: 28,
    category: 'Suits',
    fabric: 'Cotton Blend',
    color: 'Navy Blue',
    image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80'
  }
];

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected for seeding...');
    
    for (const p of seedProducts) {
      const exists = await AppDataSource.manager.findOneBy(Product, { name: p.name });
      if (!exists) {
        const product = AppDataSource.manager.create(Product, p);
        await AppDataSource.manager.save(product);
        console.log(`Seeded: ${p.name}`);
      }
    }
    
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });

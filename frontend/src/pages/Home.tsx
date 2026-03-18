import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
        setProducts([
          {
            id: '1', 
            name: 'Banarasi Silk Saree', 
            description: 'Exquisite handwoven Banarasi silk saree with intricate gold zari work. Perfect for weddings and special occasions.', 
            price: 8999.00, 
            stock: 15,
            category: 'Sarees',
            fabric: 'Pure Silk',
            color: 'Royal Blue',
            image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80',
            created_at: new Date().toISOString(), 
            updated_at: new Date().toISOString()
          },
          {
            id: '2', 
            name: 'Chanderi Cotton Saree', 
            description: 'Lightweight and elegant Chanderi cotton saree with traditional motifs. Ideal for daily wear and office.', 
            price: 2499.00, 
            stock: 30,
            category: 'Sarees',
            fabric: 'Chanderi Cotton',
            color: 'Pastel Pink',
            image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80',
            created_at: new Date().toISOString(), 
            updated_at: new Date().toISOString()
          },
          {
            id: '3', 
            name: 'Designer Lehenga Choli', 
            description: 'Stunning bridal lehenga with heavy embroidery and sequin work. Comes with matching choli and dupatta.', 
            price: 24999.00, 
            stock: 8,
            category: 'Lehengas',
            fabric: 'Velvet & Net',
            color: 'Maroon',
            image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
            created_at: new Date().toISOString(), 
            updated_at: new Date().toISOString()
          },
          {
            id: '4', 
            name: 'Cotton Kurti', 
            description: 'Comfortable and stylish cotton kurti with block print design. Perfect for casual and everyday wear.', 
            price: 899.00, 
            stock: 50,
            category: 'Kurtis',
            fabric: 'Pure Cotton',
            color: 'White & Indigo',
            image_url: 'https://images.unsplash.com/photo-1583391733981-5ade4c8c3d8e?w=500&q=80',
            created_at: new Date().toISOString(), 
            updated_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center gap-4 mb-12 py-8"
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 tracking-tight mb-3">
          Timeless Elegance
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl font-light leading-relaxed">
          Discover our exquisite collection of handcrafted ethnic wear. 
          From traditional sarees to contemporary fusion pieces, each garment tells a story of heritage and artistry.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full border border-primary-100">
            ✨ Authentic Craftsmanship
          </span>
          <span className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 text-sm font-semibold px-4 py-2 rounded-full border border-accent-100">
            🇮🇳 Made in India
          </span>
        </div>
      </motion.div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-primary-200">
          <p className="text-xl text-slate-500 font-display">No products found.</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;

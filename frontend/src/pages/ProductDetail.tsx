import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';
import { api } from '../services/api';
import { Loader2, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <p className="text-xl text-slate-500 font-display mb-6">Product not found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-primary-50 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[480px] bg-gradient-to-br from-primary-50 to-accent-50">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {product.category && (
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-700 shadow-sm">
              {product.category}
            </div>
          )}
        </div>

        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-display font-bold text-primary-600 mb-6">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </p>

          <p className="text-slate-600 text-base leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.fabric && (
              <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 rounded-full border border-slate-200">
                <Sparkles className="h-4 w-4" />
                {product.fabric}
              </span>
            )}
            {product.color && (
              <span className="inline-flex items-center bg-primary-50 text-primary-700 text-sm font-medium px-4 py-2 rounded-full border border-primary-100">
                {product.color}
              </span>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Availability</span>
              <span className={product.stock > 0 ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={product.stock === 0}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-all ${
                product.stock > 0
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/30'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;

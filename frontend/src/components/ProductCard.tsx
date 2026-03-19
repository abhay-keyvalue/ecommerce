import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgb(219 39 119 / 0.15)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white flex-col rounded-3xl overflow-hidden shadow-md border border-primary-50 flex h-full hover:border-primary-200 transition-all group"
    >
      <div className="relative h-64 sm:h-72 bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80'} 
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-primary-700 shadow-sm">
            {product.category}
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-tight flex-1 pr-2">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-display font-bold text-primary-600">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        
        <p className="text-slate-600 text-base line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          {product.fabric && (
            <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-700 text-xs font-medium px-3 py-1 rounded-full border border-slate-200">
              <Sparkles className="h-3 w-3" />
              {product.fabric}
            </span>
          )}
          {product.color && (
            <span className="inline-flex items-center bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full border border-primary-100">
              {product.color}
            </span>
          )}
        </div>
        
        <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
          <div className="text-sm font-semibold">
            <span className={product.stock > 0 ? "text-emerald-600" : "text-red-500"}>
              {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
            </span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
              product.stock > 0 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/40' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

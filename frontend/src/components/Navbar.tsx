import React from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 text-primary-600 hover:text-primary-700 transition group">
              <Sparkles className="h-8 w-8 text-primary-500 group-hover:text-accent-600 transition" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight text-slate-900">Aavya</span>
                <span className="text-xs text-slate-500 -mt-1 tracking-wide">ETHNIC COUTURE</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/orders" className="text-slate-700 hover:text-primary-600 font-medium transition text-lg">
              My Orders
            </Link>
            <button className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2.5 rounded-full hover:from-primary-600 hover:to-primary-700 transition shadow-md hover:shadow-lg hover:shadow-primary-500/30">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

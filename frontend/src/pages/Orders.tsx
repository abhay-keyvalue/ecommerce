import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight mb-3">
          Your Orders
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-light">
          Track and manage your ethnic wear collection.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-12 mx-4 sm:mx-0 text-center border-2 border-dashed border-primary-200 shadow-sm">
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-50 to-accent-50 rounded-full flex items-center justify-center mb-6">
          <PackageOpen className="h-10 w-10 sm:h-12 sm:w-12 text-primary-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3">No orders yet</h3>
        <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Begin your journey into timeless elegance. Explore our curated collection of authentic ethnic wear.
        </p>
        <Link to="/">
          <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-primary-600 hover:to-primary-700 transition shadow-md hover:shadow-lg hover:shadow-primary-500/30">
            Explore Collection
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Orders;

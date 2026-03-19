import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Outlet />
      </main>
      <footer className="w-full bg-gradient-to-r from-primary-50 via-white to-accent-50 border-t border-primary-100 py-8 sm:py-12 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">About Aavya</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Celebrating Indian heritage through authentic ethnic wear. Each piece is carefully curated to bring you the finest textiles from across India.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">Customer Care</h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>Size Guide</li>
                <li>Care Instructions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-3">Shop By</h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>Sarees</li>
                <li>Lehengas</li>
                <li>Suits & Kurtis</li>
                <li>Accessories</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm border-t border-primary-100 pt-6">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart className="h-4 w-4 text-primary-500 fill-primary-500" /> in India
            </p>
            <p className="mt-2">&copy; {new Date().getFullYear()} Aavya Ethnic Couture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

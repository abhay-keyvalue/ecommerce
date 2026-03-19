import React from 'react';
import { ShoppingCart, Sparkles, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          <div className="flex items-center gap-4 sm:gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="text-slate-700 hover:text-primary-600 font-medium transition text-base sm:text-lg hidden sm:block">
                  My Orders
                </Link>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  <UserIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{user?.email.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
                <Link to="/login" className="text-slate-700 hover:text-primary-600 font-medium transition text-base sm:text-lg">
                  Login
                </Link>
            )}

            <button className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:from-primary-600 hover:to-primary-700 transition shadow-md hover:shadow-lg hover:shadow-primary-500/30">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

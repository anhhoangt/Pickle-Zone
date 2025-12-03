import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-200' : '';
  };

  return (
    <div className="w-64 bg-gray-100 h-screen p-4 flex flex-col border-l border-gray-200">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/dashboard">
          <div className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive('/dashboard')}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
        </Link>

        <Link to="/profile">
          <div className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive('/profile')}`}>
            <User size={20} />
            <span>Profile</span>
          </div>
        </Link>

        <Link to="/marketplace">
          <div className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors ${isActive('/marketplace')}`}>
            <ShoppingBag size={20} />
            <span>Marketplace</span>
          </div>
        </Link>
      </nav>

      <div className="pt-4 border-t border-gray-300">
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
          <LogOut size={20} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

import { Link, useLocation } from 'react-router-dom';
import { User, LayoutDashboard, LogOut, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { AnimatedLogo } from './AnimatedLogo';

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary text-white' : '';
  };

  return (
    <div
      className={`bg-gradient-to-b from-green-50 to-white h-screen p-4 flex flex-col border-r border-green-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-3">
          <AnimatedLogo size={40} />
          {!isCollapsed && <span className="text-xl font-bold text-primary">PickleZone</span>}
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg hover:bg-green-100 transition-colors ${isActive('/')}`}>
            <Home size={20} />
            {!isCollapsed && <span>Home</span>}
          </div>
        </Link>

        {isAuthenticated && (
          <>
            <Link to="/dashboard">
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg hover:bg-green-100 transition-colors ${isActive('/dashboard')}`}>
                <LayoutDashboard size={20} />
                {!isCollapsed && <span>Dashboard</span>}
              </div>
            </Link>

            <Link to="/profile">
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg hover:bg-green-100 transition-colors ${isActive('/profile')}`}>
                <User size={20} />
                {!isCollapsed && <span>Profile</span>}
              </div>
            </Link>

          </>
        )}
      </nav>

      {isAuthenticated && (
        <div className="pt-4 border-t border-green-200">
          <Button
            variant="ghost"
            className={`w-full ${isCollapsed ? 'justify-center px-2' : 'justify-start'} text-red-600 hover:text-red-700 hover:bg-red-50`}
            onClick={logout}
          >
            <LogOut size={20} className={isCollapsed ? '' : 'mr-2'} />
            {!isCollapsed && 'Logout'}
          </Button>
        </div>
      )}

      {!isAuthenticated && (
        <div className="pt-4 border-t border-green-200">
          <Link to="/login">
            <Button variant="default" className="w-full">
              {isCollapsed ? 'In' : 'Login'}
            </Button>
          </Link>
          {!isCollapsed && (
            <Link to="/signup">
              <Button variant="outline" className="w-full mt-6">
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

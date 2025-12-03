import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      <Sidebar />
    </div>
  );
};

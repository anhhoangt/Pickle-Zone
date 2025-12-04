import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X, ShoppingCart, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { ProductFormModal } from './ProductFormModal';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSellItem = () => {
        setIsSellModalOpen(true);
    };

    const handleProductCreated = () => {
        // Ideally we would refresh the product list here
        // For now, we can just reload the page or let the user navigate
        window.location.reload();
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isCollapsed={isCollapsed} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="bg-white border-b border-green-200 p-4 flex justify-between items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="hover:bg-green-50"
                    >
                        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
                    </Button>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated && (
                            <Button onClick={handleSellItem} className="gap-2">
                                <Plus size={16} />
                                Sell Item
                            </Button>
                        )}

                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>

                        {isAuthenticated && user && (
                            <div className="flex items-center">
                                <span className="text-sm font-medium mr-4">
                                    {user.firstName} {user.lastName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-gray-50">
                    {children}
                </main>
            </div>

            <ProductFormModal
                isOpen={isSellModalOpen}
                onClose={() => setIsSellModalOpen(false)}
                onSuccess={handleProductCreated}
            />
        </div>
    );
};

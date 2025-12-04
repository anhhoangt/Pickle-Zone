import { useEffect, useState, useMemo } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { ProductFormModal } from '../components/ProductFormModal';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Pencil, Trash2, Package, DollarSign, Plus, ChevronLeft, ChevronRight, Copy, TrendingUp, AlertTriangle, Archive, Search } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: 'NEW' | 'USED' | 'GOOD';
    stockQuantity: number;
    images: { url: string }[];
    createdAt: string;
    updatedAt: string;
}

interface Order {
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    buyer: {
        firstName: string;
        lastName: string;
        email: string;
    };
    orderItems: {
        id: string;
        quantity: number;
        priceAtPurchase: number;
        product: {
            title: string;
        };
    }[];
}

export const MyListingsPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeTab, setActiveTab] = useState<'listings' | 'orders'>('listings');
    const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});

    // Search & Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterCondition, setFilterCondition] = useState('all');
    const [filterStock, setFilterStock] = useState('all');

    // Sorting state
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchMyProducts();
        fetchMyOrders();
    }, []);

    const fetchMyProducts = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/products');
            const allProducts = response.data;

            // Filter products by current user
            const myProducts = allProducts.filter((p: any) => p.seller.id === user?.id);
            setProducts(myProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMyOrders = async () => {
        try {
            // TODO: Implement backend endpoint to get orders for seller's products
            setOrders([]);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    // Calculate stats
    const stats = useMemo(() => {
        const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);
        const lowStockItems = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 5).length;
        const outOfStockItems = products.filter(p => p.stockQuantity === 0).length;
        const activeItems = products.filter(p => p.stockQuantity > 0).length;

        return {
            totalListings: products.length,
            totalValue,
            lowStockItems,
            outOfStockItems,
            activeItems,
        };
    }, [products]);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(
                p =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (filterCategory !== 'all') {
            filtered = filtered.filter(p => p.category === filterCategory);
        }

        // Apply condition filter
        if (filterCondition !== 'all') {
            filtered = filtered.filter(p => p.condition === filterCondition);
        }

        // Apply stock filter
        if (filterStock === 'in-stock') {
            filtered = filtered.filter(p => p.stockQuantity > 5);
        } else if (filterStock === 'low-stock') {
            filtered = filtered.filter(p => p.stockQuantity > 0 && p.stockQuantity <= 5);
        } else if (filterStock === 'out-of-stock') {
            filtered = filtered.filter(p => p.stockQuantity === 0);
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'stock-low':
                filtered.sort((a, b) => a.stockQuantity - b.stockQuantity);
                break;
            case 'updated':
                filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
                break;
        }

        return filtered;
    }, [products, searchQuery, filterCategory, filterCondition, filterStock, sortBy]);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (productId: string) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            try {
                await api.delete(`/products/${productId}`);
                fetchMyProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    const handleDuplicate = async (product: Product) => {
        try {
            const payload = {
                title: `${product.title} (Copy)`,
                description: product.description,
                price: product.price,
                category: product.category,
                condition: product.condition,
                stockQuantity: product.stockQuantity,
                images: product.images.map(img => img.url),
                sellerId: user?.id,
            };

            await api.post('/products', payload);
            fetchMyProducts();
            alert('Product duplicated successfully!');
        } catch (error) {
            console.error('Failed to duplicate product:', error);
            alert('Failed to duplicate product. Please try again.');
        }
    };

    const handleProductUpdated = () => {
        fetchMyProducts();
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleProductCreated = () => {
        fetchMyProducts();
        setIsCreateModalOpen(false);
    };

    const getCurrentImageIndex = (productId: string) => {
        return imageIndices[productId] || 0;
    };

    const handleNextImage = (e: React.MouseEvent, productId: string, totalImages: number) => {
        e.stopPropagation();
        setImageIndices((prev) => ({
            ...prev,
            [productId]: ((prev[productId] || 0) + 1) % totalImages,
        }));
    };

    const handlePrevImage = (e: React.MouseEvent, productId: string, totalImages: number) => {
        e.stopPropagation();
        setImageIndices((prev) => ({
            ...prev,
            [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages,
        }));
    };

    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return { label: 'Out of Stock', variant: 'destructive' as const, icon: Archive };
        if (quantity <= 5) return { label: 'Low Stock', variant: 'warning' as const, icon: AlertTriangle };
        return { label: 'In Stock', variant: 'default' as const, icon: Package };
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            PAID: 'bg-blue-100 text-blue-800',
            SHIPPED: 'bg-purple-100 text-purple-800',
            DELIVERED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    My Listings & Orders
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your product listings and track orders
                </p>
            </div>

            {/* Quick Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Listings
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalListings}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.activeItems} active
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Value
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Inventory worth
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Low Stock
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {stats.lowStockItems}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Items need restocking
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Out of Stock
                        </CardTitle>
                        <Archive className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.outOfStockItems}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Items unavailable
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('listings')}
                    className={`pb-3 px-4 font-medium transition-colors ${activeTab === 'listings'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                >
                    <Package className="inline-block h-4 w-4 mr-2" />
                    My Listings ({products.length})
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-3 px-4 font-medium transition-colors ${activeTab === 'orders'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                >
                    <DollarSign className="inline-block h-4 w-4 mr-2" />
                    Orders ({orders.length})
                </button>
            </div>

            {/* Listings Tab */}
            {activeTab === 'listings' && (
                <>
                    {/* Search and Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search your listings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Category Filter */}
                            <Select value={filterCategory} onValueChange={setFilterCategory}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Paddles">Paddles</SelectItem>
                                    <SelectItem value="Balls">Balls</SelectItem>
                                    <SelectItem value="Bags">Bags</SelectItem>
                                    <SelectItem value="Apparel">Apparel</SelectItem>
                                    <SelectItem value="Shoes">Shoes</SelectItem>
                                    <SelectItem value="Accessories">Accessories</SelectItem>
                                    <SelectItem value="Court Equipment">Court Equipment</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Condition Filter */}
                            <Select value={filterCondition} onValueChange={setFilterCondition}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="All Conditions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Conditions</SelectItem>
                                    <SelectItem value="NEW">New</SelectItem>
                                    <SelectItem value="USED">Used</SelectItem>
                                    <SelectItem value="GOOD">Good</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Stock Filter */}
                            <Select value={filterStock} onValueChange={setFilterStock}>
                                <SelectTrigger className="w-full md:w-[150px]">
                                    <SelectValue placeholder="All Stock" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Stock</SelectItem>
                                    <SelectItem value="in-stock">In Stock</SelectItem>
                                    <SelectItem value="low-stock">Low Stock</SelectItem>
                                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort By */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="updated">Recently Updated</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="stock-low">Stock: Low to High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {filteredAndSortedProducts.length} of {products.length} listings
                            </p>
                        </div>
                        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                            <Plus size={16} />
                            Sell Item
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">Loading...</div>
                    ) : filteredAndSortedProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                {searchQuery || filterCategory !== 'all' || filterCondition !== 'all' || filterStock !== 'all'
                                    ? 'No listings match your filters'
                                    : 'No listings yet'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                {searchQuery || filterCategory !== 'all' || filterCondition !== 'all' || filterStock !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'Start selling by creating your first listing'}
                            </p>
                            {!searchQuery && filterCategory === 'all' && filterCondition === 'all' && filterStock === 'all' && (
                                <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                                    <Plus size={16} />
                                    Create Your First Listing
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredAndSortedProducts.map((product) => {
                                const stockStatus = getStockStatus(product.stockQuantity);
                                const StockIcon = stockStatus.icon;

                                return (
                                    <Card key={product.id} className="overflow-hidden">
                                        <CardHeader className="p-0">
                                            <div className="aspect-video relative bg-muted group">
                                                {product.images.length > 0 ? (
                                                    <>
                                                        <img
                                                            src={product.images[getCurrentImageIndex(product.id)].url}
                                                            alt={product.title}
                                                            className="object-cover w-full h-full"
                                                        />
                                                        {product.images.length > 1 && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                                                    onClick={(e) => handlePrevImage(e, product.id, product.images.length)}
                                                                >
                                                                    <ChevronLeft className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                                                    onClick={(e) => handleNextImage(e, product.id, product.images.length)}
                                                                >
                                                                    <ChevronRight className="h-3 w-3" />
                                                                </Button>
                                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                                                    {product.images.map((_, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className={`h-1 rounded-full transition-all ${index === getCurrentImageIndex(product.id)
                                                                                    ? 'w-3 bg-white'
                                                                                    : 'w-1 bg-white/50'
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                                <Badge
                                                    className="absolute top-1 right-1 text-xs px-1.5 py-0.5"
                                                    variant={product.condition === 'NEW' ? 'default' : 'secondary'}
                                                >
                                                    {product.condition}
                                                </Badge>
                                                {/* Stock Status Badge */}
                                                <Badge
                                                    className="absolute top-1 left-1 text-xs px-1.5 py-0.5 gap-1"
                                                    variant={stockStatus.variant}
                                                >
                                                    <StockIcon className="h-3 w-3" />
                                                    {stockStatus.label}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-3">
                                            <CardTitle className="text-sm mb-1 line-clamp-1">{product.title}</CardTitle>
                                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                                {product.description}
                                            </p>
                                            <div className="flex justify-between items-center text-xs mb-1">
                                                <span className="font-bold text-base text-primary">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    Stock: {product.stockQuantity}
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {product.category}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-3 pt-0 flex gap-1 flex-wrap">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 h-8 text-xs min-w-[60px]"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Pencil className="h-3 w-3 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs px-2"
                                                onClick={() => handleDuplicate(product)}
                                                title="Duplicate listing"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="h-8 text-xs px-2"
                                                onClick={() => handleDelete(product.id)}
                                                title="Delete listing"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <DollarSign className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                No orders yet
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Orders for your products will appear here
                            </p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <Card key={order.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {new Date(order.createdAt).toLocaleDateString()} at{' '}
                                                {new Date(order.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium mb-2">Customer</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {order.buyer.firstName} {order.buyer.lastName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">{order.buyer.email}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Items</h4>
                                            {order.orderItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between text-sm py-1 border-b last:border-0"
                                                >
                                                    <span>
                                                        {item.product.title} x {item.quantity}
                                                    </span>
                                                    <span className="font-medium">
                                                        ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t font-bold">
                                            <span>Total</span>
                                            <span className="text-lg text-primary">
                                                ${order.totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {/* Edit Product Modal */}
            {selectedProduct && (
                <ProductFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    product={{
                        ...selectedProduct,
                        images: selectedProduct.images.map((img) => img.url),
                    }}
                    onSuccess={handleProductUpdated}
                />
            )}

            {/* Create Product Modal */}
            <ProductFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleProductCreated}
            />
        </div>
    );
};

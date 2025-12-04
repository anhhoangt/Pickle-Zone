import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters, type FilterState } from '../components/ProductFilters';
import { api } from '../lib/api';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'NEW' | 'USED' | 'GOOD';
  images: string[];
  seller: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.condition && filters.condition !== 'all') params.append('condition', filters.condition);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const queryString = params.toString();
      const url = queryString ? `/products?${queryString}` : '/products';

      const response = await api.get(url);
      const mappedProducts = response.data.map((p: any) => ({
        ...p,
        images: p.images.map((img: any) => img.url),
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductUpdate = () => {
    fetchProducts();
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
    });
    // Fetch products with reset filters
    setTimeout(() => {
      fetchProducts();
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h1>
        <p className="text-gray-600">Discover the best gear from our community.</p>
      </div>

      <ProductFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found. Try adjusting your search filters.
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onUpdate={handleProductUpdate}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

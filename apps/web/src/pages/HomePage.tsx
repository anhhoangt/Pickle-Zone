import { ProductCard } from '../components/ProductCard';

// Mock data for now
const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Pro Pickleball Paddle',
    price: 89.99,
    category: 'Paddles',
    condition: 'NEW' as const,
    images: [
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1626224583764-8478abf7263f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  },
  {
    id: '2',
    title: 'Outdoor Pickleballs (Pack of 3)',
    price: 12.99,
    category: 'Balls',
    condition: 'NEW' as const,
    images: [
      'https://images.unsplash.com/photo-1626224583764-8478abf7263f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  },
  {
    id: '3',
    title: 'Used Tournament Net',
    price: 45.00,
    category: 'Accessories',
    condition: 'USED' as const,
    images: [
      'https://images.unsplash.com/photo-1626224583764-8478abf7263f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  },
  {
    id: '4',
    title: 'Performance Court Shoes',
    price: 75.50,
    category: 'Footwear',
    condition: 'GOOD' as const,
    images: [
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  }
];

export const HomePage = () => {
  console.log('HomePage rendering, products:', MOCK_PRODUCTS.length);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h1>
        <p className="text-gray-600">Discover the best gear from our community.</p>
      </div>

      {MOCK_PRODUCTS.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

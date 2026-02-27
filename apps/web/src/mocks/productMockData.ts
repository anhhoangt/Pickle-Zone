/**
 * Mock product data for development and testing
 * Products are associated with mock sellers from userMockData.ts
 * TODO: Replace with actual API endpoints when needed
 */

export interface MockProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'NEW' | 'USED' | 'GOOD';
  stockQuantity: number;
  images: string[];
  sellerId: string;
  seller: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Mock Products (linked to sellers: John #1, Mike #3, David #5, Chris #7)
export const mockProducts: MockProduct[] = [
  // John Doe's Products (Seller ID: 1)
  {
    id: 'prod-1',
    title: 'Professional Carbon Fiber Paddle Pro Elite',
    description: 'Tournament-grade carbon fiber paddle with textured surface for maximum spin. Perfect weight balance for power and control. Used by professional players.',
    price: 149.99,
    category: 'Paddles',
    condition: 'NEW',
    stockQuantity: 15,
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400',
    ],
    sellerId: '1',
    seller: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    },
    createdAt: '2024-10-15T10:00:00Z',
    updatedAt: '2024-12-01T14:30:00Z',
  },
  {
    id: 'prod-2',
    title: 'Indoor Pickleball Balls (6-Pack)',
    description: 'Official tournament balls designed for indoor play. Precision-drilled 26 holes for consistent flight. USAPA approved.',
    price: 24.99,
    category: 'Balls',
    condition: 'NEW',
    stockQuantity: 50,
    images: [
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400',
    ],
    sellerId: '1',
    seller: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    },
    createdAt: '2024-10-20T11:15:00Z',
    updatedAt: '2024-11-28T09:20:00Z',
  },

  // Mike Johnson's Products (Seller ID: 3)
  {
    id: 'prod-3',
    title: 'Premium Pickleball Court Shoes - Men\'s',
    description: 'Lightweight court shoes with excellent grip and ankle support. Breathable mesh upper with reinforced toe cap. Perfect for quick lateral movements.',
    price: 89.99,
    category: 'Shoes',
    condition: 'NEW',
    stockQuantity: 25,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
    ],
    sellerId: '3',
    seller: {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
    },
    createdAt: '2024-09-10T13:45:00Z',
    updatedAt: '2024-11-25T16:10:00Z',
  },
  {
    id: 'prod-4',
    title: 'Deluxe Paddle Bag with Wheels',
    description: 'Spacious bag with separate compartments for paddles, balls, and accessories. Durable wheels for easy transport. Holds up to 4 paddles.',
    price: 79.99,
    category: 'Bags',
    condition: 'GOOD',
    stockQuantity: 12,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    ],
    sellerId: '3',
    seller: {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
    },
    createdAt: '2024-11-01T08:30:00Z',
    updatedAt: '2024-11-30T10:45:00Z',
  },

  // David Brown's Products (Seller ID: 5)
  {
    id: 'prod-5',
    title: 'Outdoor Pickleball Ball Set (12 Pack)',
    description: 'Durable outdoor balls built to withstand wind and rough surfaces. Bright colors for high visibility. Perfect for recreational play.',
    price: 29.99,
    category: 'Balls',
    condition: 'NEW',
    stockQuantity: 40,
    images: [
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400',
    ],
    sellerId: '5',
    seller: {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
    },
    createdAt: '2024-11-10T14:20:00Z',
    updatedAt: '2024-12-02T11:30:00Z',
  },
  {
    id: 'prod-6',
    title: 'Performance Moisture-Wicking Jersey',
    description: 'Ultra-light athletic jersey with moisture-wicking technology. UPF 50+ sun protection. Available in multiple colors.',
    price: 34.99,
    category: 'Apparel',
    condition: 'NEW',
    stockQuantity: 30,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400',
    ],
    sellerId: '5',
    seller: {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
    },
    createdAt: '2024-10-25T09:00:00Z',
    updatedAt: '2024-11-29T15:20:00Z',
  },
  {
    id: 'prod-7',
    title: 'Portable Pickleball Net System',
    description: 'Easy-to-setup portable net system. Regulation height and width. Includes carrying case. Perfect for practice or casual games.',
    price: 159.99,
    category: 'Court Equipment',
    condition: 'USED',
    stockQuantity: 5,
    images: [
      'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400',
    ],
    sellerId: '5',
    seller: {
      id: '5',
      firstName: 'David',
      lastName: 'Brown',
    },
    createdAt: '2024-09-15T12:00:00Z',
    updatedAt: '2024-11-20T13:40:00Z',
  },

  // Chris Wilson's Products (Seller ID: 7)
  {
    id: 'prod-8',
    title: 'Beginner Paddle Bundle - 2 Paddles',
    description: 'Perfect starter set for new players. Includes two composite paddles with comfortable grips. Great value for families or beginners.',
    price: 59.99,
    category: 'Paddles',
    condition: 'NEW',
    stockQuantity: 20,
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    ],
    sellerId: '7',
    seller: {
      id: '7',
      firstName: 'Chris',
      lastName: 'Wilson',
    },
    createdAt: '2024-11-05T10:30:00Z',
    updatedAt: '2024-12-03T09:15:00Z',
  },
  {
    id: 'prod-9',
    title: 'Protective Eyewear - Sports Sunglasses',
    description: 'UV protection sports sunglasses with polarized lenses. Lightweight and comfortable for all-day wear. Anti-slip nose pads.',
    price: 39.99,
    category: 'Accessories',
    condition: 'NEW',
    stockQuantity: 18,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
    ],
    sellerId: '7',
    seller: {
      id: '7',
      firstName: 'Chris',
      lastName: 'Wilson',
    },
    createdAt: '2024-10-30T11:45:00Z',
    updatedAt: '2024-11-27T14:50:00Z',
  },
  {
    id: 'prod-10',
    title: 'Training Cone Set (12 Pieces)',
    description: 'Bright orange training cones for drills and court marking. Stackable for easy storage. Durable plastic construction.',
    price: 19.99,
    category: 'Accessories',
    condition: 'NEW',
    stockQuantity: 35,
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    ],
    sellerId: '7',
    seller: {
      id: '7',
      firstName: 'Chris',
      lastName: 'Wilson',
    },
    createdAt: '2024-11-12T08:20:00Z',
    updatedAt: '2024-12-01T10:05:00Z',
  },

  // Additional products for variety
  {
    id: 'prod-11',
    title: 'Graphite Paddle - Advanced Series',
    description: 'High-performance graphite paddle for advanced players. Excellent power and control. Honeycomb core for reduced vibration.',
    price: 129.99,
    category: 'Paddles',
    condition: 'NEW',
    stockQuantity: 10,
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400',
    ],
    sellerId: '1',
    seller: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    },
    createdAt: '2024-11-18T13:30:00Z',
    updatedAt: '2024-12-02T15:25:00Z',
  },
  {
    id: 'prod-12',
    title: 'Court Line Marking Tape',
    description: 'Temporary court line tape for creating practice courts. Easy to apply and remove. Weather-resistant.',
    price: 24.99,
    category: 'Court Equipment',
    condition: 'NEW',
    stockQuantity: 22,
    images: [
      'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400',
    ],
    sellerId: '3',
    seller: {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
    },
    createdAt: '2024-11-08T09:40:00Z',
    updatedAt: '2024-11-26T12:15:00Z',
  },
];

// Helper functions
export const getMockProductById = (id: string): MockProduct | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const getMockProductsBySeller = (sellerId: string): MockProduct[] => {
  return mockProducts.filter((product) => product.sellerId === sellerId);
};

export const getMockProductsByCategory = (category: string): MockProduct[] => {
  return mockProducts.filter((product) => product.category === category);
};

export const getMockProductsByCondition = (condition: 'NEW' | 'USED' | 'GOOD'): MockProduct[] => {
  return mockProducts.filter((product) => product.condition === condition);
};

export const getMockProductsInStock = (): MockProduct[] => {
  return mockProducts.filter((product) => product.stockQuantity > 0);
};

export const getMockProductsOutOfStock = (): MockProduct[] => {
  return mockProducts.filter((product) => product.stockQuantity === 0);
};

// Product statistics
export const mockProductStats = {
  totalProducts: mockProducts.length,
  totalInStock: getMockProductsInStock().length,
  totalOutOfStock: getMockProductsOutOfStock().length,
  averagePrice: mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length,
  totalValue: mockProducts.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0),
  categoryCounts: {
    Paddles: getMockProductsByCategory('Paddles').length,
    Balls: getMockProductsByCategory('Balls').length,
    Shoes: getMockProductsByCategory('Shoes').length,
    Bags: getMockProductsByCategory('Bags').length,
    Apparel: getMockProductsByCategory('Apparel').length,
    Accessories: getMockProductsByCategory('Accessories').length,
    'Court Equipment': getMockProductsByCategory('Court Equipment').length,
  },
};

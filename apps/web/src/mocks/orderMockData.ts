/**
 * Mock order data for development and testing
 * Orders are associated with mock users (buyers and sellers) and mock products
 * TODO: Replace with actual API endpoints when needed
 */

export interface MockOrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  productId: string;
  product: {
    id: string;
    title: string;
    price: number;
    sellerId: string;
  };
}

export interface MockOrder {
  id: string;
  buyerId: string;
  buyer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  orderItems: MockOrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  createdAt: string;
  updatedAt: string;
}

// Mock Orders (Buyers: Jane #2, Sarah #4, Emily #6)
export const mockOrders: MockOrder[] = [
  // Jane Smith's Orders (Buyer ID: 2)
  {
    id: 'order-1',
    buyerId: '2',
    buyer: {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    orderItems: [
      {
        id: 'item-1',
        quantity: 1,
        priceAtPurchase: 149.99,
        productId: 'prod-1',
        product: {
          id: 'prod-1',
          title: 'Professional Carbon Fiber Paddle Pro Elite',
          price: 149.99,
          sellerId: '1',
        },
      },
      {
        id: 'item-2',
        quantity: 2,
        priceAtPurchase: 24.99,
        productId: 'prod-2',
        product: {
          id: 'prod-2',
          title: 'Indoor Pickleball Balls (6-Pack)',
          price: 24.99,
          sellerId: '1',
        },
      },
    ],
    totalAmount: 199.97,
    status: 'DELIVERED',
    shippingAddress: '456 Oak Avenue',
    shippingCity: 'Los Angeles',
    shippingState: 'CA',
    shippingZipCode: '90001',
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2024-11-22T14:45:00Z',
  },
  {
    id: 'order-2',
    buyerId: '2',
    buyer: {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    orderItems: [
      {
        id: 'item-3',
        quantity: 1,
        priceAtPurchase: 89.99,
        productId: 'prod-3',
        product: {
          id: 'prod-3',
          title: 'Premium Pickleball Court Shoes - Men\'s',
          price: 89.99,
          sellerId: '3',
        },
      },
    ],
    totalAmount: 89.99,
    status: 'SHIPPED',
    shippingAddress: '456 Oak Avenue',
    shippingCity: 'Los Angeles',
    shippingState: 'CA',
    shippingZipCode: '90001',
    createdAt: '2024-11-28T09:15:00Z',
    updatedAt: '2024-12-02T11:30:00Z',
  },

  // Sarah Williams's Orders (Buyer ID: 4)
  {
    id: 'order-3',
    buyerId: '4',
    buyer: {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
    },
    orderItems: [
      {
        id: 'item-4',
        quantity: 1,
        priceAtPurchase: 79.99,
        productId: 'prod-4',
        product: {
          id: 'prod-4',
          title: 'Deluxe Paddle Bag with Wheels',
          price: 79.99,
          sellerId: '3',
        },
      },
      {
        id: 'item-5',
        quantity: 1,
        priceAtPurchase: 34.99,
        productId: 'prod-6',
        product: {
          id: 'prod-6',
          title: 'Performance Moisture-Wicking Jersey',
          price: 34.99,
          sellerId: '5',
        },
      },
    ],
    totalAmount: 114.98,
    status: 'PAID',
    shippingAddress: '321 Elm Street',
    shippingCity: 'Seattle',
    shippingState: 'WA',
    shippingZipCode: '98101',
    createdAt: '2024-11-25T13:20:00Z',
    updatedAt: '2024-11-26T10:45:00Z',
  },
  {
    id: 'order-4',
    buyerId: '4',
    buyer: {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@example.com',
    },
    orderItems: [
      {
        id: 'item-6',
        quantity: 1,
        priceAtPurchase: 159.99,
        productId: 'prod-7',
        product: {
          id: 'prod-7',
          title: 'Portable Pickleball Net System',
          price: 159.99,
          sellerId: '5',
        },
      },
    ],
    totalAmount: 159.99,
    status: 'DELIVERED',
    shippingAddress: '321 Elm Street',
    shippingCity: 'Seattle',
    shippingState: 'WA',
    shippingZipCode: '98101',
    createdAt: '2024-10-10T08:45:00Z',
    updatedAt: '2024-10-18T16:20:00Z',
  },

  // Emily Davis's Orders (Buyer ID: 6)
  {
    id: 'order-5',
    buyerId: '6',
    buyer: {
      id: '6',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
    },
    orderItems: [
      {
        id: 'item-7',
        quantity: 1,
        priceAtPurchase: 59.99,
        productId: 'prod-8',
        product: {
          id: 'prod-8',
          title: 'Beginner Paddle Bundle - 2 Paddles',
          price: 59.99,
          sellerId: '7',
        },
      },
      {
        id: 'item-8',
        quantity: 2,
        priceAtPurchase: 29.99,
        productId: 'prod-5',
        product: {
          id: 'prod-5',
          title: 'Outdoor Pickleball Ball Set (12 Pack)',
          price: 29.99,
          sellerId: '5',
        },
      },
    ],
    totalAmount: 119.97,
    status: 'DELIVERED',
    shippingAddress: '987 Cedar Lane',
    shippingCity: 'Denver',
    shippingState: 'CO',
    shippingZipCode: '80201',
    createdAt: '2024-11-20T11:00:00Z',
    updatedAt: '2024-11-27T15:30:00Z',
  },
  {
    id: 'order-6',
    buyerId: '6',
    buyer: {
      id: '6',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
    },
    orderItems: [
      {
        id: 'item-9',
        quantity: 1,
        priceAtPurchase: 39.99,
        productId: 'prod-9',
        product: {
          id: 'prod-9',
          title: 'Protective Eyewear - Sports Sunglasses',
          price: 39.99,
          sellerId: '7',
        },
      },
      {
        id: 'item-10',
        quantity: 1,
        priceAtPurchase: 19.99,
        productId: 'prod-10',
        product: {
          id: 'prod-10',
          title: 'Training Cone Set (12 Pieces)',
          price: 19.99,
          sellerId: '7',
        },
      },
    ],
    totalAmount: 59.98,
    status: 'PAID',
    shippingAddress: '987 Cedar Lane',
    shippingCity: 'Denver',
    shippingState: 'CO',
    shippingZipCode: '80201',
    createdAt: '2024-12-01T14:25:00Z',
    updatedAt: '2024-12-01T14:25:00Z',
  },
  {
    id: 'order-7',
    buyerId: '6',
    buyer: {
      id: '6',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
    },
    orderItems: [
      {
        id: 'item-11',
        quantity: 1,
        priceAtPurchase: 129.99,
        productId: 'prod-11',
        product: {
          id: 'prod-11',
          title: 'Graphite Paddle - Advanced Series',
          price: 129.99,
          sellerId: '1',
        },
      },
    ],
    totalAmount: 129.99,
    status: 'PENDING',
    shippingAddress: '987 Cedar Lane',
    shippingCity: 'Denver',
    shippingState: 'CO',
    shippingZipCode: '80201',
    createdAt: '2024-12-03T10:15:00Z',
    updatedAt: '2024-12-03T10:15:00Z',
  },

  // Additional orders for variety
  {
    id: 'order-8',
    buyerId: '2',
    buyer: {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    orderItems: [
      {
        id: 'item-12',
        quantity: 1,
        priceAtPurchase: 24.99,
        productId: 'prod-12',
        product: {
          id: 'prod-12',
          title: 'Court Line Marking Tape',
          price: 24.99,
          sellerId: '3',
        },
      },
    ],
    totalAmount: 24.99,
    status: 'CANCELLED',
    shippingAddress: '456 Oak Avenue',
    shippingCity: 'Los Angeles',
    shippingState: 'CA',
    shippingZipCode: '90001',
    createdAt: '2024-11-10T09:00:00Z',
    updatedAt: '2024-11-12T11:30:00Z',
  },
];

// Helper functions
export const getMockOrderById = (id: string): MockOrder | undefined => {
  return mockOrders.find((order) => order.id === id);
};

export const getMockOrdersByBuyer = (buyerId: string): MockOrder[] => {
  return mockOrders.filter((order) => order.buyerId === buyerId);
};

export const getMockOrdersBySeller = (sellerId: string): MockOrder[] => {
  return mockOrders.filter((order) =>
    order.orderItems.some((item) => item.product.sellerId === sellerId)
  );
};

export const getMockOrdersByStatus = (status: string): MockOrder[] => {
  return mockOrders.filter((order) => order.status === status);
};

export const getMockOrdersByProduct = (productId: string): MockOrder[] => {
  return mockOrders.filter((order) =>
    order.orderItems.some((item) => item.productId === productId)
  );
};

// Get sales (order items) for a specific seller
export const getMockSalesBySeller = (sellerId: string): MockOrderItem[] => {
  const sales: MockOrderItem[] = [];
  mockOrders.forEach((order) => {
    order.orderItems.forEach((item) => {
      if (item.product.sellerId === sellerId) {
        sales.push(item);
      }
    });
  });
  return sales;
};

// Order statistics
export const mockOrderStats = {
  totalOrders: mockOrders.length,
  totalRevenue: mockOrders.reduce((sum, order) => sum + order.totalAmount, 0),
  averageOrderValue: mockOrders.reduce((sum, order) => sum + order.totalAmount, 0) / mockOrders.length,
  statusCounts: {
    PENDING: getMockOrdersByStatus('PENDING').length,
    PAID: getMockOrdersByStatus('PAID').length,
    SHIPPED: getMockOrdersByStatus('SHIPPED').length,
    DELIVERED: getMockOrdersByStatus('DELIVERED').length,
    CANCELLED: getMockOrdersByStatus('CANCELLED').length,
  },
  totalItemsSold: mockOrders.reduce((sum, order) => {
    return sum + order.orderItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0),
};

// Get revenue by seller
export const getMockRevenueByS = (sellerId: string): number => {
  let revenue = 0;
  mockOrders.forEach((order) => {
    order.orderItems.forEach((item) => {
      if (item.product.sellerId === sellerId && order.status !== 'CANCELLED') {
        revenue += item.priceAtPurchase * item.quantity;
      }
    });
  });
  return revenue;
};

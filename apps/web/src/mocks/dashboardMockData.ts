/**
 * Mock data for Dashboard analytics
 * TODO: Replace with actual API endpoints when backend analytics are ready
 */

export interface PerformanceMetricsData {
  averageOrderValue: number;
  previousAverageOrderValue: number;
  conversionRate: number;
  previousConversionRate: number;
  totalCustomers: number;
  previousTotalCustomers: number;
  monthlyRevenue: number;
  previousMonthlyRevenue: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface SalesAnalyticsData {
  daily: SalesData[];
  weekly: SalesData[];
  monthly: SalesData[];
}

export interface OrderStatusData {
  status: string;
  count: number;
  percentage: number;
}

export interface TopProduct {
  id: string;
  title: string;
  category: string;
  totalSold: number;
  totalRevenue: number;
  trend: number;
  imageUrl?: string;
}

// Mock Performance Metrics
export const mockPerformanceMetrics: PerformanceMetricsData = {
  averageOrderValue: 75.50,
  previousAverageOrderValue: 68.20,
  conversionRate: 12.5,
  previousConversionRate: 10.8,
  totalCustomers: 245,
  previousTotalCustomers: 198,
  monthlyRevenue: 15420.00,
  previousMonthlyRevenue: 12350.00,
};

// Generate Mock Sales Analytics Data
export const generateMockSalesAnalytics = (): SalesAnalyticsData => {
  const daily = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString(),
      revenue: Math.random() * 500 + 200,
      orders: Math.floor(Math.random() * 10) + 1,
    };
  });

  const weekly = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - ((3 - i) * 7));
    return {
      date: date.toISOString(),
      revenue: Math.random() * 2000 + 1000,
      orders: Math.floor(Math.random() * 30) + 10,
    };
  });

  const monthly = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    return {
      date: date.toISOString(),
      revenue: Math.random() * 5000 + 2000,
      orders: Math.floor(Math.random() * 80) + 20,
    };
  });

  return { daily, weekly, monthly };
};

// Mock Order Status Breakdown
export const mockOrderStatusData: OrderStatusData[] = [
  { status: 'PENDING', count: 12, percentage: 15 },
  { status: 'PAID', count: 25, percentage: 31.25 },
  { status: 'SHIPPED', count: 20, percentage: 25 },
  { status: 'DELIVERED', count: 18, percentage: 22.5 },
  { status: 'CANCELLED', count: 5, percentage: 6.25 },
];

// Mock Top Selling Products
export const mockTopProducts: TopProduct[] = [
  {
    id: '1',
    title: 'Professional Pickleball Paddle Pro',
    category: 'Paddles',
    totalSold: 45,
    totalRevenue: 2250.00,
    trend: 15.5,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Tournament Grade Balls (6-pack)',
    category: 'Balls',
    totalSold: 120,
    totalRevenue: 1800.00,
    trend: 22.3,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Premium Court Shoes',
    category: 'Shoes',
    totalSold: 32,
    totalRevenue: 1600.00,
    trend: -5.2,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Performance Sports Bag',
    category: 'Bags',
    totalSold: 28,
    totalRevenue: 1400.00,
    trend: 8.7,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    title: 'Training Set Bundle',
    category: 'Accessories',
    totalSold: 25,
    totalRevenue: 1250.00,
    trend: 12.1,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

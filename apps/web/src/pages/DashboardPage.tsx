import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { RecentSales } from '../components/dashboard/RecentSales';
import { PerformanceMetrics } from '../components/dashboard/PerformanceMetrics';
import { SalesAnalyticsChart } from '../components/dashboard/SalesAnalyticsChart';
import { OrderStatusBreakdown } from '../components/dashboard/OrderStatusBreakdown';
import { TopSellingProducts } from '../components/dashboard/TopSellingProducts';
import { DollarSign, Package, Tag } from 'lucide-react';
import {
  mockPerformanceMetrics,
  generateMockSalesAnalytics,
  mockOrderStatusData,
  mockTopProducts,
  type PerformanceMetricsData,
  type SalesAnalyticsData,
  type OrderStatusData,
  type TopProduct,
} from '../mocks/dashboardMockData';

interface DashboardStats {
  totalSpent: number;
  activeOrders: number;
  totalEarnings: number;
  activeListings: number;
  itemsSold: number;
}

interface DashboardActivity {
  recentOrders: any[];
  recentSales: any[];
}

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<DashboardActivity | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricsData | null>(null);
  const [salesAnalytics, setSalesAnalytics] = useState<SalesAnalyticsData | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatusData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real data from existing endpoints
        const [statsRes, activityRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/activity'),
        ]);
        setStats(statsRes.data);
        setActivity(activityRes.data);

        // Load mock data for new analytics components
        // TODO: Replace with actual API calls when backend endpoints are ready
        setPerformanceMetrics(mockPerformanceMetrics);
        setSalesAnalytics(generateMockSalesAnalytics());
        setOrderStatus(mockOrderStatusData);
        setTopProducts(mockTopProducts);

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <span className="text-gray-500 dark:text-gray-400">Welcome back, {user?.firstName}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Spent"
          value={`$${stats?.totalSpent.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          description="Lifetime purchases"
        />
        <StatsCard
          title="Active Orders"
          value={stats?.activeOrders || 0}
          icon={Package}
          description="Orders in progress"
        />
        <StatsCard
          title="Total Earnings"
          value={`$${stats?.totalEarnings.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          description="Lifetime sales"
        />
        <StatsCard
          title="Active Listings"
          value={stats?.activeListings || 0}
          icon={Tag}
          description="Products for sale"
        />
      </div>

      {/* Performance Metrics */}
      {performanceMetrics && (
        <div>
          <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
          <PerformanceMetrics metrics={performanceMetrics} />
        </div>
      )}

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Analytics Chart - Takes 2 columns */}
        {salesAnalytics && (
          <SalesAnalyticsChart data={salesAnalytics} />
        )}

        {/* Order Status Breakdown - Takes 1 column */}
        <OrderStatusBreakdown data={orderStatus} />
      </div>

      {/* Top Selling Products & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <TopSellingProducts products={topProducts} />

        {/* Recent Activity */}
        <RecentOrders orders={activity?.recentOrders || []} />
        <RecentSales sales={activity?.recentSales || []} />
      </div>
    </div>
  );
};

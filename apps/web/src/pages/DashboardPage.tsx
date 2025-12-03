import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { RecentSales } from '../components/dashboard/RecentSales';
import { DollarSign, Package, Tag } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/activity')
        ]);
        setStats(statsRes.data);
        setActivity(activityRes.data);
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
        <span className="text-gray-500">Welcome back, {user?.firstName}</span>
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

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrders orders={activity?.recentOrders || []} />
        <RecentSales sales={activity?.recentSales || []} />
      </div>
    </div>
  );
};

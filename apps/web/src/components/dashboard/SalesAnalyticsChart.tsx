import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface SalesAnalyticsChartProps {
  data: {
    daily: SalesData[];
    weekly: SalesData[];
    monthly: SalesData[];
  };
}

export const SalesAnalyticsChart = ({ data }: SalesAnalyticsChartProps) => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const chartData = data[timeRange] || [];

  const formatCurrency = (value: number) => `$${value.toFixed(0)}`;

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (timeRange === 'daily') {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (timeRange === 'weekly') {
      return `Week ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  };

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            {formatDate(payload[0].payload.date)}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Orders: {payload[0].payload.orders}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Analytics</CardTitle>
            <div className="flex gap-4 mt-2">
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-bold text-foreground">{formatCurrency(totalRevenue)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Orders: <span className="font-bold text-foreground">{totalOrders}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Avg: <span className="font-bold text-foreground">{formatCurrency(averageOrderValue)}</span>
              </div>
            </div>
          </div>
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Last 7 Days</SelectItem>
              <SelectItem value="weekly">Last 4 Weeks</SelectItem>
              <SelectItem value="monthly">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

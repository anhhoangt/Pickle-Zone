import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: string | number;
  change: number; // percentage change
  changeLabel: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

interface PerformanceMetricsProps {
  metrics: {
    averageOrderValue: number;
    previousAverageOrderValue: number;
    conversionRate: number;
    previousConversionRate: number;
    totalCustomers: number;
    previousTotalCustomers: number;
    monthlyRevenue: number;
    previousMonthlyRevenue: number;
  };
}

export const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatCurrency = (value: number): string => {
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const performanceData: PerformanceMetric[] = [
    {
      label: 'Average Order Value',
      value: formatCurrency(metrics.averageOrderValue),
      change: calculateChange(metrics.averageOrderValue, metrics.previousAverageOrderValue),
      changeLabel: 'vs last period',
      icon: DollarSign,
      trend: metrics.averageOrderValue >= metrics.previousAverageOrderValue ? 'up' : 'down',
    },
    {
      label: 'Conversion Rate',
      value: formatPercentage(metrics.conversionRate),
      change: calculateChange(metrics.conversionRate, metrics.previousConversionRate),
      changeLabel: 'vs last period',
      icon: TrendingUp,
      trend: metrics.conversionRate >= metrics.previousConversionRate ? 'up' : 'down',
    },
    {
      label: 'Total Customers',
      value: metrics.totalCustomers,
      change: calculateChange(metrics.totalCustomers, metrics.previousTotalCustomers),
      changeLabel: 'vs last period',
      icon: Users,
      trend: metrics.totalCustomers >= metrics.previousTotalCustomers ? 'up' : 'down',
    },
    {
      label: 'Monthly Revenue',
      value: formatCurrency(metrics.monthlyRevenue),
      change: calculateChange(metrics.monthlyRevenue, metrics.previousMonthlyRevenue),
      changeLabel: 'vs last month',
      icon: ShoppingCart,
      trend: metrics.monthlyRevenue >= metrics.previousMonthlyRevenue ? 'up' : 'down',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {performanceData.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === 'up';
        const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <div
                  className={`flex items-center text-xs font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <ChangeIcon className="h-3 w-3 mr-1" />
                  {Math.abs(metric.change).toFixed(1)}%
                </div>
                <span className="text-xs text-muted-foreground">
                  {metric.changeLabel}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

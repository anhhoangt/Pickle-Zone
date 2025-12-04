import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface OrderStatus {
  status: string;
  count: number;
  percentage: number;
}

interface OrderStatusBreakdownProps {
  data: OrderStatus[];
}

const COLORS = {
  PENDING: '#f59e0b', // amber
  PAID: '#3b82f6', // blue
  SHIPPED: '#8b5cf6', // purple
  DELIVERED: '#10b981', // green
  CANCELLED: '#ef4444', // red
};

export const OrderStatusBreakdown = ({ data }: OrderStatusBreakdownProps) => {
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  const chartData = data.map((item) => ({
    name: item.status,
    value: item.count,
    percentage: item.percentage,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {data.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-bold">{data.value}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage: <span className="font-bold">{data.payload.percentage.toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.value}: <span className="font-medium text-foreground">{entry.payload.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Total Orders: <span className="font-bold text-foreground">{totalOrders}</span>
        </p>
      </CardHeader>
      <CardContent>
        {totalOrders === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No order data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={(entry: any) => `${entry.percentage.toFixed(0)}%`}
                labelLine={{ stroke: 'currentColor', strokeWidth: 1 }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name as keyof typeof COLORS] || '#6b7280'}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* Status Details */}
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[item.status as keyof typeof COLORS] || '#6b7280' }}
                />
                <span className="text-sm font-medium">{item.status}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{item.count} orders</span>
                <span className="text-sm font-medium">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

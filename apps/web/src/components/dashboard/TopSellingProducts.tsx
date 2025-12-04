import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, ArrowRight, Package } from 'lucide-react';

interface TopProduct {
  id: string;
  title: string;
  category: string;
  totalSold: number;
  totalRevenue: number;
  trend: number; // percentage change vs previous period
  imageUrl?: string;
}

interface TopSellingProductsProps {
  products: TopProduct[];
}

export const TopSellingProducts = ({ products }: TopSellingProductsProps) => {
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Selling Products</CardTitle>
          <Badge variant="outline" className="text-xs">
            Last 30 days
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            No sales data available
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product, index) => {
              const isPositiveTrend = product.trend >= 0;
              const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-lg transition-colors"
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>

                  {/* Product Image */}
                  {product.imageUrl ? (
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{product.title}</h4>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-foreground">
                      {formatCurrency(product.totalRevenue)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.totalSold} sold
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <TrendIcon
                      className={`h-4 w-4 ${
                        isPositiveTrend ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isPositiveTrend ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {Math.abs(product.trend).toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Link */}
        {products.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <button className="flex items-center gap-2 text-sm text-primary hover:underline w-full justify-center">
              View all products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

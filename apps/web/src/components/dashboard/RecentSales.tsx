import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SaleItem {
  id: string;
  product: {
    title: string;
    price: number;
  };
  quantity: number;
  priceAtPurchase: number;
  order: {
    id: string;
    createdAt: string;
    status: string;
    buyer: {
      firstName: string;
      lastName: string;
    };
  };
}

interface RecentSalesProps {
  sales: SaleItem[];
}

export const RecentSales = ({ sales }: RecentSalesProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent sales found.</p>
        ) : (
          <div className="space-y-4">
            {sales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {sale.product.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sold to {sale.order.buyer.firstName} {sale.order.buyer.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">
                    +${(sale.quantity * sale.priceAtPurchase).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(sale.order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const MarketplacePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Featured Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

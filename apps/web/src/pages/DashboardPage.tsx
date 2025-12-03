import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {user?.firstName}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No recent orders found.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">You haven't listed any items yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

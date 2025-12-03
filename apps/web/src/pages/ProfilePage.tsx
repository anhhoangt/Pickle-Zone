import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                            {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Address</h3>
                        <p>{user.address || 'No address set'}</p>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Payment Methods</h3>
                        <p>{user.paymentMethods || 'No payment methods saved'}</p>
                    </div>

                    <div className="pt-4">
                        <Button variant="destructive" onClick={logout}>Logout</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

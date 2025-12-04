/**
 * Mock user data for development and testing
 * TODO: Replace with actual API endpoints when needed
 */

export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profileImage?: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

// Mock Users
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    role: 'SELLER',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-11-20T14:45:00Z',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    role: 'BUYER',
    createdAt: '2024-02-10T09:15:00Z',
    updatedAt: '2024-11-25T16:20:00Z',
  },
  {
    id: '3',
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Road',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    role: 'SELLER',
    createdAt: '2024-03-05T11:00:00Z',
    updatedAt: '2024-12-01T10:30:00Z',
  },
  {
    id: '4',
    email: 'sarah.williams@example.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    phone: '+1 (555) 456-7890',
    address: '321 Elm Street',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    profileImage: 'https://i.pravatar.cc/150?img=20',
    role: 'BUYER',
    createdAt: '2024-04-12T13:25:00Z',
    updatedAt: '2024-11-28T09:10:00Z',
  },
  {
    id: '5',
    email: 'david.brown@example.com',
    firstName: 'David',
    lastName: 'Brown',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Drive',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    profileImage: 'https://i.pravatar.cc/150?img=33',
    role: 'SELLER',
    createdAt: '2024-05-20T15:40:00Z',
    updatedAt: '2024-12-02T11:55:00Z',
  },
  {
    id: '6',
    email: 'emily.davis@example.com',
    firstName: 'Emily',
    lastName: 'Davis',
    phone: '+1 (555) 678-9012',
    address: '987 Cedar Lane',
    city: 'Denver',
    state: 'CO',
    zipCode: '80201',
    profileImage: 'https://i.pravatar.cc/150?img=47',
    role: 'BUYER',
    createdAt: '2024-06-08T08:20:00Z',
    updatedAt: '2024-11-30T14:35:00Z',
  },
  {
    id: '7',
    email: 'chris.wilson@example.com',
    firstName: 'Chris',
    lastName: 'Wilson',
    phone: '+1 (555) 789-0123',
    address: '147 Birch Court',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    profileImage: 'https://i.pravatar.cc/150?img=52',
    role: 'SELLER',
    createdAt: '2024-07-14T12:10:00Z',
    updatedAt: '2024-12-03T08:45:00Z',
  },
  {
    id: '8',
    email: 'admin@picklezonemarketplace.com',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1 (555) 000-0000',
    address: '1 Admin Plaza',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    profileImage: 'https://i.pravatar.cc/150?img=60',
    role: 'ADMIN',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-04T12:00:00Z',
  },
];

// Helper functions
export const getMockUserById = (id: string): MockUser | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getMockUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find((user) => user.email === email);
};

export const getMockUsersByRole = (role: 'BUYER' | 'SELLER' | 'ADMIN'): MockUser[] => {
  return mockUsers.filter((user) => user.role === role);
};

export const getMockSellers = (): MockUser[] => {
  return getMockUsersByRole('SELLER');
};

export const getMockBuyers = (): MockUser[] => {
  return getMockUsersByRole('BUYER');
};

// Mock current logged-in user (for testing)
export const mockCurrentUser: MockUser = mockUsers[0]; // John Doe as default

// User statistics
export const mockUserStats = {
  totalUsers: mockUsers.length,
  totalSellers: getMockSellers().length,
  totalBuyers: getMockBuyers().length,
  totalAdmins: getMockUsersByRole('ADMIN').length,
  newUsersThisMonth: 3,
  activeUsers: 6,
};

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: string) {
    // Total Spent: Sum of totalAmount for orders where buyerId is userId and status is not CANCELLED
    const totalSpent = await this.prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        buyerId: userId,
        status: {
          not: 'CANCELLED',
        },
      },
    });

    // Active Orders: Count of orders where buyerId is userId and status is PENDING, PAID, or SHIPPED
    const activeOrders = await this.prisma.order.count({
      where: {
        buyerId: userId,
        status: {
          in: ['PENDING', 'PAID', 'SHIPPED'],
        },
      },
    });

    // Total Earnings: Sum of (quantity * priceAtPurchase) for orderItems where product.sellerId is userId
    // We need to fetch the order items first because aggregate doesn't support deep relations easily for this calculation
    const soldItems = await this.prisma.orderItem.findMany({
      where: {
        product: {
          sellerId: userId,
        },
        order: {
          status: {
            not: 'CANCELLED',
          },
        },
      },
      select: {
        quantity: true,
        priceAtPurchase: true,
      },
    });

    const totalEarnings = soldItems.reduce((acc, item) => {
      return acc + item.quantity * item.priceAtPurchase;
    }, 0);

    // Active Listings: Count of products where sellerId is userId and stockQuantity > 0
    const activeListings = await this.prisma.product.count({
      where: {
        sellerId: userId,
        stockQuantity: {
          gt: 0,
        },
      },
    });

    // Items Sold: Sum of quantity for orderItems where product.sellerId is userId
    const itemsSold = soldItems.reduce((acc, item) => acc + item.quantity, 0);

    return {
      totalSpent: totalSpent._sum.totalAmount || 0,
      activeOrders,
      totalEarnings,
      activeListings,
      itemsSold,
    };
  }

  async getRecentActivity(userId: string) {
    // Recent Orders (as Buyer)
    const recentOrders = await this.prisma.order.findMany({
      where: {
        buyerId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Recent Sales (as Seller)
    // We find order items for products sold by this user
    const recentSales = await this.prisma.orderItem.findMany({
      where: {
        product: {
          sellerId: userId,
        },
      },
      orderBy: {
        order: {
          createdAt: 'desc',
        },
      },
      take: 5,
      include: {
        product: true,
        order: {
          select: {
            id: true,
            createdAt: true,
            status: true,
            buyer: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return {
      recentOrders,
      recentSales,
    };
  }
}

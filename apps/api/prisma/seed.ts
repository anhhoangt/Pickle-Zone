import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password', 10);

  // 1. Create the Main User (The one we will look at)
  const mainUser = await prisma.user.upsert({
    where: { email: 'user@pickleball.com' },
    update: {},
    create: {
      email: 'user@pickleball.com',
      passwordHash,
      firstName: 'Pickle',
      lastName: 'Player',
      role: 'SELLER', // Can both buy and sell
      address: '123 Pickle St, Court 1',
    },
  });

  // 2. Create another Seller (to buy from)
  const otherSeller = await prisma.user.upsert({
    where: { email: 'seller@store.com' },
    update: {},
    create: {
      email: 'seller@store.com',
      passwordHash,
      firstName: 'Pro',
      lastName: 'Shop',
      role: 'SELLER',
    },
  });

  // 3. Create a Buyer (to sell to)
  const otherBuyer = await prisma.user.upsert({
    where: { email: 'buyer@fan.com' },
    update: {},
    create: {
      email: 'buyer@fan.com',
      passwordHash,
      firstName: 'Fan',
      lastName: 'Boy',
      role: 'BUYER',
    },
  });

  // 4. Create Products listed by Other Seller (for Main User to buy)
  const sellerProducts = [
    {
      title: 'Elite Pro Paddle',
      description: 'Top tier paddle.',
      price: 199.99,
      category: 'Paddles',
      condition: 'NEW',
      stockQuantity: 50,
      sellerId: otherSeller.id,
      images: ['https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500'],
    },
    {
      title: 'Court Shoes',
      description: 'Fast shoes.',
      price: 89.99,
      category: 'Footwear',
      condition: 'NEW',
      stockQuantity: 20,
      sellerId: otherSeller.id,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    },
  ];

  const createdSellerProducts = [];
  for (const p of sellerProducts) {
    const { images, ...data } = p;
    const product = await prisma.product.create({
      data: {
        ...data,
        images: { create: images.map(url => ({ url })) },
      },
    });
    createdSellerProducts.push(product);
  }

  // 5. Create Products listed by Main User (to sell)
  const myProducts = [
    {
      title: 'My Old Paddle',
      description: 'Used but good.',
      price: 45.00,
      category: 'Paddles',
      condition: 'USED',
      stockQuantity: 1,
      sellerId: mainUser.id,
      images: ['https://images.unsplash.com/photo-1626224583764-8478abf7263f?w=500'],
    },
    {
      title: 'Extra Balls',
      description: 'Leftover balls.',
      price: 10.00,
      category: 'Balls',
      condition: 'NEW',
      stockQuantity: 5,
      sellerId: mainUser.id,
      images: ['https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500'],
    },
  ];

  const createdMyProducts = [];
  for (const p of myProducts) {
    const { images, ...data } = p;
    const product = await prisma.product.create({
      data: {
        ...data,
        images: { create: images.map(url => ({ url })) },
      },
    });
    createdMyProducts.push(product);
  }

  // 6. Create Purchases (Main User buys from Other Seller)
  // Order 1: Delivered
  await prisma.order.create({
    data: {
      buyerId: mainUser.id,
      totalAmount: 199.99,
      status: 'DELIVERED',
      orderItems: {
        create: {
          productId: createdSellerProducts[0].id,
          quantity: 1,
          priceAtPurchase: 199.99,
        },
      },
    },
  });

  // Order 2: Shipped
  await prisma.order.create({
    data: {
      buyerId: mainUser.id,
      totalAmount: 89.99,
      status: 'SHIPPED',
      orderItems: {
        create: {
          productId: createdSellerProducts[1].id,
          quantity: 1,
          priceAtPurchase: 89.99,
        },
      },
    },
  });

  // 7. Create Sales (Other Buyer buys from Main User)
  // Sale 1: Delivered (Earnings)
  await prisma.order.create({
    data: {
      buyerId: otherBuyer.id,
      totalAmount: 45.00,
      status: 'DELIVERED',
      orderItems: {
        create: {
          productId: createdMyProducts[0].id,
          quantity: 1,
          priceAtPurchase: 45.00,
        },
      },
    },
  });

  // Sale 2: Shipped (Earnings + Shipping items)
  await prisma.order.create({
    data: {
      buyerId: otherBuyer.id,
      totalAmount: 20.00, // 2 packs
      status: 'SHIPPED',
      orderItems: {
        create: {
          productId: createdMyProducts[1].id,
          quantity: 2,
          priceAtPurchase: 10.00,
        },
      },
    },
  });

  console.log('Seed data created successfully');
  console.log('Login with: user@pickleball.com / password');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

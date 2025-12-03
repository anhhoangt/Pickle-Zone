import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a Seller
  const seller = await prisma.user.upsert({
    where: { email: 'seller@pickleball.com' },
    update: {},
    create: {
      email: 'seller@pickleball.com',
      passwordHash: 'hashed_password',
      firstName: 'Pro',
      lastName: 'Seller',
      role: 'SELLER',
    },
  });

  console.log({ seller });

  // Create Products
  const products = [
    {
      title: 'Pro Carbon Paddle',
      description: 'High performance carbon fiber paddle for advanced players.',
      price: 149.99,
      category: 'Rackets',
      condition: 'NEW',
      stockQuantity: 10,
      images: ['https://images.unsplash.com/photo-1626246939893-02f81057f6a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'],
      sellerId: seller.id,
    },
    {
      title: 'Outdoor Pickleballs (3-Pack)',
      description: 'Durable outdoor balls, USAPA approved.',
      price: 9.99,
      category: 'Balls',
      condition: 'NEW',
      stockQuantity: 100,
      images: ['https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'],
      sellerId: seller.id,
    },
    {
      title: 'Vintage Wooden Paddle',
      description: 'Classic wooden paddle, great for beginners or collectors.',
      price: 29.99,
      category: 'Rackets',
      condition: 'USED',
      stockQuantity: 1,
      images: ['https://plus.unsplash.com/premium_photo-1677171749302-e77091963571?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'],
      sellerId: seller.id,
    },
  ];

  for (const product of products) {
    const { images, ...productData } = product;
    const p = await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images.map((url) => ({ url })),
        },
      },
    });
    console.log(`Created product with id: ${p.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

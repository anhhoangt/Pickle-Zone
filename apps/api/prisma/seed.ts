import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data (in reverse order of dependencies)
  console.log('🧹 Cleaning existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Existing data cleared\n');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users
  console.log('👥 Creating users...');
  const users = await Promise.all([
    // Sellers
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        passwordHash: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, San Francisco, CA 94102',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'SELLER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.johnson@example.com',
        passwordHash: hashedPassword,
        firstName: 'Mike',
        lastName: 'Johnson',
        phone: '+1 (555) 345-6789',
        address: '789 Pine Road, Austin, TX 78701',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'SELLER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'david.brown@example.com',
        passwordHash: hashedPassword,
        firstName: 'David',
        lastName: 'Brown',
        phone: '+1 (555) 567-8901',
        address: '654 Maple Drive, Miami, FL 33101',
        avatar: 'https://i.pravatar.cc/150?img=33',
        role: 'SELLER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'chris.wilson@example.com',
        passwordHash: hashedPassword,
        firstName: 'Chris',
        lastName: 'Wilson',
        phone: '+1 (555) 789-0123',
        address: '147 Birch Court, Portland, OR 97201',
        avatar: 'https://i.pravatar.cc/150?img=52',
        role: 'SELLER',
      },
    }),
    // Buyers
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        passwordHash: hashedPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Avenue, Los Angeles, CA 90001',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'BUYER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.williams@example.com',
        passwordHash: hashedPassword,
        firstName: 'Sarah',
        lastName: 'Williams',
        phone: '+1 (555) 456-7890',
        address: '321 Elm Street, Seattle, WA 98101',
        avatar: 'https://i.pravatar.cc/150?img=20',
        role: 'BUYER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emily.davis@example.com',
        passwordHash: hashedPassword,
        firstName: 'Emily',
        lastName: 'Davis',
        phone: '+1 (555) 678-9012',
        address: '987 Cedar Lane, Denver, CO 80201',
        avatar: 'https://i.pravatar.cc/150?img=47',
        role: 'BUYER',
      },
    }),
    // Admin
    prisma.user.create({
      data: {
        email: 'admin@picklezonemarketplace.com',
        passwordHash: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1 (555) 000-0000',
        address: '1 Admin Plaza, New York, NY 10001',
        avatar: 'https://i.pravatar.cc/150?img=60',
        role: 'ADMIN',
      },
    }),
  ]);

  const [john, mike, david, chris, jane, sarah, emily, admin] = users;
  console.log(`✅ Created ${users.length} users\n`);

  // Create Products with Images
  console.log('📦 Creating products...');
  const products = await Promise.all([
    // John Doe's Products
    prisma.product.create({
      data: {
        title: 'Professional Carbon Fiber Paddle Pro Elite',
        description:
          'Tournament-grade carbon fiber paddle with textured surface for maximum spin. Perfect weight balance for power and control. Used by professional players.',
        price: 149.99,
        category: 'Paddles',
        condition: 'NEW',
        stockQuantity: 15,
        sellerId: john.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
            { url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400' },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Indoor Pickleball Balls (6-Pack)',
        description:
          'Official tournament balls designed for indoor play. Precision-drilled 26 holes for consistent flight. USAPA approved.',
        price: 24.99,
        category: 'Balls',
        condition: 'NEW',
        stockQuantity: 50,
        sellerId: john.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400' }],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Graphite Paddle - Advanced Series',
        description:
          'High-performance graphite paddle for advanced players. Excellent power and control. Honeycomb core for reduced vibration.',
        price: 129.99,
        category: 'Paddles',
        condition: 'NEW',
        stockQuantity: 10,
        sellerId: john.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' }],
        },
      },
    }),

    // Mike Johnson's Products
    prisma.product.create({
      data: {
        title: "Premium Pickleball Court Shoes - Men's",
        description:
          'Lightweight court shoes with excellent grip and ankle support. Breathable mesh upper with reinforced toe cap. Perfect for quick lateral movements.',
        price: 89.99,
        category: 'Shoes',
        condition: 'NEW',
        stockQuantity: 25,
        sellerId: mike.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
            { url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Deluxe Paddle Bag with Wheels',
        description:
          'Spacious bag with separate compartments for paddles, balls, and accessories. Durable wheels for easy transport. Holds up to 4 paddles.',
        price: 79.99,
        category: 'Bags',
        condition: 'GOOD',
        stockQuantity: 12,
        sellerId: mike.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' }],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Court Line Marking Tape',
        description:
          'Temporary court line tape for creating practice courts. Easy to apply and remove. Weather-resistant.',
        price: 24.99,
        category: 'Court Equipment',
        condition: 'NEW',
        stockQuantity: 22,
        sellerId: mike.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400' }],
        },
      },
    }),

    // David Brown's Products
    prisma.product.create({
      data: {
        title: 'Outdoor Pickleball Ball Set (12 Pack)',
        description:
          'Durable outdoor balls built to withstand wind and rough surfaces. Bright colors for high visibility. Perfect for recreational play.',
        price: 29.99,
        category: 'Balls',
        condition: 'NEW',
        stockQuantity: 40,
        sellerId: david.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400' }],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Performance Moisture-Wicking Jersey',
        description:
          'Ultra-light athletic jersey with moisture-wicking technology. UPF 50+ sun protection. Available in multiple colors.',
        price: 34.99,
        category: 'Apparel',
        condition: 'NEW',
        stockQuantity: 30,
        sellerId: david.id,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
            { url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400' },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Portable Pickleball Net System',
        description:
          'Easy-to-setup portable net system. Regulation height and width. Includes carrying case. Perfect for practice or casual games.',
        price: 159.99,
        category: 'Court Equipment',
        condition: 'USED',
        stockQuantity: 5,
        sellerId: david.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400' }],
        },
      },
    }),

    // Chris Wilson's Products
    prisma.product.create({
      data: {
        title: 'Beginner Paddle Bundle - 2 Paddles',
        description:
          'Perfect starter set for new players. Includes two composite paddles with comfortable grips. Great value for families or beginners.',
        price: 59.99,
        category: 'Paddles',
        condition: 'NEW',
        stockQuantity: 20,
        sellerId: chris.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' }],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Protective Eyewear - Sports Sunglasses',
        description:
          'UV protection sports sunglasses with polarized lenses. Lightweight and comfortable for all-day wear. Anti-slip nose pads.',
        price: 39.99,
        category: 'Accessories',
        condition: 'NEW',
        stockQuantity: 18,
        sellerId: chris.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' }],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Training Cone Set (12 Pieces)',
        description:
          'Bright orange training cones for drills and court marking. Stackable for easy storage. Durable plastic construction.',
        price: 19.99,
        category: 'Accessories',
        condition: 'NEW',
        stockQuantity: 35,
        sellerId: chris.id,
        images: {
          create: [{ url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' }],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products\n`);

  // Create Orders with Order Items
  console.log('🛒 Creating orders...');
  const orders = await Promise.all([
    // Jane's Orders
    prisma.order.create({
      data: {
        buyerId: jane.id,
        totalAmount: 199.97,
        status: 'DELIVERED',
        orderItems: {
          create: [
            {
              productId: products[0].id, // Carbon Fiber Paddle
              quantity: 1,
              priceAtPurchase: 149.99,
            },
            {
              productId: products[1].id, // Indoor Balls
              quantity: 2,
              priceAtPurchase: 24.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        buyerId: jane.id,
        totalAmount: 89.99,
        status: 'SHIPPED',
        orderItems: {
          create: [
            {
              productId: products[3].id, // Court Shoes
              quantity: 1,
              priceAtPurchase: 89.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        buyerId: jane.id,
        totalAmount: 24.99,
        status: 'CANCELLED',
        orderItems: {
          create: [
            {
              productId: products[5].id, // Marking Tape
              quantity: 1,
              priceAtPurchase: 24.99,
            },
          ],
        },
      },
    }),

    // Sarah's Orders
    prisma.order.create({
      data: {
        buyerId: sarah.id,
        totalAmount: 114.98,
        status: 'PAID',
        orderItems: {
          create: [
            {
              productId: products[4].id, // Paddle Bag
              quantity: 1,
              priceAtPurchase: 79.99,
            },
            {
              productId: products[7].id, // Jersey
              quantity: 1,
              priceAtPurchase: 34.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        buyerId: sarah.id,
        totalAmount: 159.99,
        status: 'DELIVERED',
        orderItems: {
          create: [
            {
              productId: products[8].id, // Net System
              quantity: 1,
              priceAtPurchase: 159.99,
            },
          ],
        },
      },
    }),

    // Emily's Orders
    prisma.order.create({
      data: {
        buyerId: emily.id,
        totalAmount: 119.97,
        status: 'DELIVERED',
        orderItems: {
          create: [
            {
              productId: products[9].id, // Beginner Bundle
              quantity: 1,
              priceAtPurchase: 59.99,
            },
            {
              productId: products[6].id, // Outdoor Balls
              quantity: 2,
              priceAtPurchase: 29.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        buyerId: emily.id,
        totalAmount: 59.98,
        status: 'PAID',
        orderItems: {
          create: [
            {
              productId: products[10].id, // Eyewear
              quantity: 1,
              priceAtPurchase: 39.99,
            },
            {
              productId: products[11].id, // Training Cones
              quantity: 1,
              priceAtPurchase: 19.99,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        buyerId: emily.id,
        totalAmount: 129.99,
        status: 'PENDING',
        orderItems: {
          create: [
            {
              productId: products[2].id, // Graphite Paddle
              quantity: 1,
              priceAtPurchase: 129.99,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} orders\n`);

  console.log('✨ Database seeding completed successfully!\n');
  console.log('═══════════════════════════════════════════════════');
  console.log('📊 Summary:');
  console.log(`   • ${users.length} users created`);
  console.log(`   • ${products.length} products created`);
  console.log(`   • ${orders.length} orders created`);
  console.log('═══════════════════════════════════════════════════\n');
  console.log('🔑 Login Credentials (All users):');
  console.log('   Password: password123\n');
  console.log('👤 Sellers (can list products):');
  console.log('   • john.doe@example.com (3 products)');
  console.log('   • mike.johnson@example.com (3 products)');
  console.log('   • david.brown@example.com (3 products)');
  console.log('   • chris.wilson@example.com (3 products)\n');
  console.log('🛒 Buyers (have order history):');
  console.log('   • jane.smith@example.com (3 orders)');
  console.log('   • sarah.williams@example.com (2 orders)');
  console.log('   • emily.davis@example.com (3 orders)\n');
  console.log('👑 Admin:');
  console.log('   • admin@picklezonemarketplace.com\n');
  console.log('═══════════════════════════════════════════════════');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

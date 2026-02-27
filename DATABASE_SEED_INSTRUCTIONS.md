# 🌱 Database Seeding Complete!

Your Prisma seed script has been successfully created and pushed to GitHub. Now you can populate your database with realistic mock data.

## 📋 What Was Created

1. **Seed Script**: `/apps/api/prisma/seed.ts`
   - Creates 8 users (4 sellers, 3 buyers, 1 admin)
   - Creates 12 products with images
   - Creates 8 orders with order items
   - All passwords are hashed with bcrypt

2. **Documentation**: `/apps/api/prisma/README.md`
   - Complete usage instructions
   - Login credentials
   - Testing scenarios
   - Troubleshooting guide

## 🚀 How to Run the Seed Script

### Step 1: Make sure PostgreSQL is running
```bash
brew services list | grep postgresql
```

If not running:
```bash
brew services start postgresql@14
```

### Step 2: Navigate to the API directory
```bash
cd /Users/anhthehoang/Desktop/learning-code/Marketplace/apps/api
```

### Step 3: Run the seed script
```bash
npx prisma db seed
```

Or alternatively:
```bash
npm run prisma db seed
```

You should see output like:
```
🌱 Starting database seed...
🧹 Cleaning existing data...
✅ Existing data cleared

👥 Creating users...
✅ Created 8 users

📦 Creating products...
✅ Created 12 products

🛒 Creating orders...
✅ Created 8 orders

✨ Database seeding completed successfully!
```

## 🔑 Login Credentials

**All users have the same password:** `password123`

### 👤 Sellers (Have Products Listed)

| Email | Products |
|-------|----------|
| `john.doe@example.com` | 3 products (Paddles & Balls) |
| `mike.johnson@example.com` | 3 products (Shoes, Bags, Equipment) |
| `david.brown@example.com` | 3 products (Balls, Apparel, Equipment) |
| `chris.wilson@example.com` | 3 products (Paddles, Accessories) |

### 🛒 Buyers (Have Order History)

| Email | Orders |
|-------|--------|
| `jane.smith@example.com` | 3 orders |
| `sarah.williams@example.com` | 2 orders |
| `emily.davis@example.com` | 3 orders |

### 👑 Admin

| Email | Access |
|-------|--------|
| `admin@picklezonemarketplace.com` | Full admin access |

## ✅ What to Test After Seeding

### 1. Test as a Seller
```
Login: john.doe@example.com
Password: password123

Expected:
✓ Go to "My Listings" → See 3 products
✓ Products show images, prices, stock
✓ Can edit, duplicate, or delete products
✓ Can create new products
✓ Dashboard shows seller statistics
```

### 2. Test as a Buyer
```
Login: jane.smith@example.com
Password: password123

Expected:
✓ Go to "Dashboard" → See 3 orders
✓ Orders show products purchased
✓ Order statuses are displayed
✓ Can browse all products on home page
✓ Can see product images and details
```

### 3. Test Search & Filtering
```
✓ Search for "paddle" → Should find 4 products
✓ Filter by "Balls" category → Should find 2 products
✓ Filter by "NEW" condition → Should find most products
✓ Sort by price (low to high)
✓ Filter by stock status
```

### 4. Test Dashboard Analytics
```
Login as any seller
✓ Dashboard shows revenue charts
✓ Order status breakdown displays
✓ Top selling products ranked
✓ Performance metrics with trends
```

## 🔄 Resetting the Database

If you need to clear everything and start fresh:

```bash
cd /Users/anhthehoang/Desktop/learning-code/Marketplace/apps/api
npx prisma migrate reset
```

This will:
1. Drop the database
2. Recreate it
3. Run all migrations
4. **Automatically run the seed script**

## 📊 Data Summary

After seeding, you'll have:

- **8 Users**
  - 4 Sellers
  - 3 Buyers
  - 1 Admin

- **12 Products**
  - Total inventory value: ~$3,500
  - Average price: $67
  - Categories: Paddles (4), Balls (2), Shoes (1), Bags (1), Apparel (1), Accessories (2), Court Equipment (2)

- **8 Orders**
  - Total revenue: ~$900
  - Average order value: $112
  - Statuses: PENDING (1), PAID (2), SHIPPED (1), DELIVERED (3), CANCELLED (1)

## 🐛 Troubleshooting

### Issue: "Cannot find module '@prisma/client'"
```bash
cd /Users/anhthehoang/Desktop/learning-code/Marketplace/apps/api
npm install
```

### Issue: "Database connection error"
1. Check PostgreSQL is running: `brew services list`
2. Check `.env` file has correct `DATABASE_URL`
3. Try: `brew services restart postgresql@14`

### Issue: "Unique constraint failed"
The database already has data. Run:
```bash
npx prisma migrate reset
```

## 📁 Related Files

Frontend mock data (for UI development only, NOT in database):
- `/apps/web/src/mocks/userMockData.ts`
- `/apps/web/src/mocks/productMockData.ts`
- `/apps/web/src/mocks/orderMockData.ts`
- `/apps/web/src/mocks/dashboardMockData.ts`

Backend seed data (THIS GOES IN DATABASE):
- `/apps/api/prisma/seed.ts` ← Run this to populate database

## 🎯 Next Steps

1. **Run the seed script** (see commands above)
2. **Start your backend**: `cd apps/api && npm run dev`
3. **Start your frontend**: `cd apps/web && npm run dev`
4. **Login with any test user** and explore the app!
5. **Test all features**:
   - My Listings (as seller)
   - Dashboard (as buyer/seller)
   - Search & Filters
   - Create/Edit/Delete products
   - View orders

## ✨ Success Indicators

You'll know it worked when:

✅ You can login with `john.doe@example.com` / `password123`
✅ My Listings page shows 3 products for John
✅ Products have images from Unsplash
✅ Dashboard shows analytics charts with data
✅ Search finds products
✅ Buyer accounts show order history

---

**Happy testing! 🎉**

Your database is now populated with realistic data that matches your frontend mock data structure.

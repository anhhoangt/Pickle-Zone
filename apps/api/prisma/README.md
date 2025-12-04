# Database Seeding

This directory contains the Prisma seed script to populate the database with mock data for development and testing.

## What Gets Seeded

The seed script creates:

- **8 Users** (4 sellers, 3 buyers, 1 admin)
- **12 Products** (linked to sellers)
- **8 Orders** (linked to buyers and products)

All relationships are properly configured and data is realistic for testing purposes.

## Running the Seed Script

### Prerequisites

1. Make sure PostgreSQL is running
2. Make sure your `.env` file is configured with correct `DATABASE_URL` and `DIRECT_URL`
3. Make sure Prisma migrations are up to date

### Command

From the `/apps/api` directory, run:

```bash
npm run prisma db seed
```

Or using npx directly:

```bash
npx prisma db seed
```

### What Happens

The seed script will:

1. **Clear existing data** (in safe order to respect foreign keys)
2. **Create 8 users** with hashed passwords
3. **Create 12 products** with images
4. **Create 8 orders** with order items

You'll see progress messages in the terminal showing each step.

## Login Credentials

**All users have the same password:** `password123`

### Sellers (Have Products)

- `john.doe@example.com` - 3 products (Paddles & Balls)
- `mike.johnson@example.com` - 3 products (Shoes, Bags, Court Equipment)
- `david.brown@example.com` - 3 products (Balls, Apparel, Court Equipment)
- `chris.wilson@example.com` - 3 products (Paddles, Accessories)

### Buyers (Have Orders)

- `jane.smith@example.com` - 3 orders
- `sarah.williams@example.com` - 2 orders
- `emily.davis@example.com` - 3 orders

### Admin

- `admin@picklezonemarketplace.com` - Full access

## Testing Scenarios

### As a Seller

1. Login as `john.doe@example.com`
2. Go to "My Listings" - you'll see 3 products
3. Try editing, duplicating, or deleting products
4. Add a new product

### As a Buyer

1. Login as `jane.smith@example.com`
2. Go to "Dashboard" - you'll see your order history
3. Browse products on the home page
4. Products should show correctly with images

### As Admin

1. Login as `admin@picklezonemarketplace.com`
2. Access admin features (when implemented)

## Data Overview

### Products by Category

- **Paddles**: 4 products
- **Balls**: 2 products  
- **Shoes**: 1 product
- **Bags**: 1 product
- **Apparel**: 1 product
- **Accessories**: 2 products
- **Court Equipment**: 2 products

### Order Statuses

- **PENDING**: 1 order
- **PAID**: 2 orders
- **SHIPPED**: 1 order
- **DELIVERED**: 3 orders
- **CANCELLED**: 1 order

### Total Values

- Total Product Inventory Value: ~$3,500
- Total Order Revenue: ~$900
- Average Order Value: ~$112

## Clearing the Database

To clear all data and start fresh:

```bash
npx prisma migrate reset
```

This will:
1. Drop the database
2. Recreate it
3. Run all migrations
4. Automatically run the seed script

## Troubleshooting

### "Cannot find module '@prisma/client'"

Run: `npm install` in the `/apps/api` directory

### "Unique constraint failed"

The database might already have data. Either:
- Run `npx prisma migrate reset` to clear everything
- Or manually delete the data

### "bcrypt not found"

Run: `npm install bcrypt @types/bcrypt`

### Database connection errors

1. Check your `.env` file has correct `DATABASE_URL`
2. Make sure PostgreSQL is running: `brew services list | grep postgresql`
3. Start PostgreSQL: `brew services start postgresql@14`

## File Structure

```
prisma/
├── schema.prisma          # Database schema
├── seed.ts               # Seed script (this file)
└── migrations/           # Migration history
```

## Modifying Seed Data

To change the seed data:

1. Edit `/apps/api/prisma/seed.ts`
2. Modify user, product, or order data as needed
3. Run `npm run prisma db seed` to apply changes

## Related Files

The frontend also has mock data files for UI development:

- `/apps/web/src/mocks/userMockData.ts`
- `/apps/web/src/mocks/productMockData.ts`
- `/apps/web/src/mocks/orderMockData.ts`

These are for frontend-only testing and are NOT connected to the database.

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    create(createProductDto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                title: createProductDto.title,
                description: createProductDto.description,
                price: createProductDto.price,
                category: createProductDto.category,
                condition: createProductDto.condition,
                stockQuantity: createProductDto.stockQuantity,
                images: {
                    create: createProductDto.images.map((url) => ({ url })),
                },
                seller: {
                    connect: { id: createProductDto.sellerId },
                },
            },
            include: { images: true },
        });
    }

    findAll(filters?: {
        search?: string;
        category?: string;
        condition?: string;
        minPrice?: number;
        maxPrice?: number;
    }) {
        const where: any = {};

        // Full-text search on title and description
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        // Filter by category
        if (filters?.category) {
            where.category = filters.category;
        }

        // Filter by condition
        if (filters?.condition) {
            where.condition = filters.condition;
        }

        // Filter by price range
        if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
            where.price = {};
            if (filters.minPrice !== undefined) {
                where.price.gte = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                where.price.lte = filters.maxPrice;
            }
        }

        return this.prisma.product.findMany({
            where,
            include: { seller: true, images: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
            include: { seller: true, reviews: true, images: true },
        });
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const { images, ...rest } = updateProductDto;

        // If images are provided, we might need to handle them separately
        // For simplicity, let's assume we replace all images if provided
        if (images) {
            await this.prisma.image.deleteMany({
                where: { productId: id },
            });
            await this.prisma.image.createMany({
                data: images.map((url: string) => ({ url, productId: id })),
            });
        }

        return this.prisma.product.update({
            where: { id },
            data: rest,
            include: { images: true },
        });
    }

    remove(id: string) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
}

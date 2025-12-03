import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

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

  findAll(category?: string) {
    if (category) {
      return this.prisma.product.findMany({
        where: { category },
        include: { seller: true, images: true },
      });
    }
    return this.prisma.product.findMany({
      include: { seller: true, images: true },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { seller: true, reviews: true, images: true },
    });
  }
}

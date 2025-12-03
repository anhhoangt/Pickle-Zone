export class CreateProductDto {
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  stockQuantity: number;
  images: string[];
}

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
  sellerId?: string;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  condition?: string;
  stockQuantity?: number;
  images?: string[];
}

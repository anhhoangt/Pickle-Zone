import React, { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'NEW' | 'USED' | 'GOOD';
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      // TODO: Implement add to cart logic
      console.log('Added to cart:', product.id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        <div className="aspect-square relative bg-muted">
          {product.images.length > 0 ? (
            <>
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="object-cover w-full h-full"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}
          <Badge className="absolute top-2 right-2" variant={product.condition === 'NEW' ? 'default' : 'secondary'}>
            {product.condition}
          </Badge>
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
            </div>
            <span className="font-bold text-lg text-primary">${product.price}</span>
          </div>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
        </CardFooter>
      </Card>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

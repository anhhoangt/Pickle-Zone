import React, { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, MessageCircle, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { ProductFormModal } from './ProductFormModal';

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'NEW' | 'USED' | 'GOOD';
  images: string[];
  seller: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface ProductCardProps {
  product: Product;
  onUpdate?: () => void;
}

export function ProductCard({ product, onUpdate }: ProductCardProps) {
  const { user, isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isSeller = user?.id === product.seller.id;

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

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      console.log('Contact seller:', product.seller.id);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        // Assuming api is imported or available globally, but it's not imported here.
        // I need to import api from '../lib/api'
        const { api } = await import('../lib/api');
        await api.delete(`/products/${product.id}`);
        onUpdate?.();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group relative">
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

          {isSeller && (
            <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/90 hover:bg-white"
                onClick={() => setIsEditModalOpen(true)}
                title="Edit Listing"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={handleDelete}
                title="Delete Listing"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
            </div>
            <span className="font-bold text-lg text-primary">${product.price}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">
              Seller: {product.seller.firstName} {product.seller.lastName}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleContactSeller}
              title="Contact Seller"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        {!isSeller && (
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
          </CardFooter>
        )}
      </Card>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      <ProductFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={product}
        onSuccess={() => {
          onUpdate?.();
        }}
      />
    </>
  );
}

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  title: string
  price: number
  category: string
  condition: 'NEW' | 'USED'
  images: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative bg-muted">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover w-full h-full"
          />
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
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}

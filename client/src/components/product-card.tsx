import { Link } from "wouter";
import { Product } from "@/lib/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group overflow-hidden border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <Link href={`/product/${product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-secondary/50 rounded-xl cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 px-0">
          <div className="flex w-full justify-between items-start">
            <div>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-medium text-lg cursor-pointer hover:underline decoration-1 underline-offset-4 decoration-muted-foreground/50">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm">{product.category}</p>
            </div>
            <span className="font-medium text-lg">${product.price}</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            onClick={() => addToCart(product)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

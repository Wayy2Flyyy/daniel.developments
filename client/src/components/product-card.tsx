import { Link } from "wouter";
import { Product } from "@/lib/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Plus, ArrowRight, Code } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();

  if (product.type === 'project') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card className="h-full bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-colors group">
          <CardContent className="p-0">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">
                  {product.category}
                </Badge>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="text-xs px-2 py-1 rounded bg-white/5 text-muted-foreground border border-white/5">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Mortal Plugin Product Card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
               <Code className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="outline" className="border-white/10 text-xs font-mono">
              v2.0
            </Badge>
          </div>
          
          <h3 className="font-display text-xl font-bold text-white mb-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-6 h-12 line-clamp-2">
            {product.description}
          </p>
          
          <div className="space-y-2 mb-6">
            {product.features.slice(0, 2).map((feature) => (
              <div key={feature} className="flex items-center text-xs text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary mr-2" />
                {feature}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto">
             <span className="text-2xl font-bold font-mono text-white">${product.price}</span>
             <Button 
               size="sm" 
               className="bg-white text-black hover:bg-white/90 font-medium"
               onClick={() => addToCart(product)}
             >
               Add <Plus className="h-4 w-4 ml-1" />
             </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Plus, Eye, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ProductDetailDialog } from "@/components/product-detail-dialog";

// Outcome lines - persuasive, not informational
const outcomeLines: Record<string, string> = {
  "Mortal Admin Panel": "Full server control in seconds",
  "Mortal HUD System": "Deploy in under 5 minutes",
  "Mortal Chat iOS": "Eliminates chat spam instantly",
  "Mortal Economy Core": "Zero exploits. Period.",
  "Advanced Robbery System": "Engaging heists, no setup pain",
  "Server Launcher Pro": "Your brand, zero dev time",
  "Log Viewer Desktop": "Find issues 10x faster",
  "Texture Compressor Tool": "Cut load times by 40%",
  "Nexus Community Portal": "Full site in one afternoon",
  "Status Page Modern": "Live uptime in 15 minutes",
  "Loading Screen V4": "First impressions that stick",
  "Discord Bot Boilerplate (Python)": "Bot live in under an hour",
  "Anti-Cheat Core (Lua)": "Blocks 99% of known exploits",
  "Data Scraper Script": "Automate hours of research",
  "Ultimate VSCode Theme": "Code longer, strain less",
  "Server Config Generator": "Best practices, zero effort",
  "Stream Deck Icons Pack": "Professional stream setup",
};

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const outcome = outcomeLines[product.name] || "Production-ready code";

  // Portfolio Project Card
  if (product.type === 'project') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card className="h-full bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => setIsDetailOpen(true)}>
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
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {(product.features as string[]).slice(0, 3).map((feature: string) => (
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

  // Product Card - Persuasive, not informational
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                 <Code className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary text-xs bg-primary/5">
                Verified
              </Badge>
            </div>
            
            <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
            
            {/* Outcome line - bold, persuasive */}
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">{outcome}</span>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto gap-2">
               <span className="text-2xl font-bold font-mono text-white">
                 {product.price === 0 ? 'Free' : `$${product.price}`}
               </span>
               <div className="flex gap-2">
                 <Button 
                   size="sm" 
                   variant="ghost"
                   className="text-muted-foreground hover:text-white hover:bg-white/10"
                   onClick={() => setIsDetailOpen(true)}
                 >
                   <Eye className="h-4 w-4" />
                 </Button>
                 <Button 
                   size="sm" 
                   className="bg-white text-black hover:bg-white/90 font-medium"
                   onClick={() => addToCart({
                     id: product.id,
                     name: product.name,
                     price: product.price,
                     image: product.image,
                   })}
                 >
                   Add <Plus className="h-4 w-4 ml-1" />
                 </Button>
               </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ProductDetailDialog 
        product={product} 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
      />
    </>
  );
}

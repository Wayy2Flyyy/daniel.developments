import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ProductDetailDialog } from "@/components/product-detail-dialog";
import { cn } from "@/lib/utils";

interface BaseProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  type: string;
}

const outcomeLines: Record<string, string> = {
  "Mortal Admin Panel": "Full server control in one interface",
  "Mortal HUD System": "Deploys in under 5 minutes",
  "Mortal Chat iOS": "Modern chat that eliminates spam",
  "Mortal Economy Core": "Secure money system, zero exploits",
  "Advanced Robbery System": "Engaging heists with no setup pain",
  "Server Launcher Pro": "Your brand, zero dev time needed",
  "Log Viewer Desktop": "Find issues 10x faster",
  "Texture Compressor Tool": "Cut load times by 40%",
  "Nexus Community Portal": "Full community site in one afternoon",
  "Status Page Modern": "Live uptime in 15 minutes",
  "Loading Screen V4": "First impressions that stick",
  "Discord Bot Boilerplate (Python)": "Bot live in under an hour",
  "Anti-Cheat Core (Lua)": "Blocks 99% of known exploits",
  "Data Scraper Script": "Automate hours of research",
  "Ultimate VSCode Theme": "Code longer, strain less",
  "Server Config Generator": "Best practices, zero effort",
  "Stream Deck Icons Pack": "Professional stream setup",
};

const featuredProducts = [
  "Anti-Cheat Core (Lua)",
  "Mortal Economy Core", 
  "Mortal Admin Panel"
];

interface ProductCardProps {
  product: BaseProduct;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const outcome = outcomeLines[product.name] || "Production-ready code";
  const isFeatured = featured || featuredProducts.includes(product.name);

  if (product.type === 'project') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card 
          className="h-full bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300 group cursor-pointer" 
          onClick={() => setIsDetailOpen(true)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2 bg-white/10 text-white/80 border-white/20 backdrop-blur-md">
                  {product.category}
                </Badge>
                <h3 className="font-display text-xl font-bold text-white">
                  {product.name}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>
          </CardContent>
        </Card>
        <ProductDetailDialog 
          product={product} 
          open={isDetailOpen} 
          onOpenChange={setIsDetailOpen} 
        />
      </motion.div>
    );
  }

  return (
    <>
      <Card 
        className={cn(
          "relative overflow-hidden group transition-all duration-300 h-full flex flex-col cursor-pointer",
          "bg-white/[0.03] backdrop-blur-sm border-white/10 hover:border-white/20 hover:bg-white/[0.05]",
          isFeatured && "ring-1 ring-white/10"
        )}
        onClick={() => setIsDetailOpen(true)}
        data-testid={`card-product-${product.id}`}
      >
        <CardContent className={cn(
          "flex flex-col relative z-10 h-full",
          isFeatured ? "p-8" : "p-6"
        )}>
          <div className="flex items-start gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            {isFeatured && (
              <Badge className="ml-auto bg-white/10 text-white/70 border-white/20 text-xs">
                Production-Ready
              </Badge>
            )}
          </div>
          
          <h3 className={cn(
            "font-display font-bold text-white mb-2 line-clamp-1",
            isFeatured ? "text-xl" : "text-lg"
          )}>
            {product.name}
          </h3>
          
          <p className={cn(
            "text-muted-foreground mb-auto line-clamp-2",
            isFeatured ? "text-base leading-relaxed" : "text-sm leading-relaxed"
          )}>
            {outcome}
          </p>

          <div className="flex items-end justify-between mt-6 pt-4 border-t border-white/5">
            <span className="text-sm text-muted-foreground font-mono">
              {product.price === 0 ? '$0' : `$${product.price}`}
            </span>
            <Button 
              size="sm" 
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg gap-1.5 h-8 px-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailOpen(true);
              }}
              data-testid={`button-view-${product.id}`}
            >
              View <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProductDetailDialog 
        product={product} 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
      />
    </>
  );
}

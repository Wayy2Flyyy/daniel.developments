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
  const [isHovered, setIsHovered] = useState(false);
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
          isFeatured 
            ? "border-2 border-white/20 min-h-[300px]" 
            : "border border-white/[0.08] min-h-[240px]",
          isHovered && !isFeatured && "border-cyan-500/30 shadow-lg shadow-cyan-500/10",
          isHovered && isFeatured && "border-cyan-500/40 shadow-xl shadow-cyan-500/20"
        )}
        onClick={() => setIsDetailOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={`card-product-${product.id}`}
        style={{
          background: isFeatured
            ? `radial-gradient(ellipse at top left, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.015) 100%)`
            : `radial-gradient(ellipse at top left, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 100%)`,
          boxShadow: isHovered 
            ? isFeatured 
              ? 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(6,182,212,0.15)' 
              : 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)' 
            : isFeatured
              ? 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.2)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.04)'
        }}
      >
        <CardContent className={cn(
          "flex flex-col relative z-10 h-full",
          isFeatured ? "p-8" : "p-7"
        )}>
          <div className="flex items-start gap-3 mb-4">
            <div 
              className={cn(
                "h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                "border border-white/10"
              )}
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
              }}
            >
              <Package className="h-5 w-5 text-white/50" />
            </div>
            {isFeatured && (
              <Badge className="ml-auto bg-cyan-500/15 text-cyan-400 border-cyan-500/30 text-xs font-medium">
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
            "text-white/40 mb-auto line-clamp-2",
            isFeatured ? "text-base leading-relaxed" : "text-sm leading-relaxed"
          )}>
            {outcome}
          </p>

          <div className="flex items-end justify-between mt-6 pt-4 border-t border-white/5">
            <span className="text-sm text-white/40 font-mono">
              {product.price === 0 ? '$0' : `$${product.price}`}
            </span>
            <Button 
              size="sm" 
              variant="ghost"
              className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg gap-1.5 h-8 px-3 group/btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailOpen(true);
              }}
              data-testid={`button-view-${product.id}`}
            >
              View 
              <motion.span
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className={cn(
                  "h-3.5 w-3.5 transition-colors duration-200",
                  isHovered ? "text-cyan-400" : "text-white/50"
                )} />
              </motion.span>
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

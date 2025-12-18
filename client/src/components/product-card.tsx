import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Plus, Eye, Zap, Server, Shield, Layout, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ProductDetailDialog } from "@/components/product-detail-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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

// Category color schemes matching slideshow
const categoryStyles: Record<string, {
  gradient: string;
  accent: string;
  border: string;
  badge: string;
  icon: typeof Server;
  glow: string;
}> = {
  "FiveM Resources": {
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accent: "text-cyan-400",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    icon: Server,
    glow: "group-hover:shadow-cyan-500/20"
  },
  "Applications": {
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    accent: "text-orange-400",
    border: "border-orange-500/30 hover:border-orange-400/50",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    icon: Shield,
    glow: "group-hover:shadow-orange-500/20"
  },
  "Web Templates": {
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    accent: "text-violet-400",
    border: "border-violet-500/30 hover:border-violet-400/50",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    icon: Layout,
    glow: "group-hover:shadow-violet-500/20"
  },
  "Developer Tools": {
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    accent: "text-amber-400",
    border: "border-amber-500/30 hover:border-amber-400/50",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Code2,
    glow: "group-hover:shadow-amber-500/20"
  },
  "Misc": {
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    accent: "text-emerald-400",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: Sparkles,
    glow: "group-hover:shadow-emerald-500/20"
  },
};

const defaultStyle = categoryStyles["Misc"];

// Outcome lines - persuasive, results-focused
const outcomeLines: Record<string, string> = {
  "Mortal Admin Panel": "Cuts admin workload by 60%",
  "Mortal HUD System": "Deploys in under 5 minutes",
  "Mortal Chat iOS": "Eliminates spam instantly",
  "Mortal Economy Core": "Zero exploits. Guaranteed.",
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
  product: BaseProduct;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const outcome = outcomeLines[product.name] || "Production-ready code";
  const style = categoryStyles[product.category] || defaultStyle;
  const Icon = style.icon;

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
        <Card className="h-full bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-500 group cursor-pointer hover:shadow-2xl hover:shadow-primary/10" onClick={() => setIsDetailOpen(true)}>
          <CardContent className="p-0">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none backdrop-blur-md">
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
                  <span key={feature} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
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

  // Product Card - Premium design with category colors
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className={cn(
          "relative overflow-hidden group transition-all duration-500 h-full flex flex-col",
          "bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl",
          style.border,
          style.glow,
          "hover:shadow-2xl hover:-translate-y-1"
        )}>
          {/* Category gradient overlay */}
          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br", style.gradient)} />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />
          </div>

          <CardContent className="p-6 flex-1 flex flex-col relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                "bg-gradient-to-br from-white/10 to-white/5 border border-white/10",
                "group-hover:scale-110 group-hover:rotate-3"
              )}>
                <Icon className={cn("h-7 w-7 transition-colors duration-300", style.accent)} />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className={cn("text-xs cursor-help", style.badge)}>
                    Verified
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-background/95 backdrop-blur-xl border-white/10">
                  <p className="text-xs">Verified under Production-Ready Standard</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-white/90 transition-colors">
              {product.name}
            </h3>
            
            {/* Outcome line with category accent */}
            <div className={cn(
              "flex items-center gap-2 mb-4 rounded-xl px-3 py-2.5 border transition-all duration-300",
              "bg-white/5 group-hover:bg-white/10",
              style.border.replace('hover:', '')
            )}>
              <Zap className={cn("h-4 w-4 flex-shrink-0", style.accent)} />
              <span className={cn("text-sm font-semibold", style.accent)}>{outcome}</span>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto gap-2">
              <div className="flex flex-col">
                <span className={cn("text-2xl font-bold font-mono", style.accent)}>
                  {product.price === 0 ? 'Free' : `$${product.price}`}
                </span>
                {product.price > 0 && (
                  <span className="text-xs text-muted-foreground">one-time</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-muted-foreground hover:text-white hover:bg-white/10 rounded-xl"
                  onClick={() => setIsDetailOpen(true)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  className={cn(
                    "rounded-xl font-medium transition-all duration-300",
                    "bg-white text-black hover:bg-white/90 hover:scale-105"
                  )}
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

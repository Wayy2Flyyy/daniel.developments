import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, X, Terminal, Zap, Server, Shield, Layout, Code2, Sparkles } from "lucide-react";
import { useState } from "react";
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

// Category color schemes
const categoryStyles: Record<string, {
  accent: string;
  badge: string;
  gradient: string;
  icon: typeof Server;
}> = {
  "FiveM Resources": {
    accent: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    icon: Server
  },
  "Applications": {
    accent: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    icon: Shield
  },
  "Web Templates": {
    accent: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    icon: Layout
  },
  "Developer Tools": {
    accent: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    icon: Code2
  },
  "Misc": {
    accent: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
    icon: Sparkles
  },
};

const defaultStyle = categoryStyles["Misc"];

interface ProductDetailDialogProps {
  product: BaseProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const style = categoryStyles[product.category] || defaultStyle;
  const Icon = style.icon;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-background/95 backdrop-blur-2xl border-white/10 p-0 overflow-hidden gap-0">
        
        {/* Header Image Area with gradient overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent")} />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", style.gradient)} />
          
          {/* Category badge */}
          <div className="absolute bottom-6 left-6 right-6">
            <Badge variant="outline" className={cn("mb-3 backdrop-blur-xl", style.badge)}>
              <Icon className="h-3 w-3 mr-1.5" />
              {product.category}
            </Badge>
            <DialogTitle className="font-display text-3xl font-bold tracking-tight text-white">
              {product.name}
            </DialogTitle>
          </div>
          
          <DialogClose className="absolute top-4 right-4 rounded-xl bg-black/50 backdrop-blur-xl p-2.5 text-white hover:bg-black/70 transition-all border border-white/10 hover:scale-105">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="p-6">
          {/* Price and status row */}
          <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", style.badge.replace('text-', 'bg-').replace('/10', '/20'))}>
                <Zap className={cn("h-5 w-5", style.accent)} />
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Status</span>
                <p className={cn("font-medium", style.accent)}>Production-Ready</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Price</span>
              <p className={cn("font-mono text-3xl font-bold", style.accent)}>
                {product.price === 0 ? 'Free' : `$${product.price}`}
              </p>
            </div>
          </div>

          {/* Description */}
          <ScrollArea className="h-[160px] pr-4 rounded-xl border border-white/10 bg-white/5 p-5 mb-6">
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              {product.description}
              <br /><br />
              Tested on live servers with 100+ concurrent players. Includes documentation, Discord support, and free updates.
              <br /><br />
              <strong className="text-white">What's included:</strong>
              <ul className="list-none mt-3 space-y-2">
                {["Full source code access", "Detailed documentation", "Discord support channel", "Lifetime updates"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className={cn("h-4 w-4", style.accent)} /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </DialogDescription>
          </ScrollArea>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className={cn("h-4 w-4", style.accent)} />
              Key Features
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {(product.features as string[]).map((feature: string, i: number) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex items-center gap-2.5 text-sm p-3 rounded-xl border transition-all",
                    "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                  )}
                >
                  <div className={cn("h-1.5 w-1.5 rounded-full", style.accent.replace('text-', 'bg-'))} />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 sm:justify-between gap-4 border-t border-white/5 mt-2">
          <Button 
            variant="outline" 
            className="flex-1 border-white/10 hover:bg-white/5 rounded-xl h-12" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button 
            className={cn(
              "flex-1 rounded-xl h-12 font-bold transition-all duration-300",
              "bg-white text-black hover:bg-white/90 hover:scale-[1.02]"
            )}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? (
              <>
                <Check className="mr-2 h-5 w-5" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

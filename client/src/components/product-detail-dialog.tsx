import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, X, Terminal, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";

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

interface ProductDetailDialogProps {
  product: BaseProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

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
      <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden gap-0">
        
        {/* Header Image Area */}
        <div className="relative h-48 w-full overflow-hidden bg-secondary/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-6">
            <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none backdrop-blur-md">
              {product.category}
            </Badge>
            <DialogTitle className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
              {product.name}
            </DialogTitle>
          </div>
          <DialogClose className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors border border-white/10">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-sm text-primary">
               <Zap className="h-4 w-4" />
               <span className="font-medium">Production-Ready</span>
             </div>
             <span className="font-mono text-2xl font-bold text-white">
               {product.price === 0 ? 'Free' : `$${product.price}`}
             </span>
          </div>

          <ScrollArea className="h-[180px] pr-4 rounded-md border border-white/5 bg-white/5 p-4 mb-6">
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              {product.description}
              <br /><br />
              Tested on live servers with 100+ concurrent players. Includes documentation, Discord support, and free updates.
              <br /><br />
              <strong className="text-white">What's included:</strong>
              <ul className="list-none mt-2 space-y-1">
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" /> Full source code access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" /> Detailed documentation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" /> Discord support channel
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" /> Lifetime updates
                </li>
              </ul>
            </DialogDescription>
          </ScrollArea>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white uppercase tracking-wider">Key Features</h4>
            <div className="grid grid-cols-2 gap-3">
              {(product.features as string[]).map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-2 rounded border border-white/5">
                  <Terminal className="h-3 w-3 text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 sm:justify-between gap-4">
           <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5" onClick={() => onOpenChange(false)}>
             Close
           </Button>
           <Button 
             className="flex-1 bg-white text-black hover:bg-white/90 font-bold" 
             onClick={handleAddToCart}
             disabled={added}
           >
             {added ? (
               <>
                 <Check className="mr-2 h-4 w-4" /> Added
               </>
             ) : (
               <>
                 <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
               </>
             )}
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, X, Code, Terminal, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
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
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <ShieldCheck className="h-4 w-4 text-green-500" />
               <span>Verified Secure</span>
             </div>
             <span className="font-mono text-2xl font-bold text-white">${product.price}</span>
          </div>

          <ScrollArea className="h-[200px] pr-4 rounded-md border border-white/5 bg-white/5 p-4 mb-6">
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              {product.description}
              <br /><br />
              This product is designed for high-performance environments. It integrates seamlessly with existing frameworks and includes comprehensive documentation for easy setup.
              <br /><br />
              <strong>Technical Specifications:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Optimized codebase (0.01ms resmon)</li>
                <li>Fully configurable via config.lua</li>
                <li>Discord Webhook integration supported</li>
                <li>Regular updates included</li>
              </ul>
            </DialogDescription>
          </ScrollArea>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white uppercase tracking-wider">Key Features</h4>
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feature, i) => (
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

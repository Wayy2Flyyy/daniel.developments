import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ShieldCheck, Terminal, Lock, Zap } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background/95 backdrop-blur-xl border-l border-white/10">
        {/* Terminal Header */}
        <SheetHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-2xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              Terminal Cart
            </SheetTitle>
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">ACTIVE</span>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex-1 mt-6 overflow-hidden relative">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
              <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Terminal className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <div className="space-y-2">
                <p className="text-white font-medium text-lg">No active sessions.</p>
                <p className="text-muted-foreground text-sm">Add items to initialize a transaction.</p>
              </div>
              {/* Reassurance line */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                <Lock className="h-3.5 w-3.5 text-primary" />
                <span>Secure session will be created when you proceed.</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(false)} 
                className="mt-4 border-primary/30 text-primary hover:bg-primary/10"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-320px)] pr-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                      <Terminal className="h-6 w-6 text-primary/70" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium font-display text-white leading-tight">{item.name}</h4>
                          <p className="text-sm text-primary font-mono font-bold">${item.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-md hover:bg-white/10" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-mono w-6 text-center font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-md hover:bg-white/10" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">× ${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-sm">TOTAL_AMOUNT</span>
              </div>
              <span className="font-bold text-2xl font-mono text-white">${cartTotal.toFixed(2)}</span>
            </div>
            
            {/* Trust signals */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 p-3 rounded-xl border border-primary/10">
              <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Secure checkout via Stripe encryption</span>
            </div>

            {/* Instant access line */}
            <div className="text-center">
              <span className="text-xs text-emerald-400 flex items-center justify-center gap-1.5">
                <Zap className="h-3 w-3" />
                Instant access after payment.
              </span>
            </div>

            <Button 
              className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-white/90 rounded-xl shadow-lg shadow-white/10 hover:scale-[1.02] transition-all" 
              asChild
            >
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <Lock className="h-4 w-4 mr-2" />
                Secure Checkout
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

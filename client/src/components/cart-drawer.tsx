import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ShieldCheck, Terminal } from "lucide-react";
import { Link } from "wouter";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background/95 backdrop-blur-xl border-l border-white/10">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            Terminal Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 mt-8 overflow-hidden relative">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                <Terminal className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">No active sessions.</p>
              <Button variant="link" onClick={() => setIsCartOpen(false)} className="text-primary">Initialize Transaction</Button>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-250px)] pr-4">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                      {/* Use generic icon if image fails or use component logic */}
                      {/* For now, simplified image rendering */}
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0">
                        <Terminal className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="grid gap-1">
                        <h4 className="font-medium font-display leading-none">{item.name}</h4>
                        <p className="text-sm text-muted-foreground font-mono">${item.price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white/5 rounded-md p-0.5 border border-white/5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-sm hover:bg-white/10" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-sm hover:bg-white/10" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground font-mono text-sm">TOTAL_AMOUNT</span>
              <span className="font-bold text-xl font-mono">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Secure checkout via Stripe Encrypted</span>
            </div>

            <Button className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-white/90" asChild>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                Proceed to Checkout
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

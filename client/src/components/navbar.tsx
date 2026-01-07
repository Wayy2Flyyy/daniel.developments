import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, Terminal, User, LogIn, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isLoading, isAuthenticated } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#products", label: "Products" },
    { href: "/#work", label: "Portfolio" },
    { href: "/#about", label: "About" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-background/70 backdrop-blur-xl border-white/5 py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/30 transition-colors">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Daniel<span className="text-primary"> Developments</span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href.replace('/', ''));
              }}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && (
            isAuthenticated ? (
              <Link href="/account">
                <Button 
                  data-testid="button-account"
                  variant="ghost" 
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                    {user?.displayName?.[0]?.toUpperCase() || user?.email[0].toUpperCase()}
                  </div>
                  <span className="hidden lg:inline">{user?.displayName || "Account"}</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button 
                  data-testid="button-login"
                  variant="ghost" 
                  size="sm"
                  className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign in</span>
                </Button>
              </Link>
            )
          )}

          {isAuthenticated && (
            <Link href="/wishlist">
              <Button 
                data-testid="button-wishlist-nav"
                variant="ghost" 
                size="icon" 
                className="relative text-white hover:bg-white/10 hidden sm:flex"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full bg-rose-500 text-white border-none animate-in zoom-in">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          <Button 
            data-testid="button-cart"
            variant="ghost" 
            size="icon" 
            className="relative text-white hover:bg-white/10" 
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full bg-primary text-white border-none animate-in zoom-in">
                {cartCount}
              </Badge>
            )}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-white/10">
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.label} 
                      href={link.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.replace('/', ''));
                      }}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  {!isLoading && (
                    isAuthenticated ? (
                      <>
                        <Link href="/wishlist">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2 border-white/10 text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Heart className="w-4 h-4" />
                            Wishlist
                            {wishlistItems.length > 0 && (
                              <Badge className="ml-auto bg-rose-500 text-white text-xs">{wishlistItems.length}</Badge>
                            )}
                          </Button>
                        </Link>
                        <Link href="/account">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2 border-white/10 text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            My Account
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link href="/login">
                          <Button 
                            variant="outline" 
                            className="w-full border-white/10 text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign in
                          </Button>
                        </Link>
                        <Link href="/register">
                          <Button 
                            className="w-full bg-cyan-500 hover:bg-cyan-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Create account
                          </Button>
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const [location] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/?category=Home Decor", label: "Decor" },
    { href: "/?category=Electronics", label: "Electronics" },
    { href: "/?category=Kitchen", label: "Kitchen" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-8 mt-10">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-serif text-2xl font-bold">Lumina</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className={`text-lg font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/">
          <span className="font-serif text-2xl font-bold cursor-pointer tracking-tight">Lumina</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <span className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Cart Trigger */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
